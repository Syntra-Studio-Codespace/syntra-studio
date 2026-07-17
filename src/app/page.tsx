export default function Home() {
  return (
    <main id="main-content" className="min-h-screen px-6 py-24 sm:px-10 lg:px-16">
      <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl content-center gap-8">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
          Syntra.studio
        </p>
        <div className="max-w-4xl">
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl lg:text-8xl">
            Project foundation ready for a premium agency site.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[color:var(--text-on-dark-secondary)] sm:text-xl">
            Phase 1 establishes the app shell, design tokens, global styles, accessibility baseline,
            and documentation scaffold. Full homepage sections arrive in later approved phases.
          </p>
        </div>
      </section>
    </main>
  );
}
