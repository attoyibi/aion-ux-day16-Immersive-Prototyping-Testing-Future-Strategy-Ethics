"use client";

import { useState } from "react";
import { InfoCard } from "@/components/shell/InfoCard";
import {
  CONCEPT_PERSONAS,
  CONCEPT_PERSONA_DAMAGED,
  type Persona,
} from "@/content/ladder";

const ROLE_TONE: Record<Persona["role"], string> = {
  Primary: "border-purple bg-lilac text-navy",
  Secondary: "border-hairline bg-white text-navy",
  "Excluded by the current concept": "border-warn bg-white text-warn",
};

/**
 * The persona set attached to the deck. Opening one is a documentation act,
 * not product behaviour — the product still does nothing at this stage.
 */
export function PersonaCards({ userNamed }: { userNamed: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  if (!userNamed) {
    return (
      <div className="rounded-card border border-hairline bg-white p-3">
        <p className="text-small uppercase tracking-wide text-muted">
          {CONCEPT_PERSONA_DAMAGED.label}
        </p>
        <p className="text-d3 font-bold text-navy">
          {CONCEPT_PERSONA_DAMAGED.value}
        </p>
        <p className="mt-1 text-small text-muted">
          {CONCEPT_PERSONA_DAMAGED.note}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-small uppercase tracking-wide text-muted">
        Attached: persona set (3)
      </p>
      <ul className="grid gap-2 sm:grid-cols-3">
        {CONCEPT_PERSONAS.map((persona) => (
          <li key={persona.id}>
            <button
              type="button"
              aria-label={`Open persona: ${persona.name}, ${persona.role}`}
              onClick={() => setOpen(persona.id)}
              className="aion-card h-full w-full p-2 text-left transition-colors hover:border-purple hover:bg-lilac"
            >
              <span className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-lilac text-small font-bold text-navy"
                >
                  {persona.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-body font-bold text-navy">
                    {persona.name}
                  </span>
                  <span className="block text-small text-muted">
                    {persona.age} · {persona.occupation}
                  </span>
                </span>
              </span>
              <span
                className={`mt-2 inline-block rounded-chip border px-2 py-[1px] text-small ${ROLE_TONE[persona.role]}`}
              >
                {persona.role}
              </span>
              <span className="mt-1 block text-small text-navy">
                {persona.oneLine}
              </span>
              <span className="mt-1 block text-small text-purple underline underline-offset-2">
                Open persona detail
              </span>
            </button>

            <InfoCard
              open={open === persona.id}
              onClose={() => setOpen(null)}
              eyebrow={`${persona.role} persona · CityPass AR concept`}
              heading={`${persona.name}, ${persona.age}`}
              rows={[
                { label: "Occupation", value: persona.occupation },
                {
                  label: "In their words",
                  value: (
                    <span className="italic">&ldquo;{persona.quote}&rdquo;</span>
                  ),
                },
                { label: "Context of use", value: persona.context },
                { label: "Device and connectivity", value: persona.device },
                {
                  label: "Goals",
                  value: (
                    <ul className="list-disc pl-4">
                      {persona.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  label: "Frustrations today",
                  value: (
                    <ul className="list-disc pl-4">
                      {persona.frustrations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                },
                { label: "Observed behaviour", value: persona.behaviour },
                { label: "Accessibility", value: persona.accessibility },
                {
                  label: "What makes them stop using it",
                  value: persona.abandonTrigger,
                },
                { label: "Evidence base", value: persona.evidenceBase },
              ]}
              footer="A persona is a decision record, not a character. The evidence base line is the part that decides how much weight it can carry."
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
