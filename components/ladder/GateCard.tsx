"use client";

import { InfoCard } from "@/components/shell/InfoCard";
import type { Gate } from "@/lib/types";

export function GateCard({
  gate,
  open,
  onClose,
}: {
  gate: Gate;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <InfoCard
      open={open}
      onClose={onClose}
      eyebrow={`${gate.id}${gate.triad ? ` · ${gate.triad}` : ""}`}
      heading={
        gate.germanTerm ? `${gate.name} (${gate.germanTerm})` : gate.name
      }
      rows={[
        { label: "What it means", value: gate.card.whatItMeans },
        { label: "Do", value: gate.card.doThis },
        { label: "Avoid", value: gate.card.avoid },
        { label: "How to check it", value: gate.card.howToCheck },
        { label: "Without it", value: gate.card.withoutIt },
        {
          label: "Worked example",
          value: (
            <div className="mt-1 space-y-2">
              <div className="rounded-card border border-hairline bg-white p-2">
                <p className="text-small font-bold uppercase tracking-wide text-bad">
                  Weak
                </p>
                <p className="text-body text-navy">{gate.card.example.weak}</p>
              </div>
              <div className="rounded-card border border-hairline bg-lilac p-2">
                <p className="text-small font-bold uppercase tracking-wide text-ok">
                  Strong
                </p>
                <p className="text-body text-navy">
                  {gate.card.example.strong}
                </p>
              </div>
            </div>
          ),
        },
        { label: "See it in this stage", value: gate.card.seeItHere },
        { label: "Curriculum link", value: gate.card.curriculum },
      ]}
      footer={`Switching this gate off: ${gate.damage}`}
    />
  );
}
