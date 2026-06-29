"use client";

import { FileWarning } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const exceptionRows = [
  {
    type: "Satış",
    rate: "%4",
    payer: "Alıcı ve satıcı",
  },
  {
    type: "Bağış/hediye",
    rate: "binde 68,31",
    payer: "Alıcı",
  },
  {
    type: "İpotek",
    rate: "Kredi tutarının binde 4,55'i",
    payer: "Borçlu",
  },
  {
    type: "Değişme",
    rate: "her iki taraftan %2",
    payer: "Her iki taraf da",
  },
  {
    type: "Veraset intikal",
    rate: "Muaf",
    payer: "—",
  },
  {
    type: "Kentsel dönüşüm",
    rate: "Muaf",
    payer: "—",
  },
];

export default function SpecialCasesSection() {
  return (
    <section
      id="special-cases"
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
                <FileWarning size={14} aria-hidden />
                İstisnalar
              </span>
              <h2 className="mt-5 heading-h2-light">
                Özel Durumlar Ve İstisnalar
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-blue-100/85 md:text-lg">
              <p>
                Bazı mülklerde standart tapu kayıt ücreti kuralı uygulanamaz.
                Örneğin, miras yoluyla mülk devrinde vergi alınmaz. Bu durumda
                maliyet, ölen kişi ile alıcı arasındaki yasal ilişkiye bağlı
                olarak ayrı kurallara tabidir. Ayrıca, bazı devlet destekli konut
                projeleri, mülk sahibi olmayı daha erişilebilir kılmak için
                indirimli veya özel ücret düzenlemeleri sunabilir. Aşağıda farklı
                örnekler verilmiştir:
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      İşlem türü
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Ücret oranı
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Kim öder?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exceptionRows.map((row) => (
                    <tr
                      key={row.type}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-white md:px-5 md:py-4">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.rate}
                      </td>
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.payer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
