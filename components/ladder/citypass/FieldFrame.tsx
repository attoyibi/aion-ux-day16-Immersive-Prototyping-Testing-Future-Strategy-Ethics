"use client";

import type { ReactNode } from "react";
import { PILOT_BUILD_META, PILOT_COPY } from "@/content/ladder";

/**
 * Device chrome for the pilot. Deliberately heavier than the prototype's
 * PhoneFrame: a version number, a telemetry strip and a participant count,
 * because a pilot is a released product being measured rather than a demo
 * being shown. The scope line underneath is the only thing holding it back.
 * Every value is a fixed string — nothing here reads the clock.
 */
export function FieldFrame({
  children,
  screenLabel,
  recording = true,
}: {
  children: ReactNode;
  screenLabel: string;
  /** Off in declined-consent mode: the build runs, the logging does not. */
  recording?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div className="rounded-[18px] border-[6px] border-navy bg-navy shadow-card">
        {/* status bar */}
        <div className="flex items-center justify-between px-3 py-[3px] text-[11px] text-white/85">
          <span className="aion-readout">
            {PILOT_BUILD_META.statusBarTime}
          </span>
          <span aria-hidden="true" className="flex items-center gap-[3px]">
            <span className="inline-block h-[7px] w-[3px] rounded-[1px] bg-white" />
            <span className="inline-block h-[9px] w-[3px] rounded-[1px] bg-white" />
            <span className="inline-block h-[11px] w-[3px] rounded-[1px] bg-white" />
            <span className="ml-1 inline-block h-[8px] w-[16px] rounded-[2px] border border-white/70 bg-white/60" />
          </span>
        </div>

        <div className="overflow-hidden rounded-[12px] bg-white">
          {/* app bar, with the version the operator can actually roll back to */}
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-[6px]">
            <span className="flex items-baseline gap-2">
              <span className="text-small font-bold text-navy">
                CityPass AR
              </span>
              <span className="rounded-chip bg-lilac px-[6px] py-[1px] text-[11px] font-bold text-purple">
                1.2.0
              </span>
            </span>
            <span className="aion-readout text-muted">{screenLabel}</span>
          </div>

          {/* telemetry strip — the pilot's signature: it is being measured */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-[2px] bg-navy px-3 py-[4px] text-[11px] text-white/85">
            <span className="flex items-center gap-[5px]">
              <span
                aria-hidden="true"
                className={`inline-block h-[6px] w-[6px] rounded-full ${
                  recording ? "bg-[#FF6B6B] aion-pulse" : "bg-white/30"
                }`}
              />
              <span className="aion-readout">
                {recording
                  ? `${PILOT_COPY.recChip} · ${PILOT_BUILD_META.recording}`
                  : "Logging off · consent declined"}
              </span>
            </span>
            <span className="aion-readout">{PILOT_BUILD_META.cohort}</span>
            <span className="aion-readout">{PILOT_BUILD_META.tracking}</span>
          </div>

          <div className="p-3">{children}</div>
        </div>
      </div>

      <p className="mt-1 text-center text-small text-muted">
        {PILOT_BUILD_META.buildLabel} · {PILOT_BUILD_META.environment}
      </p>
      <p className="mt-[2px] text-center text-small text-muted">
        Scope: {PILOT_BUILD_META.scopeChip}
      </p>
    </div>
  );
}
