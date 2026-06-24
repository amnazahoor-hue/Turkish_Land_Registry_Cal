import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { AboutContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "TapuCalc hakkında — Türkiye'de mülk devirleri için ücretsiz tapu harcı hesaplayıcısı.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <LegalPageLayout title="Hakkımızda">
      <AboutContent />
    </LegalPageLayout>
  );
}
