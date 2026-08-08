"use client";

import { useRef } from "react";
import type { TabId } from "@/lib/types";

export const TABS: { id: TabId; label: string }[] = [
  { id: "ladder", label: "1 · The Ladder" },
  { id: "bench", label: "2 · The Test Bench" },
  { id: "room", label: "3 · The Portfolio Room" },
  { id: "case", label: "4 · NextWorld UX" },
];

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusTab(index: number) {
    const clamped = (index + TABS.length) % TABS.length;
    const tab = TABS[clamped]!;
    onChange(tab.id);
    refs.current[tab.id]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(TABS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="sticky top-0 z-30 border-b border-hairline bg-white no-print">
      <div
        role="tablist"
        aria-label="Day 16 instruments"
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2"
      >
        {TABS.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onKeyDown(event, index)}
              onClick={() => onChange(tab.id)}
              className={`whitespace-nowrap border-b-[3px] px-3 py-2 text-body transition-colors ${
                selected
                  ? "border-purple font-bold text-navy"
                  : "border-transparent text-muted hover:text-navy"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
