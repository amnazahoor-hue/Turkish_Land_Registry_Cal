"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FloatingOrbs() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orb1X = useMotionTemplate`calc(${springX}px * 0.04 - 20px)`;
  const orb1Y = useMotionTemplate`calc(${springY}px * 0.04 - 10px)`;
  const orb2X = useMotionTemplate`calc(${springX}px * -0.03 + 30px)`;
  const orb2Y = useMotionTemplate`calc(${springY}px * -0.03 + 20px)`;

  if (reducedMotion) return null;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      onMouseMove={handleMove}
      aria-hidden
    >
      <motion.div
        className="hero-blob absolute -left-20 top-20 h-72 w-72 rounded-full bg-secondary/25"
        style={{ x: orb1X, y: orb1Y }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-blob absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-accent/20"
        style={{ x: orb2X, y: orb2Y }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="hero-blob absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-btn/15"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
