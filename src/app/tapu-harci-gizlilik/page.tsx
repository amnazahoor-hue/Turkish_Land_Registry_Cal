import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { PrivacyPolicyContent } from "@/lib/legal-content";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "TapuCalc gizlilik politikası — tapu harcı hesaplama sitesinde kişisel verilerin toplanması, kullanımı ve korunması hakkında bilgiler.";

export const metadata = createPageMetadata({
  title: "Gizlilik Politikası",
  description: pageDescription,
  path: ROUTES.privacy,
  index: false,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Gizlilik Politikası"
      path={ROUTES.privacy}
      breadcrumbLabel="Gizlilik Politikası"
      description={pageDescription}
    >
      <PrivacyPolicyContent />
    </LegalPageLayout>
  );
}
