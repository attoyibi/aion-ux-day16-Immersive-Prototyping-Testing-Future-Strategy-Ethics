import type {
  BenchAspect,
  BenchAspectId,
  CriteriaScores,
  EvidenceCardCopy,
} from "@/lib/types";

export const BENCH_ASPECTS: BenchAspect[] = [
  {
    id: "orientation",
    name: "Orientation",
    measures:
      "Whether the user knows where they are and which way to go.",
    showsUpAs: "Hesitation at the start, turning on the spot, looking up.",
    skipConclusion:
      "The interface is clear, because nobody complained about the interface — they were lost before they reached it.",
    cheapVersion: "Time from start to first correct heading.",
    findings: [
      {
        id: "orientation-time",
        aspect: "orientation",
        measured: "Time to first correct heading, against the signage baseline",
        result: "8s (baseline signage: 21s)",
        conclusion:
          "That the overlay orients travellers faster than signage does, at this station.",
        grade: "DECISION-GRADE",
        gradeReason: "It has a baseline, so “better than what?” has an answer.",
      },
      {
        id: "orientation-wrong",
        aspect: "orientation",
        measured: "Travellers who set off in the wrong direction",
        result: "4 of 40",
        conclusion:
          "That a first-heading error exists and is worth designing against.",
        grade: "SIGNAL",
        gradeReason:
          "Small n and no baseline: a pattern worth following, not a decision.",
      },
    ],
  },
  {
    id: "presence",
    name: "Presence",
    measures:
      "Whether the system feels like being in a place rather than reading a screen.",
    showsUpAs:
      "Users walking while looking, or stopping to look. The second one is the failure.",
    skipConclusion:
      "An immersive system is working because the task completed, missing that it completed despite the immersion.",
    cheapVersion: "Count how many stop walking to use it.",
    findings: [
      {
        id: "presence-guided",
        aspect: "presence",
        measured: 'Reported "felt like being guided, not reading"',
        result: "31 of 40",
        conclusion:
          "That the guidance metaphor reads as intended for most participants.",
        grade: "SIGNAL",
        gradeReason: "Self-report with no comparison condition.",
      },
      {
        id: "presence-intrusive",
        aspect: "presence",
        measured: "Reported the overlay felt intrusive",
        result: "6 of 40",
        conclusion: "That intrusiveness is a question to investigate.",
        grade: "ANECDOTE",
        gradeReason:
          "Unprompted comments, gathered without a consistent instrument.",
      },
    ],
  },
  {
    id: "overload",
    name: "Overload",
    measures:
      "Whether the amount of simultaneous information exceeds what a person can process while doing something else.",
    showsUpAs: "Users missing the one element that mattered.",
    skipConclusion:
      "More information is better, because every individual element tested well on its own.",
    cheapVersion:
      "Ask which element tells them where to go. Count who cannot say.",
    findings: [
      {
        id: "overload-overlays",
        aspect: "overload",
        measured: "Simultaneous overlays at peak",
        result: "6",
        conclusion:
          "That the peak overlay count is a design parameter, not an accident.",
        grade: "SIGNAL",
        gradeReason: "A count with no threshold to judge it against.",
      },
      {
        id: "overload-cannot-name",
        aspect: "overload",
        measured:
          "Participants who could not name the guidance element when asked",
        result: "14 of 40",
        conclusion:
          "That more than a third could not identify the element the design depends on.",
        grade: "DECISION-GRADE",
        gradeReason: "Observed under a consistent prompt, not self-assessed.",
      },
    ],
  },
  {
    id: "errorRobustness",
    name: "Error robustness",
    measures:
      "What happens after something goes wrong — for the user, not the system.",
    showsUpAs:
      "The moment a user takes a wrong turn and either recovers or stops.",
    skipConclusion:
      "It works, because you only recorded the sessions that went well.",
    cheapVersion: "Deliberately send five users the wrong way and watch.",
    findings: [
      {
        id: "error-recovered",
        aspect: "errorRobustness",
        measured: "Recovered after a wrong turn without help",
        result: "22 of 31",
        conclusion: "That unaided recovery is common but not reliable.",
        grade: "SIGNAL",
        gradeReason:
          "A denominator exists, but the wrong turns were not comparably induced.",
      },
      {
        id: "error-deadend",
        aspect: "errorRobustness",
        measured: "Sessions ending in a dead end",
        result: "5 of 40",
        conclusion:
          "That one in eight sessions leaves the traveller with nothing.",
        grade: "DECISION-GRADE",
        gradeReason: "An observed failure with a stated denominator.",
      },
    ],
  },
  {
    id: "acceptance",
    name: "Acceptance",
    measures:
      "Whether people will choose to use it when they are not being observed and not being asked.",
    showsUpAs: "Declining, hesitating, or quietly using the old method.",
    skipConclusion: "Satisfaction scores mean adoption. They do not.",
    cheapVersion: "Count declines, and ask the decliners why once.",
    findings: [
      {
        id: "acceptance-declined",
        aspect: "acceptance",
        measured: "Declined data collection",
        result: "18 of 40",
        conclusion:
          "That 45% will not accept the data terms as currently written.",
        grade: "DECISION-GRADE",
        gradeReason: "A count of behaviour, not an opinion.",
      },
      {
        id: "acceptance-reason",
        aspect: "acceptance",
        measured: 'Stated reason "unclear what is recorded"',
        result: "11 of 18",
        conclusion:
          "That transparency is the leading candidate explanation for declining.",
        grade: "SIGNAL",
        gradeReason: "Self-reported reasons, asked once, after the fact.",
      },
    ],
  },
  {
    id: "transfer",
    name: "Transfer to real use",
    measures:
      "Whether it survives outside the test: unprompted, unsupervised, on a later day.",
    showsUpAs: "Reuse, or a quiet return to the previous way of working.",
    skipConclusion:
      "Session success is real-world success. This is the most common and most expensive mistake in this module.",
    cheapVersion: "One follow-up a week later. Count who used it again.",
    findings: [
      {
        id: "transfer-reuse",
        aspect: "transfer",
        measured: "Used again unprompted on a later trip",
        result: "9 of 40",
        conclusion:
          "That 23% chose it again once nobody was watching. This is the number a scaling decision rests on.",
        grade: "DECISION-GRADE",
        gradeReason: "Behaviour recorded after the observer left.",
      },
      {
        id: "transfer-reverted",
        aspect: "transfer",
        measured: "Reverted to printed signage",
        result: "24 of 40",
        conclusion:
          "That the existing alternative remains the majority choice.",
        grade: "DECISION-GRADE",
        gradeReason:
          "An observed behavioural count against a real alternative.",
      },
    ],
  },
];

