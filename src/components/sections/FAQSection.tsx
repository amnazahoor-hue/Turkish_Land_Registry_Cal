"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Receipt,
  Users,
  Calculator,
  Scale,
  Files,
  Globe2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import FAQSidebarVisual from "@/components/sections/FAQSidebarVisual";
import { faqs } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { FAQIcon, FAQItem } from "@/types";
import { cn } from "@/lib/cn";

const iconMap: Record<FAQIcon, LucideIcon> = {
  receipt: Receipt,
  users: Users,
  calculator: Calculator,
  scale: Scale,
  files: Files,
  globe: Globe2,
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="faq-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              <HelpCircle size={14} className="text-btn" aria-hidden />
              Got questions?
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
              Frequently Asked{" "}
              <span className="text-gradient-hero">Questions</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
              Clear answers about Turkish title deed fees, payments, and the
              transfer process.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal className="mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0 lg:max-w-none">
            <aside className="text-center lg:sticky lg:top-28 lg:text-left">
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg saas-card-glow">
                <div className="relative aspect-[10/11] min-h-[280px] w-full bg-gradient-to-br from-surface to-white p-3 sm:min-h-[320px]">
                  <FAQSidebarVisual />
                </div>
                <div className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 p-5">
                  <p className="text-sm font-semibold text-primary">
                    Official 4% transfer fee
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    2% buyer + 2% seller — fixed by law, paid before your Tapu
                    appointment.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                    <span className="rounded-lg bg-btn/10 px-2.5 py-1 text-xs font-bold text-btn">
                      Buyer 2%
                    </span>
                    <span className="rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">
                      Seller 2%
                    </span>
                  </div>
                </div>
              </div>

              <MagneticButton
                type="button"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-btn to-btn-hover px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-btn/25"
              >
                Try the calculator
                <ArrowRight size={18} aria-hidden />
              </MagneticButton>
            </aside>
          </ScrollReveal>

          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={faq.q}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
  reducedMotion,
}: {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const Icon = iconMap[faq.iconName];

  return (
    <ScrollReveal delay={index * 0.05}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300",
          isOpen
            ? "border-accent/40 shadow-md ring-1 ring-accent/20"
            : "border-border hover:border-primary/15 hover:shadow-md"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="grid w-full grid-cols-[2.75rem_1fr_2.75rem] items-center gap-x-3 px-4 py-4 text-left sm:gap-x-4 sm:px-5 sm:py-5"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center justify-self-center rounded-xl transition-colors",
              isOpen ? "bg-accent/15 text-[#b8860b]" : "bg-surface text-secondary"
            )}
          >
            <Icon size={22} strokeWidth={1.75} aria-hidden />
          </span>

          <span className="min-w-0 self-center text-sm font-semibold leading-snug text-text-primary sm:text-base md:text-lg">
            {faq.q}
          </span>

          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center justify-self-center rounded-full transition-colors",
              isOpen ? "bg-btn text-white" : "bg-surface text-btn"
            )}
          >
            <ChevronDown
              size={20}
              className={cn("transition-transform duration-300", isOpen && "rotate-180")}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/60 bg-gradient-to-b from-orange-50/40 to-white px-4 pb-5 pt-4 sm:px-5">
                <p className="text-center text-[15px] leading-relaxed text-text-secondary lg:text-left">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}
