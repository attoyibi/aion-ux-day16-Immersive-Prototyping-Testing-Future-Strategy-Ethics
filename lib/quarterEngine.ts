import {
  ETHICAL_EVENTS,
  FOCUS_DIVIDEND,
  OUTCOME_TABLE,
  PROFILE_MODIFIERS,
  PRODUCT_NAMES,
  resolveGovernanceIncident,
  resolveProfile,
  type EthicalEvent,
  type Outcome,
} from "@/content/portfolio";
import type {
  GovernanceModel,
  ProductId,
  ProductState,
  QuarterDecision,
  TensionSliders,
} from "@/lib/types";
import { eur, signed } from "@/lib/format";

export interface PendingConsequence {
  productId: ProductId;
  completionDelta: number;
  spendDelta: number;
  ethicalDelta: number;
  label: string;
}

export interface QuarterDeltas {
  completion: number;
  declined: number;
  spend: number;
  ethical: number;
}

export interface StopRecord {
  productId: ProductId;
  quarter: number;
  completionAtStop: number | null;
  ethicalAtStop: number;
}

export interface RoomState {
  products: ProductState[];
  quarter: number;
  log: string[];
  profileByQuarter: string[];
  decisionHistory: Record<ProductId, QuarterDecision>[];
  stops: StopRecord[];
  pending: PendingConsequence[];
  governanceOutcome: string | null;
  governanceCost: string | null;
  governanceNote: string | null;
}

export interface QuarterResult {
  state: RoomState;
  deltas: Record<ProductId, QuarterDeltas>;
  events: EthicalEvent[];
  governanceIncident: {
    outcome: string;
    cost: string;
    note?: string;
  } | null;
}

const PRODUCT_IDS: ProductId[] = ["citypass", "stationvoice", "flowsense"];

function clampPercent(value: number | null): number | null {
  if (value === null) return null;
  return Math.max(0, Math.min(100, value));
}

/** Which events fire this quarter, given the decisions just taken. */
function selectEvents(
  quarter: number,
  decisions: Record<ProductId, QuarterDecision>,
  products: ProductState[],
): EthicalEvent[] {
  const byId = (id: string) => ETHICAL_EVENTS.find((e) => e.id === id);
  const live = products.filter((p) => !p.stopped).length;
  const citypass = products.find((p) => p.id === "citypass");

  const guaranteed: EthicalEvent[] = [];
  const conditional: EthicalEvent[] = [];

  if (quarter === 2) {
    const e5 = byId("E5");
    if (e5) guaranteed.push(e5);
    if (decisions.flowsense === "pilot" || decisions.flowsense === "scale") {
      const e1 = byId("E1");
      if (e1) conditional.push(e1);
    }
    if (decisions.citypass === "scale") {
      const e2 = byId("E2");
      if (e2) conditional.push(e2);
    }
  }

  if (quarter === 3) {
    if (
      decisions.stationvoice === "scale" ||
      decisions.stationvoice === "pilot"
    ) {
      const e3 = byId("E3");
      if (e3) conditional.push(e3);
    }
    if (live >= 2) {
      const e4 = byId("E4");
      if (e4) conditional.push(e4);
    }
    if (citypass && citypass.stage === "scalable" && !citypass.stopped) {
      const e6 = byId("E6");
      if (e6) conditional.push(e6);
    }
  }

  if (quarter === 4) {
    const e7 = byId("E7");
    if (e7) guaranteed.push(e7);
  }

  // Zero, one or two events fire. Guaranteed events keep their place.
  return [...guaranteed, ...conditional].slice(0, 2);
}