export const BENCH_ASPECTS_BY_ID: Record<BenchAspectId, BenchAspect> =
  BENCH_ASPECTS.reduce(
    (acc, aspect) => {
      acc[aspect.id] = aspect;
      return acc;
    },
    {} as Record<BenchAspectId, BenchAspect>,
  );

export const EVIDENCE_CARDS: EvidenceCardCopy[] = [
  {
    level: "ANECDOTE",
    whatItIs:
      "A single vivid instance, usually reported by someone with a stake.",
    recognise: "No denominator, no baseline, memorable phrasing.",
    maySupport:
      "A hypothesis, a design question, a reason to go and measure.",
    mayNotSupport:
      "Any decision that spends money or changes a process.",
  },
  {
    level: "SIGNAL",
    whatItIs:
      "A pattern across several observations, without a comparison or with a small, unrepresentative sample.",
    recognise:
      "A denominator exists, but no baseline — or the sample is convenient rather than representative.",
    maySupport: "Continuing, narrowing, or designing the next test.",
    mayNotSupport: "Scaling, or a claim of improvement.",
  },
  {
    level: "DECISION-GRADE",
    whatItIs:
      "An observed measure with a stated denominator, a baseline or comparison, and a stated scope.",
    recognise:
      "You can say better than what, for whom, under what conditions.",
    maySupport:
      "A scaling, funding or stopping decision, within its stated scope.",
    mayNotSupport: "Anything outside that scope. Scope does not travel.",
  },
];

export const TRANSFER_SKIPPED_LINE =
  "You did not measure whether anyone used it again. Every conclusion in this table describes what happens while someone is watching.";

export const TRANSFER_MEASURED_LINE =
  "You measured reuse. 9 of 40 came back. That number is the one a scaling decision rests on.";

export const CRITERIA_POLARITY_NOTE =
  "Risk is scored as exposure: 5 means high risk. Every other axis: 5 means strong.";

export interface Verdict {
  id: string;
  name: string;
  body: string;
  givesUp: string;
  test: (s: CriteriaScores) => boolean;
}

const high = (v: number) => v >= 4;
const low = (v: number) => v <= 2;

