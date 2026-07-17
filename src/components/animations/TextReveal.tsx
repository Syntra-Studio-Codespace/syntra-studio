"use client";

import SplitType from "split-type";
import { createElement, useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap";
import { GSAP_EASE_PRIMARY } from "@/lib/animations/eases";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TextRevealProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: React.ReactNode;
  className?: string;
  splitBy?: "lines" | "words";
};

export function TextReveal({
  as: Component = "span",
  children,
  className,
  splitBy = "lines",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (reducedMotion) {
      element.style.opacity = "1";
      return;
    }

    const split = new SplitType(element, { types: splitBy });
    const targets = splitBy === "lines" ? split.lines : split.words;
    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, yPercent: 110 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.75,
          ease: GSAP_EASE_PRIMARY,
          stagger: 0.08,
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, element);

    return () => {
      context.revert();
      split.revert();
    };
  }, [reducedMotion, splitBy]);

  return createElement(
    Component,
    {
      className,
      ref,
    },
    children,
  );
}
