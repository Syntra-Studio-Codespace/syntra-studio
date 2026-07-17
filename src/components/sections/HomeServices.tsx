import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  HeartHandshake,
  Layers3,
  MousePointerClick,
  PanelsTopLeft,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  briefcase: BriefcaseBusiness,
  heart: HeartHandshake,
  target: MousePointerClick,
  layers: Layers3,
  wordpress: PanelsTopLeft,
};

export function HomeServices() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <FadeIn>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Services
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-brand-offwhite sm:text-5xl">
              Focused builds for the way your project actually needs to work.
            </h2>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              Start with a sharp marketing site, a nonprofit presence, a campaign page, a custom
              application, or a WordPress workflow. Each service gets the same attention to
              structure, performance, accessibility, and visual polish.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {services.map((service, index) => (
            <FadeIn
              className={cn(
                "xl:col-span-2",
                service.featured && "md:col-span-2 xl:col-span-3",
                service.badge && "xl:col-span-3",
              )}
              delay={index * 0.06}
              key={service.slug}
            >
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
};

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 transition-[border-color,box-shadow] duration-200 hover:border-brand-cyan/45 hover:shadow-[0_0_44px_rgba(34,211,238,0.08)] sm:p-8",
        service.badge && "border-brand-violet/40 hover:border-brand-violet/70",
      )}
    >
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand-indigo/18 blur-3xl transition-opacity group-hover:opacity-80"
      />

      <div className="relative flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--border-on-dark)] bg-brand-charcoal text-brand-cyan">
          <Icon aria-hidden size={22} strokeWidth={1.75} />
        </div>

        {service.badge ? (
          <span className="rounded-full border border-brand-violet/70 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
            {service.badge}
          </span>
        ) : null}
      </div>

      <div className="relative mt-8">
        <h3 className="font-heading text-2xl font-semibold leading-tight text-brand-offwhite">
          {service.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
          {service.summary}
        </p>
      </div>

      <ul className="relative mt-7 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
        {service.included.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        className="relative mt-auto inline-flex min-h-11 items-center gap-2 pt-8 font-heading text-sm font-semibold text-brand-offwhite transition-colors hover:text-brand-cyan"
        href={`/services/${service.slug}`}
      >
        Explore service
        <ArrowUpRight aria-hidden size={17} />
      </Link>
    </article>
  );
}
