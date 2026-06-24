import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface pb-16 pt-24 sm:pt-28 md:pt-32">
        <article className="prose prose-slate page-container-narrow mx-auto max-w-3xl prose-headings:font-display prose-headings:text-primary prose-a:text-secondary text-center lg:text-left">
          <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">{title}</h1>
          <div className="mt-8 space-y-6 text-text-secondary">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
