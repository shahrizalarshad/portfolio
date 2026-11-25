// Dijana sekali masa build (diperlukan untuk static export).
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { cases } from "@/lib/cases";
import { siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...cases.map((c) => ({
      url: `${siteUrl}/work/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
