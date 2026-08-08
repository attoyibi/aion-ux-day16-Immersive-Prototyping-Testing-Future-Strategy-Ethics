import type {
  GovernanceDecisionId,
  GovernanceModel,
  GovernanceOwnerId,
  ProductId,
  ProductState,
  QuarterDecision,
  SliderProfileId,
  StageId,
  TensionSliders,
} from "@/lib/types";

// --- 6.1 THE BOARD ---------------------------------------------------------

export const PRODUCT_NAMES: Record<ProductId, string> = {
  citypass: "CityPass AR",
  stationvoice: "StationVoice",
  flowsense: "FlowSense",
};

export const PRODUCT_BLURBS: Record<ProductId, string> = {
  citypass: "AR wayfinding overlay for the concourse.",
  stationvoice: "Voice assistant for the same concourse.",
  flowsense: "Passenger-density prediction from camera and sensor data.",
};

export const INITIAL_PRODUCTS: ProductState[] = [
  {
    id: "citypass",
    stage: "pilot",
    completion: 68,
    declined: 45,
    spend: 40000,
    quartersAtStage: 2,
    ethicalItems: 1,
    stopped: false,
  },
  {
    id: "stationvoice",
    stage: "prototype",
    completion: 41,
    declined: null,
    spend: 25000,
    quartersAtStage: 3,
    ethicalItems: 0,
    stopped: false,
  },
  {
    id: "flowsense",
    stage: "concept",
    completion: null,
    declined: null,
    spend: 5000,
    quartersAtStage: 1,
    ethicalItems: 2,
    stopped: false,
  },
];

// --- 6.2 TENSION SLIDERS ---------------------------------------------------

export const SLIDER_KEYS: (keyof TensionSliders)[] = [
  "innovationPressure",
  "ethics",
  "economics",
  "userValue",
  "maturity",
  "longTerm",
];

export const SLIDER_LABELS: Record<keyof TensionSliders, string> = {
  innovationPressure: "Innovation pressure",
  ethics: "Ethics & responsibility",
  economics: "Economics",
  userValue: "User value",
  maturity: "Maturity discipline",
  longTerm: "Long-term portfolio",
};

export const DEFAULT_SLIDERS: TensionSliders = {
  innovationPressure: 17,
  ethics: 17,
  economics: 17,
  userValue: 17,
  maturity: 16,
  longTerm: 16,
};

export const SLIDER_PRESETS: {
  id: string;
  label: string;
  values: TensionSliders;
}[] = [
  {
    id: "ceo",
    label: "The CEO wants headlines",
    values: {
      innovationPressure: 40,
      ethics: 10,
      economics: 15,
      userValue: 10,
      maturity: 10,
      longTerm: 15,
    },
  },
  {
    id: "legal",
    label: "Legal drives the agenda",
    values: {
      innovationPressure: 10,
      ethics: 40,
      economics: 15,
      userValue: 10,
      maturity: 15,
      longTerm: 10,
    },
  },
  {
    id: "steward",
    label: "Portfolio steward",
    values: {
      innovationPressure: 18,
      ethics: 18,
      economics: 16,
      userValue: 18,
      maturity: 15,
      longTerm: 15,
    },
  },
];

export interface SliderProfile {
  id: SliderProfileId;
  name: string;
  givesUp: string;
}

