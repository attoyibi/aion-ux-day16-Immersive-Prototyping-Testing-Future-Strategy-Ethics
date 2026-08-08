import type { CaseTrackId, CaseSubTabId, VariantId } from "@/lib/types";

/**
 * The frozen assessment case. Every learner sees identical content in identical
 * order. Flaw ids ride on `flawId` and are emitted only as a `data-flaw-id`
 * attribute — never as visible text, never as a class name, never announced.
 */

export interface DocField {
  label: string;
  value: string;
  flawId?: string;
}

export interface DocQuote {
  who: string;
  text: string;
  flawId?: string;
}

export interface DocTable {
  head: string[];
  rows: { cells: string[]; flawId?: string }[];
}

export const CASE_TITLE =
  "NextWorld UX — Scaling Decision for an Immersive Innovation Programme";

export const CASE_BACKGROUND =
  "Over the past months the company has developed several prototypes: AR-supported consulting, VR-based training, and neuro-informed UX research. Early results are promising but inconsistent. Some users report high value, others show overload or scepticism. Leadership now requires a decision on which approaches to scale, which to keep testing, and which to stop for now.";

export const CASE_CONSTRAINTS = [
  "Budget available: EUR 260,000 for the next scaling and pilot phase",
  "Timeline: 16 weeks for prioritisation, governance setup and new pilot planning",
  "Not all approaches can continue in parallel",
  "Stakeholders from Innovation, IT, business unit, data protection and management pursue different goals",
  "Early market signals must remain visible in the short term",
  "Wrong decisions could amplify cost, reputation risk and internal blockage",
];

export const CASE_NUDGE = "Try me — click a track to open its dossier.";

export const SUB_TABS: { id: CaseSubTabId; label: string }[] = [
  { id: "prototype", label: "Prototype Card" },
  { id: "testReport", label: "Test Report" },
  { id: "ethics", label: "Ethics & Data Note" },
  { id: "stakeholders", label: "Stakeholder Positions" },
  { id: "budget", label: "Budget Request" },
];

export interface TrackDossierData {
  id: CaseTrackId;
  name: string;
  description: string;
  leadOwner: string;
  maturityLabel: string;
  prototype: DocField[];
  testReport: { fields: DocField[]; table?: DocTable; footnotes?: DocField[] };
  ethics: DocField[];
  stakeholders: DocQuote[];
  budget: { fields: DocField[]; table?: DocTable };
}

