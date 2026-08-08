"use client";

import { useEffect, useRef, useState } from "react";
import { PROTOTYPE_COPY, PROTOTYPE_DESTINATIONS } from "@/content/ladder";
import { ConcourseSvg } from "../citypass/ConcourseSvg";
import { ArrowOverlay } from "../citypass/ArrowOverlay";
import type { GateMap } from "@/lib/types";

type Screen = "A" | "B" | "C" | "deadEnd" | "freeEntry";

export interface PrototypeSignals {
  deviationsSeen: string[];
  sessionCount: number;
}

export function StagePrototype({
  gates,
  signals,
  onSignal,
  announce,
  arrowSuppressed,
}: {
  gates: GateMap;
  signals: PrototypeSignals;
  onSignal: (next: PrototypeSignals) => void;
  announce: (message: string) => void;
  /** Stress test S2 removes the arrow and lets the stage show its own response. */
  arrowSuppressed: boolean;
}) {
  const [screen, setScreen] = useState<Screen>("A");
  const [selected, setSelected] = useState<string | null>(null);
  const [arrows, setArrows] = useState(1);
  const [rotated, setRotated] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [freeText, setFreeText] = useState("");

  // A real double-press detector, so the happy path stays flawless on a single
  // press and P-D3 fires only when the control is genuinely pressed twice.
  const arrivalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (arrivalTimer.current) clearTimeout(arrivalTimer.current);
    },
    [],
  );

  const contextClear = gates["G2.1"];
  const labelsClear = gates["G2.2"];
  const robust = gates["G2.3"];
  const loadResilient = gates["G2.4"];
  const testable = gates["G2.5"];

  function recordDeviation(id: string, message: string) {
    setNotice(message);
    announce(message);
    if (!signals.deviationsSeen.includes(id)) {
      onSignal({
        ...signals,
        deviationsSeen: [...signals.deviationsSeen, id],
      });
    }
  }

  function reset() {
    if (arrivalTimer.current) {
      clearTimeout(arrivalTimer.current);
      arrivalTimer.current = null;
    }
    setScreen("A");
    setSelected(null);
    setArrows(1);
    setRotated(false);
    setNotice(null);
    setFreeText("");
  }

  // G2.2 OFF: every button loses its label and becomes an identical grey
  // rectangle. Nothing is disabled — they all still function.
  function btnLabel(text: string) {
    return labelsClear ? text : "";
  }
  const unlabelled = labelsClear
    ? ""
    : "!bg-[#DEDAEE] !text-transparent !border-[#CFC9E6] min-w-[110px]";

  const distanceLabel = robust
    ? PROTOTYPE_COPY.overlayLabel
    : PROTOTYPE_COPY.overlayLabelDamaged;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-d3 font-bold text-navy">
          {screen === "A" || screen === "freeEntry"
            ? PROTOTYPE_COPY.screenATitle
            : screen === "B"
              ? PROTOTYPE_COPY.screenBTitle
              : screen === "C"
                ? PROTOTYPE_COPY.screenCTitle
                : "Route unavailable"}
        </h3>
        <span className="aion-readout text-muted">
          Screen {screen === "freeEntry" ? "A" : screen === "deadEnd" ? "—" : screen}
        </span>
      </div>

      {screen === "A" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PROTOTYPE_DESTINATIONS.map((destination) => (
              <button
                key={destination}
                type="button"
                aria-label={
                  labelsClear ? destination : `Unlabelled option: ${destination}`
                }
                className={`aion-btn ${unlabelled}`}
                onClick={() => {
                  setSelected(destination);
                  if (destination === "Platform 7") {
                    setScreen("B");
                    setArrows(1);
                    setNotice(null);
                    onSignal({
                      ...signals,
                      sessionCount: signals.sessionCount + 1,
                    });
                    announce("Screen B: camera view with route arrow.");
                  } else {
                    setScreen("deadEnd");
                    recordDeviation("P-D1", PROTOTYPE_COPY.deviations.P_D1);
                  }
                }}
              >
                {btnLabel(destination)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`aion-btn ${unlabelled}`}
            aria-label={PROTOTYPE_COPY.freeEntryLabel}
            onClick={() => setScreen("freeEntry")}
          >
            {btnLabel(PROTOTYPE_COPY.freeEntryLabel)}
          </button>
        </div>
      ) : null}

      {screen === "freeEntry" ? (
        <div className="space-y-2">
          <label htmlFor="proto-free" className="block text-body text-navy">
            {PROTOTYPE_COPY.freeEntryLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="proto-free"
              type="text"
              value={freeText}
              onChange={(event) => setFreeText(event.target.value)}
              className="rounded-chip border border-hairline px-2 py-1"
              placeholder="Type a destination"
            />
            <button
              type="button"
              className={`aion-btn ${unlabelled}`}
              aria-label="Submit destination"
              onClick={() =>
                recordDeviation("P-D5", PROTOTYPE_COPY.deviations.P_D5)
              }
            >
              {btnLabel("Go")}
            </button>
            <button
              type="button"
              className={`aion-btn ${unlabelled}`}
              aria-label="Back to destination list"
              onClick={() => {
                setScreen("A");
                setNotice(null);
              }}
            >
              {btnLabel("Back")}
            </button>
          </div>
        </div>
      ) : null}

      {screen === "deadEnd" ? (
        <div className="space-y-3">
          <p className="rounded-card border border-hairline bg-lilac p-3 text-body text-navy">
            {PROTOTYPE_COPY.deviations.P_D1}
          </p>
          <button
            type="button"
            className={`aion-btn ${unlabelled}`}
            aria-label="Back to destination list"
            onClick={() => {
              setScreen("A");
              setSelected(null);
              setNotice(null);
            }}
          >
            {btnLabel("Back")}
          </button>
        </div>
      ) : null}

      {screen === "B" ? (
        <div className="space-y-3">
          <div className="relative h-[220px] overflow-hidden rounded-card border border-hairline">
            {contextClear ? (
              <ConcourseSvg rotated={rotated} />
            ) : (
              <div className="h-full w-full bg-white" aria-label="No context" />
            )}
            {arrowSuppressed ? null : (
              <>
                <ArrowOverlay
                  label={distanceLabel}
                  flicker={!robust}
                  rotated={rotated}
                />
                {arrows > 1 ? (
                  <div className="translate-x-6 translate-y-4">
                    <ArrowOverlay
                      label={distanceLabel}
                      flicker={!robust}
                      rotated={rotated}
                    />
                  </div>
                ) : null}
              </>
            )}
            {arrowSuppressed ? (
              <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-body text-muted">
                The arrow is gone and the screen stays empty.
              </p>
            ) : null}
          </div>

          {!contextClear ? (
            <p className="aion-readout text-muted">Context removed.</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`aion-btn aion-btn-primary ${unlabelled}`}
              aria-label="I am following the arrow"
              onClick={() => {
                if (arrowSuppressed) {
                  setNotice(
                    "There is no arrow to follow and no fallback. The traveller is standing in a concourse with nothing.",
                  );
                  return;
                }
                if (arrivalTimer.current) {
                  // Second press inside the window: the duplicate is not handled.
                  clearTimeout(arrivalTimer.current);
                  arrivalTimer.current = null;
                  setArrows(2);
                  recordDeviation("P-D3", PROTOTYPE_COPY.deviations.P_D3);
                  return;
                }
                arrivalTimer.current = setTimeout(() => {
                  arrivalTimer.current = null;
                  setScreen("C");
                  announce("Screen C: you have arrived.");
                }, 300);
              }}
            >
              {btnLabel("I'm following the arrow")}
            </button>
            <button
              type="button"
              className={`aion-btn ${unlabelled}`}
              aria-label="Rotate my phone"
              onClick={() => {
                setRotated((v) => !v);
                recordDeviation("P-D4", PROTOTYPE_COPY.deviations.P_D4);
              }}
            >
              {btnLabel("Rotate my phone")}
            </button>
            <button
              type="button"
              className={`aion-btn ${unlabelled}`}
              aria-label="Back to destination list"
              onClick={() => {
                setScreen("A");
                setSelected(null);
                setArrows(1);
                setRotated(false);
                recordDeviation("P-D2", PROTOTYPE_COPY.deviations.P_D2);
              }}
            >
              {btnLabel("Back")}
            </button>
          </div>

          {arrows > 1 ? (
            <p className="aion-readout text-muted">
              Distance label: 90m / 90m
            </p>
          ) : null}
        </div>
      ) : null}

      {screen === "C" ? (
        <div className="space-y-3">
          <div className="rounded-card border border-hairline bg-lilac p-4 text-center">
            <p aria-hidden="true" className="text-d1 text-ok">
              ✓
            </p>
            <p className="text-d3 font-bold text-navy">
              {PROTOTYPE_COPY.screenCTitle}
            </p>
            <p className="aion-readout text-navy">
              {PROTOTYPE_COPY.arrivalSummary}
            </p>
          </div>
          <button
            type="button"
            className={`aion-btn ${unlabelled}`}
            aria-label="Start over"
            onClick={reset}
          >
            {btnLabel("Start over")}
          </button>
        </div>
      ) : null}

      {notice ? (
        <p className="aion-readout border-l-[3px] border-purple bg-lilac px-3 py-2 text-navy">
          {notice}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline pt-2">
        <span className="aion-readout text-muted">
          Selected destination:{" "}
          {testable ? (selected ?? "none") : "no data captured"}
        </span>
        <span className="aion-readout text-muted">
          Sessions:{" "}
          {!testable
            ? "no data captured"
            : loadResilient
              ? String(signals.sessionCount)
              : "12 · queue stalled"}
        </span>
        <span className="aion-readout text-muted">
          Deviations triggered:{" "}
          {testable ? `${signals.deviationsSeen.length} of 5` : "unknown"}
        </span>
        {!testable ? (
          <span className="aion-readout text-muted">Nothing observable.</span>
        ) : null}
        <button type="button" className="aion-btn text-small" onClick={reset}>
          Reset this demo
        </button>
      </div>
    </div>
  );
}