export const SLIDER_PROFILES: Record<SliderProfileId, SliderProfile> = {
  showcase: {
    id: "showcase",
    name: "Showcase-driven",
    givesUp:
      "What you are implicitly giving up: the time to check who the visible output is actually for. Output rises, and so does the number of open ethical items.",
  },
  compliance: {
    id: "compliance",
    name: "Compliance-anchored",
    givesUp:
      "What you are implicitly giving up: pace. Ethical items stay low and visible progress arrives a quarter later than the organisation expects.",
  },
  costLed: {
    id: "costLed",
    name: "Cost-led",
    givesUp:
      "What you are implicitly giving up: the work that has no near-term return — accessibility, second languages, and the follow-up measurement that proves transfer.",
  },
  slowDefensible: {
    id: "slowDefensible",
    name: "Slow but defensible",
    givesUp:
      "What you are implicitly giving up: first-mover position. Every decision you make will survive scrutiny, and some of them will arrive after the window closed.",
  },
  spreadThin: {
    id: "spreadThin",
    name: "Spread too thin",
    givesUp:
      "What you are implicitly giving up: depth on any single axis. Nothing is neglected and nothing is decisive.",
  },
  steward: {
    id: "steward",
    name: "Balanced portfolio steward",
    givesUp:
      "What you are implicitly giving up: the ability to move fast when one axis genuinely should dominate for a quarter.",
  },
  undeclared: {
    id: "undeclared",
    name: "Undeclared profile. One axis is doing the deciding — name it.",
    givesUp:
      "What you are implicitly giving up: a shared account of how this portfolio is being steered. The weighting is real whether or not it is stated.",
  },
};

/** Six profiles, first match wins in the documented order. */
export function resolveProfile(s: TensionSliders): SliderProfile {
  if (s.innovationPressure >= 30) return SLIDER_PROFILES.showcase;
  if (s.ethics >= 30) return SLIDER_PROFILES.compliance;
  if (s.economics >= 30) return SLIDER_PROFILES.costLed;
  if (s.ethics + s.maturity >= 45) return SLIDER_PROFILES.slowDefensible;
  const values = SLIDER_KEYS.map((k) => s[k]);
  if (values.every((v) => v >= 14 && v <= 19)) return SLIDER_PROFILES.spreadThin;
  if (values.every((v) => v <= 25 && v >= 10)) return SLIDER_PROFILES.steward;
  return SLIDER_PROFILES.undeclared;
}

/**
 * Moving one slider redistributes the remainder proportionally across the other
 * five, then repairs rounding drift so the printed total always reads 100.
 */
export function redistribute(
  current: TensionSliders,
  changed: keyof TensionSliders,
  nextValue: number,
): TensionSliders {
  const value = Math.max(0, Math.min(100, Math.round(nextValue)));
  const others = SLIDER_KEYS.filter((k) => k !== changed);
  const remaining = 100 - value;
  const othersTotal = others.reduce((sum, k) => sum + current[k], 0);

  const next = { ...current, [changed]: value } as TensionSliders;

  if (othersTotal === 0) {
    const share = Math.floor(remaining / others.length);
    others.forEach((k) => {
      next[k] = share;
    });
  } else {
    others.forEach((k) => {
      next[k] = Math.floor((current[k] / othersTotal) * remaining);
    });
  }

  // Hand the rounding remainder to the largest of the other axes, one point at
  // a time, so the six printed values always sum to exactly 100.
  let drift = 100 - SLIDER_KEYS.reduce((sum, k) => sum + next[k], 0);
  const ordered = [...others].sort((a, b) => next[b] - next[a]);
  let index = 0;
  while (drift > 0 && ordered.length > 0) {
    const key = ordered[index % ordered.length]!;
    next[key] += 1;
    drift -= 1;
    index += 1;
  }
  while (drift < 0 && ordered.length > 0) {
    const key = ordered[index % ordered.length]!;
    if (next[key] > 0) {
      next[key] -= 1;
      drift += 1;
    }
    index += 1;
    if (index > 600) break;
  }

  return next;
}

// --- 6.3 GOVERNANCE MODEL --------------------------------------------------

