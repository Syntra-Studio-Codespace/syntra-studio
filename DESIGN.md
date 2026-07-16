# Syntra.studio — Design System

This file is the authoritative design system for the Syntra.studio website. It is a source-of-truth reference, not a draft — implement against it directly rather than proposing an alternate system.

---

## 1. Brand Foundation

The Syntra.studio mark is an interlocking double-S monogram with an indigo → cyan → violet gradient. It signals two things at once: technical competence (clean geometric construction) and creative range (the gradient). Every design decision on the site should reinforce those two impressions — precision and craft — without tipping into coldness or gimmickry.

**Logo usage**

- Gradient mark on light (off-white) backgrounds
- White monochrome mark on dark (charcoal) backgrounds
- Full wordmark lockup ("syntra.studio") in header and footer
- Icon-only mark for favicon, loading states, small UI touches
- Never recolor, distort, rotate, skew, or apply effects (glow, drop shadow, outline) to the mark itself. Motion may happen around it (fade in, parallax on scroll) but never to its own proportions or gradient.

---

## 2. Color

| Token              | Hex       | Role                                                                         |
| ------------------ | --------- | ---------------------------------------------------------------------------- |
| `--brand-indigo`   | `#3B2FD4` | Primary — dominant brand color, large surfaces, primary text on light bg     |
| `--brand-cyan`     | `#22D3EE` | Accent — CTAs, hover states, active links, key highlights                    |
| `--brand-charcoal` | `#0F0F17` | Dark backgrounds, primary text on light bg, near-black surfaces              |
| `--brand-offwhite` | `#F7F7FB` | Light backgrounds, text on dark surfaces                                     |
| `--brand-violet`   | `#8B5CF6` | Secondary accent — badges, gradient transitions, featured/highlighted states |

**Usage ratio (approximate, per page):** Charcoal and Indigo dominate (~70% of visual weight combined), Off-White is used for deliberate light-section contrast (~20%), Cyan and Violet together make up the remaining accent weight (~10%). If a section feels like it's using more than one accent color as a primary surface color, that's a signal to simplify.

**Semantic extensions** (derived from the five brand colors, not new colors):

```css
--surface-dark: var(--brand-charcoal);
--surface-dark-raised: #16161f; /* charcoal, ~6% lighter — card surfaces on dark bg */
--surface-light: var(--brand-offwhite);
--surface-light-raised: #ffffff; /* pure white — card surfaces on light bg */
--text-on-dark-primary: var(--brand-offwhite);
--text-on-dark-secondary: rgba(247, 247, 251, 0.64);
--text-on-light-primary: var(--brand-charcoal);
--text-on-light-secondary: rgba(15, 15, 23, 0.64);
--border-on-dark: rgba(247, 247, 251, 0.1);
--border-on-light: rgba(15, 15, 23, 0.08);
```

**Contrast rules (validate before shipping):**

- `--brand-cyan` on `--brand-charcoal`: passes for large text / UI elements, borderline for small body text — use for headlines, buttons, icons; do not use for small-print body copy on dark backgrounds.
- `--brand-violet` on `--brand-offwhite`: fails WCAG AA for body text — use only for large text, badges with sufficient size, or non-text UI (borders, icon fills).
- `--brand-violet` on `--brand-charcoal`: passes for large text, acceptable for badge labels at 14px+ bold.
- Default body text is always `--text-on-dark-primary` / `--text-on-light-primary`, never cyan or violet directly.
- Run an explicit contrast check in Phase 1 and record the results in `docs/PROJECT_ARCHITECTURE.md`; flag any pairing used in the design that fails AA.

---

## 3. Typography

**Pairing:**

