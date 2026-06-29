import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const routes = [
  { path: ROUTES.home, priority: 1, changeFrequency: "weekly" as const },
  { path: ROUTES.about, priority: 0.8, changeFrequency: "monthly" as const },
  { path: ROUTES.author, priority: 0.6, changeFrequency: "monthly" as const },
  { path: ROUTES.contact, priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