export const GOVERNANCE_DECISIONS: {
  id: GovernanceDecisionId;
  label: string;
  decides: string;
  wellPlaced: string;
  wrongRole: string;
}[] = [
  {
    id: "innovationEvaluation",
    label: "Innovation evaluation",
    decides:
      "Whether an idea or prototype has enough evidence to receive further funding, and what maturity it has actually reached.",
    wellPlaced:
      "A cross-functional board, because the judgement needs the operational view and the technical view in the same room, and neither alone is sufficient.",
    wrongRole:
      "With the innovation lead alone it becomes self-assessment, and every initiative reads as promising.",
  },
  {
    id: "ethicalRelease",
    label: "Ethical release",
    decides:
      "Whether this may be put in front of real people at all, and under what conditions it must be withdrawn.",
    wellPlaced:
      "The data protection officer or a cross-functional board — a role that carries no delivery target for the thing being released.",
    wrongRole:
      "With the role that also owns shipping, the brake and the accelerator share a foot. Nothing halts in time.",
  },
  {
    id: "scalingDecision",
    label: "Scaling decision",
    decides:
      "Whether to extend a working pilot into wider operation, and who absorbs the running cost afterwards.",
    wellPlaced:
      "The executive board or the business unit that will operate it, because scaling commits budget and headcount they must live with.",
    wrongRole:
      "With IT it becomes an integration question, and the question of whether it should scale is never asked.",
  },
  {
    id: "portfolioAdjustment",
    label: "Portfolio adjustment",
    decides:
      "Which initiatives stop, so that the remaining ones can be resourced properly.",
    wellPlaced:
      "The executive board or a cross-functional board, because stopping requires authority over people who did not want to stop.",
    wrongRole:
      "With the business unit lead it becomes a defence of their own initiatives, and nothing is ever stopped.",
  },
];

export const GOVERNANCE_OWNERS: { id: GovernanceOwnerId; label: string }[] = [
  { id: "unassigned", label: "— not assigned —" },
  { id: "innovationLead", label: "Innovation lead" },
  { id: "businessUnitLead", label: "Business unit lead" },
  { id: "it", label: "IT" },
  { id: "dpo", label: "Data protection officer" },
  { id: "executiveBoard", label: "Executive board" },
  { id: "crossFunctionalBoard", label: "Cross-functional board" },
];

export const OWNER_LABELS: Record<GovernanceOwnerId, string> =
  GOVERNANCE_OWNERS.reduce(
    (acc, owner) => {
      acc[owner.id] = owner.label;
      return acc;
    },
    {} as Record<GovernanceOwnerId, string>,
  );

export const DEFAULT_GOVERNANCE: GovernanceModel = {
  innovationEvaluation: "unassigned",
  ethicalRelease: "unassigned",
  scalingDecision: "unassigned",
  portfolioAdjustment: "unassigned",
};

// --- 6.4 QUARTER OUTCOME TABLE ---------------------------------------------

export interface Outcome {
  completionDelta: number;
  declinedDelta: number;
  spendDelta: number;
  ethicalDelta: number;
  stageAfter?: StageId;
  note: string;
}

type QuarterKey = 1 | 2 | 3 | 4;

const STOP_OUTCOME = (note: string): Outcome => ({
  completionDelta: 0,
  declinedDelta: 0,
  spendDelta: 0,
  ethicalDelta: 0,
  note,
});

/**
 * Deterministic base outcomes keyed on (product, quarter, decision).
 * No randomness anywhere: the same run always produces the same board.
 */
export const OUTCOME_TABLE: Record<
  ProductId,
  Record<QuarterKey, Record<QuarterDecision, Outcome>>
