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

/**
 * The persona set attached to the concept deck. Three cards, because a senior
 * audience should see who the idea is for, who it is also for, and who it
 * quietly leaves out. Reading these is a documentation act, not product
 * behaviour: the product still does nothing at this stage.
 */
export interface Persona {
  id: string;
  role: "Primary" | "Secondary" | "Excluded by the current concept";
  initials: string;
  name: string;
  age: number;
  occupation: string;
  oneLine: string;
  quote: string;
  context: string;
  device: string;
  goals: string[];
  frustrations: string[];
  behaviour: string;
  accessibility: string;
  abandonTrigger: string;
  evidenceBase: string;
}

export const CONCEPT_PERSONAS: Persona[] = [
  {
    id: "anja",
    role: "Primary",
    initials: "AR",
    name: "Anja Roth",
    age: 34,
    occupation: "Field sales representative, medical devices",
    oneLine:
      "Crosses Central Interchange three to four times a week, almost always with a connection under ten minutes.",
    quote:
      "I don't need a map. I need to know whether to turn left or right, right now.",
    context:
      "Arrives on a regional train that is late more often than not, with a wheeled case in her left hand and her phone in her right. Peak hours, concourse at its loudest, six minutes to Platform 7.",
    device:
      "Personal iPhone 13, mobile data, screen brightness usually below half. Signal drops on the lower concourse.",
    goals: [
      "Know within ten seconds which direction to start walking",
      "Make the connection without running or asking staff",
      "Keep one hand free for the case at all times",
    ],
    frustrations: [
      "Overhead signage gives the platform number but not the direction from where she is standing",
      "The announcement she needs is the one that overlaps with another announcement",
      "Stopping to read means being walked into",
    ],
    behaviour:
      "Will not stop walking to read a screen. Abandons anything that needs more than two taps before it becomes useful.",
    accessibility:
      "Wears varifocals. Small text at arm's length is unreadable while she is moving.",
    abandonTrigger:
      "One confident instruction that turns out to be wrong. She would not open it a second time.",
    evidenceBase:
      "Composite of 11 intercept interviews on the concourse, Q1. Not yet validated against observed behaviour.",
  },
  {
    id: "grigor",
    role: "Secondary",
    initials: "GV",
    name: "Grigor Vasilev",
    age: 41,
    occupation: "Site engineer, travelling for a two-day installation",
    oneLine:
      "Passes through perhaps twice a year, does not read German, and has no mental model of the building.",
    quote:
      "I can read the number. I cannot read the sentence underneath it.",
    context:
      "Unfamiliar with the station layout. Carries a tool case and a laptop bag, so both hands are occupied and he stops to use his phone.",
    device:
      "Android mid-range on roaming data, which he keeps switched off unless he needs it.",
    goals: [
      "Understand the route without reading German",
      "Confirm he is still going the right way part-way along",
      "Avoid having to ask, which costs him time and confidence",
    ],
    frustrations: [
      "Platform numbering restarts in a second hall and nothing says so",
      "Directions given by staff are given in German at speaking speed",
    ],
    behaviour:
      "Stops walking to use the phone, then re-orients. Checks twice before committing to a direction.",
    accessibility:
      "No impairment, but effectively low-literacy in this context: language is the barrier, not vision.",
    abandonTrigger:
      "An English-only interface. He would fall back to the printed signage and photograph it.",
    evidenceBase:
      "Two interviews plus operator complaint log. Thin: treat as a hypothesis, not a finding.",
  },
  {
    id: "wilhelm",
    role: "Excluded by the current concept",
    initials: "WA",
    name: "Wilhelm Adler",
    age: 71,
    occupation: "Retired, travels to see family twice a month",
    oneLine:
      "Has a phone, has no data plan, and would not hold a device up in a crowd.",
    quote: "I have always managed with the boards. Why would I hold that up?",
    context:
      "Never in a hurry, but slower on stairs and unwilling to stand still in a moving crowd. Relies entirely on the printed signage and the departure boards.",
    device:
      "Feature phone. No camera overlay is possible on it at any price point.",
    goals: [
      "Reach the platform without stairs",
      "Not be conspicuous or feel rushed",
    ],
    frustrations: [
      "Signage that gets removed because a screen was supposed to replace it",
      "Being told the app is the easy way when the app is not available to him",
    ],
    behaviour:
      "Would not adopt this under any design. He is not a conversion target; he is a constraint.",
    accessibility:
      "Reduced mobility on stairs; no assistive technology in use.",
    abandonTrigger:
      "Not applicable. He never starts. The risk is that the concept removes what he already relies on.",
    evidenceBase:
      "Operator passenger panel, standing membership. Demographic is 19% of weekday footfall.",
  },
];

