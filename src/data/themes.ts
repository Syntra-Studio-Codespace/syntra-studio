import { z } from "zod";

export const themeCategorySchema = z.enum([
  "business",
  "portfolio",
  "nonprofit",
  "landing-page",
  "blog",
  "ecommerce",
]);

export const themeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: themeCategorySchema,
  price: z.string(),
  shortDescription: z.string(),
  screenshot: z.string(),
  demoUrl: z.string(),
  buyUrl: z.string(),
  features: z.array(z.string()),
  changelog: z.array(z.string()).optional(),
  status: z.enum(["available", "coming-soon"]).default("available"),
});

export type Theme = z.infer<typeof themeSchema>;
export type ThemeCategory = z.infer<typeof themeCategorySchema>;

export const themeCategories: Array<{
  label: string;
  value: ThemeCategory | "all";
}> = [
  { label: "All", value: "all" },
  { label: "Business", value: "business" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Nonprofit", value: "nonprofit" },
  { label: "Landing Page", value: "landing-page" },
  { label: "Blog", value: "blog" },
  { label: "E-commerce", value: "ecommerce" },
];

// Intentionally empty until real WordPress theme products exist.
export const themes = themeSchema.array().parse([]);