> = {
  citypass: {
    1: {
      stop: STOP_OUTCOME(
        "CityPass AR stopped at 68% completion. The working pilot is shelved and the spend it was consuming is released to the rest of the portfolio.",
      ),
      pilot: {
        completionDelta: 3,
        declinedDelta: -4,
        spendDelta: 15000,
        ethicalDelta: 0,
        note: "Pilot continued. Consent wording was revised once; declines eased slightly.",
      },
      scale: {
        completionDelta: 2,
        declinedDelta: 3,
        spendDelta: 55000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Scaled at 45% declining, with no stop rule written. Rollout proceeded and the consent question travelled with it.",
      },
    },
    2: {
      stop: STOP_OUTCOME(
        "CityPass AR stopped. Travellers fall back to printed signage, which never stopped working.",
      ),
      pilot: {
        completionDelta: 4,
        declinedDelta: -5,
        spendDelta: 15000,
        ethicalDelta: 0,
        note: "Second pilot cycle. Completion and consent both improved; scope stayed at one station.",
      },
      scale: {
        completionDelta: 1,
        declinedDelta: 2,
        spendDelta: 60000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Scaling continued. Support load rose faster than completion did.",
      },
    },
    3: {
      stop: STOP_OUTCOME(
        "CityPass AR withdrawn. The rollback to printed signage took one week and cost nothing further.",
      ),
      pilot: {
        completionDelta: 3,
        declinedDelta: -4,
        spendDelta: 15000,
        ethicalDelta: 0,
        note: "Pilot held. A second language entered planning rather than a second site.",
      },
      scale: {
        completionDelta: 2,
        declinedDelta: 1,
        spendDelta: 50000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Scaling continued. The consent question from Q1 is now a standing item.",
      },
    },
    4: {
      stop: STOP_OUTCOME(
        "CityPass AR stopped in the final quarter. Whatever was learned stays; the running cost does not.",
      ),
      pilot: {
        completionDelta: 3,
        declinedDelta: -3,
        spendDelta: 15000,
        ethicalDelta: 0,
        note: "Pilot closed out with a written scope and a measured reuse figure.",
      },
      scale: {
        completionDelta: 2,
        declinedDelta: 0,
        spendDelta: 45000,
        ethicalDelta: 0,
        stageAfter: "scalable",
        note: "Operating at scale. Cost per station is now the governing number.",
      },
    },
  },
  stationvoice: {
    1: {
      stop: STOP_OUTCOME(
        "StationVoice stopped at prototype. Three quarters at this stage ended without a pilot.",
      ),
      pilot: {
        completionDelta: 9,
        declinedDelta: 0,
        spendDelta: 20000,
        ethicalDelta: 0,
        stageAfter: "pilot",
        note: "Moved into a real pilot. Completion improved steadily once real travellers used it.",
      },
      scale: {
        completionDelta: -12,
        declinedDelta: 0,
        spendDelta: 70000,
        ethicalDelta: 2,
        stageAfter: "scalable",
        note: "Scaled straight from prototype. Audio guidance collapsed in concourse noise: a Prototype answer was used for a Scalable question.",
      },
    },
    2: {
      stop: STOP_OUTCOME(
        "StationVoice stopped. The audio work is documented and the team is released.",
      ),
      pilot: {
        completionDelta: 8,
        declinedDelta: 0,
        spendDelta: 20000,
        ethicalDelta: 0,
        stageAfter: "pilot",
        note: "Second pilot cycle. Noise handling improved and completion rose again.",
      },
      scale: {
        completionDelta: -10,
        declinedDelta: 0,
        spendDelta: 65000,
        ethicalDelta: 2,
        stageAfter: "scalable",
        note: "Scaling continued against the evidence. Support tickets outgrew completed routes.",
      },
    },
    3: {
      stop: STOP_OUTCOME(
        "StationVoice stopped. Spend released to the remaining products.",
      ),
      pilot: {
        completionDelta: 7,
        declinedDelta: 0,
        spendDelta: 20000,
        ethicalDelta: 0,
        stageAfter: "pilot",
        note: "Pilot held. The product is now genuinely testable against CityPass AR.",
      },
      scale: {
        completionDelta: -8,
        declinedDelta: 0,
        spendDelta: 60000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Still scaling. Each new site repeats the same noise failure.",
      },
    },
    4: {
      stop: STOP_OUTCOME(
        "StationVoice stopped in the final quarter.",
      ),
      pilot: {
        completionDelta: 6,
        declinedDelta: 0,
        spendDelta: 20000,
        ethicalDelta: 0,
        stageAfter: "pilot",
        note: "Pilot closed out. Ready for a scaling decision that has evidence behind it.",
      },
      scale: {
        completionDelta: -6,
        declinedDelta: 0,
        spendDelta: 55000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Operating at scale below its prototype completion rate.",
      },
    },
  },
  flowsense: {
    1: {
      stop: STOP_OUTCOME(
        "FlowSense stopped at concept, with 2 open ethical items and no data collected. Nothing was lost except the momentum of a well-liked idea.",
      ),
      pilot: {
        completionDelta: 0,
        declinedDelta: 0,
        spendDelta: 30000,
        ethicalDelta: 1,
        stageAfter: "prototype",
        note: "Funded to prototype. The density model works well; the retention question is still unanswered.",
      },
      scale: {
        completionDelta: 0,
        declinedDelta: 0,
        spendDelta: 80000,
        ethicalDelta: 2,
        stageAfter: "prototype",
        note: "Funded hard from concept. Build progressed to prototype in one quarter and the ethical backlog grew with it.",
      },
    },
    2: {
      stop: STOP_OUTCOME(
        "FlowSense stopped. The performing model is shelved with its retention question unresolved.",
      ),
      pilot: {
        completionDelta: 74,
        declinedDelta: 0,
        spendDelta: 30000,
        ethicalDelta: 1,
        stageAfter: "pilot",
        note: "Into pilot, and it performs: 74% prediction accuracy on live concourse data. The open ethical items rose with it.",
      },
      scale: {
        completionDelta: 78,
        declinedDelta: 0,
        spendDelta: 85000,
        ethicalDelta: 2,
        stageAfter: "pilot",
        note: "Accelerated. Accuracy is the best number on the board and the ethical backlog is the worst.",
      },
    },
    3: {
      stop: STOP_OUTCOME(
        "FlowSense stopped while performing well. This is the stop that is hard to make and easy to defend: the numbers were good and the consent basis was not.",
      ),
      pilot: {
        completionDelta: 5,
        declinedDelta: 0,
        spendDelta: 30000,
        ethicalDelta: 1,
        stageAfter: "pilot",
        note: "Pilot continued. Accuracy improved again; a third ethical item was opened.",
      },
      scale: {
        completionDelta: 4,
        declinedDelta: 0,
        spendDelta: 80000,
        ethicalDelta: 2,
        stageAfter: "scalable",
        note: "Scaled on accuracy alone. Individual movement traces now exist across three sites.",
      },
    },
    4: {
      stop: STOP_OUTCOME(
        "FlowSense stopped in the final quarter, still performing.",
      ),
      pilot: {
        completionDelta: 3,
        declinedDelta: 0,
        spendDelta: 30000,
        ethicalDelta: 1,
        stageAfter: "pilot",
        note: "Pilot held for a fourth quarter. Accuracy is no longer the open question.",
      },
      scale: {
        completionDelta: 3,
        declinedDelta: 0,
        spendDelta: 75000,
        ethicalDelta: 1,
        stageAfter: "scalable",
        note: "Operating at scale on camera and sensor data across the network.",
      },
    },
  },
};

