"use client";

/**
 * The pilot's route guidance, drawn on the floor plane rather than flat across
 * the picture. Waypoint chevrons recede toward the concourse vanishing point
 * and bend right where the real route turns, each one extruded with a darker
 * under-face so it reads as something lying in the scene at a height. A
 * standing billboard marks the destination.
 *
 * Geometry matches ConcourseSvg exactly: same 360x200 viewBox, horizon at
 * y=96, vanishing point near x=180. Nothing here is random or time-dependent —
 * the pulse is pure CSS and stops under prefers-reduced-motion.
 */

const FACE = "#5624D0";
const UNDER = "#3A1690";
const GLOW = "#9F7AF5";

interface Waypoint {
  /** Centre of the chevron on the floor. */
  cx: number;
  /** Y of the chevron tip; larger is nearer the viewer. */
  ty: number;
  /** Half-width. */
  w: number;
  /** Band thickness. */
  t: number;
  /** How far the arms hang below the tip — this is what makes it read as depth. */
  drop: number;
  opacity: number;
}

/**
 * Nearest first. The rightward drift is the route's real turn at the column.
 * The near end stops short of y=180 so the head-up display along the bottom of
 * the camera view never sits on top of it.
 */
const WAYPOINTS: Waypoint[] = [
  { cx: 148, ty: 140, w: 54, t: 13, drop: 14, opacity: 1 },
  { cx: 166, ty: 125, w: 38, t: 10, drop: 10, opacity: 0.9 },
  { cx: 181, ty: 115, w: 27, t: 7.5, drop: 7, opacity: 0.72 },
  { cx: 193, ty: 108, w: 18, t: 5.5, drop: 5, opacity: 0.55 },
  { cx: 202, ty: 103, w: 12, t: 4, drop: 3.5, opacity: 0.4 },
];

/** The billboard stands left of the route end, clear of the departure board. */
const PIN_X = 158;
const PIN_TOP = 58;
const PIN_H = 23;

/** A chevron band pointing away from the viewer, into the concourse. */
function chevronPath({ cx, ty, w, t, drop }: Waypoint) {
  return [
    `M${cx - w} ${ty + drop}`,
    `L${cx} ${ty}`,
    `L${cx + w} ${ty + drop}`,
    `L${cx + w} ${ty + drop + t}`,
    `L${cx} ${ty + t}`,
    `L${cx - w} ${ty + drop + t}`,
    "Z",
  ].join(" ");
}

export function ArrowOverlay3D({
  label,
  detail,
  animate = true,
}: {
  /** Billboard text, e.g. "Platform 7". */
  label: string;
  /** Second billboard line, e.g. "90 m". */
  detail: string;
  animate?: boolean;
}) {
  const routeEnd = WAYPOINTS[WAYPOINTS.length - 1]!;

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Route guidance overlaid on the concourse floor, bearing right: ${label}, ${detail}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="aion-wp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GLOW} stopOpacity="0.42" />
            <stop offset="100%" stopColor={GLOW} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* the light the guidance casts on the floor, so it sits in the scene */}
        <ellipse cx="170" cy="128" rx="106" ry="40" fill="url(#aion-wp-glow)" />

        {WAYPOINTS.map((point, index) => (
          <g
            key={point.ty}
            opacity={point.opacity}
            className={animate ? "aion-waypoint" : ""}
            style={
              animate ? { animationDelay: `${index * 0.22}s` } : undefined
            }
          >
            {/* contact shadow on the floor */}
            <ellipse
              cx={point.cx}
              cy={point.ty + point.drop + point.t + 3}
              rx={point.w * 0.85}
              ry={point.t * 0.4}
              fill={UNDER}
              opacity="0.18"
            />
            {/* extruded under-face, drawn first so the top face sits on it */}
            <path
              d={chevronPath({ ...point, ty: point.ty + 3.5 })}
              fill={UNDER}
            />
            <path d={chevronPath(point)} fill={FACE} />
          </g>
        ))}

        {/* destination billboard, leader line running down to the route end */}
        <path
          d={`M${PIN_X + 26} ${PIN_TOP + PIN_H} L${routeEnd.cx} ${routeEnd.ty + 2}`}
          stroke={FACE}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.8"
        />
        <ellipse
          cx={routeEnd.cx}
          cy={routeEnd.ty + routeEnd.drop + routeEnd.t + 2}
          rx="6"
          ry="2"
          fill={UNDER}
          opacity="0.35"
        />
        <g>
          <rect
            x={PIN_X - 33}
            y={PIN_TOP}
            width="66"
            height={PIN_H}
            rx="4"
            fill={FACE}
          />
          <rect
            x={PIN_X - 33}
            y={PIN_TOP + PIN_H - 3}
            width="66"
            height="3"
            rx="1.5"
            fill={UNDER}
          />
          <text
            x={PIN_X}
            y={PIN_TOP + 10}
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fill="#FFFFFF"
          >
            {label}
          </text>
          <text
            x={PIN_X}
            y={PIN_TOP + 18}
            textAnchor="middle"
            fontSize="6.5"
            fill="#FFFFFF"
            opacity="0.85"
          >
            {detail}
          </text>
        </g>
      </svg>
    </div>
  );
}
