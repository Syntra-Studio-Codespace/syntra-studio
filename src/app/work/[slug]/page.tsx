import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { workItems } from "@/data/work";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return workItems.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = workItems.find((item) => item.slug === slug);

  if (!work) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${work.title} Case Study`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = workItems.find((item) => item.slug === slug);

  if (!work) {
    notFound();
  }

  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <article className="mx-auto max-w-7xl">
        <Link
          className="inline-flex min-h-11 items-center gap-2 font-heading text-sm font-semibold text-[color:var(--text-on-dark-secondary)] transition-colors hover:text-brand-cyan"
          href="/work"
        >
          <ArrowLeft aria-hidden size={17} />
          Back to work
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_0.5fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-cyan/45 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                {work.categoryLabel}
              </span>
              <span className="rounded-full border border-brand-violet/50 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
                Case Study Pending
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
              {work.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              {work.summary}
            </p>
          </div>

          <div className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Result
            </p>
            <p className="mt-3 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
              {work.resultBlurb}
            </p>
            {work.liveUrl ? (
              <Button className="mt-6 w-full" href={work.liveUrl} variant="primary">
                Visit live site
                <ExternalLink aria-hidden size={16} />
              </Button>
            ) : (
              <p className="mt-6 rounded-2xl border border-[color:var(--border-on-dark)] bg-brand-charcoal/70 p-4 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                CONTENT TO BE PROVIDED - live project link, if applicable.
              </p>
            )}
          </div>
        </header>

        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)]">
          <Image
            alt={`${work.title} supplied product screenshot`}
            className="h-auto w-full"
            height={900}
            priority
            sizes="100vw"
            src={work.coverImage}
            width={1440}
          />
        </div>

        <section className="mt-16 grid gap-5 lg:grid-cols-3">
          {[
            ["Problem", work.problem],
            ["Approach", work.approach],
            ["Result", work.result],
          ].map(([label, text]) => (
            <div
              className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6"
              key={label}
            >
              <h2 className="font-heading text-xl font-semibold text-brand-offwhite">{label}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-on-dark-secondary)]">
                {text}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Image Gallery
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-brand-offwhite">
              Supplied project visuals.
            </h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
              Additional gallery images can be added here when approved assets are supplied.
            </p>
          </div>

          <div className="grid gap-4">
            {work.gallery.map((image) => (
              <div
                className="overflow-hidden rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)]"
                key={image.src}
              >
                <Image
                  alt={image.alt}
                  className="h-auto w-full"
                  height={900}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={image.src}
                  width={1440}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 sm:p-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            Tech Stack
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {work.techStack.map((item) => (
              <span
                className="rounded-full border border-[color:var(--border-on-dark)] px-3 py-1 text-sm text-[color:var(--text-on-dark-secondary)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
