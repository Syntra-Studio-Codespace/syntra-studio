"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Braces, ClipboardCheck, Map, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { processSteps, type ProcessStep } from "@/data/process-steps";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getGsap } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  scope: ClipboardCheck,
  map: Map,
  build: Braces,
  launch: Rocket,
};

type ProcessStoryProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function ProcessStory({
  eyebrow = "How We Work",
  title = "A calm, structured path from idea to launch.",
  intro = "The process section is the site's cinematic beat: pinned on desktop, simple and stacked on mobile or reduced motion.",
}: ProcessStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const orbitRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    setCanPin(!reducedMotion && !isTouchDevice);
  }, [isTouchDevice, reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !canPin) {
      return;
    }

    const cards = cardRefs.current.filter(Boolean);
    const orbits = orbitRefs.current.filter(Boolean);
    const progress = progressRef.current;

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 0, y: 28, pointerEvents: "none" });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      gsap.set(orbits, { autoAlpha: 0.22, scale: 0.88 });
      gsap.set(orbits[0], { autoAlpha: 1, scale: 1 });
      gsap.set(progress, { scaleY: 0.25, transformOrigin: "top" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      processSteps.forEach((_, index) => {
        if (index === 0) {
          timeline.to(progress, { scaleY: 0.25, duration: 0.2 }, 0);
          return;
        }

        timeline
          .to(cards[index - 1], { autoAlpha: 0, y: -22, pointerEvents: "none", duration: 0.35 })
          .to(orbits[index - 1], { autoAlpha: 0.22, scale: 0.88, duration: 0.35 }, "<")
          .to(cards[index], { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.45 }, "<0.08")
          .to(orbits[index], { autoAlpha: 1, scale: 1, duration: 0.45 }, "<")
          .to(progress, { scaleY: (index + 1) / processSteps.length, duration: 0.45 }, "<");
      });
    }, section);

    return () => context.revert();
  }, [canPin]);

  return (
    <section
      className="relative overflow-hidden bg-brand-charcoal px-6 py-24 text-brand-offwhite sm:px-10 lg:px-16 lg:py-0"
      ref={sectionRef}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 lg:min-h-screen lg:grid-cols-[0.86fr_1fr] lg:items-center">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
            {intro}
          </p>
          <Button className="mt-8" href="/contact">
            Start a project
            <ArrowRight aria-hidden size={16} />
          </Button>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-[color:var(--border-on-dark)] lg:block"
          >
            <div className="h-full origin-top bg-brand-cyan" ref={progressRef} />
          </div>

          <div className={cn("relative", canPin ? "lg:h-[31rem]" : "grid gap-4")}>
            {processSteps.map((step, index) => (
              <ProcessStepCard
                canPin={canPin}
                index={index}
                key={step.number}
                setRef={(node) => {
                  cardRefs.current[index] = node;
                }}
                step={step}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 lg:block"
          >
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon];

              return (
                <div
                  className={cn(
                    "absolute flex h-28 w-28 items-center justify-center rounded-[2rem] border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_48px_rgba(34,211,238,0.08)]",
                    index === 0 && "left-8 top-8",
                    index === 1 && "right-10 top-12",
                    index === 2 && "bottom-12 left-12",
                    index === 3 && "bottom-8 right-16",
                  )}
                  key={step.number}
                  ref={(node) => {
                    orbitRefs.current[index] = node;
                  }}
                >
                  <Icon size={34} strokeWidth={1.5} />
                </div>
              );
            })}
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-brand-violet/25 bg-brand-indigo/15" />
          </div>
        </div>
      </div>
    </section>
  );
}

type ProcessStepCardProps = {
  canPin: boolean;
  index: number;
  setRef: (node: HTMLDivElement | null) => void;
  step: ProcessStep;
};

function ProcessStepCard({ canPin, index, setRef, step }: ProcessStepCardProps) {
  const Icon = iconMap[step.icon];

  return (
    <div
      className={cn(
        "rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_56px_rgba(34,211,238,0.05)] sm:p-8",
        canPin ? "lg:absolute lg:inset-y-0 lg:left-16 lg:right-0" : "",
      )}
      ref={setRef}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cyan text-brand-charcoal">
          <Icon aria-hidden size={20} />
        </span>
        <span className="rounded-full border border-brand-cyan/40 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
          Step {step.number}
        </span>
        {!canPin ? (
          <span className="text-sm text-[color:var(--text-on-dark-secondary)]">{index + 1}/4</span>
        ) : null}
      </div>
      <h3 className="mt-8 max-w-xl font-heading text-3xl font-semibold leading-tight text-brand-offwhite">
        {step.title}
      </h3>
      <p className="mt-4 max-w-xl text-lg leading-8 text-brand-offwhite/82">{step.summary}</p>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
        {step.detail}
      </p>
    </div>
  );
}
