"use client";

import { useId } from "react";
import { UX_PROCESS_STEPS } from "@/content/uxProcess";

/**
 * Segment fills run light to dark from left to right: the process deepens as
 * it runs. The numbered circles stay on brand purple so the white numerals
 * keep their contrast no matter which step they sit on.
 */
const SEGMENT_FILLS = [
  "#B3A0F0",
  "#A18BEA",
  "#8F76E4",
  "#7D61DE",
  "#6B4CD8",
  "#5937D2",
  "#4322A8",
];

const CIRCLE_FILL = "#5624D0";

// Geometry. Everything is derived from these so the seven steps stay evenly
// spaced without measuring anything at runtime.
const BAR_X = 59;
const BAR_Y = 146;
const BAR_H = 44;
const SEG_W = 126;
const CIRCLE_R = 38;
const CY_ABOVE = 58;
const CY_BELOW = 278;
const LINE_H = 19;

/** Odd steps hang their circle above the bar, even steps below it. */
function isAbove(index: number) {
  return index % 2 === 0;
}

export function UxProcessDiagram() {
  const titleId = useId();
  const descId = useId();
  // useId can contain characters that are awkward inside url(#...), so the
  // clip path reference is built from a stripped copy.
  const clipId = `ux-process-bar-${titleId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className="overflow-x-auto">
      <svg
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        viewBox="0 0 1000 336"
        className="h-auto w-full min-w-[720px]"
      >
        <title id={titleId}>The seven-step UX design process</title>
        <desc id={descId}>
          A horizontal bar divided into seven coloured segments, one per step,
          running from Problem and Product Definition on the left to Handover on
          the right. Each segment carries a numbered circle, above the bar for
          odd steps and below it for even steps. The same seven steps are listed
          in full underneath the diagram.
        </desc>

        <defs>
          <clipPath id={clipId}>
            <rect
              x={BAR_X}
              y={BAR_Y}
              width={SEG_W * UX_PROCESS_STEPS.length}
              height={BAR_H}
              rx={BAR_H / 2}
            />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {UX_PROCESS_STEPS.map((entry, index) => (
            <rect
              key={entry.step}
              x={BAR_X + SEG_W * index}
              y={BAR_Y}
              width={SEG_W}
              height={BAR_H}
              fill={SEGMENT_FILLS[index]}
            />
          ))}
        </g>

        {UX_PROCESS_STEPS.map((entry, index) => {
          const cx = BAR_X + SEG_W * index + SEG_W / 2;
          const above = isAbove(index);
          const cy = above ? CY_ABOVE : CY_BELOW;
          const numeral = entry.step < 10 ? `0${entry.step}` : `${entry.step}`;

          // The eyebrow sits nearest the bar; the name stacks away from it.
          const eyebrowY = above ? 214 : 126;
          const nameY = (line: number) =>
            above
              ? 236 + LINE_H * line
              : 104 - LINE_H * (entry.lines.length - 1 - line);

          return (
            <g key={entry.step}>
              <line
                x1={cx}
                x2={cx}
                y1={above ? cy + CIRCLE_R : BAR_Y + BAR_H}
                y2={above ? BAR_Y : cy - CIRCLE_R}
                stroke="#B8AFD8"
                strokeWidth={1.5}
                strokeDasharray="3 4"
              />

              <circle cx={cx} cy={cy} r={CIRCLE_R} fill={CIRCLE_FILL} />
              <text
                x={cx}
                y={cy}
                dy="0.35em"
                textAnchor="middle"
                fontSize={24}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {numeral}
              </text>

              <text
                x={cx}
                y={eyebrowY}
                textAnchor="middle"
                fontSize={11}
                letterSpacing="0.08em"
                fill="#6B6785"
              >
                {`STEP ${numeral}`}
              </text>

              {entry.lines.map((line, lineIndex) => (
                <text
                  key={line}
                  x={cx}
                  y={nameY(lineIndex)}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={700}
                  fill="#231A45"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
