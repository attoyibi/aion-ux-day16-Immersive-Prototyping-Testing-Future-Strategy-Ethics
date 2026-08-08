"use client";

import { useState } from "react";
import { StatusChip } from "@/components/shell/StatusChip";
import { GateCard } from "./GateCard";
import { STAGE_4_TRIAD_HEADER, gatesForStage } from "@/content/gates";
import type { GateId, GateMap, StageId } from "@/lib/types";

/**
 * The standard mechanism at every stage. All gates start ON; switching one OFF
 * applies its documented damage to the live viewport immediately.
 */
export function GateRail({
  stage,
  gates,
  onToggle,
  onRestore,
}: {
  stage: StageId;
  gates: GateMap;
  onToggle: (id: GateId) => void;
  onRestore: () => void;
}) {
  const [openCard, setOpenCard] = useState<GateId | null>(null);
  const stageGates = gatesForStage(stage);
  const met = stageGates.filter((gate) => gates[gate.id]).length;

  return (
    <aside
      aria-label={`Gates for the ${stage} stage`}
      className="aion-card h-fit p-3"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-d3 font-bold text-navy">Gate rail</h3>
        <span className="aion-readout text-navy">
          Gates met: {met} of {stageGates.length}
        </span>
      </div>

      {stage === "scalable" ? (
        <p className="mt-1 text-small text-muted">{STAGE_4_TRIAD_HEADER}</p>
      ) : (
        <p className="mt-1 text-small text-muted">
          All gates start on. Switch one off and watch the stage change.
        </p>
      )}

      <ul className="mt-2 divide-y divide-hairline">
        {stageGates.map((gate) => {
          const on = gates[gate.id];
          return (
            <li key={gate.id} className="py-2">
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${gate.name}: ${on ? "gate met" : "gate not met"}`}
                  onClick={() => onToggle(gate.id)}
                  className={`mt-[2px] inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full border transition-colors ${
                    on
                      ? "border-purple bg-purple"
                      : "border-hairline bg-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-[14px] w-[14px] rounded-full bg-white transition-transform ${
                      on
                        ? "translate-x-[19px] border border-purple"
                        : "translate-x-[3px] border border-hairline"
                    }`}
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    aria-label={`Open details: ${gate.name}`}
                    onClick={() => setOpenCard(gate.id)}
                    className="text-left text-body text-navy underline decoration-hairline underline-offset-2 hover:decoration-purple"
                  >
                    <span className="aion-readout text-muted">{gate.id}</span>{" "}
                    {gate.name}
                    {gate.germanTerm ? (
                      <span className="text-muted"> ({gate.germanTerm})</span>
                    ) : null}
                  </button>
                  <div className="mt-1">
                    <StatusChip word={on ? "MET" : "NOT MET"} />
                    {gate.triad ? (
                      <span className="ml-2 text-small text-muted">
                        [{gate.triad}]
                      </span>
                    ) : null}
                  </div>
                  {on ? null : (
                    <p className="mt-1 text-small text-muted">{gate.damage}</p>
                  )}
                </div>
              </div>

              <GateCard
                gate={gate}
                open={openCard === gate.id}
                onClose={() => setOpenCard(null)}
              />
            </li>
          );
        })}
      </ul>

      <button type="button" className="aion-btn mt-2 w-full" onClick={onRestore}>
        Restore all gates
      </button>
    </aside>
  );
}
