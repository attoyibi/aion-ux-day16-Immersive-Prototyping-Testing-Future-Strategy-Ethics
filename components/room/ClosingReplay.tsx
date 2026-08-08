"use client";

import { useState } from "react";
import {
  DISCUSSION_IMPULSE,
  REFLECTION_PROMPTS,
} from "@/content/portfolio";
import type { Replay } from "@/lib/quarterEngine";

export function ClosingReplay({
  replay,
  reflections,
  onReflection,
}: {
  replay: Replay;
  reflections: string[];
  onReflection: (index: number, value: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const allPrompts = [...REFLECTION_PROMPTS, DISCUSSION_IMPULSE];

  async function copy() {
    const text = allPrompts
      .map(
        (prompt, index) =>
          `${index + 1}. ${prompt}\n${reflections[index]?.trim() || "— not answered —"}`,
      )
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-3">
      <div className="aion-card p-3">
        <h3 className="text-d3 font-bold text-navy">
          PORTFOLIO REPLAY — 4 QUARTERS
        </h3>
        <dl className="mt-2 divide-y divide-hairline">
          {replay.rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
            >
              <dt className="text-small text-muted">{row.label}</dt>
              <dd className="aion-readout max-w-[30rem] text-navy sm:text-right">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="space-y-2">
        {[replay.loopLine, replay.stopLine, replay.costLine].map((line) => (
          <li
            key={line}
            className="border-l-[3px] border-purple bg-lilac px-3 py-2 text-body text-navy"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        {REFLECTION_PROMPTS.map((prompt, index) => (
          <label key={prompt} className="block">
            <span className="block text-body text-navy">
              {index + 1}. {prompt}
            </span>
            <textarea
              className="mt-1 w-full rounded-card border border-hairline p-2"
              rows={3}
              value={reflections[index] ?? ""}
              onChange={(event) => onReflection(index, event.target.value)}
            />
          </label>
        ))}

        <div className="rounded-card border border-hairline bg-lilac p-3">
          <p className="text-small uppercase tracking-wide text-purple">
            Discussion impulse
          </p>
          <label className="block">
            <span className="block text-body font-bold text-navy">
              4. {DISCUSSION_IMPULSE}
            </span>
            <textarea
              className="mt-1 w-full rounded-card border border-hairline p-2"
              rows={3}
              value={reflections[3] ?? ""}
              onChange={(event) => onReflection(3, event.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="aion-btn" onClick={copy}>
            Copy my reflections
          </button>
          {copied ? (
            <span className="aion-readout text-muted">
              Copied to the clipboard.
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
