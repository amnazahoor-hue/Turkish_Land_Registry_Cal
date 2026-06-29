import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { SITE_EMAIL } from "@/lib/site";

const pageDescription =
  `Tapu harcı hesaplama aracı hakkında sorularınız, geri bildirim ve iş birliği talepleri için TapuCalc iletişim sayfası. E-posta: ${SITE_EMAIL} — genellikle 1–2 iş günü içinde yanıt.`;

export const metadata = createPageMetadata({
  title: "Bize Ulaşın",
  description: pageDescription,
  path: ROUTES.contact,
  index: true,
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", path: ROUTES.home },
          { name: "İletişim", path: ROUTES.contact },
        ]}
      />
      <ArticleJsonLd
        title="Bize Ulaşın"
        description={pageDescription}
        path={ROUTES.contact}
      />
      <Header />
      <main className="min-h-screen bg-surface pb-16 pt-24 sm:pt-28 md:pt-32">
        <div className="page-container-narrow mx-auto max-w-3xl">
          <h1 className="heading-page-h1 text-center">
            Bize Ulaşın
          </h1>
          <p className="mt-4 text-center text-text-secondary">
            Tapu harcı hesaplama aracımız, devir maliyetleri rehberleri veya site
            içeriği hakkında sorularınız için aşağıdaki formu kullanın. Hesaplama
            sonuçları, beyan değeri veya resmi oranlarla ilgili özel durumlarınızı
            detaylı yazmanız yanıt süremizi kısaltır.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>

          <section className="mt-10 space-y-6 text-left text-sm text-text-secondary">
            <div className="rounded-xl border border-border bg-white p-6 text-center">
              <p className="font-semibold text-primary">Doğrudan iletişim</p>
              <p className="mt-2">
                E-posta:{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-secondary hover:underline"
                >
                  {SITE_EMAIL}
                </a>
              </p>
              <p className="mt-1">İstanbul, Türkiye</p>
            </div>

            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="heading-page-h2">
                Hangi konularda yazabilirsiniz?
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Tapu harcı hesaplama aracındaki hata veya öneri bildirimleri</li>
                <li>Alıcı ve satıcı payları, döner sermaye ve ek masraflar hakkında içerik talepleri</li>
                <li>Basın, iş birliği ve sponsorluk teklifleri</li>
                <li>Gizlilik ve veri işleme ile ilgili resmi talepler</li>
              </ul>
            </div>

            <p>
              TapuCalc bir devlet kurumu değildir; nihai harç tutarları için{" "}
              <a
                href="https://www.gib.gov.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                GİB
              </a>{" "}
              ve yerel tapu müdürlüğünü teyit edin.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
