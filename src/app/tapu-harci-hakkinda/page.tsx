import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { AboutContent } from "@/lib/legal-content";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "TapuCalc hakkında — Türkiye'de mülk devirleri için ücretsiz tapu harcı hesaplayıcısı. Resmi %4 oran, alıcı ve satıcı payları ve devir maliyetleri rehberi.";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description: pageDescription,
  path: ROUTES.about,
  index: true,
});

export default function AboutUsPage() {
  return (
    <LegalPageLayout
      title="Hakkımızda"
      path={ROUTES.about}
      breadcrumbLabel="Hakkımızda"
      description={pageDescription}
    >
      <AboutContent />
    </LegalPageLayout>
  );
}
