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
        { label: "Curriculum link", value: gate.card.curriculum },
      ]}
      footer={`Switching this gate off: ${gate.damage}`}
    />
  );
}
