# LADDER_MATRIX — INSTRUCTOR ONLY. Do not distribute to learners.

Generated from `content/stressMatrix.ts` and `content/gates.ts`, so it matches the build exactly.

## The 24-cell stress matrix

Result vocabulary, always printed as a word plus a colour: **NOT BUILT** (grey) · **BREAKS** (red) · **DEGRADES** (amber) · **PASSES** (green).

| | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---|---|---|---|---|---|
| **Concept Idea** | NOT BUILT | NOT BUILT | NOT BUILT | NOT BUILT | NOT BUILT | NOT BUILT |
| **Prototype** | BREAKS | BREAKS | BREAKS | BREAKS | BREAKS | BREAKS |
| **Pilot** | DEGRADES | PASSES | PASSES | BREAKS | DEGRADES | DEGRADES |
| **Scalable Solution** | PASSES | PASSES | PASSES | PASSES | PASSES | PASSES |

The six stress tests:

- **S1** — A colour-blind traveller uses it
- **S2** — The network drops mid-route
- **S3** — A traveller declines data collection
- **S4** — Someone speaks only German
- **S5** — 200 travellers at once
- **S6** — Legal asks who owns this and when it stops

## The 24 consequence sentences

Each is printed under its chip, as `RESULT — sentence`.

### Concept Idea

- **S1 · NOT BUILT** — there is no interface, so there is nothing to be unable to see.
- **S2 · NOT BUILT** — nothing is running, so nothing can drop.
- **S3 · NOT BUILT** — there is no data collection to decline, because there is no data collection.
- **S4 · NOT BUILT** — there are no words in the product yet, only words on a slide.
- **S5 · NOT BUILT** — one traveller cannot use it either.
- **S6 · NOT BUILT** — there is nothing to own yet. That is legitimate at this stage, and stops being legitimate the moment a rollout date appears.

### Prototype

- **S1 · BREAKS** — the platform markers rely on red and green alone. The traveller sees an arrow and two identical grey dots.
- **S2 · BREAKS** — the arrow vanishes and the screen stays empty. The traveller is standing in a concourse with nothing.
- **S3 · BREAKS** — there is no consent step and no alternative. Declining is not an available action.
- **S4 · BREAKS** — every string is hardcoded English. A German-speaking traveller cannot start.
- **S5 · BREAKS** — the session counter stalls at 12 and the queue never clears.
- **S6 · BREAKS** — no owner, no monitoring, no stop rule, no version. There is nothing to answer with.

### Pilot

- **S1 · DEGRADES** — the arrow is still visible, but the red and green platform markers are indistinguishable. The traveller arrives, slower.
- **S2 · PASSES** — the arrow is replaced by text directions and a retry. The traveller continues.
- **S3 · PASSES** — declining routes the traveller to the printed-signage equivalent. The task still completes.
- **S4 · BREAKS** — the pilot ran in English only. A German-speaking traveller cannot use it at all.
- **S5 · DEGRADES** — the pilot was sized for 40 participants. At 200 the counters lag and sessions queue, though nothing is lost.
- **S6 · DEGRADES** — a monitoring owner exists but no stop rule is written. Nobody can say when this ends.

### Scalable Solution

- **S1 · PASSES** — high-contrast mode restyles the overlay and every marker carries a label as well as a colour.
- **S2 · PASSES** — the no-AR fallback renders a standalone text and map route.
- **S3 · PASSES** — declining is a supported path with a maintained alternative.
- **S4 · PASSES** — the language configuration serves EN, DE and FR from the same build.
- **S5 · PASSES** — 200 concurrent sessions, none dropped, response nominal.
- **S6 · PASSES** — named owners for scaling, ethical release and monitoring; a written stop rule with a threshold and a duration; version 2.4.0 with rollback to 2.3.1.

## Gate overrides

A switched-off gate may only **lower** a cell, never raise one, and `NOT BUILT` is never overwritten.

