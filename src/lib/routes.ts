/** SEO-friendly routes with tapu-harci keyword */
export const ROUTES = {
  home: "/",
  about: "/tapu-harci-hakkinda",
  author: "/tapu-harci-yazar",
  contact: "/tapu-harci-iletisim",
  disclaimer: "/tapu-harci-feragatname",
  privacy: "/tapu-harci-gizlilik",
  terms: "/tapu-harci-sartlar",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
