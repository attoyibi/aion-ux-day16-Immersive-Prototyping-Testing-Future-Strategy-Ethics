"use client";

import { useState } from "react";
import { Caption, SectionHeading } from "@/components/shell/Primitives";
import {
  GO_NO_GO_CLOSING,
  GO_NO_GO_EVIDENCE,
  GO_NO_GO_FAILURE_LINES,
  GO_NO_GO_ROWS,
} from "@/content/ladder";

type Seat = "feasibility" | "responsibility";

export function GoNoGoMeeting() {
  const [seat, setSeat] = useState<Seat>("feasibility");

  return (
    <section className="space-y-3">
      <SectionHeading eyebrow="Closing the ladder" title="The Go / No-Go meeting">
        The same evidence, read from two seats. Switch the toggle and watch only
        the conclusions move.
      </SectionHeading>

      <div
        role="radiogroup"
        aria-label="Decision mindset"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            ["feasibility", "Technological feasibility thinking"],
            ["responsibility", "Responsible UX strategy"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={seat === id}
            className={`aion-btn ${seat === id ? "aion-btn-primary" : ""}`}
            onClick={() => setSeat(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="aion-readout text-navy">
        Seat:{" "}
        {seat === "feasibility"
          ? "Technological feasibility thinking"
          : "Responsible UX strategy"}
      </p>

      {/* Fixed and identical for both mindsets. */}
      <div className="aion-card p-3">
        <h4 className="text-d3 font-bold text-navy">
          {GO_NO_GO_EVIDENCE.heading}
        </h4>
        <dl className="mt-2 divide-y divide-hairline">
          {GO_NO_GO_EVIDENCE.rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
            >
              <dt className="text-small text-muted">{row.label}</dt>
              <dd className="aion-readout text-navy">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 border-t border-hairline pt-2 text-small text-muted">
          This evidence panel does not change when the toggle changes.
        </p>
      </div>

      <div className="aion-card overflow-x-auto p-3">
        <table className="w-full min-w-[520px] text-left">
          <caption className="sr-only">
            Paired questions and conclusions for the selected mindset
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="py-1 pr-3 text-small uppercase tracking-wide text-muted">
                Question
              </th>
              <th scope="col" className="py-1 text-small uppercase tracking-wide text-muted">
                Conclusion
              </th>
            </tr>
          </thead>
          <tbody>
            {GO_NO_GO_ROWS.map((row) => {
              const question =
                seat === "feasibility" ? row.feasibilityQ : row.responsibilityQ;
              const answer =
                seat === "feasibility" ? row.feasibilityA : row.responsibilityA;
              return (
                <tr key={row.feasibilityQ} className="border-b border-hairline">
                  <th
                    scope="row"
                    className="py-2 pr-3 align-top text-body font-bold text-navy"
                  >
                    {question}
                  </th>
                  <td className="py-2 align-top text-body text-navy">
                    {answer}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Both seats get a failure line. Neither mindset is the villain. */}
      <p className="aion-readout border-l-[3px] border-navy bg-white px-3 py-2 text-navy">
        {seat === "feasibility"
          ? GO_NO_GO_FAILURE_LINES.feasibility
          : GO_NO_GO_FAILURE_LINES.responsibility}
      </p>

      <Caption>{GO_NO_GO_CLOSING}</Caption>
    </section>
  );
}
