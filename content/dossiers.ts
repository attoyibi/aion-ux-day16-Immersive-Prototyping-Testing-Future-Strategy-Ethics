import type { StageDossier, StageId } from "@/lib/types";

export const DOSSIERS: Record<StageId, StageDossier> = {
  concept: {
    stage: "concept",
    title: "Concept Idea",
    definition:
      "A described intention. It exists as words, sketches and claims. No behaviour exists yet.",
    whatExists:
      "A problem statement · a named user and situation · a claimed value · the assumptions the idea depends on.",
    canAnswer:
      "Is this worth building at all? Who is it for? What would have to be true?",
    cannotAnswer:
      "Can it be built? Will anyone use it? Does it work under real conditions?",
    decisions:
      "Fund a prototype · reshape the idea · drop it. Nothing beyond that.",
    wrongMove:
      "Treating enthusiasm in the room as evidence, and putting a rollout date on a slide.",
    nextLabel: "To reach the next stage",
    nextStep:
      "Name the riskiest assumption and design the smallest artefact that could disprove it.",
  },
  prototype: {
    stage: "prototype",
    title: "Prototype",
    definition:
      "A built artefact that demonstrates the intended interaction on a defined path. It answers feasibility, not viability.",
    whatExists:
      "A working happy path · a defined usage context · observable interaction · enough robustness to be shown without collapsing.",
    canAnswer:
      "Can this be built? Does the interaction make sense to someone seeing it for the first time? Is the concept technically plausible?",
    cannotAnswer:
      "Does it survive real users, real conditions, real duration, real volume?",
    decisions:
      "Continue to a pilot · rework the interaction · stop. Not rollout, not procurement, not headcount.",
    wrongMove:
      "Presenting demo success as user success, and letting a budget request inherit a maturity it does not have.",
    nextLabel: "To reach the next stage",
    nextStep:
      "Satisfy all five prototype requirements — usage context, interaction clarity, technical robustness, resilience under load, testability — and define what the pilot will measure.",
  },
  pilot: {
    stage: "pilot",
    title: "Pilot",
    definition:
      "Real use by real users inside a scope that was deliberately limited and is explicitly stated.",
    whatExists:
      "A working product · consent and an alternative · error handling · data collection · a stated scope · a comparison baseline.",
    canAnswer:
      "Does this work for the people and the place we tested? What does it cost them? What do they do when it fails?",
    cannotAnswer:
      "Does it work elsewhere, for other people, run by another team, next year?",
    decisions:
      "Extend the scope · continue piloting · stop. Full rollout is not a pilot decision.",
    wrongMove:
      "Using pilot numbers to justify full scaling, and quietly dropping the participants who could not complete.",
    nextLabel: "To reach the next stage",
    nextStep:
      "Meet the stated scope, measure transfer into real use, and name who will own the decision to scale.",
  },
  scalable: {
    stage: "scalable",
    title: "Scalable Solution",
    definition:
      "A product that other people can operate, in other contexts, over time, without the originating team present.",
    whatExists:
      "Everything from the pilot · configuration across contexts · accessibility and inclusion · connection to surrounding systems · named owners · a stop rule · monitoring · rollback and versioning.",
    canAnswer:
      "Can this be operated by others, elsewhere, over time? Who stops it, and when?",
    cannotAnswer:
      "Whether it remains the right thing to do as the context changes. That is a portfolio question, not a product question.",
    decisions:
      "Scale · hold · withdraw. All three remain live decisions permanently.",
    wrongMove:
      "Treating scaling as the end of the decision rather than the beginning of an obligation.",
    nextLabel: "To stay here",
    nextStep:
      "Review on cadence against the stop rule, and be willing to use it.",
  },
};
