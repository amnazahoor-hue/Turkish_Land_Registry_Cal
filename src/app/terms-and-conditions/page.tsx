import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { TermsContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kullanım Şartları",
  description: "TapuCalc web sitesi kullanım şartları.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPageLayout title="Kullanım Şartları">
      <TermsContent />
    </LegalPageLayout>
  );
}
