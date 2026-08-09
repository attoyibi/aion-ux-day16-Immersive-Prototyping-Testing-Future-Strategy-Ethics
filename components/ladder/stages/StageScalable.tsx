"use client";

import { useEffect, useRef, useState } from "react";
import {
  SCALABLE_ACCESSIBILITY_OPTIONS,
  SCALABLE_BUILD_META,
  SCALABLE_COPY,
  SCALABLE_DESTINATIONS,
  SCALABLE_LANGUAGE_OPTIONS,
  SCALABLE_STATIONS,
  SCALABLE_STRINGS,
  type ScalableStation,
} from "@/content/ladder";
import { ConcourseSvg } from "../citypass/ConcourseSvg";
import { ArrowOverlayFleet } from "../citypass/ArrowOverlayFleet";
import { FleetFrame } from "../citypass/FleetFrame";
import { GovernancePanel } from "../citypass/GovernancePanel";
import { OperationsPanel } from "../citypass/OperationsPanel";
import { LoadMeter } from "../citypass/LoadMeter";
import type { GateMap } from "@/lib/types";

type Accessibility = (typeof SCALABLE_ACCESSIBILITY_OPTIONS)[number];
type Languages = (typeof SCALABLE_LANGUAGE_OPTIONS)[number];

export function StageScalable({
  gates,
  announce,
  arrowSuppressed,
  languageRequestedAt,
  loadRequestedAt,
  governanceRequestedAt,
  consentRequestedAt,
}: {
  gates: GateMap;
  announce: (message: string) => void;
  arrowSuppressed: boolean;
  languageRequestedAt: number;
  loadRequestedAt: number;
  governanceRequestedAt: number;
  consentRequestedAt: number;
}) {
  const [station, setStation] = useState<ScalableStation>(
    "Central Interchange",
  );
  const [languages, setLanguages] = useState<Languages>("EN+DE");
  const [accessibility, setAccessibility] = useState<Accessibility>("Standard");
  const [german, setGerman] = useState(false);
  const [noAr, setNoAr] = useState(false);
  const [refusal, setRefusal] = useState<string | null>(null);
  const [consentNote, setConsentNote] = useState<string | null>(null);
  const [governanceHighlighted, setGovernanceHighlighted] = useState(false);

  const governanceRef = useRef<HTMLDivElement | null>(null);

  const accessible = gates["G4.1"];
  const configurable = gates["G4.2"];
  const connected = gates["G4.3"];

  const effectiveStation: ScalableStation = configurable
    ? station
    : "Central Interchange";
  const destinations =
    SCALABLE_DESTINATIONS[effectiveStation] ??
    SCALABLE_DESTINATIONS["Central Interchange"];
  const destination = destinations[0] ?? "Platform 7";

  const germanAvailable = configurable && languages !== "EN";
  const strings = german && germanAvailable ? SCALABLE_STRINGS.de : SCALABLE_STRINGS.en;
  const highContrast = accessible && accessibility === "High contrast";
  const seated = accessible && accessibility === "Seated mode";

  // Stress test S4 attempts the language switch and lets the stage answer.
  useEffect(() => {
    if (languageRequestedAt === 0) return;
    if (germanAvailable) {
      setGerman(true);
      announce("Language switched to German. The route strings are German.");
      setRefusal(null);
    } else {
      setRefusal(SCALABLE_COPY.notSupported);
      announce(
        "Language switch refused: the build is fixed to one station and one language.",
      );
    }
  }, [languageRequestedAt, germanAvailable, announce]);

  useEffect(() => {
    if (governanceRequestedAt === 0) return;
    setGovernanceHighlighted(true);
    governanceRef.current?.scrollIntoView({ block: "center" });
    governanceRef.current?.focus();
  }, [governanceRequestedAt]);

  useEffect(() => {
    if (consentRequestedAt === 0) return;
    setConsentNote(
      "Declining is a supported path: the maintained text-and-map alternative renders and the task still completes.",
    );
    announce("Consent flow opened. Declining is a supported path.");
  }, [consentRequestedAt, announce]);

  return (
    <div className="space-y-3">
      {/* 4a — capabilities that genuinely work */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`aion-btn ${german ? "aion-btn-primary" : ""}`}
          onClick={() => {
            if (!germanAvailable) {
              setRefusal(SCALABLE_COPY.notSupported);
              announce(SCALABLE_COPY.notSupported);
              return;
            }
            setGerman((v) => !v);
            setRefusal(null);
          }}
        >
          {german ? "Switch to English" : "Switch to German"}
        </button>
        <button
          type="button"
          className={`aion-btn ${seated ? "aion-btn-primary" : ""}`}
          onClick={() => {
            if (!accessible) {
              setRefusal(SCALABLE_COPY.notSupported);
              announce(SCALABLE_COPY.notSupported);
              return;
            }
            setAccessibility(seated ? "Standard" : "Seated mode");
            setRefusal(null);
          }}
        >
          One-handed / seated mode
        </button>
        <button
          type="button"
          className={`aion-btn ${highContrast ? "aion-btn-primary" : ""}`}
          onClick={() => {
            if (!accessible) {
              setRefusal(SCALABLE_COPY.notSupported);
              announce(SCALABLE_COPY.notSupported);
              return;
            }
            setAccessibility(highContrast ? "Standard" : "High contrast");
            setRefusal(null);
            announce(SCALABLE_COPY.contrastHigh);
          }}
        >
          High-contrast mode
        </button>
        <button
          type="button"
          className={`aion-btn ${noAr ? "aion-btn-primary" : ""}`}
          onClick={() => {
            setNoAr((v) => !v);
            announce(SCALABLE_COPY.noArFallback);
          }}
        >
          No-AR fallback
        </button>
      </div>

      {refusal ? (
        <p className="aion-readout text-navy">Result: {refusal}</p>
      ) : null}
      {highContrast ? (
        <p className="aion-readout text-navy">{SCALABLE_COPY.contrastHigh}</p>
      ) : null}
      {consentNote ? (
        <p className="aion-readout border-l-[3px] border-purple bg-lilac px-3 py-2 text-navy">
          {consentNote}
        </p>
      ) : null}

      {/* The live route, inside release chrome */}
      <FleetFrame
        screenLabel={noAr ? "No-AR fallback" : "Route active"}
        station={effectiveStation}
        languages={configurable ? languages : "EN"}
        accessibility={accessible ? accessibility : "Standard"}
        connected={connected}
      >
      {noAr ? (
        <div className="rounded-card border border-hairline bg-white p-4">
          <p className="text-small uppercase tracking-wide text-muted">
            {SCALABLE_COPY.noArFallback}
          </p>
          <p className="text-body text-navy">
            {strings.overlay(destination)} — pass the departure board, turn
            right.
          </p>
          <svg
            viewBox="0 0 240 80"
            width="100%"
            height="80"
            role="img"
            aria-label={`Simple map route to ${destination}`}
            className="mt-2 max-w-sm"
          >
            <line
              x1="12"
              y1="60"
              x2="150"
              y2="60"
              stroke="#5624D0"
              strokeWidth="3"
            />
            <line
              x1="150"
              y1="60"
              x2="150"
              y2="18"
              stroke="#5624D0"
              strokeWidth="3"
            />
            <circle cx="12" cy="60" r="5" fill="#231A45" />
            <circle cx="150" cy="18" r="5" fill="#1E7A4D" />
            <text x="160" y="22" fontSize="10" fill="#231A45">
              {destination}
            </text>
            <text x="8" y="76" fontSize="9" fill="#6B6785">
              You are here
            </text>
          </svg>
        </div>
      ) : (
        // The box holds the ConcourseSvg viewBox ratio (360:200) exactly, so
        // "slice" never crops and the augmented layer stays registered to the
        // floor perspective at every width.
        <div className="relative aspect-[9/5] overflow-hidden rounded-card border border-hairline">
          <ConcourseSvg
            station={effectiveStation}
            highContrast={highContrast}
            boardLive={connected}
          />
          {arrowSuppressed ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="rounded-card border border-hairline bg-white p-3 text-center">
                <p className="text-body text-navy">
                  Camera route unavailable. The no-AR fallback is available and
                  renders a standalone text and map route.
                </p>
              </div>
            </div>
          ) : (
            <ArrowOverlayFleet
              station={effectiveStation}
              destination={strings.destinationName(destination)}
              serviceLine={connected ? "RE 4 · 12:41" : null}
              remaining={strings.remaining}
              stepFreeLabel={strings.stepFree}
              liftLabel={strings.lift}
              aheadLabel={strings.ahead}
              highContrast={highContrast}
              seated={seated}
            />
          )}
        </div>
      )}
      </FleetFrame>

      {!connected ? (
        <p className="aion-readout text-navy">
          Departure board: {SCALABLE_COPY.staticBoard}. {SCALABLE_COPY.islandNote}
        </p>
      ) : null}

      {/* Seated mode genuinely moves the controls into a bottom bar. */}
      <div
        className={
          seated
            ? "flex flex-wrap justify-center gap-2 rounded-card border border-hairline bg-lilac p-2"
            : "flex flex-wrap gap-2"
        }
      >
        <button type="button" className="aion-btn aion-btn-primary">
          {strings.follow}
        </button>
        <button type="button" className="aion-btn">
          {strings.arrived}
        </button>
        <span className="aion-readout self-center text-muted">
          {strings.languageNote}
        </span>
      </div>

      {/*
        Said out loud, so the jump from Pilot to Scalable is not read as
        "the drawings got better". Nothing here is prettier than the pilot by
        accident — it is more configurable, more operable and more accountable.
      */}
      <p className="border-l-[3px] border-purple bg-lilac px-3 py-2 text-small text-navy">
        {SCALABLE_BUILD_META.liveNote}
      </p>

      {/* 4b — configuration panel */}
      <div className="aion-card p-3">
        <h4 className="text-d3 font-bold text-navy">Configuration</h4>
        {configurable ? (
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="block text-small text-muted">Station</span>
              <select
                className="mt-1 w-full rounded-chip border border-hairline px-2 py-1"
                value={station}
                onChange={(event) => {
                  const next = event.target.value as ScalableStation;
                  setStation(next);
                  announce(`Station changed to ${next}.`);
                }}
              >
                {SCALABLE_STATIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-small text-muted">Languages</span>
              <select
                className="mt-1 w-full rounded-chip border border-hairline px-2 py-1"
                value={languages}
                onChange={(event) => {
                  const next = event.target.value as Languages;
                  setLanguages(next);
                  if (next === "EN") setGerman(false);
                }}
              >
                {SCALABLE_LANGUAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-small text-muted">Accessibility</span>
              <select
                className="mt-1 w-full rounded-chip border border-hairline px-2 py-1"
                value={accessibility}
                onChange={(event) =>
                  setAccessibility(event.target.value as Accessibility)
                }
                disabled={!accessible}
              >
                {SCALABLE_ACCESSIBILITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <p className="mt-2 aion-readout text-navy">
            {SCALABLE_COPY.fixedStation}
          </p>
        )}
        <p className="mt-2 aion-readout text-muted">
          Destinations at this station: {destinations.join(" · ")}
        </p>
      </div>

      <GovernancePanel
        ref={governanceRef}
        gates={gates}
        highlighted={governanceHighlighted}
      />
      <OperationsPanel gates={gates} />
      <LoadMeter runToken={loadRequestedAt} announce={announce} />
    </div>
  );
}
