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

## Homepage Hero

Phase 4 replaces the temporary homepage placeholder with `HomeHero`. The hero uses the Phase 3
motion primitives for the headline reveal, scroll-scrubbed layered movement, cursor glow, and
magnetic primary CTA. Product screenshots are copied into `public/work/` so they can be rendered
with Next Image.

## Services Section

Phase 5 adds `src/data/services.ts` and the homepage `HomeServices` section. Service cards link to
future service detail routes but do not create those routes yet. The NGO card uses a visible
`NGO Rate` badge and 20% discount language from the pricing source while keeping the quality
positioning equal to the business website service.

## Pricing And Payments

Phase 6 adds Zod-validated pricing data in `src/data/pricing-tiers.ts`, payment-method data,
homepage pricing preview, the `/pricing` route, currency context, manual currency switcher, and
client-side local-currency estimates. USD remains canonical. The currency provider uses the no-key
ExchangeRate-API open endpoint and falls back gracefully when rates are unavailable. Bank transfer
details remain a visible `CONTENT TO BE PROVIDED` placeholder.

## WordPress Theme Marketplace

Phase 7 adds the theme data model, `/themes`, and `/themes/[slug]`. `src/data/themes.ts` is
intentionally empty until real theme products exist. The listing route shows an intentional
coming-soon marketplace state with disabled filter controls; the detail route is scaffolded and will
render real theme entries once supplied.

## Portfolio And Work

Phase 8 adds `src/data/work.ts`, the homepage featured-work section, `/work`, and `/work/[slug]`.
Portfolio visuals use the supplied screenshots from `public/work/`. Case study narrative fields,
project types, results, tech stacks, and live links stay visibly marked as `CONTENT TO BE PROVIDED`
until approved project copy is supplied.

## Process Storytelling

Phase 9 adds `src/data/process-steps.ts`, the homepage process section, and `/process`. The process
experience uses GSAP ScrollTrigger pinning on fine-pointer desktop devices, while touch devices and
`prefers-reduced-motion: reduce` receive a normal stacked step layout with no pinned scroll.

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
