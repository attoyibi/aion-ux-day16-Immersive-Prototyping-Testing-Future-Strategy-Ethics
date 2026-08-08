"use client";

import { useId, useState } from "react";
import {
  CATEGORY_OVERLAP_NOTE,
  CATEGORY_SET_A,
  CATEGORY_SET_B,
} from "@/content/categories";

const ROWS = [
  {
    section: "A",
    level: "L1",
    where:
      "NextWorld UX — all three dossiers + Governance / Timeline / Budget panels",
    support: "Ladder gates, Bench aspect cards",
  },
  {
    section: "B",
    level: "L1",
    where:
      "NextWorld UX — FutureInteraction Hub variant table + Console block 4",
    support: "Ladder stage dossiers, Go/No-Go",
  },
  {
    section: "C",
    level: "L2",
    where: "NextWorld UX — full case incl. Stakeholder Positions",
    support: "Bench evidence grading, six criteria",
  },
  {
    section: "D",
    level: "L3",
    where: "NextWorld UX — Decision Console",
    support: "Portfolio Room",
  },
];

export function TaskMapStrip() {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-1 py-2 text-left text-small text-navy hover:text-purple no-print"
      >
        <span>Task Map — where each worksheet section is answered</span>
        <span aria-hidden="true" className="text-muted">
          {open ? "−" : "+"}
        </span>
      </button>

      <div id={id} hidden={!open} className="print-expand pb-3">
        <div className="aion-card space-y-3 p-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">
                Worksheet sections and where to answer them
              </caption>
              <thead>
                <tr className="border-b border-hairline">
                  {["Section", "Level", "Where to work", "Support"].map(
                    (head) => (
                      <th
                        key={head}
                        scope="col"
                        className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.section} className="border-b border-hairline">
                    <th
                      scope="row"
                      className="py-2 pr-3 align-top text-small font-bold text-navy"
                    >
                      {row.section}
                    </th>
                    <td className="py-2 pr-3 align-top text-small text-navy">
                      {row.level}
                    </td>
                    <td className="py-2 pr-3 align-top text-small text-navy">
                      {row.where}
                    </td>
                    <td className="py-2 pr-3 align-top text-small text-navy">
                      {row.support}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <h4 className="text-small font-bold uppercase tracking-wide text-purple">
                Set A — used in Section A
              </h4>
              <ol className="mt-1 space-y-[2px]">
                {CATEGORY_SET_A.map((entry, index) => (
                  <li key={entry.key} className="text-small text-navy">
                    {index + 1}. {entry.english}{" "}
                    <span className="text-muted">({entry.german})</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="text-small font-bold uppercase tracking-wide text-purple">
                Set B — used in Section C
              </h4>
              <ol className="mt-1 space-y-[2px]">
                {CATEGORY_SET_B.map((entry, index) => (
                  <li key={entry.key} className="text-small text-navy">
                    {index + 1}. {entry.english}{" "}
                    <span className="text-muted">({entry.german})</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="text-small text-muted">{CATEGORY_OVERLAP_NOTE}</p>

          <div className="space-y-1 border-t border-hairline pt-2">
            <p className="text-small font-bold text-navy">How to use this app</p>
            <p className="text-small text-navy">
              The Ladder (~12 min) → The Test Bench (~10 min) → The Portfolio
              Room (~10 min) → NextWorld UX (work here) → transcribe your
              Decision Summary into the worksheet.
            </p>
            <p className="text-small text-navy">
              Tabs 1–3 explain themselves. Tab 4 does not — that is intentional.
            </p>
            <p className="text-small text-navy">
              Section B has objective items (read the variant table) and judged
              items (choose and defend a variant).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
