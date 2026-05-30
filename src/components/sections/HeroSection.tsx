"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MagneticButton from "@/components/ui/MagneticButton";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import HeroVisual from "@/components/sections/HeroVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUpBlur, staggerContainer, springSoft } from "@/lib/motion";

const trustBadges = ["Official 4% Rate", "Free to Use", "Instant Results"];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-bg hero-mesh relative overflow-hidden border-b border-border/80 scroll-mt-24 pt-16 max-sm:pt-20 md:pt-20"
    >
      <FloatingOrbs />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent"
        aria-hidden
      />

      <div className="page-container relative pb-12 pt-2 max-sm:pt-5 sm:pt-3 md:pb-16 md:pt-4 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUpBlur}
              transition={springSoft}
              className="flex justify-center lg:justify-start"
            >
              <Badge
                showDot={false}
                className="border-primary/10 bg-white/90 shadow-sm ring-1 ring-primary/5"
              >
                <motion.span
                  animate={reducedMotion ? {} : { rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-flex"
                >
                  <Sparkles size={14} className="text-accent" aria-hidden />
                </motion.span>
                Official Title Deed Fee Calculator
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-4 font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[3rem]"
            >
              Calculate Your Title Deed Fees{" "}
              <span className="text-gradient-hero">Instantly</span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg"
            >
              See buyer and seller transfer fees based on the official Turkish
              rate — accurate, free, and ready in seconds.
            </motion.p>

            <motion.div
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-6 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:items-center lg:justify-start"
            >
              <MagneticButton
                type="button"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-btn to-btn-hover px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-btn/30 hover:shadow-2xl hover:shadow-btn/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Start Calculating
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </MagneticButton>
              <motion.a
                href="#how-it-works"
                className="text-center text-sm font-semibold text-secondary hover:text-primary lg:text-left"
                whileHover={{ x: 4 }}
              >
                See how it works ↓
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start"
            >
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, ...springSoft }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="inline-flex cursor-default items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-2 text-sm font-medium text-text-primary shadow-sm backdrop-blur-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-btn/10 text-xs font-bold text-btn">
                    ✓
                  </span>
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...springSoft, delay: 0.25 }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-none lg:pl-4"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
