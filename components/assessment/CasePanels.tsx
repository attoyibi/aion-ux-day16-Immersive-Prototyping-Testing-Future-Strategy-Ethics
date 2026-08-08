"use client";

import {
  CASE_BUDGET_TABLE,
  CASE_GOVERNANCE_TABLE,
  CASE_TIMELINE,
  CASE_TIMELINE_WEEKS,
  VARIANTS,
  VARIANT_ATTRIBUTE_ROWS,
  VARIANT_HEADER,
  type DocTable,
} from "@/content/nextworld";

function PlainTable({ table, caption }: { table: DocTable; caption: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-hairline">
            {table.head.map((head) => (
              <th
                key={head}
                scope="col"
                className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.cells.join("|")}
              data-flaw-id={row.flawId}
              className="border-b border-hairline"
            >
              {row.cells.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className="py-2 pr-3 align-top text-body text-navy"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GovernancePanelCase() {
  return (
    <section className="aion-card p-3">
      <h3 className="text-d3 font-bold text-navy">Governance Panel</h3>
      <div className="mt-2">
        <PlainTable
          table={CASE_GOVERNANCE_TABLE}
          caption="Programme governance roles and owners"
        />
      </div>
    </section>
  );
}

export function ProgrammeTimeline() {
  return (
    <section className="aion-card p-3">
      <h3 className="text-d3 font-bold text-navy">Programme Timeline</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <caption className="sr-only">
            Sixteen-week programme timeline by workstream
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="py-1 pr-3 text-small uppercase tracking-wide text-muted"
              >
                Workstream
              </th>
              {CASE_TIMELINE_WEEKS.map((week) => (
                <th
                  key={week}
                  scope="col"
                  className="py-1 text-center text-small text-muted"
                >
                  {week}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CASE_TIMELINE.map((row) => (
              <tr
                key={row.workstream}
                data-flaw-id={row.flawId}
                className="border-b border-hairline"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-2 pr-3 text-small font-bold text-navy"
                >
                  {row.workstream}
                </th>
                {CASE_TIMELINE_WEEKS.map((week) => {
                  const active = week >= row.from && week <= row.to;
                  return (
                    <td key={week} className="py-2 text-center">
                      <span className="sr-only">
                        {active
                          ? `week ${week}: active`
                          : `week ${week}: not active`}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-block h-3 w-full min-w-[14px] ${
                          active ? "bg-lilac" : ""
                        }`}
                      >
                        {active ? "■" : ""}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-small text-muted">
        Weeks 1 to 16. A filled cell means the workstream is running that week.
      </p>
    </section>
  );
}

export function BudgetOverview() {
  return (
    <section className="aion-card p-3">
      <h3 className="text-d3 font-bold text-navy">Budget Overview</h3>
      <div className="mt-2">
        <PlainTable
          table={CASE_BUDGET_TABLE}
          caption="Track budget requests and available budget"
        />
      </div>
    </section>
  );
}

export function VariantComparison() {
  return (
    <section className="aion-card p-3">
      <h3 className="text-d3 font-bold text-navy">
        FutureInteraction Hub — scaling variants
      </h3>
      <p className="text-small text-muted">{VARIANT_HEADER}</p>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {VARIANTS.map((variant) => (
          <article
            key={variant.id}
            className="rounded-card border border-hairline p-3"
          >
            <h4 className="text-d3 font-bold text-navy">
              Variant {variant.id} — {variant.name}
            </h4>
            <p className="mt-1 text-body text-navy">{variant.description}</p>
            <dl className="mt-2 divide-y divide-hairline">
              {VARIANT_ATTRIBUTE_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 py-[3px]"
                >
                  <dt className="text-small text-muted">{row.label}</dt>
                  <dd className="aion-readout text-navy">
                    {variant[row.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
