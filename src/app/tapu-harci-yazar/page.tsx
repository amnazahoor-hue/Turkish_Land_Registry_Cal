import Image from "next/image";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { AuthorJsonLd } from "@/components/seo/JsonLd";
import { AuthorContent } from "@/lib/legal-content";
import { AUTHOR_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const pageDescription = `${AUTHOR_NAME} — TapuCalc tapu harcı hesaplama rehberleri, emlak devir maliyetleri ve 492 Sayılı Harçlar Kanunu üzerine içerik editörü.`;

export const metadata = createPageMetadata({
  title: "Yazar",
  description: pageDescription,
  path: ROUTES.author,
});

export default function AuthorPage() {
  return (
    <>
      <AuthorJsonLd />
      <LegalPageLayout
        title={AUTHOR_NAME}
        path={ROUTES.author}
        breadcrumbLabel="Yazar"
        description={pageDescription}
      >
        <div className="mx-auto mb-8 max-w-xs overflow-hidden rounded-2xl border border-border bg-white shadow-md">
          <Image
            src="/images/author-selin-tekvatan.webp"
            alt={`${AUTHOR_NAME} — TapuCalc tapu harcı hesaplama içerik editörü`}
            title={`${AUTHOR_NAME} — TapuCalc tapu harcı hesaplama içerik editörü`}
            width={400}
            height={400}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="text-sm font-medium text-secondary">TapuCalc İçerik Editörü</p>
        <p className="text-xs text-text-secondary">
          Son güncelleme: Haziran 2026
        </p>
        <AuthorContent />
      </LegalPageLayout>
    </>
  );
}
