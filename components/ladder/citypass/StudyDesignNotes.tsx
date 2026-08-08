"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import { PILOT_STUDY_DESIGN } from "@/content/ladder";

type Panel = "method" | "participants" | "baseline" | "limits";

const TRIGGERS: { id: Panel; label: string }[] = [
  { id: "method", label: "Study design" },
  { id: "participants", label: "Participants" },
  { id: "baseline", label: "Baseline" },
  { id: "limits", label: "What this cannot tell you" },
];

/** The method behind the pilot numbers, reachable from the dashboard. */
export function StudyDesignNotes() {
  const [open, setOpen] = useState<Panel | null>(null);
  const d = PILOT_STUDY_DESIGN;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-small text-muted">Method behind these numbers:</span>
      {TRIGGERS.map((trigger) => (
        <button
          key={trigger.id}
          type="button"
          aria-label={`Open pilot documentation: ${trigger.label}`}
          className="text-small text-purple underline underline-offset-2"
          onClick={() => setOpen(trigger.id)}
        >
          {trigger.label}
        </button>
      ))}

      <InfoCard
        open={open === "method"}
        onClose={() => setOpen(null)}
        eyebrow="Pilot documentation"
        heading="Study design"
        rows={[
          { label: "Design", value: d.method.design },
          { label: "Sampling", value: d.method.sampling },
          { label: "Task given", value: d.method.task },
          { label: "Instrument", value: d.method.instrument },
          { label: "Scale and duration", value: d.method.duration },
          { label: "Ethics", value: d.method.ethics },
        ]}
      />

      <InfoCard
        open={open === "participants"}
        onClose={() => setOpen(null)}
        eyebrow="Pilot documentation"
        heading="Participants"
        rows={[
          { label: "Recruited and evaluated", value: d.participants.recruited },
          { label: "Composition", value: d.participants.composition },
          { label: "Devices", value: d.participants.devices },
          { label: "Declined data collection", value: d.participants.declined },
          {
            label: "Who is not represented",
            value: d.participants.notRepresented,
          },
        ]}
        footer="Nobody was excluded from the results. Where a participant could not use their own device, that is recorded as a device limitation rather than dropped."
      />

      <InfoCard
        open={open === "baseline"}
        onClose={() => setOpen(null)}
        eyebrow="Pilot documentation"
        heading="Baseline"
        rows={[
          { label: "How it was measured", value: d.baseline.how },
          { label: "Baseline figures", value: d.baseline.figures },
          { label: "Caveat", value: d.baseline.caveat },
        ]}
      />

      <InfoCard
        open={open === "limits"}
        onClose={() => setOpen(null)}
        eyebrow="Pilot documentation"
        heading="What this pilot cannot tell you"
        rows={[
          {
            label: "Out of scope",
            value: (
              <ul className="list-disc pl-4">
                {d.limits.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
        ]}
        footer="A pilot produces evidence about the world it was run in. This list is that world's edge."
      />
    </div>
  );
}
