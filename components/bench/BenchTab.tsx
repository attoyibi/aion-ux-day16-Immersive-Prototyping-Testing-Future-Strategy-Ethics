"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/shell/Primitives";
import { AspectCard } from "./AspectCard";
import { EvidenceGrader } from "./EvidenceGrader";
import { SixCriteriaConsole } from "./SixCriteriaConsole";
import {
  BENCH_ASPECTS,
  TRANSFER_MEASURED_LINE,
  TRANSFER_SKIPPED_LINE,
  prefillCriteria,
} from "@/content/testbench";
import { usePersistentState } from "@/lib/storage";
import type {
  BenchAspectId,
  CriteriaScores,
  EvidenceLevel,
} from "@/lib/types";

export interface BenchPlan {
  aspects: BenchAspectId[];
  run: boolean;
}

const EMPTY_PLAN: BenchPlan = { aspects: [], run: false };

export function BenchTab() {
  const [plan, setPlan] = usePersistentState<BenchPlan>("bench.plan", EMPTY_PLAN);
  const [grades, setGrades] = usePersistentState<Record<string, EvidenceLevel>>(
    "bench.grades",
    {},
  );
  const [criteria, setCriteria, criteriaHydrated] =
    usePersistentState<CriteriaScores | null>("bench.criteria", null);

  const [openCard, setOpenCard] = useState<BenchAspectId | null>(null);
  const [progressLines, setProgressLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const selected = plan.aspects;
  const transferMeasured = selected.includes("transfer");

  function toggleAspect(id: BenchAspectId) {
    setNotice(null);
    if (selected.includes(id)) {
      setPlan({ aspects: selected.filter((a) => a !== id), run: false });
      return;
    }
    if (selected.length >= 3) {
      setNotice("Choose exactly three. Remove one first.");
      return;
    }
    setPlan({ aspects: [...selected, id], run: false });
  }

  function runPlan() {
    if (selected.length !== 3 || running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setProgressLines([]);

    // A short visible sequence: one progress line per aspect, no spinner.
    selected.forEach((id, index) => {
      const aspect = BENCH_ASPECTS.find((a) => a.id === id);
      const timer = setTimeout(
        () => {
          setProgressLines((prev) => [
            ...prev,
            `Ran ${aspect?.name ?? id} against CityPass AR — results captured.`,
          ]);
          if (index === selected.length - 1) {
            setRunning(false);
            setPlan({ aspects: selected, run: true });
            setCriteria(prefillCriteria(selected));
          }
        },
        (index + 1) * 900,
      );
      timers.current.push(timer);
    });
  }

  const producedFindings = BENCH_ASPECTS.filter((a) =>
    selected.includes(a.id),
  ).flatMap((a) => a.findings);

  const scores = criteria ?? prefillCriteria(selected);

  return (
    <div className="space-y-5 py-3">
      <SectionHeading
        eyebrow="Instrument 2 · about 10 minutes"
        title="The Test Bench"
      >
        You choose the tests. The bench runs them on CityPass AR. Whatever you
        did not test appears as a hole.
      </SectionHeading>

      {/* STEP 1 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Step 1 — Choose three test aspects
        </h3>
        <p className="aion-readout text-navy">
          Selected: {selected.length} of 3
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {BENCH_ASPECTS.map((aspect) => {
            const on = selected.includes(aspect.id);
            return (
              <div
                key={aspect.id}
                className={`aion-card flex items-start justify-between gap-2 p-2 ${
                  on ? "border-purple bg-lilac" : ""
                }`}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  className="flex-1 text-left text-body text-navy"
                  onClick={() => toggleAspect(aspect.id)}
                >
                  {on ? "✓ " : ""}
                  {aspect.name}
                </button>
                <button
                  type="button"
                  aria-label={`Open details: ${aspect.name}`}
                  className="shrink-0 text-small text-purple underline underline-offset-2"
                  onClick={() => setOpenCard(aspect.id)}
                >
                  Details
                </button>
                <AspectCard
                  aspect={aspect}
                  open={openCard === aspect.id}
                  onClose={() => setOpenCard(null)}
                />
              </div>
            );
          })}
        </div>
        {notice ? (
          <p className="aion-readout text-navy">{notice}</p>
        ) : null}
      </section>

      {/* STEP 2 */}
      <section className="space-y-2">
        <h3 className="text-d3 font-bold text-navy">
          Step 2 — The bench runs them
        </h3>
        <button
          type="button"
          className="aion-btn aion-btn-primary"
          disabled={selected.length !== 3 || running}
          onClick={runPlan}
        >
          {running ? "Running…" : "Run my test plan"}
        </button>
        {selected.length !== 3 ? (
          <p className="text-small text-muted">
            Choose exactly three aspects to enable the run.
          </p>
        ) : null}
        <ol className="space-y-[2px]">
          {progressLines.map((line) => (
            <li key={line} className="aion-readout text-navy">
              {line}
            </li>
          ))}
        </ol>
      </section>

      {/* STEP 3 */}
      {plan.run ? (
        <section className="space-y-2">
          <h3 className="text-d3 font-bold text-navy">
            Step 3 — Your findings
          </h3>
          <div className="aion-card overflow-x-auto p-3">
            <table className="w-full min-w-[680px] text-left">
              <caption className="sr-only">
                Findings by test aspect, including the aspects you did not
                measure
              </caption>
              <thead>
                <tr className="border-b border-hairline">
                  {["Aspect", "What was measured", "Result", "What you may now conclude"].map(
                    (head) => (
                      <th
                        key={head}
                        scope="col"
                        className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {BENCH_ASPECTS.map((aspect) => {
                  const measured = selected.includes(aspect.id);
                  if (!measured) {
                    return (
                      <tr key={aspect.id} className="border-b border-hairline">
                        <th
                          scope="row"
                          className="py-2 pr-3 align-top text-small font-bold text-muted"
                        >
                          {aspect.name}
                        </th>
                        <td className="py-2 pr-3 align-top text-small text-muted">
                          not measured
                        </td>
                        <td className="py-2 pr-3 align-top text-small text-muted">
                          not measured
                        </td>
                        <td className="py-2 pr-3 align-top text-small text-muted">
                          nothing
                        </td>
                      </tr>
                    );
                  }
                  return aspect.findings.map((finding, index) => (
                    <tr key={finding.id} className="border-b border-hairline">
                      <th
                        scope="row"
                        className="py-2 pr-3 align-top text-small font-bold text-navy"
                      >
                        {index === 0 ? aspect.name : ""}
                      </th>
                      <td className="py-2 pr-3 align-top text-small text-navy">
                        {finding.measured}
                      </td>
                      <td className="py-2 pr-3 align-top text-small text-navy">
                        <span className="aion-readout">{finding.result}</span>
                      </td>
                      <td className="py-2 pr-3 align-top text-small text-navy">
                        {finding.conclusion}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>

          <p className="aion-readout text-navy">
            Measured: {selected.length} of 6 aspects. Unsupported conclusions:{" "}
            {6 - selected.length}.
          </p>

          <p className="border-l-[3px] border-purple bg-lilac px-3 py-2 text-body text-navy">
            {transferMeasured ? TRANSFER_MEASURED_LINE : TRANSFER_SKIPPED_LINE}
          </p>
        </section>
      ) : null}

      {/* STEP 4 */}
      {plan.run ? (
        <section className="space-y-2">
          <h3 className="text-d3 font-bold text-navy">
            Step 4 — Grade your own evidence
          </h3>
          <EvidenceGrader
            findings={producedFindings}
            grades={grades}
            onGrade={setGrades}
          />
        </section>
      ) : null}

      {/* STEP 5 */}
      {plan.run && criteriaHydrated ? (
        <section className="space-y-2">
          <h3 className="text-d3 font-bold text-navy">
            Step 5 — The six-criteria strategy console
          </h3>
          <p className="text-small text-muted">
            Pre-filled from what you measured, then yours to adjust.
          </p>
          <SixCriteriaConsole
            scores={scores}
            onChange={setCriteria}
            onReset={() => setCriteria(prefillCriteria(selected))}
          />
        </section>
      ) : null}
    </div>
  );
}
