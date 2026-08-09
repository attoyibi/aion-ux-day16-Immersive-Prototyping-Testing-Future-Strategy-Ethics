"use client";

import { useEffect, useState } from "react";
import {
  PILOT_BUILD_META,
  PILOT_COPY,
  PROTOTYPE_COPY,
  PROTOTYPE_DESTINATIONS,
  PROTOTYPE_DESTINATION_DETAIL,
} from "@/content/ladder";
import { ConcourseSvg } from "../citypass/ConcourseSvg";
import { ArrowOverlay3D } from "../citypass/ArrowOverlay3D";
import { ConsentModal } from "../citypass/ConsentModal";
import { FieldFrame } from "../citypass/FieldFrame";
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
  /** Index into PILOT_COPY.walkBeats: the route is walked, not jumped. */
  const [walk, setWalk] = useState(0);

  const beats = PILOT_COPY.walkBeats;
  const beat = beats[Math.min(walk, beats.length - 1)]!;
  const lastBeat = walk >= beats.length - 1;

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
            <FieldFrame screenLabel="Signage mode" recording={false}>
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
            </FieldFrame>
          ) : null}

          {consent === "agreed" && screen === "A" ? (
            <FieldFrame screenLabel="Select destination">
              <div className="space-y-2">
                <h3 className="text-d3 font-bold text-navy">
                  {PROTOTYPE_COPY.screenATitle}
                </h3>
                <ul className="space-y-2">
                  {PROTOTYPE_DESTINATIONS.map((destination) => {
                    const detail =
                      PROTOTYPE_DESTINATION_DETAIL[destination] ?? null;
                    return (
                      <li key={destination}>
                        <button
                          type="button"
                          aria-label={`${destination}. ${detail?.service ?? ""} ${detail?.departs ?? ""}. ${detail?.walk ?? ""}`}
                          className={`aion-btn w-full flex-col items-stretch gap-[2px] px-3 py-2 text-left ${
                            selected === destination
                              ? "border-purple bg-lilac"
                              : ""
                          }`}
                          onClick={() => {
                            setSelected(destination);
                            setScreen("B");
                            setWalk(0);
                            setSignalLost(false);
                            setNotice(null);
                            bump({ sessions: counters.sessions + 1 });
                            announce(`Route to ${destination} started.`);
                          }}
                        >
                          <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                            <span className="text-body font-bold text-navy">
                              {destination}
                            </span>
                            <span className="aion-readout text-purple">
                              {detail?.departs}
                            </span>
                          </span>
                          <span className="text-small text-navy">
                            {detail?.service}
                          </span>
                          <span className="aion-readout text-muted">
                            {detail?.walk}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="flex items-center gap-[6px] text-small text-muted">
                  <span
                    aria-hidden="true"
                    className="inline-block h-[6px] w-[6px] rounded-full bg-ok aion-pulse"
                  />
                  {PILOT_BUILD_META.feedLive} · all 4 routes built, monitored
                  and rolled out to every participant.
                </p>
              </div>
            </FieldFrame>
          ) : null}

          {consent === "agreed" && screen === "B" ? (
            <FieldFrame screenLabel="Route active">
              <div className="space-y-2">
                {/* Same 360:200 ratio as the concourse, so nothing is cropped. */}
                <div className="relative aspect-[9/5] min-h-[210px] overflow-hidden rounded-card border border-hairline">
                  <ConcourseSvg />
                  {signalLost || arrowSuppressed ? null : (
                    <ArrowOverlay3D
                      label={selected ?? "Platform 7"}
                      detail={beat.distance}
                    />
                  )}

                  {/* head-up display: the build telling you it is working */}
                  {signalLost || arrowSuppressed ? null : (
                    <>
                      <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-[5px] rounded-chip bg-navy/85 px-2 py-[2px] text-[11px] font-bold text-white">
                        <span
                          aria-hidden="true"
                          className="inline-block h-[6px] w-[6px] rounded-full bg-[#5CE1A6] aion-pulse"
                        />
                        {PILOT_COPY.liveChip}
                      </div>
                      <div className="pointer-events-none absolute right-2 top-2 rounded-chip bg-white/85 px-2 py-[2px] text-[11px] text-navy">
                        {PILOT_BUILD_META.tracking}
                      </div>
                      <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-chip bg-white/90 px-2 py-1">
                        <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                          <span className="text-small font-bold text-navy">
                            {beat.instruction}
                          </span>
                          <span className="aion-readout text-purple">
                            {beat.distance}
                          </span>
                        </p>
                        <p className="aion-readout text-muted">{beat.turns}</p>
                      </div>
                    </>
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
                            announce("Retrying. The guidance is back.");
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
                      if (!lastBeat) {
                        const next = walk + 1;
                        setWalk(next);
                        announce(
                          `${beats[next]!.instruction}. ${beats[next]!.distance} remaining.`,
                        );
                        return;
                      }
                      setScreen("C");
                      bump({
                        completed: counters.completed + 1,
                        totalTurns: counters.totalTurns + 2,
                      });
                      announce("You have arrived.");
                    }}
                  >
                    {lastBeat
                      ? PILOT_COPY.arriveCta
                      : `${PILOT_COPY.walkCta} · ${beat.distance}`}
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
                      setWalk(0);
                      bump({ abandoned: counters.abandoned + 1 });
                      announce("Route abandoned mid-way.");
                    }}
                  >
                    Give up and walk away
                  </button>
                </div>
              </div>
            </FieldFrame>
          ) : null}

          {consent === "agreed" && screen === "C" ? (
            <FieldFrame screenLabel="Arrived">
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
                  <p className="mt-1 text-small text-muted">
                    Session written to the pilot log.
                  </p>
                </div>
                <button
                  type="button"
                  className="aion-btn"
                  onClick={() => {
                    setScreen("A");
                    setWalk(0);
                    setNotice(PILOT_COPY.statePreserved);
                  }}
                >
                  Start another route
                </button>
              </div>
            </FieldFrame>
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
            setWalk(0);
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

      {/*
        Said out loud, because the stage is deliberately the best-built thing
        in the tab and a learner could read that as "further along is prettier".
        It is not: the pilot is finished software with a small population.
      */}
      <p className="border-l-[3px] border-purple bg-lilac px-3 py-2 text-small text-navy">
        {PILOT_BUILD_META.liveNote}
      </p>

      <PilotDashboard counters={counters} gates={gates} />
    </div>
  );
}
