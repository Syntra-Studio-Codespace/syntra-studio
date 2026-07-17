"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HorizontalScrollProps = {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
};

export function HorizontalScroll({ children, className, trackClassName }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || reducedMotion || isTouchDevice) {
      return;
    }

    const distance = track.scrollWidth - section.clientWidth;

    if (distance <= 0) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => context.revert();
  }, [isTouchDevice, reducedMotion]);

  return (
    <section className={className} ref={sectionRef}>
      <div className={trackClassName} ref={trackRef}>
        {children}
      </div>
    </section>
  );
}
