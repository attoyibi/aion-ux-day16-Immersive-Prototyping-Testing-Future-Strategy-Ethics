"use client";

import { Caption, SectionHeading } from "@/components/shell/Primitives";
import {
  COMPARISON_CAPTION,
  COMPARISON_DECISION_ROW,
  STAGE_LABELS,
  STAGE_ORDER,
  STAGE_READOUTS,
} from "@/content/ladder";
import { gatesForStage } from "@/content/gates";
import { STRESS_IDS, resolveStressCell } from "@/content/stressMatrix";
import type { GateMap, StageId } from "@/lib/types";

/** Generated from the learner's own state, not hardcoded prose. */
export function ComparisonTable({ gates }: { gates: GateMap }) {
  const rows: { label: string; value: (stage: StageId) => string }[] = [
    {
      label: "Paths implemented",
      value: (stage) => STAGE_READOUTS[stage].pathsImplemented,
    },
    {
      label: "Deviations handled",
      value: (stage) => STAGE_READOUTS[stage].deviationsHandled,
    },
    { label: "Data source", value: (stage) => STAGE_READOUTS[stage].dataSource },
    {
      label: "Scope",
      value: (stage) => STAGE_READOUTS[stage].scope ?? "Not applicable",
    },
    {
      label: "Stress tests passed",
      value: (stage) => {
        const passes = STRESS_IDS.filter(
          (id) => resolveStressCell(stage, id, gates).result === "PASSES",
        ).length;
        return `${passes} of 6`;
      },
    },
    {
      label: "Gates met",
      value: (stage) => {
        const stageGates = gatesForStage(stage);
        const met = stageGates.filter((gate) => gates[gate.id]).length;
        return `${met} of ${stageGates.length}`;
      },
    },
    {
      label: "Decision this stage can support",
      value: (stage) => COMPARISON_DECISION_ROW[stage],
    },
  ];

  return (
    <section className="space-y-3">
      <SectionHeading
        eyebrow="All four stages visited"
        title="What each stage can and cannot decide"
      >
        Built from your current gate settings, so it changes when you change
        them.
      </SectionHeading>

      <div className="aion-card overflow-x-auto p-3">
        <table className="w-full min-w-[640px] text-left">
          <caption className="sr-only">
            Comparison of the four maturity stages
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
              >
                &nbsp;
              </th>
              {STAGE_ORDER.map((stage) => (
                <th
                  key={stage}
                  scope="col"
                  className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
                >
                  {STAGE_LABELS[stage]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-hairline">
                <th
                  scope="row"
                  className="py-2 pr-3 align-top text-small font-bold text-navy"
                >
                  {row.label}
                </th>
                {STAGE_ORDER.map((stage) => (
                  <td
                    key={stage}
                    className="py-2 pr-3 align-top text-small text-navy"
                  >
                    {row.value(stage)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Caption>{COMPARISON_CAPTION}</Caption>
    </section>
  );
}
