"use client";

import { useState } from "react";
import {
  CASE_BUDGET_TOTAL,
  NOT_ANSWERED,
  TRACKS,
  TRACK_CALL_LABELS,
} from "@/content/nextworld";
import { CRITERIA_LABELS, criteriaLine } from "@/content/testbench";
import { GOVERNANCE_DECISIONS, OWNER_LABELS } from "@/content/portfolio";
import { eur } from "@/lib/format";
import type { AssessmentDecisions, CriteriaScores } from "@/lib/types";

function pad(text: string, width: number): string {
  return text.length >= width ? text : text + " ".repeat(width - text.length);
}

export function buildSummary(decisions: AssessmentDecisions): string {
  const lines: string[] = ["NEXTWORLD UX — DECISION SUMMARY"];
  lines.push(`Variant chosen: ${decisions.variant ?? NOT_ANSWERED}`);

  const nameWidth = 26;
  let allocated = 0;
  TRACKS.forEach((track) => {
    const call = decisions.calls[track.id];
    const amount = decisions.budget[track.id] ?? 0;
    allocated += amount;
    lines.push(
      `${pad(track.name, nameWidth)}: ${pad(
        call ? TRACK_CALL_LABELS[call] : NOT_ANSWERED,
        16,
      )}${eur(amount)}`,
    );
  });

  lines.push(
    `${pad("Total allocated", nameWidth)}: ${eur(allocated)} of ${eur(CASE_BUDGET_TOTAL)}`,
  );

  const ratingComplete = CRITERIA_LABELS.every(
    ({ key }) => decisions.rating[key] !== undefined,
  );
  lines.push(
    `${pad("Variant rating", nameWidth)}: ${
      ratingComplete
        ? criteriaLine(decisions.rating as CriteriaScores)
        : NOT_ANSWERED
    }`,
  );

  lines.push("Governance model");
  GOVERNANCE_DECISIONS.forEach((decision) => {
    const owner = decisions.governance[decision.id];
    lines.push(
      `  ${pad(decision.label, nameWidth - 2)}: ${
        owner === "unassigned" ? NOT_ANSWERED : OWNER_LABELS[owner]
      }`,
    );
  });

  lines.push(`Leitbild: ${decisions.leitbild.trim() || NOT_ANSWERED}`);
  lines.push(
    `Lead decisions: ${decisions.leadDecisions.trim() || NOT_ANSWERED}`,
  );
  lines.push(
    `Remaining risk: ${decisions.remainingRisk.trim() || NOT_ANSWERED}`,
  );
  lines.push(
    `Management statement: ${decisions.managementStatement.trim() || NOT_ANSWERED}`,
  );

  return lines.join("\n");
}

export function DecisionSummary({
  decisions,
}: {
  decisions: AssessmentDecisions;
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-2">
      <h3 className="text-d3 font-bold text-navy">Decision summary</h3>
      <div className="flex flex-wrap gap-2 no-print">
        <button
          type="button"
          className="aion-btn aion-btn-primary"
          onClick={() => {
            setSummary(buildSummary(decisions));
            setCopied(false);
          }}
        >
          Generate my decision summary
        </button>
        {summary ? (
          <button type="button" className="aion-btn" onClick={copy}>
            Copy to clipboard
          </button>
        ) : null}
        {copied ? (
          <span className="aion-readout self-center text-muted">
            Copied to the clipboard.
          </span>
        ) : null}
      </div>

      {summary ? (
        <pre className="aion-card overflow-x-auto p-3 text-small leading-[1.5] text-navy">
          <code className="font-mono">{summary}</code>
        </pre>
      ) : null}
    </section>
  );
}
