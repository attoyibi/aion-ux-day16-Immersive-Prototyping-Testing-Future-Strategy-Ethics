"use client";

/**
 * The same screen — CityPass AR's destination select — drawn four times, once
 * per rung of the fidelity ladder. Keeping the screen constant is deliberate:
 * it makes fidelity the only variable, the same device the Ladder tab uses for
 * maturity. Every sample is hand-drawn vector work, so the app still makes no
 * network request and still renders identically for every learner.
 */

const SKETCH = "#9A93BC";
const HAIRLINE = "#E4E1EE";
const MUTED = "#6B6785";
const NAVY = "#231A45";
const PURPLE = "#5624D0";
const LILAC = "#EEE9F9";

const DESTINATIONS = ["Platform 7", "Platform 3", "Exit North", "Taxi Rank"];

/** Rung 1 — pen on paper: wobbly, overshooting, more than one version. */
function SampleSketch() {
  return (
    <>
      {/* the version that was drawn first and kept, faintly, behind */}
      <rect
        x="18"
        y="14"
        width="96"
        height="176"
        rx="7"
        fill="none"
        stroke={SKETCH}
        strokeWidth="1"
        opacity="0.4"
        transform="rotate(2.5 66 102)"
      />

      <g transform="rotate(-1.2 60 100)" stroke={SKETCH} strokeLinecap="round">
        <rect
          x="8"
          y="8"
          width="100"
          height="182"
          rx="8"
          fill="#fff"
          strokeWidth="1.6"
        />
        {/* corners overshoot, the way a hand-drawn box always does */}
        <path d="M8 18 L8 4 M100 8 L112 8" strokeWidth="1.2" fill="none" />

        {/* title, scribbled rather than written */}
        <path
          d="M20 30 C 34 27, 52 32, 70 28"
          strokeWidth="1.8"
          fill="none"
        />
        <path d="M20 38 C 30 36, 42 39, 54 37" strokeWidth="1.2" fill="none" />

        {[56, 88, 120].map((y, index) => (
          <rect
            key={y}
            x="18"
            y={y}
            width="80"
            height="24"
            rx="2"
            fill="none"
            strokeWidth="1.5"
            transform={`rotate(${index === 1 ? 0.9 : -0.7} 58 ${y + 12})`}
          />
        ))}

        {/* the third option, crossed out — this rung is for discarding */}
        <path
          d="M22 124 L94 140 M94 124 L22 140"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />

        <rect
          x="26"
          y="158"
          width="64"
          height="18"
          rx="3"
          fill="none"
          strokeWidth="1.5"
          transform="rotate(0.8 58 167)"
        />
      </g>
    </>
  );
}

/** Rung 2 — lo-fi: straight, dashed, no type scale, no words at all. */
function SampleLow() {
  return (
    <g stroke={SKETCH} fill="none">
      <rect
        x="8"
        y="6"
        width="104"
        height="188"
        rx="10"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <line
        x1="48"
        y1="16"
        x2="72"
        y2="16"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      <line
        x1="20"
        y1="32"
        x2="60"
        y2="32"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <line
        x1="20"
        y1="46"
        x2="92"
        y2="46"
        strokeWidth="3"
        strokeDasharray="6 4"
      />
      {[62, 88, 114, 140].map((y) => (
        <g key={y}>
          <rect
            x="18"
            y={y}
            width="84"
            height="20"
            rx="3"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <line
            x1="25"
            y1={y + 10}
            x2="70"
            y2={y + 10}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </g>
      ))}
      <rect
        x="18"
        y="168"
        width="84"
        height="16"
        rx="3"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="26"
        y1="176"
        x2="58"
        y2="176"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
    </g>
  );
}

