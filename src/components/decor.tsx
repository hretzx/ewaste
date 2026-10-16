/**
 * Decorative SVG elements: four-point sparkles, botanical line art and the
 * section divider. All are aria-hidden — purely visual.
 */
import type { CSSProperties } from "react";

type SparkleProps = {
  size?: number;
  className?: string;
  /** Twinkle animation; disabled automatically under prefers-reduced-motion. */
  twinkle?: boolean;
  delay?: 0 | 1 | 2 | 3 | 4;
  style?: CSSProperties;
};

/** Tiny four-point star ✧ */
export function Sparkle({ size = 14, className = "", twinkle = false, delay = 0, style }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      className={`pointer-events-none inline-block shrink-0 ${twinkle ? `motion-safe:animate-twinkle twinkle-delay-${delay}` : ""} ${className}`}
    >
      <path
        d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Outline variant — finer, for corners and dividers. */
export function SparkleOutline({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" className={`pointer-events-none shrink-0 ${className}`}>
      <path
        d="M12 1.5c.7 5.4 5.1 9.8 10.5 10.5-5.4.7-9.8 5.1-10.5 10.5C11.3 17.1 6.9 12.7 1.5 12 6.9 11.3 11.3 6.9 12 1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Thin divider with a tiny sparkle in the middle. */
export function SparkleDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="hairline flex-1" />
      <Sparkle size={9} className="text-coral-300" />
      <SparkleOutline size={13} className="text-terra-300" />
      <Sparkle size={9} className="text-coral-300" />
      <span className="hairline flex-1" />
    </div>
  );
}

/** A single fine-line leaf sprig. */
export function LeafSprig({ className = "", strokeWidth = 1.25 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 120 160" fill="none" className={`pointer-events-none ${className}`}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 156C58 118 62 72 82 8" />
        <path d="M61 128c-14-6-26-20-28-36 14 4 26 16 28 36Z" />
        <path d="M61 128c-6-12-16-20-28-36" opacity=".6" />
        <path d="M64 98c14-6 26-20 30-36-15 4-27 17-30 36Z" />
        <path d="M64 98c7-12 17-22 30-36" opacity=".6" />
        <path d="M66 70c-12-6-20-18-22-32 12 4 21 14 22 32Z" />
        <path d="M72 44c10-4 18-14 20-26-11 3-18 12-20 26Z" />
      </g>
    </svg>
  );
}

/** Small fern-like branch, used at section edges. */
export function Branch({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 220 60" fill="none" className={`pointer-events-none ${className}`}>
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 50C60 40 130 30 216 10" />
        {[30, 60, 90, 120, 150, 180].map((x, i) => {
          const y = 50 - (x / 216) * 40 + 0;
          return (
            <g key={x}>
              <path d={`M${x} ${y - 2}c6-10 14-16 24-18-4 10-12 16-24 18Z`} opacity={0.9 - i * 0.08} />
              <path d={`M${x + 4} ${y}c8 6 18 8 28 6-6-8-16-10-28-6Z`} opacity={0.9 - i * 0.08} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Minimal circular-economy loop icon (three arcs with arrowheads). */
export function LoopMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" fill="none" className={`pointer-events-none ${className}`}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8a24 24 0 0 1 20.8 12" />
        <path d="m53.5 13.5-.7 6.5-6.3-1.6" />
        <path d="M55.6 37a24 24 0 0 1-20.6 18.8" />
        <path d="m40 59.5-5-3.7 4-5.1" />
        <path d="M14 47A24 24 0 0 1 11 21" />
        <path d="m6.5 24.5 4.5-3.7 3.7 5.3" />
      </g>
    </svg>
  );
}
