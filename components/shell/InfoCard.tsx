"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface InfoRow {
  label: string;
  value: ReactNode;
}

/**
 * The popup used by every gate micro-card and dossier. Opens on click and on
 * Enter/Space, closes on Escape and click-outside, traps focus while open and
 * returns focus to the trigger.
 */
export function InfoCard({
  open,
  onClose,
  heading,
  eyebrow,
  rows,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  heading: string;
  eyebrow?: string;
  rows: InfoRow[];
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const returnRef = useRef<HTMLElement | null>(null);
  const headingId = useId();

  useEffect(() => {
    if (!open) return;
    returnRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();
    return () => {
      returnRef.current?.focus?.();
    };
  }, [open]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/40 p-4 sm:p-8 no-print"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="aion-card my-auto w-full max-w-2xl p-4 sm:p-5"
      >
        <div className="mb-3 flex items-start justify-between gap-3 border-b border-hairline pb-2">
          <div>
            {eyebrow ? (
              <p className="text-small uppercase tracking-wide text-muted">
                {eyebrow}
              </p>
            ) : null}
            <h2 id={headingId} className="text-d3 font-bold text-navy">
              {heading}
            </h2>
          </div>
          <button type="button" className="aion-btn shrink-0" onClick={onClose}>
            Close
          </button>
        </div>
        <dl className="space-y-3">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-small font-bold uppercase tracking-wide text-purple">
                {row.label}
              </dt>
              <dd className="text-body text-navy">{row.value}</dd>
            </div>
          ))}
        </dl>
        {footer ? (
          <div className="mt-3 border-t border-hairline pt-2 text-small text-muted">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Convenience hook: an open flag plus handlers, used by every card trigger. */
export function useInfoCard() {
  const [open, setOpen] = useState(false);
  return {
    open,
    show: useCallback(() => setOpen(true), []),
    hide: useCallback(() => setOpen(false), []),
  };
}
