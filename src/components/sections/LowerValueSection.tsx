"use client";

import { ShieldAlert } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const reasons = [
  "Tapu tescil ücretini düşürmek ve para tasarrufu sağlamak için",
  "Gayrimenkul üzerindeki daha düşük vergi maliyeti için",
  "Alım veya satım anındaki ani mali yükü azaltmaya çalışmak",
  "Gerçek piyasa fiyatına bağlı olarak daha yüksek resmi komisyonlardan kaçının.",
];

export default function LowerValueSection() {
  return (
    <section
      id="lower-value"
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
                <ShieldAlert size={14} className="text-btn" aria-hidden />
                Yasal uyarı
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tapu kayıt Ücretleri Daha Düşük Bir Gayrimenkul Değeri Üzerinden
                Hesaplanabilir Mi?
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                Yasal olarak izin verilmiyor. Beyan edilen satış bedeli tapu sicili
                ücreti hesaplaması, işlem değerini gösterir. Belediye bunu kaydeder
                ve hiçbir zaman mülkün resmi değerinin altında olmaz. emlak vergisi
                değeri. Düşük değer beyanının (gerçek değerin altında beyan) bazı
                nedenleri şunlardır:
              </p>

              <ul className="space-y-3 rounded-2xl border border-border bg-white p-5 md:p-6">
                {reasons.map((reason) => (
                  <li key={reason} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-btn"
                      aria-hidden
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              <p>
                Bu bağlamda, hükümet beyan edilen değeri belediye vergi tabanı, banka
                değerleme raporları ve piyasa verileriyle karşılaştırarak doğrular.
                Mülk devrinden sonra tespit edilse bile, duruma bağlı olarak yasal
                incelemeye veya düzeltmelere yol açabilir.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
