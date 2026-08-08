"use client";

import { Caption } from "@/components/shell/Primitives";
import {
  BENCH_CAPTION,
  CRITERIA_LABELS,
  CRITERIA_POLARITY_NOTE,
  criteriaLine,
  resolveVerdict,
} from "@/content/testbench";
import type { CriteriaScores } from "@/lib/types";

export function SixCriteriaConsole({
  scores,
  onChange,
  onReset,
}: {
  scores: CriteriaScores;
  onChange: (next: CriteriaScores) => void;
  onReset: () => void;
}) {
  const verdict = resolveVerdict(scores);

  return (
    <div className="space-y-3">
      <p className="aion-readout text-navy">{CRITERIA_POLARITY_NOTE}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {CRITERIA_LABELS.map(({ key, label, german }) => (
          <label key={key} className="block">
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-body text-navy">
                {label}{" "}
                <span className="text-small text-muted">({german})</span>
              </span>
              <span className="aion-readout text-navy">{scores[key]}</span>
            </span>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={scores[key]}
              aria-valuetext={`${label}: ${scores[key]} of 5`}
              onChange={(event) =>
                onChange({ ...scores, [key]: Number(event.target.value) })
              }
              className="mt-1 w-full accent-[#5624D0]"
            />
          </label>
        ))}
      </div>

      <p className="aion-readout text-navy">{criteriaLine(scores)}</p>

      <div className="aion-card p-3">
        <p className="text-small uppercase tracking-wide text-purple">
          Verdict
        </p>
        <h4 className="text-d3 font-bold text-navy">{verdict.name}</h4>
        <p className="mt-1 text-body text-navy">{verdict.body}</p>
        <p className="mt-2 border-t border-hairline pt-2 text-body text-navy">
          <span className="font-bold">What this shape gives up: </span>
          {verdict.givesUp}
        </p>
      </div>

      <button type="button" className="aion-btn" onClick={onReset}>
        Reset to the values my findings produced
      </button>

      <Caption>{BENCH_CAPTION}</Caption>
    </div>
  );
}
