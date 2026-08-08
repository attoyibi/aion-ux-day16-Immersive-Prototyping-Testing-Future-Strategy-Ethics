"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Caption, SectionHeading, StageViewport } from "@/components/shell/Primitives";
import { ReadoutBlock, ReadoutLine } from "@/components/shell/ReadoutLine";
import { Toast } from "@/components/shell/Toast";
import { Stepper } from "./Stepper";
import { GateRail } from "./GateRail";
import { StressBar } from "./StressBar";
import { GoNoGoMeeting } from "./GoNoGoMeeting";
import { ComparisonTable } from "./ComparisonTable";
import { StageConceptIdea } from "./stages/StageConceptIdea";
import { StagePrototype, type PrototypeSignals } from "./stages/StagePrototype";
import { StagePilot } from "./stages/StagePilot";
import { StageScalable } from "./stages/StageScalable";
import {
  EMPTY_COUNTERS,
  type PilotCounters,
} from "./citypass/PilotDashboard";
import { ALL_GATES_ON, gatesForStage } from "@/content/gates";
import {
  CONCEPT_SLIDE,
  CONSTANT_TASK,
  PROTOTYPE_COPY,
  PILOT_COPY,
  SCALABLE_COPY,
  STAGE_LABELS,
  STAGE_READOUTS,
} from "@/content/ladder";
import { FRAMEWORK_FOOTNOTE } from "@/content/categories";
import { usePersistentState } from "@/lib/storage";
import type { GateId, GateMap, StageId, StressId } from "@/lib/types";

const EMPTY_SIGNALS: PrototypeSignals = { deviationsSeen: [], sessionCount: 0 };

