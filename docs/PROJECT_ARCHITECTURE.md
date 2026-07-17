# Project Architecture

## Overview

Syntra.studio is planned as a phased Next.js App Router website for a premium web development
agency. The implementation should remain server-component-first, with client components reserved
for interactivity, animation, forms, or browser-only behavior.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Lucide React
- GSAP and ScrollTrigger
- Lenis
- Framer Motion
- SplitType
- ESLint
- Prettier

Animation libraries are introduced in Phase 3 and scoped to reusable primitives rather than page-wide
client components.

## Folder Structure

```txt
src/
├── app/
├── components/
├── data/
├── hooks/
├── lib/
├── styles/
└── types/
```

Phase 1 only creates the files required for the app foundation. Later phases will add the component,
data, hook, library, and type folders as they become necessary.

## Styling

Design tokens are defined in `src/styles/tokens.css` and mirror `DESIGN.md`. Tailwind extends the
same brand palette and breakpoint values so utilities stay aligned with the design system.

## Global Layout

Phase 2 adds the shared header, footer, button, and logo components. The header is a client
component because it manages scroll state, active route state, mobile menu state, Escape-key close
behavior, focus placement, and body scroll lock while the mobile menu is open.

## Animation Architecture

Phase 3 adds shared motion tokens, GSAP registration, Lenis smooth-scroll integration, reduced-motion
and touch-device hooks, pointer-position tracking, and reusable primitives under
`src/components/animations/`.

GSAP and ScrollTrigger are reserved for scroll-linked timelines, pinned sections, horizontal scroll,
SplitType text reveals, and count-up effects. Framer Motion is reserved for component-level
micro-interactions such as fade reveals, magnetic CTAs, and tilt cards. Touch devices and
`prefers-reduced-motion: reduce` disable pointer-reactive and heavy scroll-linked effects.

## Accessibility Baseline

- Skip-to-content link is present in the root layout.
- Focus-visible styles use the cyan brand focus ring from `DESIGN.md`.
- Primary body copy starts at 16px.
- Reduced-motion CSS fallback is globally available.

## Contrast Notes

The following contrast-sensitive pairings from `DESIGN.md` must be respected during implementation:

- Cyan on charcoal is acceptable for UI elements and large text, but should not be used for small
  body copy.
- Violet on off-white should not be used for body text.
- Body copy should use the primary/secondary text tokens, not accent colors.

Formal route-by-route contrast validation is deferred until real sections are implemented.
