"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollPinSectionProps = {
  children: React.ReactNode;
  className?: string;
  end?: string;
};

export function ScrollPinSection({ children, className, end = "+=180%" }: ScrollPinSectionProps) {
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
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => context.revert();
  }, [end, isTouchDevice, reducedMotion]);

  return (
    <section className={className} ref={sectionRef}>
      {children}
    </section>
  );
}
