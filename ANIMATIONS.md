# Syntra.studio — Animation System

This file is the authoritative motion specification for the Syntra.studio website. It is a source-of-truth reference, not a draft — implement against it directly. Reference: Apple product pages (apple.com/iphone, apple.com/macbook-pro) and modern cinematic product sites like Antigravity, applied at the level of specific reusable techniques, not vague mood-boarding.

---

## 1. Philosophy

Motion here exists to build confidence, not to entertain. Every animation should make the visitor feel like this agency also built the thing they're currently experiencing — the site is itself the best portfolio piece. That means restraint matters as much as craft: motion that is _too_ playful undercuts "premium," and motion that's absent entirely undercuts "this agency does motion work."

**Balance target (per page, roughly):**

- 70% subtle, confidence-building editorial motion (reveals, fades, easing on scroll)
- 20% scroll-driven storytelling (pinned sections, scroll-scrubbed sequences)
- 10% signature interactive/pointer-reactive moments (hero, one or two standout sections)

If a page feels like it's mostly the 10% category, that's over-animated. Pull back.

---

## 2. Library Responsibilities

Do not use two libraries for the same effect. Split responsibilities cleanly:

**GSAP + ScrollTrigger** — anything driven by scroll position or requiring precise sequenced timelines:

- Hero entrance timelines
- Scroll-pinned storytelling sections (Process/How We Work)
- Scroll-scrubbed reveals (text mask-reveals, image/section transitions tied to scroll progress)
- Horizontal scroll sections (if used for portfolio/work)
- Count-up stats
- Text splitting/reveal (via SplitType)

**Framer Motion** — component-level, state-driven micro-interactions:

- Button hover/press states
- Card hover states (including tilt — see §5)
- Tab switching, accordion/FAQ open-close
- Modal/dialog open-close
- Pricing tier toggle transitions
- Route/page transition fades

**Lenis** — global smooth scrolling, integrated with GSAP's ticker (single rAF loop, no double-driving the frame). ScrollTrigger must `refresh()` correctly on route change and content-height change.

---

## 3. Motion Tokens

Define these once in `src/lib/animations/eases.ts` and `motion-config.ts` and reuse everywhere — no ad hoc easing curves scattered through components.

```ts
// eases.ts
export const EASE_PRIMARY = "cubic-bezier(0.16, 1, 0.3, 1)"; // confident, decelerating — Apple-style
export const EASE_SECONDARY = "cubic-bezier(0.65, 0, 0.35, 1)"; // symmetric in/out, for reversible UI states
export const EASE_MICRO = "cubic-bezier(0.4, 0, 0.2, 1)"; // standard material-ish ease, for small UI

// No bounce, no elastic, anywhere on this site.
```

```ts
// motion-config.ts
export const DURATION = {
  micro: 0.18, // button hover/press, small state changes
  standard: 0.45, // card reveals, tab switches
  primary: 0.7, // hero entrances, major section reveals
  cinematic: 1.1, // pinned/scroll-scrubbed section transitions (scroll-driven, so this is a reference duration for the equivalent scroll distance)
};
```

**Rules:**

- Never use a browser-default `ease-in-out` — always one of the tokens above
- Micro-interactions: 150–250ms. Primary transitions: 600–800ms. Never make a hover state feel slower than a press state.
- All timeline entrances should feel weighted and deliberate — err toward "slightly too slow" over "snappy," within the ranges above

---

## 4. Scroll-Driven Techniques

**Scroll-scrubbed reveals** (no 3D asset in use — see note below):

- Tie visual progress directly to scroll position via a GSAP timeline with `scrub: true` bound to `ScrollTrigger`
- Where a sequence effect is wanted (e.g. a hero visual that transforms across the fold), use layered 2D elements (gradient mesh, floating UI mockup cards built from real product screenshots, abstract geometric shapes derived from the logo mark) whose position/opacity/scale are scrubbed by scroll — not a canvas image sequence or 3D model (out of scope for this build)
- If a true frame-by-frame cinematic sequence is wanted later, that requires pre-rendered footage as a content dependency — flag this as a future enhancement rather than attempting to fake it with sparse assets

**One idea per beat:**

- Each major scroll section reads as a single full-viewport "beat" — one headline, one visual, one point — before transitioning to the next
- Prefer holding a moment slightly longer over cramming more content into one screen

**Pin-and-morph sections:**

