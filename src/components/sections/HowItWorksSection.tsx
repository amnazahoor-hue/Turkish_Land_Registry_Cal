"use client";

import { Calculator } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const formulas = [
  "Alıcının payı = Beyan edilen mülk değeri × %2",
  "Satıcının payı = Beyan edilen mülk değeri × %2",
  "Toplam tapu kayıt ücreti = Beyan edilen mülk değeri × %4",
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
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
                <Calculator size={14} aria-hidden />
                Hesaplama rehberi
              </span>
              <h2 className="mt-5 heading-h2-light">
                Tapu kayıt Ücreti Nasıl Hesaplanır?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100/90 md:text-lg">
                Hesaplama basit, belediye vergi oranlarının uygulanmasına benzer.
                Zor olan kısım hesaplama değil, kanunun hangi değeri esas aldığını
                bilmektir.
              </p>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                <h3 className="heading-h3-light">
                  Güncel Tapu Sicil Müdürlüğü Ücreti Oranı
                </h3>
                <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                  492 Sayılı Harçlar Kanunu, Sayılı Tarife No. (4), tapu masrafı
                  yüzde kaç standart bir satış için beyan edilen mülk değerinin
                  %2&apos;ü olarak belirlenmiştir. Bu oran iki taraf arasında
                  paylaştırılır. Dolayısıyla, mülkün türü ne olursa olsun ister
                  daire, ister arsa, arazi veya villa her iki taraf da %2 oranında
                  harç öder.
                </p>
              </div>

              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                <h3 className="heading-h3-light">
                  Kullanılan Formül Tapu Kayıt Ücretlerinin Hesaplanması.
                </h3>
                <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                  Hesap makinemiz, 57. madde uyarınca tüm hesaplamaları otomatik
                  olarak yapar. Formülün kendisi basittir:
                </p>
                <ul className="space-y-2 rounded-xl border border-white/10 bg-primary/30 p-4 md:p-5">
                  {formulas.map((formula) => (
                    <li
                      key={formula}
                      className="font-mono text-sm leading-relaxed text-white/90 md:text-base"
                    >
                      {formula}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                <h3 className="heading-h3-light">
                  Minimum Gayrimenkul Değeri Gereksinimleri
                </h3>
                <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                  Madde 63 uyarınca, beyan edilen değer, hiçbir zaman mülkün
                  kayıtlı vergi matrahının (asgari değerinin) altında olamaz.
                  Vergi makamları bu sorgulama sırasında bunu tespit ederse,
                  beyanname reddedilebilir veya cezai yaptırımlarla düzeltilebilir.
                  Ayrıca, döner sermaye fonu ücreti de uygulanmaktadır. Tapu
                  senedi her yıl alınan bu küçük ücret, asgari hizmet bedelinin
                  her zaman tahsil edilmesini sağlamaya yardımcı olur. Çoğu
                  durumda, standart hesaplamaya dahildir.
                </p>
              </div>

              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                <h3 className="heading-h3-light">
                  Tapu Devrinin Ücret Hesaplamasını Nasıl Etkilediği
                </h3>
                <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                  Bu, işlemin türüne bağlıdır. Normal bir satışta toplam %4 harç
                  uygulanır; binde 68,31 (yaklaşık %6,8) ve harcı alıcı öder.
                  Hesaplamadan önce satış türünü bilmeniz gerekir çünkü her satış
                  türü farklı bir hesaplama yöntemi kullanır.
                </p>
              </div>
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
