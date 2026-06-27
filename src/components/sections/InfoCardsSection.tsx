"use client";

import { BookOpen, Landmark, Scale } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    icon: Landmark,
    title: null as string | null,
    nodeGradient: "from-secondary to-primary",
    ringClass: "ring-secondary/20",
    titleClass: "text-secondary",
    bodyTint: "from-secondary/[0.04] to-transparent",
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
    ringClass: "ring-btn/20",
    titleClass: "text-btn",
    bodyTint: "from-btn/[0.04] to-transparent",
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
    <div className="overflow-hidden rounded-3xl border border-primary/[0.08] bg-white shadow-[0_16px_48px_rgba(26,60,94,0.1)]">
      <div
        className="h-1.5 w-full bg-gradient-to-r from-secondary via-accent to-btn"
        aria-hidden
      />

      <div className="relative px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/[0.04] to-transparent"
          aria-hidden
        />

        <div className="relative">
          <div
            className="absolute bottom-6 left-[1.4375rem] top-6 hidden w-0.5 bg-gradient-to-b from-secondary/50 via-border to-btn/50 sm:block"
            aria-hidden
          />

          <div className="space-y-6 sm:space-y-7">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <article
                  key={index}
                  className="group relative flex flex-col gap-4 sm:flex-row sm:gap-6"
                >
                  <div className="relative z-10 flex shrink-0 items-center gap-3 sm:w-[4.5rem] sm:flex-col sm:gap-0">
                    <div
                      className={cn(
                        "relative flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_8px_20px_rgba(26,60,94,0.18)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14",
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
                      <h3 className="font-display text-base font-bold leading-snug text-btn sm:hidden">
                        {step.title}
                      </h3>
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "min-w-0 flex-1 rounded-2xl border border-border/50 bg-gradient-to-br p-5 transition-[border-color,box-shadow] duration-300 sm:p-6",
                      step.bodyTint,
                      step.ringClass,
                      "group-hover:border-border group-hover:shadow-[0_8px_24px_rgba(26,60,94,0.06)]"
                    )}
                  >
                    {step.title ? (
                      <h3
                        className={cn(
                          "mb-3 hidden font-display text-xl font-bold leading-snug sm:block",
                          step.titleClass
                        )}
                      >
                        {step.title}
                      </h3>
                    ) : null}

                    <div
                      className={cn(
                        "text-base leading-relaxed text-text-secondary md:text-[1.0625rem] md:leading-relaxed",
                        !step.title && "space-y-4"
                      )}
                    >
                      {step.body}
                    </div>
                  </div>

                  {!isLast ? (
                    <div
                      className="ml-[1.4375rem] h-px w-12 bg-gradient-to-r from-secondary/30 to-transparent sm:hidden"
                      aria-hidden
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
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
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
              Tapu Sicil Müdürlüğü Ücreti Nedir?
            </h2>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <InfoTimelinePanel />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
