"use client";

import {
  PILLAR_FOOT,
  PILLAR_TOP,
  PILLAR_WIDTH,
  concoursePillars,
} from "./ConcourseSvg";
import type { ScalableStation } from "@/content/ladder";

/**
 * The scaled product's route guidance. Everything the pilot draws, plus the
 * things a product only earns once it is operated by other people:
 *
 *   · a painted route ribbon on the floor, tapering into perspective
 *   · seven bevelled chevrons rather than five, each with a lit top edge
 *   · real occlusion — the route is masked out where a structural column
 *     stands in front of it, so it passes behind the building instead of
 *     through it
 *   · distance ticks laid on the floor beside the route
 *   · a destination billboard carrying the live service and departure
 *   · a second marker for the step-free alternative, because accessibility at
 *     scale is a route, not a setting
 *
 * Geometry matches ConcourseSvg: 360x200, horizon y=96, columns y 50..112.
 * High-contrast mode is a genuine repaint, not a filter. Nothing is random and
 * nothing reads the clock.
 */

interface Node {
  x: number;
  y: number;
  /** Half-width of the ribbon here; shrinks with distance. */
  hw: number;
}

/** Near to far. The bend right is the real turn, and it ends behind a column. */
const ROUTE: Node[] = [
  { x: 148, y: 180, hw: 58 },
  { x: 160, y: 162, hw: 47 },
  { x: 176, y: 146, hw: 36 },
  { x: 195, y: 131, hw: 26 },
  { x: 214, y: 119, hw: 18 },
  { x: 232, y: 109, hw: 11 },
  { x: 247, y: 100, hw: 6 },
];

/** Floor distance ticks, keyed to a node index. */
const TICKS: { node: number; label: string }[] = [
  { node: 1, label: "60 m" },
  { node: 3, label: "30 m" },
];

interface Palette {
  face: string;
  under: string;
  edge: string;
  ribbon: string;
  ribbonEdge: string;
  glow: string;
  billboard: string;
  billboardInk: string;
  tick: string;
}

const STANDARD: Palette = {
  face: "#5624D0",
  under: "#33157F",
  edge: "#A98BF5",
  ribbon: "#5624D0",
  ribbonEdge: "#8B6BE8",
  glow: "#9F7AF5",
  billboard: "#5624D0",
  billboardInk: "#FFFFFF",
  tick: "#3A1690",
};

/** Repainted for high contrast: black road, yellow marks, no mid-tones. */
const CONTRAST: Palette = {
  face: "#FFD400",
  under: "#7A6600",
  edge: "#FFFFFF",
  ribbon: "#000000",
  ribbonEdge: "#FFD400",
  glow: "#FFD400",
  billboard: "#000000",
  billboardInk: "#FFFFFF",
  tick: "#FFD400",
};

/** The painted ribbon: down one edge, back up the other. */
function ribbonPath(nodes: Node[]) {
  const left = nodes.map((n) => `${n.x - n.hw} ${n.y}`);
  const right = [...nodes].reverse().map((n) => `${n.x + n.hw} ${n.y}`);
  return `M${left.join(" L")} L${right.join(" L")} Z`;
}

/** A chevron band pointing away from the viewer. */
function chevronPath(x: number, y: number, w: number, t: number, drop: number) {
  return [
    `M${x - w} ${y + drop}`,
    `L${x} ${y}`,
    `L${x + w} ${y + drop}`,
    `L${x + w} ${y + drop + t}`,
    `L${x} ${y + t}`,
    `L${x - w} ${y + drop + t}`,
    "Z",
  ].join(" ");
}

