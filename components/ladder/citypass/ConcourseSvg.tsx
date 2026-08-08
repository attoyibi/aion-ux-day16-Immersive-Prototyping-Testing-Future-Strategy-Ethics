"use client";

import type { ScalableStation } from "@/content/ladder";

interface PillarLayout {
  pillars: number[];
  boardX: number;
  boardLabel: string;
}

/** Three small concourse variants: different pillars, different board position. */
const LAYOUTS: Record<ScalableStation, PillarLayout> = {
  "Central Interchange": {
    pillars: [70, 150, 230],
    boardX: 250,
    boardLabel: "DEPARTURES",
  },
  "North Terminal": {
    pillars: [50, 110, 200, 260],
    boardX: 60,
    boardLabel: "ABFAHRT / DEPARTURES",
  },
  "Airport Link": {
    pillars: [95, 205],
    boardX: 155,
    boardLabel: "GATES",
  },
};

export function ConcourseSvg({
  station = "Central Interchange",
  rotated = false,
  highContrast = false,
  boardLive = true,
  showMarkers = true,
}: {
  station?: ScalableStation;
  rotated?: boolean;
  highContrast?: boolean;
  boardLive?: boolean;
  showMarkers?: boolean;
}) {
  const layout = LAYOUTS[station];
  const floor = highContrast ? "#000000" : "#F4F2FA";
  const stroke = highContrast ? "#FFFFFF" : "#C9C3E2";
  const pillar = highContrast ? "#333333" : "#DEDAEE";
  const text = highContrast ? "#FFFFFF" : "#6B6785";

  return (
    <svg
      viewBox="0 0 360 200"
      role="img"
      aria-label={`Simulated camera view of the ${station} concourse${rotated ? ", rotated 90 degrees" : ""}`}
      className="h-full w-full"
      style={{
        transform: rotated ? "rotate(90deg) scale(0.72)" : "none",
        transition: "transform 200ms",
      }}
    >
      <rect x="0" y="0" width="360" height="200" fill={floor} />

      {/* back wall */}
      <rect x="0" y="0" width="360" height="86" fill={highContrast ? "#111111" : "#FFFFFF"} />
      <line x1="0" y1="86" x2="360" y2="86" stroke={stroke} strokeWidth="1.5" />

      {/* departure board */}
      <rect
        x={layout.boardX}
        y="16"
        width="76"
        height="34"
        rx="3"
        fill={highContrast ? "#000000" : "#231A45"}
        stroke={stroke}
      />
      <text
        x={layout.boardX + 38}
        y="30"
        textAnchor="middle"
        fontSize="7"
        fill="#FFFFFF"
      >
        {layout.boardLabel}
      </text>
      <text
        x={layout.boardX + 38}
        y="43"
        textAnchor="middle"
        fontSize="8"
        fill={boardLive ? "#FFFFFF" : "#9A93BC"}
      >
        {boardLive ? "07  ·  12:41  ·  ON TIME" : "static feed"}
      </text>

      {/* pillars */}
      {layout.pillars.map((x) => (
        <rect
          key={x}
          x={x}
          y="52"
          width="16"
          height="72"
          fill={pillar}
          stroke={stroke}
        />
      ))}

      {/* floor line the traveller follows */}
      <line
        x1="20"
        y1="150"
        x2="340"
        y2="150"
        stroke={highContrast ? "#FFFFFF" : "#B9B1DD"}
        strokeWidth="2"
        strokeDasharray="10 7"
      />

      {/* platform markers: colour AND label, unless markers are suppressed */}
      {showMarkers ? (
        <g>
          <circle cx="60" cy="172" r="7" fill="#B02A37" />
          <text x="60" y="192" textAnchor="middle" fontSize="9" fill={text}>
            P3
          </text>
          <circle cx="300" cy="172" r="7" fill="#1E7A4D" />
          <text x="300" y="192" textAnchor="middle" fontSize="9" fill={text}>
            P7
          </text>
        </g>
      ) : null}
    </svg>
  );
}
