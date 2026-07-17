"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { CursorGlow } from "@/components/animations/CursorGlow";
import { FadeIn } from "@/components/animations/FadeIn";
import { HeroTimeline } from "@/components/animations/HeroTimeline";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";

export function HomeHero() {
  const glowRef = useRef<HTMLDivElement>(null);

  return (
    <HeroTimeline className="relative isolate overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(59,47,212,0.34),transparent_34rem),radial-gradient(circle_at_74%_24%,rgba(34,211,238,0.16),transparent_30rem),linear-gradient(135deg,rgba(15,15,23,1),rgba(22,22,31,0.96))]"
        data-hero-layer="ambient"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(247,247,251,0.52)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,251,0.52)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.85fr)]">
        <div className="relative z-10" data-hero-layer="foreground">
          <TextReveal
            as="h1"
            className="max-w-5xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl lg:text-[5.8rem]"
          >
            Websites that make your business feel engineered, not assembled.
          </TextReveal>

          <FadeIn className="mt-8" delay={0.16}>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)] sm:text-xl">
              Syntra.studio builds custom business websites, nonprofit sites, landing pages,
              full-stack applications, and WordPress experiences with a premium product-site level
              of polish.
            </p>
          </FadeIn>

          <FadeIn className="mt-10 flex flex-col gap-4 sm:flex-row" delay={0.24}>
            <MagneticButton className="sm:w-fit">
              <Button href="/contact" size="large">
                Start a Project
                <ArrowRight aria-hidden size={18} />
              </Button>
            </MagneticButton>
            <Button href="/work" size="large" variant="secondary">
              View Work
            </Button>
          </FadeIn>
        </div>

        <div className="relative min-h-[28rem] lg:min-h-[42rem]" data-hero-layer="foreground">
          <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan/20 bg-brand-indigo/10 blur-sm lg:h-[34rem] lg:w-[34rem]" />
          <div
            className="relative h-full min-h-[28rem] overflow-hidden rounded-[2rem] border border-[color:var(--border-on-dark)] bg-brand-offwhite/[0.04] shadow-[0_0_80px_rgba(59,47,212,0.18)]"
            ref={glowRef}
          >
            <CursorGlow className="bg-brand-violet/15" containerRef={glowRef} />

            <div className="absolute -right-14 top-16 w-[82%] overflow-hidden rounded-2xl border border-[color:var(--border-on-dark)] bg-brand-charcoal shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
              <Image
                alt="Vantar product website screenshot"
                className="h-auto w-full"
                height={867}
                priority
                sizes="(min-width: 1024px) 520px, 80vw"
                src="/work/vantar.png"
                width={1665}
              />
            </div>

            <div className="absolute -left-10 bottom-12 w-[72%] overflow-hidden rounded-2xl border border-[color:var(--border-on-dark)] bg-brand-charcoal shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
              <Image
                alt="Wandervine travel website screenshot"
                className="h-auto w-full"
                height={911}
                sizes="(min-width: 1024px) 460px, 72vw"
                src="/work/wandervine.png"
                width={1663}
              />
            </div>

            <div className="absolute bottom-7 right-7 z-10 max-w-56 rounded-2xl border border-brand-cyan/20 bg-brand-charcoal/86 p-5 backdrop-blur-xl">
              <p className="font-heading text-sm font-semibold text-brand-offwhite">
                Motion, layout, and code quality moving as one system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl border-t border-[color:var(--border-on-dark)] pt-6">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--text-on-dark-secondary)]">
          Next: services, pricing, work, and process sections arrive in later approved phases.
        </p>
      </div>
    </HeroTimeline>
  );
}
