# Content Guide

This guide explains where approved Syntra.studio content lives and how to update it without changing
the site architecture.

## Case Studies

Case study data lives in `src/data/work.ts`.

To add or update a project:

1. Add approved screenshots to `public/work/`.
2. Add or edit the project entry in `workItems`.
3. Keep `slug` unique and URL-safe.
4. Use only approved copy for `problem`, `approach`, `result`, `resultBlurb`, `techStack`, and
   `liveUrl`.
5. Keep unknown fields as `CONTENT TO BE PROVIDED` until real content is supplied.

The work listing route is `/work`, and each case study route is `/work/[slug]`.

## Pricing

Pricing data lives in `src/data/pricing-tiers.ts`; `PRICING.md` remains the source of truth.

When pricing changes:

1. Update `PRICING.md` first.
2. Mirror the approved figures and notes in `src/data/pricing-tiers.ts`.
3. Keep USD as the canonical price.
4. Preserve the NGO discount and website plus maintenance bundle discount where applicable.
5. Do not add automated checkout unless that is separately scoped and approved.

## Services

Service summaries live in `src/data/services.ts`.

Each service entry powers:

- The homepage services section.
- `/services`.
- `/services/[slug]`.
- Footer service links.

Keep service slugs aligned with `src/data/navigation.ts`.

## WordPress Themes

Theme data lives in `src/data/themes.ts`.

The theme marketplace intentionally ships as a coming-soon state until real themes exist. When a real
theme is ready:

1. Add approved screenshots or preview assets.
2. Add the theme entry to `themes`.
3. Confirm pricing is approved in `PRICING.md`.
4. Add only real features, compatibility details, and support terms.
5. Keep automated checkout out of scope until credentials, fulfillment, and refund handling are
   approved.

## Testimonials

Testimonials live in `src/data/testimonials.ts`.

Current testimonials are placeholders. Replace them only with approved quotes, names, roles, and
company details.

## Contact And Legal

General settings live in `src/data/site-settings.ts`.

- Add real contact details only after the domain and public contact information are finalized.
- Runtime email delivery depends on `CONTACT_FORM_EMAIL`.
- Legal pages live at `/privacy-policy` and `/terms`; both use `CONTENT TO BE PROVIDED` placeholders
  until final legal copy is supplied.
