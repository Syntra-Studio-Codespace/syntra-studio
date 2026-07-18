import { z } from "zod";

export const pricingCategorySchema = z.enum([
  "business",
  "ngo",
  "landing-page",
  "full-stack",
  "wordpress-site",
  "hosting",
  "theme",
]);

export const pricingTierSchema = z.object({
  name: z.string(),
  category: pricingCategorySchema,
  tagline: z.string(),
  price: z.string(),
  billingType: z.enum(["one-time", "monthly", "project-based"]),
  ngoDiscountNote: z.string().optional(),
  billingNote: z.string().optional(),
  features: z.array(z.string()),
  excluded: z.array(z.string()).optional(),
  highlighted: z.boolean().optional(),
  ctaLabel: z.string(),
  ctaUrl: z.string(),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type PricingCategory = PricingTier["category"];
export const websitePricingCategories: PricingCategory[] = [
  "business",
  "ngo",
  "landing-page",
  "full-stack",
  "wordpress-site",
];

export function isWebsitePricingTier(tier: Pick<PricingTier, "category">) {
  return websitePricingCategories.includes(tier.category);
}

export function isHostingPricingTier(tier: Pick<PricingTier, "category">) {
  return tier.category === "hosting";
}

export const pricingTiers = pricingTierSchema.array().parse([
  {
    name: "Essential",
    category: "business",
    tagline: "Launch your business with a professional online presence.",
    price: "$299",
    billingType: "one-time",
    features: [
      "Up to 5 Pages",
      "Custom Responsive Design",
      "Contact Form",
      "Basic SEO Setup",
      "Google Maps Integration",
      "Social Media Links",
      "Speed Optimization",
      "Basic Security Hardening",
    ],
    excluded: ["Custom Dashboards", "E-commerce", "Membership Systems", "Booking Systems"],
    ctaLabel: "Get Started",
    ctaUrl: "/contact",
  },
  {
    name: "Growth",
    category: "business",
    tagline: "Designed to help your business grow online.",
    price: "$499",
    billingType: "one-time",
    features: [
      "Everything in Essential",
      "Up to 10 Pages",
      "Blog / CMS",
      "Premium UI/UX",
      "Animations",
      "Analytics Setup",
      "Enhanced SEO",
    ],
    excluded: ["Custom Web Applications", "Payment Gateways"],
    highlighted: true,
    ctaLabel: "Book a Consultation",
    ctaUrl: "/contact",
  },
  {
    name: "Enterprise",
    category: "business",
    tagline: "Tailored solutions without limitations.",
    price: "Custom Quote",
    billingType: "project-based",
    features: [
      "Unlimited Pages",
      "Advanced Integrations",
      "API Integrations",
      "Performance Optimization",
      "Custom Features",
    ],
    excluded: ["Monthly Maintenance"],
    ctaLabel: "Request Quote",
    ctaUrl: "/contact",
  },
  {
    name: "NGO Essential",
    category: "ngo",
    tagline: "Professional websites for organizations creating positive impact.",
    price: "$239",
    billingType: "one-time",
    ngoDiscountNote: "20% off Business Essential for registered nonprofits.",
    billingNote: "Verification of nonprofit status may be requested.",
    features: ["Same features as Business Essential"],
    ctaLabel: "Apply for NGO Pricing",
    ctaUrl: "/contact",
  },
  {
    name: "NGO Growth",
    category: "ngo",
    tagline: "Helping nonprofits expand their digital presence.",
    price: "$399",
    billingType: "one-time",
    ngoDiscountNote: "20% off Business Growth for registered nonprofits.",
    billingNote: "Enterprise nonprofit projects are quoted individually.",
    features: ["Same features as Business Growth"],
    highlighted: true,
    ctaLabel: "Apply for NGO Pricing",
    ctaUrl: "/contact",
  },
  {
    name: "Essential",
    category: "landing-page",
    tagline: "One page. One purpose. Maximum impact.",
    price: "$149",
    billingType: "one-time",
    features: [
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "Performance Optimization",
      "Lead Capture Form",
    ],
    ctaLabel: "Build My Landing Page",
    ctaUrl: "/contact",
  },
  {
    name: "Professional",
    category: "landing-page",
    tagline: "Designed to convert visitors into customers.",
    price: "$249",
    billingType: "one-time",
    features: [
      "Premium UI Design",
      "Scroll Animations",
      "Analytics Integration",
      "SEO Optimization",
      "Advanced Lead Forms",
    ],
    highlighted: true,
    ctaLabel: "Get Started",
    ctaUrl: "/contact",
  },
  {
    name: "Premium",
    category: "landing-page",
    tagline: "Premium experiences built for conversions.",
    price: "$399",
    billingType: "one-time",
    features: [
      "Everything in Professional",
      "Advanced Animations",
      "Copywriting Assistance",
      "Custom Graphics",
    ],
    ctaLabel: "Let's Build It",
    ctaUrl: "/contact",
  },
  {
    name: "Custom Application",
    category: "full-stack",
    tagline: "Powerful web applications built specifically for your business.",
    price: "Starting at $999",
    billingType: "project-based",
    billingNote: "Discovery meeting required. Final pricing depends on project complexity.",
    features: [
      "Authentication",
      "Database",
      "Admin Dashboard",
      "API Integration",
      "Responsive UI",
      "Deployment",
    ],
    highlighted: true,
    ctaLabel: "Schedule Discovery Call",
    ctaUrl: "/contact",
  },
  {
    name: "Essential",
    category: "wordpress-site",
    tagline: "Easy-to-manage WordPress websites.",
    price: "$249",
    billingType: "one-time",
    features: [
      "Premium Theme Setup",
      "Elementor",
      "Responsive Design",
      "Contact Forms",
      "SEO Plugin Setup",
    ],
    billingNote: "Theme licenses may be billed separately.",
    ctaLabel: "Build My Website",
    ctaUrl: "/contact",
  },
  {
    name: "Professional",
    category: "wordpress-site",
    tagline: "More customization. More possibilities.",
    price: "$449",
    billingType: "one-time",
    features: [
      "Custom Design",
      "Premium Plugins",
      "Blog",
      "Performance Optimization",
      "Security Setup",
    ],
    billingNote: "WooCommerce quoted separately.",
    highlighted: true,
    ctaLabel: "Get Started",
    ctaUrl: "/contact",
  },
  {
    name: "Premium",
    category: "wordpress-site",
    tagline: "Enterprise-grade WordPress experiences.",
    price: "$699",
    billingType: "one-time",
    features: [
      "Custom Development",
      "Membership Systems",
      "Booking Systems",
      "Advanced Integrations",
    ],
    billingNote: "Custom functionality quoted separately.",
    ctaLabel: "Request Quote",
    ctaUrl: "/contact",
  },
  {
    name: "Basic",
    category: "hosting",
    tagline: "Standard website care for simple sites.",
    price: "$25/month",
    billingType: "monthly",
    features: ["Website Updates", "Weekly Backups", "Security Monitoring"],
    billingNote: "Content updates billed separately.",
    ctaLabel: "Request Maintenance",
    ctaUrl: "/contact",
  },
  {
    name: "Standard",
    category: "hosting",
    tagline: "Recommended care for most client websites.",
    price: "$49/month",
    billingType: "monthly",
    features: ["Everything in Basic", "Content Updates", "Monthly Reports", "Priority Support"],
    highlighted: true,
    ctaLabel: "Request Maintenance",
    ctaUrl: "/contact",
  },
  {
    name: "Premium",
    category: "hosting",
    tagline: "VIP care for mission-critical websites.",
    price: "$99/month",
    billingType: "monthly",
    features: [
      "Unlimited Minor Content Updates",
      "Performance Optimization",
      "Daily Backups",
      "Security Monitoring",
      "Emergency Support",
    ],
    ctaLabel: "Request Maintenance",
    ctaUrl: "/contact",
  },
]);

export const pricingGroups: Array<{
  category: Exclude<PricingCategory, "theme">;
  label: string;
  description: string;
}> = [
  {
    category: "business",
    label: "Business Websites",
    description: "Website packages for companies, startups, local businesses, and personal brands.",
  },
  {
    category: "ngo",
    label: "NGO / Nonprofit Websites",
    description: "Discounted nonprofit packages with the same build quality as business websites.",
  },
  {
    category: "landing-page",
    label: "Landing Pages",
    description: "Focused campaign pages for products, events, lead capture, and launches.",
  },
  {
    category: "full-stack",
    label: "Full-Stack Web Applications",
    description: "Custom application work scoped through discovery.",
  },
  {
    category: "wordpress-site",
    label: "WordPress Sites",
    description: "WordPress builds for flexible content workflows.",
  },
  {
    category: "hosting",
    label: "Hosting and Maintenance",
    description: "Monthly care plans for updates, backups, reports, security, and support.",
  },
];

export const globalPricingNotes = {
  baseCurrency: "USD",
  supportedCurrencies: ["USD", "PKR", "EUR", "GBP", "CAD", "AUD", "AED", "SAR", "INR"],
  bundleDiscount:
    "10% discount when any website tier is paired with any hosting or maintenance plan.",
  quoteValidity: "All quotations remain valid for 30 calendar days.",
  depositPolicy:
    "50% deposit required before work begins. Deposits are non-refundable once development has commenced. Remaining balance must be paid before final delivery.",
  taxNote: "Prices exclude applicable taxes and third-party transaction fees.",
};
