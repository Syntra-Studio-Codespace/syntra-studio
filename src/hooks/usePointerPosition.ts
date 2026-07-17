"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type PointerPosition = {
  x: number;
  y: number;
  progressX: number;
  progressY: number;
  isActive: boolean;
};

const initialPointer: PointerPosition = {
  x: 0,
  y: 0,
  progressX: 0.5,
  progressY: 0.5,
  isActive: false,
};

export function usePointerPosition(containerRef: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<PointerPosition>(initialPointer);
  const frameRef = useRef<number | null>(null);
  const latestEventRef = useRef<PointerEvent | null>(null);
  const reducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const element = containerRef.current;

    if (!element || reducedMotion || isTouchDevice) {
      setPosition(initialPointer);
      return;
    }

    const updatePosition = () => {
      const event = latestEventRef.current;

      if (!event) {
        frameRef.current = null;
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setPosition({
        x,
        y,
        progressX: Math.min(Math.max(x / rect.width, 0), 1),
        progressY: Math.min(Math.max(y / rect.height, 0), 1),
        isActive: true,
      });

      frameRef.current = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      latestEventRef.current = event;

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    const onPointerLeave = () => {
      latestEventRef.current = null;
      setPosition((current) => ({ ...current, isActive: false }));
    };

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [containerRef, isTouchDevice, reducedMotion]);

  return position;
}
