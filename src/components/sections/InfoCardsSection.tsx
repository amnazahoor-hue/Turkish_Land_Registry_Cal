"use client";

import Image from "next/image";
import { BookOpen, Landmark, Scale } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    icon: Landmark,
    title: null as string | null,
    nodeGradient: "from-secondary to-primary",
    titleClass: "text-secondary",
    bodyTint: "from-secondary/[0.06] via-secondary/[0.02] to-transparent",
    accentBar: "from-secondary via-primary/80 to-secondary/40",
    illustration: "/images/info-registry-visual.webp",
    illustrationAlt: "Tapu kayıt ücreti — tapu sicil ve resmi oran illüstrasyonu",
    body: (
      <>
        <p className="text-[1.0625rem] font-medium leading-relaxed text-primary/90 md:text-lg">
          Tapu kayıt ücreti bir tapu ücretidir. Mülkiyet el değiştirdiğinde
          devlet tarafından tahsil edilen bir vergidir. Mülk satıldığında,
          bağışlandığında veya miras yoluyla devredildiğinde tapu sicil
          müdürlüğüne ödenir. Bu ücret ödenmeden mülkiyet devri tamamlanamaz.
        </p>
        <p>
          Bu harç, resmi tapu kayıtlarının güncellenmesi karşılığında alınır.
          Tapu kaydı, devletin sunduğu bir hizmettir ve her kayıt, mevcut
          ile gelecekteki malik haklarını koruyan bir veritabanında saklanır.
          Çoğu durumda, toplanan gelir, Hazine ve Maliye Bakanlığı aracılığıyla
          kamu hizmetlerinin finansmanında kullanılır. Dolayısıyla bu ücret,
          idari bir masraftan ziyade vergi gibi değerlendiriliyor.
        </p>
      </>
    ),
  },
  {
    icon: Scale,
    title: "Tapu Sicil Harcı ile Emlak Vergisi Arasındaki Fark",
    nodeGradient: "from-btn to-accent",
    titleClass: "text-btn",
    bodyTint: "from-btn/[0.06] via-accent/[0.03] to-transparent",
    accentBar: "from-btn via-accent to-btn/40",
    illustration: "/images/info-tax-compare-visual.webp",
    illustrationAlt:
      "Tapu sicil harcı ile emlak vergisi karşılaştırması illüstrasyonu",
    body: (
      <p>
        Tapu sicil ücreti, mülkiyet el değiştirdiğinde bir defaya mahsus
        ödenen bir ücrettir. Bu ücret, mülkün beyan edilen satış değeri
        üzerinden hesaplanır. Emlak vergisi ise mülke sahip olduğunuz sürece
        her yıl ödenir.
      </p>
    ),
  },
] as const;

function InfoTimelinePanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-primary/[0.08] bg-white/95 shadow-[0_20px_56px_rgba(26,60,94,0.11)] backdrop-blur-sm">
      <div
        className="h-1.5 w-full bg-gradient-to-r from-secondary via-accent to-btn"
        aria-hidden
      />

      <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
          aria-hidden
        />

        <div className="relative grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={index}
                className="group relative flex flex-col self-start overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_30px_rgba(26,60,94,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_16px_40px_rgba(26,60,94,0.1)]"
              >
                <div
                  className={cn(
                    "h-1 w-full bg-gradient-to-r",
                    step.accentBar
                  )}
                  aria-hidden
                />

                <div
                  className={cn(
                    "relative flex items-start gap-3 border-b border-border/40 bg-gradient-to-br px-5 py-4 sm:px-6",
                    step.bodyTint
                  )}
                >
                  <div
                    className={cn(
                      "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_8px_20px_rgba(26,60,94,0.2)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105",
                      step.nodeGradient
                    )}
                  >
                    <Icon size={22} strokeWidth={1.65} aria-hidden />
                    <span
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-white font-mono text-[8px] font-bold text-primary shadow-sm"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {step.title ? (
                    <h3 className={cn("heading-card min-w-0 pt-0.5", step.titleClass)}>
                      {step.title}
                    </h3>
                  ) : (
                    <p className="pt-1 text-sm font-semibold text-primary/85 sm:text-base">
                      Tapu kayıt ücreti
                    </p>
                  )}
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  <div
                    className={cn(
                      "text-base leading-relaxed text-text-secondary md:text-[1.0625rem] md:leading-relaxed",
                      !step.title && "space-y-4"
                    )}
                  >
                    {step.body}
                  </div>
                </div>

                <div className="border-t border-border/40 bg-gradient-to-b from-surface/40 to-white px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                  <Image
                    src={step.illustration}
                    alt={step.illustrationAlt}
                    title={step.illustrationAlt}
                    width={360}
                    height={index === 0 ? 120 : 160}
                    loading="lazy"
                    className="h-auto w-full rounded-xl opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div
        className="h-1 w-full bg-gradient-to-r from-secondary/60 via-accent/60 to-btn/60"
        aria-hidden
      />
    </div>
  );
}

export default function InfoCardsSection() {
  return (
    <section
      id="info"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-btn/10 blur-3xl"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              <BookOpen size={14} className="text-btn" aria-hidden />
              Temel bilgiler
            </span>
            <h2 className="mt-5 heading-h2">
              Tapu Sicil Müdürlüğü Ücreti Nedir?
            </h2>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>

          <div className="relative mx-auto w-full max-w-6xl">
            <InfoTimelinePanel />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
