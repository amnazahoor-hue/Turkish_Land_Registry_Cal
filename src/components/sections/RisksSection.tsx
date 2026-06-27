"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RiskMeterGauge, {
  riskCardActive,
  riskSegmentBorderL,
  riskSegmentFill,
  riskSegmentText,
} from "@/components/ui/RiskMeterGauge";
import { cn } from "@/lib/cn";

const risks = [
  {
    title: "Güncel olmayan vergi değeri",
    description:
      "Güncel olmayan vergi değerini kullanmak, ücretin yanlış tahmin edilmesine yol açabilir. Her zaman en güncel resmi emlak değerini kullanın.",
  },
  {
    title: "Ek maliyetleri atlama",
    description:
      "Bazı kişiler ücreti hesaplarken ek maliyeti eklemeyi unutuyor. Döner sermaye ücreti veya banka masrafları vb. her zaman ekleyin.",
  },
  {
    title: "Geç ödeme",
    description:
      "Randevudan önce ücret ödenmezse, mülk devri gecikebilir veya yeniden planlanabilir. Her zaman zamanında ödeme yapın.",
  },
  {
    title: "Düşük değer beyanı",
    description:
      "Beyan edilen gayrimenkul değeri gerçek değerinden düşükse, vergi makamları ceza uygulayabilir. Bu durum faiz masraflarına, ileride hukuki ihtilaflara ve yeniden satış sırasında sorunlara yol açabilir.",
  },
];

function shouldKeepRiskHover(index: number, relatedTarget: EventTarget | null) {
  if (!(relatedTarget instanceof Element)) return false;
  return (
    relatedTarget.closest(`[data-risk-card="${index}"]`) !== null ||
    relatedTarget.closest(`[data-risk-node="${index}"]`) !== null
  );
}

function RisksPanel() {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const handleHighlightLeave = (
    index: number,
    relatedTarget: EventTarget | null
  ) => {
    if (!shouldKeepRiskHover(index, relatedTarget)) {
      setHighlightIndex(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_20px_56px_rgba(0,0,0,0.22)]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch">
        <div className="relative flex items-center justify-center border-b border-border/50 bg-gradient-to-br from-surface/70 via-white to-secondary/[0.04] px-6 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 80%, rgba(45,106,159,0.12) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <RiskMeterGauge
            highlightIndex={highlightIndex}
            onHighlight={setHighlightIndex}
            onHighlightLeave={handleHighlightLeave}
            className="relative z-10"
          />
        </div>

        <ul className="flex flex-col justify-center gap-3.5 bg-white p-5 sm:gap-4 sm:p-6 lg:p-7 xl:p-8">
          {risks.map((risk, index) => {
            const isActive = highlightIndex === index;

            return (
              <li key={risk.title}>
                <article
                  data-risk-card={index}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onMouseLeave={(e) => handleHighlightLeave(index, e.relatedTarget)}
                  className={cn(
                    "flex gap-4 rounded-2xl border bg-white p-4 transition-all duration-300 md:gap-5 md:p-5",
                    "border-l-[4px]",
                    riskSegmentBorderL[index],
                    isActive
                      ? riskCardActive[index]
                      : "border-border/60 shadow-[0_2px_12px_rgba(26,60,94,0.04)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] font-mono text-sm font-bold shadow-sm transition-all duration-300 md:h-11 md:w-11",
                      isActive
                        ? riskSegmentFill[index]
                        : cn(
                            "bg-white",
                            riskSegmentBorderL[index].replace("border-l-", "border-"),
                            riskSegmentText[index]
                          )
                    )}
                    aria-hidden
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h3
                      className={cn(
                        "font-display text-sm font-bold leading-snug transition-colors duration-300 md:text-base",
                        isActive ? riskSegmentText[index] : "text-primary"
                      )}
                    >
                      {risk.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary md:text-[0.9375rem] md:leading-relaxed">
                      {risk.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function RisksSection() {
  return (
    <section
      id="risks"
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
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
              <AlertTriangle size={14} aria-hidden />
              Riskler
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
              Gayrimenkul Değerini Düşük Göstermenin Riskleri
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-blue-100/90 md:text-lg">
              Çoğu anlaşmazlık, insanların kaçınılmaz hatalar yapmasından kaynaklanır.
              Bu hataların düzeltilmesi gerekir ve aşağıda belirtilen riskler sizin
              için geçerlidir.
            </p>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mx-auto w-full">
            <RisksPanel />
          </div>
        </ScrollReveal>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
