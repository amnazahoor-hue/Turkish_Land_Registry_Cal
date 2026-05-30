import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { DisclaimerContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Disclaimer",
  description:
    "TapuCalc disclaimer and legal notices for the title deed fee calculator.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <DisclaimerContent />
    </LegalPageLayout>
  );
}