export function ArrowOverlayFleet({
  station,
  destination,
  serviceLine,
  remaining,
  stepFreeLabel,
  liftLabel,
  aheadLabel,
  highContrast = false,
  seated = false,
  animate = true,
}: {
  station: ScalableStation;
  destination: string;
  /** Live service and departure, or null when the feed is disconnected. */
  serviceLine: string | null;
  remaining: string;
  stepFreeLabel: string;
  liftLabel: string;
  aheadLabel: string;
  highContrast?: boolean;
  /** Seated mode drops the guidance into the lower half and enlarges it. */
  seated?: boolean;
  animate?: boolean;
}) {
  const p = highContrast ? CONTRAST : STANDARD;
  const pillars = concoursePillars(station);
  const maskId = `aion-fleet-mask-${station.replace(/\s+/g, "")}`;
  const glowId = `aion-fleet-glow-${highContrast ? "hc" : "std"}`;
  const end = ROUTE[ROUTE.length - 1]!;

  // Seated mode: the whole augmented layer sits lower and larger, because the
  // gaze line of someone seated is lower and the phone is closer.
  const layerTransform = seated
    ? "translate(0 14) scale(1 1.08)"
    : undefined;

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Augmented route to ${destination} laid on the concourse floor, passing behind a column and bearing right. ${remaining}.`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor={p.glow}
              stopOpacity={highContrast ? "0.28" : "0.4"}
            />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>

          {/* Everything white is drawn; the columns are punched out, so the
              route disappears behind the building rather than over it. */}
          <mask id={maskId}>
            <rect x="0" y="0" width="360" height="200" fill="#fff" />
            {pillars.map((x) => (
              <rect
                key={x}
                x={x - 3}
                y={PILLAR_TOP}
                width={PILLAR_WIDTH + 6}
                height={PILLAR_FOOT - PILLAR_TOP}
                fill="#000"
              />
            ))}
          </mask>
        </defs>

        <g transform={layerTransform}>
          <ellipse cx="188" cy="140" rx="120" ry="46" fill={`url(#${glowId})`} />

          <g mask={`url(#${maskId})`}>
            {/* the painted route itself */}
            <path
              d={ribbonPath(ROUTE)}
              fill={p.ribbon}
              opacity={highContrast ? "0.55" : "0.16"}
            />
            <path
              d={ribbonPath(ROUTE)}
              fill="none"
              stroke={p.ribbonEdge}
              strokeWidth="1.2"
              opacity={highContrast ? "0.9" : "0.55"}
            />

            {ROUTE.slice(0, 6).map((node, index) => {
              const w = node.hw * 0.86;
              const t = Math.max(3.5, 14 - index * 1.8);
              const drop = Math.max(3, 15 - index * 2);
              const opacity = 1 - index * 0.11;
              return (
                <g
                  key={node.y}
                  opacity={opacity}
                  className={animate ? "aion-waypoint" : ""}
                  style={
                    animate
                      ? { animationDelay: `${index * 0.18}s` }
                      : undefined
                  }
                >
                  <ellipse
                    cx={node.x}
                    cy={node.y + drop + t + 2.5}
                    rx={w * 0.85}
                    ry={t * 0.38}
                    fill={p.under}
                    opacity="0.2"
                  />
                  <path
                    d={chevronPath(node.x, node.y + 3.5, w, t, drop)}
                    fill={p.under}
                  />
                  <path
                    d={chevronPath(node.x, node.y, w, t, drop)}
                    fill={p.face}
                  />
                  {/* lit top edge: the bevel that makes it read as solid */}
                  <path
                    d={`M${node.x - w} ${node.y + drop} L${node.x} ${node.y} L${node.x + w} ${node.y + drop}`}
                    fill="none"
                    stroke={p.edge}
                    strokeWidth="1"
                    opacity="0.9"
                  />
                </g>
              );
            })}

            {/* distance ticks, painted flat on the floor beside the route */}
            {TICKS.map((tick) => {
              const node = ROUTE[tick.node]!;
              return (
                <g key={tick.label}>
                  <line
                    x1={node.x - node.hw - 3}
                    y1={node.y}
                    x2={node.x - node.hw - 13}
                    y2={node.y}
                    stroke={p.tick}
                    strokeWidth="1.2"
                    opacity="0.75"
                  />
                  <text
                    x={node.x - node.hw - 15}
                    y={node.y + 2.5}
                    textAnchor="end"
                    fontSize="7"
                    fontWeight="700"
                    fill={p.tick}
                    opacity="0.9"
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* destination billboard, left of the route and clear of the board */}
          <path
            d={`M${112 + 30} ${86} L${end.x - 4} ${end.y + 2}`}
            stroke={p.face}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            fill="none"
            opacity="0.85"
          />
          <g>
            <rect
              x="72"
              y="54"
              width="80"
              height={serviceLine ? 32 : 24}
              rx="4"
              fill={p.billboard}
            />
            <rect
              x="72"
              y={54 + (serviceLine ? 29 : 21)}
              width="80"
              height="3"
              rx="1.5"
              fill={p.under}
            />
            <text
              x="112"
              y="65"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={p.billboardInk}
            >
              {destination}
            </text>
            <text
              x="112"
              y="73.5"
              textAnchor="middle"
              fontSize="6.5"
              fill={p.billboardInk}
              opacity="0.9"
            >
              {remaining}
            </text>
            {serviceLine ? (
              <text
                x="112"
                y="82"
                textAnchor="middle"
                fontSize="6.5"
                fontWeight="700"
                fill={p.billboardInk}
              >
                {serviceLine}
              </text>
            ) : null}
          </g>

          {/* step-free marker: at scale, the alternative is a route of its own */}
          <g>
            <rect
              x="244"
              y="120"
              width="66"
              height="20"
              rx="4"
              fill={highContrast ? "#000000" : "#FFFFFF"}
              opacity={highContrast ? "1" : "0.86"}
            />
            <rect
              x="244"
              y="120"
              width="66"
              height="20"
              rx="4"
              fill="none"
              stroke={p.face}
              strokeWidth="1.4"
            />
            <circle cx="254" cy="130" r="4.5" fill={p.face} />
            <text
              x="263"
              y="128"
              fontSize="6.5"
              fontWeight="700"
              fill={highContrast ? "#FFFFFF" : p.tick}
            >
              {liftLabel}
            </text>
            <text
              x="263"
              y="136"
              fontSize="6"
              fill={highContrast ? "#FFFFFF" : p.tick}
              opacity="0.85"
            >
              {stepFreeLabel}
            </text>
          </g>

          {/* the instruction, anchored to the near end of the route */}
          <g>
            <rect
              x="46"
              y="183"
              width="200"
              height="13"
              rx="3"
              fill={highContrast ? "#000000" : "#FFFFFF"}
              opacity={highContrast ? "1" : "0.88"}
            />
            <text
              x="52"
              y="192"
              fontSize="7.5"
              fontWeight="700"
              fill={highContrast ? "#FFD400" : "#231A45"}
            >
              {aheadLabel}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
