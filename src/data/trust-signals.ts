import { z } from "zod";

export const trustSignalSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string(),
});

export type TrustSignal = z.infer<typeof trustSignalSchema>;

export const trustSignals = trustSignalSchema.array().parse([
  {
    label: "Portfolio",
    value: "2",
    description: "Published work examples currently visible on the site.",
  },
  {
    label: "Client logos",
    value: "CONTENT TO BE PROVIDED",
    description: "Placeholder for approved client or partner logo labels.",
  },
  {
    label: "Project metrics",
    value: "CONTENT TO BE PROVIDED",
    description: "Placeholder for approved performance or launch outcomes.",
  },
  {
    label: "Testimonials",
    value: "CONTENT TO BE PROVIDED",
    description: "Placeholder until real testimonial copy is supplied.",
  },
]);