/** Ten verdict states plus a fallback, applied in order — first match wins. */
export const VERDICTS: Verdict[] = [
  {
    id: "pilotNarrow",
    name: "Pilot narrow, resist rollout",
    body: "People want this and it earns its place with users. Nobody can yet steer it, adjust it or stop it on a schedule.",
    givesUp:
      "Speed. Holding at a narrow pilot while steerability is built means a competitor may reach the market first.",
    test: (s) => high(s.uv) && low(s.st),
  },
  {
    id: "symbolic",
    name: "Symbolic innovation risk",
    body: "The organisation can build impressive things and is doing so. The people it is built for have not asked for it.",
    givesUp:
      "Credibility with the operational side, who will read the next initiative as another showcase.",
    test: (s) => low(s.uv) && high(s.ic),
  },
  {
    id: "reputational",
    name: "Reputational exposure — the brake is missing",
    body: "Delivery capability is strong and the ethical position is weak. This combination ships fast and ships harm.",
    givesUp:
      "The benefit of the doubt. Once an ethical failure is public, every later initiative is read through it.",
    test: (s) => high(s.ic) && low(s.et),
  },
  {
    id: "nothingToGovern",
    name: "Governable, but there is nothing to govern",
    body: "The control apparatus is in place and mature. There is no capability worth putting under it.",
    givesUp:
      "Momentum, and the patience of the people running the governance process.",
    test: (s) => high(s.st) && low(s.ic),
  },
  {
    id: "expensiveWrong",
    name: "Expensive to be wrong",
    body: "The exposure is high and the economic case is weak. The downside is funded and the upside is not.",
    givesUp:
      "Option value. Money committed here is money not held for a better-evidenced bet.",
    test: (s) => high(s.risk) && low(s.ev),
  },
  {
    id: "profitablePointless",
    name: "Profitable and pointless — check who benefits",
    body: "The business case holds and the user case does not. Somebody is gaining, and it is not the person using it.",
    givesUp:
      "Adoption. A product users do not value is carried by mandate, and mandates expire.",
    test: (s) => high(s.ev) && low(s.uv),
  },
  {
    id: "noMechanism",
    name: "Good intentions, no mechanism",
    body: "The ethical thinking is genuine and there is no machinery to enforce it. Intent without a lever is a preference.",
    givesUp:
      "Reliability. The ethical position holds only while the current people are in the current roles.",
    test: (s) => high(s.et) && low(s.st),
  },
  {
    id: "researchOnly",
    name: "Research, do not fund a pilot",
    body: "Every axis is weak and the exposure is high. There is no shape here to steer toward yet.",
    givesUp:
      "Visible progress this quarter, and the internal narrative that comes with it.",
    test: (s) =>
      s.ic <= 2 && s.uv <= 2 && s.st <= 2 && s.et <= 2 && s.ev <= 2 && s.risk >= 4,
  },
  {
    id: "scaleWithStopRule",
    name: "Scale, but define the stop rule",
    body: "Every axis is strong and the exposure is low. This is the rare shape that supports scaling.",
    givesUp:
      "Reversibility, unless a written stop rule is attached before the rollout starts.",
    test: (s) =>
      s.ic >= 4 && s.uv >= 4 && s.st >= 4 && s.et >= 4 && s.ev >= 4 && s.risk <= 2,
  },
  {
    id: "noDominantShape",
    name: "No dominant shape. Name your binding constraint.",
    body: "Nothing is above 3 and nothing is below 2. The profile is flat, so the decision cannot be read off it.",
    givesUp:
      "Clarity. A flat profile lets every stakeholder read their own priority into it.",
    test: (s) => {
      const all = [s.ic, s.uv, s.risk, s.st, s.et, s.ev];
      return all.every((v) => v <= 3 && v >= 2);
    },
  },
];

export const VERDICT_FALLBACK = {
  id: "fallback",
  name: "Mixed shape. State which single axis is binding and decide on that one.",
  body: "The profile has strengths and weaknesses that do not resolve into one of the recognised shapes. That is normal and is not a problem to fix by moving sliders.",
  givesUp:
    "The comfort of a single recommendation. Someone has to name the binding constraint out loud and own it.",
};

export function resolveVerdict(scores: CriteriaScores) {
  const match = VERDICTS.find((v) => v.test(scores));
  return match ?? VERDICT_FALLBACK;
}

/** Documented pre-fill rule: the console starts grounded in what was measured. */
export function prefillCriteria(selected: BenchAspectId[]): CriteriaScores {
  const measured = (id: BenchAspectId) => selected.includes(id);
  return {
    ic: 4,
    uv: 2 + (measured("transfer") ? 1 : 0),
    risk: 4 - (measured("acceptance") ? 1 : 0),
    st: 2 + (measured("errorRobustness") ? 1 : 0),
    et: 2 + (measured("acceptance") ? 1 : 0),
    ev: 3,
  };
}

export function criteriaLine(s: CriteriaScores): string {
  return `IC ${s.ic} · UV ${s.uv} · R ${s.risk} · St ${s.st} · Et ${s.et} · EV ${s.ev}`;
}

export const CRITERIA_LABELS: { key: keyof CriteriaScores; label: string; german: string }[] = [
  { key: "ic", label: "Innovation capability", german: "Innovationsfähigkeit" },
  { key: "uv", label: "User value", german: "Nutzermehrwert" },
  { key: "risk", label: "Risk", german: "Risiko" },
  { key: "st", label: "Steerability", german: "Steuerbarkeit" },
  { key: "et", label: "Ethics", german: "Ethik" },
  { key: "ev", label: "Economic viability", german: "Wirtschaftlichkeit" },
];

export const BENCH_CAPTION =
  "Strategy is not the technology. It is the fit between six things.";
