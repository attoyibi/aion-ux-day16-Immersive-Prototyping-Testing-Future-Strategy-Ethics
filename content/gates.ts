import type { Gate, GateId, GateMap, StageId } from "@/lib/types";

export const GATES: Gate[] = [
  // --- STAGE 1 -------------------------------------------------------------
  {
    id: "G1.1",
    stage: "concept",
    name: "User and situation named",
    damage:
      "The context line disappears. The slide now promises value to “every traveller”.",
    card: {
      whatItMeans:
        "A specific person in a specific moment, not a market segment.",
      doThis: "Name who, where, under what pressure, on what device.",
      avoid: "“Every traveller”, “all users”, “the general public”.",
      howToCheck:
        "Read the sentence aloud. If nobody could be excluded by it, it names nobody.",
      withoutIt:
        "You cannot design, because every design decision has an opposite that is equally defensible.",
      curriculum: "Nutzungskontext · Nutzermehrwert",
      example: {
        weak: "For: every traveller at the station.",
        strong: "For: a traveller changing platforms under time pressure at Central Interchange, during peak hours, on their own phone, with one hand on a case.",
      },
      seeItHere: "Switch this gate off and watch the persona set on the concept slide collapse into a single line that names nobody.",
    },
  },
  {
    id: "G1.2",
    stage: "concept",
    name: "User value stated in the user's terms",
    damage:
      "The value line is replaced by an organisational benefit. The claim bullets stay unchanged.",
    card: {
      whatItMeans:
        "The benefit expressed as something the user gains, in their units — seconds, steps, errors avoided, anxiety removed.",
      doThis: "“Saves the 90 seconds spent reading overhead signage.”",
      avoid:
        "“Demonstrates our innovation capability.” That is value to the organisation, stated as if it were value to the user.",
      howToCheck:
        "Could the user themselves say this sentence about their own day?",
      withoutIt:
        "The project optimises for visibility, and nobody notices until adoption fails.",
      curriculum:
        "Nutzermehrwert · Machbarkeitsdenken vs verantwortete Strategie",
      example: {
        weak: "A flagship demonstration of our innovation capability.",
        strong: "Saves the 90 seconds a traveller with a 6-minute connection currently spends reading overhead signage.",
      },
      seeItHere: "Switch it off: the value line changes to an organisational benefit while the claim bullets stay exactly as confident as before.",
    },
  },
  {
    id: "G1.3",
    stage: "concept",
    name: "Riskiest assumption acknowledged",
    damage:
      "The assumption box vanishes entirely. Nothing else changes, so the slide reads as pure promise — it looks better with the gate off.",
    card: {
      whatItMeans:
        "The one belief that, if wrong, makes everything else pointless — written down where decision-makers see it.",
      doThis:
        "Keep a short “what we do not know yet” list on the same page as the claims.",
      avoid:
        "Putting uncertainty in an appendix, or removing it because the slide looks stronger without it.",
      howToCheck:
        "Ask: what would have to be true for this to fail completely? If there is no answer, the thinking is not finished.",
      withoutIt:
        "The concept looks more certain than it is, and the certainty gets funded.",
      curriculum: "Investitionsrisiko · Reifegrad",
      example: {
        weak: "Risks: standard delivery risks apply. (Appendix C)",
        strong: "What we do not know yet: whether travellers will hold a phone up while walking. If they will not, nothing else on this slide matters.",
      },
      seeItHere: "Switch it off and the assumption box disappears. Notice that the slide reads better without it.",
    },
  },
  {
    id: "G1.4",
    stage: "concept",
    name: "“Should we build it?” answered, not only “can we?”",
    damage:
      "The decision line is replaced by a feasibility statement, with the note “Feasibility answered. Desirability not asked.”",
    card: {
      whatItMeans:
        "Feasibility and desirability are separate questions, and only one of them has been asked so far.",
      doThis:
        "State who benefits, who bears the cost, and what existing option must survive.",
      avoid: "Answering a desirability question with a technology answer.",
      howToCheck: "Cover every sentence about technology. Is anything left?",
      withoutIt:
        "You build what is possible, and discover afterwards that it was not defensible.",
      curriculum:
        "Unterschied technologisches Machbarkeitsdenken vs verantwortete UX-Strategie",
      example: {
        weak: "Technically feasible with existing phone hardware.",
        strong: "Should we build it? Only if the station permits camera use and the printed signage stays. We are not removing an existing option.",
      },
      seeItHere: "Switch it off and read the decision line that replaces it, then read the note underneath it.",
    },
  },

  // --- STAGE 2 -------------------------------------------------------------
  {
    id: "G2.1",
    stage: "prototype",
    name: "Usage context clarity",
    germanTerm: "Nutzungskontext",
    damage:
      "The concourse is removed entirely. The arrow floats on a blank white field, still perfectly correct.",
    card: {
      whatItMeans:
        "The prototype shows the interaction inside the environment it will actually live in.",
      doThis:
        "Prototype in the noise, the crowd, the lighting, the posture, the time pressure.",
      avoid:
        "Demonstrating on a clean background in a quiet room. Correct output in the wrong context is not evidence.",
      howToCheck:
        "Could a stranger tell where they are supposed to be standing?",
      withoutIt:
        "You test the interface and conclude something about the situation.",
      curriculum:
        "Anforderungen an immersive Prototypen — Nutzungskontext",
      example: {
        weak: "Demo recorded in the studio against a white cyclorama.",
        strong: "Demo recorded in Hall B at 08:40, with the concourse crowd, the glazed roof glare and the departure-board noise present.",
      },
      seeItHere: "Switch it off: the concourse disappears and the arrow floats on white, still perfectly correct and no longer evidence of anything.",
    },
  },
  {
    id: "G2.2",
    stage: "prototype",
    name: "Interaction clarity",
    germanTerm: "Interaktionsklarheit",
    damage:
      "Every button loses its text label and becomes an identical grey rectangle. They all still function; nothing is disabled.",
    card: {
      whatItMeans:
        "The user knows what they can do and what just happened, without being told.",
      doThis:
        "Labels that name the outcome (“Show my route”), one primary action per screen, feedback within 100ms.",
      avoid:
        "Icon-only controls, hidden gestures, screens that only make sense when someone is narrating them.",
      howToCheck:
        "Hand it to someone who has not seen it and say nothing at all.",
      withoutIt: "You measure confusion and call it a learning curve.",
      curriculum:
        "Anforderungen an immersive Prototypen — Interaktionsklarheit",
      example: {
        weak: "A row of four identical icon buttons with no labels.",
        strong: "“Show my route to Platform 7” as the single primary action, with the outcome named in the label.",
      },
      seeItHere: "Switch it off: every control keeps working and loses its label. Nothing is disabled, which is the point.",
    },
  },
  {
    id: "G2.3",
    stage: "prototype",
    name: "Technical robustness",
    germanTerm: "technische Robustheit",
    damage:
      "The arrow flickers and the distance label intermittently prints “--m” instead of “90m”.",
    card: {
      whatItMeans:
        "The prototype behaves the same way twice, for the length of a real session.",
      doThis:
        "Handle the ordinary failures: lost tracking, lost signal, backgrounding, a second tap.",
      avoid:
        "A demo that only survives because the presenter knows exactly where not to press.",
      howToCheck:
        "Run the same session three times without touching anything between runs.",
      withoutIt:
        "Every finding is contaminated by whether the build happened to hold that day.",
      curriculum:
        "Anforderungen an immersive Prototypen — technische Robustheit",
      example: {
        weak: "It works if you don't press the arrow twice.",
        strong: "Two rapid presses are de-duplicated; lost tracking and lost signal each render a defined state.",
      },
      seeItHere: "Switch it off and watch the arrow flicker and the distance label fall back to “--m” intermittently.",
    },
  },
  {
    id: "G2.4",
    stage: "prototype",
    name: "Resilience under load",
    germanTerm: "Belastbarkeit",
    damage:
      "The session counter stalls at 12 and prints “queue stalled”. Stress test S5 is forced to BREAKS while this gate is off.",
    card: {
      whatItMeans:
        "It still behaves when there are more users, more data, longer sessions, worse conditions than the demo.",
      doThis:
        "Test the second hour, not the second minute. Test at ten times the participants.",
      avoid: "Assuming that because one session worked, twenty will.",
      howToCheck:
        "Does anything degrade gracefully, or does everything degrade at once?",
      withoutIt:
        "The pilot's first busy day becomes the first real test, in public.",
      curriculum: "Anforderungen an immersive Prototypen — Belastbarkeit",
      example: {
        weak: "We ran one session and it held up fine.",
        strong: "Sustained for the second hour at ten times the pilot's participant count, with graceful degradation defined per component.",
      },
      seeItHere: "Switch it off: the session counter stalls at 12 and prints “queue stalled”, and stress test S5 is held at BREAKS.",
    },
  },
  {
    id: "G2.5",
    stage: "prototype",
    name: "Testability",
    germanTerm: "Testbarkeit",
    damage:
      "All session readouts are replaced by “no data captured” and the deviations counter reads “unknown”.",
    card: {
      whatItMeans:
        "The prototype produces observable, recordable evidence, not just impressions.",
      doThis:
        "Instrument completion, errors, time, abandonment, and the point where people stop.",
      avoid:
        "Relying on what people say afterwards in a room with the project sponsor in it.",
      howToCheck:
        "If two observers watched the same session, would they write down the same numbers?",
      withoutIt:
        "You leave the session with a feeling and present it as a result.",
      curriculum: "Anforderungen an immersive Prototypen — Testbarkeit",
      example: {
        weak: "Everyone in the room agreed it felt faster.",
        strong: "Completion, errors, time to first heading, abandonment point and turn count are all recorded per session.",
      },
      seeItHere: "Switch it off: every readout under the build changes to “no data captured” and the deviation counter reads “unknown”.",
    },
  },

  // --- STAGE 3 -------------------------------------------------------------
  {
    id: "G3.1",
    stage: "pilot",
    name: "Representative participants",
    damage:
      "The dashboard adds “Participants: 40 staff from the operator's head office.” Every other number stays identical — nothing looks broken, which is the point.",
    card: {
      whatItMeans:
        "The people in the pilot are the people who will use it, not the people who are easy to recruit.",
      doThis:
        "Recruit from the actual working population, including the sceptical and the unpractised.",
      avoid:
        "Testing with the innovation team, with volunteers who already like it, or with anyone who reports to the sponsor.",
      howToCheck:
        "Read the participant list. Would any of them lose something if this failed?",
      withoutIt: "You measure enthusiasm inside your own building.",
      curriculum: "Testreife · Akzeptanz",
      example: {
        weak: "40 volunteers from the operator's head office.",
        strong: "40 travellers intercepted on the concourse, quota-balanced on age band and journey frequency, including 11 first-time users of the station.",
      },
      seeItHere: "Switch it off: every number on the dashboard stays identical and one line appears naming who the participants actually were.",
    },
  },
  {
    id: "G3.2",
    stage: "pilot",
    name: "Scope stated",
    damage:
      "The scope statement disappears and the dashboard headline drops its “Central Interchange, 6 weeks” qualifier.",
    card: {
      whatItMeans:
        "The boundary of what was tested is written on the results, not remembered by the team.",
      doThis:
        "Print the scope beside every headline number: where, when, how many, how long, which conditions.",
      avoid:
        "Results that travel through the organisation without their limits attached.",
      howToCheck:
        "Could someone three levels up misread this number as general?",
      withoutIt:
        "A narrow finding becomes a broad claim in the second retelling.",
      curriculum: "Skalierungsreife · Bewertungslogik",
      example: {
        weak: "Completion rate: 68%.",
        strong: "Completion rate 68% — 1 station, English only, daytime, handheld, 40 participants, 6 weeks.",
      },
      seeItHere: "Switch it off: the scope statement disappears and the dashboard headline quietly loses “Central Interchange, 6 weeks”.",
    },
  },
  {
    id: "G3.3",
    stage: "pilot",
    name: "Voluntariness has a working alternative",
    damage:
      "The consent modal loses its “I decline” button entirely. The app cannot be used without agreeing. Stress test S3 drops to BREAKS.",
    card: {
      whatItMeans:
        "Someone can decline and still get their job done, or their train caught.",
      doThis:
        "Build and maintain the alternative path. Keep the printed signage. Keep the old process running.",
      avoid:
        "A consent screen with one button. Consent that is a condition of service is not consent.",
      howToCheck: "Press decline. Can you still complete the task?",
      withoutIt:
        "Participation is compliance, and your acceptance data is meaningless.",
      curriculum: "Ethik — Freiwilligkeit",
      example: {
        weak: "A consent screen with a single “I agree” button.",
        strong: "“I decline” routes to the printed-signage equivalent, and the task still completes. The signage stays in place for the whole pilot.",
      },
      seeItHere: "Switch it off and open the consent modal: the decline button is gone and the build cannot be reached without agreeing.",
    },
  },
  {
    id: "G3.4",
    stage: "pilot",
    name: "Data protection completed before start",
    damage:
      "A line appears at the top of the dashboard: “Data protection assessment: scheduled, not yet completed.” The pilot keeps running exactly as before. Nothing blocks — that is the lesson.",
    card: {
      whatItMeans:
        "The assessment is finished before the first participant, not scheduled for later in the plan.",
      doThis:
        "Complete it, name what is collected, name the retention period, name who can access it.",
      avoid:
        "“Scheduled, not yet completed” in a document that also contains a rollout date.",
      howToCheck: "Compare the assessment date with the first session date.",
      withoutIt:
        "Every data point collected is a liability, and stopping later costs more than starting later.",
      curriculum: "Ethik — Datenschutz · Governance",
      example: {
        weak: "Data protection assessment: scheduled for week 4.",
        strong: "Assessment signed before session 1. Collected: position and route. Retention: 8 weeks. Access: two named analysts.",
      },
      seeItHere: "Switch it off: a line appears at the top of the dashboard and absolutely nothing stops. That is the lesson.",
    },
  },
  {
    id: "G3.5",
    stage: "pilot",
    name: "Comparison baseline exists",
    damage:
      "Every dashboard figure loses its comparison column. “27 (baseline signage: 24)” becomes “27”.",
    card: {
      whatItMeans:
        "You know what the number was before, so you can say whether this is better.",
      doThis: "Measure the current process first, with the same instrument.",
      avoid: "Reporting a completion rate with nothing to compare it to.",
      howToCheck: "For every figure, ask: better than what?",
      withoutIt:
        "Any number can be presented as a success, and usually is.",
      curriculum: "Bewertungslogik · Vergleichbarkeit",
      example: {
        weak: "Completed routes: 27 of 40.",
        strong: "Completed routes 27 of 40, against 24 of 40 on the existing signage, measured the same way two weeks earlier.",
      },
      seeItHere: "Switch it off: every comparison figure vanishes and the dashboard asks “better than what?”",
    },
  },
  {
    id: "G3.6",
    stage: "pilot",
    name: "Transfer to real work measured",
    damage:
      "The dashboard row “Used again on a later trip: 9 of 40” is removed and the dashboard prints “Measured in the session only.”",
    card: {
      whatItMeans:
        "You measured whether it was used again, unsupervised, in the real situation — not only whether the session went well.",
      doThis:
        "Follow up days later. Count unprompted reuse. Count who quietly went back to the old way.",
      avoid: "Ending measurement when the session ends.",
      howToCheck:
        "Do you have any number collected after the observer left?",
      withoutIt:
        "You have proven that it works when someone is watching.",
      curriculum:
        "Testaspekt — Transfer in reale Nutzungssituationen (the aspect most often skipped and most often decisive)",
      example: {
        weak: "Post-session satisfaction: 4.2 of 5.",
        strong: "Used again unprompted on a later trip: 9 of 40, measured at day 7 with no observer present.",
      },
      seeItHere: "Switch it off: the reuse row is removed and the dashboard prints “Measured in the session only.”",
    },
  },

  // --- STAGE 4 -------------------------------------------------------------
  {
    id: "G4.1",
    stage: "scalable",
    name: "Accessibility and inclusion",
    triad: "Responsible",
    damage:
      "High-contrast mode and one-handed / seated mode stop working and return “Not supported.” Stress test S1 is forced to BREAKS.",
    card: {
      whatItMeans:
        "People with different vision, mobility, posture, language and device can complete the same task.",
      doThis:
        "Provide an equivalent path, not a reduced one. Test with the people who need it.",
      avoid:
        "Requirements that quietly exclude: “normal colour vision”, “standing position”, “two-hand controllers”.",
      howToCheck: "List the requirements. Who does each one exclude?",
      withoutIt: "You scale an inequality and call it a rollout.",
      curriculum: "Ethik — Zugänglichkeit, Inklusion · verantwortbar",
      example: {
        weak: "Requires: standing position, two hands, normal colour vision.",
        strong: "High-contrast overlay, seated one-handed layout, and every platform marker carries a label as well as a colour.",
      },
      seeItHere: "Switch it off: high-contrast and seated mode both return “Not supported”, and stress test S1 is forced to BREAKS.",
    },
  },
  {
    id: "G4.2",
    stage: "scalable",
    name: "Configurable across contexts",
    triad: "Responsible",
    damage:
      "The configuration panel collapses to “Station: Central Interchange (fixed)”. Station and language selectors disappear. Stress test S4 is forced to BREAKS.",
    card: {
      whatItMeans:
        "It can be adapted to another site, language or workflow without rebuilding it.",
      doThis:
        "Externalise what varies: content, language, layout, thresholds.",
      avoid: "Hardcoding the pilot site into the product.",
      howToCheck: "Could a second site go live without the original team?",
      withoutIt:
        "Every new context is a new project, and the portfolio never compounds.",
      curriculum: "Skalierbarkeit · anschlussfähig",
      example: {
        weak: "Station name is compiled into the build.",
        strong: "Station, language set and accessibility mode are all configuration. A second site goes live in 3 days with no engineering.",
      },
      seeItHere: "Switch it off: the configuration panel collapses to one fixed line and stress test S4 is forced to BREAKS.",
    },
  },
  {
    id: "G4.3",
    stage: "scalable",
    name: "Connectable to other systems",
    triad: "Connectable",
    damage:
      "The departure board stops updating and prints “static — no live timetable feed”. The route still works; it is just now an island.",
    card: {
      whatItMeans:
        "It exchanges data with the systems around it instead of standing beside them.",
      doThis: "Define the interfaces early; connect to the source of truth.",
      avoid:
        "A product that is excellent, ethical, governed — and an island.",
      howToCheck: "Where does its data come from, and where does it go?",
      withoutIt:
        "It works, and it never becomes part of how the organisation operates.",
      curriculum: "anschlussfähig · Organisationsfähigkeit",
      example: {
        weak: "Departure times are a static list maintained by hand.",
        strong: "The overlay reads the live timetable feed, and route completions are written back to the operations dashboard.",
      },
      seeItHere: "Switch it off: the departure board stops updating and prints “static — no live timetable feed”. The route still works, and it is now an island.",
    },
  },
  {
    id: "G4.4",
    stage: "scalable",
    name: "Named decision owner",
    triad: "Governable",
    damage:
      "Every owner row in the governance panel becomes “TBD”. Stress test S6 drops to DEGRADES.",
    card: {
      whatItMeans:
        "A specific role — not a committee, not “TBD” — owns each decision type.",
      doThis:
        "Name owners for innovation evaluation, ethical release, scaling, and portfolio adjustment. Keep ethical release independent from scaling.",
      avoid:
        "The same role deciding both whether it is safe and whether it ships.",
      howToCheck: "Ask who signs. If the answer is a meeting, nobody signs.",
      withoutIt:
        "Nothing can be stopped, because stopping requires an owner.",
      curriculum: "Governance · governancefähig",
      example: {
        weak: "Owner: the innovation steering group.",
        strong: "Scaling: Head of Passenger Experience. Ethical release: Data Protection Officer — deliberately not the same person.",
      },
      seeItHere: "Switch it off: every owner row in the governance panel becomes “TBD” and stress test S6 drops to DEGRADES.",
    },
  },
  {
    id: "G4.5",
    stage: "scalable",
    name: "Stop rule and monitoring",
    triad: "Governable",
    damage:
      "The stop rule and review cadence rows vanish. The app keeps running perfectly. Stress test S6 drops to DEGRADES.",
    card: {
      whatItMeans:
        "A written, checkable condition under which this is withdrawn, plus someone watching the number that triggers it.",
      doThis:
        "“Withdraw if completion falls below 70% for two consecutive months, or if any consent complaint is upheld.” A threshold, a duration, an owner.",
      avoid: "“We will monitor and review regularly.”",
      howToCheck:
        "Could a person who was not in the room apply this rule tomorrow?",
      withoutIt: "The only way out is a crisis.",
      curriculum: "governancefähig · Rolle verantwortlicher Führungskräfte",
      example: {
        weak: "We will monitor adoption and review regularly.",
        strong: "Withdraw if completion falls below 70% for two consecutive months, or if any consent complaint is upheld. Watched daily by Station Operations.",
      },
      seeItHere: "Switch it off: the stop rule and cadence rows vanish and the product keeps running perfectly.",
    },
  },
  {
    id: "G4.6",
    stage: "scalable",
    name: "Rollback and versioning",
    triad: "Governable",
    damage:
      "Version and rollback rows vanish and the panel prints “No way back.” Stress test S6 drops to DEGRADES.",
    card: {
      whatItMeans:
        "You can return to the previous working state, and you know which state everyone is on.",
      doThis: "Version everything; keep the previous release deployable.",
      avoid: "A one-way rollout where withdrawal means an outage.",
      howToCheck: "How long would it take to go back, and who decides?",
      withoutIt: "Every decision to scale is permanent by accident.",
      curriculum: "Governance · Investitionssicherheit",
      example: {
        weak: "Rollout is one-way; withdrawal means an outage.",
        strong: "Running 2.4.0; 2.3.1 stays deployable and is tested weekly; rollback takes under 20 minutes and Station Operations executes it.",
      },
      seeItHere: "Switch it off: version and rollback rows vanish and the panel prints “No way back.”",
    },
  },
];

export const GATES_BY_ID: Record<GateId, Gate> = GATES.reduce(
  (acc, gate) => {
    acc[gate.id] = gate;
    return acc;
  },
  {} as Record<GateId, Gate>,
);

export function gatesForStage(stage: StageId): Gate[] {
  return GATES.filter((gate) => gate.stage === stage);
}

/** All 21 gates start ON. The stage begins healthy and the learner breaks it. */
export const ALL_GATES_ON: GateMap = GATES.reduce((acc, gate) => {
  acc[gate.id] = true;
  return acc;
}, {} as GateMap);

export const STAGE_4_TRIAD_HEADER =
  "Responsible: G4.1–G4.2 · Connectable: G4.3 · Governable: G4.4–G4.6";
