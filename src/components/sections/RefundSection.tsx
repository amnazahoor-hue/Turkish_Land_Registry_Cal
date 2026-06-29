"use client";

import Image from "next/image";
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
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/refund-background.webp"
          alt="Tapu sicil ücreti geri ödeme ve vergi dairesi başvurusu arka plan görseli"
          title="Tapu sicil ücreti geri ödeme ve vergi dairesi başvurusu arka plan görseli"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center opacity-[0.5] sm:opacity-[0.46] lg:opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc]/80 via-white/65 to-[#eef6ff]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
        <div className="absolute inset-0 opacity-[0.1] hero-mesh" aria-hidden />
      </div>

      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-btn/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto max-w-3xl rounded-3xl border border-white/75 bg-white/90 p-6 shadow-[0_8px_36px_rgba(26,60,94,0.08)] backdrop-blur-sm sm:p-8 md:p-10">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <RotateCcw size={14} className="text-btn" aria-hidden />
                Geri ödeme
              </span>
              <h2 className="mt-5 heading-h2">
                Tapu Sicil Ücretlerinin Geri Ödemesini Alabilir Misiniz?
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p className="text-text-primary/90">
                Genellikle, transfer işlemi tamamlandıktan sonra geri ödeme yapılmaz.
                Ancak, aşağıdaki sınırlı durumlarda geri ödeme veya düzeltme mümkün
                olabilir:
              </p>

              <ul className="space-y-3 rounded-2xl border border-border/80 bg-white/80 p-5 backdrop-blur-[2px] md:p-6">
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

              <p className="text-text-primary/90">
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