export const TRACKS: TrackDossierData[] = [
  {
    id: "ar",
    name: "AR Service Consulting",
    description:
      "Overlay guidance for field service consultations on customer sites.",
    leadOwner: "Head of Innovation",
    maturityLabel: "Concept / early prototype",
    prototype: [
      { label: "Track", value: "AR Service Consulting" },
      { label: "Maturity", value: "Concept / early prototype", flawId: "F04" },
      { label: "Build state", value: "One guided workflow, one device model" },
      {
        label: "Intended users",
        value: "Field service technicians on customer sites",
      },
      { label: "Hardware", value: "Handheld tablet, rear camera overlay" },
      { label: "Integration", value: "None. Standalone build." },
      { label: "Owner", value: "Head of Innovation" },
    ],
    testReport: {
      fields: [
        {
          label: "Result headline",
          value: "Strong engagement — 87% attention rate",
          flawId: "F02",
        },
        { label: "Participants", value: "6 people, all from the Innovation department. No field service technicians took part.", flawId: "F01" },
        { label: "Sessions", value: "6 sessions, 25 minutes each, one site" },
        { label: "Method", value: "Moderated walkthrough, observer present" },
        { label: "Satisfaction", value: "4.2 of 5", flawId: "F08" },
        { label: "Attention rate", value: "87%" },
        {
          label: "Follow-up",
          value: "None scheduled",
        },
      ],
    },
    ethics: [
      {
        label: "GDPR assessment",
        value: "scheduled, not yet completed",
        flawId: "F03",
      },
      { label: "Data recorded", value: "Session video, device telemetry" },
      { label: "Retention", value: "12 months" },
      { label: "Consent", value: "Verbal, recorded at session start" },
      { label: "Alternative path", value: "Not defined" },
    ],
    stakeholders: [
      {
        who: "Head of Innovation",
        text: "This is the track that gives us something to show. Six sessions and the engagement numbers already speak for themselves — I would move on it this quarter.",
      },
      {
        who: "Business Unit Lead",
        text: "I have not seen it in front of a technician yet. Until it runs on a real customer site with our own people, I cannot plan around it.",
      },
      {
        who: "Data Protection Officer",
        text: "Session video on customer premises raises questions we have not answered. I would want the assessment finished before anything is scheduled.",
      },
    ],
    budget: {
      fields: [
        { label: "Requested", value: "EUR 120,000", flawId: "F04" },
        { label: "Phase", value: "Scaling and rollout" },
        { label: "Rollout start", value: "Week 6", flawId: "F03" },
        { label: "Headcount assumed", value: "2 FTE for 16 weeks" },
        { label: "Hardware", value: "40 tablets" },
      ],
    },
  },
  {
    id: "vr",
    name: "VR Training Modules",
    description:
      "Immersive training scenarios for maintenance and safety procedures.",
    leadOwner: "Business Unit Lead",
    maturityLabel: "Prototype, tested",
    prototype: [
      { label: "Track", value: "VR Training Modules" },
      { label: "Maturity", value: "Prototype, tested" },
      { label: "Build state", value: "Three scenarios, headset build" },
      { label: "Intended users", value: "Maintenance and safety trainees" },
      {
        label: "Requirements",
        value:
          "Standing position, full room mobility, two-hand controllers, normal colour vision",
        flawId: "F07",
      },
      { label: "Session length", value: "35 minutes" },
      { label: "Integration", value: "Exports completion records to the LMS" },
      { label: "Owner", value: "Business Unit Lead" },
    ],
    testReport: {
      fields: [
        {
          label: "Measured dimensions",
          value: "Presence, Enjoyment, Visual quality",
          flawId: "F05",
        },
        { label: "Participants", value: "9 recruited, 7 evaluated" },
        { label: "Presence", value: "8.1 of 10" },
        { label: "Enjoyment", value: "8.6 of 10" },
        { label: "Visual quality", value: "7.9 of 10" },
        { label: "Satisfaction", value: "8.2 of 10", flawId: "F08" },
      ],
      footnotes: [
        {
          label: "Note",
          value:
            "2 of 9 participants discontinued the session (discomfort). Excluded from results as not evaluable.",
          flawId: "F06",
        },
      ],
    },
    ethics: [
      { label: "GDPR assessment", value: "Complete, signed week 2" },
      { label: "Data recorded", value: "Headset telemetry, completion records" },
      { label: "Retention", value: "24 months, stated in consent" },
      { label: "Consent", value: "Written, countersigned" },
      {
        label: "Alternative path",
        value: "Classroom module remains available",
      },
    ],
    stakeholders: [
      {
        who: "Business Unit Lead",
        text: "The trainees who finished it were faster on the procedure afterwards. I want a second cohort before we commit to a rollout.",
      },
      {
        who: "IT Lead",
        text: "Nine headsets I can support. Two hundred headsets across three sites is a different service model, and nobody has costed it.",
      },
      {
        who: "Executive Board Member",
        text: "Training is not the story the market is waiting for from us. I would not lead with this one.",
      },
    ],
    budget: {
      fields: [
        { label: "Requested", value: "EUR 105,000" },
        { label: "Phase", value: "Second pilot cohort and LMS integration" },
        { label: "Rollout start", value: "Week 11" },
        { label: "Headcount assumed", value: "1.5 FTE for 16 weeks" },
        { label: "Hardware", value: "25 headsets" },
      ],
    },
  },
  {
    id: "neuro",
    name: "Neuro-informed UX Research",
    description:
      "Eye-tracking and EEG measurement of attention during product evaluation.",
    leadOwner: "Innovation lead, research unit",
    maturityLabel: "Research, early findings",
    prototype: [
      { label: "Track", value: "Neuro-informed UX Research" },
      { label: "Maturity", value: "Research, early findings" },
      { label: "Build state", value: "Lab setup, two instrumented rooms" },
      { label: "Intended users", value: "Internal research and product teams" },
      {
        label: "Practical applicability",
        value: "low / unclear",
        flawId: "F11",
      },
      { label: "Equipment", value: "Eye tracker, 32-channel EEG cap" },
      { label: "Integration", value: "None. Results delivered as reports." },
      { label: "Owner", value: "Innovation lead, research unit" },
    ],
    testReport: {
      fields: [
        {
          label: "Conclusion",
          value: "High fixation on the offer panel confirms purchase intent.",
          flawId: "F10",
        },
        { label: "Participants", value: "12 recruited, 12 evaluated" },
        {
          label: "Signals recorded",
          value: "Eye-tracking fixations, EEG signals",
          flawId: "F09",
        },
        { label: "Fixation on offer panel", value: "64% of session time" },
        { label: "Satisfaction", value: "78%", flawId: "F08" },
        { label: "Task completion", value: "83%" },
        { label: "Session length", value: "45 minutes" },
      ],
    },
    ethics: [
      {
        label: "Consent text",
        value: "Data collected will be used to improve our products.",
        flawId: "F09",
      },
      { label: "GDPR assessment", value: "Complete, signed week 1" },
      { label: "Retention", value: "36 months" },
      { label: "Consent", value: "Written, single page" },
      { label: "Alternative path", value: "Participation is optional" },
    ],
    stakeholders: [
      {
        who: "Executive Board Member",
        text: "This is the one that puts us ahead of everyone in the sector. I want it visible in the next quarterly statement and I will back it personally.",
        flawId: "F11",
      },
      {
        who: "Data Protection Officer",
        text: "We are recording signals from people's bodies. I would want to reread what exactly they were told before this goes any further.",
      },
      {
        who: "IT Lead",
        text: "The lab runs on its own kit and does not touch our estate. From my side this is the least disruptive of the three.",
      },
    ],
    budget: {
      fields: [
        { label: "Requested", value: "EUR 85,000" },
        { label: "Phase", value: "Third study series" },
        { label: "Rollout start", value: "No rollout in this phase" },
        { label: "Headcount assumed", value: "1 FTE for 16 weeks" },
        { label: "Equipment", value: "One additional eye tracker" },
      ],
    },
  },
];

