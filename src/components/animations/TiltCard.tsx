"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { SPRING } from "@/lib/animations/motion-config";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const progressX = useMotionValue(0.5);
  const progressY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(progressY, [0, 1], [maxTilt, -maxTilt]), SPRING.tilt);
  const rotateY = useSpring(useTransform(progressX, [0, 1], [-maxTilt, maxTilt]), SPRING.tilt);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const isDisabled = reducedMotion || isTouchDevice;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    progressX.set((event.clientX - rect.left) / rect.width);
    progressY.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    progressX.set(0.5);
    progressY.set(0.5);
  };

  return (
    <motion.div
      className={className}
      onPointerLeave={reset}
      onPointerMove={onPointerMove}
      style={{
        rotateX: isDisabled ? 0 : rotateX,
        rotateY: isDisabled ? 0 : rotateY,
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}