| Gate off | Cell | Base | Becomes |
|---|---|---|---|
| G2.4 | Prototype / S5 | BREAKS | BREAKS (no change; documented for clarity) |
| G3.3 | Pilot / S3 | PASSES | BREAKS |
| G3.6 | Pilot / S1 | DEGRADES | DEGRADES (no change; documented for clarity) |
| G4.1 | Scalable Solution / S1 | PASSES | BREAKS |
| G4.2 | Scalable Solution / S4 | PASSES | BREAKS |
| G4.4 | Scalable Solution / S6 | PASSES | DEGRADES |
| G4.5 | Scalable Solution / S6 | PASSES | DEGRADES |
| G4.6 | Scalable Solution / S6 | PASSES | DEGRADES |
| G4.4 **and** G4.5 **and** G4.6 | Scalable Solution / S6 | PASSES | BREAKS |

Composition rule: with all three governance gates off, Scalable/S6 prints — *"Nobody owns it, nobody watches it, and there is no way back."*

## The 21 gates and their damage

Stage 4 rail header: *Responsible: G4.1–G4.2 · Connectable: G4.3 · Governable: G4.4–G4.6*

### Concept Idea — 4 gates

| ID | Gate | Damage when switched OFF | Curriculum link |
|---|---|---|---|
| G1.1 | User and situation named | The context line disappears. The slide now promises value to “every traveller”. | Nutzungskontext · Nutzermehrwert |
| G1.2 | User value stated in the user's terms | The value line is replaced by an organisational benefit. The claim bullets stay unchanged. | Nutzermehrwert · Machbarkeitsdenken vs verantwortete Strategie |
| G1.3 | Riskiest assumption acknowledged | The assumption box vanishes entirely. Nothing else changes, so the slide reads as pure promise — it looks better with the gate off. | Investitionsrisiko · Reifegrad |
| G1.4 | “Should we build it?” answered, not only “can we?” | The decision line is replaced by a feasibility statement, with the note “Feasibility answered. Desirability not asked.” | Unterschied technologisches Machbarkeitsdenken vs verantwortete UX-Strategie |

### Prototype — 5 gates

| ID | Gate | Damage when switched OFF | Curriculum link |
|---|---|---|---|
| G2.1 | Usage context clarity (Nutzungskontext) | The concourse is removed entirely. The arrow floats on a blank white field, still perfectly correct. | Anforderungen an immersive Prototypen — Nutzungskontext |
| G2.2 | Interaction clarity (Interaktionsklarheit) | Every button loses its text label and becomes an identical grey rectangle. They all still function; nothing is disabled. | Anforderungen an immersive Prototypen — Interaktionsklarheit |
| G2.3 | Technical robustness (technische Robustheit) | The arrow flickers and the distance label intermittently prints “--m” instead of “90m”. | Anforderungen an immersive Prototypen — technische Robustheit |
| G2.4 | Resilience under load (Belastbarkeit) | The session counter stalls at 12 and prints “queue stalled”. Stress test S5 is forced to BREAKS while this gate is off. | Anforderungen an immersive Prototypen — Belastbarkeit |
| G2.5 | Testability (Testbarkeit) | All session readouts are replaced by “no data captured” and the deviations counter reads “unknown”. | Anforderungen an immersive Prototypen — Testbarkeit |

### Pilot — 6 gates

| ID | Gate | Damage when switched OFF | Curriculum link |
|---|---|---|---|
| G3.1 | Representative participants | The dashboard adds “Participants: 40 staff from the operator's head office.” Every other number stays identical — nothing looks broken, which is the point. | Testreife · Akzeptanz |
| G3.2 | Scope stated | The scope statement disappears and the dashboard headline drops its “Central Interchange, 6 weeks” qualifier. | Skalierungsreife · Bewertungslogik |
| G3.3 | Voluntariness has a working alternative | The consent modal loses its “I decline” button entirely. The app cannot be used without agreeing. Stress test S3 drops to BREAKS. | Ethik — Freiwilligkeit |
| G3.4 | Data protection completed before start | A line appears at the top of the dashboard: “Data protection assessment: scheduled, not yet completed.” The pilot keeps running exactly as before. Nothing blocks — that is the lesson. | Ethik — Datenschutz · Governance |
| G3.5 | Comparison baseline exists | Every dashboard figure loses its comparison column. “27 (baseline signage: 24)” becomes “27”. | Bewertungslogik · Vergleichbarkeit |
| G3.6 | Transfer to real work measured | The dashboard row “Used again on a later trip: 9 of 40” is removed and the dashboard prints “Measured in the session only.” | Testaspekt — Transfer in reale Nutzungssituationen (the aspect most often skipped and most often decisive) |

