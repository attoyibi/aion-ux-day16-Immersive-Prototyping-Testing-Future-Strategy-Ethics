"use client";

import { useState } from "react";
import { clearAllStored } from "@/lib/storage";

export function Footer() {
  const [confirming, setConfirming] = useState(false);

  return (
    <footer className="mt-8 bg-navy text-white no-print">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small font-bold tracking-wide">AION-D16</p>
        {confirming ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-small text-white/80">
              Clear every saved answer on this device?
            </span>
            <button
              type="button"
              className="aion-btn border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                clearAllStored();
                window.location.reload();
              }}
            >
              Yes, reset
            </button>
            <button
              type="button"
              className="aion-btn border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="text-small text-white/80 underline underline-offset-2 hover:text-white"
            onClick={() => setConfirming(true)}
          >
            Reset all progress
          </button>
        )}
      </div>
    </footer>
  );
}
