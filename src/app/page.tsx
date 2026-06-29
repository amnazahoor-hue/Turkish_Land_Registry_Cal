import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageEntrance from "@/components/PageEntrance";
import HeroSection from "@/components/sections/HeroSection";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteMetadata } from "@/lib/site";

const HowItWorksSection = dynamic(
  () => import("@/components/sections/HowItWorksSection"),
  { ssr: true }
);
const CalculatorGuideSection = dynamic(
  () => import("@/components/sections/CalculatorGuideSection"),
  { ssr: true }
);
const ExamplesSection = dynamic(
  () => import("@/components/sections/ExamplesSection"),
  { ssr: true }
);
const WhoPaysSection = dynamic(
  () => import("@/components/sections/WhoPaysSection"),
  { ssr: true }
);
const ExtraCostsSection = dynamic(
  () => import("@/components/sections/ExtraCostsSection"),
  { ssr: true }
);
const CalculatorComparisonSection = dynamic(
  () => import("@/components/sections/CalculatorComparisonSection"),
  { ssr: true }
);
const PaymentSection = dynamic(
  () => import("@/components/sections/PaymentSection"),
  { ssr: true }
);
const LowerValueSection = dynamic(
  () => import("@/components/sections/LowerValueSection"),
  { ssr: true }
);
const SpecialCasesSection = dynamic(
  () => import("@/components/sections/SpecialCasesSection"),
  { ssr: true }
);
const RefundSection = dynamic(
  () => import("@/components/sections/RefundSection"),
  { ssr: true }
);
const RisksSection = dynamic(
  () => import("@/components/sections/RisksSection"),
  { ssr: true }
);
const InfoCardsSection = dynamic(
  () => import("@/components/sections/InfoCardsSection"),
  { ssr: true }
);
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  ssr: true,
});
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"), {
  ssr: true,
});

export const metadata: Metadata = createPageMetadata({
  title: siteMetadata.title,
  description: siteMetadata.description,
  path: "",
});

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Ana Sayfa", path: ROUTES.home }]} />
      <FAQJsonLd />
      <Header />
      <PageEntrance>
        <HeroSection />
        <InfoCardsSection />
        <HowItWorksSection />
        <CalculatorGuideSection />
        <ExamplesSection />
        <WhoPaysSection />
        <ExtraCostsSection />
        <CalculatorComparisonSection />
        <PaymentSection />
        <LowerValueSection />
        <SpecialCasesSection />
        <RefundSection />
        <RisksSection />
        <FAQSection />
        <CTABanner />
      </PageEntrance>
      <Footer />
    </>
  );
}