export function LadderTab() {
  const [stage, setStage] = useState<StageId>("concept");
  const [visited, setVisited] = usePersistentState<StageId[]>(
    "ladder.visited",
    [],
  );
  const [storedGates, setStoredGates] = usePersistentState<GateMap>(
    "ladder.gates",
    ALL_GATES_ON,
  );
  // A map saved by an earlier session can predate a gate. Merging it over the
  // full set keeps any gate the saved map has never heard of switched on,
  // rather than reading its absence as "switched off".
  const gates = useMemo<GateMap>(
    () => ({ ...ALL_GATES_ON, ...storedGates }),
    [storedGates],
  );
  const setGates = useCallback(
    (fn: (prev: GateMap) => GateMap) =>
      setStoredGates((prev) => fn({ ...ALL_GATES_ON, ...prev })),
    [setStoredGates],
  );
  const [stressRuns, setStressRuns] = usePersistentState<string[]>(
    "ladder.stressRuns",
    [],
  );

  const [toast, setToast] = useState<string | null>(null);
  const [live, setLive] = useState("");
  const [conceptTouched, setConceptTouched] = useState(false);
  const [signals, setSignals] = useState<PrototypeSignals>(EMPTY_SIGNALS);
  const [counters, setCounters] = useState<PilotCounters>(EMPTY_COUNTERS);

  // Stress-test effects on the viewport. Each is a token the stage reacts to,
  // so a stage never has to know which stress test is running.
  const [lastRun, setLastRun] = useState<StressId | null>(null);
  const [cvdSim, setCvdSim] = useState(false);
  const [arrowSuppressed, setArrowSuppressed] = useState(false);
  const [languageToken, setLanguageToken] = useState(0);
  const [loadToken, setLoadToken] = useState(0);
  const [governanceToken, setGovernanceToken] = useState(0);
  const [consentToken, setConsentToken] = useState(0);
  const [absenceNote, setAbsenceNote] = useState<string | null>(null);

  const announce = useCallback((message: string) => setLive(message), []);

  useEffect(() => {
    setVisited((prev) => (prev.includes(stage) ? prev : [...prev, stage]));
    announce(`Now running: ${STAGE_LABELS[stage]}.`);
  }, [stage, setVisited, announce]);

  const viewportAltered =
    cvdSim || arrowSuppressed || languageToken > 0 || absenceNote !== null;

  const resetStageEffects = useCallback(() => {
    setCvdSim(false);
    setArrowSuppressed(false);
    setLanguageToken(0);
    setLoadToken(0);
    setGovernanceToken(0);
    setConsentToken(0);
    setAbsenceNote(null);
    announce("Stage reset. Stress-test effects cleared.");
  }, [announce]);

  function toggleGate(id: GateId) {
    setGates((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function restoreGates() {
    const stageGates = gatesForStage(stage);
    setGates((prev) => {
      const next = { ...prev };
      stageGates.forEach((gate) => {
        next[gate.id] = true;
      });
      return next;
    });
    announce(`All gates restored on ${STAGE_LABELS[stage]}.`);
  }

  function runStress(id: StressId) {
    setLastRun(id);
    const key = `${stage}:${id}`;
    setStressRuns((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setAbsenceNote(null);

    // Viewport effects, per section 4.8.
    switch (id) {
      case "S1":
        setCvdSim((v) => !v);
        break;
      case "S2":
        setArrowSuppressed(true);
        break;
      case "S3":
        if (stage === "pilot") setConsentToken((v) => v + 1);
        else if (stage === "scalable") setConsentToken((v) => v + 1);
        else if (stage === "prototype")
          setAbsenceNote(
            "There is no consent step in this build. Declining is not an available action.",
          );
        else
          setAbsenceNote(
            "There is no data collection to decline, because there is no data collection.",
          );
        break;
      case "S4":
        if (stage === "pilot" || stage === "scalable")
          setLanguageToken((v) => v + 1);
        else if (stage === "prototype")
          setAbsenceNote(
            "Every string is hardcoded English. There is no language switch to attempt.",
          );
        else
          setAbsenceNote(
            "There are no words in the product yet, only words on a slide.",
          );
        break;
      case "S5":
        if (stage === "scalable") setLoadToken((v) => v + 1);
        else
          setAbsenceNote(
            stage === "prototype"
              ? "The session counter stalls at 12 and the queue never clears."
              : stage === "pilot"
                ? "The pilot was sized for 40 participants. At 200 the counters lag and sessions queue."
                : "One traveller cannot use it either.",
          );
        break;
      case "S6":
        if (stage === "scalable") setGovernanceToken((v) => v + 1);
        else
          setAbsenceNote(
            "There is no governance panel at this stage to scroll to.",
          );
        break;
      default:
        break;
    }
  }

  const readouts = STAGE_READOUTS[stage];
  const stageGates = gatesForStage(stage);
  const gatesMet = stageGates.filter((gate) => gates[gate.id]).length;
  const allVisited = useMemo(
    () =>
      (["concept", "prototype", "pilot", "scalable"] as StageId[]).every((s) =>
        visited.includes(s),
      ),
    [visited],
  );

  const caption =
    stage === "concept"
      ? conceptTouched
        ? CONCEPT_SLIDE.caption
        : null
      : stage === "prototype"
        ? signals.deviationsSeen.length > 0
          ? PROTOTYPE_COPY.caption
          : null
        : stage === "pilot"
          ? counters.sessions > 0 || counters.declined > 0
            ? PILOT_COPY.caption
            : null
          : SCALABLE_COPY.caption;

  return (
    <div className="space-y-4 py-3">
      <SectionHeading
        eyebrow="Instrument 1 · about 12 minutes"
        title="The Ladder"
      >
        One product, CityPass AR, built four times over. The task never changes,
        so maturity is the only variable.
      </SectionHeading>

      {/* 4.1 — the constant task, identical at all four stages. */}
      <div className="rounded-card border border-navy bg-navy px-3 py-2 text-white">
        <p className="text-small uppercase tracking-wide text-white/70">
          Your task at every stage
        </p>
        <p className="text-body">{CONSTANT_TASK}</p>
      </div>

      <Stepper active={stage} visited={visited} onChange={setStage} />

      <p className="aion-readout text-navy">
        Now running: {STAGE_LABELS[stage]}
      </p>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        <StageViewport
          label={`${STAGE_LABELS[stage]} stage viewport`}
          className={cvdSim ? "cvd-sim" : ""}
        >
          {stage === "concept" ? (
            <StageConceptIdea
              gates={gates}
              onToast={setToast}
              onInteract={() => setConceptTouched(true)}
              announce={announce}
            />
          ) : null}
          {stage === "prototype" ? (
            <StagePrototype
              gates={gates}
              signals={signals}
              onSignal={setSignals}
              announce={announce}
              arrowSuppressed={arrowSuppressed}
            />
          ) : null}
          {stage === "pilot" ? (
            <StagePilot
              gates={gates}
              counters={counters}
              onCounters={setCounters}
              announce={announce}
              arrowSuppressed={arrowSuppressed}
              consentRequestedAt={consentToken}
              languageRequestedAt={languageToken}
            />
          ) : null}
          {stage === "scalable" ? (
            <StageScalable
              gates={gates}
              announce={announce}
              arrowSuppressed={arrowSuppressed}
              languageRequestedAt={languageToken}
              loadRequestedAt={loadToken}
              governanceRequestedAt={governanceToken}
              consentRequestedAt={consentToken}
            />
          ) : null}
        </StageViewport>

        <GateRail
          stage={stage}
          gates={gates}
          onToggle={toggleGate}
          onRestore={restoreGates}
        />
      </div>

      {cvdSim ? (
        <p className="aion-readout text-navy">
          Colour-vision simulation: on. The viewport is rendered as a
          red-green colour-blind traveller sees it.
        </p>
      ) : null}
      {absenceNote ? (
        <p className="aion-readout border-l-[3px] border-purple bg-lilac px-3 py-2 text-navy">
          {absenceNote}
        </p>
      ) : null}

      <StressBar
        stage={stage}
        gates={gates}
        lastRun={lastRun}
        runsCount={stressRuns.length}
        viewportAltered={viewportAltered}
        onRun={runStress}
        onResetStage={resetStageEffects}
      />

      <ReadoutBlock title="Readouts for this stage">
        <ReadoutLine label="Now running:" value={STAGE_LABELS[stage]} emphasis />
        <ReadoutLine label="Task attempt result:" value={readouts.taskAttempt} />
        {stage === "concept" ? (
          <ReadoutLine label="Elements that respond:" value="0 of 6" />
        ) : null}
        <ReadoutLine
          label="Paths implemented:"
          value={readouts.pathsImplemented}
        />
        <ReadoutLine
          label="Deviations handled:"
          value={readouts.deviationsHandled}
        />
        <ReadoutLine label="Data source:" value={readouts.dataSource} />
        {readouts.scope ? (
          <ReadoutLine label="Scope:" value={readouts.scope} />
        ) : null}
        <ReadoutLine
          label="Gates met:"
          value={`${gatesMet} of ${stageGates.length}`}
        />
        <ReadoutLine
          label="Stress tests run:"
          value={`${stressRuns.length} of 24`}
        />
      </ReadoutBlock>

      {caption ? <Caption>{caption}</Caption> : null}

      {visited.length >= 2 ? <GoNoGoMeeting /> : null}
      {allVisited ? <ComparisonTable gates={gates} /> : null}

      <p className="border-t border-hairline pt-2 text-small italic text-muted">
        {FRAMEWORK_FOOTNOTE}
      </p>

      <div aria-live="polite" className="sr-only">
        {live}
      </div>
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