- Use `ScrollTrigger.pin: true` for the Process/How We Work section at minimum: a background element (large typographic word, or an abstract shape built from the logo's geometry) stays fixed while foreground content changes underneath it as the user scrolls through process steps
- Optionally apply the same technique to the hero if the hero has multiple sequential reveal beats before the visitor reaches the next section

**Text as a scene element:**

- Hero headline and at least one other major section headline use SplitType for line-by-line or word-by-word reveal, animated in via GSAP as the section enters view
- Consider a headline that dissolves/reforms into the next section's visual as a transition device, rather than a plain fade

**Sections to use full cinematic (pinned/scrubbed) treatment vs. simple reveal — decide explicitly per section, don't apply pinning everywhere:**

| Section             | Treatment                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Hero                | Scroll-scrubbed layered reveal (GSAP timeline, `scrub`)                                        |
| Services            | Simple staggered fade/slide reveal on scroll-into-view                                         |
| Pricing             | Simple reveal + Framer Motion tier-toggle transition                                           |
| Portfolio/Work      | Staggered card reveal; optional horizontal scroll on desktop only                              |
| Process/How We Work | Pinned, scroll-scrubbed (the one section that most benefits from the full cinematic treatment) |
| Testimonials        | Simple fade/slide reveal, possibly a slow auto-advancing crossfade if multiple                 |
| Footer/Final CTA    | Simple reveal, no pinning                                                                      |

---

## 5. Pointer/Mouse-Reactive Elements

This is where the site should feel alive without feeling gimmicky. All pointer-reactive effects are **desktop-only** — disabled entirely on touch devices (feature-detect via `(hover: hover) and (pointer: fine)`, not just viewport width) and under `prefers-reduced-motion: reduce`.

**Cursor glow / ambient light-follow** (hero and other dark full-bleed sections):

- A soft radial gradient glow (brand-cyan or brand-violet, low opacity, large blur radius) follows the cursor position within the section, implemented via `transform: translate()` on a fixed-size glow element — never by animating `top`/`left`
- Throttled via `requestAnimationFrame`, not raw `mousemove` handlers — one rAF-driven update per frame, no accumulation
- Component: `CursorGlow.tsx` — takes a `containerRef`, tracks pointer position relative to that container only (not the whole viewport), disables itself on unmount and on section-not-visible

**Magnetic buttons** (primary hero CTA, one or two other standout CTAs — not every button):

- On hover, the button subtly shifts toward the cursor position within a small radius (8–14px max displacement), using Framer Motion's `useMotionValue` + spring, not raw transform jumps
- Snaps back to center on mouse leave with the same spring physics
- Component: `MagneticButton.tsx`, wraps the standard Button component rather than replacing it

**Tilt cards** (portfolio/work cards, pricing cards — used selectively, not on every card on the page):

- On hover, the card tilts slightly (max ~6–8 degrees) along both axes based on cursor position relative to the card's center, using Framer Motion `useMotionValue` + `useTransform`, with a spring for smoothing
- Paired with a subtle glow that shifts position to imply the light source is following the tilt (ties into the "light and depth" principle in `DESIGN.md` §5)
- Component: `TiltCard.tsx` — must be genuinely restrained; this is one of the effects most likely to look cheap if overdone, so keep the tilt angle small and the spring stiff (fast settle, not floaty)

**Parallax layers reacting to pointer (hero background only):**

- Background decorative elements (gradient mesh, abstract shapes) shift slightly opposite to cursor movement, creating subtle depth — small displacement (a few percent of container size), not a dramatic 3D-feeling parallax
- This is layered on top of the `CursorGlow` effect in the same section, sharing the same throttled pointer-tracking hook rather than each element attaching its own listener

**Shared pointer-tracking utility:**

- Build a single `usePointerPosition(containerRef)` hook that all pointer-reactive components in a section subscribe to, rather than each component adding its own `mousemove` listener — this avoids redundant listeners and redundant rAF loops stacking up on the same section

---

## 6. Micro-Interactions Catalog

| Element                  | Interaction                                                      | Library                         | Notes                                             |
| ------------------------ | ---------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- |
| Primary button           | Hover: slight scale (1.02) + glow increase; Press: scale to 0.98 | Framer Motion                   | `DURATION.micro`                                  |
| Secondary/outline button | Hover: border brightens, subtle background tint                  | Framer Motion                   | `DURATION.micro`                                  |
| Nav link                 | Hover: underline/dot reveal from center                          | Framer Motion                   | `DURATION.micro`                                  |
| Card (non-tilt)          | Hover: border brightens, glow intensity increases slightly       | CSS transition or Framer Motion | No lift/translate — glow only, per `DESIGN.md` §5 |
| Accordion/FAQ            | Expand/collapse height + fade                                    | Framer Motion                   | `AnimatePresence`, height auto via measured ref   |
| Modal                    | Fade + slight scale-in backdrop and panel                        | Framer Motion                   | `AnimatePresence`, focus-trapped                  |
| Tab switch               | Crossfade content, sliding underline indicator                   | Framer Motion                   | `DURATION.standard`                               |
| Pricing toggle           | Crossfade between tier price displays                            | Framer Motion                   | `DURATION.standard`                               |
| Mobile nav open          | Full-screen overlay slide/fade in, staggered nav item entrance   | Framer Motion                   | Scroll-lock while open                            |
| Form field focus         | Border color transition + subtle glow                            | CSS transition                  | `DURATION.micro`                                  |
| Form submit              | Button → loading spinner → success check, no layout shift        | Framer Motion                   | Reserve label width up front                      |

---

## 7. Reduced Motion & Mobile Fallback Matrix

| Effect                      | Desktop                     | `prefers-reduced-motion: reduce`                             | Mobile (regardless of motion preference)                                      |
| --------------------------- | --------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Scroll-scrubbed hero reveal | Full scrub-linked animation | Static final-state layout, no scroll-linked transform        | Simplified reveal (fade only, no scrub)                                       |
| Pinned Process section      | Pin + scrub through steps   | No pin; steps stack and fade in normally on scroll-into-view | No pin; same simple stacked fade as reduced-motion                            |
| Cursor glow                 | Active, rAF-throttled       | Disabled entirely                                            | Disabled entirely (no cursor on touch)                                        |
| Magnetic buttons            | Active                      | Disabled — button behaves as a normal static button          | Disabled — normal static button                                               |
| Tilt cards                  | Active                      | Disabled — card shows static hover glow only, no tilt        | Disabled — no hover state at all, tap behavior only                           |
| Parallax background layers  | Active, subtle              | Disabled — background renders static                         | Disabled — background renders static                                          |
| Text SplitType reveals      | Line/word stagger reveal    | Simple opacity fade, no stagger                              | Simple opacity fade, no stagger                                               |
| Count-up stats              | Animated count from 0       | Number appears directly at final value                       | Animated count retained if lightweight, or simplified per performance testing |

Implement this as a single `useReducedMotion()` + `useIsTouchDevice()` pair of hooks that every animation primitive checks before initializing — do not scatter ad hoc `matchMedia` calls through individual components.

---

## 8. Performance Rules

- All pointer position tracking goes through `requestAnimationFrame`, never raw unthrottled `mousemove` — one update per frame maximum
- GSAP: use `gsap.context()` scoped to each component, revert on unmount; kill every `ScrollTrigger` instance on unmount
- Animate only `transform` and `opacity` — never `top`/`left`/`width`/`height`/`margin` for anything performance-sensitive
- Pointer-reactive effects (`CursorGlow`, `TiltCard`, magnetic buttons) must fully unmount their listeners when their section scrolls out of view, not just visually hide
- No unbounded DOM node creation for any effect — every animated element pool is fixed-size and reused
- Test with Chrome DevTools' CPU throttling (4x–6x) on at least the hero and Process sections before marking those phases complete

---

## 9. Component/File Reference

Matches the component architecture in `PLAN.md`:

```
src/components/animations/
├── FadeIn.tsx           — simple viewport-triggered fade/slide reveal
├── TextReveal.tsx        — SplitType-driven line/word reveal
├── HeroTimeline.tsx       — coordinated hero entrance + scroll-scrubbed timeline
├── ScrollPinSection.tsx   — reusable pin-and-morph wrapper (used by Process section)
├── HorizontalScroll.tsx   — optional horizontal scroll wrapper (Portfolio, desktop only)
├── CountUp.tsx            — animated number count-up
├── MagneticButton.tsx     — cursor-attraction wrapper around Button
├── CursorGlow.tsx         — ambient pointer-follow glow for dark sections
├── TiltCard.tsx           — pointer-reactive tilt wrapper for selected cards
└── SmoothScrollProvider.tsx — Lenis + GSAP ticker integration, ScrollTrigger refresh handling

src/hooks/
├── usePointerPosition.ts
├── useReducedMotion.ts
└── useIsTouchDevice.ts
```

---

## 10. Do's and Don'ts

**Do:**

- Let restraint read as premium — a section with one well-timed reveal beats three competing animations
- Use glow and light direction to imply depth, consistent with `DESIGN.md` §5
- Make every pointer-reactive effect degrade gracefully and completely on touch/reduced-motion
- Reuse the same easing/duration tokens everywhere — consistency is what makes motion feel "engineered" rather than "sprinkled on"

**Don't:**

- Animate more than one or two elements simultaneously competing for attention in a single viewport
- Use tilt, magnetic, or cursor-glow effects on every card/button on a page — reserve them for two or three genuinely standout moments
- Fake a 3D or cinematic image-sequence effect with insufficient assets — a well-executed 2D layered reveal beats a poorly-faked 3D effect
- Let any animation block or delay the primary content (hero headline) from becoming readable within ~1 second
