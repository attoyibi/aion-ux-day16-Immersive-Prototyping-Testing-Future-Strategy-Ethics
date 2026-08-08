"use client";

import { SCALABLE_OPERATIONS } from "@/content/ladder";
import type { GateMap } from "@/lib/types";

function Table({
  caption,
  rows,
}: {
  caption: string;
  rows: [string, string][];
}) {
  return (
    <div>
      <h5 className="text-small font-bold uppercase tracking-wide text-purple">
        {caption}
      </h5>
      <dl className="mt-1 divide-y divide-hairline">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
          >
            <dt className="text-small text-muted">{label}</dt>
            <dd className="aion-readout max-w-[24rem] text-navy sm:text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * What it takes for someone else to operate this. Rows disappear with the
 * governance gates that guarantee them, so the panel thins out visibly.
 */
export function OperationsPanel({ gates }: { gates: GateMap }) {
  const versioned = gates["G4.6"];
  const monitored = gates["G4.5"];
  const ops = SCALABLE_OPERATIONS;

  return (
    <div className="aion-card p-3">
      <h4 className="text-d3 font-bold text-navy">Operations</h4>

      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {versioned ? (
          <Table caption={ops.release.label} rows={ops.release.rows} />
        ) : (
          <div>
            <h5 className="text-small font-bold uppercase tracking-wide text-purple">
              {ops.release.label}
            </h5>
            <p className="mt-1 aion-readout text-navy">
              No version is recorded and no previous release is deployable.
            </p>
          </div>
        )}

        {monitored ? (
          <Table caption={ops.monitoring.label} rows={ops.monitoring.rows} />
        ) : (
          <div>
            <h5 className="text-small font-bold uppercase tracking-wide text-purple">
              {ops.monitoring.label}
            </h5>
            <p className="mt-1 aion-readout text-navy">
              Nothing is on a schedule and no threshold triggers anything.
            </p>
          </div>
        )}
      </div>

      <div className="mt-3">
        <Table caption={ops.runbook.label} rows={ops.runbook.rows} />
      </div>

      <p className="mt-2 border-t border-hairline pt-2 text-small text-muted">
        {ops.note}
      </p>
    </div>
  );
}
