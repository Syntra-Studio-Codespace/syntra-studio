export const DURATION = {
  micro: 0.18,
  standard: 0.45,
  primary: 0.7,
  cinematic: 1.1,
} as const;

export const SPRING = {
  magnetic: {
    stiffness: 260,
    damping: 22,
    mass: 0.45,
  },
  tilt: {
    stiffness: 320,
    damping: 26,
    mass: 0.5,
  },
} as const;

export const POINTER_QUERY = "(hover: hover) and (pointer: fine)";
