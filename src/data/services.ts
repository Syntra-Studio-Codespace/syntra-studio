export type Service = {
  title: string;
  slug: string;
  summary: string;
  included: string[];
  icon: "briefcase" | "heart" | "target" | "layers" | "wordpress";
  badge?: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "Business Websites",
    slug: "business-websites",
    summary:
      "Custom responsive websites for companies that need a polished, credible online presence.",
    included: [
      "Custom responsive design",
      "Contact forms",
      "Basic SEO setup",
      "Performance tuning",
    ],
    icon: "briefcase",
    featured: true,
  },
  {
    title: "NGO / Nonprofit Websites",
    slug: "ngo-websites",
    summary:
      "The same quality standard as business websites, offered at a visible discounted nonprofit rate.",
    included: [
      "Business-quality build",
      "20% NGO discount",
      "Impact-focused structure",
      "Eligibility review",
    ],
    icon: "heart",
    badge: "NGO Rate",
  },
  {
    title: "Landing Pages",
    slug: "landing-pages",
    summary: "Focused one-page experiences for launches, events, offers, and lead generation.",
    included: [
      "Responsive page design",
      "Lead capture form",
      "Scroll sections",
      "Conversion-focused layout",
    ],
    icon: "target",
  },
  {
    title: "Full-Stack Web Applications",
    slug: "full-stack-apps",
    summary: "Custom software interfaces for businesses that need more than a marketing site.",
    included: [
      "Authentication-ready UI",
      "Dashboard structure",
      "API integration planning",
      "Deployment support",
    ],
    icon: "layers",
  },
  {
    title: "WordPress Sites",
    slug: "wordpress-sites",
    summary:
      "Flexible WordPress builds for businesses that want an easier content-management workflow.",
    included: [
      "Theme setup or custom design",
      "Plugin configuration",
      "SEO plugin setup",
      "Security setup",
    ],
    icon: "wordpress",
  },
];
