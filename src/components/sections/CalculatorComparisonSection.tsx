"use client";

import { Check, Scale, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const onlineBenefits = [
  "Hesap makinemiz hızlı ve anında sonuç verir.",
  "Doğru ve güncel fiyatları otomatik olarak uygular.",
  "Ücretsizdir ve mobil cihazlarla uyumludur.",
  "İnsan hatasını azaltın ve tüm ücretleri tek bir hesaplamaya dahil edin.",
];

const manualDrawbacks = [
  "Hata olasılığını artırır.",
  "Kurallar ve yüzdeler hakkında bilgi gerektirir.",
  "Yanlış emlak değeri veya vergi oranı kullanma riski.",
  "Çok zaman alıyor.",
];

export default function CalculatorComparisonSection() {
  return (
    <section
      id="calculator-comparison"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto max-w-4xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <Scale size={14} className="text-btn" aria-hidden />
                Karşılaştırma
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tapu Sicil Ücreti Hesaplayıcısı vs. Manuel Hesaplama
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <ComparisonCard
                title="Bizim çevrimiçi hesap makinesi"
                items={onlineBenefits}
                variant="positive"
              />
              <ComparisonCard
                title="Manuel hesaplama"
                items={manualDrawbacks}
                variant="negative"
              />
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "positive" | "negative";
}) {
  const isPositive = variant === "positive";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 md:p-7",
        isPositive
          ? "border-btn/20 bg-white shadow-sm ring-1 ring-btn/10"
          : "border-border bg-surface/50"
      )}
    >
      <h3
        className={cn(
          "font-display text-xl font-bold tracking-tight md:text-2xl",
          isPositive ? "text-primary" : "text-text-primary"
        )}
      >
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                isPositive ? "bg-btn/10 text-btn" : "bg-error/10 text-error"
              )}
              aria-hidden
            >
              {isPositive ? <Check size={14} /> : <X size={14} />}
            </span>
            <p className="text-base leading-relaxed text-text-secondary">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
