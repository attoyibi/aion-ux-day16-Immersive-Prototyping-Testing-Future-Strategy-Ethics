"use client";

import { useEffect, useState } from "react";
import { PILOT_COPY, PROTOTYPE_COPY, PROTOTYPE_DESTINATIONS } from "@/content/ladder";
import { ConcourseSvg } from "../citypass/ConcourseSvg";
import { ArrowOverlay } from "../citypass/ArrowOverlay";
import { ConsentModal } from "../citypass/ConsentModal";
import {
  EMPTY_COUNTERS,
  PilotDashboard,
  type PilotCounters,
} from "../citypass/PilotDashboard";
import type { GateMap } from "@/lib/types";

type Screen = "A" | "B" | "C" | "declined";
type ConsentState = "pending" | "agreed" | "declined";

export function StagePilot({
  gates,
  counters,
  onCounters,
  announce,
  arrowSuppressed,
  consentRequestedAt,
  languageRequestedAt,
}: {
  gates: GateMap;
  counters: PilotCounters;
  onCounters: (next: PilotCounters) => void;
  announce: (message: string) => void;
  arrowSuppressed: boolean;
  /** Stress test S3 reopens the consent flow. */
  consentRequestedAt: number;
  /** Stress test S4 attempts the language switch and gets the real refusal. */
  languageRequestedAt: number;
}) {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [screen, setScreen] = useState<Screen>("A");
  const [selected, setSelected] = useState<string | null>(null);
  const [signalLost, setSignalLost] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [refusal, setRefusal] = useState<string | null>(null);

  const allowDecline = gates["G3.3"];

  // If G3.3 is switched off while the learner is in declined mode, the
  // alternative path no longer exists and consent must be asked again.
  useEffect(() => {
    if (!allowDecline && consent === "declined") {
      setConsent("pending");
      setScreen("A");
    }
  }, [allowDecline, consent]);

  useEffect(() => {
    if (consentRequestedAt > 0) {
      setConsent("pending");
      setScreen("A");
      setSelected(null);
    }
  }, [consentRequestedAt]);

  useEffect(() => {
    if (languageRequestedAt > 0) {
      setRefusal(PILOT_COPY.refusalGerman);
      announce(PILOT_COPY.refusalGerman);
    }
  }, [languageRequestedAt, announce]);

  function bump(patch: Partial<PilotCounters>) {
    onCounters({ ...counters, ...patch });
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <ConsentModal
          open={consent === "pending"}
          allowDecline={allowDecline}
          onAgree={() => {
            setConsent("agreed");
            announce("Consent given. The pilot build is available.");
          }}
          onDecline={() => {
            setConsent("declined");
            setScreen("declined");
            onCounters({
              ...counters,
              declined: counters.declined + 1,
            });
            announce(PILOT_COPY.declinedMode);
          }}
        />

        <div
          className={
            consent === "pending" ? "pointer-events-none opacity-40" : ""
          }
        >
          {consent === "declined" ? (
            <div className="space-y-3">
              <p className="aion-readout text-navy">
                {PILOT_COPY.declinedMode}
              </p>
              <div className="rounded-card border border-hairline bg-lilac p-4">
                <p className="text-small uppercase tracking-wide text-muted">
                  Text directions
                </p>
                <p className="text-body text-navy">
                  {PILOT_COPY.declinedFallback}
                </p>
              </div>
              <button
                type="button"
                className="aion-btn"
                onClick={() => {
                  bump({
                    completed: counters.completed + 1,
                    sessions: counters.sessions + 1,
                    totalTurns: counters.totalTurns + 3,
                  });
                  announce(
                    "Task completed using the printed-signage equivalent.",
                  );
                  setNotice(
                    "Task completed without the app. The alternative path works.",
                  );
                }}
              >
                I reached Platform 7 this way
              </button>
              <button
                type="button"
                className="aion-btn"
                onClick={() => setConsent("pending")}
              >
                Review the consent question again
              </button>
            </div>
          ) : null}

          {consent === "agreed" && screen === "A" ? (
            <div className="space-y-2">
              <h3 className="text-d3 font-bold text-navy">
                {PROTOTYPE_COPY.screenATitle}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PROTOTYPE_DESTINATIONS.map((destination) => (
                  <button
                    key={destination}
                    type="button"
                    className={`aion-btn ${
                      selected === destination
                        ? "border-purple bg-lilac font-bold"
                        : ""
                    }`}
                    onClick={() => {
                      setSelected(destination);
                      setScreen("B");
                      setSignalLost(false);
                      setNotice(null);
                      bump({ sessions: counters.sessions + 1 });
                      announce(`Route to ${destination} started.`);
                    }}
                  >
                    {destination}
                  </button>
                ))}
              </div>
              <p className="aion-readout text-muted">
                All 4 destinations are implemented at this stage.
              </p>
            </div>
          ) : null}

          {consent === "agreed" && screen === "B" ? (
            <div className="space-y-3">
              <h3 className="text-d3 font-bold text-navy">
                {PROTOTYPE_COPY.screenBTitle}
              </h3>
              <div className="relative h-[220px] overflow-hidden rounded-card border border-hairline">
                <ConcourseSvg />
                {signalLost || arrowSuppressed ? null : (
                  <ArrowOverlay label={`${selected} — 90m`} />
                )}
                {signalLost || arrowSuppressed ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="rounded-card border border-hairline bg-white p-3 text-center">
                      <p className="text-body text-navy">
                        {PILOT_COPY.signalLostText}
                      </p>
                      <button
                        type="button"
                        className="aion-btn mt-2"
                        onClick={() => {
                          setSignalLost(false);
                          announce("Retrying. The arrow is back.");
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="aion-btn aion-btn-primary"
                  onClick={() => {
                    setScreen("C");
                    bump({
                      completed: counters.completed + 1,
                      totalTurns: counters.totalTurns + 2,
                    });
                    announce("You have arrived.");
                  }}
                >
                  I&apos;m following the guidance
                </button>
                <button
                  type="button"
                  className="aion-btn"
                  onClick={() => {
                    setSignalLost(true);
                    bump({ fallbacks: counters.fallbacks + 1 });
                    announce(PILOT_COPY.signalLostText);
                  }}
                >
                  Simulate weak signal
                </button>
                <button
                  type="button"
                  className="aion-btn"
                  onClick={() => {
                    setScreen("A");
                    setNotice(PILOT_COPY.statePreserved);
                    announce(PILOT_COPY.statePreserved);
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="aion-btn"
                  onClick={() => {
                    setScreen("A");
                    setSelected(null);
                    bump({ abandoned: counters.abandoned + 1 });
                    announce("Route abandoned mid-way.");
                  }}
                >
                  Give up and walk away
                </button>
              </div>
            </div>
          ) : null}

          {consent === "agreed" && screen === "C" ? (
            <div className="space-y-3">
              <div className="rounded-card border border-hairline bg-lilac p-4 text-center">
                <p aria-hidden="true" className="text-d1 text-ok">
                  ✓
                </p>
                <p className="text-d3 font-bold text-navy">
                  {PROTOTYPE_COPY.screenCTitle}
                </p>
                <p className="aion-readout text-navy">
                  {selected} · 90m · 2 turns
                </p>
              </div>
              <button
                type="button"
                className="aion-btn"
                onClick={() => {
                  setScreen("A");
                  setNotice(PILOT_COPY.statePreserved);
                }}
              >
                Start another route
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {notice ? (
        <p className="aion-readout border-l-[3px] border-purple bg-lilac px-3 py-2 text-navy">
          {notice}
        </p>
      ) : null}

      {/* 3f — honest refusals, never greyed out. */}
      <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-2">
        <span className="text-small text-muted">Try these:</span>
        <button
          type="button"
          className="aion-btn"
          onClick={() => {
            setRefusal(PILOT_COPY.refusalGerman);
            announce(PILOT_COPY.refusalGerman);
          }}
        >
          Switch to German
        </button>
        <button
          type="button"
          className="aion-btn"
          onClick={() => {
            setRefusal(PILOT_COPY.refusalSeated);
            announce(PILOT_COPY.refusalSeated);
          }}
        >
          One-handed / seated mode
        </button>
        <button
          type="button"
          className="aion-btn text-small"
          onClick={() => {
            onCounters(EMPTY_COUNTERS);
            setConsent("pending");
            setScreen("A");
            setSelected(null);
            setSignalLost(false);
            setNotice(null);
            setRefusal(null);
          }}
        >
          Reset this pilot
        </button>
      </div>
      {refusal ? (
        <p className="aion-readout text-navy">Result: {refusal}</p>
      ) : null}

      <PilotDashboard counters={counters} gates={gates} />
    </div>
  );
}
