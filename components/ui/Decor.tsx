import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Closed SVG path of a circle with scalloped (pinked) edges. */
function scallopPath(cx: number, cy: number, r: number, bumps: number, depth: number) {
  const step = (Math.PI * 2) / bumps;
  let d = "";
  for (let i = 0; i < bumps; i++) {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const am = a0 + step / 2;
    const qx = cx + (r + depth * 2) * Math.cos(am);
    const qy = cy + (r + depth * 2) * Math.sin(am);
    d += `${i === 0 ? `M${x0.toFixed(2)},${y0.toFixed(2)}` : ""} Q${qx.toFixed(2)},${qy.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
  }
  return `${d} Z`;
}

const SCALLOP = scallopPath(100, 100, 88, 28, 5);

/** Round pinked-edge stamp with a stitched inner ring. */
export function ScallopBadge({
  children,
  className,
  fill = "var(--color-espresso)",
  stitch = "rgb(251 243 228 / 0.55)",
}: {
  children?: ReactNode;
  className?: string;
  fill?: string;
  stitch?: string;
}) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full drop-shadow-[0_4px_6px_rgb(90_42_32/0.35)]" aria-hidden="true">
        <path d={SCALLOP} fill={fill} />
        <circle cx="100" cy="100" r="74" fill="none" stroke={stitch} strokeWidth="3" strokeDasharray="7 6" />
      </svg>
      <span className="relative flex flex-col items-center justify-center text-center">{children}</span>
    </span>
  );
}

/** Fabric ribbon banner with folded tails and dashed stitching. */
export function Ribbon({
  children,
  className,
  tilt = 0,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  tone?: "cream" | "pink";
}) {
  const band = tone === "cream" ? "#fbf3e4" : "#eab4a6";
  const tail = tone === "cream" ? "#e3cdb2" : "#c98a7b";

  return (
    <div className={cn("relative mx-auto w-full", className)} style={{ transform: `rotate(${tilt}deg)` }}>
      <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="absolute inset-0 size-full drop-shadow-[0_6px_8px_rgb(90_42_32/0.3)]" aria-hidden="true">
        <path d="M0 34 L70 34 L70 108 L0 108 L22 71 Z" fill={tail} />
        <path d="M600 34 L530 34 L530 108 L600 108 L578 71 Z" fill={tail} />
        <path d="M50 108 L70 122 L70 108 Z" fill="#5a2a20" opacity="0.35" />
        <path d="M550 108 L530 122 L530 108 Z" fill="#5a2a20" opacity="0.35" />
        <path d="M50 14 Q300 -6 550 14 L550 108 Q300 88 50 108 Z" fill={band} />
        <path
          d="M60 24 Q300 4 540 24 M60 98 Q300 78 540 98"
          fill="none"
          stroke="#5a2a20"
          strokeOpacity="0.45"
          strokeWidth="2.5"
          strokeDasharray="9 7"
        />
      </svg>
      <div className="relative flex min-h-[3.75rem] items-center justify-center px-[13%] py-3 text-center sm:min-h-[5.5rem]">
        {children}
      </div>
    </div>
  );
}

/** Hand-drawn style rays radiating from the centre. */
export function Sunburst({ className, color = "var(--color-terracotta)" }: { className?: string; color?: string }) {
  const rays = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * 360;
    const long = i % 2 === 0;
    return (
      <line
        key={i}
        x1="200"
        y1={long ? 34 : 58}
        x2="200"
        y2={long ? 88 : 96}
        stroke={color}
        strokeWidth={long ? 6 : 4}
        strokeLinecap="round"
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      {rays}
      {[
        [80, 120],
        [320, 90],
        [350, 270],
        [60, 300],
        [200, 30],
        [130, 360],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={color} />
      ))}
    </svg>
  );
}

/** Row of half-circles used as a pinked fabric edge between sections. */
export function ScallopEdge({
  color,
  flip = false,
  className,
}: {
  color: string;
  flip?: boolean;
  className?: string;
}) {
  const style: CSSProperties = {
    backgroundImage: `radial-gradient(circle at 18px ${flip ? "0" : "18px"}, ${color} 17px, transparent 18px)`,
    backgroundSize: "36px 18px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: flip ? "top" : "bottom",
  };
  return <div aria-hidden="true" className={cn("h-[18px] w-full", className)} style={style} />;
}

/** Dashed stitch line divider. */
export function StitchLine({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-0 border-t-[3px] border-dashed border-espresso/30", className)} />;
}
