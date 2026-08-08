import type { StageId } from "@/lib/types";

export const CONSTANT_TASK =
  "You are a traveller at Central Interchange. Find your way to Platform 7.";

export const STAGE_ORDER: StageId[] = [
  "concept",
  "prototype",
  "pilot",
  "scalable",
];

export const STAGE_LABELS: Record<StageId, string> = {
  concept: "Concept Idea",
  prototype: "Prototype",
  pilot: "Pilot",
  scalable: "Scalable Solution",
};

export const THRESHOLD_LABEL = "the real threshold";

// --- STAGE 1 ---------------------------------------------------------------

export const CONCEPT_SLIDE = {
  title: 'CityPass AR — "Never miss a connection again"',
  claims: [
    "Instant orientation for every traveller",
    "Reduces missed connections by up to 40%",
    "Works anywhere in the station",
  ],
  assumptionBox: {
    heading: "What we do not know yet:",
    items: [
      "whether travellers will hold a phone up while walking",
      "whether the arrow is readable in a crowd",
      "whether the station will permit camera use on the concourse",
    ],
  },
  valueLine:
    "For a traveller with a 6-minute connection, this saves the 90 seconds currently spent reading overhead signage.",
  valueLineDamaged:
    "A flagship demonstration of our innovation capability.",
  contextLine:
    "For: travellers changing platforms under time pressure, at Central Interchange, during peak hours, on their own phone.",
  contextLineDamaged: "For: every traveller.",
  decisionLine:
    "Should we build it? Only if the station permits camera use and the printed signage stays. We are not removing an existing option.",
  decisionLineDamaged:
    "Technically feasible with existing phone hardware.",
  decisionLineDamagedNote: "Feasibility answered. Desirability not asked.",
  footer: "Status: idea. Nothing has been built.",
  deadToast: "Nothing happens. This is a claim, not a behaviour.",
  deadToastNoUser: "Everyone is not a user.",
  tryTaskResult:
    "There is nothing to try. The task cannot be attempted at this stage.",
  caption:
    "A concept can be evaluated for desirability. It cannot be evaluated for anything else, because there is nothing to observe.",
};

// --- STAGE 2 ---------------------------------------------------------------

export const PROTOTYPE_DESTINATIONS = [
  "Platform 7",
  "Platform 3",
  "Exit North",
  "Taxi Rank",
] as const;

export const PROTOTYPE_COPY = {
  screenATitle: "Where are you going?",
  screenBTitle: "Point your phone at the concourse",
  screenCTitle: "You have arrived",
  arrivalSummary: "Platform 7 · 90m · 2 turns",
  overlayLabel: "Platform 7 — 90m",
  overlayLabelDamaged: "Platform 7 — --m",
  freeEntryLabel: "Enter a destination not in the list",
  deviations: {
    P_D1: "Route not built. Only Platform 7 was implemented for the demo.",
    P_D2: "State not preserved.",
    P_D3: "Duplicate input not handled.",
    P_D4: "Arrow orientation is hardcoded to one camera angle.",
    P_D5: "Unrecognised. The demo has 4 hardcoded destinations.",
  },
  caption:
    "A prototype proves the idea can be built. It proves nothing about what happens when a real person does something slightly different.",
};

// --- STAGE 3 ---------------------------------------------------------------

