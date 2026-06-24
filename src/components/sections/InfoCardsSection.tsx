"use client";

import { BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto max-w-3xl">
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

            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
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
            </div>

            <div className="mt-10 space-y-5">
              <h3 className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
                Tapu Sicil Harcı ile Emlak Vergisi Arasındaki Fark
              </h3>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                Tapu sicil ücreti, mülkiyet el değiştirdiğinde bir defaya mahsus
                ödenen bir ücrettir. Bu ücret, mülkün beyan edilen satış değeri
                üzerinden hesaplanır. Emlak vergisi ise mülke sahip olduğunuz sürece
                her yıl ödenir.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