/** G1.1 OFF collapses the persona set into the segment that names nobody. */
export const CONCEPT_PERSONA_DAMAGED = {
  label: "Target group",
  value: "Every traveller",
  note: "No situation, no device, no constraint, no exclusion named.",
};

/**
 * Three lo-fi frames with annotations, the way a concept deck carries them
 * before anything is built. Each frame prints what is decided, what is not,
 * and the open question it is hiding.
 */
export interface WireframeAnnotation {
  id: string;
  frame: string;
  title: string;
  intent: string;
  onTheFrame: string[];
  notDecided: string[];
  openQuestion: string;
  fidelityNote: string;
}

export const CONCEPT_WIREFRAMES: WireframeAnnotation[] = [
  {
    id: "w1",
    frame: "01",
    title: "Destination select",
    intent:
      "The traveller states where they are going before the camera is ever opened, so the system has a target and the traveller has committed.",
    onTheFrame: [
      "A short list of destinations, largest tap targets at the top",
      "A free-entry field beneath the list",
      "No map, no search results page",
    ],
    notDecided: [
      "How the list is ordered — nearest, most used, or next to depart",
      "How many destinations a real concourse would need before the list stops working",
      "Whether the traveller's own connection could be read from a ticket instead of typed",
    ],
    openQuestion:
      "If the list has to hold sixty destinations, is this screen still the design, or a different one?",
    fidelityNote:
      "Lo-fi on purpose. Boxes and dashes, no type scale, no colour: the frame is arguing about structure, not appearance.",
  },
  {
    id: "w2",
    frame: "02",
    title: "Camera overlay",
    intent:
      "A single arrow anchored to the concourse, plus the distance remaining. One instruction, readable at walking pace.",
    onTheFrame: [
      "Live camera behind a single directional arrow",
      "One text label: destination and remaining distance",
      "No route line, no minimap, no turn list",
    ],
    notDecided: [
      "What the arrow does at a junction, or when the traveller turns their body",
      "What is shown when tracking is lost — nothing is drawn for that state",
      "Whether the arrow is legible against a bright glazed roof at midday",
    ],
    openQuestion:
      "This frame assumes the traveller holds the phone up while walking. That assumption is the whole concept, and nothing here tests it.",
    fidelityNote:
      "The camera feed is drawn as a grey field. In a lo-fi frame the environment is always the part that gets faked, and the environment is where this will fail.",
  },
  {
    id: "w3",
    frame: "03",
    title: "Arrival",
    intent:
      "Close the loop so the traveller knows the guidance is finished and they can put the phone away.",
    onTheFrame: [
      "A confirmation state with the destination repeated back",
      "Distance walked and turns taken",
      "A single control to start again",
    ],
    notDecided: [
      "Whether arrival is detected or declared by the traveller",
      "What happens if the platform changed while they were walking",
      "Whether anything is asked of the traveller here — feedback, rating, consent to be contacted",
    ],
    openQuestion:
      "Arrival is the only moment the traveller is standing still. Everything the project wants to measure will be tempted onto this screen.",
    fidelityNote:
      "The cheapest frame to draw and the one most likely to survive to production unchanged, which is worth being suspicious about.",
  },
];

export const CONCEPT_DECK_META = {
  deckLabel: "Innovation board · concept submission",
  version: "Concept draft v0.3",
  author: "Passenger Experience, innovation track",
  reviewDate: "Submitted for the next innovation board",
  attachmentsNote:
    "Reading the attachments works. The product does not — nothing on this slide has behaviour yet.",
};

// --- STAGE 2 ---------------------------------------------------------------

export const PROTOTYPE_DESTINATIONS = [
  "Platform 7",
  "Platform 3",
  "Exit North",
  "Taxi Rank",
] as const;

