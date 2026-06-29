"use client";

import { Table2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const examples = [
  {
    title: "Örnek 1: 1 Milyon TL Değerinde Gayrimenkul",
    content: (
      <>
        <p>
          Hesaplama basittir. 1 milyon TL ev tapu masrafı.
        </p>
        <div className="mt-4 space-y-1 rounded-2xl border border-white/10 bg-white/5 p-5 font-mono text-sm text-white/90 md:text-base">
          <p>1.000.000 TL&apos;nin %4&apos;ü = 1.000.000 × 0,04</p>
          <p>= 40.000 TL (toplam tapu kayıt ücreti)</p>
        </div>
        <p className="mt-4">
          Alıcı ve satıcının maliyeti 20.000 TL&apos;dir. Döner sermaye fonu
          eklenirse, alıcılar birkaç TL daha fazla ödeyebilir.
        </p>
      </>
    ),
  },
  {
    title: "Örnek 2: 3 Milyon TL Değerinde Gayrimenkul",
    content: (
      <>
        <p>
          3 milyon TL ev tapu masrafı. Toplamda yaklaşık 120.000 TL tutarında bir
          ücret söz konusu. Alıcı ve satıcı hesaplamaları şu şekilde:
        </p>
        <ul className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5 font-mono text-sm text-white/90 md:text-base">
          <li>%2 alıcı (binde 20): 3.000.000 × 0,02 = 60.000 TL</li>
          <li>%2 satıcı (binde 20): 3.000.000 × 0,02 = 60.000 TL</li>
        </ul>
      </>
    ),
  },
  {
    title: "Örnek 3: 5 Milyon TL Değerinde Gayrimenkul",
    content: (
      <p>
        5 milyon TL ev tapu masrafı. Toplam 200.000 TL ücret alınır, bunun
        100.000 TL&apos;si taraf başına düşer. Yüzde oranı aynı kalır; sadece
        nihai tutar artar.
      </p>
    ),
  },
];

const tableRows = [
  {
    value: "1.000.000 TL",
    rate: "%4",
    buyer: "20.000 TL",
    seller: "20.000 TL",
    total: "40.000 TL",
  },
  {
    value: "2.000.000 TL",
    rate: "%4",
    buyer: "40.000 TL",
    seller: "40.000 TL",
    total: "80.000 TL",
  },
  {
    value: "3.000.000 TL",
    rate: "%4",
    buyer: "60.000 TL",
    seller: "60.000 TL",
    total: "120.000 TL",
  },
  {
    value: "4.000.000 TL",
    rate: "%4",
    buyer: "80.000 TL",
    seller: "80.000 TL",
    total: "160.000 TL",
  },
  {
    value: "5.000.000 TL",
    rate: "%4",
    buyer: "100.000 TL",
    seller: "100.000 TL",
    total: "200.000 TL",
  },
];

export default function ExamplesSection() {
  return (
    <section
      id="examples"
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
          <article className="mx-auto w-full max-w-6xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                <Table2 size={14} aria-hidden />
                Örnek hesaplamalar
              </span>
              <h2 className="mt-5 heading-h2-light">
                Tapu Sicil Ücreti Hesaplama Örnekleri
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100/90 md:text-lg">
                Sayısal bir örnek, bir formülden daha kolay anlaşılır. Eğer tahmin
                etmek istiyorsanız tapu harclari ne kadar? Önce kendi mülkünüze
                benzer bir mülk için uygulayın, ardından tablodaki örneğe bakın.
                Bu, farklı fiyatlar için hesaplamaları anlamanıza yardımcı olur.
              </p>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {examples.map((example) => (
                <div
                  key={example.title}
                  className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
                >
                  <h3 className="heading-h3-light">{example.title}</h3>
                  <div className="space-y-4 text-base leading-relaxed text-blue-100/85 md:text-lg">
                    {example.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 md:mt-12">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Gayrimenkul değeri
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Ücret oranı
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Alıcı payı
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Satıcının payı
                    </th>
                    <th className="px-4 py-3 font-semibold text-white md:px-5 md:py-4">
                      Toplam ücret
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr
                      key={row.value}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.value}
                      </td>
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.rate}
                      </td>
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.buyer}
                      </td>
                      <td className="px-4 py-3 text-white/90 md:px-5 md:py-4">
                        {row.seller}
                      </td>
                      <td className="px-4 py-3 font-semibold text-accent md:px-5 md:py-4">
                        {row.total}
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
