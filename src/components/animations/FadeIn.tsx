"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DURATION } from "@/lib/animations/motion-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeIn({ children, className, delay = 0, y = 28 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : y }}
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      ref={ref}
      transition={{
        delay,
        duration: reducedMotion ? 0.01 : DURATION.primary,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
