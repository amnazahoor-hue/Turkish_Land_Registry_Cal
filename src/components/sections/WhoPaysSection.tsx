"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhoPaysSection() {
  return (
    <section
      id="who-pays"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/who-pays-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.48] sm:opacity-[0.44] lg:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc]/78 via-white/62 to-[#f1f5f9]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/35" />
        <div className="absolute inset-0 opacity-[0.12] hero-mesh" aria-hidden />
      </div>

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto max-w-3xl">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <Users size={14} className="text-btn" aria-hidden />
                Ödeme sorumluluğu
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tapu Sicil Harcını Kim Öder?
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                Yasaya göre, tapu kayıt ücretini ödemek alıcıların ve satıcıların
                sorumluluğundadır. Alıcı genellikle beyan edilen mülk değerinin
                %2&apos;sini öder Tapu Müdürlüğü. Transferi tamamlamadan önce bu
                tutarı tahsil eder.
              </p>
              <p>
                Ayrıca, satıcı da beyan edilen değerin %2&apos;sini öder. Bazen
                satıcı ve alıcı, masrafların tamamını bir tarafın karşılaması
                konusunda anlaşırlar. Bu, iki taraf arasındaki anlaşmaya bağlıdır;
                daha sonra herhangi bir sorun yaşanmaması için devirden önce teyit
                edilmesi ve belgelendirilmesi gereklidir. Ancak yasal olarak,
                değeri paylaşmak zorundadırlar.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
