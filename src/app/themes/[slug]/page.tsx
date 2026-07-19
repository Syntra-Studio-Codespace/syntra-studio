import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { themes } from "@/data/themes";

type ThemeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export async function generateMetadata({ params }: ThemeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);

  if (!theme) {
    return {
      title: "Theme Not Found",
    };
  }

  return {
    title: theme.name,
    description: theme.shortDescription,
    alternates: {
      canonical: `/themes/${theme.slug}`,
    },
  };
}

export default async function ThemeDetailPage({ params }: ThemeDetailPageProps) {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);

  if (!theme) {
    notFound();
  }

  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-5xl">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
          WordPress Theme
        </p>
        <h1 className="mt-4 font-heading text-5xl font-semibold text-brand-offwhite">
          {theme.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[color:var(--text-on-dark-secondary)]">
          {theme.shortDescription}
        </p>
      </section>
    </main>
  );
}
