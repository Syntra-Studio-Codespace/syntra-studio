import { z } from "zod";

export const projectTypes = [
  { label: "Business website", value: "business-website" },
  { label: "NGO / nonprofit website", value: "ngo-website" },
  { label: "Landing page", value: "landing-page" },
  { label: "Full-stack web application", value: "full-stack-app" },
  { label: "WordPress site", value: "wordpress-site" },
  { label: "Hosting / maintenance", value: "hosting-maintenance" },
  { label: "Not sure yet", value: "not-sure" },
] as const;

export const budgetRanges = [
  "Under $500",
  "$500 - $1,500",
  "$1,500 - $3,000",
  "$3,000 - $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 2-4 weeks",
  "Within 1-2 months",
  "Flexible / planning ahead",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().optional(),
  projectType: z.enum(
    projectTypes.map((type) => type.value),
    {
      error: "Please choose a project type.",
    },
  ),
  budget: z.enum(budgetRanges, {
    error: "Please choose an estimated budget.",
  }),
  timeline: z.enum(timelineOptions, {
    error: "Please choose a timeline.",
  }),
  message: z.string().trim().min(20, "Please share a little more about the project."),
  consent: z.literal("on", {
    error: "Please confirm you want Syntra.studio to contact you about this inquiry.",
  }),
  companyWebsite: z.string().trim().max(0, "Spam detected.").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ProjectTypeValue = (typeof projectTypes)[number]["value"];
