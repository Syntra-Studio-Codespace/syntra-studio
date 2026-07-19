import { Quote } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-brand-charcoal px-6 py-24 text-brand-offwhite sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <FadeIn>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Testimonials
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl">
              Client proof will live here when real quotes are supplied.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              These cards are intentionally labeled as placeholder testimonials. Real names, roles,
              companies, and quotes should replace them only after approval.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn delay={index * 0.08} key={`${testimonial.author}-${index}`}>
              <article className="flex h-full flex-col rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_48px_rgba(34,211,238,0.04)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                    <Quote aria-hidden size={20} />
                  </span>
                  {testimonial.status === "placeholder" ? (
                    <span className="rounded-full border border-brand-violet/50 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
                      Placeholder
                    </span>
                  ) : null}
                </div>

                <blockquote className="mt-7 flex-1 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
                  {testimonial.quote}
                </blockquote>

                <footer className="mt-8 border-t border-[color:var(--border-on-dark)] pt-5">
                  <p className="font-heading text-base font-semibold text-brand-offwhite">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--text-on-dark-secondary)]">
                    {testimonial.role}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--text-on-dark-secondary)]">
                    {testimonial.company}
                  </p>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
