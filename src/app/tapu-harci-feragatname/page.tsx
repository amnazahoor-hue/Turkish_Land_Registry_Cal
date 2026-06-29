import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { DisclaimerContent } from "@/lib/legal-content";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "TapuCalc feragatnamesi — tapu harcı hesaplama aracı için yasal uyarılar, sorumluluk sınırları ve bilgilendirme amaçlı kullanım koşulları.";

export const metadata = createPageMetadata({
  title: "Feragatname",
  description: pageDescription,
  path: ROUTES.disclaimer,
  index: false,
});

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Feragatname"
      path={ROUTES.disclaimer}
      breadcrumbLabel="Feragatname"
      description={pageDescription}
    >
      <DisclaimerContent />
    </LegalPageLayout>
  );
}