/** What each destination actually is, so the choice is a real choice. */
export interface DestinationDetail {
  name: string;
  service: string;
  departs: string;
  walk: string;
  note: string;
  /** Only Platform 7 was implemented for the demo. */
  wired: boolean;
}

export const PROTOTYPE_DESTINATION_DETAIL: Record<string, DestinationDetail> = {
  "Platform 7": {
    name: "Platform 7",
    service: "RE 4 regional service to Westhafen",
    departs: "departs 12:41",
    walk: "90 m · 2 turns · level access",
    note: "Your connection. Six minutes from now.",
    wired: true,
  },
  "Platform 3": {
    name: "Platform 3",
    service: "S 1 city line to the airport",
    departs: "departs 12:38",
    walk: "140 m · 3 turns · one flight of stairs",
    note: "Other side of the concourse, past the departure board.",
    wired: false,
  },
  "Exit North": {
    name: "Exit North",
    service: "Street level, bus bays B1–B6",
    departs: "buses every 4 min",
    walk: "60 m · 1 turn · level access",
    note: "The exit most travellers mean when they say “out”.",
    wired: false,
  },
  "Taxi Rank": {
    name: "Taxi Rank",
    service: "Sheltered rank, south portico",
    departs: "8 cars waiting",
    walk: "75 m · 2 turns · level access",
    note: "Signposted from the main hall but not from this concourse.",
    wired: false,
  },
};

export const PROTOTYPE_GUIDANCE = {
  heading: "How to use this build",
  body:
    "This is the demo the team would put in front of a stakeholder. Run it the way a traveller would: choose where you are going, follow the arrow, arrive. Then do something slightly different and watch what the build does with it.",
  tryHeading: "Things a real traveller also does",
  tryList: [
    "Choose a destination other than Platform 7",
    "Press Back part-way through the route",
    "Press “I'm following the arrow” twice, the way people do when nothing seems to have happened",
    "Rotate the phone",
    "Type a destination that is not in the list",
  ],
  tryFooter:
    "Five of these are handled differently by the build. The counter below records how many you have found.",
};

/** Prototype annotations, the way a team hands a build over for testing. */
export interface ScreenSpec {
  screen: string;
  title: string;
  wired: string[];
  faked: string[];
  knownLimits: string[];
  watchFor: string;
}

export const PROTOTYPE_SCREEN_SPECS: ScreenSpec[] = [
  {
    screen: "A",
    title: "Destination select",
    wired: [
      "All four destination controls are real buttons and all four respond",
      "The free-entry field accepts text and returns a result",
    ],
    faked: [
      "Departure times are static strings, not a timetable feed",
      "Walking distances were measured once, by hand, on a quiet Sunday",
    ],
    knownLimits: [
      "Only Platform 7 has a route behind it. The other three look identical and are not implemented",
      "Nothing is disabled, because the team wanted the demo to look complete",
    ],
    watchFor:
      "Whether a first-time user can tell which destinations are real before pressing one. They cannot, and that is deliberate in this build.",
  },
  {
    screen: "B",
    title: "Camera overlay",
    wired: [
      "The arrow renders over the concourse and animates",
      "Rotation, repeat presses and Back are all reachable",
    ],
    faked: [
      "The concourse is a drawn scene, not a camera feed",
      "The 90 m distance never counts down — it is a fixed label",
    ],
    knownLimits: [
      "The arrow orientation is hardcoded to one camera angle",
      "There is no lost-tracking state and no lost-signal state",
      "Two rapid presses are not de-duplicated",
    ],
    watchFor:
      "The moment a participant moves their body rather than the phone. Nothing in this build survives that.",
  },
  {
    screen: "C",
    title: "Arrival",
    wired: [
      "Confirmation renders with the destination and the route summary",
      "Start over returns to a clean Screen A",
    ],
    faked: [
      "Arrival is declared by pressing a button, not detected",
      "“2 turns” is a constant and does not reflect what the user did",
    ],
    knownLimits: [
      "No arrival state exists for any destination other than Platform 7",
      "Nothing is recorded when the session ends",
    ],
    watchFor:
      "Whether participants believe the system knew they had arrived. Most do, and that belief is not something this build has earned.",
  },
];

