"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  Users,
  Scale,
  Building2,
  CalendarDays,
  Globe2,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/ui/StaggerGrid";
import { infoCards } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { InfoCard, InfoCardIcon } from "@/types";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

const iconMap: Record<InfoCardIcon, LucideIcon> = {
  landmark: Landmark,
  users: Users,
  scale: Scale,
  building: Building2,
  calendar: CalendarDays,
  globe: Globe2,
};

const iconThemes: Record<
  InfoCardIcon,
  { bg: string; icon: string; ring: string; bar: string }
> = {
  landmark: {
    bg: "bg-primary/10",
    icon: "text-primary",
    ring: "ring-primary/15",
    bar: "from-primary to-secondary",
  },
  users: {
    bg: "bg-btn/10",
    icon: "text-btn",
    ring: "ring-btn/20",
    bar: "from-btn to-btn-hover",
  },
  scale: {
    bg: "bg-accent/15",
    icon: "text-[#b8860b]",
    ring: "ring-accent/25",
    bar: "from-accent to-[#e8c547]",
  },
  building: {
    bg: "bg-secondary/10",
    icon: "text-secondary",
    ring: "ring-secondary/20",
    bar: "from-secondary to-primary",
  },
  calendar: {
    bg: "bg-btn/10",
    icon: "text-btn",
    ring: "ring-btn/20",
    bar: "from-btn via-accent to-secondary",
  },
  globe: {
    bg: "bg-primary/10",
    icon: "text-primary",
    ring: "ring-primary/15",
    bar: "from-secondary via-accent to-btn",
  },
};

export default function InfoCardsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="info"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              <BookOpen size={14} className="text-btn" aria-hidden />
              Essential knowledge
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
              What You Should Know About{" "}
              <span className="text-gradient-hero">Title Deed Fees</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
              Key facts every buyer and seller should understand before your
              land registry appointment.
            </p>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>

        <StaggerGrid
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {infoCards.map((card, index) => (
            <StaggerItem key={card.title}>
              <InfoCardItem
                card={card}
                index={index}
                reducedMotion={reducedMotion}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

function InfoCardItem({
  card,
  index,
  reducedMotion,
}: {
  card: InfoCard;
  index: number;
  reducedMotion: boolean;
}) {
  const Icon = iconMap[card.iconName];
  const theme = iconThemes[card.iconName];
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm"
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -8,
              boxShadow:
                "0 24px 48px rgba(26, 60, 94, 0.14), 0 0 0 1px rgba(244, 166, 35, 0.15)",
            }
      }
      transition={springSoft}
    >
      <div
        className={cn(
          "h-1 w-full bg-gradient-to-r opacity-80 transition-opacity group-hover:opacity-100",
          theme.bar
        )}
        aria-hidden
      />

      <div className="info-card-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col items-center p-6 text-center md:items-stretch md:p-7 md:text-left">
        <div className="mb-5 flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <motion.div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-4 transition-transform",
              theme.bg,
              theme.ring,
              "group-hover:scale-105"
            )}
            whileHover={reducedMotion ? {} : { rotate: [-2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon className={cn("h-7 w-7", theme.icon)} strokeWidth={1.75} />
          </motion.div>

          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <span className="font-mono text-[11px] font-bold text-primary/20">
              {stepNum}
            </span>
            <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
              {card.tag}
            </span>
          </div>
        </div>

        <h3 className="mb-2.5 text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-primary">
          {card.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary md:text-[15px]">
          {card.description}
        </p>

        <div
          className="mt-5 flex items-center gap-2 text-xs font-semibold text-secondary opacity-0 transition-all duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <span className="shrink-0 text-btn">TapuCalc guide</span>
        </div>
      </div>
    </motion.article>
  );
}
