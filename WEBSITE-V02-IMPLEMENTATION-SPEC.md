# Angie's Art — Website Prototype v0.2

## Status

This specification governs the v0.2 redesign branch. The current Website Prototype v0.1 on `main` and its production deployment remain the rollback baseline until v0.2 is explicitly approved.

## Scope

v0.2 may redesign and refactor frontend presentation, UX, responsive behavior, accessibility, performance, and code organization. It must preserve the existing route map and current product/navigation intent unless a separate decision changes them.

Do not make unapproved business or brand decisions. Prices, edition sizes, materials, paper, production method, shipping, returns, legal copy, payment providers, and final product data remain placeholders until decided.

Do not add analytics, tracking, payment services, customer accounts, or backend commerce in this phase.

## Technical guardrails

- Work only on the `website-v0.2` branch.
- Keep `main` and production unchanged during development.
- Use the existing static HTML/CSS/JavaScript foundation where practical; do not migrate frameworks without a demonstrated need.
- Keep assets local and preserve artwork aspect ratios.
- Do not commit secrets, credentials, API keys, `.env` files, build caches, or dependency folders.
- Use neutral, clearly provisional copy for undecided content. Never invent reviews, awards, scarcity, exhibitions, testimonials, shipping promises, or sustainability claims.

## Design direction

Warm contemporary editorial minimalism: professional, calm, artwork-first, contemporary, timeless, and recognizably Angie's Art. Subtraction comes before addition. The interface is the gallery wall; artwork carries the personality and color.

Use three recurring design principles:

1. A consistent artwork scale and image treatment.
2. A deliberate whitespace and alignment rhythm.
3. A restrained typography hierarchy with subtle interaction.

The desktop header, homepage, artwork grid, collections, gallery, prints, studio/about, information, search, cart, product pages, and footer must each have a clear role rather than repeating the same layout.

## Responsive and accessibility acceptance criteria

Test fluidly from approximately 320px to 2560px, including intermediate widths, different heights, portrait/landscape orientation, browser zoom at 80/100/125/150%, and mobile-style touch input where available.

Required checks:

- no accidental horizontal overflow or clipping
- no distorted artwork; full artwork remains available on product pages
- navigation and commerce actions work without hover
- keyboard navigation and visible focus states
- semantic headings, labels, button/link semantics, and useful alt handling
- touch targets approximately 44px or larger where practical
- `prefers-reduced-motion` support
- long titles, long copy, empty cart, no search results, missing/broken assets, and slow image states do not break layout

Do not claim a browser or device was verified unless it was actually tested. Separate emulated checks from real-device checks in the final report.

## Delivery gates

1. Audit repository and current v0.1.
2. Implement v0.2 on this branch.
3. Run build, route, interaction, responsive, accessibility, console, and visual QA.
4. Fix and regression-test discovered issues.
5. Publish a separate public preview.
6. Report branch, commit, preview URL, tested routes/viewports/browsers, known limitations, and rollback path.
7. Wait for explicit approval before merging or deploying v0.2 to `main`.

## Definition of done

v0.2 is complete only when it is functional, responsive, accessible, visually coherent, polished, tested, and reviewable through a separate public preview. A clean build alone is not sufficient.
