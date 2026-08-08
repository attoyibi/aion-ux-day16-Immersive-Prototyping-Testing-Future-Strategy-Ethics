"use client";

import { useRef, useState } from "react";
import { STAGE_LABELS, STAGE_ORDER, THRESHOLD_LABEL } from "@/content/ladder";
import { StageDossier } from "./StageDossier";
import type { StageId } from "@/lib/types";

export function Stepper({
  active,
  visited,
  onChange,
}: {
  active: StageId;
  visited: StageId[];
  onChange: (stage: StageId) => void;
}) {
  const [dossier, setDossier] = useState<StageId | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function move(index: number) {
    const clamped = (index + STAGE_ORDER.length) % STAGE_ORDER.length;
    const stage = STAGE_ORDER[clamped]!;
    onChange(stage);
    refs.current[stage]?.focus();
  }

  return (
    <div className="space-y-2">
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {STAGE_ORDER.map((stage, index) => {
          const selected = stage === active;
          const seen = visited.includes(stage);
          const thresholdBefore = index === 3;
          return (
            <li
              key={stage}
              className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-stretch"
            >
              {index > 0 ? (
                <div
                  className="hidden shrink-0 items-center px-1 sm:flex"
                  aria-hidden="true"
                >
                  {thresholdBefore ? (
                    <span className="flex flex-col items-center">
                      <span className="block h-[3px] w-8 bg-navy" />
                      <span className="mt-[2px] text-[11px] leading-tight text-navy">
                        {THRESHOLD_LABEL}
                      </span>
                    </span>
                  ) : (
                    <span className="block h-px w-6 bg-hairline" />
                  )}
                </div>
              ) : null}

              <div
                className={`flex flex-1 flex-col justify-between rounded-card border p-2 transition-colors ${
                  selected
                    ? "border-purple bg-lilac"
                    : "border-hairline bg-white"
                }`}
              >
                <button
                  ref={(el) => {
                    refs.current[stage] = el;
                  }}
                  type="button"
                  aria-current={selected ? "step" : undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onChange(stage)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                      event.preventDefault();
                      move(index + 1);
                    } else if (
                      event.key === "ArrowLeft" ||
                      event.key === "ArrowUp"
                    ) {
                      event.preventDefault();
                      move(index - 1);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      move(0);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      move(STAGE_ORDER.length - 1);
                    }
                  }}
                  className="text-left"
                >
                  <span className="block text-small text-muted">
                    Step {index + 1}
                    {seen ? " · visited" : ""}
                  </span>
                  <span
                    className={`block text-body ${selected ? "font-bold text-navy" : "text-navy"}`}
                  >
                    {STAGE_LABELS[stage]}
                  </span>
                </button>
                <button
                  type="button"
                  className="mt-1 self-start text-small text-purple underline underline-offset-2"
                  onClick={() => setDossier(stage)}
                >
                  What is this stage?
                </button>
              </div>

              {thresholdBefore ? (
                <p className="text-small text-navy sm:hidden">
                  ── {THRESHOLD_LABEL} ──
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      {dossier ? (
        <StageDossier
          stage={dossier}
          open={dossier !== null}
          onClose={() => setDossier(null)}
        />
      ) : null}
    </div>
  );
}
