"use client";

import type { ReactNode } from "react";

/** Rule B: every value the learner might be asked for is printed as text. */
export function ReadoutLine({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-[2px] py-[3px]">
      <span className="text-small text-muted">{label}</span>
      <span
        className={`aion-readout ${emphasis ? "font-bold text-navy" : "text-navy"}`}
      >
        {value}
      </span>
    </div>
  );
}

export function ReadoutBlock({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="aion-card p-3">
      {title ? (
        <h4 className="mb-2 text-small font-bold uppercase tracking-wide text-muted">
          {title}
        </h4>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
