import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center bg-brand-charcoal px-6 py-24 sm:px-10 lg:px-16"
    >
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_0.45fr] lg:items-end">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            404
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
            This page is not part of the current build.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
            The route may be waiting on future content, or the link may have changed. Head back to
            the homepage or start from the services overview.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/" size="large">
              <ArrowLeft aria-hidden size={18} />
              Back home
            </Button>
            <Button href="/services" size="large" variant="secondary">
              View services
            </Button>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-8 shadow-[0_0_56px_rgba(34,211,238,0.06)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
            <Search aria-hidden size={22} />
          </span>
          <h2 className="mt-7 font-heading text-2xl font-semibold text-brand-offwhite">
            Useful paths
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
            {["/pricing", "/work", "/process", "/contact"].map((path) => (
              <li key={path}>
                <a className="transition hover:text-brand-cyan" href={path}>
                  {path}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
