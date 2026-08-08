"use client";

import { useState } from "react";
import {
  SUB_TABS,
  type DocField,
  type TrackDossierData,
} from "@/content/nextworld";
import type { CaseSubTabId } from "@/lib/types";

/**
 * Rendered as internal documents. Flawed fields look exactly as ordinary as
 * every other field: the only marker is the data-flaw-id attribute, which is
 * never visible, never styled and never announced.
 */
function FieldList({ fields }: { fields: DocField[] }) {
  return (
    <dl className="divide-y divide-hairline">
      {fields.map((field) => (
        <div
          key={`${field.label}-${field.value}`}
          data-flaw-id={field.flawId}
          className="flex flex-wrap items-baseline justify-between gap-x-3 py-[4px]"
        >
          <dt className="text-small text-muted">{field.label}</dt>
          <dd className="max-w-[32rem] text-body text-navy sm:text-right">
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TrackDossier({ track }: { track: TrackDossierData }) {
  const [sub, setSub] = useState<CaseSubTabId>("prototype");

  return (
    <div className="aion-card p-3">
      <div
        role="tablist"
        aria-label={`${track.name} dossier sections`}
        className="flex flex-wrap gap-1 border-b border-hairline no-print"
      >
        {SUB_TABS.map((item) => {
          const selected = item.id === sub;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${track.id}-${item.id}`}
              id={`${track.id}-tab-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setSub(item.id)}
              onKeyDown={(event) => {
                const index = SUB_TABS.findIndex((t) => t.id === sub);
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setSub(SUB_TABS[(index + 1) % SUB_TABS.length]!.id);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setSub(
                    SUB_TABS[(index - 1 + SUB_TABS.length) % SUB_TABS.length]!
                      .id,
                  );
                }
              }}
              className={`border-b-[3px] px-2 py-1 text-small ${
                selected
                  ? "border-purple font-bold text-navy"
                  : "border-transparent text-muted hover:text-navy"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {SUB_TABS.map((item) => {
        const selected = item.id === sub;
        return (
          <section
            key={item.id}
            role="tabpanel"
            id={`${track.id}-${item.id}`}
            aria-labelledby={`${track.id}-tab-${item.id}`}
            hidden={!selected}
            className="print-expand pt-3"
          >
            <h4 className="mb-2 text-small font-bold uppercase tracking-wide text-purple">
              {track.name} — {item.label}
            </h4>

            {item.id === "prototype" ? (
              <FieldList fields={track.prototype} />
            ) : null}

            {item.id === "testReport" ? (
              <>
                <FieldList fields={track.testReport.fields} />
                {track.testReport.footnotes ? (
                  <div className="mt-2 border-t border-hairline pt-2">
                    {track.testReport.footnotes.map((note) => (
                      <p
                        key={note.value}
                        data-flaw-id={note.flawId}
                        className="text-small text-muted"
                      >
                        {note.label}: {note.value}
                      </p>
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}

            {item.id === "ethics" ? <FieldList fields={track.ethics} /> : null}

            {item.id === "stakeholders" ? (
              <ul className="space-y-3">
                {track.stakeholders.map((quote) => (
                  <li key={quote.who} data-flaw-id={quote.flawId}>
                    <p className="text-small font-bold text-navy">
                      {quote.who}
                    </p>
                    <blockquote className="border-l-[3px] border-hairline pl-3 text-body text-navy">
                      &ldquo;{quote.text}&rdquo;
                    </blockquote>
                  </li>
                ))}
              </ul>
            ) : null}

            {item.id === "budget" ? (
              <FieldList fields={track.budget.fields} />
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
