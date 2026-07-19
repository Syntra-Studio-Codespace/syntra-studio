import { z } from "zod";

export const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  status: z.enum(["placeholder", "ready"]),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

export const testimonials = testimonialSchema.array().parse([
  {
    quote: "CONTENT TO BE PROVIDED - testimonial quote.",
    author: "John Doe",
    role: "CONTENT TO BE PROVIDED - client role",
    company: "CONTENT TO BE PROVIDED - client company",
    status: "placeholder",
  },
  {
    quote: "CONTENT TO BE PROVIDED - testimonial quote.",
    author: "Jane Doe",
    role: "CONTENT TO BE PROVIDED - client role",
    company: "CONTENT TO BE PROVIDED - client company",
    status: "placeholder",
  },
  {
    quote: "CONTENT TO BE PROVIDED - testimonial quote.",
    author: "Alex Doe",
    role: "CONTENT TO BE PROVIDED - client role",
    company: "CONTENT TO BE PROVIDED - client company",
    status: "placeholder",
  },
]);
