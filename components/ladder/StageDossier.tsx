"use client";

import { InfoCard } from "@/components/shell/InfoCard";
import { DOSSIERS } from "@/content/dossiers";
import type { StageId } from "@/lib/types";

export function StageDossier({
  stage,
  open,
  onClose,
}: {
  stage: StageId;
  open: boolean;
  onClose: () => void;
}) {
  const dossier = DOSSIERS[stage];
  return (
    <InfoCard
      open={open}
      onClose={onClose}
      eyebrow="Stage dossier"
      heading={dossier.title}
      rows={[
        { label: "Definition", value: dossier.definition },
        { label: "What exists", value: dossier.whatExists },
        { label: "Questions it can answer", value: dossier.canAnswer },
        { label: "Questions it cannot answer", value: dossier.cannotAnswer },
        { label: "Decisions you may take here", value: dossier.decisions },
        { label: "Typical wrong move", value: dossier.wrongMove },
        { label: dossier.nextLabel, value: dossier.nextStep },
      ]}
    />
  );
}
