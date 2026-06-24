import { SITE_NAME } from "@/lib/constants";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapucalc.com"
);

export const siteMetadata = {
  name: SITE_NAME,
  title: "Tapu Harcı Hesaplama: Alıcı ve Satıcının Maliyetleri",
  description:
    "Doğru bir bilgi edinin tapu harcı hesaplama hesaplayıcımızdan yararlanarak, gayrimenkul değerine göre devir maliyetlerini tahmin edebilirsiniz.",
  keywords: [
    "title deed fee calculator",
    "tapu harcı calculator",
    "turkey property transfer tax",
    "tapu fee",
    "buyer seller fee turkey",
    "land registry fee turkey",
  ],
};
