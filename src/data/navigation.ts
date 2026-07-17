export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Services", href: "/services" },
  { label: "Themes", href: "/themes" },
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNavigation: NavigationItem[] = [
  { label: "Business Websites", href: "/services/business-websites" },
  { label: "NGO Websites", href: "/services/ngo-websites" },
  { label: "Landing Pages", href: "/services/landing-pages" },
  { label: "Full-Stack Apps", href: "/services/full-stack-apps" },
  { label: "WordPress Sites", href: "/services/wordpress-sites" },
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];
