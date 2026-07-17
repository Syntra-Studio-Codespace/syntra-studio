"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/animations/gsap";
import { GSAP_EASE_PRIMARY } from "@/lib/animations/eases";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CountUpProps = {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
};

export function CountUp({
  value,
  className,
  formatter = (nextValue: number) => Math.round(nextValue).toLocaleString(),
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(() => formatter(value));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element || reducedMotion) {
      setDisplayValue(formatter(value));
      return;
    }

    const counter = { value: 0 };
    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.2,
        ease: GSAP_EASE_PRIMARY,
        onUpdate: () => setDisplayValue(formatter(counter.value)),
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      });
    }, element);

    return () => context.revert();
  }, [formatter, reducedMotion, value]);

  return (
    <span className={className} ref={ref}>
      {displayValue}
    </span>
  );
}
