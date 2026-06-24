import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { PrivacyPolicyContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gizlilik Politikası",
  description: "TapuCalc gizlilik politikası ve kişisel veri koruma bilgileri.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Gizlilik Politikası">
      <PrivacyPolicyContent />
    </LegalPageLayout>
  );
}
