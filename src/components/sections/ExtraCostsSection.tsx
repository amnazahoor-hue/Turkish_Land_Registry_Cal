"use client";

import { Receipt } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const extraCosts = [
  {
    title: "Döner sermaye fonu",
    description:
      "Tapu sicil müdürlüğü tarafından alınan küçük bir hizmet bedeli. Döner sermaye bedeli ile ek hizmet bedeli toplamı 2026 için baz olarak yaklaşık 2.534 TL'dir; ancak büyükşehirlerde il katsayısı nedeniyle bu tutar daha yüksek olabilir (yaklaşık 5.000–6.700 TL). Her yıl güncellenir.",
  },
  {
    title: "Değerleme raporu",
    description: "Banka arazileri için gereklidir ve ayrı olarak ödenir.",
  },
  {
    title: "Noter ücreti",
    description: "Vekaletname gibi bir belge için ödenen ücret.",
  },
  {
    title: "Banka ücreti",
    description: "Bankanız işlemler için ücret alabilir.",
  },
];

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
          <article className="mx-auto max-w-3xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                <Receipt size={14} aria-hidden />
                Ek masraflar
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Mülk Transferinde Ek Maliyetler
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100/90 md:text-lg">
                Tapu devir ücreti ana masraftır, ancak duruma bağlı olarak bazen
                ek ücretler de ödemeniz gerekebilir, örneğin:
              </p>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <ul className="space-y-5">
              {extraCosts.map((cost) => (
                <li
                  key={cost.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
                >
                  <h3 className="font-display text-lg font-bold text-white md:text-xl">
                    {cost.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-blue-100/85 md:text-lg">
                    {cost.description}
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
