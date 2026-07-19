import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  HeartHandshake,
  Layers3,
  MousePointerClick,
  PanelsTopLeft,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  briefcase: BriefcaseBusiness,
  heart: HeartHandshake,
  target: MousePointerClick,
  layers: Layers3,
  wordpress: PanelsTopLeft,
};

export function ServicesPageContent() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                Services
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
                Web builds with the right shape for the job.
              </h1>
            </div>

            <div className="max-w-2xl lg:ml-auto">
              <p className="text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                Choose a focused marketing site, nonprofit presence, launch page, application, or
                WordPress workflow. Each service keeps structure, performance, accessibility, and
                handoff quality in view from the first decision.
              </p>
              <Button className="mt-6" href="/contact" size="large">
                Start a Project
                <ArrowRight aria-hidden size={18} />
              </Button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn delay={index * 0.06} key={service.slug}>
              <ServiceSummaryCard service={service} />
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}

type ServiceSummaryCardProps = {
  service: Service;
};

function ServiceSummaryCard({ service }: ServiceSummaryCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_48px_rgba(34,211,238,0.04)] sm:p-8",
        service.badge && "border-brand-violet/40",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
          <Icon aria-hidden size={22} strokeWidth={1.75} />
        </span>
        {service.badge ? (
          <span className="rounded-full border border-brand-violet/60 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
            {service.badge}
          </span>
        ) : null}
      </div>

      <h2 className="mt-7 font-heading text-2xl font-semibold leading-tight text-brand-offwhite">
        {service.title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
        {service.summary}
      </p>

      <ul className="mt-7 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
        {service.included.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-8 font-heading text-sm font-semibold text-brand-offwhite transition-colors hover:text-brand-cyan"
        href={`/services/${service.slug}`}
      >
        View service
        <ArrowUpRight aria-hidden size={17} />
      </Link>
    </article>
  );
}