### Scalable Solution — 6 gates

| ID | Gate | Damage when switched OFF | Curriculum link |
|---|---|---|---|
| G4.1 | Accessibility and inclusion `[Responsible]` | High-contrast mode and one-handed / seated mode stop working and return “Not supported.” Stress test S1 is forced to BREAKS. | Ethik — Zugänglichkeit, Inklusion · verantwortbar |
| G4.2 | Configurable across contexts `[Responsible]` | The configuration panel collapses to “Station: Central Interchange (fixed)”. Station and language selectors disappear. Stress test S4 is forced to BREAKS. | Skalierbarkeit · anschlussfähig |
| G4.3 | Connectable to other systems `[Connectable]` | The departure board stops updating and prints “static — no live timetable feed”. The route still works; it is just now an island. | anschlussfähig · Organisationsfähigkeit |
| G4.4 | Named decision owner `[Governable]` | Every owner row in the governance panel becomes “TBD”. Stress test S6 drops to DEGRADES. | Governance · governancefähig |
| G4.5 | Stop rule and monitoring `[Governable]` | The stop rule and review cadence rows vanish. The app keeps running perfectly. Stress test S6 drops to DEGRADES. | governancefähig · Rolle verantwortlicher Führungskräfte |
| G4.6 | Rollback and versioning `[Governable]` | Version and rollback rows vanish and the panel prints “No way back.” Stress test S6 drops to DEGRADES. | Governance · Investitionssicherheit |

## Gate micro-card copy

Opened by clicking a gate's name in the rail. Six labelled rows each.

### G1.1 — User and situation named

- **What it means** — A specific person in a specific moment, not a market segment.
- **Do** — Name who, where, under what pressure, on what device.
- **Avoid** — “Every traveller”, “all users”, “the general public”.
- **How to check it** — Read the sentence aloud. If nobody could be excluded by it, it names nobody.
- **Without it** — You cannot design, because every design decision has an opposite that is equally defensible.
- **Curriculum link** — Nutzungskontext · Nutzermehrwert

### G1.2 — User value stated in the user's terms

- **What it means** — The benefit expressed as something the user gains, in their units — seconds, steps, errors avoided, anxiety removed.
- **Do** — “Saves the 90 seconds spent reading overhead signage.”
- **Avoid** — “Demonstrates our innovation capability.” That is value to the organisation, stated as if it were value to the user.
- **How to check it** — Could the user themselves say this sentence about their own day?
- **Without it** — The project optimises for visibility, and nobody notices until adoption fails.
- **Curriculum link** — Nutzermehrwert · Machbarkeitsdenken vs verantwortete Strategie

### G1.3 — Riskiest assumption acknowledged

- **What it means** — The one belief that, if wrong, makes everything else pointless — written down where decision-makers see it.
- **Do** — Keep a short “what we do not know yet” list on the same page as the claims.
- **Avoid** — Putting uncertainty in an appendix, or removing it because the slide looks stronger without it.
- **How to check it** — Ask: what would have to be true for this to fail completely? If there is no answer, the thinking is not finished.
- **Without it** — The concept looks more certain than it is, and the certainty gets funded.
- **Curriculum link** — Investitionsrisiko · Reifegrad

### G1.4 — “Should we build it?” answered, not only “can we?”

- **What it means** — Feasibility and desirability are separate questions, and only one of them has been asked so far.
- **Do** — State who benefits, who bears the cost, and what existing option must survive.
- **Avoid** — Answering a desirability question with a technology answer.
- **How to check it** — Cover every sentence about technology. Is anything left?
- **Without it** — You build what is possible, and discover afterwards that it was not defensible.
- **Curriculum link** — Unterschied technologisches Machbarkeitsdenken vs verantwortete UX-Strategie

### G2.1 — Usage context clarity (Nutzungskontext)