export const PILOT_COPY = {
  consentBody:
    "CityPass AR records your position inside the station and the routes you take, for the duration of this pilot, to measure whether the guidance works. Data is deleted after 8 weeks. Participation is voluntary — the station's printed signage remains available.",
  consentAgree: "I agree",
  consentDecline: "I decline",
  declinedMode: "Running in declined-consent mode.",
  declinedFallback:
    "Platform 7: pass the departure board, turn right, 90m.",
  signalLostText:
    "Signal lost. Text directions: pass the departure board, turn right, 90m.",
  statePreserved: "Selection preserved.",
  scopeStatement:
    "Pilot scope: 1 station · English only · daytime hours · handheld phone only · 40 participants · 6 weeks",
  dashboardHeadline: "Pilot results — Central Interchange, 6 weeks",
  dashboardHeadlineDamaged: "Pilot results",
  refusalGerman: "Not available in this pilot. English only.",
  refusalSeated: "Not available in this pilot.",
  noAlternativePath: "No alternative path exists.",
  dpaIncomplete: "Data protection assessment: scheduled, not yet completed.",
  nonRepresentative:
    "Participants: 40 staff from the operator's head office.",
  noBaseline: "No baseline. Better than what?",
  sessionOnly: "Measured in the session only.",
  reuseRow: "Used again on a later trip: 9 of 40",
  caption:
    "A pilot produces evidence, but only about the world it was run in. Everything outside that scope is still an assumption.",
};

/** Baselines printed beside the learner's own live counters when G3.5 is on. */
export const PILOT_BASELINES = {
  completedRoutes: "baseline signage: 24 of 40",
  averageTurns: "baseline signage: 3",
};

// --- STAGE 4 ---------------------------------------------------------------

export const SCALABLE_STATIONS = [
  "Central Interchange",
  "North Terminal",
  "Airport Link",
] as const;

export type ScalableStation = (typeof SCALABLE_STATIONS)[number];

export const SCALABLE_DESTINATIONS: Record<ScalableStation, string[]> = {
  "Central Interchange": [
    "Platform 7",
    "Platform 3",
    "Exit North",
    "Taxi Rank",
  ],
  "North Terminal": ["Platform 2", "Platform 9", "Bus Bays", "Left Luggage"],
  "Airport Link": ["Terminal 1", "Terminal 3", "Car Hire", "Rail Exchange"],
};

export const SCALABLE_LANGUAGE_OPTIONS = ["EN", "EN+DE", "EN+DE+FR"] as const;

export const SCALABLE_ACCESSIBILITY_OPTIONS = [
  "Standard",
  "High contrast",
  "Seated mode",
] as const;

/** The only German UI copy in the app: the language-capability demonstration. */
export const SCALABLE_STRINGS = {
  en: {
    overlay: (destination: string) => `${destination} — 90 m`,
    follow: "Follow the arrow",
    arrived: "You have arrived",
    languageNote: "Language: English",
  },
  de: {
    overlay: (destination: string) =>
      `${destination.replace("Platform", "Gleis").replace("Terminal", "Terminal")} — 90 m`,
    follow: "Folgen Sie dem Pfeil",
    arrived: "Sie sind angekommen",
    languageNote: "Sprache: Deutsch",
  },
};

export const SCALABLE_GOVERNANCE = {
  scalingOwner: "Head of Passenger Experience",
  ethicalOwner: "Data Protection Officer",
  monitoringOwner: "Station Operations",
  cadence: "Quarterly",
  stopRule:
    "Withdraw if completion rate falls below 70% for two consecutive months, or if any consent complaint is upheld.",
  version: "2.4.0",
  rollback: "Yes — previous version 2.3.1",
  tbd: "TBD",
  noWayBack: "No way back.",
};

export const SCALABLE_COPY = {
  notSupported: "Not supported.",
  contrastHigh: "Contrast mode: high",
  noArFallback: "Running without camera.",
  fixedStation: "Station: Central Interchange (fixed)",
  staticBoard: "static — no live timetable feed",
  islandNote:
    "Runs beside every other system, connected to none.",
  loadResult: "200 concurrent sessions · response nominal · 0 dropped",
  caption:
    "A scalable solution is not a better prototype. It is a prototype plus everything needed for someone else to run it after you leave.",
};

// --- READOUTS --------------------------------------------------------------

export interface StageReadouts {
  taskAttempt: string;
  pathsImplemented: string;
  deviationsHandled: string;
  dataSource: string;
  scope?: string;
}

