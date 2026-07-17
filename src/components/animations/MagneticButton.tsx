"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { SPRING } from "@/lib/animations/motion-config";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({ children, className, strength = 12 }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING.magnetic);
  const springY = useSpring(y, SPRING.magnetic);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const isDisabled = reducedMotion || isTouchDevice;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set((offsetX / rect.width) * strength);
    y.set((offsetY / rect.height) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onPointerLeave={reset}
      onPointerMove={onPointerMove}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