- **What it means** — The prototype shows the interaction inside the environment it will actually live in.
- **Do** — Prototype in the noise, the crowd, the lighting, the posture, the time pressure.
- **Avoid** — Demonstrating on a clean background in a quiet room. Correct output in the wrong context is not evidence.
- **How to check it** — Could a stranger tell where they are supposed to be standing?
- **Without it** — You test the interface and conclude something about the situation.
- **Curriculum link** — Anforderungen an immersive Prototypen — Nutzungskontext

### G2.2 — Interaction clarity (Interaktionsklarheit)

- **What it means** — The user knows what they can do and what just happened, without being told.
- **Do** — Labels that name the outcome (“Show my route”), one primary action per screen, feedback within 100ms.
- **Avoid** — Icon-only controls, hidden gestures, screens that only make sense when someone is narrating them.
- **How to check it** — Hand it to someone who has not seen it and say nothing at all.
- **Without it** — You measure confusion and call it a learning curve.
- **Curriculum link** — Anforderungen an immersive Prototypen — Interaktionsklarheit

### G2.3 — Technical robustness (technische Robustheit)

- **What it means** — The prototype behaves the same way twice, for the length of a real session.
- **Do** — Handle the ordinary failures: lost tracking, lost signal, backgrounding, a second tap.
- **Avoid** — A demo that only survives because the presenter knows exactly where not to press.
- **How to check it** — Run the same session three times without touching anything between runs.
- **Without it** — Every finding is contaminated by whether the build happened to hold that day.
- **Curriculum link** — Anforderungen an immersive Prototypen — technische Robustheit

### G2.4 — Resilience under load (Belastbarkeit)

- **What it means** — It still behaves when there are more users, more data, longer sessions, worse conditions than the demo.
- **Do** — Test the second hour, not the second minute. Test at ten times the participants.
- **Avoid** — Assuming that because one session worked, twenty will.
- **How to check it** — Does anything degrade gracefully, or does everything degrade at once?
- **Without it** — The pilot's first busy day becomes the first real test, in public.
- **Curriculum link** — Anforderungen an immersive Prototypen — Belastbarkeit

### G2.5 — Testability (Testbarkeit)

- **What it means** — The prototype produces observable, recordable evidence, not just impressions.
- **Do** — Instrument completion, errors, time, abandonment, and the point where people stop.
- **Avoid** — Relying on what people say afterwards in a room with the project sponsor in it.
- **How to check it** — If two observers watched the same session, would they write down the same numbers?
- **Without it** — You leave the session with a feeling and present it as a result.
- **Curriculum link** — Anforderungen an immersive Prototypen — Testbarkeit

### G3.1 — Representative participants

- **What it means** — The people in the pilot are the people who will use it, not the people who are easy to recruit.
- **Do** — Recruit from the actual working population, including the sceptical and the unpractised.
- **Avoid** — Testing with the innovation team, with volunteers who already like it, or with anyone who reports to the sponsor.
- **How to check it** — Read the participant list. Would any of them lose something if this failed?
- **Without it** — You measure enthusiasm inside your own building.
- **Curriculum link** — Testreife · Akzeptanz

### G3.2 — Scope stated

- **What it means** — The boundary of what was tested is written on the results, not remembered by the team.
- **Do** — Print the scope beside every headline number: where, when, how many, how long, which conditions.
- **Avoid** — Results that travel through the organisation without their limits attached.
- **How to check it** — Could someone three levels up misread this number as general?
- **Without it** — A narrow finding becomes a broad claim in the second retelling.
- **Curriculum link** — Skalierungsreife · Bewertungslogik

### G3.3 — Voluntariness has a working alternative

- **What it means** — Someone can decline and still get their job done, or their train caught.
- **Do** — Build and maintain the alternative path. Keep the printed signage. Keep the old process running.
- **Avoid** — A consent screen with one button. Consent that is a condition of service is not consent.
- **How to check it** — Press decline. Can you still complete the task?
- **Without it** — Participation is compliance, and your acceptance data is meaningless.
- **Curriculum link** — Ethik — Freiwilligkeit

### G3.4 — Data protection completed before start

