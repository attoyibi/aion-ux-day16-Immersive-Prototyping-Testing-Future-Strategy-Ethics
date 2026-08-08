import type {
  GateMap,
  StageId,
  StressId,
  StressResult,
  StressTest,
} from "@/lib/types";

export const STRESS_TESTS: StressTest[] = [
  { id: "S1", label: "A colour-blind traveller uses it" },
  { id: "S2", label: "The network drops mid-route" },
  { id: "S3", label: "A traveller declines data collection" },
  { id: "S4", label: "Someone speaks only German" },
  { id: "S5", label: "200 travellers at once" },
  { id: "S6", label: "Legal asks who owns this and when it stops" },
];

export const STRESS_IDS: StressId[] = ["S1", "S2", "S3", "S4", "S5", "S6"];

type Row = Record<StressId, { result: StressResult; sentence: string }>;

/** The base matrix. Gate overrides may only lower a cell, never raise one. */
export const STRESS_MATRIX: Record<StageId, Row> = {
  concept: {
    S1: {
      result: "NOT BUILT",
      sentence:
        "there is no interface, so there is nothing to be unable to see.",
    },
    S2: {
      result: "NOT BUILT",
      sentence: "nothing is running, so nothing can drop.",
    },
    S3: {
      result: "NOT BUILT",
      sentence:
        "there is no data collection to decline, because there is no data collection.",
    },
    S4: {
      result: "NOT BUILT",
      sentence:
        "there are no words in the product yet, only words on a slide.",
    },
    S5: {
      result: "NOT BUILT",
      sentence: "one traveller cannot use it either.",
    },
    S6: {
      result: "NOT BUILT",
      sentence:
        "there is nothing to own yet. That is legitimate at this stage, and stops being legitimate the moment a rollout date appears.",
    },
  },
  prototype: {
    S1: {
      result: "BREAKS",
      sentence:
        "the platform markers rely on red and green alone. The traveller sees an arrow and two identical grey dots.",
    },
    S2: {
      result: "BREAKS",
      sentence:
        "the arrow vanishes and the screen stays empty. The traveller is standing in a concourse with nothing.",
    },
    S3: {
      result: "BREAKS",
      sentence:
        "there is no consent step and no alternative. Declining is not an available action.",
    },
    S4: {
      result: "BREAKS",
      sentence:
        "every string is hardcoded English. A German-speaking traveller cannot start.",
    },
    S5: {
      result: "BREAKS",
      sentence: "the session counter stalls at 12 and the queue never clears.",
    },
    S6: {
      result: "BREAKS",
      sentence:
        "no owner, no monitoring, no stop rule, no version. There is nothing to answer with.",
    },
  },
  pilot: {
    S1: {
      result: "DEGRADES",
      sentence:
        "the arrow is still visible, but the red and green platform markers are indistinguishable. The traveller arrives, slower.",
    },
    S2: {
      result: "PASSES",
      sentence:
        "the arrow is replaced by text directions and a retry. The traveller continues.",
    },
    S3: {
      result: "PASSES",
      sentence:
        "declining routes the traveller to the printed-signage equivalent. The task still completes.",
    },
    S4: {
      result: "BREAKS",
      sentence:
        "the pilot ran in English only. A German-speaking traveller cannot use it at all.",
    },
    S5: {
      result: "DEGRADES",
      sentence:
        "the pilot was sized for 40 participants. At 200 the counters lag and sessions queue, though nothing is lost.",
    },
    S6: {
      result: "DEGRADES",
      sentence:
        "a monitoring owner exists but no stop rule is written. Nobody can say when this ends.",
    },
  },
  scalable: {
    S1: {
      result: "PASSES",
      sentence:
        "high-contrast mode restyles the overlay and every marker carries a label as well as a colour.",
    },
    S2: {
      result: "PASSES",
      sentence: "the no-AR fallback renders a standalone text and map route.",
    },
    S3: {
      result: "PASSES",
      sentence:
        "declining is a supported path with a maintained alternative.",
    },
    S4: {
      result: "PASSES",
      sentence:
        "the language configuration serves EN, DE and FR from the same build.",
    },
    S5: {
      result: "PASSES",
      sentence: "200 concurrent sessions, none dropped, response nominal.",
    },
    S6: {
      result: "PASSES",
      sentence:
        "named owners for scaling, ethical release and monitoring; a written stop rule with a threshold and a duration; version 2.4.0 with rollback to 2.3.1.",
    },
  },
};

