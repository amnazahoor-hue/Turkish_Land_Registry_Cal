"use client";

import { RotateCcw } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const refundCases = [
  "Ücret hesaplamasında hata olması durumunda para iadesi mümkündür.",
  "Gayrimenkul anlaşması resmi olarak tescil edilmeden önce iptal edildiğinde,",
  "Birisi yanlışlıkla iki kez ödeme yaparsa.",
];

export default function RefundSection() {
  return (
    <section
      id="refund"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto max-w-3xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <RotateCcw size={14} className="text-btn" aria-hidden />
                Geri ödeme
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tapu Sicil Ücretlerinin Geri Ödemesini Alabilir Misiniz?
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                Genellikle, transfer işlemi tamamlandıktan sonra geri ödeme yapılmaz.
                Ancak, aşağıdaki sınırlı durumlarda geri ödeme veya düzeltme mümkün
                olabilir:
              </p>

              <ul className="space-y-3 rounded-2xl border border-border bg-white p-5 md:p-6">
                {refundCases.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-btn"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p>
                Bütün bunlar olursa, ilk adım her zaman bir başvuruda bulunmaktır.
                tapu düzeltme başvuru vergi dairesiyle iletişime geçmeniz gerekiyor.
                Sorunun ne olduğunu açıklayan kanıt (belgeler) sunmalısınız ki
                inceleyip düzeltebilsinler. Düzeltme yapıldıktan sonra, iade işlemi
                gerçekleştirilir. GIB (Gelir İdaresi Başkanlığı)
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
