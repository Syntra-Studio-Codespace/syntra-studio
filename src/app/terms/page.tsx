import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Syntra.studio terms placeholder. Final legal copy will be added when supplied.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-4xl">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
          Legal
        </p>
        <h1 className="mt-4 font-heading text-5xl font-semibold leading-tight tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
          Terms
        </h1>
        <div className="mt-8 rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 text-base leading-8 text-[color:var(--text-on-dark-secondary)] sm:p-8">
          <p>CONTENT TO BE PROVIDED - terms and conditions.</p>
          <p className="mt-5">
            This page is intentionally published as a placeholder so the site has a valid legal
            route before final legal content is supplied.
          </p>
        </div>
      </section>
    </main>
  );
}
