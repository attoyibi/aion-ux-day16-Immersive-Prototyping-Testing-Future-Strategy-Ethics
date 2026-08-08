"use client";

import type { ScalableStation } from "@/content/ladder";

interface StationLayout {
  /** x positions of the structural columns, drawn in perspective. */
  pillars: number[];
  boardX: number;
  boardLabel: string;
  boardRows: [string, string][];
  /** x positions of standing/walking figures. */
  figures: number[];
  hallName: string;
}

/** Three concourse variants: different columns, board position and hall. */
const LAYOUTS: Record<ScalableStation, StationLayout> = {
  "Central Interchange": {
    pillars: [62, 148, 244],
    boardX: 236,
    boardLabel: "ABFAHRT · DEPARTURES",
    boardRows: [
      ["12:41  RE 4  Westhafen", "7"],
      ["12:38  S 1   Flughafen", "3"],
    ],
    figures: [96, 130, 190, 268],
    hallName: "Hall B · lower concourse",
  },
  "North Terminal": {
    pillars: [44, 104, 196, 262],
    boardX: 40,
    boardLabel: "ABFAHRT · DEPARTURES",
    boardRows: [
      ["12:44  RB 9  Seehafen", "2"],
      ["12:52  IC 21 Hauptbahnhof", "9"],
    ],
    figures: [140, 172, 232],
    hallName: "North hall · street level",
  },
  "Airport Link": {
    pillars: [92, 208],
    boardX: 142,
    boardLabel: "GATES · FLUGSTEIGE",
    boardRows: [
      ["12:50  Terminal 1", "T1"],
      ["13:05  Terminal 3", "T3"],
    ],
    figures: [64, 118, 246, 292],
    hallName: "Link bridge · airside",
  },
};

/**
 * Where the structural columns stand, so an overlay drawn on top of this scene
 * can be occluded by them instead of floating through them. Columns occupy
 * x..x+20 and y 50..112 including the base.
 */
export function concoursePillars(station: ScalableStation): number[] {
  return LAYOUTS[station].pillars;
}

export const PILLAR_WIDTH = 20;
export const PILLAR_TOP = 50;
export const PILLAR_FOOT = 112;

