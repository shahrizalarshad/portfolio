// Dijana sekali masa build (diperlukan untuk static export).
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
