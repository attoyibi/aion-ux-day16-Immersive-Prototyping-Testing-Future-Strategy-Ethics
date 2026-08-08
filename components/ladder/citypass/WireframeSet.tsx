"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import { CONCEPT_WIREFRAMES } from "@/content/ladder";

const SKETCH = "#9A93BC";

/** Frame 01 — destination select. Boxes and dashes, arguing about structure. */
function FrameSelect() {
  return (
    <>
      <line x1="24" y1="26" x2="52" y2="26" stroke={SKETCH} strokeWidth="2" strokeDasharray="4 3" />
      <line x1="20" y1="42" x2="76" y2="42" stroke={SKETCH} strokeWidth="3" strokeDasharray="6 4" />
      {[56, 78, 100, 122].map((y) => (
        <g key={y}>
          <rect x="18" y={y} width="64" height="16" rx="3" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1="24" y1={y + 8} x2="56" y2={y + 8} stroke={SKETCH} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      ))}
      <rect x="18" y="148" width="64" height="14" rx="3" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="24" y1="155" x2="48" y2="155" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="2 3" />
    </>
  );
}

/** Frame 02 — camera overlay. The environment is the part that gets faked. */
function FrameOverlay() {
  return (
    <>
      <rect x="18" y="26" width="64" height="106" rx="3" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="26" y1="118" x2="74" y2="118" stroke={SKETCH} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="34" y1="40" x2="34" y2="118" stroke={SKETCH} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="66" y1="40" x2="66" y2="118" stroke={SKETCH} strokeWidth="1" strokeDasharray="3 4" />
      <path d="M36 78 H60 M54 70 L66 78 L54 86" fill="none" stroke={SKETCH} strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
      <rect x="24" y="140" width="52" height="14" rx="3" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="30" y1="147" x2="62" y2="147" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="3 3" />
    </>
  );
}

/** Frame 03 — arrival. The only moment the traveller is standing still. */
function FrameArrival() {
  return (
    <>
      <circle cx="50" cy="60" r="16" fill="none" stroke={SKETCH} strokeWidth="2" strokeDasharray="5 4" />
      <path d="M43 60 L48 66 L58 54" fill="none" stroke={SKETCH} strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
      <line x1="28" y1="92" x2="72" y2="92" stroke={SKETCH} strokeWidth="3" strokeDasharray="6 4" />
      <line x1="34" y1="106" x2="66" y2="106" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="22" y="128" width="56" height="16" rx="3" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="30" y1="136" x2="58" y2="136" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="3 3" />
    </>
  );
}

const FRAMES = [FrameSelect, FrameOverlay, FrameArrival];

export function WireframeSet() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-small uppercase tracking-wide text-muted">
          Attached: low-fidelity wireframes (3 frames)
        </p>
        <p className="text-small text-muted">
          Sketch fidelity — structure only, no type scale, no colour
        </p>
      </div>

      <ul className="grid gap-2 sm:grid-cols-3">
        {CONCEPT_WIREFRAMES.map((annotation, index) => {
          const Frame = FRAMES[index] ?? FrameSelect;
          return (
            <li key={annotation.id}>
              <button
                type="button"
                aria-label={`Open wireframe annotation: frame ${annotation.frame}, ${annotation.title}`}
                onClick={() => setOpen(annotation.id)}
                className="aion-card h-full w-full p-2 text-left transition-colors hover:border-purple hover:bg-lilac"
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="aion-readout text-muted">
                    {annotation.frame}
                  </span>
                  <span className="text-small font-bold text-navy">
                    {annotation.title}
                  </span>
                </span>

                <span className="mt-1 flex justify-center bg-lilac/40 py-2">
                  <svg
                    viewBox="0 0 100 180"
                    width="96"
                    height="172"
                    role="img"
                    aria-label={`Low-fidelity wireframe of the ${annotation.title} screen`}
                  >
                    {/* phone outline + notch, common to every frame */}
                    <rect x="8" y="6" width="84" height="168" rx="10" fill="none" stroke={SKETCH} strokeWidth="1.5" strokeDasharray="5 4" />
                    <line x1="40" y1="14" x2="60" y2="14" stroke={SKETCH} strokeWidth="2" strokeDasharray="3 3" />
                    <Frame />
                  </svg>
                </span>

                <span className="mt-1 block text-small text-purple underline underline-offset-2">
                  Open frame annotation
                </span>
              </button>

              <InfoCard
                open={open === annotation.id}
                onClose={() => setOpen(null)}
                eyebrow={`Wireframe ${annotation.frame} · concept draft v0.3`}
                heading={annotation.title}
                rows={[
                  { label: "Intent", value: annotation.intent },
                  {
                    label: "What is on the frame",
                    value: (
                      <ul className="list-disc pl-4">
                        {annotation.onTheFrame.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    label: "What is not decided yet",
                    value: (
                      <ul className="list-disc pl-4">
                        {annotation.notDecided.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  },
                  { label: "The open question", value: annotation.openQuestion },
                  { label: "Why this fidelity", value: annotation.fidelityNote },
                ]}
                footer="A wireframe at this fidelity can be argued with. That is the only thing it is for."
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
