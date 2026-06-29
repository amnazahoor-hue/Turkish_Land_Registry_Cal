import { SITE_NAME } from "@/lib/constants";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/** Production domain (ASCII; .tr domains do not use Turkish ı). */
export const SITE_DOMAIN = "tapuharcihesaplama.tr";

export const SITE_EMAIL = `info@${SITE_DOMAIN}`;

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`
);

export const OG_IMAGE_PATH = "/images/og-image.webp";

export const siteMetadata = {
  name: SITE_NAME,
  title: "Tapu Harcı Hesaplama: Alıcı ve Satıcının Maliyetleri",
  description:
    "Doğru bir bilgi edinin tapu harcı hesaplama hesaplayıcımızdan yararlanarak, gayrimenkul değerine göre devir maliyetlerini tahmin edebilirsiniz.",
  keywords: [
    "tapu harcı hesaplama",
    "tapu harcı hesaplayıcı",
    "tapu devir harcı",
    "tapu sicil ücreti",
    "gayrimenkul devir maliyeti",
    "alıcı satıcı tapu harcı",
    "emlak tapu harcı türkiye",
  ],
};
