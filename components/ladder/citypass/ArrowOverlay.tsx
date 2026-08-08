"use client";

export function ArrowOverlay({
  label,
  animate = true,
  flicker = false,
  rotated = false,
  scale = 1,
  highContrast = false,
}: {
  label: string;
  animate?: boolean;
  flicker?: boolean;
  /** The concourse rotated but the arrow did not: deviation P-D4. */
  rotated?: boolean;
  scale?: number;
  highContrast?: boolean;
}) {
  const fill = highContrast ? "#FFFFFF" : "#5624D0";
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
        flicker ? "aion-flicker" : ""
      }`}
    >
      <div
        className={animate ? "aion-arrow-anim" : ""}
        style={{ transform: `scale(${scale})` }}
      >
        <svg
          viewBox="0 0 140 60"
          width="150"
          height="64"
          role="img"
          aria-label={`Route arrow pointing ${rotated ? "into the wall" : "right"}: ${label}`}
        >
          <g>
            <path
              d="M10 30 H98 M78 12 L102 30 L78 48"
              fill="none"
              stroke={fill}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <p
          className={`mt-1 rounded-chip px-2 py-[2px] text-center text-small font-bold ${
            highContrast
              ? "bg-black text-white"
              : "bg-white/90 text-navy"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
