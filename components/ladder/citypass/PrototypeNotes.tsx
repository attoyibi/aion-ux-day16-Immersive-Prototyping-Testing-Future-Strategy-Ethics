"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import {
  PROTOTYPE_BUILD_META,
  PROTOTYPE_GUIDANCE,
  PROTOTYPE_SCREEN_SPECS,
} from "@/content/ladder";

/** The build's own handover annotation for the screen currently on show. */
export function PrototypeNotes({ screen }: { screen: string }) {
  const [open, setOpen] = useState(false);
  const spec = PROTOTYPE_SCREEN_SPECS.find((s) => s.screen === screen);
  if (!spec) return null;

  return (
    <>
      <button
        type="button"
        aria-label={`Open prototype notes for screen ${spec.screen}: ${spec.title}`}
        className="text-small text-purple underline underline-offset-2"
        onClick={() => setOpen(true)}
      >
        Prototype notes for this screen
      </button>

      <InfoCard
        open={open}
        onClose={() => setOpen(false)}
        eyebrow={`${PROTOTYPE_BUILD_META.buildLabel} · screen ${spec.screen}`}
        heading={spec.title}
        rows={[
          {
            label: "What is actually wired",
            value: (
              <ul className="list-disc pl-4">
                {spec.wired.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
          {
            label: "What is faked",
            value: (
              <ul className="list-disc pl-4">
                {spec.faked.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
          {
            label: "Known limits",
            value: (
              <ul className="list-disc pl-4">
                {spec.knownLimits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
          { label: "What a test would watch for", value: spec.watchFor },
        ]}
        footer={PROTOTYPE_BUILD_META.handoffNote}
      />
    </>
  );
}

/** How to drive the build, and what a real traveller also does. */
export function PrototypeGuidance({ found }: { found: number }) {
  return (
    <div className="aion-card p-3">
      <h4 className="text-body font-bold text-navy">
        {PROTOTYPE_GUIDANCE.heading}
      </h4>
      <p className="mt-1 text-body text-navy">{PROTOTYPE_GUIDANCE.body}</p>

      <p className="mt-2 text-small font-bold uppercase tracking-wide text-purple">
        {PROTOTYPE_GUIDANCE.tryHeading}
      </p>
      <ul className="mt-1 space-y-[2px]">
        {PROTOTYPE_GUIDANCE.tryList.map((item) => (
          <li key={item} className="flex gap-2 text-small text-navy">
            <span aria-hidden="true" className="text-purple">
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-small text-muted">
        {PROTOTYPE_GUIDANCE.tryFooter}
      </p>
      <p className="mt-1 aion-readout text-navy">
        Deviations found: {found} of 5
      </p>
    </div>
  );
}
