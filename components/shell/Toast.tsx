"use client";

/** Neutral, muted, dismissible. Never red, never an alarm. */
export function Toast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 no-print">
      <div className="pointer-events-auto flex max-w-xl items-start gap-3 rounded-card border border-hairline bg-lilac px-4 py-2 shadow-card">
        <p className="text-body text-muted">{message}</p>
        <button
          type="button"
          className="aion-btn shrink-0 px-2 py-[2px] text-small"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
