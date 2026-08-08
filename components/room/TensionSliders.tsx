"use client";

import {
  SLIDER_KEYS,
  SLIDER_LABELS,
  SLIDER_PRESETS,
  redistribute,
  resolveProfile,
} from "@/content/portfolio";
import type { TensionSliders as Sliders } from "@/lib/types";

export function TensionSlidersPanel({
  sliders,
  onChange,
}: {
  sliders: Sliders;
  onChange: (next: Sliders) => void;
}) {
  const total = SLIDER_KEYS.reduce((sum, key) => sum + sliders[key], 0);
  const profile = resolveProfile(sliders);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {SLIDER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="aion-btn"
            onClick={() => onChange(preset.values)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SLIDER_KEYS.map((key) => (
          <label key={key} className="block">
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-body text-navy">{SLIDER_LABELS[key]}</span>
              <span className="aion-readout text-navy">{sliders[key]}</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={sliders[key]}
              aria-valuetext={`${SLIDER_LABELS[key]}: ${sliders[key]} of 100 points`}
              onChange={(event) =>
                onChange(redistribute(sliders, key, Number(event.target.value)))
              }
              className="mt-1 w-full accent-[#5624D0]"
            />
          </label>
        ))}
      </div>

      <p className="aion-readout text-navy">
        {SLIDER_KEYS.map((key) => `${SLIDER_LABELS[key]} ${sliders[key]}`).join(
          " · ",
        )}
      </p>
      <p className="aion-readout text-navy">Total: {total} of 100</p>

      <div className="aion-card p-3">
        <p className="text-small uppercase tracking-wide text-purple">
          Profile
        </p>
        <h4 className="text-d3 font-bold text-navy">{profile.name}</h4>
        <p className="mt-1 text-body text-navy">{profile.givesUp}</p>
      </div>
    </div>
  );
}
