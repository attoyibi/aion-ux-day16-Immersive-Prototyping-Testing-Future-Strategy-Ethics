# FLAW_INDEX — INSTRUCTOR ONLY. Do not distribute to learners.

Not linked from any rendered route. The 14 flaws below are frozen and identical
for every learner. In the DOM each carries a `data-flaw-id` attribute on its
container element; it is never rendered as visible text, never styled
differently, never announced to assistive technology and never used in a class
name. To verify in a browser console:

```js
[...document.querySelectorAll("[data-flaw-id]")].map(e => e.dataset.flawId)
```

## Category Set A (worksheet Section A)

User value · Test maturity · Scalability · Ethics · Investment risk ·
Organisational capability

## The 14 flaws

| Flaw | Track | Sub-tab | Exact on-screen text | Set A category | What a learner should conclude |
|---|---|---|---|---|---|
| F01 | AR Service Consulting | Test Report | Participants: "6 people, all from the Innovation department. No field service technicians took part." | Test maturity | The sample is neither representative nor large enough. Nobody who would actually use it was in the room, so the result describes internal enthusiasm, not field viability. |
| F02 | AR Service Consulting | Test Report | Result headline: "Strong engagement — 87% attention rate" | User value | Attention is not task success. No completion rate, error rate or time-on-task is reported anywhere in the dossier, so nothing here supports a claim of user value. |
| F03 | AR Service Consulting | Ethics & Data Note | GDPR assessment: "scheduled, not yet completed" — while the Budget Request lists Rollout start: "Week 6" | Ethics | A rollout is scheduled before the data protection assessment is finished. The sequencing is the flaw: the assessment cannot constrain a plan it comes after. |
| F04 | AR Service Consulting | Budget Request / Prototype Card | Requested: "EUR 120,000" — the largest single ask — against Maturity: "Concept / early prototype" | Scalability (secondary: Investment risk) | The largest investment is going to the least mature track. Spend is being allocated on enthusiasm rather than on demonstrated maturity. |
| F05 | VR Training Modules | Test Report | Measured dimensions: "Presence, Enjoyment, Visual quality" | Test maturity | Three of the six immersive test aspects are measured and all three are comfort dimensions. Overload, error robustness and transfer to real work are absent, so the strategically decisive aspects were never tested. |
| F06 | VR Training Modules | Test Report (footnote) | "2 of 9 participants discontinued the session (discomfort). Excluded from results as not evaluable." | Test maturity | The dropouts are the finding. Excluding them turns a 22% discomfort rate into a clean n=7, and the headline figures are then reported without restating the exclusion. |
| F07 | VR Training Modules | Prototype Card | Requirements: "Standing position, full room mobility, two-hand controllers, normal colour vision" | Ethics | Four requirements that each silently exclude a group, with no alternative mode mentioned anywhere in the dossier. Scaling this scales the exclusion. |
| F08 | VR Training Modules (with AR and Neuro) | Test Report | Satisfaction: "8.2 of 10" — while AR reports "4.2 of 5" and Neuro reports "78%" | Organisational capability | Three tracks, three incompatible satisfaction scales, no conversion note. The numbers cannot be compared, so the portfolio has no shared evaluation logic. |
| F09 | Neuro-informed UX Research | Ethics & Data Note | Consent text: "Data collected will be used to improve our products." — while the Test Report records "Eye-tracking fixations, EEG signals" | Ethics | Biometric and neurological data are being recorded under a consent text that never mentions them. The consent does not cover what is collected. |
| F10 | Neuro-informed UX Research | Test Report | Conclusion: "High fixation on the offer panel confirms purchase intent." | Test maturity | Fixation is attention, not intent — and it may equally indicate confusion. A hypothesis is being presented as a finding, and "confirms" is doing work the data cannot support. |
| F11 | Neuro-informed UX Research | Stakeholder Positions / Prototype Card | Executive Board Member: "This is the one that puts us ahead of everyone in the sector… I will back it personally." — while the Prototype Card lists Practical applicability: "low / unclear" | User value | The highest enthusiasm in the case sits on the track with the least demonstrated applicability. Sponsor conviction is substituting for evidence. |
| F12 | Cross-cutting | Governance Panel | "Ethical release owner: TBD" and "Decision owner for scaling: TBD" | Organisational capability | Nobody owns the release decision and nobody owns the scaling decision. Nothing can be stopped, because stopping requires an owner. |
| F13 | Cross-cutting | Programme Timeline | "AR rollout" begins week 6; "Governance framework defined" is scheduled weeks 10–12 | Scalability | Rollout starts four weeks before the governance framework exists. The framework will be written to describe what already happened. |
| F14 | Cross-cutting | Budget Overview | "Total requested: EUR 310,000" and "Budget available: EUR 260,000" in the same table | Investment risk | A EUR 50,000 overrun is printed on the page with no delta row, no warning and no highlight. The plan does not fit the budget and nothing in the document says so. |

## Category mapping, as specified

| Set A category | Flaws |
|---|---|
| User value | F02, F11 |
| Test maturity | F01, F05, F06, F10 |
| Scalability | F04, F13 |
| Ethics | F03, F07, F09 |
| Investment risk | F14, F04 (secondary) |
| Organisational capability | F12, F08 |

## Teaching notes

- **The budget overrun is deliberately unassisted.** The console prints one
  neutral navy line, `Allocated total exceeds available budget.`, and nothing
  else. It does not block, disable, auto-correct or warn in red. Learners who
  never notice it have demonstrated something worth discussing.
- **No stakeholder is a villain.** Every position in the case is defensible
  from where that person sits. The conflict is legible and never labelled as
  conflict; asking learners to name it is part of Section C.
- **The strongest pairs are cross-document.** F03 (assessment incomplete) only
  bites when read against the Budget Request's week 6; F11 only bites when the
  board quote is read against the Prototype Card. Learners who read each
  sub-tab in isolation will find roughly half of the 14.
