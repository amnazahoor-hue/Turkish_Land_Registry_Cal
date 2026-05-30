import type {
  FAQItem,
  HowItWorksStep,
  InfoCard,
  NavLink,
  SocialLink,
} from "@/types";

export const SITE_NAME = "TapuCalc";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    brand: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    brand: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    brand: "x",
    label: "X (Twitter)",
    href: "https://x.com/",
  },
  {
    brand: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    brand: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/",
  },
];

export const legalLinks: NavLink[] = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    iconName: "home",
    title: "Enter Sale Price",
    description: "Enter the property sale amount in Turkish Lira (TRY).",
  },
  {
    number: "02",
    iconName: "calculator",
    title: "Click Calculate",
    description: "One click applies the official transfer fee rates.",
  },
  {
    number: "03",
    iconName: "chart",
    title: "View Results",
    description: "See buyer fee, seller fee, and total instantly.",
  },
  {
    number: "04",
    iconName: "check",
    title: "Plan Your Transaction",
    description: "Use the breakdown to budget your property transfer.",
  },
];

export const infoCards: InfoCard[] = [
  {
    iconName: "landmark",
    tag: "Basics",
    title: "What Is Title Deed Fee?",
    description:
      "The title deed fee (tapu harcı) is an official state tax paid to the Turkish Land Registry during property sales. It is calculated on the declared sale price and must be paid before the transfer is completed.",
  },
  {
    iconName: "users",
    tag: "Split",
    title: "Who Pays?",
    description:
      "The buyer pays 2% and the seller pays 2% of the sale price separately (4% total). Each party pays their share through the bank before the land registry appointment.",
  },
  {
    iconName: "scale",
    tag: "Law",
    title: "Legal Requirement",
    description:
      "Paying the fee is mandatory for title transfers. Underpayment can block completion. Rates are set by law and cannot be negotiated between parties.",
  },
  {
    iconName: "building",
    tag: "Process",
    title: "Land Registry vs. Notary",
    description:
      "Title transfer happens only at the Land Registry Office (Tapu Müdürlüğü). A notarized pre-sale agreement is a different process with separate costs.",
  },
  {
    iconName: "calendar",
    tag: "Timing",
    title: "When Is It Paid?",
    description:
      "Fees are paid via bank before the registry appointment. The receipt must be presented; payment should be completed before your scheduled date.",
  },
  {
    iconName: "globe",
    tag: "International",
    title: "Foreign Buyers",
    description:
      "Foreign nationals buying property in Turkey pay the same buyer rate (2%). Special cases may apply—consult your local land registry office.",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "What is the title deed fee in Turkey?",
    a: "It is an official tax on property sales. The total is 4% of the sale price: 2% paid by the buyer and 2% by the seller.",
    iconName: "receipt",
  },
  {
    q: "Does the buyer or seller pay?",
    a: "Both pay separately. The buyer pays 2% and the seller pays 2% of the declared sale price.",
    iconName: "users",
  },
  {
    q: "How is it calculated?",
    a: "Sale price × 0.02 = buyer fee. Sale price × 0.02 = seller fee. Total = sale price × 0.04.",
    iconName: "calculator",
  },
  {
    q: "Can the fee be negotiated?",
    a: "No. It is a statutory state tax fixed by law and cannot be changed or negotiated.",
    iconName: "scale",
  },
  {
    q: "What documents are needed for transfer?",
    a: "ID/passport, mandatory earthquake insurance (DASK), proof of sale price, and fee payment receipts are typically required.",
    iconName: "files",
  },
  {
    q: "Is the rate different for foreigners?",
    a: "The buyer rate is generally the same (2%). Some special cases may apply—confirm with the land registry office.",
    iconName: "globe",
  },
];