/** Profile modifiers. Neither direction is punished; both print their cost. */
export const PROFILE_MODIFIERS: Record<
  SliderProfileId,
  { completionDelta: number; ethicalDelta: number; spendDelta: number; note: string }
> = {
  showcase: {
    completionDelta: 2,
    ethicalDelta: 1,
    spendDelta: 10000,
    note: "Showcase-driven profile: visible output accelerated, and one more ethical item was opened than would otherwise have been.",
  },
  compliance: {
    completionDelta: -2,
    ethicalDelta: -1,
    spendDelta: 5000,
    note: "Compliance-anchored profile: one ethical item was closed before it grew, and visible output slowed by the same amount.",
  },
  costLed: {
    completionDelta: -1,
    ethicalDelta: 1,
    spendDelta: -5000,
    note: "Cost-led profile: spend held down, and the work with no near-term return was deferred again.",
  },
  slowDefensible: {
    completionDelta: -1,
    ethicalDelta: -1,
    spendDelta: 0,
    note: "Slow but defensible profile: the quarter's decisions will survive scrutiny and arrived later than asked.",
  },
  spreadThin: {
    completionDelta: 0,
    ethicalDelta: 0,
    spendDelta: 5000,
    note: "Spread too thin: every axis received attention and none received enough to change the quarter.",
  },
  steward: {
    completionDelta: 1,
    ethicalDelta: 0,
    spendDelta: 0,
    note: "Balanced portfolio steward: steady movement on every product, decisive movement on none.",
  },
  undeclared: {
    completionDelta: 0,
    ethicalDelta: 0,
    spendDelta: 0,
    note: "Undeclared profile: the weighting still steered this quarter, without being stated.",
  },
};

/** Stopping a product frees spend that measurably improves the others. */
export const FOCUS_DIVIDEND = {
  completionDelta: 2,
  note: "Focus dividend: spend released by a stopped product improved the remaining ones this quarter.",
};

