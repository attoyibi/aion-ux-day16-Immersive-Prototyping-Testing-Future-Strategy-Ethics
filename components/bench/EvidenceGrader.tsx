"use client";

import { useState } from "react";
import { StatusChip } from "@/components/shell/StatusChip";
import { EvidenceCard } from "./AspectCard";
import type { BenchFinding, EvidenceLevel } from "@/lib/types";

const BINS: EvidenceLevel[] = ["ANECDOTE", "SIGNAL", "DECISION-GRADE"];

/**
 * Click-to-select then click-to-place. Keyboard operable by construction; drag
 * is deliberately not required.
 */
export function EvidenceGrader({
  findings,
  grades,
  onGrade,
}: {
  findings: BenchFinding[];
  grades: Record<string, EvidenceLevel>;
  onGrade: (next: Record<string, EvidenceLevel>) => void;
}) {
  const [held, setHeld] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [openCard, setOpenCard] = useState<EvidenceLevel | null>(null);

  const heldFinding = findings.find((f) => f.id === held) ?? null;

  function place(bin: EvidenceLevel) {
    if (!held) return;
    onGrade({ ...grades, [held]: bin });
    setHeld(null);
  }

  const placed = findings.filter((f) => grades[f.id]).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="aion-readout text-navy">
          Graded: {placed} of {findings.length}
        </span>
        {BINS.map((bin) => (
          <button
            key={bin}
            type="button"
            className="text-small text-purple underline underline-offset-2"
            onClick={() => setOpenCard(bin)}
          >
            What is {bin}?
          </button>
        ))}
      </div>

      <p className="text-small text-muted">
        Select a row, then choose a bin. {heldFinding
          ? `Holding: ${heldFinding.measured}.`
          : "Nothing selected."}
      </p>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
        <ul className="space-y-2">
          {findings.map((finding) => {
            const placement = grades[finding.id];
            const correct = placement === finding.grade;
            return (
              <li key={finding.id}>
                <div
                  className={`aion-card p-2 ${
                    held === finding.id ? "border-purple bg-lilac" : ""
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={held === finding.id}
                    className="w-full text-left"
                    onClick={() =>
                      setHeld(held === finding.id ? null : finding.id)
                    }
                  >
                    <span className="block text-body text-navy">
                      {finding.measured}
                    </span>
                    <span className="aion-readout text-muted">
                      {finding.result}
                    </span>
                  </button>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {placement ? (
                      <>
                        <span className="text-small text-muted">
                          You placed:
                        </span>
                        <StatusChip word={placement} />
                      </>
                    ) : (
                      <span className="text-small text-muted">
                        Not yet graded
                      </span>
                    )}
                    {checked && placement ? (
                      <>
                        <span className="text-small text-muted">Correct:</span>
                        <StatusChip word={finding.grade} />
                      </>
                    ) : null}
                  </div>
                  {checked && placement ? (
                    <p className="mt-1 text-small text-navy">
                      {correct ? "" : "Not quite — here is the distinction. "}
                      {finding.gradeReason}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="space-y-2">
          {BINS.map((bin) => (
            <button
              key={bin}
              type="button"
              disabled={!held}
              aria-label={`Place the selected row in ${bin}`}
              onClick={() => place(bin)}
              className={`aion-card flex w-full flex-col items-start gap-1 p-3 text-left transition-colors ${
                held ? "hover:border-purple hover:bg-lilac" : "opacity-60"
              }`}
            >
              <StatusChip word={bin} />
              <span className="text-small text-muted">
                {
                  findings.filter((f) => grades[f.id] === bin).length
                }{" "}
                placed here
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="aion-btn aion-btn-primary"
          onClick={() => setChecked(true)}
        >
          Check my grading
        </button>
        <button
          type="button"
          className="aion-btn"
          onClick={() => {
            onGrade({});
            setChecked(false);
            setHeld(null);
          }}
        >
          Clear my grading
        </button>
      </div>

      {openCard ? (
        <EvidenceCard
          level={openCard}
          open={openCard !== null}
          onClose={() => setOpenCard(null)}
        />
      ) : null}
    </div>
  );
}
