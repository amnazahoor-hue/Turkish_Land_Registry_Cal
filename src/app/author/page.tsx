import Image from "next/image";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { AuthorContent } from "@/lib/legal-content";
import { AUTHOR_NAME } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Yazar",
  description: `${AUTHOR_NAME} — TapuCalc tapu harcı hesaplama rehberleri ve içerik editörü.`,
  path: "/author",
});

export default function AuthorPage() {
  return (
    <LegalPageLayout title={AUTHOR_NAME}>
      <div className="mx-auto mb-8 max-w-xs overflow-hidden rounded-2xl border border-border bg-white shadow-md">
        <Image
          src="/images/author-selin-tekvatan.png"
          alt={`${AUTHOR_NAME} — TapuCalc içerik editörü`}
          width={400}
          height={400}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
      <p className="text-sm font-medium text-secondary">TapuCalc İçerik Editörü</p>
      <AuthorContent />
    </LegalPageLayout>
  );
}
