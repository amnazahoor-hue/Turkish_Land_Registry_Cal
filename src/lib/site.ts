import { SITE_NAME } from "@/lib/constants";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapucalc.com"
);

export const siteMetadata = {
  name: SITE_NAME,
  title: "Title Deed Fee Calculator | TapuCalc — Official 4% Rate",
  description:
    "Free TapuCalc tool: calculate Turkish title deed (tapu) transfer fees instantly. Official 4% rate — 2% buyer + 2% seller. No sign-up.",
  keywords: [
    "title deed fee calculator",
    "tapu harcı calculator",
    "turkey property transfer tax",
    "tapu fee",
    "buyer seller fee turkey",
    "land registry fee turkey",
  ],
};
