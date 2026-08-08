"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NS = "aion.day16.";

export const STORAGE_KEYS = [
  "activeTab",
  "ladder.visited",
  "ladder.gates",
  "ladder.stressRuns",
  "bench.plan",
  "bench.grades",
  "bench.criteria",
  "room.sliders",
  "room.governance",
  "room.quarter",
  "room.log",
  "room.reflections",
  "assessment.decisions",
  "assessment.nudgeDismissed",
] as const;

export type StorageKey = (typeof STORAGE_KEYS)[number];

export function readStored<T>(key: StorageKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(NS + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* quota or private mode: the app stays fully usable without persistence */
  }
}

export function clearAllStored(): void {
  if (typeof window === "undefined") return;
  try {
    for (const key of STORAGE_KEYS) {
      window.localStorage.removeItem(NS + key);
    }
  } catch {
    /* nothing to do */
  }
}

/**
 * State that hydrates from localStorage after mount, so server and first client
 * render always agree and Next never reports a hydration mismatch.
 */
export function usePersistentState<T>(
  key: StorageKey,
  initial: T,
): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const keyRef = useRef(key);

  useEffect(() => {
    setValue(readStored<T>(keyRef.current, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeStored(keyRef.current, resolved);
      return resolved;
    });
  }, []);

  return [value, update, hydrated];
}
