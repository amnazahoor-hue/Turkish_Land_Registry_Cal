"use client";

import { ListOrdered } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    title: "Adım 1: Mülk Değerini Girin",
    description:
      "Beyan edilen satış fiyatını girin. Henüz anlaşmaya varmadıysanız, mevcut belediye emlak vergisi değerini yazın.",
  },
  {
    title: "Adım 2: İşlem Ayrıntılarını Seçin",
    description:
      "İşlem türünü (örneğin satış veya devir) seçin, ardından mülkün bulunduğu il veya ilçeyi belirtin. Kredi işlemi olup olmadığını ve alıcının Türk vatandaşı mı yoksa yabancı uyruklu mu olduğunu da ekleyin.",
  },
  {
    title: "Adım 3: Uygulanabilir Ücretleri Gözden Geçirin",
    description: "Hesap makinesi güncel oranı ve gayrimenkul değerini kullanır.",
  },
  {
    title: "Adım 4: Alıcı Ve Satıcı Maliyetlerini Kontrol Edin",
    description:
      "Son olarak, hesap makinesi toplam tutarı alıcı ve satıcı arasında paylaştırır. Farklı bir düzenleme üzerinde anlaştıysanız, paylaştırmayı manuel olarak ayarlayabilirsiniz.",
  },
];

export default function CalculatorGuideSection() {
  return (
    <section
      id="calculator-guide"
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
                <ListOrdered size={14} className="text-btn" aria-hidden />
                Kullanım rehberi
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tapu Sicil Ücreti Hesaplayıcısı Nasıl Kullanılır?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                Bu hesap makinesi, mülkünüzün değerini otomatik olarak hesaplar ve
                toplam tutarı gösterir. Tapu kayıt ücretinizin doğru bir tahminini
                almak için şu basit adımları izleyin.
              </p>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <ol className="space-y-8">
              {steps.map((step, index) => (
                <li key={step.title} className="list-none">
                  <div className="flex gap-4 md:gap-5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-btn/10 font-mono text-sm font-bold text-btn md:h-11 md:w-11"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-3">
                      <h3 className="font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
