import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { TermsContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "TapuCalc website terms and conditions of use.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <TermsContent />
    </LegalPageLayout>
  );
}