// --- 6.5 ETHICAL EVENTS ----------------------------------------------------

export type EthicalDimensionId =
  | "E1"
  | "E2"
  | "E3"
  | "E4"
  | "E5"
  | "E6"
  | "E7";

export interface EventOption {
  id: string;
  label: string;
  consequence: string;
  completionDelta: number;
  spendDelta: number;
  ethicalDelta: number;
}

export interface EthicalEvent {
  id: EthicalDimensionId;
  dimension: string;
  quarter: QuarterKey;
  body: string;
  touches: ProductId[];
  options: EventOption[];
  card: { asks: string; failureLooksLike: string; signal: string };
}

export const ETHICAL_EVENTS: EthicalEvent[] = [
  {
    id: "E1",
    dimension: "Data protection",
    quarter: 2,
    body: "FlowSense's density model retains individual movement traces for 90 days. The retention period was never specified in the assessment.",
    touches: ["flowsense"],
    options: [
      {
        id: "shorten",
        label: "Shorten retention",
        consequence:
          "Retention cut to 7 days. FlowSense loses a quarter of model progress and closes the open item.",
        completionDelta: -6,
        spendDelta: 5000,
        ethicalDelta: -1,
      },
      {
        id: "document",
        label: "Continue and document",
        consequence:
          "Retention documented at 90 days and left in place. The item stays open and is now on the record.",
        completionDelta: 0,
        spendDelta: 0,
        ethicalDelta: 0,
      },
      {
        id: "pause",
        label: "Pause the product",
        consequence:
          "FlowSense paused for a quarter while the assessment is completed properly.",
        completionDelta: -10,
        spendDelta: 0,
        ethicalDelta: -2,
      },
    ],
    card: {
      asks: "What is collected, for how long, who can reach it, and who agreed to that.",
      failureLooksLike:
        "A retention period that nobody set, discovered after the data already exists.",
      signal:
        "An assessment document with a blank, a “to be confirmed”, or a date later than the first session.",
    },
  },
  {
    id: "E2",
    dimension: "Voluntariness",
    quarter: 2,
    body: "Printed signage at two entrances was removed to reduce clutter. Travellers who decline the app now have no alternative.",
    touches: ["citypass"],
    options: [
      {
        id: "restore",
        label: "Restore signage",
        consequence:
          "Signage restored at both entrances. The declined-consent path works again, at a cost.",
        completionDelta: 0,
        spendDelta: 15000,
        ethicalDelta: -1,
      },
      {
        id: "proceed",
        label: "Proceed",
        consequence:
          "Signage stays removed. Declining now means finding your own way, so consent has become a condition of service.",
        completionDelta: 2,
        spendDelta: 0,
        ethicalDelta: 1,
      },
      {
        id: "pauseScaling",
        label: "Pause scaling",
        consequence:
          "Scaling paused while the alternative path is rebuilt. One quarter of progress lost.",
        completionDelta: -5,
        spendDelta: 0,
        ethicalDelta: -1,
      },
    ],
    card: {
      asks: "Whether a person can decline and still complete the task they came to do.",
      failureLooksLike:
        "The alternative is quietly withdrawn after the consent screen was designed around it.",
      signal:
        "A consent rate that climbs without any change to the consent text.",
    },
  },
  {
    id: "E3",
    dimension: "Manipulation potential",
    quarter: 3,
    body: "A retail partner has asked for the assistant to suggest a route past their concession. Completion times would rise by 40 seconds.",
    touches: ["stationvoice"],
    options: [
      {
        id: "decline",
        label: "Decline",
        consequence:
          "The request is declined. The guidance keeps serving only the traveller's stated destination.",
        completionDelta: 0,
        spendDelta: 0,
        ethicalDelta: 0,
      },
      {
        id: "disclose",
        label: "Accept with disclosure",
        consequence:
          "Accepted, with an on-screen note that the route is sponsored. Completion times rise and the traveller can see why.",
        completionDelta: -3,
        spendDelta: -10000,
        ethicalDelta: 1,
      },
      {
        id: "accept",
        label: "Accept",
        consequence:
          "Accepted silently. The product now optimises for someone who is not the traveller holding it.",
        completionDelta: -5,
        spendDelta: -20000,
        ethicalDelta: 2,
      },
    ],
    card: {
      asks: "Whose goal the system is optimising for at the moment it gives advice.",
      failureLooksLike:
        "Guidance that is technically accurate and quietly serves a third party.",
      signal:
        "A revenue line that appears in the business case for a wayfinding product.",
    },
  },
  {
    id: "E4",
    dimension: "Cognitive overload",
    quarter: 3,
    body: "With both CityPass AR and StationVoice active, travellers receive visual and audio guidance simultaneously. 14 of 40 could not name which to follow.",
    touches: ["citypass", "stationvoice"],
    options: [
      {
        id: "sequence",
        label: "Sequence them",
        consequence:
          "Audio yields to the overlay unless the phone is pocketed. Both products lose a little progress and stop competing.",
        completionDelta: -2,
        spendDelta: 10000,
        ethicalDelta: -1,
      },
      {
        id: "pauseOne",
        label: "Pause one",
        consequence:
          "StationVoice paused at this station. The overload disappears and so does a quarter of its progress.",
        completionDelta: -6,
        spendDelta: 0,
        ethicalDelta: -1,
      },
      {
        id: "continue",
        label: "Continue",
        consequence:
          "Both stay live. 14 of 40 still cannot say which guidance to follow.",
        completionDelta: -3,
        spendDelta: 0,
        ethicalDelta: 1,
      },
    ],
    card: {
      asks: "Whether the total information load is survivable while doing something else.",
      failureLooksLike:
        "Two products that each tested well and cannot be used together.",
      signal:
        "Nobody owns the sum of the products, only each product separately.",
    },
  },
  {
    id: "E5",
    dimension: "Transparency",
    quarter: 2,
    body: "A pilot participant reports they did not realise their route was being recorded, although they pressed agree.",
    touches: ["citypass"],
    options: [
      {
        id: "rewrite",
        label: "Rewrite the consent text",
        consequence:
          "Consent rewritten in plain language. One quarter of progress spent, and the declines that follow are now informed.",
        completionDelta: -5,
        spendDelta: 5000,
        ethicalDelta: -1,
      },
      {
        id: "indicator",
        label: "Add an in-session indicator",
        consequence:
          "A persistent recording indicator is added. Cheaper than a rewrite and it makes the state visible while it matters.",
        completionDelta: -1,
        spendDelta: 5000,
        ethicalDelta: -1,
      },
      {
        id: "note",
        label: "Note it and continue",
        consequence:
          "Logged as a single report. The consent text stays as written.",
        completionDelta: 0,
        spendDelta: 0,
        ethicalDelta: 1,
      },
    ],
    card: {
      asks: "Whether the person understood what they agreed to, not whether they pressed the button.",
      failureLooksLike:
        "A valid consent record and a participant who is surprised.",
      signal:
        "Consent text written to satisfy a reviewer rather than to be read while walking.",
    },
  },
  {
    id: "E6",
    dimension: "Accessibility",
    quarter: 3,
    body: "A passenger group notes that the arrow overlay is unusable for travellers with low vision, and the audio alternative exists only in English.",
    touches: ["citypass"],
    options: [
      {
        id: "build",
        label: "Build the alternative",
        consequence:
          "A high-contrast overlay and a German audio path are funded. One quarter and real spend, and the exclusion closes.",
        completionDelta: -4,
        spendDelta: 25000,
        ethicalDelta: -1,
      },
      {
        id: "restrict",
        label: "Restrict scope to accessible sites",
        consequence:
          "Rollout limited to the sites where the alternative already works. Smaller footprint, honest boundary.",
        completionDelta: -2,
        spendDelta: 0,
        ethicalDelta: -1,
      },
      {
        id: "continue",
        label: "Continue",
        consequence:
          "Rollout continues as planned. The exclusion scales with the product.",
        completionDelta: 1,
        spendDelta: 0,
        ethicalDelta: 2,
      },
    ],
    card: {
      asks: "Whether people with different vision, mobility, language and device can complete the same task.",
      failureLooksLike:
        "A requirement list that reads as neutral and excludes by implication.",
      signal:
        "An accessibility item that has been open across more than one release.",
    },
  },
  {
    id: "E7",
    dimension: "Inclusion",
    quarter: 4,
    body: "Adoption analysis shows uptake is concentrated among travellers under 40 using recent devices. Older devices cannot run the overlay.",
    touches: ["citypass", "flowsense"],
    options: [
      {
        id: "lowSpec",
        label: "Fund a low-spec mode",
        consequence:
          "A low-spec mode is funded. Adoption broadens and the quarter's visible progress narrows.",
        completionDelta: -3,
        spendDelta: 20000,
        ethicalDelta: -1,
      },
      {
        id: "state",
        label: "Accept the segmentation and state it publicly",
        consequence:
          "The limitation is published alongside the adoption figures. No spend, and the claim now matches the product.",
        completionDelta: 0,
        spendDelta: 0,
        ethicalDelta: 0,
      },
      {
        id: "silent",
        label: "Continue without comment",
        consequence:
          "Adoption figures are reported without the device qualifier. The number looks better than the reach is.",
        completionDelta: 1,
        spendDelta: 0,
        ethicalDelta: 1,
      },
    ],
    card: {
      asks: "Who is systematically outside the group the product actually reaches.",
      failureLooksLike:
        "An adoption rate quoted without the population it was measured in.",
      signal:
        "Uptake concentrated in one age band, one device generation or one shift pattern.",
    },
  },
];

