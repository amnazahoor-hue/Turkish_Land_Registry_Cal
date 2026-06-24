import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { DisclaimerContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Feragatname",
  description:
    "TapuCalc feragatnamesi ve tapu harcı hesaplayıcısı için yasal uyarılar.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Feragatname">
      <DisclaimerContent />
    </LegalPageLayout>
  );
}
