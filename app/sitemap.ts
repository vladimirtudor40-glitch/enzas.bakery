import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/bakery-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/politica-cookies/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
