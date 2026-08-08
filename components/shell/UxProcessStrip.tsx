"use client";

import { useId, useState } from "react";
import { UxProcessDiagram } from "@/components/shell/UxProcessDiagram";
import {
  UX_PROCESS_LOOP_NOTE,
  UX_PROCESS_SOURCE_NOTE,
  UX_PROCESS_STEPS,
  UX_PROCESS_VS_LADDER_NOTE,
} from "@/content/uxProcess";

export function UxProcessStrip() {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-1 py-2 text-left text-small text-navy hover:text-purple no-print"
      >
        <span>
          UX Design Process — the seven-step method this course works inside
        </span>
        <span aria-hidden="true" className="text-muted">
          {open ? "−" : "+"}
        </span>
      </button>

      <div id={id} hidden={!open} className="print-expand pb-3">
        <div className="aion-card space-y-3 p-3">
          <UxProcessDiagram />

          <p className="text-small text-muted">{UX_PROCESS_SOURCE_NOTE}</p>

          <ol className="space-y-2 border-t border-hairline pt-3">
            {UX_PROCESS_STEPS.map((entry) => (
              <li
                key={entry.step}
                className="flex gap-3 border-b border-hairline pb-2 last:border-b-0 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-chip bg-purple text-small font-bold text-white"
                >
                  {entry.step}
                </span>
                <div className="min-w-0 space-y-1">
                  <h4 className="text-body font-bold text-navy">
                    <span className="sr-only">Step {entry.step}: </span>
                    {entry.name}
                  </h4>
                  <p className="text-small font-bold text-purple">
                    {entry.question}
                  </p>
                  <p className="text-small text-navy">{entry.doing}</p>
                  <div className="grid gap-x-3 gap-y-1 sm:grid-cols-2">
                    <p className="text-small text-navy">
                      <span className="uppercase tracking-wide text-muted">
                        Leaves the step ·{" "}
                      </span>
                      {entry.output}
                    </p>
                    <p className="text-small text-navy">
                      <span className="uppercase tracking-wide text-muted">
                        Seen here ·{" "}
                      </span>
                      {entry.seenHere}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="space-y-1 border-t border-hairline pt-2">
            <p className="text-small font-bold text-navy">
              The middle four steps are a loop
            </p>
            <p className="text-small text-navy">{UX_PROCESS_LOOP_NOTE}</p>
            <p className="pt-1 text-small font-bold text-navy">
              Process and maturity are two different axes
            </p>
            <p className="text-small text-navy">{UX_PROCESS_VS_LADDER_NOTE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
