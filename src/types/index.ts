export interface TapuFeeResult {
  buyerFee: number;
  sellerFee: number;
  totalFee: number;
  salePrice: number;
  buyerRate: number;
  sellerRate: number;
}

export type FAQIcon =
  | "receipt"
  | "users"
  | "calculator"
  | "scale"
  | "files"
  | "globe";

export interface FAQItem {
  q: string;
  a: string;
  iconName: FAQIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export type SocialBrand =
  | "facebook"
  | "instagram"
  | "x"
  | "pinterest"
  | "reddit"
  | "quora"
  | "youtube";

export interface SocialLink {
  brand: SocialBrand;
  label: string;
  href: string;
}

export type InfoCardIcon =
  | "landmark"
  | "users"
  | "scale"
  | "building"
  | "calendar"
  | "globe";

export interface InfoCard {
  iconName: InfoCardIcon;
  tag: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  number: string;
  iconName: "home" | "calculator" | "chart" | "check";
  title: string;
  description: string;
}
