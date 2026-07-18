import { z } from "zod";

export const processStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  summary: z.string(),
  detail: z.string(),
  icon: z.enum(["scope", "map", "build", "launch"]),
});

export type ProcessStep = z.infer<typeof processStepSchema>;

export const processSteps = processStepSchema.array().parse([
  {
    number: "01",
    title: "Shape the brief",
    summary: "Turn the business goal into a focused project direction.",
    detail:
      "We clarify audience, offer, scope, required pages, technical constraints, content gaps, and the strongest conversion path before design work begins.",
    icon: "scope",
  },
  {
    number: "02",
    title: "Map the experience",
    summary: "Plan the structure before pixels or code get expensive.",
    detail:
      "The site architecture, key sections, responsive behavior, content model, and animation approach are mapped so the build has a clear spine.",
    icon: "map",
  },
  {
    number: "03",
    title: "Design and build",
    summary: "Move from polished interface direction into production code.",
    detail:
      "The visual system, components, motion, accessibility details, and performance choices are built together rather than treated as separate afterthoughts.",
    icon: "build",
  },
  {
    number: "04",
    title: "Launch and support",
    summary: "Ship the final site with handoff, hosting, and maintenance paths clear.",
    detail:
      "Final QA, responsive checks, production build validation, deployment readiness, and optional hosting or maintenance plans close the project cleanly.",
    icon: "launch",
  },
]);
