"use client";

import { useState } from "react";
import { TrackDossier } from "./TrackDossier";
import {
  BudgetOverview,
  GovernancePanelCase,
  ProgrammeTimeline,
  VariantComparison,
} from "./CasePanels";
import { DecisionConsole } from "./DecisionConsole";
import { DecisionSummary } from "./DecisionSummary";
import {
  CASE_BACKGROUND,
  CASE_CONSTRAINTS,
  CASE_NUDGE,
  CASE_TITLE,
  TRACKS,
} from "@/content/nextworld";
import { DEFAULT_GOVERNANCE } from "@/content/portfolio";
import { usePersistentState } from "@/lib/storage";
import type { AssessmentDecisions, CaseTrackId } from "@/lib/types";

const EMPTY_DECISIONS: AssessmentDecisions = {
  calls: { ar: null, vr: null, neuro: null },
  budget: { ar: 0, vr: 0, neuro: 0 },
  variant: null,
  rating: {},
  leitbild: "",
  leadDecisions: "",
  remainingRisk: "",
  managementStatement: "",
  governance: DEFAULT_GOVERNANCE,
};

export function CaseTab() {
  const [decisions, setDecisions] = usePersistentState<AssessmentDecisions>(
    "assessment.decisions",
    EMPTY_DECISIONS,
  );
  const [nudgeDismissed, setNudgeDismissed] = usePersistentState<boolean>(
    "assessment.nudgeDismissed",
    false,
  );
  const [openTrack, setOpenTrack] = useState<CaseTrackId | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="space-y-5 py-3">
      <header className="space-y-2">
        <h2 className="text-d2 font-bold text-navy">{CASE_TITLE}</h2>
        <p className="text-body text-navy">{CASE_BACKGROUND}</p>
        <ul className="flex flex-wrap gap-2">
          {CASE_CONSTRAINTS.map((constraint) => (
            <li
              key={constraint}
              className="rounded-chip border border-hairline bg-lilac px-2 py-[2px] text-small text-navy"
            >
              {constraint}
            </li>
          ))}
        </ul>
      </header>

      {!nudgeDismissed ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-card border border-hairline bg-lilac px-3 py-2 no-print">
          <p className="text-body text-navy">{CASE_NUDGE}</p>
          <button
            type="button"
            className="aion-btn"
            onClick={() => setNudgeDismissed(true)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {/* Track selector: one dossier open at a time. */}
      <section className="space-y-3">
        <div className="grid gap-3 lg:grid-cols-3">
          {TRACKS.map((track) => {
            const open = openTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                aria-expanded={open}
                aria-controls={`dossier-${track.id}`}
                onClick={() => setOpenTrack(open ? null : track.id)}
                className={`aion-card p-3 text-left transition-colors ${
                  open ? "border-purple bg-lilac" : "hover:bg-lilac"
                }`}
              >
                <h3 className="text-d3 font-bold text-navy">{track.name}</h3>
                <p className="mt-1 text-body text-navy">{track.description}</p>
                <dl className="mt-2 space-y-[2px]">
                  <div className="flex gap-2">
                    <dt className="text-small text-muted">Lead owner:</dt>
                    <dd className="text-small text-navy">{track.leadOwner}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-small text-muted">Maturity:</dt>
                    <dd className="text-small text-navy">
                      {track.maturityLabel}
                    </dd>
                  </div>
                </dl>
              </button>
            );
          })}
        </div>

        {TRACKS.map((track) => (
          <div
            key={track.id}
            id={`dossier-${track.id}`}
            hidden={openTrack !== track.id}
            className="print-expand"
          >
            <TrackDossier track={track} />
          </div>
        ))}
      </section>

      <GovernancePanelCase />
      <ProgrammeTimeline />
      <BudgetOverview />
      <VariantComparison />

      <section className="space-y-3">
        <h2 className="text-d2 font-bold text-navy">Decision console</h2>
        <DecisionConsole
          decisions={decisions}
          onChange={setDecisions}
          onClear={() => setConfirmClear(true)}
        />
        {confirmClear ? (
          <div className="flex flex-wrap items-center gap-2 rounded-card border border-hairline bg-lilac px-3 py-2 no-print">
            <span className="text-body text-navy">
              Clear every answer in this console?
            </span>
            <button
              type="button"
              className="aion-btn"
              onClick={() => {
                setDecisions(EMPTY_DECISIONS);
                setConfirmClear(false);
              }}
            >
              Yes, clear
            </button>
            <button
              type="button"
              className="aion-btn"
              onClick={() => setConfirmClear(false)}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </section>

      <DecisionSummary decisions={decisions} />
    </div>
  );
}
