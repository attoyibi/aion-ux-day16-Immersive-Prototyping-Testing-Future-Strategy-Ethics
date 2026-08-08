"use client";

import type { EvidenceLevel, GateState, StressResult } from "@/lib/types";

type ChipWord = StressResult | GateState | EvidenceLevel;

const TONE: Record<ChipWord, string> = {
  "NOT BUILT": "bg-white text-muted border-hairline",
  BREAKS: "bg-white text-bad border-bad",
  DEGRADES: "bg-white text-warn border-warn",
  PASSES: "bg-white text-ok border-ok",
  MET: "bg-white text-ok border-ok",
  "NOT MET": "bg-white text-bad border-bad",
  ANECDOTE: "bg-white text-muted border-hairline",
  SIGNAL: "bg-white text-warn border-warn",
  "DECISION-GRADE": "bg-white text-ok border-ok",
};

/** Prints the word as well as the colour. Colour is never the only carrier. */
export function StatusChip({ word }: { word: ChipWord }) {
  return (
    <span
      className={`inline-flex items-center rounded-chip border px-2 py-[1px] text-small font-bold uppercase tracking-wide ${TONE[word]}`}
    >
      {word}
    </span>
  );
}
