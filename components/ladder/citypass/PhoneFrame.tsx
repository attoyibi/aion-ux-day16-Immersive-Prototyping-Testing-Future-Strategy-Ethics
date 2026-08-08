"use client";

import type { ReactNode } from "react";
import { PROTOTYPE_BUILD_META } from "@/content/ladder";

/**
 * Device chrome around the running build, so the demo reads as something on a
 * phone in a concourse rather than a panel on a slide. The status bar time is
 * a fixed string: nothing here reads the clock.
 */
export function PhoneFrame({
  children,
  step,
  totalSteps,
  screenLabel,
  showPressure = true,
}: {
  children: ReactNode;
  step: number | null;
  totalSteps: number;
  screenLabel: string;
  showPressure?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="rounded-[18px] border-[6px] border-navy bg-navy shadow-card">
        {/* status bar */}
        <div className="flex items-center justify-between px-3 py-[3px] text-[11px] text-white/85">
          <span className="aion-readout">
            {PROTOTYPE_BUILD_META.statusBarTime}
          </span>
          <span aria-hidden="true" className="flex items-center gap-[3px]">
            <span className="inline-block h-[7px] w-[3px] rounded-[1px] bg-white/50" />
            <span className="inline-block h-[9px] w-[3px] rounded-[1px] bg-white/70" />
            <span className="inline-block h-[11px] w-[3px] rounded-[1px] bg-white" />
            <span className="ml-1 inline-block h-[8px] w-[16px] rounded-[2px] border border-white/70" />
          </span>
        </div>

        <div className="rounded-[12px] bg-white">
          {/* app bar */}
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-[6px]">
            <span className="text-small font-bold text-navy">CityPass AR</span>
            <span className="aion-readout text-muted">
              {step === null ? screenLabel : `Step ${step} of ${totalSteps}`}
            </span>
          </div>

          {showPressure ? (
            <p className="border-b border-hairline bg-lilac px-3 py-[4px] text-small text-navy">
              {PROTOTYPE_BUILD_META.connectionPressure}
            </p>
          ) : null}

          <div className="p-3">{children}</div>
        </div>
      </div>

      <p className="mt-1 text-center text-small text-muted">
        {PROTOTYPE_BUILD_META.buildLabel} · {PROTOTYPE_BUILD_META.environment}
      </p>
    </div>
  );
}
