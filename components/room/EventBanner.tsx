"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import { PRODUCT_NAMES, type EthicalEvent } from "@/content/portfolio";

export function EventBanner({
  event,
  chosen,
  onChoose,
}: {
  event: EthicalEvent;
  chosen: string | null;
  onChoose: (optionId: string) => void;
}) {
  const [cardOpen, setCardOpen] = useState(false);
  const option = event.options.find((o) => o.id === chosen);

  return (
    <article className="aion-card border-l-[3px] border-l-warn p-3">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="aion-readout text-muted">{event.id}</span>
        <button
          type="button"
          aria-label={`Open details: ${event.dimension}`}
          className="text-body font-bold text-navy underline decoration-hairline underline-offset-2 hover:decoration-purple"
          onClick={() => setCardOpen(true)}
        >
          {event.dimension}
        </button>
      </div>

      <p className="mt-1 text-body text-navy">{event.body}</p>
      <p className="mt-1 text-small text-muted">
        Touches: {event.touches.map((id) => PRODUCT_NAMES[id]).join(" · ")}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {event.options.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={chosen === item.id}
            className={`aion-btn ${chosen === item.id ? "aion-btn-primary" : ""}`}
            onClick={() => onChoose(item.id)}
            disabled={chosen !== null}
          >
            {item.label}
          </button>
        ))}
      </div>

      {option ? (
        <p className="mt-2 border-t border-hairline pt-2 text-body text-navy">
          <span className="font-bold">Applied next quarter: </span>
          {option.consequence}
        </p>
      ) : null}

      <InfoCard
        open={cardOpen}
        onClose={() => setCardOpen(false)}
        eyebrow="Ethical dimension"
        heading={event.dimension}
        rows={[
          { label: "What it asks", value: event.card.asks },
          { label: "What failure looks like", value: event.card.failureLooksLike },
          { label: "The signal to watch for", value: event.card.signal },
        ]}
      />
    </article>
  );
}
