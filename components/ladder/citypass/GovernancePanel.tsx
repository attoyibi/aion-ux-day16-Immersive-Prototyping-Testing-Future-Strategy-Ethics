"use client";

import { forwardRef } from "react";
import { SCALABLE_GOVERNANCE } from "@/content/ladder";
import type { GateMap } from "@/lib/types";

export const GovernancePanel = forwardRef<
  HTMLDivElement,
  { gates: GateMap; highlighted: boolean }
>(function GovernancePanel({ gates, highlighted }, ref) {
  const ownersNamed = gates["G4.4"];
  const stopRule = gates["G4.5"];
  const versioned = gates["G4.6"];
  const g = SCALABLE_GOVERNANCE;
  const owner = (name: string) => (ownersNamed ? name : g.tbd);

  const rows: { label: string; value: string }[] = [
    { label: "Decision owner (scaling)", value: owner(g.scalingOwner) },
    { label: "Ethical release owner", value: owner(g.ethicalOwner) },
    { label: "Monitoring owner", value: owner(g.monitoringOwner) },
  ];

  if (stopRule) {
    rows.push({ label: "Review cadence", value: g.cadence });
    rows.push({ label: "Stop rule", value: g.stopRule });
  }
  if (versioned) {
    rows.push({ label: "Version", value: g.version });
    rows.push({ label: "Rollback available", value: g.rollback });
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={`aion-card p-3 transition-colors ${
        highlighted ? "border-purple bg-lilac" : ""
      }`}
    >
      <h4 className="text-d3 font-bold text-navy">Governance</h4>
      <dl className="mt-2 divide-y divide-hairline">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
          >
            <dt className="text-small text-muted">{row.label}</dt>
            <dd className="aion-readout max-w-[26rem] text-navy sm:text-right">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {versioned ? null : (
        <p className="mt-2 aion-readout text-navy">{g.noWayBack}</p>
      )}
    </div>
  );
});