export function runQuarter(
  state: RoomState,
  decisions: Record<ProductId, QuarterDecision>,
  sliders: TensionSliders,
  governance: GovernanceModel,
): QuarterResult {
  const quarter = state.quarter;
  const quarterKey = Math.min(Math.max(quarter, 1), 4) as 1 | 2 | 3 | 4;
  const profile = resolveProfile(sliders);
  const modifier = PROFILE_MODIFIERS[profile.id];

  const deltas: Record<ProductId, QuarterDeltas> = {
    citypass: { completion: 0, declined: 0, spend: 0, ethical: 0 },
    stationvoice: { completion: 0, declined: 0, spend: 0, ethical: 0 },
    flowsense: { completion: 0, declined: 0, spend: 0, ethical: 0 },
  };

  const logLines: string[] = [`— Quarter ${quarter} · profile: ${profile.name}`];
  const stops: StopRecord[] = [...state.stops];
  const nextPending: PendingConsequence[] = [];

  // 1. Consequences chosen last quarter land now.
  const carried = new Map<ProductId, PendingConsequence[]>();
  state.pending.forEach((item) => {
    const list = carried.get(item.productId) ?? [];
    list.push(item);
    carried.set(item.productId, list);
  });

  const products = state.products.map((product) => {
    const next: ProductState = { ...product };
    const decision = decisions[product.id];

    // Carried consequences apply even to a product that is now stopped, so the
    // learner sees the cost of last quarter's choice land.
    const inbound = carried.get(product.id) ?? [];
    inbound.forEach((item) => {
      if (next.completion !== null) {
        next.completion = clampPercent(next.completion + item.completionDelta);
        deltas[product.id].completion += item.completionDelta;
      }
      next.spend += item.spendDelta;
      deltas[product.id].spend += item.spendDelta;
      next.ethicalItems = Math.max(0, next.ethicalItems + item.ethicalDelta);
      deltas[product.id].ethical += item.ethicalDelta;
      logLines.push(`   ${PRODUCT_NAMES[product.id]}: ${item.label}`);
    });

    if (next.stopped) {
      logLines.push(
        `   ${PRODUCT_NAMES[product.id]}: already stopped. No further movement.`,
      );
      return next;
    }

    if (!decision) {
      logLines.push(
        `   ${PRODUCT_NAMES[product.id]}: no call recorded. The product drifted for a quarter.`,
      );
      next.quartersAtStage += 1;
      return next;
    }

    const outcome: Outcome | undefined =
      OUTCOME_TABLE[product.id]?.[quarterKey]?.[decision];

    if (!outcome) {
      logLines.push(
        `   ${PRODUCT_NAMES[product.id]}: no outcome is defined for this combination.`,
      );
      return next;
    }

    if (decision === "stop") {
      next.stopped = true;
      stops.push({
        productId: product.id,
        quarter,
        completionAtStop: next.completion,
        ethicalAtStop: next.ethicalItems,
      });
      logLines.push(`   ${PRODUCT_NAMES[product.id]}: STOP. ${outcome.note}`);
      return next;
    }

    // Base outcome plus the profile modifier.
    const completionDelta = outcome.completionDelta + modifier.completionDelta;
    const spendDelta = outcome.spendDelta + modifier.spendDelta;
    const ethicalDelta = outcome.ethicalDelta + modifier.ethicalDelta;

    if (next.completion === null) {
      // A product with no completion figure only gains one when the outcome
      // table gives it a real starting number.
      next.completion =
        outcome.completionDelta > 20 ? clampPercent(outcome.completionDelta) : null;
      if (next.completion !== null) {
        deltas[product.id].completion += outcome.completionDelta;
      }
    } else {
      next.completion = clampPercent(next.completion + completionDelta);
      deltas[product.id].completion += completionDelta;
    }

    if (next.declined !== null) {
      next.declined = clampPercent(next.declined + outcome.declinedDelta);
      deltas[product.id].declined += outcome.declinedDelta;
    }

    next.spend += spendDelta;
    deltas[product.id].spend += spendDelta;
    next.ethicalItems = Math.max(0, next.ethicalItems + ethicalDelta);
    deltas[product.id].ethical += ethicalDelta;

    if (outcome.stageAfter && outcome.stageAfter !== next.stage) {
      next.stage = outcome.stageAfter;
      next.quartersAtStage = 1;
    } else {
      next.quartersAtStage += 1;
    }

    logLines.push(
      `   ${PRODUCT_NAMES[product.id]}: ${
        decision === "scale" ? "SCALE" : "KEEP PILOTING"
      }. ${outcome.note}`,
    );
    return next;
  });

  logLines.push(`   ${modifier.note}`);

  // 2. Focus dividend: stopping frees spend that improves the others next
  //    quarter, so focus is felt rather than asserted.
  const stoppedThisQuarter = PRODUCT_IDS.filter(
    (id) => decisions[id] === "stop",
  );
  if (stoppedThisQuarter.length > 0) {
    PRODUCT_IDS.filter((id) => !stoppedThisQuarter.includes(id)).forEach(
      (id) => {
        nextPending.push({
          productId: id,
          completionDelta: FOCUS_DIVIDEND.completionDelta,
          spendDelta: 0,
          ethicalDelta: 0,
          label: FOCUS_DIVIDEND.note,
        });
      },
    );
  }

  // 3. The governance consequence fires in Quarter 3.
  let governanceIncident: QuarterResult["governanceIncident"] = null;
  let governanceOutcome = state.governanceOutcome;
  let governanceCost = state.governanceCost;
  let governanceNote = state.governanceNote;

  if (quarter === 3) {
    const resolution = resolveGovernanceIncident(governance);
    governanceIncident = {
      outcome: resolution.outcome,
      cost: resolution.cost,
      ...(resolution.reputationalNote
        ? { note: resolution.reputationalNote }
        : {}),
    };
    governanceOutcome = resolution.outcome;
    governanceCost = resolution.cost;
    governanceNote = resolution.reputationalNote ?? null;

    // The affected product is CityPass AR: the consent complaint is against it.
    nextPending.push({
      productId: "citypass",
      completionDelta: -5 * resolution.quartersLost,
      spendDelta: resolution.spendDelta,
      ethicalDelta: 1,
      label: `Regulator complaint upheld — ${resolution.cost}`,
    });
    logLines.push(`   Governance incident: ${resolution.outcome}`);
  }

  const events = selectEvents(quarter, decisions, products);

  return {
    state: {
      products,
      quarter: quarter + 1,
      log: [...state.log, ...logLines],
      profileByQuarter: [...state.profileByQuarter, profile.name],
      decisionHistory: [...state.decisionHistory, decisions],
      stops,
      pending: nextPending,
      governanceOutcome,
      governanceCost,
      governanceNote,
    },
    deltas,
    events,
    governanceIncident,
  };
}

