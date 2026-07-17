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
- ESLint
- Prettier

Animation libraries are intentionally deferred until Phase 3.

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
