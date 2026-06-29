import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { OG_IMAGE_PATH, SITE_URL, siteMetadata } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** When false, emits noindex (legal / utility pages). Defaults to true. */
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? siteMetadata.title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
    robots: {
      index,
      follow: true,
      googleBot: { index, follow: true },
    },
  };
}
