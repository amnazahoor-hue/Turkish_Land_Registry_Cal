import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageEntrance from "@/components/PageEntrance";
import HeroSection from "@/components/sections/HeroSection";
import ToolSection from "@/components/sections/ToolSection";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { siteMetadata } from "@/lib/site";

const HowItWorksSection = dynamic(
  () => import("@/components/sections/HowItWorksSection"),
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
      <FAQJsonLd />
      <Header />
      <PageEntrance>
        <HeroSection />
        <ToolSection />
        <HowItWorksSection />
        <InfoCardsSection />
        <FAQSection />
        <CTABanner />
      </PageEntrance>
      <Footer />
    </>
  );
}
