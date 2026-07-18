"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { getGsap } from "@/lib/animations/gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroTimelineProps = {
  children: React.ReactNode;
  className?: string;
  externalRef?: MutableRefObject<HTMLElement | null>;
};

export function HeroTimeline({ children, className, externalRef }: HeroTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion || isTouchDevice) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(
          "[data-hero-layer='ambient']",
          { yPercent: 0, scale: 1 },
          { yPercent: 12, scale: 1.08, ease: "none" },
          0,
        )
        .fromTo(
          "[data-hero-layer='foreground']",
          { yPercent: 0 },
          { yPercent: -8, ease: "none" },
          0,
        );
    }, section);

    return () => context.revert();
  }, [isTouchDevice, reducedMotion]);

  return (
    <section
      className={className}
      ref={(node) => {
        sectionRef.current = node;

        if (externalRef) {
          externalRef.current = node;
        }
      }}
    >
      {children}
    </section>
  );
}
