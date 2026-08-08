"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shell/Primitives";
import { ProductBoard, type Deltas } from "./ProductBoard";
import { TensionSlidersPanel } from "./TensionSliders";
import { GovernanceModelPanel } from "./GovernanceModelPanel";
import { EventBanner } from "./EventBanner";
import { ClosingReplay } from "./ClosingReplay";
import {
  DEFAULT_GOVERNANCE,
  DEFAULT_SLIDERS,
  GOVERNANCE_INCIDENT_BODY,
  INITIAL_PRODUCTS,
  type EthicalEvent,
} from "@/content/portfolio";
import {
  buildReplay,
  queueEventResponse,
  runQuarter,
  type RoomState,
} from "@/lib/quarterEngine";
import { usePersistentState } from "@/lib/storage";
import type {
  GovernanceModel,
  ProductId,
  QuarterDecision,
  TensionSliders as Sliders,
} from "@/lib/types";

const INITIAL_STATE: RoomState = {
  products: INITIAL_PRODUCTS,
  quarter: 1,
  log: [],
  profileByQuarter: [],
  decisionHistory: [],
  stops: [],
  pending: [],
  governanceOutcome: null,
  governanceCost: null,
  governanceNote: null,
};

const NO_DECISIONS: Record<ProductId, QuarterDecision | null> = {
  citypass: null,
  stationvoice: null,
  flowsense: null,
};

export function RoomTab() {
  const [sliders, setSliders] = usePersistentState<Sliders>(
    "room.sliders",
    DEFAULT_SLIDERS,
  );
  const [governance, setGovernance] = usePersistentState<GovernanceModel>(
    "room.governance",
    DEFAULT_GOVERNANCE,
  );
  const [state, setState] = usePersistentState<RoomState>(
    "room.log",
    INITIAL_STATE,
  );
  const [reflections, setReflections] = usePersistentState<string[]>(
    "room.reflections",
    ["", "", "", ""],
  );
  const [, setQuarterMarker] = usePersistentState<number>("room.quarter", 1);

  const [decisions, setDecisions] =
    useState<Record<ProductId, QuarterDecision | null>>(NO_DECISIONS);
  const [deltas, setDeltas] = useState<Record<string, Deltas> | null>(null);
  const [events, setEvents] = useState<EthicalEvent[]>([]);
  const [eventChoices, setEventChoices] = useState<Record<string, string>>({});
  const [incident, setIncident] = useState<{
    outcome: string;
    cost: string;
    note?: string;
  } | null>(null);

  const finished = state.quarter > 4;
  const allChosen = state.products.every(
    (p) => p.stopped || decisions[p.id] !== null,
  );
  const eventsPending = events.some((e) => !eventChoices[e.id]);

  function handleRunQuarter() {
    if (finished || !allChosen || eventsPending) return;
    const resolved: Record<ProductId, QuarterDecision> = {
      citypass: decisions.citypass ?? "pilot",
      stationvoice: decisions.stationvoice ?? "pilot",
      flowsense: decisions.flowsense ?? "pilot",
    };
    const result = runQuarter(state, resolved, sliders, governance);
    setState(result.state);
    setQuarterMarker(result.state.quarter);
    setDeltas(result.deltas);
    setEvents(result.events);
    setEventChoices({});
    setIncident(result.governanceIncident);
    setDecisions(NO_DECISIONS);
  }

  function chooseEvent(event: EthicalEvent, optionId: string) {
    setEventChoices((prev) => ({ ...prev, [event.id]: optionId }));
    setState((prev) => queueEventResponse(prev, event, optionId));
  }

  function resetRoom() {
    setState(INITIAL_STATE);
    setQuarterMarker(1);
    setDecisions(NO_DECISIONS);
    setDeltas(null);
    setEvents([]);
    setEventChoices({});
    setIncident(null);
  }

  const replay = finished ? buildReplay(state, sliders) : null;

  return (
    <div className="space-y-5 py-3">
      <SectionHeading
        eyebrow="Instrument 3 · about 10 minutes"
        title="The Portfolio Room"
      >
        Three products, four quarters, one budget. Every quarter you decide what
        continues and what stops.
      </SectionHeading>

      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          The board
          {finished ? " — final state" : ` — Quarter ${state.quarter} of 4`}
        </h3>
        <ProductBoard
          products={state.products}
          deltas={deltas}
          decisions={decisions}
          onDecision={(id, decision) =>
            setDecisions((prev) => ({ ...prev, [id]: decision }))
          }
          locked={finished || eventsPending}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Where your attention goes — 100 points
        </h3>
        <TensionSlidersPanel sliders={sliders} onChange={setSliders} />
      </section>

      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Your governance model
        </h3>
        <p className="text-small text-muted">
          Set this before Quarter 1. It is not marked right or wrong — it has
          consequences in Quarter 3.
        </p>
        <GovernanceModelPanel model={governance} onChange={setGovernance} />
      </section>

      {incident ? (
        <section className="space-y-2">
          <article className="aion-card border-l-[3px] border-l-bad p-3">
            <h4 className="text-d3 font-bold text-navy">
              Quarter 3 incident
            </h4>
            <p className="mt-1 text-body text-navy">
              {GOVERNANCE_INCIDENT_BODY}
            </p>
            <p className="mt-2 aion-readout text-navy">{incident.outcome}</p>
            <p className="aion-readout text-navy">Cost: {incident.cost}</p>
            {incident.note ? (
              <p className="mt-1 text-body text-navy">{incident.note}</p>
            ) : null}
          </article>
        </section>
      ) : null}

      {events.length > 0 ? (
        <section className="space-y-2">
          <h3 className="text-d3 font-bold text-navy">
            What happened this quarter
          </h3>
          {events.map((event) => (
            <EventBanner
              key={event.id}
              event={event}
              chosen={eventChoices[event.id] ?? null}
              onChoose={(optionId) => chooseEvent(event, optionId)}
            />
          ))}
          {eventsPending ? (
            <p className="aion-readout text-navy">
              Respond to every event before the next quarter can run.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="aion-btn aion-btn-primary"
            disabled={finished || !allChosen || eventsPending}
            onClick={handleRunQuarter}
          >
            {finished ? "Four quarters run" : `Run quarter ${state.quarter}`}
          </button>
          <button type="button" className="aion-btn" onClick={resetRoom}>
            Reset the portfolio run
          </button>
          {!allChosen && !finished ? (
            <span className="text-small text-muted">
              Set a call for every product that is still running.
            </span>
          ) : null}
        </div>
      </section>

      {state.log.length > 0 ? (
        <section className="space-y-2">
          <h3 className="text-d3 font-bold text-navy">Quarter log</h3>
          <div className="aion-card p-3">
            <ol className="space-y-[2px]">
              {state.log.map((line, index) => (
                <li
                  key={`${index}-${line.slice(0, 24)}`}
                  className="aion-readout whitespace-pre-wrap text-navy"
                >
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {replay ? (
        <ClosingReplay
          replay={replay}
          reflections={reflections}
          onReflection={(index, value) =>
            setReflections((prev) => {
              const next = [...prev];
              next[index] = value;
              return next;
            })
          }
        />
      ) : null}
    </div>
  );
}
