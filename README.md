# aion-ux-day16-maturity-lab

AION UX Class · Module 7 / Day 3 of 3 · Course Day 16
**Immersive Prototyping & Testing · Future Strategy & Ethics**

A single-page learning playground for a senior executive UX class. It is a
teaching instrument, not a product: three instruments and one graded case,
carrying one fictional product — **CityPass AR**, an augmented-reality
wayfinding aid for a large public transport interchange — from first slide to
scaled operation.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
npm run typecheck
```

## Deploy it

Push the repository and import it in Vercel or Netlify. There is nothing to
configure: no backend, no database, no auth, no external API, and **zero
environment variables**. The app is client-side only, renders as a static
route, makes no network request at runtime, and stores progress in
`localStorage` under the `aion.day16.*` namespace. The footer's *Reset all
progress* button clears every one of those keys behind a confirm step.

## The four tabs, and the sequence they are meant to be used in

**1 · The Ladder (~12 min)** is the centrepiece. One task — *find your way to
Platform 7* — is printed above the viewport and never changes, so maturity is
the only variable. The same product is then built four times.

The **Concept Idea** is a real innovation-board submission. Three annotated
low-fidelity wireframes lead the slide, in the position a hero rendering would
normally take, and say so in as many words: sketch fidelity is the floor a
concept submission has to clear, and clearing it is enough. Under them sit the
claim bullets, the assumption box, and an attachment layer carrying a
three-person persona set (primary, secondary, and the person the concept
quietly excludes). A *Learn more* link beside the attachment heading opens a
reference popup carrying the whole fidelity ladder — paper sketch, low, mid and
high — with what each rung can and cannot answer, plus the wireframe / mockup /
prototype distinction. Each rung carries a worked sample, and all four samples
draw the same screen so that fidelity is the only variable, the same device the
Ladder itself uses for maturity. The samples are inline SVG like everything
else here: no image files, no external requests. Every frame and every persona opens a detail popup, and
every *product* element is a real button that does nothing — reading the deck
works, the product does not, which is why the readout stays at 0 of 6.

The **Prototype** runs inside device chrome with a status bar, a step
indicator and the traveller's actual connection pressure. Each destination
carries its real service, departure, walking distance and access note, so
choosing one is a real choice. A "how to use this build" panel names the five
things a real traveller also does, and every screen carries a *prototype
notes* popup listing what is wired, what is faked and what a test would watch
for. The happy path genuinely works; the five deviations each land in a
handled dead end.

The **Pilot** is deliberately the best-built thing in the tab, because that is
what a pilot is: released software, versioned and instrumented, not a rougher
prototype. It runs inside field chrome carrying a build number, a live
telemetry strip and a participant count; the destination list shows real
services and live departures; and the route is walked in beats rather than
jumped, guided by extruded waypoint chevrons that recede along the concourse
floor and bend where the route turns, under a head-up display. It has a real
consent gate whose decline button routes to a working alternative — and drops
the app into logging-off mode — a dashboard driven by the learner's own
session, and the study behind the numbers attached as documentation: design,
sampling, participant composition, who is *not* represented, how the baseline
was measured, and what the pilot cannot tell you. The scope line under the
device carries the actual limit, which is population and place, never craft.

The **Scalable Solution** really does switch to German, really does
reconfigure across three stations, and prints both its governance and its
operations: release and rollback, what is monitored by whom at what frequency,
and a runbook for the people who will operate it after the team leaves.

Beside each stage
sits the **gate rail**: 22 gates, all switched on, each of which visibly damages
the live product when switched off. Every gate's micro-card carries a worked
weak-versus-strong example of the same artefact and a pointer to where the gate
can be seen at work in the current stage. Beneath it sits the **stress bar**, six
tests run against the current stage, resolving through a documented 24-cell
matrix that a switched-off gate can lower but never raise. The tab closes with
the Go/No-Go meeting — one fixed evidence panel read from two seats, each of
which gets its own failure line — and a comparison table generated from the
learner's own state.

**2 · The Test Bench (~10 min)** is not a quiz. The learner chooses exactly
three of the six immersive test aspects, the bench runs them on CityPass AR,
and the resulting numbers become their evidence. Whatever they did not test
appears in the findings table as a hole worth *nothing*. They then grade their
own rows as Anecdote, Signal or Decision-grade, and finish at the six-criteria
strategy console, pre-filled from what they actually measured.

**3 · The Portfolio Room (~10 min)** puts CityPass AR beside two siblings and
runs four quarters. Six tension sliders share 100 points and resolve to a named
profile that always prints what it gives up. Seven ethical events arrive as
things that happen rather than topics to read. In Quarter 3 a consent complaint
is upheld and the app resolves it from the learner's own governance model —
which is where governance stops being a diagram and becomes a consequence.

**4 · NextWorld UX** is the graded case and carries none of the above: no
reveals, no hints, no verdicts, no scoring, no highlighting of the 14 planted
flaws. It is frozen and identical for every learner. Work here, then transcribe
the generated Decision Summary into the worksheet.

The **Task Map** strip under the tab bar maps worksheet sections A–D to where
each is answered, and carries both category taxonomies.

Beneath it, the **UX Design Process** strip prints the seven-step method the
course works inside — Problem/Product Definition, Roadmap, Research, Analyze,
Design, Validation, Handover — as an inline SVG rail plus a written breakdown
of each step: the question it answers, what the team does, the artefact that
has to leave the step, and where that step is visible in this app. It closes on
the distinction the room most often collapses: the process is *how the team
works* and runs identically at every level of maturity, while the ladder is
*how far the product has got*.

## Determinism

Every learner on every device sees identical content in identical order and
gets identical results from identical actions. There is no `Math.random`, no
date-dependent output and no locale-dependent number formatting anywhere —
`lib/format.ts` groups thousands by hand rather than calling `toLocaleString`.
All simulation outcomes come from lookup tables in `content/`.

## Instructor material

Not linked from any rendered route:

- `FLAW_INDEX.md` — the 14 planted flaws, their exact on-screen text, category and intended conclusion.
- `LADDER_MATRIX.md` — the full 24-cell stress matrix and all 21 gate damages, for teaching from paper.
- `PORTFOLIO_OUTCOMES.md` — the quarter outcome table, the seven event branches and the three governance paths.

## Project layout

```
app/         layout, tab router, globals.css, inline icon
components/  shell · ladder (+ stages, citypass) · bench · room · assessment
content/     ladder · gates · dossiers · stressMatrix · testbench · portfolio · nextworld · categories · uxProcess
lib/         types · storage · format · quarterEngine
```

All teaching copy lives in `content/` as typed data. No content is hardcoded
inside a component.
