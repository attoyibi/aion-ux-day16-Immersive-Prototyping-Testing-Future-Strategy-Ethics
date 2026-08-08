export interface WireframeFidelityLevel {
  id: string;
  /** Rung name as it is used in industry. */
  level: string;
  alsoCalled: string;
  looksLike: string;
  /** What it costs to produce, and therefore what it costs to throw away. */
  cost: string;
  /** The question this rung can actually answer. */
  answers: string;
  cannotAnswer: string;
  useWhen: string;
  /** The characteristic way this rung is misused. */
  trap: string;
}

export const WIREFRAME_DEFINITION =
  "A wireframe is a deliberately unfinished drawing of one screen: what is on it, how it is grouped, and what is most important. It argues about structure and hierarchy, and nothing else. Typeface, colour, imagery, photography and motion are left out on purpose — every detail you add is a detail the room will discuss instead of the structure.";

export const WIREFRAME_SAMPLE_NOTE =
  "Each rung carries a worked sample, and every sample draws the same screen — CityPass AR's destination select. The screen is held constant on purpose, so the only thing changing down the ladder is fidelity.";

/**
 * The fidelity ladder, lowest rung first. Each rung buys exactly one new kind
 * of answer and takes away some freedom to change your mind.
 */
export const WIREFRAME_LADDER: WireframeFidelityLevel[] = [
  {
    id: "sketch",
    level: "Paper sketch",
    alsoCalled: "Napkin sketch · crazy eights · the rung below low fidelity",
    looksLike:
      "Hand-drawn boxes and arrows, several competing versions on one sheet. Nobody would mistake it for a design.",
    cost: "Minutes per screen. Cheap enough to throw away without arguing about it.",
    answers: "Are there other shapes this idea could take?",
    cannotAnswer: "Whether any of those shapes works.",
    useWhen:
      "You still have more than one idea and want to keep it that way for another hour.",
    trap: "Photographing the sheet and circulating it as a deliverable.",
  },
  {
    id: "low",
    level: "Low fidelity",
    alsoCalled: "Lo-fi · block wireframe · greybox",
    looksLike:
      "Boxes, dashed lines and placeholder blocks. No type scale, no colour, no real copy, no images. The three frames attached to this slide are exactly this rung.",
    cost: "An hour or two per screen. Still cheap enough to redraw after one conversation.",
    answers:
      "Is the structure right? What is on the screen, what is grouped with what, and what is most prominent?",
    cannotAnswer:
      "Whether anyone can read it, like it or operate it. Nothing about legibility, tone, accessibility or speed.",
    useWhen:
      "The concept stage, while the layout is still an open argument and you want it to stay open.",
    trap: "Showing it to stakeholders without saying it is lo-fi. Someone will ask why it is grey, and the meeting is gone.",
  },
  {
    id: "mid",
    level: "Mid fidelity",
    alsoCalled: "Mid-fi · greyscale wireframe",
    looksLike:
      "Real copy and real content, correct type hierarchy and spacing, still greyscale. Components look like components, and the awkward states start to appear: empty, loading, too long, error.",
    cost: "Days per flow. Redrawing one now costs a conversation with whoever wrote the copy.",
    answers:
      "Does the real content fit? Does the hierarchy still read when the words are the actual words? Does the flow hold across screens rather than on one?",
    cannotAnswer:
      "Anything about brand, emotional response, or whether the contrast works for someone who is not you.",
    useWhen:
      "The structure has survived a lo-fi review and you need to test the flow with real language in it.",
    trap: "Filling it with lorem ipsum, which removes the only thing mid fidelity is for.",
  },
  {
    id: "high",
    level: "High fidelity",
    alsoCalled:
      "Hi-fi · at this point most teams stop saying wireframe and say mockup",
    looksLike:
      "The finished surface: type, colour, imagery, icons, spacing tokens, every state drawn, accurate to the pixel.",
    cost: "A week or more per flow, and expensive to change — which is the real reason teams stop changing it.",
    answers:
      "Does it hold at real contrast and real size? Is it accessible? Is it buildable exactly as drawn? Would a user believe it is a product?",
    cannotAnswer:
      "Whether the underlying idea was worth building. Fidelity is not evidence, and a beautiful screen answers no question that a grey one could not.",
    useWhen:
      "Handover, usability testing on visual detail, and the sign-off that releases money.",
    trap: "Reaching for it first, because it is the version that gets applause. It is also the version nobody is willing to throw away.",
  },
];

/** Learners routinely collapse these three into one word. */
export const WIREFRAME_NEIGHBOURS = [
  {
    term: "Wireframe",
    meaning:
      "Structure, drawn. Answers what goes where and what matters most.",
  },
  {
    term: "Mockup",
    meaning:
      "Appearance, drawn. A still picture of the finished surface, with no behaviour behind it.",
  },
  {
    term: "Prototype",
    meaning:
      "Behaviour, built. Something a person can actually move through — which is what Step 2 of this ladder is.",
  },
];

export const WIREFRAME_TWO_DIALS =
  "Appearance and behaviour are two separate dials, and they are constantly confused. A lo-fi wireframe can be a working clickable prototype, and a beautiful high-fidelity mockup can be completely dead. Ask which dial your question needs before you turn either one up.";

export const WIREFRAME_FIDELITY_RULE =
  "Pick the lowest fidelity that can answer the question you actually have. Fidelity is a cost, not a score: climbing a rung buys one new kind of answer and spends some of your freedom to change your mind. Going high early does not make a concept stronger — it makes the feedback narrower, because people critique what they can see. Show colour and you will get opinions about colour, whether or not the structure underneath it is wrong.";
