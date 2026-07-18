import Image from "next/image";
import { ArrowRight, Bell, Boxes, Filter, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { themeCategories, themes } from "@/data/themes";

export function ThemesPageContent() {
  const hasThemes = themes.length > 0;

  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                WordPress Themes
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
                Premium themes are being shaped for future launches.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                The marketplace structure is ready, but there are no purchasable theme products yet.
                New themes will appear here only after real products, screenshots, pricing, demos,
                and changelogs are supplied.
              </p>
            </div>

            <div className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cyan text-brand-charcoal">
                  <Bell aria-hidden size={20} />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-brand-offwhite">
                    Launch notifications
                  </h2>
                  <p className="text-sm text-[color:var(--text-on-dark-secondary)]">
                    Join the project list to be notified when themes go live.
                  </p>
                </div>
              </div>
              <Button className="mt-6 w-full" href="/contact">
                Join notification list
                <ArrowRight aria-hidden size={16} />
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.12}>
          <div className="rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3 text-[color:var(--text-on-dark-secondary)]">
                <Filter aria-hidden size={18} />
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em]">
                  Filters
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {themeCategories.map((category) => (
                  <button
                    className="min-h-10 rounded-full border border-[color:var(--border-on-dark)] px-4 font-heading text-sm font-semibold text-[color:var(--text-on-dark-secondary)] opacity-55"
                    disabled
                    key={category.value}
                    type="button"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8" delay={0.18}>
          {hasThemes ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {themes.map((theme) => (
                <article
                  className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-5"
                  key={theme.slug}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-[color:var(--border-on-dark)] bg-brand-charcoal">
                    <Image
                      alt={`${theme.name} WordPress theme screenshot`}
                      className="h-full w-full object-cover"
                      height={720}
                      src={theme.screenshot}
                      width={1152}
                    />
                  </div>
                  <h2 className="mt-5 font-heading text-xl font-semibold text-brand-offwhite">
                    {theme.name}
                  </h2>
                  <p className="mt-2 text-sm text-[color:var(--text-on-dark-secondary)]">
                    {theme.shortDescription}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border-on-dark)] bg-[radial-gradient(circle_at_18%_18%,rgba(59,47,212,0.26),transparent_28rem),linear-gradient(135deg,rgba(22,22,31,0.96),rgba(15,15,23,0.98))] p-8 sm:p-10 lg:p-12">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(247,247,251,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,251,0.5)_1px,transparent_1px)] [background-size:56px_56px]"
              />
              <div className="relative grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center">
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan">
                    <Boxes aria-hidden size={28} />
                  </div>
                  <span className="rounded-full border border-[color:var(--border-on-dark)] px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--text-on-dark-secondary)]">
                    Coming Soon
                  </span>
                  <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight text-brand-offwhite">
                    No themes are available yet.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
                    This space is intentionally empty until the first real Syntra.studio WordPress
                    theme is ready with a demo, screenshots, pricing, and release notes.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Theme data model ready",
                    "Filters prepared",
                    "Detail route scaffolded",
                    "Checkout intentionally deferred",
                  ].map((item) => (
                    <div
                      className="rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal/72 p-5"
                      key={item}
                    >
                      <Sparkles aria-hidden className="text-brand-cyan" size={18} />
                      <p className="mt-4 font-heading text-sm font-semibold text-brand-offwhite">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      </section>
    </main>
  );
}
