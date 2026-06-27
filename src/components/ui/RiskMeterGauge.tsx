"use client";

import { cn } from "@/lib/cn";

export const riskSegments = [
  { color: "#2d6a9f", start: 178, end: 136, label: "Risk 1" },
  { color: "#1a3c5e", start: 134, end: 92, label: "Risk 2" },
  { color: "#f4a623", start: 90, end: 48, label: "Risk 3" },
  { color: "#e85d26", start: 46, end: 4, label: "Risk 4" },
] as const;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const largeArc = startAngle - endAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

interface RiskMeterGaugeProps {
  highlightIndex: number | null;
  onHighlight: (index: number) => void;
  onHighlightLeave: (index: number, relatedTarget: EventTarget | null) => void;
  className?: string;
}

export default function RiskMeterGauge({
  highlightIndex,
  onHighlight,
  onHighlightLeave,
  className,
}: RiskMeterGaugeProps) {
  const cx = 150;
  const cy = 148;
  const r = 98;
  const stroke = 22;
  const pivotY = cy - 8;

  const needleAngle =
    highlightIndex !== null
      ? (riskSegments[highlightIndex].start + riskSegments[highlightIndex].end) / 2
      : 91;
  const needleTip = polar(cx, pivotY, 62, needleAngle);
  const needleBaseL = polar(cx, pivotY, 10, needleAngle + 92);
  const needleBaseR = polar(cx, pivotY, 10, needleAngle - 92);

  return (
    <div className={cn("relative mx-auto w-full max-w-[28rem]", className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-secondary/15 to-accent/10 blur-3xl"
        aria-hidden
      />

      <svg
        viewBox="0 0 300 192"
        className="relative z-10 w-full drop-shadow-[0_14px_32px_rgba(26,60,94,0.1)]"
        role="img"
        aria-label="Risk seviyesi göstergesi"
      >
        <defs>
          <filter id="risk-needle-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1a3c5e" floodOpacity="0.15" />
          </filter>
        </defs>

        <path
          d={describeArc(cx, cy, r, 178, 4)}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke + 4}
          strokeLinecap="round"
        />

        {riskSegments.map((seg, i) => {
          const mid = (seg.start + seg.end) / 2;
          const arcPoint = polar(cx, cy, r, mid);
          const labelPoint = polar(cx, cy, r + 42, mid);
          const isActive = highlightIndex === i;
          const isDimmed = highlightIndex !== null && !isActive;

          return (
            <g key={seg.color}>
              <path
                d={describeArc(cx, cy, r, seg.start, seg.end)}
                fill="none"
                stroke={seg.color}
                strokeWidth={isActive ? stroke + 3 : stroke}
                strokeLinecap="round"
                opacity={isDimmed ? 0.45 : isActive ? 1 : 0.82}
                className="transition-all duration-300"
              />

              <line
                x1={arcPoint.x}
                y1={arcPoint.y}
                x2={labelPoint.x}
                y2={labelPoint.y}
                stroke={isActive ? seg.color : "rgba(26,60,94,0.16)"}
                strokeWidth={isActive ? 1.75 : 1.25}
                className="transition-all duration-300"
              />

              <g
                className="cursor-pointer"
                data-risk-node={i}
                onMouseEnter={() => onHighlight(i)}
                onMouseLeave={(e) => onHighlightLeave(i, e.relatedTarget)}
                role="button"
                tabIndex={0}
                aria-label={`${seg.label} — gösterge`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onHighlight(i);
                  }
                }}
              >
                <circle
                  cx={labelPoint.x}
                  cy={labelPoint.y}
                  r={22}
                  fill="transparent"
                />
                <circle
                  cx={labelPoint.x}
                  cy={labelPoint.y}
                  r={isActive ? 16 : 14}
                  fill={isActive ? seg.color : "#ffffff"}
                  stroke={seg.color}
                  strokeWidth={isActive ? 0 : 3}
                  className="transition-all duration-300"
                />
                <text
                  x={labelPoint.x}
                  y={labelPoint.y + 4.5}
                  textAnchor="middle"
                  fill={isActive ? "#ffffff" : seg.color}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                  className="pointer-events-none select-none transition-colors duration-300"
                >
                  {i + 1}
                </text>
              </g>
            </g>
          );
        })}

        <g className="transition-all duration-500 ease-out">
          <polygon
            points={`${needleTip.x},${needleTip.y} ${needleBaseL.x},${needleBaseL.y} ${needleBaseR.x},${needleBaseR.y}`}
            fill="#ffffff"
            stroke="#1a3c5e"
            strokeWidth="1.75"
            filter="url(#risk-needle-shadow)"
          />
        </g>

        <circle
          cx={cx}
          cy={pivotY}
          r="19"
          fill="#ffffff"
          stroke="#1a3c5e"
          strokeWidth="2.5"
        />
        <path
          d={`M ${cx} ${pivotY - 8} L ${cx + 6} ${pivotY + 5} L ${cx - 6} ${pivotY + 5} Z`}
          fill="#e85d26"
        />
      </svg>

      <p className="mt-2 text-center text-xs font-medium tracking-wide text-text-secondary">
        Göstergeye tıklayın veya risk kartının üzerine gelin
      </p>
    </div>
  );
}

export const riskSegmentBorderL = [
  "border-l-secondary",
  "border-l-primary",
  "border-l-accent",
  "border-l-btn",
] as const;

export const riskSegmentBg = [
  "bg-secondary/15",
  "bg-primary/10",
  "bg-accent/15",
  "bg-btn/10",
] as const;

export const riskSegmentText = [
  "text-secondary",
  "text-primary",
  "text-accent",
  "text-btn",
] as const;

export const riskSegmentRing = [
  "ring-secondary/20",
  "ring-primary/15",
  "ring-accent/25",
  "ring-btn/20",
] as const;

export const riskSegmentFill = [
  "bg-secondary text-white border-secondary",
  "bg-primary text-white border-primary",
  "bg-accent text-white border-accent",
  "bg-btn text-white border-btn",
] as const;

export const riskCardActive = [
  "border-secondary bg-secondary/[0.06] shadow-[0_10px_28px_rgba(45,106,159,0.16)] ring-2 ring-secondary/20",
  "border-primary bg-primary/[0.05] shadow-[0_10px_28px_rgba(26,60,94,0.14)] ring-2 ring-primary/15",
  "border-accent bg-accent/[0.08] shadow-[0_10px_28px_rgba(244,166,35,0.2)] ring-2 ring-accent/25",
  "border-btn bg-btn/[0.06] shadow-[0_10px_28px_rgba(232,93,38,0.18)] ring-2 ring-btn/20",
] as const;
