import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${getPublicSiteUrl()}/sitemap.xml`,
  };
}
