"use client";

import { useId, useState, type ReactNode } from "react";

export function StageViewport({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      className={`aion-card min-h-[420px] overflow-hidden p-4 ${className}`}
    >
      {children}
    </section>
  );
}

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "lilac";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-chip border px-2 py-[2px] text-small ${
        tone === "lilac"
          ? "border-hairline bg-lilac text-navy"
          : "border-hairline bg-white text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function Accordion({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="aion-card overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-body font-bold text-navy hover:bg-lilac"
        >
          <span>{summary}</span>
          <span aria-hidden="true" className="text-muted">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        id={id}
        hidden={!open}
        className="print-expand border-t border-hairline px-3 py-3"
      >
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-small uppercase tracking-wide text-purple">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-d2 font-bold text-navy">{title}</h2>
      {children ? <p className="text-body text-muted">{children}</p> : null}
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-[3px] border-purple bg-lilac px-3 py-2 text-body text-navy">
      {children}
    </p>
  );
}
