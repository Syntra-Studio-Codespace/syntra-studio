import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { legalNavigation, primaryNavigation, serviceNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site-settings";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr_2fr] lg:px-16 lg:py-20">
        <div>
          <Logo className="mb-6" />
          <p className="max-w-sm text-base text-[color:var(--text-on-dark-secondary)]">
            {siteSettings.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteSettings.startProjectHref}>Start a Project</Button>
            <Button href="/pricing" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Navigate" items={primaryNavigation} />
          <FooterColumn title="Services" items={serviceNavigation} />

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Contact
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
              <p>{siteSettings.contactEmail}</p>
              <p>{siteSettings.contactLocation}</p>
              <Link
                className="inline-flex items-center gap-2 text-brand-offwhite transition-colors hover:text-brand-cyan"
                href={siteSettings.instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink aria-hidden size={16} />
                Instagram
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Newsletter
            </h2>
            <p className="mt-4 text-sm text-[color:var(--text-on-dark-secondary)]">
              CONTENT TO BE PROVIDED
            </p>
            <form className="mt-5 grid gap-3">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <div className="flex overflow-hidden rounded-full border border-[color:var(--border-on-dark)] bg-brand-charcoal">
                <input
                  className="min-h-11 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-brand-offwhite placeholder:text-[color:var(--text-on-dark-secondary)] focus:ring-0"
                  id="footer-email"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
                <button
                  aria-label="Join newsletter"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-brand-cyan transition hover:bg-brand-cyan hover:text-brand-charcoal"
                  type="button"
                >
                  <ArrowRight aria-hidden size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border-on-dark)] px-6 py-6 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[color:var(--text-on-dark-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteSettings.copyright}</p>
          <div className="flex flex-wrap gap-5">
            {legalNavigation.map((item) => (
              <Link className="transition hover:text-brand-cyan" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <a
              className="inline-flex items-center gap-2 transition hover:text-brand-cyan"
              href={`mailto:${siteSettings.contactEmail}`}
            >
              <Mail aria-hidden size={15} />
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div>
      <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
        {items.map((item) => (
          <li key={item.href}>
            <Link className="transition hover:text-brand-cyan" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
