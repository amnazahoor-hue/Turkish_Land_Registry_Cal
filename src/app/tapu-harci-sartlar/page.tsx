import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { TermsContent } from "@/lib/legal-content";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "TapuCalc kullanım şartları — tapu harcı hesaplama web sitesinin kullanım koşulları, sorumluluklar ve hizmet kapsamı.";

export const metadata = createPageMetadata({
  title: "Kullanım Şartları",
  description: pageDescription,
  path: ROUTES.terms,
  index: false,
});

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Kullanım Şartları"
      path={ROUTES.terms}
      breadcrumbLabel="Kullanım Şartları"
      description={pageDescription}
    >
      <TermsContent />
    </LegalPageLayout>
  );
}