export const TRACKS_BY_ID: Record<CaseTrackId, TrackDossierData> =
  TRACKS.reduce(
    (acc, track) => {
      acc[track.id] = track;
      return acc;
    },
    {} as Record<CaseTrackId, TrackDossierData>,
  );

// --- 8.6 GOVERNANCE PANEL · TIMELINE · BUDGET OVERVIEW ---------------------

export const CASE_GOVERNANCE_TABLE: DocTable = {
  head: ["Role", "Owner"],
  rows: [
    { cells: ["Innovation evaluation", "Innovation lead"] },
    { cells: ["Ethical release owner", "TBD"], flawId: "F12" },
    { cells: ["Decision owner for scaling", "TBD"], flawId: "F12" },
    { cells: ["Portfolio adjustment", "Executive board"] },
    { cells: ["Monitoring", "Not assigned"] },
    { cells: ["Review cadence", "Not defined"] },
  ],
};

export const CASE_TIMELINE_WEEKS = Array.from({ length: 16 }, (_, i) => i + 1);

export interface TimelineRow {
  workstream: string;
  /** Inclusive week span, 1-indexed. */
  from: number;
  to: number;
  flawId?: string;
}

export const CASE_TIMELINE: TimelineRow[] = [
  { workstream: "Prioritisation workshop", from: 1, to: 3 },
  { workstream: "AR rollout", from: 6, to: 16, flawId: "F13" },
  { workstream: "Governance framework defined", from: 10, to: 12, flawId: "F13" },
  { workstream: "VR second cohort", from: 11, to: 16 },
  { workstream: "Neuro study series 3", from: 4, to: 14 },
  { workstream: "New pilot planning", from: 13, to: 16 },
];

