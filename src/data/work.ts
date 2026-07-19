import { z } from "zod";

export const workCategorySchema = z.enum([
  "business",
  "ngo",
  "landing-page",
  "full-stack",
  "wordpress-site",
]);

export const workSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: workCategorySchema,
  categoryLabel: z.string(),
  summary: z.string(),
  resultBlurb: z.string(),
  coverImage: z.string(),
  gallery: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
    }),
  ),
  problem: z.string(),
  approach: z.string(),
  result: z.string(),
  techStack: z.array(z.string()),
  liveUrl: z.string().nullable(),
  status: z.enum(["content-pending", "ready"]),
});

export type WorkCategory = z.infer<typeof workCategorySchema>;
export type Work = z.infer<typeof workSchema>;

export const workItems = workSchema.array().parse([
  {
    title: "Vantar",
    slug: "vantar",
    category: "full-stack",
    categoryLabel: "Product / 3D Experience Site",
    summary:
      "A cinematic, scroll-directed product experience for a fictional premium Oxford shoe, built around one persistent 3D model that moves through an editorial story as the page scrolls.",
    resultBlurb:
      "A fully responsive, capability-aware 3D showcase — from a dramatic opening composition to material details and a final reservation moment.",
    coverImage: "/work/vantar.png",
    gallery: [
      {
        src: "/work/vantar.png",
        alt: "Vantar product screenshot supplied for Syntra.studio portfolio use",
      },
    ],
    problem:
      "Premium product pages often rely on static imagery that can't convey material, craft, or presence. The goal was to design a single, continuous 3D scene that reveals a product's story through scroll rather than static sections — while still working across devices with varying 3D capability.",
    approach:
      "Syntra Studio built one persistent React Three Fiber canvas driven by a normalized GSAP/ScrollTrigger choreography for model, camera, and framing across the full narrative. The build includes capability-aware full 3D, simplified mobile, and static presentation modes, progress-aware model loading with a polished fallback, and accessibility features like skip navigation, visible focus states, and modal focus management — all wrapped in production-ready metadata, security headers, and asset caching.",
    result:
      "The result is a launch-ready, cinematic 3D product experience that degrades gracefully across devices and motion preferences without sacrificing usability. The reservation flow is intentionally non-transactional, and the 3D asset itself is retained internally rather than distributed.",
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "React Three Fiber",
      "Drei",
      "Three.js",
      "GSAP",
      "ScrollTrigger",
      "Lenis",
      "Framer Motion",
      "Tailwind CSS",
      "Zod",
    ],
    liveUrl: "https://vantar-xi.vercel.app/",
    status: "ready",
  },
  {
    title: "Wandervine",
    slug: "wandervine",
    category: "business",
    categoryLabel: "Travel Agency / Editorial Site",
    summary:
      "A cinematic, editorial travel-agency website for curated journeys, built around the feeling of a trip already beginning — airport light, aircraft windows, and quiet anticipation before a destination reveals itself.",
    resultBlurb:
      "A video-led homepage, public journey inventory, destination detail pages, and a validated plan-a-trip inquiry flow — ready for launch with clear, documented content boundaries.",
    coverImage: "/work/wandervine.png",
    gallery: [
      {
        src: "/work/wandervine.png",
        alt: "Wandervine product screenshot supplied for Syntra.studio portfolio use",
      },
    ],
    problem:
      "Travel-agency sites often default to generic stock imagery and boilerplate booking forms, losing the emotional pull of travel itself. The brief called for an editorial, cinematic experience that pairs curated media with a considered content structure — while keeping backend delivery scoped for a later phase.",
    approach:
      "Syntra Studio designed a video-led homepage with editorial sections for selected journeys, brand story, planning approach, and trust-building, backed by a Zod-validated destination content model with public browse and detail routes. The build includes an accessible global layout with skip navigation, responsive header and mobile navigation, reduced-motion-aware animation via Lenis, GSAP, ScrollTrigger, and Motion, plus a custom not-found page, sitemap, robots route, and full metadata setup.",
    result:
      "Wandervine launched as a fully responsive editorial travel site built on curated sample journey content and supplied media, with the plan-a-trip form validating input client-side while backend delivery remains intentionally pending for a future phase.",
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "GSAP",
      "ScrollTrigger",
      "Lenis",
      "Motion",
      "Tailwind CSS",
      "Zod",
    ],
    liveUrl: "https://wandervine.vercel.app/",
    status: "ready",
  },
]);

export const featuredWorkItems = workItems.slice(0, 2);