export const PROTOTYPE_BUILD_META = {
  buildLabel: "CityPass AR · demo build 0.9.2",
  environment: "Single device, single route, offline",
  statusBarTime: "12:35",
  connectionPressure: "RE 4 · Platform 7 · departs 12:41",
  handoffNote:
    "Built in nine days for the innovation board. Not instrumented, not load-tested, not reviewed for data protection.",
};

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

/**
 * The study behind the pilot, the way a research lead would hand it over.
 * Opened from the dashboard so the numbers have a method attached to them.
 */
export const PILOT_STUDY_DESIGN = {
  method: {
    label: "Method",
    design:
      "Unmoderated field study on the live concourse, with a moderated debrief at the platform.",
    sampling:
      "Intercept recruitment at the Hall B entrance, weekdays 07:00–10:00 and 16:00–19:00, quota-balanced on age band and journey frequency.",
    task: "Reach the platform printed on your own ticket. No route was given by the observer.",
    instrument:
      "Session telemetry (start, turns, arrival, abandonment) plus a 4-question debrief. Two observers coded the first 10 sessions jointly to check agreement.",
    duration: "6 weeks · 40 participants · 1 station",
    ethics:
      "Data protection assessment signed before the first session. Retention 8 weeks. Withdrawal possible at any point without giving a reason.",
  },
  participants: {
    label: "Participants",
    recruited: "40 recruited, 40 evaluated. No participant was excluded.",
    composition:
      "18–34: 14 · 35–54: 17 · 55+: 9. First-time users of the station: 11 of 40.",
    devices:
      "31 own-device sessions, 9 on a loan handset. 4 participants could not run the overlay on their own phone and were given the loan handset — recorded as a device limitation, not a failure.",
    declined:
      "18 of 40 declined data collection and completed the task on the printed-signage alternative. Their completion is counted; their telemetry is not.",
    notRepresented:
      "Nobody using a wheelchair, and nobody with a diagnosed visual impairment, was recruited. That gap is stated rather than smoothed over.",
  },
  baseline: {
    label: "Baseline",
    how: "The same task was measured on the existing printed signage, with a separate matched group of 40, in the two weeks before the pilot opened.",
    figures:
      "Baseline completion 24 of 40 · baseline time to platform 2m 55s · baseline turns 3.",
    caveat:
      "The baseline group was recruited the same way but is not the same people. Treat the difference as indicative, not as a within-subject effect.",
  },
  limits: {
    label: "What this pilot cannot tell you",
    items: [
      "Anything about a second station, a second language, or a seated posture — none were in scope",
      "Anything about the fourth week onward for an individual traveller: the follow-up ran once, at day 7",
      "Whether the 45% who declined would decline under different consent wording",
    ],
  },
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

/** Operations detail: what it takes for someone else to run this. */
export const SCALABLE_OPERATIONS = {
  release: {
    label: "Current release",
    rows: [
      ["Version", "2.4.0, released to all three sites"],
      ["Previous version", "2.3.1, still deployable, tested weekly"],
      ["Rollback time", "Under 20 minutes, executed by Station Operations"],
      ["Release cadence", "Every 6 weeks, or immediately for a stop-rule breach"],
      ["Change in 2.4.0", "Seated mode, French route strings, contrast overlay"],
    ] as [string, string][],
  },
  monitoring: {
    label: "What is watched, and by whom",
    rows: [
      ["Completion rate", "Daily · Station Operations · alerts below 72%"],
      ["Consent decline rate", "Weekly · Data Protection Officer"],
      ["Fallback usage", "Daily · Station Operations"],
      ["Accessibility path usage", "Monthly · Head of Passenger Experience"],
      ["Complaints upheld", "On occurrence · Data Protection Officer"],
    ] as [string, string][],
  },
  runbook: {
    label: "Runbook — who does what without the original team",
    rows: [
      ["New site onboarding", "Station Operations, 3 days, no engineering"],
      ["New language", "Content team, translation file only"],
      ["Suspected outage", "Station Operations, fall back to no-AR mode"],
      ["Consent complaint", "Data Protection Officer, halt authority, same week"],
    ] as [string, string][],
  },
  note:
    "None of this is a claim. Each row names a role, a frequency and a trigger, which is what makes it checkable by someone who was not in the room.",
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
