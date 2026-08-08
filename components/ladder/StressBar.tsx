"use client";

import { StatusChip } from "@/components/shell/StatusChip";
import { STRESS_TESTS, resolveStressCell } from "@/content/stressMatrix";
import { STAGE_LABELS } from "@/content/ladder";
import type { GateMap, StageId, StressId } from "@/lib/types";

export interface StressRun {
  stage: StageId;
  stress: StressId;
}

export function StressBar({
  stage,
  gates,
  lastRun,
  runsCount,
  viewportAltered,
  onRun,
  onResetStage,
}: {
  stage: StageId;
  gates: GateMap;
  lastRun: StressId | null;
  runsCount: number;
  viewportAltered: boolean;
  onRun: (stress: StressId) => void;
  onResetStage: () => void;
}) {
  const cell = lastRun ? resolveStressCell(stage, lastRun, gates) : null;
  const test = STRESS_TESTS.find((t) => t.id === lastRun);

  return (
    <section aria-label="Stress bar" className="aion-card p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-d3 font-bold text-navy">
          Stress bar — run these against {STAGE_LABELS[stage]}
        </h3>
        <span className="aion-readout text-navy">
          Stress tests run: {runsCount} of 24
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-3">
        {STRESS_TESTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`aion-btn justify-start text-left ${
              lastRun === item.id ? "border-purple bg-lilac" : ""
            }`}
            onClick={() => onRun(item.id)}
          >
            <span className="aion-readout text-muted">{item.id}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {cell && test ? (
        <div className="mt-3 border-t border-hairline pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="aion-readout text-muted">
              {test.id} on {STAGE_LABELS[stage]}:
            </span>
            <StatusChip word={cell.result} />
            {cell.overridden ? (
              <span className="text-small text-muted">
                lowered by a gate you switched off
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-body text-navy">
            {cell.result} — {cell.sentence}
          </p>
          {viewportAltered ? (
            <button
              type="button"
              className="aion-btn mt-2"
              onClick={onResetStage}
            >
              Reset stage
            </button>
          ) : null}
        </div>
      ) : (
        <p className="mt-2 text-small text-muted">
          No stress test has been run against this stage yet.
        </p>
      )}
    </section>
  );
}
