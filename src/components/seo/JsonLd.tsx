import { AUTHOR_NAME, faqs, SITE_NAME, socialLinks } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE_URL = `${SITE_URL}/images/og-image.webp`;
const LOGO_URL = `${SITE_URL}/images/logo-transparent.webp`;
const AUTHOR_PAGE_URL = `${SITE_URL}${ROUTES.author}`;
const AUTHOR_IMAGE_URL = `${SITE_URL}/images/author-selin-tekvatan.webp`;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === ROUTES.home ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };

  return <JsonLdScript data={schema} />;
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished = "2024-01-15",
  dateModified = "2026-06-01",
}: ArticleJsonLdInput) {
  const url = `${SITE_URL}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    inLanguage: "tr-TR",
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_PAGE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    image: OG_IMAGE_URL,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLdScript data={schema} />;
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
          width: 482,
          height: 512,
        },
        sameAs: socialLinks.map((link) => link.href),
        description:
          "Türkiye'de mülk alıcıları ve satıcıları için ücretsiz tapu harcı hesaplama aracı",
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#calculator`,
        name: `${SITE_NAME} Tapu Harcı Hesaplama`,
        url: `${SITE_URL}/#calculator`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
        description:
          "Türkiye'de resmi %4 tapu devir oranına göre alıcı ve satıcı paylarını hesaplayın",
        inLanguage: "tr-TR",
      },
    ],
  };

  return <JsonLdScript data={schema} />;
}

export function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return <JsonLdScript data={schema} />;
}

export function AuthorJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${AUTHOR_PAGE_URL}/#webpage`,
        url: AUTHOR_PAGE_URL,
        name: `${AUTHOR_NAME} — ${SITE_NAME} İçerik Editörü`,
        description:
          "Selin Tekvatan, TapuCalc tapu harcı hesaplama rehberleri ve emlak devir maliyetleri içerik editörü.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${AUTHOR_PAGE_URL}/#person` },
        mainEntity: { "@id": `${AUTHOR_PAGE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${AUTHOR_PAGE_URL}/#person`,
        name: AUTHOR_NAME,
        url: AUTHOR_PAGE_URL,
        image: AUTHOR_IMAGE_URL,
        jobTitle: "İçerik Editörü",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        description:
          "Kıdemli emlak hukuku editörü. Tapu harçları, beyan değeri ve Türkiye'de mülk devir maliyetleri üzerine pratik rehberler hazırlar.",
        knowsAbout: [
          "Tapu harcı",
          "Tapu sicil ücreti",
          "Gayrimenkul devir maliyetleri",
          "492 Sayılı Harçlar Kanunu",
          "Döner sermaye ücreti",
          "Emlak alım-satım süreçleri",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${AUTHOR_PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Yazar",
            item: AUTHOR_PAGE_URL,
          },
        ],
      },
    ],
  };

  return <JsonLdScript data={schema} />;
}
