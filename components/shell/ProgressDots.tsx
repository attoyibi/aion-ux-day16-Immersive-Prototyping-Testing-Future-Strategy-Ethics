"use client";

const LABELS = ["The Ladder", "The Test Bench", "The Portfolio Room"] as const;

/** Informational only: no score, no reward, no fail state. */
export function ProgressDots({ done }: { done: [boolean, boolean, boolean] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-1 py-1 text-small text-muted no-print">
      {LABELS.map((label, index) => {
        const complete = done[index] ?? false;
        return (
          <span key={label} className="inline-flex items-center gap-[6px]">
            <span
              aria-hidden="true"
              className={`inline-block h-[9px] w-[9px] rounded-full border ${
                complete ? "border-purple bg-purple" : "border-hairline bg-white"
              }`}
            />
            <span>
              {label}: {complete ? "worked through" : "not yet"}
            </span>
          </span>
        );
      })}
    </div>
  );
}
