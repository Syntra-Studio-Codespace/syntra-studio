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
    categoryLabel: "CONTENT TO BE PROVIDED - project type",
    summary: "CONTENT TO BE PROVIDED - short case study summary.",
    resultBlurb: "CONTENT TO BE PROVIDED - result or outcome statement.",
    coverImage: "/work/vantar.png",
    gallery: [
      {
        src: "/work/vantar.png",
        alt: "Vantar product screenshot supplied for Syntra.studio portfolio use",
      },
    ],
    problem: "CONTENT TO BE PROVIDED - project problem statement.",
    approach: "CONTENT TO BE PROVIDED - Syntra.studio approach and scope.",
    result: "CONTENT TO BE PROVIDED - project result, outcome, or launch notes.",
    techStack: ["CONTENT TO BE PROVIDED - tech stack"],
    liveUrl: null,
    status: "content-pending",
  },
  {
    title: "Wandervine",
    slug: "wandervine",
    category: "business",
    categoryLabel: "CONTENT TO BE PROVIDED - project type",
    summary: "CONTENT TO BE PROVIDED - short case study summary.",
    resultBlurb: "CONTENT TO BE PROVIDED - result or outcome statement.",
    coverImage: "/work/wandervine.png",
    gallery: [
      {
        src: "/work/wandervine.png",
        alt: "Wandervine product screenshot supplied for Syntra.studio portfolio use",
      },
    ],
    problem: "CONTENT TO BE PROVIDED - project problem statement.",
    approach: "CONTENT TO BE PROVIDED - Syntra.studio approach and scope.",
    result: "CONTENT TO BE PROVIDED - project result, outcome, or launch notes.",
    techStack: ["CONTENT TO BE PROVIDED - tech stack"],
    liveUrl: null,
    status: "content-pending",
  },
]);

export const featuredWorkItems = workItems.slice(0, 2);
