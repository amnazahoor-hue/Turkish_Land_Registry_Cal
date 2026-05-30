import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { AboutContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "About TapuCalc — free title deed fee calculator for property transfers in Turkey.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <LegalPageLayout title="About Us">
      <AboutContent />
    </LegalPageLayout>
  );
}
