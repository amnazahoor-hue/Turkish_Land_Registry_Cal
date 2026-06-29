"use client";

import {
  Receipt,
  Landmark,
  FileText,
  Stamp,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const extraCosts: {
  title: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  text: string;
  headerGradient: string;
  sidebarGradient: string;
  footerGradient: string;
  glowClass: string;
  ringClass: string;
  badgeBorder: string;
}[] = [
  {
    title: "Döner sermaye fonu",
    description:
      "Tapu sicil müdürlüğü tarafından alınan küçük bir hizmet bedeli. Döner sermaye bedeli ile ek hizmet bedeli toplamı 2026 için baz olarak yaklaşık 2.534 TL'dir; ancak büyükşehirlerde il katsayısı nedeniyle bu tutar daha yüksek olabilir (yaklaşık 5.000–6.700 TL). Her yıl güncellenir.",
    icon: Landmark,
    bg: "bg-secondary",
    text: "text-secondary",
    headerGradient: "from-secondary via-[#245d8a] to-primary",
    sidebarGradient: "from-secondary/12 to-primary/[0.06]",
    footerGradient: "from-secondary to-primary",
    glowClass: "bg-secondary/25",
    ringClass: "ring-secondary/15",
    badgeBorder: "border-secondary/25",
  },
  {
    title: "Değerleme raporu",
    description: "Banka arazileri için gereklidir ve ayrı olarak ödenir.",
    icon: FileText,
    bg: "bg-primary",
    text: "text-primary",
    headerGradient: "from-primary via-[#1e4568] to-secondary",
    sidebarGradient: "from-primary/[0.08] to-secondary/[0.05]",
    footerGradient: "from-primary to-secondary",
    glowClass: "bg-primary/20",
    ringClass: "ring-primary/15",
    badgeBorder: "border-primary/25",
  },
  {
    title: "Noter ücreti",
    description: "Vekaletname gibi bir belge için ödenen ücret.",
    icon: Stamp,
    bg: "bg-btn",
    text: "text-btn",
    headerGradient: "from-btn via-[#d95524] to-accent",
    sidebarGradient: "from-btn/[0.08] to-accent/[0.06]",
    footerGradient: "from-btn to-accent",
    glowClass: "bg-btn/20",
    ringClass: "ring-btn/15",
    badgeBorder: "border-btn/25",
  },
  {
    title: "Banka ücreti",
    description: "Bankanız işlemler için ücret alabilir.",
    icon: CreditCard,
    bg: "bg-accent",
    text: "text-accent",
    headerGradient: "from-accent via-[#e09520] to-btn",
    sidebarGradient: "from-accent/[0.1] to-btn/[0.05]",
    footerGradient: "from-accent to-btn",
    glowClass: "bg-accent/25",
    ringClass: "ring-accent/20",
    badgeBorder: "border-accent/30",
  },
];

function FeaturedCostCard({
  cost,
}: {
  cost: (typeof extraCosts)[number];
}) {
  const Icon = cost.icon;

  return (
    <article className="group relative">
      <div
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          cost.glowClass
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border/50 bg-white shadow-[0_10px_36px_rgba(26,60,94,0.1)] ring-1 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_44px_rgba(26,60,94,0.14)]",
          cost.ringClass
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-start">
          <div
            className={cn(
              "relative flex shrink-0 flex-row items-center gap-4 overflow-hidden bg-gradient-to-br px-5 py-4 sm:w-[8rem] sm:flex-col sm:items-center sm:justify-center sm:gap-3 sm:px-4 sm:py-5",
              cost.headerGradient
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, white 0%, transparent 50%)",
              }}
              aria-hidden
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <Icon size={22} strokeWidth={1.65} aria-hidden />
            </span>
            <span
              className="relative ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 font-mono text-[10px] font-bold text-white/90 sm:ml-0"
              aria-hidden
            >
              01
            </span>
          </div>

          <div className="min-w-0 flex-1 border-t border-border/50 px-5 py-5 sm:border-l-[4px] sm:border-t-0 sm:border-l-secondary sm:px-6 sm:py-6">
            <h3
              className={cn(
                "heading-card sm:text-xl",
                cost.text
              )}
            >
              {cost.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[0.9375rem]">
              {cost.description}
            </p>
          </div>
        </div>

        <div
          className={cn("h-1 w-full bg-gradient-to-r", cost.footerGradient)}
          aria-hidden
        />
      </div>
    </article>
  );
}

function CompactCostCard({
  cost,
  index,
}: {
  cost: (typeof extraCosts)[number];
  index: number;
}) {
  const Icon = cost.icon;

  return (
    <article className="group relative">
      <div
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-[1.5rem] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100",
          cost.glowClass
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-[0_6px_24px_rgba(26,60,94,0.07)] ring-1 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_36px_rgba(26,60,94,0.12)]",
          cost.ringClass
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br px-5 pb-8 pt-5",
            cost.sidebarGradient
          )}
        >
          <Icon
            className={cn(
              "pointer-events-none absolute -right-2 -top-1 h-16 w-16 opacity-[0.07]",
              cost.text
            )}
            strokeWidth={1.25}
            aria-hidden
          />

          <div className="relative flex items-start justify-between gap-3">
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md",
                cost.bg
              )}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden />
            </span>
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white/90 font-mono text-[10px] font-bold shadow-sm",
                cost.text,
                cost.badgeBorder
              )}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative -mt-4 flex flex-col rounded-t-2xl border-t border-border/40 bg-white px-5 pb-5 pt-4">
          <h3
            className={cn(
              "heading-card",
              cost.text
            )}
          >
            {cost.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {cost.description}
          </p>
        </div>

        <div
          className={cn("h-1 w-full bg-gradient-to-r", cost.footerGradient)}
          aria-hidden
        />
      </div>
    </article>
  );
}

function ExtraCostsPanel() {
  const [featured, ...rest] = extraCosts;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_20px_56px_rgba(0,0,0,0.2)]">
      <div
        className="h-1.5 w-full bg-gradient-to-r from-secondary via-accent to-btn"
        aria-hidden
      />

      <div className="relative px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/[0.04] to-transparent"
          aria-hidden
        />

        <div className="relative mb-6 flex flex-col items-center gap-3 sm:mb-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/45">
            Ek maliyet türleri
          </p>
          <div className="flex items-center gap-2" aria-hidden>
            {[1, 2, 3, 4].map((step) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full font-mono text-[9px] font-bold text-white shadow-sm",
                    step === 1
                      ? "bg-secondary"
                      : step === 2
                        ? "bg-primary"
                        : step === 3
                          ? "bg-btn"
                          : "bg-accent"
                  )}
                >
                  {String(step).padStart(2, "0")}
                </span>
                {step < 4 ? (
                  <span className="hidden h-px w-6 bg-gradient-to-r from-border to-border/40 sm:block lg:w-10" />
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="relative space-y-5 lg:space-y-6">
          <FeaturedCostCard cost={featured} />

          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3 sm:gap-5">
            {rest.map((cost, i) => (
              <CompactCostCard key={cost.title} cost={cost} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExtraCostsSection() {
  return (
    <section
      id="extra-costs"
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

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
              <Receipt size={14} aria-hidden />
              Ek masraflar
            </span>
            <h2 className="mt-5 heading-h2-light">
              Mülk Transferinde Ek Maliyetler
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-blue-100/90 md:text-lg">
              Tapu devir ücreti ana masraftır, ancak duruma bağlı olarak bazen
              ek ücretler de ödemeniz gerekebilir, örneğin:
            </p>
            <div
              className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ExtraCostsPanel />
        </ScrollReveal>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
