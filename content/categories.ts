export interface CategoryEntry {
  key: string;
  english: string;
  german: string;
}

/** Set A — identifying and classifying weaknesses (worksheet Section A). */
export const CATEGORY_SET_A: CategoryEntry[] = [
  { key: "userValue", english: "User value", german: "Nutzermehrwert" },
  { key: "testMaturity", english: "Test maturity", german: "Testreife" },
  { key: "scalability", english: "Scalability", german: "Skalierbarkeit" },
  { key: "ethics", english: "Ethics", german: "Ethik" },
  {
    key: "investmentRisk",
    english: "Investment risk",
    german: "Investitionsrisiko",
  },
  {
    key: "organisationalCapability",
    english: "Organisational capability",
    german: "Organisationsfähigkeit",
  },
];

/** Set B — case-study level analysis (worksheet Section C). */
export const CATEGORY_SET_B: CategoryEntry[] = [
  {
    key: "evaluationLogic",
    english: "Evaluation logic",
    german: "Bewertungslogik",
  },
  {
    key: "scalingMaturity",
    english: "Scaling maturity",
    german: "Skalierungsreife",
  },
  { key: "userValue", english: "User value", german: "Nutzermehrwert" },
  { key: "ethics", english: "Ethics", german: "Ethik" },
  { key: "governance", english: "Governance", german: "Governance" },
  {
    key: "investmentSecurity",
    english: "Investment security",
    german: "Investitionssicherheit",
  },
];

export const CATEGORY_OVERLAP_NOTE =
  "User value and Ethics appear in both sets deliberately: they are asked at item level in Section A and again at case level in Section C.";

export const FRAMEWORK_FOOTNOTE =
  "Reference: industry frameworks such as WCAG POUR and ISO 9241 cover overlapping ground; this course grades on the category sets in the Task Map.";
