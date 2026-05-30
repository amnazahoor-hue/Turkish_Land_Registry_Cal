import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { PrivacyPolicyContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "TapuCalc privacy policy and personal data protection information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <PrivacyPolicyContent />
    </LegalPageLayout>
  );
}