/** A standing traveller silhouette, drawn small so it reads as background. */
function Figure({
  x,
  scale,
  fill,
}: {
  x: number;
  scale: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${x} 128) scale(${scale})`} opacity="0.5">
      <circle cx="0" cy="-26" r="5" fill={fill} />
      <path
        d="M-6 -20 h12 l3 16 h-6 l-1 14 h-4 l-1 -12 l-1 12 h-4 l-1 -14 h-6 z"
        fill={fill}
      />
    </g>
  );
}

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

  const sky = highContrast ? "#000000" : "#F7F5FC";
  const wall = highContrast ? "#0A0A0A" : "#FFFFFF";
  const floorNear = highContrast ? "#1A1A1A" : "#E9E5F6";
  const floorFar = highContrast ? "#000000" : "#F6F4FB";
  const line = highContrast ? "#FFFFFF" : "#C9C3E2";
  const column = highContrast ? "#2E2E2E" : "#DEDAEE";
  const columnShade = highContrast ? "#141414" : "#CFC8E8";
  const ink = highContrast ? "#FFFFFF" : "#6B6785";
  const boardBg = highContrast ? "#000000" : "#231A45";

  return (
    <svg
      viewBox="0 0 360 200"
      role="img"
      aria-label={`Simulated camera view of the ${station} concourse, ${layout.hallName}${rotated ? ", rotated 90 degrees" : ""}`}
      className="h-full w-full"
      style={{
        transform: rotated ? "rotate(90deg) scale(0.72)" : "none",
        transition: "transform 200ms",
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="aion-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={floorFar} />
          <stop offset="100%" stopColor={floorNear} />
        </linearGradient>
        <linearGradient id="aion-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky} />
          <stop offset="100%" stopColor={wall} />
        </linearGradient>
      </defs>

      {/* glazed roof and back wall */}
      <rect x="0" y="0" width="360" height="96" fill="url(#aion-roof)" />
      {[0, 60, 120, 180, 240, 300, 360].map((x) => (
        <line
          key={`r${x}`}
          x1={x}
          y1="0"
          x2={180 + (x - 180) * 0.42}
          y2="42"
          stroke={line}
          strokeWidth="0.8"
          opacity="0.7"
        />
      ))}
      <line x1="0" y1="42" x2="360" y2="42" stroke={line} strokeWidth="0.8" />

      {/* floor, in perspective */}
      <rect x="0" y="96" width="360" height="104" fill="url(#aion-floor)" />
      <line x1="0" y1="96" x2="360" y2="96" stroke={line} strokeWidth="1.2" />
      {[0, 90, 180, 270, 360].map((x) => (
        <line
          key={`f${x}`}
          x1={180 + (x - 180) * 0.34}
          y1="96"
          x2={x}
          y2="200"
          stroke={line}
          strokeWidth="0.7"
          opacity="0.55"
        />
      ))}

      {/* structural columns, with a shaded face for depth */}
      {layout.pillars.map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="15" height="60" fill={column} />
          <rect x={x + 15} y="50" width="5" height="60" fill={columnShade} />
          <rect x={x - 3} y="106" width="26" height="6" rx="1" fill={columnShade} />
        </g>
      ))}

      {/* hanging departure board */}
      <line
        x1={layout.boardX + 40}
        y1="8"
        x2={layout.boardX + 40}
        y2="18"
        stroke={line}
        strokeWidth="1.5"
      />
      <rect
        x={layout.boardX}
        y="18"
        width="80"
        height="40"
        rx="3"
        fill={boardBg}
        stroke={line}
        strokeWidth="0.8"
      />
      <text
        x={layout.boardX + 40}
        y="29"
        textAnchor="middle"
        fontSize="6"
        fill="#FFFFFF"
        opacity="0.75"
      >
        {layout.boardLabel}
      </text>
      {layout.boardRows.map(([text, platform], index) => (
        <g key={text}>
          <text
            x={layout.boardX + 5}
            y={39 + index * 10}
            fontSize="6.5"
            fill={boardLive ? "#FFFFFF" : "#8F87B8"}
          >
            {boardLive ? text : "— — — —"}
          </text>
          <text
            x={layout.boardX + 75}
            y={39 + index * 10}
            textAnchor="end"
            fontSize="6.5"
            fill={boardLive ? "#FFFFFF" : "#8F87B8"}
            fontWeight="bold"
          >
            {boardLive ? platform : "—"}
          </text>
        </g>
      ))}
      {boardLive ? null : (
        <text
          x={layout.boardX + 40}
          y="55"
          textAnchor="middle"
          fontSize="5.5"
          fill="#8F87B8"
        >
          static feed
        </text>
      )}

      {/* travellers */}
      {layout.figures.map((x, index) => (
        <Figure
          key={x}
          x={x}
          scale={index % 2 === 0 ? 1 : 0.82}
          fill={highContrast ? "#666666" : "#B9B1DD"}
        />
      ))}

      {/* wayfinding floor line the route follows */}
      <path
        d="M30 178 L150 152 L330 146"
        fill="none"
        stroke={highContrast ? "#FFFFFF" : "#B9B1DD"}
        strokeWidth="2.5"
        strokeDasharray="11 8"
        strokeLinecap="round"
      />

      {/* platform markers: colour AND label, so colour is never alone */}
      {showMarkers ? (
        <g>
          <circle cx="52" cy="176" r="7" fill="#B02A37" />
          <text
            x="52"
            y="194"
            textAnchor="middle"
            fontSize="9"
            fill={ink}
            fontWeight="bold"
          >
            P3
          </text>
          <circle cx="312" cy="158" r="7" fill="#1E7A4D" />
          <text
            x="312"
            y="176"
            textAnchor="middle"
            fontSize="9"
            fill={ink}
            fontWeight="bold"
          >
            P7
          </text>
        </g>
      ) : null}

      {/* hall label, the way real station signage is placed */}
      <text x="6" y="16" fontSize="6.5" fill={ink} opacity="0.85">
        {layout.hallName}
      </text>
    </svg>
  );
}
