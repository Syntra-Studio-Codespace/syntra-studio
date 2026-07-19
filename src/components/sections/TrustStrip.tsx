import { FadeIn } from "@/components/animations/FadeIn";
import { trustSignals } from "@/data/trust-signals";

export function TrustStrip() {
  return (
    <section className="border-y border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustSignals.map((signal, index) => (
          <FadeIn delay={index * 0.05} key={signal.label}>
            <div className="h-full rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal/62 p-5">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                {signal.label}
              </p>
              <p className="mt-3 font-heading text-2xl font-semibold leading-tight text-brand-offwhite">
                {signal.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                {signal.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
