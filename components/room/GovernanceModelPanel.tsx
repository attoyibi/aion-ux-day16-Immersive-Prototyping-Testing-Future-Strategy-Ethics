"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import {
  GOVERNANCE_DECISIONS,
  GOVERNANCE_OWNERS,
  OWNER_LABELS,
} from "@/content/portfolio";
import type {
  GovernanceDecisionId,
  GovernanceModel,
  GovernanceOwnerId,
} from "@/lib/types";

export function GovernanceModelPanel({
  model,
  onChange,
  showCards = true,
  disabled = false,
}: {
  model: GovernanceModel;
  onChange: (next: GovernanceModel) => void;
  /** Tab 4 records silently: no cards, no checks, no consequences. */
  showCards?: boolean;
  disabled?: boolean;
}) {
  const [openCard, setOpenCard] = useState<GovernanceDecisionId | null>(null);

  return (
    <div className="space-y-2">
      {GOVERNANCE_DECISIONS.map((decision) => (
        <div
          key={decision.id}
          className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2"
        >
          <div className="min-w-[200px] flex-1">
            {showCards ? (
              <button
                type="button"
                aria-label={`Open details: ${decision.label}`}
                className="text-left text-body text-navy underline decoration-hairline underline-offset-2 hover:decoration-purple"
                onClick={() => setOpenCard(decision.id)}
              >
                {decision.label}
              </button>
            ) : (
              <span className="text-body text-navy">{decision.label}</span>
            )}
          </div>
          <label className="flex-1">
            <span className="sr-only">Owner for {decision.label}</span>
            <select
              className="w-full rounded-chip border border-hairline px-2 py-1 no-print"
              value={model[decision.id]}
              disabled={disabled}
              onChange={(event) =>
                onChange({
                  ...model,
                  [decision.id]: event.target.value as GovernanceOwnerId,
                })
              }
            >
              {GOVERNANCE_OWNERS.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.label}
                </option>
              ))}
            </select>
            <span className="hidden text-body text-navy print:block">
              {OWNER_LABELS[model[decision.id]]}
            </span>
          </label>

          {showCards ? (
            <InfoCard
              open={openCard === decision.id}
              onClose={() => setOpenCard(null)}
              eyebrow="Decision type"
              heading={decision.label}
              rows={[
                { label: "What this decision actually decides", value: decision.decides },
                {
                  label: "Who is well placed to own it, and why",
                  value: decision.wellPlaced,
                },
                {
                  label: "What goes wrong when it sits with the wrong role",
                  value: decision.wrongRole,
                },
              ]}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
