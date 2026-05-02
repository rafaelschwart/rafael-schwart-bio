# DESIGN.md

> The design language as it exists today, captured 2026-05-01. Source of truth is `src/index.css` + `tailwind.config.ts`; this file explains the *why*.

## Aesthetic family

Warm-earthy editorial. Cream parchment paper, charcoal ink, alternating section surfaces in peach / sage / ivory / clay / slate. Fraunces variable serif for display, Inter for body. Distilled from the Lovable design language during a 2026-05-01 design migration after iterating through Apple, ipassas.com, and several other directions.

The site is paper, not glass. No frosted/glass cards beyond the sticky top nav. No drop-shadow elevation except hover lift on cards. No decorative gradients except the hero radial wash (the only decorative bg in the system).

## Color

All HSL-encoded so the shadcn primitives keep working. Hex values quoted for design fidelity.

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `cream` / surface-cream | `#f7f4ed` | `43 33% 95%` | Default background, hero, experience, contact, footer |
| `surface-peach` | `#f4e9dc` | terracotta wash | Education, Recommendations |
| `surface-sage` | `#e8ebe0` | soft sage | Brands, Verification |
| `surface-ivory` | `#fbf8f0` | near-white | About, Credentials |
| `surface-clay` | `#efe2d4` | deeper clay | Side projects |
| `surface-slate` | `#e6e6e0` | cool stone | Skills |
| `surface-dark` | `#1f1e1a` | warm near-black | Reserved (no section uses it yet) |
| `charcoal` | `#1d1c19` | `40 8% 11%` | Body text, dark CTA fill |
| `offwhite` | `#fcfbf8` | `45 38% 98%` | Card fill (lifted off cream) |
| `border-soft` | `#e4dfd4` | `40 22% 86%` | Divider hairlines |
| `border-medium` | `#d4ccbc` | `38 22% 78%` | Card borders (default state) |
| `muted-foreground` | `#5f5e5c` | `30 3% 37%` | Eyebrows, secondary copy, dates |

**Color strategy: Restrained.** Tinted neutrals carry the entire design; the only "accent" is charcoal-as-CTA. Section rhythm comes from alternating warm hues, not a saturated brand color. Never use `#000` or `#fff` — every neutral is tinted toward the warm hue.

## Typography

- **Display: Fraunces** variable serif, weights 400 / 480 / 600. Used for h1–h4 and the section headline scale (`.display-xl` 60px / `.display-h2` 48px / `.display-h3` 36px). Negative letter-spacing `-0.022em` to `-0.025em` for the "tight" Fraunces feel at display sizes.
- **Body: Inter**, weights 400 / 500 / 600. 16px base, 18px lead, 14–15px metadata. Line-height 1.5 body, 1.55 long-form copy.
- Body copy on cards uses `hsl(40 8% 11% / 0.82)` — softer than the full charcoal, keeps headlines dominant.

Hierarchy ratio: 60 → 48 → 36 → 22 → 18 → 16 → 14 → 12. Plenty of contrast.

## Components

- **Cards.** White (`offwhite`) fill, 1px `border-medium` border, 12px or 16px or 24px corner radius depending on section, no shadow at rest. On hover: `translateY(-3px)`, border darkens to charcoal, soft shadow `0 12px 28px -12px hsl(40 8% 11% / 0.18)`. Class: `card-hover`.
- **Pill (meta-pill).** 9999px radius, cream fill, inset shadow signature `--inset-btn` (white top sliver + black hairline + soft drop). Used in the hero meta row. Class: `meta-pill`.
- **Chips.** 9999px radius, cream fill, 1px border-soft, used in the Skills cloud. Class: `Chip`.
- **Buttons (Btn atom).** Three variants:
  - `dark` — charcoal fill, offwhite text, `--inset-btn` shadow. Primary CTA.
  - `ghost` — transparent fill, charcoal/40 border, charcoal text. Secondary.
  - `cream` — cream fill, border-soft border. Tertiary.
- **Top nav.** Sticky, `bg-cream/85` + `backdrop-blur-md backdrop-saturate-150`, 1px border-soft bottom rule. The only purposeful blur in the system.

## Motion

- Card hover: 250ms `cubic-bezier(0.2, 0.7, 0.3, 1)` — soft exponential out, no bounce.
- Hero reveal: `fade-in-up` keyframe (translateY 16 → 0, opacity 0 → 1) over 700ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Smooth scroll on anchor jumps via `html { scroll-behavior: smooth }`.
- `prefers-reduced-motion` honored globally — animations and smooth-scroll disabled.

## Spacing

- Section padding: 64px (mobile) / 96px (desktop).
- Container max-width: 1180px.
- Card padding: 24px (default) / 32px for hero-tier cards (PMP, Education).
- Grid gaps: 16px between cards in dense grids (brands, recommendations), 32–48px between text columns.

## Layout

- Single-page scroll. URL `/:section` → `scrollIntoView()` on the matching `id`.
- Hero is full-bleed (no max-width) with the radial wash bleeding past the gutters.
- Sections are full-bleed colored canvases; content sits on `1180px` max-width inside.
- No `protection gradients` over imagery — no text overlays photography in this system.

## Banned (per impeccable + the design system itself)

- Side-stripe borders >1px as accent. Card hover uses full border-darken instead.
- Gradient text. Headlines are solid charcoal.
- Glassmorphism beyond the sticky top nav. No glass cards anywhere.
- The hero-metric template. The Stats bar lives below the hero, not as the hero.
- Em dashes in any new UI string. Existing bio copy keeps its em dashes (Rafael's voice).

## Accessibility

- All interactive elements are real `<a>` or `<button>` with discoverable focus rings inherited from shadcn defaults (`ring` token).
- `prefers-reduced-motion` zeros out animation durations.
- Card grids use semantic `<article>` for each entry.
- Headings descend logically: one h1 in the hero, h2s for each section head, h3s for cards inside.
- Links inside the footer use a low-contrast underline (decoration alpha 0.3) to keep them legible without screaming.
