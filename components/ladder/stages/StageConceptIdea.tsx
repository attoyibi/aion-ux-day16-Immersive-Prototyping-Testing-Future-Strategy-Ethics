"use client";

import { useState } from "react";
import { CONCEPT_DECK_META, CONCEPT_SLIDE } from "@/content/ladder";
import { PersonaCards } from "../citypass/PersonaCards";
import { WireframeSet } from "../citypass/WireframeSet";
import type { GateMap } from "@/lib/types";

/** Every element is a real button, and none of them does anything. */
function DeadElement({
  children,
  onDead,
  className = "",
  label,
}: {
  children: React.ReactNode;
  onDead: () => void;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onDead}
      aria-label={`${label} — no behaviour exists at this stage`}
      className={`w-full rounded-chip border border-transparent text-left transition-colors hover:border-hairline hover:bg-lilac ${className}`}
    >
      {children}
    </button>
  );
}

export function StageConceptIdea({
  gates,
  onToast,
  onInteract,
  announce,
}: {
  gates: GateMap;
  onToast: (message: string) => void;
  onInteract: () => void;
  announce: (message: string) => void;
}) {
  const [taskResult, setTaskResult] = useState<string | null>(null);

  const userNamed = gates["G1.1"];
  const valueInUserTerms = gates["G1.2"];
  const assumptionsShown = gates["G1.3"];
  const decisionAnswered = gates["G1.4"];

  function dead(label: string) {
    onInteract();
    const message = userNamed
      ? CONCEPT_SLIDE.deadToast
      : CONCEPT_SLIDE.deadToastNoUser;
    onToast(message);
    announce(`${label}: ${message}`);
  }

  return (
    <div className="space-y-3">
      {/* The pitch artefact, styled as an internal deck page. */}
      <article className="rounded-card border border-hairline bg-white p-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 border-b border-hairline pb-2">
          <p className="text-small uppercase tracking-wide text-muted">
            {CONCEPT_DECK_META.deckLabel}
          </p>
          <p className="aion-readout text-muted">
            {CONCEPT_DECK_META.version} · {CONCEPT_DECK_META.author}
          </p>
        </div>

        <DeadElement label="Slide title" onDead={() => dead("Slide title")}>
          <h3 className="px-1 text-d2 font-bold text-navy">
            {CONCEPT_SLIDE.title}
          </h3>
        </DeadElement>

        <DeadElement
          label="Hero sketch"
          onDead={() => dead("Hero sketch")}
          className="my-3"
        >
          <div className="flex justify-center bg-lilac/50 py-3">
            <SketchPhone />
          </div>
        </DeadElement>

        <ul className="space-y-1">
          {CONCEPT_SLIDE.claims.map((claim) => (
            <li key={claim}>
              <DeadElement
                label={`Claim: ${claim}`}
                onDead={() => dead("Claim bullet")}
              >
                <span className="flex gap-2 px-1 py-[2px] text-body text-navy">
                  <span aria-hidden="true" className="text-purple">
                    ·
                  </span>
                  {claim}
                </span>
              </DeadElement>
            </li>
          ))}
        </ul>

        <div className="mt-3 space-y-2 text-body">
          <p className="text-navy">
            <span className="text-small uppercase tracking-wide text-muted">
              For:{" "}
            </span>
            {userNamed
              ? CONCEPT_SLIDE.contextLine.replace(/^For: /, "")
              : CONCEPT_SLIDE.contextLineDamaged.replace(/^For: /, "")}
          </p>

          <p className="text-navy">
            <span className="text-small uppercase tracking-wide text-muted">
              Value:{" "}
            </span>
            {valueInUserTerms
              ? CONCEPT_SLIDE.valueLine
              : CONCEPT_SLIDE.valueLineDamaged}
          </p>

          {assumptionsShown ? (
            <div className="rounded-card border border-hairline bg-lilac p-3">
              <p className="text-body font-bold text-navy">
                {CONCEPT_SLIDE.assumptionBox.heading}
              </p>
              <ul className="mt-1 space-y-[2px]">
                {CONCEPT_SLIDE.assumptionBox.items.map((item) => (
                  <li key={item} className="flex gap-2 text-body text-navy">
                    <span aria-hidden="true" className="text-purple">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <p className="text-navy">
              <span className="text-small uppercase tracking-wide text-muted">
                Decision:{" "}
              </span>
              {decisionAnswered
                ? CONCEPT_SLIDE.decisionLine
                : CONCEPT_SLIDE.decisionLineDamaged}
            </p>
            {decisionAnswered ? null : (
              <p className="text-small text-muted">
                {CONCEPT_SLIDE.decisionLineDamagedNote}
              </p>
            )}
          </div>
        </div>

        {/*
          The attachment layer. These are documentation, not product: opening
          one is reading the deck, which is why the product-behaviour readout
          stays at 0 of 6 no matter how much of this the learner explores.
        */}
        <div className="mt-4 space-y-3 border-t border-hairline pt-3">
          <PersonaCards userNamed={userNamed} />
          <WireframeSet />
          <p className="text-small text-muted">
            {CONCEPT_DECK_META.attachmentsNote}
          </p>
        </div>

        <div className="mt-3 border-t border-hairline pt-2">
          <DeadElement
            label="Status line"
            onDead={() => dead("Status line")}
          >
            <p className="px-1 text-small text-muted">{CONCEPT_SLIDE.footer}</p>
          </DeadElement>
        </div>
      </article>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="aion-btn aion-btn-primary"
          onClick={() => {
            onInteract();
            setTaskResult(CONCEPT_SLIDE.tryTaskResult);
            announce(CONCEPT_SLIDE.tryTaskResult);
          }}
        >
          Try the task: find Platform 7
        </button>
        {taskResult ? (
          <p className="text-body text-navy">{taskResult}</p>
        ) : null}
      </div>
    </div>
  );
}

/** Deliberately a sketch: dashed strokes, grey, no fills. */
function SketchPhone() {
  return (
    <svg
      viewBox="0 0 150 120"
      width="180"
      height="144"
      role="img"
      aria-label="Wireframe sketch of a phone showing an arrow overlay"
    >
      <rect
        x="45"
        y="8"
        width="60"
        height="104"
        rx="8"
        fill="none"
        stroke="#9A93BC"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <line
        x1="63"
        y1="16"
        x2="87"
        y2="16"
        stroke="#9A93BC"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <path
        d="M58 70 H88 M80 62 L92 70 L80 78"
        fill="none"
        stroke="#9A93BC"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      <line
        x1="56"
        y1="94"
        x2="94"
        y2="94"
        stroke="#9A93BC"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
    </svg>
  );
}