/** Rung 3 — mid-fi: real words, real hierarchy, still no colour. */
function SampleMid() {
  return (
    <>
      <rect
        x="8"
        y="6"
        width="104"
        height="188"
        rx="10"
        fill="#fff"
        stroke={HAIRLINE}
        strokeWidth="1.5"
      />
      <rect x="8" y="6" width="104" height="16" rx="10" fill="#F4F2F9" />
      <text x="16" y="17" fontSize="6" fill={MUTED}>
        09:41
      </text>

      <text x="16" y="38" fontSize="8" fontWeight="700" fill={NAVY}>
        Where to?
      </text>
      <text x="16" y="48" fontSize="6" fill={MUTED}>
        Central Interchange
      </text>

      {DESTINATIONS.map((name, index) => {
        const y = 58 + index * 24;
        return (
          <g key={name}>
            <rect
              x="14"
              y={y}
              width="92"
              height="20"
              rx="3"
              fill="#F4F2F9"
              stroke={HAIRLINE}
              strokeWidth="1"
            />
            <text x="20" y={y + 9} fontSize="6.5" fill={NAVY}>
              {name}
            </text>
            <text x="20" y={y + 16} fontSize="5" fill={MUTED}>
              {index === 0 ? "2 min · step-free" : "4 min · stairs"}
            </text>
          </g>
        );
      })}

      {/* the awkward state, which is where mid fidelity starts earning its keep */}
      <text x="14" y="168" fontSize="5" fill={MUTED}>
        Nothing else nearby
      </text>

      <rect
        x="14"
        y="174"
        width="92"
        height="14"
        rx="3"
        fill="#DEDAEA"
        stroke={HAIRLINE}
        strokeWidth="1"
      />
      <text x="60" y="183.5" fontSize="6" fill={NAVY} textAnchor="middle">
        Show my route
      </text>
    </>
  );
}

/** Rung 4 — hi-fi: the finished surface, colour, states, brand. */
function SampleHigh() {
  return (
    <>
      <rect
        x="8"
        y="6"
        width="104"
        height="188"
        rx="10"
        fill="#fff"
        stroke={HAIRLINE}
        strokeWidth="1.5"
      />
      <path
        d="M8 16 A10 10 0 0 1 18 6 H102 A10 10 0 0 1 112 16 V30 H8 Z"
        fill={PURPLE}
      />
      <text x="16" y="15" fontSize="5.5" fill="#FFFFFF" opacity="0.8">
        09:41
      </text>
      <text x="16" y="26" fontSize="8" fontWeight="700" fill="#FFFFFF">
        Where to?
      </text>

      <text x="14" y="42" fontSize="5.5" fill={MUTED}>
        CENTRAL INTERCHANGE
      </text>

      {DESTINATIONS.map((name, index) => {
        const y = 48 + index * 24;
        const selected = index === 0;
        return (
          <g key={name}>
            <rect
              x="14"
              y={y}
              width="92"
              height="20"
              rx="4"
              fill={selected ? LILAC : "#fff"}
              stroke={selected ? PURPLE : HAIRLINE}
              strokeWidth={selected ? 1.4 : 1}
            />
            <circle cx="22" cy={y + 10} r="3.4" fill={selected ? PURPLE : LILAC} />
            <text x="30" y={y + 9} fontSize="6.5" fontWeight="700" fill={NAVY}>
              {name}
            </text>
            <text x="30" y={y + 16} fontSize="5" fill={MUTED}>
              {index === 0 ? "2 min · step-free" : "4 min · stairs"}
            </text>
          </g>
        );
      })}

      <text x="14" y="158" fontSize="5" fill={MUTED}>
        Live from the timetable feed
      </text>

      <rect x="14" y="164" width="92" height="18" rx="5" fill={PURPLE} />
      <text
        x="60"
        y="175.5"
        fontSize="6.5"
        fontWeight="700"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        Show my route
      </text>
      <text x="60" y="190" fontSize="5" fill={MUTED} textAnchor="middle">
        Or follow the printed signs
      </text>
    </>
  );
}

const SAMPLES: Record<
  string,
  { Art: () => React.JSX.Element; label: string }
> = {
  sketch: {
    Art: SampleSketch,
    label:
      "Paper sketch of the destination screen: wobbly hand-drawn boxes, one option crossed out, a second version showing behind it.",
  },
  low: {
    Art: SampleLow,
    label:
      "Low-fidelity wireframe of the same screen: dashed boxes and placeholder lines, no words and no colour.",
  },
  mid: {
    Art: SampleMid,
    label:
      "Mid-fidelity wireframe of the same screen: real destination names and walking times in a correct type hierarchy, entirely greyscale.",
  },
  high: {
    Art: SampleHigh,
    label:
      "High-fidelity design of the same screen: brand colour, a selected row, a filled primary button and the printed-signage alternative.",
  },
};

export function FidelitySample({ id }: { id: string }) {
  const sample = SAMPLES[id];
  if (!sample) return null;
  const { Art, label } = sample;

  return (
    <svg
      viewBox="0 0 120 200"
      width="144"
      height="240"
      role="img"
      aria-label={label}
      className="shrink-0"
    >
      <Art />
    </svg>
  );
}
