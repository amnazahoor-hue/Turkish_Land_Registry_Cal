"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUpBlur, springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px", amount: 0.2 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    direction === "left"
      ? { ...fadeUpBlur.hidden, x: -40, y: 0 }
      : direction === "right"
        ? { ...fadeUpBlur.hidden, x: 40, y: 0 }
        : fadeUpBlur.hidden;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={hidden}
      animate={isInView ? fadeUpBlur.visible : hidden}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
