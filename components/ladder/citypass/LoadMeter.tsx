"use client";

import { useEffect, useRef, useState } from "react";
import { SCALABLE_COPY } from "@/content/ladder";

const TARGET = 200;

export function LoadMeter({
  runToken,
  announce,
}: {
  /** Incremented by stress test S5 so the meter can be driven from outside. */
  runToken: number;
  announce: (message: string) => void;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  useEffect(() => stop, []);

  function run() {
    stop();
    setDone(false);
    setCount(0);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCount(TARGET);
      setDone(true);
      announce(SCALABLE_COPY.loadResult);
      return;
    }

    // ~1.2s to climb to 200, in fixed steps: identical on every device.
    let value = 0;
    timer.current = setInterval(() => {
      value += 10;
      setCount(value);
      if (value >= TARGET) {
        stop();
        setDone(true);
        announce(SCALABLE_COPY.loadResult);
      }
    }, 60);
  }

  useEffect(() => {
    if (runToken > 0) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runToken]);

  return (
    <div className="aion-card p-3">
      <h4 className="text-d3 font-bold text-navy">Load</h4>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button type="button" className="aion-btn" onClick={run}>
          Send 200 travellers through it
        </button>
        <span className="aion-readout text-navy">
          Concurrent sessions: {count}
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-chip bg-lilac"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={TARGET}
        aria-valuetext={`${count} of ${TARGET} concurrent sessions`}
      >
        <div
          className="h-full bg-purple transition-[width]"
          style={{ width: `${(count / TARGET) * 100}%` }}
        />
      </div>
      {done ? (
        <p className="mt-2 aion-readout text-navy">{SCALABLE_COPY.loadResult}</p>
      ) : null}
    </div>
  );
}
