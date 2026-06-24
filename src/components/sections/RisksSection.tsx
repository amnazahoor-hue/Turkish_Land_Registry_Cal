"use client";

import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const risks = [
  "Güncel olmayan vergi değerini kullanmak, ücretin yanlış tahmin edilmesine yol açabilir. Her zaman en güncel resmi emlak değerini kullanın.",
  "Bazı kişiler ücreti hesaplarken ek maliyeti eklemeyi unutuyor. Döner sermaye ücreti veya banka masrafları vb. her zaman ekleyin.",
  "Randevudan önce ücret ödenmezse, mülk devri gecikebilir veya yeniden planlanabilir. Her zaman zamanında ödeme yapın.",
  "Beyan edilen gayrimenkul değeri gerçek değerinden düşükse, vergi makamları ceza uygulayabilir. Bu durum faiz masraflarına, ileride hukuki ihtilaflara ve yeniden satış sırasında sorunlara yol açabilir.",
];

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
          <article className="mx-auto max-w-3xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                <AlertTriangle size={14} aria-hidden />
                Riskler
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Gayrimenkul Değerini Düşük Göstermenin Riskleri
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <p className="mb-6 text-base leading-relaxed text-blue-100/90 md:text-lg">
              Çoğu anlaşmazlık, insanların kaçınılmaz hatalar yapmasından kaynaklanır.
              Bu hataların düzeltilmesi gerekir ve aşağıda belirtilen riskler sizin
              için geçerlidir.
            </p>

            <ul className="space-y-4">
              {risks.map((risk) => (
                <li
                  key={risk}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
                >
                  <AlertTriangle
                    size={20}
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                    {risk}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