/** Applying an event response queues its consequence for the next quarter. */
export function queueEventResponse(
  state: RoomState,
  event: EthicalEvent,
  optionId: string,
): RoomState {
  const option = event.options.find((o) => o.id === optionId);
  if (!option) return state;

  const additions: PendingConsequence[] = event.touches.map((productId) => ({
    productId,
    completionDelta: option.completionDelta,
    spendDelta: option.spendDelta,
    ethicalDelta: option.ethicalDelta,
    label: `${event.dimension} — ${option.label}: ${option.consequence}`,
  }));

  return {
    ...state,
    pending: [...state.pending, ...additions],
    log: [
      ...state.log,
      `   ${event.dimension} — you chose "${option.label}". ${option.consequence}`,
    ],
  };
}

// --- 6.6 CLOSING REPLAY ----------------------------------------------------

export interface Replay {
  rows: { label: string; value: string }[];
  loopLine: string;
  stopLine: string;
  costLine: string;
}

export function buildReplay(
  state: RoomState,
  sliders: TensionSliders,
): Replay {
  const profileRuns: string[] = [];
  state.profileByQuarter.forEach((name, index) => {
    const last = profileRuns[profileRuns.length - 1];
    if (last && last.startsWith(name)) {
      profileRuns[profileRuns.length - 1] = `${name} (Q${
        index + 2 - runLength(state.profileByQuarter, index, name)
      }–Q${index + 1})`;
    } else {
      profileRuns.push(`${name} (Q${index + 1})`);
    }
  });

  const stopped = state.stops.length;
  const atScale = state.products.filter(
    (p) => p.stage === "scalable" && !p.stopped,
  ).length;
  const atConcept = state.products.filter(
    (p) => p.stage === "concept",
  ).length;
  const totalSpend = state.products.reduce((sum, p) => sum + p.spend, 0);
  const openEthical = state.products.reduce(
    (sum, p) => sum + p.ethicalItems,
    0,
  );

  const reversals = countReversals(state.decisionHistory);

  const rows = [
    { label: "Profile held", value: profileRuns.join(", ") || "—" },
    { label: "You stopped", value: `${stopped} of 3 products` },
    { label: "Products at Scale", value: String(atScale) },
    { label: "Products still at Concept", value: String(atConcept) },
    { label: "Total spend", value: eur(totalSpend) },
    { label: "Open ethical items", value: String(openEthical) },
    {
      label: "Governance halt in Q3",
      value: state.governanceOutcome ?? "No incident recorded",
    },
    { label: "Decisions reversed", value: String(reversals) },
  ];

  // The loop line: where innovation maturity fed learning, and where it broke.
  const advanced = state.products.find(
    (p) => p.stage === "scalable" || p.stage === "pilot",
  );
  const stalled = state.products.find(
    (p) => p.quartersAtStage >= 3 && !p.stopped,
  );
  const loopLine = `Innovation maturity fed organisational learning here: ${
    advanced
      ? `${PRODUCT_NAMES[advanced.id]} moved to ${advanced.stage} and the evidence moved with it`
      : "nowhere — nothing advanced a stage this run"
  }, and the loop broke here: ${
    stalled
      ? `${PRODUCT_NAMES[stalled.id]} sat at the same stage for ${stalled.quartersAtStage} quarters without a decision that changed it`
      : openEthical > 2
        ? `${openEthical} ethical items are still open and none of them changed a decision`
        : "nowhere visible in this run"
  }.`;

  const lastStop = state.stops[state.stops.length - 1];
  const healthy =
    lastStop !== undefined &&
    lastStop.completionAtStop !== null &&
    lastStop.completionAtStop >= 60;
  const stopLine =
    stopped === 0
      ? "You stopped 0 of 3. Nothing was stopped this run, so every product carried its full running cost into the next quarter."
      : `You stopped ${stopped} of 3. The product you stopped was ${
          healthy ? "healthy" : "failing"
        } when you stopped it${
          lastStop && lastStop.completionAtStop !== null
            ? ` (${PRODUCT_NAMES[lastStop.productId]} at ${lastStop.completionAtStop}% completion, ${lastStop.ethicalAtStop} open ethical items)`
            : ""
        }.`;

  const costLine = `What your profile gave up: ${resolveProfile(sliders).givesUp}`;

  return { rows, loopLine, stopLine, costLine };
}

function runLength(list: string[], index: number, name: string): number {
  let count = 0;
  for (let i = index; i >= 0; i -= 1) {
    if (list[i] === name) count += 1;
    else break;
  }
  return count;
}

function countReversals(
  history: Record<ProductId, QuarterDecision>[],
): number {
  let reversals = 0;
  PRODUCT_IDS.forEach((id) => {
    for (let i = 1; i < history.length; i += 1) {
      const prev = history[i - 1]?.[id];
      const current = history[i]?.[id];
      if (prev && current && prev !== current) reversals += 1;
    }
  });
  return reversals;
}

export const DELTA_LABEL = (before: number, after: number) =>
  `${before}% -> ${after}% (${signed(after - before)})`;
