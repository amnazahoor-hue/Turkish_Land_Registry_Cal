"use client";

import { CreditCard } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const paymentMethods = [
  {
    title: "Bankalar Aracılığıyla Ödeme",
    description:
      "Çoğu insan kendi işini yapar. tapu harcı ödemesi yoluyla bankalar. Örneğin Ziraat Bankası, Halkbank veya VakıfBank gibi bankalarda. Ödeme genellikle çevrimiçi olarak yapılabilir. Tapu Sicil Müdürlüğü'nde yapılan işlem için ödeme makbuzu gereklidir.",
  },
  {
    title: "Çevrimiçi Ödeme Seçenekleri",
    description:
      "Ödemeyi şu yöntemle yapabilirsiniz: mobil bankacılık ve internet bankacılığı da. Birçok ATM, ücret ödemesi seçeneği sunmaktadır. Şubeyi bizzat ziyaret edemediğiniz durumlarda bu seçeneği kullanabilirsiniz.",
  },
  {
    title: "E-Devlet Aracılığıyla Ödeme",
    description:
      "E-devlet portalı ödeme referansı oluşturmanıza olanak tanır. Doğrudan çevrimiçi ödeme yapabilirsiniz ve bu en hızlı yoldur. Ayrıca, bir tapu sorgulama ödeme yapmadan önce, aynı portal üzerinden tam tutarı teyit edin.",
  },
  {
    title: "Ödeme Son Tarihleri",
    description:
      "Ücret, randevu tarihinden önce ödenmelidir. Randevu tarihini kaçırırsanız, tapu dairesi devir işlemini gerçekleştirmeyecektir. Yeni bir randevu almanız gerekecektir. Tapu randevusu.",
  },
];

export default function PaymentSection() {
  return (
    <section
      id="payment"
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
                <CreditCard size={14} aria-hidden />
                Ödeme yöntemleri
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Tapu Sicil Ücretleri Nasıl Ödenir?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100/90 md:text-lg">
                Zor olan tek şey, ücretin tam miktarını bilmek. tapu harcı ödemesi
                kendisi kolayca işlenir. İşte farklı bir şekilde nasıl çalıştığı.
              </p>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="space-y-8">
              {paymentMethods.map((method) => (
                <div key={method.title} className="space-y-3">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {method.title}
                  </h3>
                  <p className="text-base leading-relaxed text-blue-100/85 md:text-lg">
                    {method.description}
                  </p>
                </div>
              ))}
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
