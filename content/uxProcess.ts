export interface UxProcessStep {
  /** 1-7, printed as 01-07 in the diagram. */
  step: number;
  name: string;
  /** Diagram label, pre-broken so the SVG never has to measure text. */
  lines: string[];
  /** The one question the step exists to answer. */
  question: string;
  /** What the team actually does while the step is open. */
  doing: string;
  /** The artefact that has to exist before the step can be called done. */
  output: string;
  /** Where this step is visible inside this app, so the model is not abstract. */
  seenHere: string;
}

/**
 * The seven-step UX design process as it is commonly taught. It is the method
 * — how a team works. The maturity ladder in Instrument 1 is a different axis
 * — how far the product has got. See UX_PROCESS_VS_LADDER_NOTE.
 */
export const UX_PROCESS_STEPS: UxProcessStep[] = [
  {
    step: 1,
    name: "Problem / Product Definition",
    lines: ["Problem /", "Product Definition"],
    question:
      "What problem are we solving, for whom, and why is it worth solving now?",
    doing:
      "Frame the problem as a statement that is capable of being wrong. Name the user, the context and the business reason in the same sentence, then write down the assumptions the whole thing rests on.",
    output:
      "A problem statement, a named primary user, and a written assumption list.",
    seenHere:
      "Ladder · Concept Idea — the claim bullets and the assumption box",
  },
  {
    step: 2,
    name: "Roadmap to get started",
    lines: ["Roadmap to", "get started"],
    question:
      "In what order do we spend the money, and what has to be true before the next step is funded?",
    doing:
      "Sequence the work into stages, attach a decision point to each one, and agree in advance what evidence releases the next budget.",
    output: "A staged plan with a gate and a named owner on every stage.",
    seenHere:
      "Ladder · the 22-gate rail; Portfolio Room · four quarters of funding decisions",
  },
  {
    step: 3,
    name: "Research",
    lines: ["Research"],
    question:
      "What is actually true about these users, as opposed to what we assumed in step 1?",
    doing:
      "Observe and interview real users in the real context. Recruit for the edges rather than the average, and record who you failed to reach.",
    output:
      "Evidence-backed personas, journeys, and an explicit statement of the sampling gap.",
    seenHere:
      "Ladder · Concept Idea attachments — the three-person persona set, including the person the concept quietly excludes",
  },
  {
    step: 4,
    name: "Analyze",
    lines: ["Analyze"],
    question:
      "What do the findings mean, and which of them are strong enough to carry a decision?",
    doing:
      "Cluster the raw findings, separate one-off anecdote from repeated pattern, and rank what is left by impact against the problem statement.",
    output:
      "Prioritised insights, each carrying the weight of the evidence behind it.",
    seenHere:
      "Test Bench · evidence grading — Anecdote, Signal, Decision-grade",
  },
  {
    step: 5,
    name: "Design",
    lines: ["Design"],
    question:
      "What is the concrete thing we are proposing, and does it survive contact with a real task?",
    doing:
      "Move from flows and wireframes to something interactive, at the lowest fidelity that can still answer the open question — and build the paths where the user goes wrong, not only the one where everything works.",
    output: "A prototype whose fidelity matches the question being asked.",
    seenHere:
      "Ladder · Prototype — the working happy path plus five handled dead ends",
  },
  {
    step: 6,
    name: "Validation",
    lines: ["Validation"],
    question:
      "Does it work for real people, under real conditions, measured against something?",
    doing:
      "Test with users and run it in the field, compared against a baseline you captured before you started. State the limits of the study in the same document as its results.",
    output:
      "Measured results, a baseline comparison, and a written list of what the study cannot tell you.",
    seenHere:
      "Ladder · Pilot and the stress bar; Test Bench · the six immersive test aspects",
  },
  {
    step: 7,
    name: "Handover",
    lines: ["Handover"],
    question: "Who runs this after the design team leaves the room?",
    doing:
      "Hand over the specification, the tokens and the interaction behaviour — then hand over the operating side too: what is monitored, by whom, how a release is rolled back, and what the support desk says on the phone.",
    output:
      "A documented system with named owners, a monitoring plan and a rollback path.",
    seenHere:
      "Ladder · Scalable Solution — the governance and operations panels",
  },
];

export const UX_PROCESS_SOURCE_NOTE =
  "The seven-step model as it is commonly taught, redrawn here in the course's own visual language. Other houses draw five steps or six; the names differ, the obligations do not.";

export const UX_PROCESS_LOOP_NOTE =
  "Steps 3 to 6 are a loop, not a line. Research → Analyze → Design → Validation runs as many times as the evidence demands, and the diagram draws it straight only because a bar is easier to teach from than a spiral. A validation result that contradicts the problem statement sends you back to step 1, not forward to step 7.";

export const UX_PROCESS_VS_LADDER_NOTE =
  "The process and the ladder measure different things, and confusing them is the most common mistake in the room. The process is how the team works: it runs the same way at every level of maturity. The ladder is how far the product has actually got — Concept Idea, Prototype, Pilot, Scalable Solution. A team can execute all seven steps beautifully and still be sitting at Concept Idea, because maturity is bought with evidence, not with effort.";
