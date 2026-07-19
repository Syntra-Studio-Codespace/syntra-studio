import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <article className="mx-auto max-w-7xl">
        <Link
          className="inline-flex min-h-11 items-center gap-2 font-heading text-sm font-semibold text-[color:var(--text-on-dark-secondary)] transition-colors hover:text-brand-cyan"
          href="/services"
        >
          <ArrowLeft aria-hidden size={17} />
          Back to services
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[0.78fr_0.52fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-cyan/45 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                Service
              </span>
              {service.badge ? (
                <span className="rounded-full border border-brand-violet/60 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
                  {service.badge}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              {service.summary}
            </p>
          </div>

          <aside className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_48px_rgba(34,211,238,0.04)]">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Next Step
            </p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
              Share the project type, scope, timeline, and budget range so the quote can be shaped
              around the right service line.
            </p>
            <Button className="mt-6 w-full" href="/contact">
              Start a Project
              <ArrowRight aria-hidden size={16} />
            </Button>
          </aside>
        </header>

        <section className="mt-16 rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 sm:p-8">
          <h2 className="font-heading text-3xl font-semibold leading-tight text-brand-offwhite">
            What is included
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.included.map((item) => (
              <div
                className="flex gap-4 rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal/70 p-5"
                key={item}
              >
                <CheckCircle2 aria-hidden className="mt-0.5 shrink-0 text-brand-cyan" size={20} />
                <p className="text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