export const CASE_BUDGET_TABLE: DocTable = {
  head: ["Line", "Amount"],
  rows: [
    { cells: ["AR Service Consulting — requested", "EUR 120,000"] },
    { cells: ["VR Training Modules — requested", "EUR 105,000"] },
    { cells: ["Neuro-informed UX Research — requested", "EUR 85,000"] },
    { cells: ["Total requested", "EUR 310,000"], flawId: "F14" },
    { cells: ["Budget available", "EUR 260,000"], flawId: "F14" },
  ],
};

// --- 8.7 THE THREE SCALING VARIANTS ---------------------------------------

export const VARIANT_HEADER =
  "Strategy options prepared by the FutureInteraction Hub programme board.";

export interface VariantData {
  id: VariantId;
  name: string;
  description: string;
  tracksAdvanced: string;
  budgetConsumed: string;
  weeksToOutput: string;
  governanceArtefacts: string;
  reversible: string;
  stakeholdersSatisfied: string;
}

export const VARIANTS: VariantData[] = [
  {
    id: "A",
    name: "Broad parallel scaling",
    description:
      "All three tracks advance simultaneously. Maximum visibility within the quarter. Consistency, governance and support load are unresolved.",
    tracksAdvanced: "3",
    budgetConsumed: "EUR 240,000",
    weeksToOutput: "6",
    governanceArtefacts: "0",
    reversible: "No",
    stakeholdersSatisfied: "1 of 5",
  },
  {
    id: "B",
    name: "Focused piloting",
    description:
      "One or two tracks advance under a defined testing and ethics framework. Slower visible output, stronger comparability and control.",
    tracksAdvanced: "2",
    budgetConsumed: "EUR 130,000",
    weeksToOutput: "11",
    governanceArtefacts: "3",
    reversible: "Partly",
    stakeholdersSatisfied: "3 of 5",
  },
  {
    id: "C",
    name: "Observe and research",
    description:
      "No rollout in this phase. Research and structured testing continue. Lowest risk exposure, lowest external visibility.",
    tracksAdvanced: "0",
    budgetConsumed: "EUR 45,000",
    weeksToOutput: "none this phase",
    governanceArtefacts: "1",
    reversible: "Yes",
    stakeholdersSatisfied: "2 of 5",
  },
];

export const VARIANT_ATTRIBUTE_ROWS: {
  label: string;
  key: keyof Pick<
    VariantData,
    | "tracksAdvanced"
    | "budgetConsumed"
    | "weeksToOutput"
    | "governanceArtefacts"
    | "reversible"
    | "stakeholdersSatisfied"
  >;
}[] = [
  { label: "Tracks advanced", key: "tracksAdvanced" },
  { label: "Budget consumed", key: "budgetConsumed" },
  { label: "Weeks to first visible output", key: "weeksToOutput" },
  { label: "Governance artefacts required", key: "governanceArtefacts" },
  { label: "Reversible after start", key: "reversible" },
  { label: "Stakeholders satisfied on current evidence", key: "stakeholdersSatisfied" },
];

// --- 8.8 DECISION CONSOLE --------------------------------------------------

export const CASE_BUDGET_TOTAL = 260000;
export const CASE_BUDGET_STEP = 10000;

export const CASE_OVER_BUDGET_LINE =
  "Allocated total exceeds available budget.";

export const FREE_TEXT_FIELDS = [
  {
    key: "leitbild" as const,
    label: "Leitbild for future-capable UX",
    guide: "Guide length: 2 sentences.",
  },
  {
    key: "leadDecisions" as const,
    label:
      "Three strategic lead decisions (prototyping/testing, scaling, ethics)",
    guide: "Guide length: 3 short decisions, one line each.",
  },
  {
    key: "remainingRisk" as const,
    label: "One risk that remains despite your decision",
    guide: "Guide length: 1–2 sentences.",
  },
  {
    key: "managementStatement" as const,
    label: "Management statement to the division lead",
    guide: "Guide length: 3–4 sentences.",
  },
];

export const NOT_ANSWERED = "— not answered —";

export const TRACK_CALL_LABELS = {
  scale: "Scale",
  pilot: "Keep Piloting",
  pause: "Pause",
} as const;