export const STAGE_READOUTS: Record<StageId, StageReadouts> = {
  concept: {
    taskAttempt: "NOT ATTEMPTABLE",
    pathsImplemented: "0 of 4",
    deviationsHandled: "0 of 5",
    dataSource: "None",
  },
  prototype: {
    taskAttempt: "COMPLETABLE — on 1 of 4 destinations",
    pathsImplemented: "1 of 4",
    deviationsHandled: "0 of 5",
    dataSource: "Hardcoded",
  },
  pilot: {
    taskAttempt: "COMPLETABLE — on 4 of 4 destinations",
    pathsImplemented: "4 of 4",
    deviationsHandled: "4 of 5",
    dataSource: "Live session counters",
    scope: "Narrow — 1 station, 1 language, 1 posture",
  },
  scalable: {
    taskAttempt: "COMPLETABLE — 4 of 4 destinations, 3 stations",
    pathsImplemented: "12 of 12",
    deviationsHandled: "5 of 5",
    dataSource: "Monitored, with rollback",
    scope: "Broad — configurable station, language, posture",
  },
};

// --- 4.9 GO / NO-GO --------------------------------------------------------

export const GO_NO_GO_EVIDENCE = {
  heading: "CityPass AR · Pilot results, Central Interchange, 6 weeks",
  rows: [
    { label: "Completed routes", value: "27 of 40   (baseline signage: 24)" },
    { label: "Average time to platform", value: "2m 10s   (baseline: 2m 55s)" },
    { label: "Participants who declined consent", value: "18 of 40" },
    { label: "Discontinued (discomfort/confusion)", value: "3 of 40" },
    { label: "Used again on a later trip", value: "9 of 40" },
    { label: "Data protection assessment", value: "complete" },
    { label: "Languages supported", value: "English only" },
    { label: "Decision owner for scaling", value: "TBD" },
  ],
};

export const GO_NO_GO_ROWS: {
  feasibilityQ: string;
  feasibilityA: string;
  responsibilityQ: string;
  responsibilityA: string;
}[] = [
  {
    feasibilityQ: "Can we build it?",
    feasibilityA: "Yes, it runs today.",
    responsibilityQ: "Should we build it?",
    responsibilityA: "Not until 18 of 40 declining is understood.",
  },
  {
    feasibilityQ: "Who is impressed?",
    feasibilityA: "The board saw a working demo.",
    responsibilityQ: "Who benefits?",
    responsibilityA: "9 of 40 chose it again. The other 31 did not.",
  },
  {
    feasibilityQ: "What is the demo?",
    feasibilityA: "45 seconds faster to the platform.",
    responsibilityQ: "What is the decision?",
    responsibilityA:
      "Whether to fund a second language before a second site.",
  },
  {
    feasibilityQ: "What is possible?",
    feasibilityA: "Three stations by Q3.",
    responsibilityQ: "What is defensible?",
    responsibilityA: "One station, with a named owner, by Q3.",
  },
  {
    feasibilityQ: "When do we launch?",
    feasibilityA: "Week 6.",
    responsibilityQ: "When do we stop?",
    responsibilityA: "Undefined. Nobody has written the condition.",
  },
  {
    feasibilityQ: "What is the tech risk?",
    feasibilityA: "Signal loss on the lower concourse.",
    responsibilityQ: "What is the trust risk?",
    responsibilityA: "Scaling a system 45% of travellers declined.",
  },
];

export const GO_NO_GO_FAILURE_LINES = {
  feasibility:
    "This mindset systematically fails to notice who is missing from the numbers.",
  responsibility:
    "This mindset systematically fails to notice how long deliberation costs, and who pays for delay.",
};

export const GO_NO_GO_CLOSING = "The evidence did not change. The decision did.";

// --- 4.10 COMPARISON TABLE -------------------------------------------------

export const COMPARISON_DECISION_ROW: Record<StageId, string> = {
  concept: "Whether it is worth building anything.",
  prototype: "Whether it can be built at all.",
  pilot: "Whether it works for the people and place it was tested in.",
  scalable: "Whether it can be operated by others, elsewhere, over time.",
};

export const COMPARISON_CAPTION =
  "Most scaling failures are a Pilot answer being used for a Scalable question.";
