"use client";

import { STAGE_LABELS } from "@/content/ladder";
import { PRODUCT_BLURBS, PRODUCT_NAMES } from "@/content/portfolio";
import { eur, pct, signed } from "@/lib/format";
import type { ProductState, QuarterDecision } from "@/lib/types";

export interface Deltas {
  completion: number;
  declined: number;
  spend: number;
  ethical: number;
}

export function ProductBoard({
  products,
  deltas,
  decisions,
  onDecision,
  locked,
}: {
  products: ProductState[];
  deltas: Record<string, Deltas> | null;
  decisions: Record<string, QuarterDecision | null>;
  onDecision: (id: string, decision: QuarterDecision) => void;
  locked: boolean;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {products.map((product) => {
        const delta = deltas?.[product.id];
        return (
          <article key={product.id} className="aion-card p-3">
            <h4 className="text-d3 font-bold text-navy">
              {PRODUCT_NAMES[product.id]}
            </h4>
            <p className="text-small text-muted">
              {PRODUCT_BLURBS[product.id]}
            </p>
            {product.stopped ? (
              <p className="mt-1 aion-readout text-bad">Stopped.</p>
            ) : null}

            <dl className="mt-2 divide-y divide-hairline">
              <Row label="Stage" value={STAGE_LABELS[product.stage]} />
              <Row
                label="Completion rate"
                value={pct(product.completion)}
                delta={delta ? delta.completion : undefined}
                suffix="%"
              />
              <Row
                label="Consent declined"
                value={pct(product.declined)}
                delta={delta ? delta.declined : undefined}
                suffix="%"
              />
              <Row
                label="Spend to date"
                value={eur(product.spend)}
                delta={delta ? delta.spend : undefined}
                money
              />
              <Row
                label="Quarters at this stage"
                value={String(product.quartersAtStage)}
              />
              <Row
                label="Open ethical items"
                value={String(product.ethicalItems)}
                delta={delta ? delta.ethical : undefined}
              />
            </dl>

            <fieldset className="mt-3" disabled={locked || product.stopped}>
              <legend className="text-small uppercase tracking-wide text-muted">
                Your call this quarter
              </legend>
              <div className="mt-1 flex flex-wrap gap-2">
                {(
                  [
                    ["stop", "Stop"],
                    ["pilot", "Keep Piloting"],
                    ["scale", "Scale"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`aion-btn cursor-pointer ${
                      decisions[product.id] === value
                        ? "border-purple bg-lilac font-bold"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`decision-${product.id}`}
                      value={value}
                      checked={decisions[product.id] === value}
                      onChange={() => onDecision(product.id, value)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </article>
        );
      })}
    </div>
  );
}

function Row({
  label,
  value,
  delta,
  suffix = "",
  money = false,
}: {
  label: string;
  value: string;
  delta?: number;
  suffix?: string;
  money?: boolean;
}) {
  const showDelta = delta !== undefined && delta !== 0;
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-2 py-[3px]">
      <dt className="text-small text-muted">{label}</dt>
      <dd className="aion-readout text-navy">
        {value}
        {showDelta ? (
          <span className="text-muted">
            {" "}
            ({money ? `${delta > 0 ? "+" : "−"}${eur(Math.abs(delta))}` : `${signed(delta)}${suffix}`})
          </span>
        ) : null}
      </dd>
    </div>
  );
}
