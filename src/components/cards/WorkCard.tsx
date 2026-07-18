import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Work } from "@/data/work";
import { cn } from "@/lib/utils/cn";

type WorkCardProps = {
  work: Work;
  priority?: boolean;
  variant?: "default" | "featured";
};

export function WorkCard({ work, priority = false, variant = "default" }: WorkCardProps) {
  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] transition-[border-color,box-shadow] duration-200 hover:border-brand-cyan/45 hover:shadow-[0_0_52px_rgba(34,211,238,0.08)]",
        variant === "featured" && "lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch",
      )}
    >
      <Link
        aria-label={`View ${work.title} case study`}
        className={cn(
          "block overflow-hidden bg-brand-charcoal",
          variant === "featured"
            ? "aspect-[16/11] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_26rem),#0f0f17] p-3 lg:aspect-auto lg:p-4"
            : "aspect-[16/10]",
        )}
        href={`/work/${work.slug}`}
      >
        <Image
          alt={`${work.title} supplied product screenshot`}
          className={cn(
            "h-full w-full transition duration-500 group-hover:scale-[1.025]",
            variant === "featured" ? "object-contain" : "object-cover",
          )}
          height={900}
          priority={priority}
          sizes={
            variant === "featured"
              ? "(min-width: 1024px) 48vw, 100vw"
              : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
          src={work.coverImage}
          width={1440}
        />
      </Link>

      <div className="flex min-h-[20rem] flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-brand-cyan/45 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            {work.categoryLabel}
          </span>
          {work.status === "content-pending" ? (
            <span className="rounded-full border border-brand-violet/50 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
              Case Study Pending
            </span>
          ) : null}
        </div>

        <h3 className="mt-6 font-heading text-2xl font-semibold leading-tight text-brand-offwhite">
          {work.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
          {work.summary}
        </p>

        <div className="mt-6 rounded-2xl border border-[color:var(--border-on-dark)] bg-brand-charcoal/70 p-4">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            Result
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
            {work.resultBlurb}
          </p>
        </div>

        <Link
          className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 font-heading text-sm font-semibold text-brand-offwhite transition-colors hover:text-brand-cyan"
          href={`/work/${work.slug}`}
        >
          View case study
          <ArrowUpRight aria-hidden size={17} />
        </Link>
      </div>
    </article>
  );
}
