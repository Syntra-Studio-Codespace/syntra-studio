"use client";

import type { RefObject } from "react";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { cn } from "@/lib/utils/cn";

type CursorGlowProps = {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function CursorGlow({ containerRef, className }: CursorGlowProps) {
  const pointer = usePointerPosition(containerRef);

  if (!pointer.isActive) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/10 blur-3xl",
        className,
      )}
      style={{
        transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
}
