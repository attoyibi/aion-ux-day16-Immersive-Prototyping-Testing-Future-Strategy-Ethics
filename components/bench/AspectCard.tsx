"use client";

import { InfoCard } from "@/components/shell/InfoCard";
import { EVIDENCE_CARDS } from "@/content/testbench";
import type { BenchAspect, EvidenceLevel } from "@/lib/types";

export function AspectCard({
  aspect,
  open,
  onClose,
}: {
  aspect: BenchAspect;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <InfoCard
      open={open}
      onClose={onClose}
      eyebrow="Immersive test aspect"
      heading={aspect.name}
      rows={[
        { label: "What it measures", value: aspect.measures },
        { label: "How it shows up in a session", value: aspect.showsUpAs },
        {
          label: "What you wrongly conclude if you skip it",
          value: aspect.skipConclusion,
        },
        { label: "How to run it cheaply", value: aspect.cheapVersion },
      ]}
    />
  );
}

export function EvidenceCard({
  level,
  open,
  onClose,
}: {
  level: EvidenceLevel;
  open: boolean;
  onClose: () => void;
}) {
  const card = EVIDENCE_CARDS.find((c) => c.level === level);
  if (!card) return null;
  return (
    <InfoCard
      open={open}
      onClose={onClose}
      eyebrow="Evidence level"
      heading={card.level}
      rows={[
        { label: "What it is", value: card.whatItIs },
        { label: "How to recognise it", value: card.recognise },
        { label: "What it may support", value: card.maySupport },
        { label: "What it may not support", value: card.mayNotSupport },
      ]}
    />
  );
}
