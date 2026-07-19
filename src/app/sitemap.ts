import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { workItems } from "@/data/work";
import { getPublicSiteUrl } from "@/lib/seo/site-url";

const staticRoutes = [
  "",
  "/services",
  "/themes",
  "/pricing",
  "/work",
  "/about",
  "/process",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      changeFrequency: "monthly" as const,
      lastModified: now,
      priority: route === "" ? 1 : 0.7,
      url: `${siteUrl}${route}`,
    })),
    ...services.map((service) => ({
      changeFrequency: "monthly" as const,
      lastModified: now,
      priority: 0.65,
      url: `${siteUrl}/services/${service.slug}`,
    })),
    ...workItems.map((work) => ({
      changeFrequency: "monthly" as const,
      lastModified: now,
      priority: 0.65,
      url: `${siteUrl}/work/${work.slug}`,
    })),
  ];
}
