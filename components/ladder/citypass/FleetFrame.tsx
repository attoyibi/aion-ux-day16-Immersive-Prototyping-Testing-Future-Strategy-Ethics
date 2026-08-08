"use client";

import type { ReactNode } from "react";
import { SCALABLE_BUILD_META } from "@/content/ladder";

/**
 * Device chrome for the scaled product. The pilot's FieldFrame advertises that
 * the build is being measured; this one advertises that it is being operated —
 * a release channel, a fleet count, an armed rollback and a name on the pager.
 *
 * The configuration row echoes the live selections from the panel below, so
 * changing a dropdown visibly changes the running product rather than a form.
 */
export function FleetFrame({
  children,
  screenLabel,
  station,
  languages,
  accessibility,
  connected,
}: {
  children: ReactNode;
  screenLabel: string;
  station: string;
  languages: string;
  accessibility: string;
  /** G4.3 off: the fleet strip stops claiming a live feed. */
  connected: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[460px]">
      <div className="rounded-[18px] border-[6px] border-navy bg-navy shadow-card">
        <div className="flex items-center justify-between px-3 py-[3px] text-[11px] text-white/85">
          <span className="aion-readout">
            {SCALABLE_BUILD_META.statusBarTime}
          </span>
          <span aria-hidden="true" className="flex items-center gap-[3px]">
            <span className="inline-block h-[7px] w-[3px] rounded-[1px] bg-white" />
            <span className="inline-block h-[9px] w-[3px] rounded-[1px] bg-white" />
            <span className="inline-block h-[11px] w-[3px] rounded-[1px] bg-white" />
            <span className="ml-1 inline-block h-[8px] w-[16px] rounded-[2px] border border-white/70 bg-white/60" />
          </span>
        </div>

        <div className="overflow-hidden rounded-[12px] bg-white">
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-[6px]">
            <span className="flex items-baseline gap-2">
              <span className="text-small font-bold text-navy">
                CityPass AR
              </span>
              <span className="rounded-chip bg-lilac px-[6px] py-[1px] text-[11px] font-bold text-purple">
                3.1.0
              </span>
              <span className="rounded-chip bg-ok px-[6px] py-[1px] text-[11px] font-bold text-white">
                {SCALABLE_BUILD_META.channel}
              </span>
            </span>
            <span className="aion-readout text-muted">{screenLabel}</span>
          </div>

          {/* what this instance is currently configured as */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-[2px] border-b border-hairline bg-lilac px-3 py-[4px] text-[11px] text-navy">
            <span className="aion-readout">{station}</span>
            <span className="aion-readout">{languages}</span>
            <span className="aion-readout">{accessibility}</span>
          </div>

          {/* what the operations team sees while it runs */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-[2px] bg-navy px-3 py-[4px] text-[11px] text-white/85">
            <span className="flex items-center gap-[5px]">
              <span
                aria-hidden="true"
                className={`inline-block h-[6px] w-[6px] rounded-full ${
                  connected ? "bg-[#5CE1A6] aion-pulse" : "bg-white/30"
                }`}
              />
              <span className="aion-readout">
                {connected
                  ? SCALABLE_BUILD_META.fleet
                  : "Feed disconnected · timetable static"}
              </span>
            </span>
            <span className="aion-readout">{SCALABLE_BUILD_META.volume}</span>
            <span className="aion-readout">{SCALABLE_BUILD_META.uptime}</span>
          </div>

          <div className="p-3">{children}</div>
        </div>
      </div>

      <p className="mt-1 text-center text-small text-muted">
        {SCALABLE_BUILD_META.buildLabel} · {SCALABLE_BUILD_META.rollback}
      </p>
      <p className="mt-[2px] text-center text-small text-muted">
        {SCALABLE_BUILD_META.operator}
      </p>
    </div>
  );
}
