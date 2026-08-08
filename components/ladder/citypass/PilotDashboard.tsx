"use client";

import { PILOT_BASELINES, PILOT_COPY } from "@/content/ladder";
import type { GateMap } from "@/lib/types";

export interface PilotCounters {
  sessions: number;
  completed: number;
  abandoned: number;
  declined: number;
  fallbacks: number;
  totalTurns: number;
}

export const EMPTY_COUNTERS: PilotCounters = {
  sessions: 0,
  completed: 0,
  abandoned: 0,
  declined: 0,
  fallbacks: 0,
  totalTurns: 0,
};

/** Driven entirely by the learner's own actions in this session. */
export function PilotDashboard({
  counters,
  gates,
}: {
  counters: PilotCounters;
  gates: GateMap;
}) {
  const representative = gates["G3.1"];
  const scopeStated = gates["G3.2"];
  const dpaComplete = gates["G3.4"];
  const baseline = gates["G3.5"];
  const transferMeasured = gates["G3.6"];

  const averageTurns =
    counters.completed === 0
      ? "—"
      : String(Math.round(counters.totalTurns / counters.completed));

  const rows: { label: string; value: string; compare?: string }[] = [
    { label: "Sessions in this pilot", value: String(counters.sessions) },
    {
      label: "Completed routes",
      value: String(counters.completed),
      compare: PILOT_BASELINES.completedRoutes,
    },
    { label: "Abandoned mid-route", value: String(counters.abandoned) },
    { label: "Consent declined", value: String(counters.declined) },
    {
      label: "Signal-loss fallbacks used",
      value: String(counters.fallbacks),
    },
    {
      label: "Average turns to arrival",
      value: averageTurns,
      compare: PILOT_BASELINES.averageTurns,
    },
  ];

  return (
    <div className="aion-card p-3">
      <h4 className="text-d3 font-bold text-navy">
        {scopeStated
          ? PILOT_COPY.dashboardHeadline
          : PILOT_COPY.dashboardHeadlineDamaged}
      </h4>

      {dpaComplete ? null : (
        <p className="mt-1 aion-readout text-warn">{PILOT_COPY.dpaIncomplete}</p>
      )}

      {representative ? null : (
        <p className="mt-1 aion-readout text-navy">
          {PILOT_COPY.nonRepresentative}
        </p>
      )}

      <dl className="mt-2 divide-y divide-hairline">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
          >
            <dt className="text-small text-muted">{row.label}</dt>
            <dd className="aion-readout text-navy">
              {row.value}
              {baseline && row.compare ? (
                <span className="text-muted"> ({row.compare})</span>
              ) : null}
            </dd>
          </div>
        ))}
        {transferMeasured ? (
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]">
            <dt className="text-small text-muted">Used again on a later trip</dt>
            <dd className="aion-readout text-navy">9 of 40</dd>
          </div>
        ) : null}
      </dl>

      {baseline ? null : (
        <p className="mt-2 aion-readout text-navy">{PILOT_COPY.noBaseline}</p>
      )}
      {transferMeasured ? null : (
        <p className="mt-2 aion-readout text-navy">{PILOT_COPY.sessionOnly}</p>
      )}

      {scopeStated ? (
        <p className="mt-2 border-t border-hairline pt-2 text-small text-muted">
          {PILOT_COPY.scopeStatement}
        </p>
      ) : null}
    </div>
  );
}
