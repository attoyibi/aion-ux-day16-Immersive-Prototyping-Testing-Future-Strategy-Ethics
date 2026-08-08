"use client";

import { GovernanceModelPanel } from "@/components/room/GovernanceModelPanel";
import {
  CASE_BUDGET_STEP,
  CASE_BUDGET_TOTAL,
  CASE_OVER_BUDGET_LINE,
  FREE_TEXT_FIELDS,
  TRACKS,
  TRACK_CALL_LABELS,
  VARIANTS,
} from "@/content/nextworld";
import { CRITERIA_LABELS, criteriaLine } from "@/content/testbench";
import { eur } from "@/lib/format";
import type {
  AssessmentDecisions,
  CaseTrackId,
  CriteriaScores,
  TrackCall,
  VariantId,
} from "@/lib/types";

/** Records. Never responds. No feedback of any kind. */
export function DecisionConsole({
  decisions,
  onChange,
  onClear,
}: {
  decisions: AssessmentDecisions;
  onChange: (next: AssessmentDecisions) => void;
  onClear: () => void;
}) {
  const allocated = (
    Object.keys(decisions.budget) as CaseTrackId[]
  ).reduce((sum, id) => sum + (decisions.budget[id] ?? 0), 0);
  const over = allocated > CASE_BUDGET_TOTAL;

  const ratingComplete = CRITERIA_LABELS.every(
    ({ key }) => decisions.rating[key] !== undefined,
  );

  return (
    <div className="space-y-5">
      {/* BLOCK 1 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">Block 1 — Track calls</h3>
        {TRACKS.map((track) => (
          <fieldset
            key={track.id}
            className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2"
          >
            <legend className="sr-only">Call for {track.name}</legend>
            <span className="min-w-[220px] flex-1 text-body text-navy">
              {track.name}
            </span>
            {(Object.keys(TRACK_CALL_LABELS) as TrackCall[]).map((call) => (
              <label
                key={call}
                className={`aion-btn cursor-pointer no-print ${
                  decisions.calls[track.id] === call
                    ? "border-purple bg-lilac font-bold"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`call-${track.id}`}
                  value={call}
                  checked={decisions.calls[track.id] === call}
                  onChange={() =>
                    onChange({
                      ...decisions,
                      calls: { ...decisions.calls, [track.id]: call },
                    })
                  }
                  className="sr-only"
                />
                {TRACK_CALL_LABELS[call]}
              </label>
            ))}
            <span className="aion-readout text-navy">
              {decisions.calls[track.id]
                ? TRACK_CALL_LABELS[decisions.calls[track.id]!]
                : "— not answered —"}
            </span>
          </fieldset>
        ))}
      </section>

      {/* BLOCK 2 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Block 2 — Budget allocation
        </h3>
        {TRACKS.map((track) => (
          <label key={track.id} className="block">
            <span className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-body text-navy">{track.name}</span>
              <span className="aion-readout text-navy">
                {eur(decisions.budget[track.id] ?? 0)}
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={CASE_BUDGET_TOTAL}
              step={CASE_BUDGET_STEP}
              value={decisions.budget[track.id] ?? 0}
              aria-valuetext={eur(decisions.budget[track.id] ?? 0)}
              onChange={(event) =>
                onChange({
                  ...decisions,
                  budget: {
                    ...decisions.budget,
                    [track.id]: Number(event.target.value),
                  },
                })
              }
              className="mt-1 w-full accent-[#5624D0] no-print"
            />
          </label>
        ))}
        <p className="aion-readout text-navy">
          Allocated: {eur(allocated)} of {eur(CASE_BUDGET_TOTAL)}
        </p>
        {over ? (
          <p className="aion-readout text-navy">{CASE_OVER_BUDGET_LINE}</p>
        ) : null}
      </section>

      {/* BLOCK 3 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">Block 3 — Variant choice</h3>
        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Choose one scaling variant</legend>
          {VARIANTS.map((variant) => (
            <label
              key={variant.id}
              className={`aion-btn cursor-pointer no-print ${
                decisions.variant === variant.id
                  ? "border-purple bg-lilac font-bold"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="variant"
                value={variant.id}
                checked={decisions.variant === variant.id}
                onChange={() =>
                  onChange({
                    ...decisions,
                    variant: variant.id as VariantId,
                  })
                }
                className="sr-only"
              />
              Variant {variant.id}
            </label>
          ))}
        </fieldset>
        <p className="aion-readout text-navy">
          Variant chosen: {decisions.variant ?? "— not answered —"}
        </p>
      </section>

      {/* BLOCK 4 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Block 4 — Six-criteria rating of the chosen variant
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {CRITERIA_LABELS.map(({ key, label, german }) => (
            <label key={key} className="flex items-center gap-2">
              <span className="flex-1 text-body text-navy">
                {label}{" "}
                <span className="text-small text-muted">({german})</span>
              </span>
              <select
                className="rounded-chip border border-hairline px-2 py-1 no-print"
                value={decisions.rating[key] ?? ""}
                onChange={(event) =>
                  onChange({
                    ...decisions,
                    rating: {
                      ...decisions.rating,
                      [key]: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    },
                  })
                }
              >
                <option value="">—</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span className="aion-readout w-4 text-navy">
                {decisions.rating[key] ?? "—"}
              </span>
            </label>
          ))}
        </div>
        <p className="aion-readout text-navy">
          {decisions.variant ? `Variant ${decisions.variant} rated: ` : "Rated: "}
          {ratingComplete
            ? criteriaLine(decisions.rating as CriteriaScores)
            : "— not answered —"}
        </p>
      </section>

      {/* BLOCK 5 */}
      <section className="space-y-3">
        <h3 className="text-d3 font-bold text-navy">
          Block 5 — Written decisions
        </h3>
        {FREE_TEXT_FIELDS.map((field) => {
          const value = decisions[field.key];
          return (
            <label key={field.key} className="block">
              <span className="block text-body text-navy">{field.label}</span>
              <span className="block text-small text-muted">{field.guide}</span>
              <textarea
                rows={field.key === "managementStatement" ? 4 : 3}
                value={value}
                onChange={(event) =>
                  onChange({ ...decisions, [field.key]: event.target.value })
                }
                className="mt-1 w-full rounded-card border border-hairline p-2 no-print"
              />
              <span className="aion-readout text-muted">
                {value.length} characters
              </span>
              <span className="hidden print:block text-body text-navy">
                {value || "— not answered —"}
              </span>
            </label>
          );
        })}
      </section>

      {/* BLOCK 6 — records silently: no checks, no consequences. */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Block 6 — Governance model
        </h3>
        <GovernanceModelPanel
          model={decisions.governance}
          onChange={(next) => onChange({ ...decisions, governance: next })}
          showCards={false}
        />
      </section>

      <button type="button" className="aion-btn no-print" onClick={onClear}>
        Clear my decisions
      </button>
    </div>
  );
}