// --- THE GOVERNANCE CONSEQUENCE (Quarter 3) --------------------------------

export const GOVERNANCE_INCIDENT_BODY =
  "A consent complaint has been upheld by the regulator. Something must stop this week.";

export interface GovernanceResolution {
  id: "independent" | "sharedOwner" | "unassigned";
  outcome: string;
  cost: string;
  quartersLost: number;
  spendDelta: number;
  reputationalNote?: string;
}

export function resolveGovernanceIncident(
  model: GovernanceModel,
): GovernanceResolution {
  const ethical = model.ethicalRelease;
  const scaling = model.scalingDecision;

  if (ethical === "unassigned") {
    return {
      id: "unassigned",
      outcome:
        "No owner could be identified. The halt happened four weeks later, by escalation.",
      cost: "Two quarters of progress on the affected product, plus spend.",
      quartersLost: 2,
      spendDelta: 20000,
    };
  }

  if (ethical === scaling) {
    return {
      id: "sharedOwner",
      outcome:
        "The role that owns shipping also owns the brake. No halt occurred this quarter.",
      cost: "The complaint escalates: two quarters of progress on the affected product.",
      quartersLost: 2,
      spendDelta: 0,
      reputationalNote:
        "Reputational note: the regulator's finding is now on file against a product that kept shipping after it.",
    };
  }

  if (ethical === "dpo" || ethical === "crossFunctionalBoard") {
    return {
      id: "independent",
      outcome:
        "Ethical release owner halted the affected product within the week.",
      cost: "One quarter of progress on that product.",
      quartersLost: 1,
      spendDelta: 0,
    };
  }

  // Ethical release is assigned, differs from scaling, but sits with a role
  // that carries a delivery target. It is slower than an independent owner.
  return {
    id: "sharedOwner",
    outcome:
      "Ethical release sits with a role that carries its own delivery target. The halt was argued rather than executed.",
    cost: "The complaint escalates: two quarters of progress on the affected product.",
    quartersLost: 2,
    spendDelta: 0,
    reputationalNote:
      "Reputational note: the halt was contested internally before it took effect.",
  };
}

// --- 6.6 CLOSING REPLAY ----------------------------------------------------

export const REFLECTION_PROMPTS = [
  "Where do the biggest blind spots appear between feasibility and responsibility?",
  "Which kind of testing is most often underestimated although it is strategically decisive?",
  "When does an under-reflected future initiative become a trust or investment risk?",
];

export const DISCUSSION_IMPULSE =
  "When is stopping an innovation the better leadership decision than scaling it quickly?";