- **Headings:** Geist (Vercel's free, open-source typeface) — geometric, confident, technical without feeling cold. Fallback: General Sans.
- **Body:** Inter — the most widely trusted, highly legible technical/product sans-serif (used by Stripe, Linear, GitHub, Vercel). Free, variable font, excellent number/tabular support for pricing tables.
- **Monospace (optional, for code-flavored accents like tech-stack tags):** Geist Mono or JetBrains Mono.

Both fonts are free for commercial use with no licensing cost or attribution requirement — do not substitute a paid font family.

**Type scale (desktop / mobile):**

| Role                  | Desktop  | Mobile  | Weight  | Letter-spacing     |
| --------------------- | -------- | ------- | ------- | ------------------ |
| Display (hero H1)     | 88–104px | 40–48px | 600–700 | -0.02em            |
| H2 (section headline) | 48–56px  | 32–36px | 600     | -0.01em            |
| H3 (subsection)       | 28–32px  | 22–24px | 600     | -0.005em           |
| H4 (card title)       | 20–22px  | 18–20px | 600     | 0                  |
| Body large (lede)     | 20px     | 18px    | 400     | 0                  |
| Body                  | 16–17px  | 16px    | 400     | 0                  |
| Small / caption       | 14px     | 13px    | 500     | 0.01em             |
| Label / eyebrow       | 13px     | 12px    | 600     | 0.08em (uppercase) |

**Rules:**

- Line-height: 1.05–1.1 for display/H2, 1.2 for H3/H4, 1.6 for body copy.
- Headings are tight and confident; body copy is generously spaced for long-form readability (case studies, service descriptions).
- Never go below 16px for primary body copy.
- Use an "eyebrow" label (small, uppercase, letter-spaced, cyan or violet) above major section headlines as a recurring structural device — this is one of the few places accent color touches text directly, and only at small-caps sizes where contrast is less critical.
- Numbers in pricing tables use tabular figures (`font-variant-numeric: tabular-nums`) so tier prices align vertically.

---

## 4. Spacing & Layout

**Base unit:** 4px. Use an 8px-stepped scale for most spacing decisions: 8, 16, 24, 32, 48, 64, 96, 128, 192.

**Containers:**

- Max content width: 1280px, with 5–8% fluid side padding below that
- Full-bleed sections (hero, cinematic scroll moments) break out of the container; text/CTA content within them stays inside the standard container width
- Section vertical padding: 96–160px desktop, 64–96px mobile — generous, not cramped; this is part of what reads as "premium"

**Grid:**

- Desktop: 12-column grid, asymmetrical layouts preferred over centered-everything (e.g. a 7/5 or 8/4 split for text-plus-visual sections)
- Cards/comparisons: bento-style grid where item sizes vary by importance, not a uniform 3-up grid everywhere
- Mobile: single column, generous vertical spacing between stacked elements to compensate for lost horizontal separation

---

## 5. Elevation & Depth

Since the site is dark-mode-forward, avoid conventional drop shadows on dark surfaces (they're nearly invisible and look muddy). Use these instead:

- **Glow, not shadow:** raised elements on dark backgrounds get a soft radial glow in brand-cyan or brand-violet at low opacity (4–10%), positioned as if lit from behind/above — not a drop shadow
- **Border separation:** `--border-on-dark` / `--border-on-light` (subtle 1px borders) to separate cards from background before adding any glow
- **Light sections** (off-white) can use conventional soft shadows (e.g. `0 8px 24px rgba(15,15,23,0.06)`) since shadows read naturally on light surfaces
- **Z-depth via blur, not just shadow:** background decorative elements (mesh gradients, node/network imagery) sit behind a subtle blur/darken layer so foreground content always reads as closest to the viewer

---

## 6. Components

**Buttons**

| Variant                                   | Use                                                 | Surface          |
| ----------------------------------------- | --------------------------------------------------- | ---------------- |
| Primary (cyan fill)                       | Main CTAs ("Start a Project")                       | Dark or light bg |
| Secondary (outline, current-color border) | Secondary actions                                   | Dark or light bg |
| Ghost/text                                | Tertiary links, nav items                           | Dark or light bg |
| Dark solid                                | On light/off-white sections needing a strong anchor | Light bg only    |

Sizes: small (36px height), medium (44px height), large (52px height). All buttons: visible focus ring (2px, offset, brand-cyan), disabled state at 40% opacity, loading state replaces label with a small spinner (no layout shift — reserve label width).

**Cards**

- Base card: `--surface-dark-raised` or `--surface-light-raised`, 1px border, 12–16px corner radius, generous internal padding (24–32px)
- Featured/highlighted card (e.g. "Most Popular" pricing tier): violet-tinted border or top accent bar, small violet badge, otherwise identical structure to a standard card — never a fundamentally different shape or size
- NGO-rate card: same structure as a standard tier card, with a clearly labeled violet "NGO Rate" badge — must read as _equal quality, discounted price_, not a lesser/downgraded tier

**Badges**

- Small pill, uppercase label, 12–13px, letter-spaced
- "Most Popular" → violet fill, off-white text
- "NGO Rate" → violet outline, violet text
- "Coming Soon" (theme marketplace) → charcoal/off-white outline, neutral tone — this is informational, not promotional, so it should be visually quieter than the pricing badges

**Forms**

- Labels above inputs, always visible (no placeholder-as-label pattern)
- Input fields: 1px border default, cyan border + subtle glow on focus
- Error state: red-adjacent tone reserved only for form validation errors (this is the one place a non-palette color is acceptable, since form errors need a universally-understood red; keep it desaturated so it doesn't fight the brand palette)
- Success state: cyan check icon + confirmation message, no color change to the whole form

**Navigation**

- Desktop: transparent over hero, solid `--surface-dark-raised` (or off-white on light-launched pages) after scroll threshold, with a soft bottom border once solid
- Active route: cyan underline or dot indicator, not a full background fill
- Mobile: full-screen overlay in `--surface-dark`, large tap targets (min 44px), staggered entrance for nav items

---

## 7. Iconography

- Lucide React exclusively — consistent stroke width (1.5–2px), no mixing icon sets
- Icons on dark backgrounds: off-white or cyan (for interactive/active icons only)
- Icons should support text, not replace it — avoid icon-only navigation or icon-only CTAs without a text label, for both clarity and accessibility

---

## 8. Imagery & Media

- Use only the provided product/case-study screenshots — never generic stock photography, never AI-generated placeholder mockups
- Frame screenshots in a consistent "device/browser chrome" treatment where useful (subtle browser bar) so a diverse set of screenshots reads as one cohesive product family
- Where no case study image exists yet, use a clearly labeled placeholder card (dashed border, "Case study coming soon" label) rather than a stretched/awkward fallback image
- Background decorative imagery (abstract network/node visuals, gradient meshes) should sit behind a blur/dim layer so they never compete with foreground text contrast

---

## 9. Light vs. Dark Section Usage

The site is dark-mode-forward but not exclusively dark. Use light (`--surface-light`) sections deliberately, not as a default fallback:

- **Dark:** Hero, Process/How We Work, Portfolio/Work, most of the homepage narrative
- **Light:** Pricing (numbers and comparison tables read better with higher local contrast and less visual noise), possibly the Theme Marketplace once populated

Transitions between dark and light sections should be a clean hard cut with a well-designed seam (not a gradient blend that muddies both), timed to a scroll-triggered moment per `ANIMATIONS.md` rather than an abrupt unstyled jump.

---

## 10. Accessibility & Responsive Tokens

- Focus ring: 2px solid `--brand-cyan`, 2px offset, visible on every interactive element, never removed via `outline: none` without a replacement
- Minimum tap target: 44×44px on touch devices
- Breakpoints: `sm` 480px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px
- All spacing/type scale values above have explicit mobile variants — mobile is not just "the desktop layout, scaled down"

---

## 11. Relationship to ANIMATIONS.md

This file defines what things look like at rest. `ANIMATIONS.md` defines how they move, react to scroll, and react to the pointer. Build components to satisfy both files together — a card's static appearance comes from here, its hover/tilt/reveal behavior comes from there.
