export type TabId = "ladder" | "bench" | "room" | "case";

export type StageId = "concept" | "prototype" | "pilot" | "scalable";

export type StressId = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export type StressResult = "NOT BUILT" | "BREAKS" | "DEGRADES" | "PASSES";

export type GateState = "MET" | "NOT MET";

export type EvidenceLevel = "ANECDOTE" | "SIGNAL" | "DECISION-GRADE";

export type GateId =
  | "G1.1"
  | "G1.2"
  | "G1.3"
  | "G1.4"
  | "G2.1"
  | "G2.2"
  | "G2.3"
  | "G2.4"
  | "G2.5"
  | "G3.1"
  | "G3.2"
  | "G3.3"
  | "G3.4"
  | "G3.5"
  | "G3.6"
  | "G4.1"
  | "G4.2"
  | "G4.3"
  | "G4.4"
  | "G4.5"
  | "G4.6";

export type GateTriad = "Responsible" | "Connectable" | "Governable";

export interface GateMicroCard {
  whatItMeans: string;
  doThis: string;
  avoid: string;
  howToCheck: string;
  withoutIt: string;
  curriculum: string;
  /** A worked pair: the same artefact written weakly, then written well. */
  example: { weak: string; strong: string };
  /** Where the learner can see this gate at work in the current stage. */
  seeItHere: string;
}

export interface Gate {
  id: GateId;
  stage: StageId;
  name: string;
  /** German curriculum term shown in parentheses after the name, where the spec requires it. */
  germanTerm?: string;
  triad?: GateTriad;
  /** Plain-language description of what switching this gate OFF does to the live stage. */
  damage: string;
  card: GateMicroCard;
}

export type GateMap = Record<GateId, boolean>;

export interface StageDossier {
  stage: StageId;
  title: string;
  definition: string;
  whatExists: string;
  canAnswer: string;
  cannotAnswer: string;
  decisions: string;
  wrongMove: string;
  /** Label differs on the Scalable dossier ("To stay here"). */
  nextLabel: string;
  nextStep: string;
}

export interface StressTest {
  id: StressId;
  label: string;
}

export interface StressCell {
  stage: StageId;
  stress: StressId;
  result: StressResult;
  sentence: string;
}

export type BenchAspectId =
  | "orientation"
  | "presence"
  | "overload"
  | "errorRobustness"
  | "acceptance"
  | "transfer";

export interface BenchFinding {
  id: string;
  aspect: BenchAspectId;
  measured: string;
  result: string;
  conclusion: string;
  grade: EvidenceLevel;
  gradeReason: string;
}

export interface BenchAspect {
  id: BenchAspectId;
  name: string;
  measures: string;
  showsUpAs: string;
  skipConclusion: string;
  cheapVersion: string;
  findings: BenchFinding[];
}

export interface EvidenceCardCopy {
  level: EvidenceLevel;
  whatItIs: string;
  recognise: string;
  maySupport: string;
  mayNotSupport: string;
}

export interface CriteriaScores {
  ic: number;
  uv: number;
  risk: number;
  st: number;
  et: number;
  ev: number;
}

export type ProductId = "citypass" | "stationvoice" | "flowsense";

export type QuarterDecision = "stop" | "pilot" | "scale";

export type SliderProfileId =
  | "showcase"
  | "compliance"
  | "costLed"
  | "slowDefensible"
  | "spreadThin"
  | "steward"
  | "undeclared";

export interface TensionSliders {
  innovationPressure: number;
  ethics: number;
  economics: number;
  userValue: number;
  maturity: number;
  longTerm: number;
}

export type GovernanceDecisionId =
  | "innovationEvaluation"
  | "ethicalRelease"
  | "scalingDecision"
  | "portfolioAdjustment";

export type GovernanceOwnerId =
  | "unassigned"
  | "innovationLead"
  | "businessUnitLead"
  | "it"
  | "dpo"
  | "executiveBoard"
  | "crossFunctionalBoard";

export type GovernanceModel = Record<GovernanceDecisionId, GovernanceOwnerId>;

export interface ProductState {
  id: ProductId;
  stage: StageId;
  completion: number | null;
  declined: number | null;
  spend: number;
  quartersAtStage: number;
  ethicalItems: number;
  stopped: boolean;
}

export type CaseTrackId = "ar" | "vr" | "neuro";

export type CaseSubTabId =
  | "prototype"
  | "testReport"
  | "ethics"
  | "stakeholders"
  | "budget";

export type TrackCall = "scale" | "pilot" | "pause";

export type VariantId = "A" | "B" | "C";

export interface AssessmentDecisions {
  calls: Record<CaseTrackId, TrackCall | null>;
  budget: Record<CaseTrackId, number>;
  variant: VariantId | null;
  rating: Partial<CriteriaScores>;
  leitbild: string;
  leadDecisions: string;
  remainingRisk: string;
  managementStatement: string;
  governance: GovernanceModel;
}