/** Sentences printed when a gate override has lowered a cell below its base. */
const OVERRIDE_SENTENCES: Partial<
  Record<StageId, Partial<Record<StressId, string>>>
> = {
  pilot: {
    S3: "the consent screen has one button. Declining is not an available action, so the traveller either agrees or gives up.",
  },
  scalable: {
    S1: "accessibility and inclusion are switched off. High-contrast mode returns “Not supported” and the markers carry colour only.",
    S4: "the build is fixed to one station and one language. A German-speaking traveller cannot use it.",
    S6: "governance is incomplete. Something in the ownership, stop rule or rollback chain is missing, so the answer to Legal is partial.",
  },
};

const S6_ALL_OFF_SENTENCE =
  "Nobody owns it, nobody watches it, and there is no way back.";

const RANK: Record<StressResult, number> = {
  "NOT BUILT": 0,
  BREAKS: 1,
  DEGRADES: 2,
  PASSES: 3,
};

/** A gate may only lower a cell. NOT BUILT is never overwritten. */
function lower(base: StressResult, to: StressResult): StressResult {
  if (base === "NOT BUILT") return base;
  return RANK[to] < RANK[base] ? to : base;
}

export interface ResolvedCell {
  result: StressResult;
  sentence: string;
  /** True when a switched-off gate lowered this cell below its base value. */
  overridden: boolean;
}

const NEUTRAL_FALLBACK: ResolvedCell = {
  result: "NOT BUILT",
  sentence: "this combination is not defined for the current stage.",
  overridden: false,
};

export function resolveStressCell(
  stage: StageId,
  stress: StressId,
  gates: GateMap,
): ResolvedCell {
  const row = STRESS_MATRIX[stage];
  const base = row?.[stress];
  if (!base) return NEUTRAL_FALLBACK;

  let result = base.result;
  let sentence = base.sentence;
  let overridden = false;

  const applyOverride = (to: StressResult, custom?: string) => {
    const next = lower(result, to);
    if (next !== result) {
      result = next;
      overridden = true;
      const fromTable = OVERRIDE_SENTENCES[stage]?.[stress];
      sentence = custom ?? fromTable ?? sentence;
    }
  };

  if (stage === "pilot" && stress === "S3" && !gates["G3.3"]) {
    applyOverride("BREAKS");
  }

  if (stage === "scalable") {
    if (stress === "S1" && !gates["G4.1"]) applyOverride("BREAKS");
    if (stress === "S4" && !gates["G4.2"]) applyOverride("BREAKS");
    if (stress === "S6") {
      const g44 = gates["G4.4"];
      const g45 = gates["G4.5"];
      const g46 = gates["G4.6"];
      if (!g44 && !g45 && !g46) {
        applyOverride("BREAKS", S6_ALL_OFF_SENTENCE);
      } else if (!g44 || !g45 || !g46) {
        applyOverride("DEGRADES");
      }
    }
  }

  // G2.4 OFF holds Prototype/S5 at BREAKS and G3.6 OFF holds Pilot/S1 at
  // DEGRADES. Both are already the base value; documented here for clarity.

  return { result, sentence, overridden };
}

export const STRESS_RESULT_VOCABULARY: StressResult[] = [
  "NOT BUILT",
  "BREAKS",
  "DEGRADES",
  "PASSES",
];

export const TOTAL_STRESS_CELLS = 24;
