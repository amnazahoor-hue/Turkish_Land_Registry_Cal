export const easeSmooth = [0.25, 0.1, 0.25, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 90,
  damping: 18,
  mass: 0.8,
};

export const springBouncy = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

export const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(10px)",
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 48, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const staggerContainer = (delay = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});
