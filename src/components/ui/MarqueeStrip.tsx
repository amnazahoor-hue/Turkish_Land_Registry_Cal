"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const items = [
  "Official 4% Rate",
  "Buyer 2%",
  "Seller 2%",
  "Free Calculator",
  "Instant Results",
  "Turkey Property",
  "Title Deed Fees",
  "TapuCalc",
];

export default function MarqueeStrip() {
  const reducedMotion = useReducedMotion();
  const doubled = [...items, ...items];

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-4 border-y border-border/60 bg-white/50 py-4">
        {items.map((item) => (
          <span
            key={item}
            className="text-sm font-medium text-text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-white/60 py-4 backdrop-blur-sm">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap px-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/90 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/90 to-transparent"
        aria-hidden
      />
    </div>
  );
}