- **What it means** — The assessment is finished before the first participant, not scheduled for later in the plan.
- **Do** — Complete it, name what is collected, name the retention period, name who can access it.
- **Avoid** — “Scheduled, not yet completed” in a document that also contains a rollout date.
- **How to check it** — Compare the assessment date with the first session date.
- **Without it** — Every data point collected is a liability, and stopping later costs more than starting later.
- **Curriculum link** — Ethik — Datenschutz · Governance

### G3.5 — Comparison baseline exists

- **What it means** — You know what the number was before, so you can say whether this is better.
- **Do** — Measure the current process first, with the same instrument.
- **Avoid** — Reporting a completion rate with nothing to compare it to.
- **How to check it** — For every figure, ask: better than what?
- **Without it** — Any number can be presented as a success, and usually is.
- **Curriculum link** — Bewertungslogik · Vergleichbarkeit

### G3.6 — Transfer to real work measured

- **What it means** — You measured whether it was used again, unsupervised, in the real situation — not only whether the session went well.
- **Do** — Follow up days later. Count unprompted reuse. Count who quietly went back to the old way.
- **Avoid** — Ending measurement when the session ends.
- **How to check it** — Do you have any number collected after the observer left?
- **Without it** — You have proven that it works when someone is watching.
- **Curriculum link** — Testaspekt — Transfer in reale Nutzungssituationen (the aspect most often skipped and most often decisive)

### G4.1 — Accessibility and inclusion [Responsible]

- **What it means** — People with different vision, mobility, posture, language and device can complete the same task.
- **Do** — Provide an equivalent path, not a reduced one. Test with the people who need it.
- **Avoid** — Requirements that quietly exclude: “normal colour vision”, “standing position”, “two-hand controllers”.
- **How to check it** — List the requirements. Who does each one exclude?
- **Without it** — You scale an inequality and call it a rollout.
- **Curriculum link** — Ethik — Zugänglichkeit, Inklusion · verantwortbar

### G4.2 — Configurable across contexts [Responsible]

- **What it means** — It can be adapted to another site, language or workflow without rebuilding it.
- **Do** — Externalise what varies: content, language, layout, thresholds.
- **Avoid** — Hardcoding the pilot site into the product.
- **How to check it** — Could a second site go live without the original team?
- **Without it** — Every new context is a new project, and the portfolio never compounds.
- **Curriculum link** — Skalierbarkeit · anschlussfähig

### G4.3 — Connectable to other systems [Connectable]

- **What it means** — It exchanges data with the systems around it instead of standing beside them.
- **Do** — Define the interfaces early; connect to the source of truth.
- **Avoid** — A product that is excellent, ethical, governed — and an island.
- **How to check it** — Where does its data come from, and where does it go?
- **Without it** — It works, and it never becomes part of how the organisation operates.
- **Curriculum link** — anschlussfähig · Organisationsfähigkeit

### G4.4 — Named decision owner [Governable]

- **What it means** — A specific role — not a committee, not “TBD” — owns each decision type.
- **Do** — Name owners for innovation evaluation, ethical release, scaling, and portfolio adjustment. Keep ethical release independent from scaling.
- **Avoid** — The same role deciding both whether it is safe and whether it ships.
- **How to check it** — Ask who signs. If the answer is a meeting, nobody signs.
- **Without it** — Nothing can be stopped, because stopping requires an owner.
- **Curriculum link** — Governance · governancefähig

### G4.5 — Stop rule and monitoring [Governable]

- **What it means** — A written, checkable condition under which this is withdrawn, plus someone watching the number that triggers it.
- **Do** — “Withdraw if completion falls below 70% for two consecutive months, or if any consent complaint is upheld.” A threshold, a duration, an owner.
- **Avoid** — “We will monitor and review regularly.”
- **How to check it** — Could a person who was not in the room apply this rule tomorrow?
- **Without it** — The only way out is a crisis.
- **Curriculum link** — governancefähig · Rolle verantwortlicher Führungskräfte

### G4.6 — Rollback and versioning [Governable]

- **What it means** — You can return to the previous working state, and you know which state everyone is on.
- **Do** — Version everything; keep the previous release deployable.
- **Avoid** — A one-way rollout where withdrawal means an outage.
- **How to check it** — How long would it take to go back, and who decides?
- **Without it** — Every decision to scale is permanent by accident.
- **Curriculum link** — Governance · Investitionssicherheit

