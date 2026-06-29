import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/routes";

interface LegalPageLayoutProps {
  title: string;
  path: string;
  breadcrumbLabel: string;
  description: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  path,
  breadcrumbLabel,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", path: ROUTES.home },
          { name: breadcrumbLabel, path },
        ]}
      />
      <ArticleJsonLd title={title} description={description} path={path} />
      <Header />
      <main className="min-h-screen bg-surface pb-16 pt-24 sm:pt-28 md:pt-32">
        <article className="prose prose-slate page-container-narrow mx-auto max-w-3xl prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:leading-[1.12] prose-headings:text-primary prose-a:text-secondary text-center lg:text-left">
          <h1 className="heading-page-h1">{title}</h1>
          <div className="mt-8 space-y-6 text-text-secondary">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
