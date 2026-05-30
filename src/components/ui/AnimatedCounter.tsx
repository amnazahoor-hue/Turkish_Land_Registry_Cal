"use client";

import { useEffect, useState } from "react";
import { formatTRY, getAmountSizeClass } from "@/lib/formatters";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  highlight?: boolean;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function AnimatedCounter({
  value,
  duration = 1400,
  className,
  highlight = false,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(value * easeOutQuart(progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    setDisplayValue(0);
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration, reducedMotion]);

  return (
    <span
      className={cn(
        "block w-full max-w-full break-all font-mono leading-tight",
        getAmountSizeClass(value, highlight),
        className
      )}
    >
      {formatTRY(displayValue)}
    </span>
  );
}
