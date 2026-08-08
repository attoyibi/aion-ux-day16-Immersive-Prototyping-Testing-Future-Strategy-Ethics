"use client";

import { useEffect, useRef } from "react";
import { PILOT_COPY } from "@/content/ladder";

/**
 * A real blocking modal. When G3.3 is off it loses its decline button entirely
 * and the app cannot be used without agreeing.
 */
export function ConsentModal({
  open,
  allowDecline,
  onAgree,
  onDecline,
}: {
  open: boolean;
  allowDecline: boolean;
  onAgree: () => void;
  onDecline: () => void;
}) {
  const agreeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) agreeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-navy/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-heading"
        className="aion-card w-full max-w-lg p-4"
        onKeyDown={(event) => {
          // Focus stays inside: this modal blocks use of the stage by design.
          if (event.key === "Tab" && !allowDecline) event.preventDefault();
        }}
      >
        <h4 id="consent-heading" className="text-d3 font-bold text-navy">
          Before you start
        </h4>
        <p className="mt-2 text-body text-navy">{PILOT_COPY.consentBody}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            ref={agreeRef}
            type="button"
            className="aion-btn aion-btn-primary"
            onClick={onAgree}
          >
            {PILOT_COPY.consentAgree}
          </button>
          {allowDecline ? (
            <button type="button" className="aion-btn" onClick={onDecline}>
              {PILOT_COPY.consentDecline}
            </button>
          ) : null}
        </div>
        {allowDecline ? null : (
          <p className="mt-2 aion-readout text-bad">
            {PILOT_COPY.noAlternativePath}
          </p>
        )}
      </div>
    </div>
  );
}
