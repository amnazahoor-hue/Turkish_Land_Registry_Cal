"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Home,
  Calculator,
  BarChart3,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { howItWorksSteps } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { HowItWorksStep } from "@/types";
import { springBouncy, springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

const iconMap: Record<HowItWorksStep["iconName"], LucideIcon> = {
  home: Home,
  calculator: Calculator,
  chart: BarChart3,
  check: CheckCircle2,
};

export default function HowItWorksSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="how-it-works-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="how-it-works-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-btn/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
              <Sparkles size={14} aria-hidden />
              Simple process
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
              How It Works
            </h2>
            <p className="mt-3 text-base leading-relaxed text-blue-100/90 md:text-lg">
              Calculate your title deed fees in four clear steps — fast, free, and
              based on the official rate.
            </p>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>

        <div ref={timelineRef} className="relative">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden lg:block"
            aria-hidden
          >
            <motion.div
              className="h-px origin-left bg-gradient-to-r from-white/0 via-accent/70 to-white/0"
              initial={{ scaleX: 0 }}
              animate={
                timelineInView && !reducedMotion ? { scaleX: 1 } : { scaleX: 1 }
              }
              transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
            {howItWorksSteps.map((step, index) => {
              const Icon = iconMap[step.iconName];
              const isLast = index === howItWorksSteps.length - 1;

              return (
                <ScrollReveal key={step.number} delay={index * 0.1}>
                  <li className="relative h-full list-none">
                    {index < howItWorksSteps.length - 1 && (
                      <span
                        className="absolute -right-3 top-11 z-20 hidden text-accent/50 lg:block lg:-right-2"
                        aria-hidden
                      >
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.15 }}
                        >
                          →
                        </motion.span>
                      </span>
                    )}

                    <motion.article
                      className={cn(
                        "group relative flex h-full flex-col rounded-2xl border p-6 transition-colors md:p-7",
                        isLast
                          ? "border-accent/40 bg-gradient-to-b from-white/16 to-white/8 shadow-lg shadow-black/20 ring-1 ring-accent/25"
                          : "border-white/10 bg-gradient-to-b from-white/12 to-white/[0.04] hover:border-white/20 hover:from-white/14"
                      )}
                      whileHover={
                        reducedMotion
                          ? {}
                          : {
                              y: -6,
                              boxShadow: isLast
                                ? "0 24px 48px rgba(0,0,0,0.28)"
                                : "0 20px 40px rgba(0,0,0,0.18)",
                            }
                      }
                      transition={springSoft}
                    >
                      <div className="relative z-10 flex flex-col items-center text-center lg:items-stretch lg:text-left">
                        <div className="relative mb-5 flex w-full justify-center lg:justify-start">
                          <motion.div
                            className="relative"
                            initial={{ scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ ...springBouncy, delay: index * 0.08 }}
                          >
                            <span
                              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/40 to-btn/30 opacity-60 blur-md transition-opacity group-hover:opacity-90"
                              aria-hidden
                            />
                            <div
                              className={cn(
                                "relative flex h-14 w-14 items-center justify-center rounded-2xl border shadow-inner",
                                isLast
                                  ? "border-accent/50 bg-gradient-to-br from-accent/25 to-btn/20"
                                  : "border-white/20 bg-white/10"
                              )}
                            >
                              <Icon
                                className={cn(
                                  "shrink-0",
                                  isLast ? "text-accent" : "text-btn"
                                )}
                                size={28}
                                strokeWidth={1.75}
                                aria-hidden
                              />
                            </div>
                            <span
                              className={cn(
                                "absolute -right-2 -top-2 flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg px-1.5 font-mono text-[11px] font-bold shadow-md",
                                isLast
                                  ? "bg-accent text-primary"
                                  : "border border-white/15 bg-primary text-accent"
                              )}
                            >
                              {step.number}
                            </span>
                          </motion.div>

                        </div>

                        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">
                          {step.description}
                        </p>

                        {isLast && (
                          <span className="mt-4 inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent lg:self-start">
                            <CheckCircle2 size={14} aria-hidden />
                            Ready to plan
                          </span>
                        )}
                      </div>
                    </motion.article>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>

        <ScrollReveal delay={0.35}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-white/50">
            No sign-up required · Results update instantly as you type
          </p>
        </ScrollReveal>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
