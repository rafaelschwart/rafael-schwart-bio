# DESIGN.md

> The V2 "engineering ledger" design language (rs · v02 · 26.07), captured 2026-07-01.
> Source of truth for tokens is `src/index.css` + `tailwind.config.ts`; the canonical visual
> reference is `Rafael Schwart V2/Rafael Schwart.dc.html`. This file explains the *why*.

## Aesthetic family

**Engineering ledger.** Warm paper canvas, charcoal ink, one blue **signal** as the single
live wire, a blue **beacon** reserved for verified/status moments. Satoshi for display and body,
IBM Plex Mono for the technical voice. Sharp corners (≤3px), 1px hairline rules, corner ticks
framing cards, a faint 88px square "bench grid" on stat/contact canvases, grayscale video loops
behind the hero and contact. It should read like a precision instrument / an engineer's bench
ledger — declarative, measured, never hype.

The site is an instrument, not a brochure. Surfaces alternate `paper → paper-soft → ink` to carry
the section rhythm; the dark ink slabs (capabilities, experience detail, work, contact, footer)
are where the signal blue does its work. (The signal was orange `#f55c36` until 2026-07-01;
the owner switched the live wire to blue — `#3664ff`, one of the accent options designed into
the canonical source — so signal and beacon now share the same blue.)

> **Not the website:** the black-&-white + signal-blue JetBrains-Mono system in
> `Rafael Schwart V2/uploads/Rafael Schwart - Brand Manual.pdf` is the **@rafa_flows short-form
> video identity**, not this site. They share the draw/snap/settle motion language and the `rs`
> mono voice — nothing else.

## Color

Raw hex tokens consumed directly via `var(--token)`; the shadcn HSL layer in `index.css` is
re-mapped onto this palette so Radix primitives keep rendering correctly.

| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#f5f3ec` | Default canvas |
| `--paper-soft` | `#faf8f2` | Lifted strips (brands, credentials), stat tiles |
| `--paper-2` | `#edeae0` | Bench-grid canvas, active selector states, motif boxes |
| `--paper-3` | `#e2dfd5` | Deepest paper (image placeholders, scrollbar thumb) |
| `--ink` | `#0a0a0a` | Dark slabs, body text, primary CTA fill |
| `--ink-2` | `#181818` | Rule base tone |
| `--ink-3` | `#353535` | Corner ticks, hero eyebrow text |
| `--mute` | `#57534b` | Secondary copy, mono labels on paper |
| `--fade` | `#8e8e8e` | Tertiary metadata (years, hints) |
| `--signal` | `#3664ff` | **The one live wire** — CTAs on hover, active nodes, metrics, gate labels |
| `--signal-deep` | `#2348d4` | Destructive/pressed signal |
| `--beacon` | `#3664ff` | **Verified/status only** — announce bar, hero pulse, check dots |
| `--grow` | `#269926` | Green, reserved, sparing |
| `--rule` | `rgba(24,24,24,.1)` | Hairline rules, grid lines |
| `--rule-strong` | `rgba(24,24,24,.22)` | Card borders, ghost CTA borders |
| `--white` | `#ffffff` | Card fill on paper surfaces |

On ink surfaces the equivalents are white alphas: text `rgba(245,243,236,.5–.82)`, rules
`rgba(255,255,255,.14–.24)`.

**Color strategy:** one dominant warm surface + one sharp blue accent. The signal appears only
where something is live (active tab, active phase, ramp stage, metric, CTA hover); the beacon
(same blue) marks what is verified or currently true (announce bar, "PMP certified" checks, the
hero pulse). Section rhythm is carried by surface steps — `paper → paper-2 → paper-3 → ink` —
with `--rule-strong` hairlines between major sections.

## Typography

- **Display + body: Satoshi** (Fontshare, 400/500/700/900). Display weight is **500** with
  tight negative tracking (−0.025em). Bold 700 for card titles and CTAs; 900 only for the
  logo mark and the giant footer wordmark.
- **Technical voice: IBM Plex Mono** (Google, 400/500/600). Uppercase mono labels at 0.12–0.14em
  tracking are the brand's most recognizable signal: eyebrows, version stamps, gate labels,
  metrics, dates, pipeline stages, chips.
- Body reads 16px. Utilities: `.mono-label`, `.display-xl` (clamp 38–78px), `.display-h2`
  (30–54px), `.display-h3` (22–32px), `.tnum` (tabular numerals wherever digits align).

## Components

- **Ledger cards.** `--white` fill, 1px `--rule`/`--rule-strong` border, **corner ticks**
  (`CornerTick` atom / `.tick-tl`/`.tick-br`) marking one or two corners. No border radius, no
  drop shadow. Hover: border darkens (`--rule-strong`).
- **Hairline grids.** Stat tiles, the 2×2 ventures grid, and the experience selector/panel are
  1px-gap CSS grids with the gap color acting as the rule (`gap:1px; background:var(--rule)`).
- **CTAs (`Cta` atom).** Sharp 3px radius, Satoshi 700. Variants: `ink` (ink fill → signal on
  hover), `ghost` (hairline border), `signal` (blue fill, contact email only), `ghost-dark`
  (white-alpha on ink). Press = scale(0.97) via `.press`.
- **Selectors.** Method phases and experience companies are toggle buttons inside a
  `role="group"` (with `aria-pressed` on the active item — deliberately *not* the ARIA tabs
  pattern, which would demand arrow-key wiring): 2–3px signal bar + `--paper-2` fill on the
  active item, mono gate/role microcopy.
- **Bench grid.** `.bench-grid` (+ `.bench-grid-drift` for the 70s drift) — an 88px square
  technical grid in `--rule` on paper, white-alpha on ink (contact).
- **Motifs (`Motif` atom).** Animated 40×40 line-work SVGs (comms waves, AR frame, ECG, radar
  sweep, gear, rotor, plane) stand in for logos on the brands rail.
- **Top nav.** Sticky, `paper/90` + 12px blur (the only blur in the system), 1px bottom rule,
  active tab = 2px signal underline. On mobile the tab rail scrolls horizontally.

## Motion — draw / snap / settle

Engineered, never bouncy. Easing `cubic-bezier(.42,0,.58,1)` (`ease-eng`) for state changes,
`cubic-bezier(.2,0,0,1)` (`ease-settle`) for reveals. **No spring overshoot, no bounce, no
confetti.** Animate only `transform` / `opacity`.

- **Reveals** (`useReveal`, anime.js): fade + 18px rise, 0.6s ease-settle, 45–55ms stagger;
  above-fold elements play as one orchestrated load sequence, the rest reveal on scroll
  (IntersectionObserver, −6% root margin), with a 1.6s rescue timer.
- **Counters** (`useCounters` → `animateCounter`, anime.js): stat readouts tick 0 → value
  over 1.4s when the tile enters the viewport.
- **Parallax** (`useParallax`): the hero/contact video loops counter-drift ±52px, rAF-throttled.
- **Panel snaps** (`snapFade`): swapping a company or phase re-runs `rsFade` (0.38s).
- **Ambient keyframes** (`index.css`): `rsPulse` (beacon), `rsRamp` (live pipeline stage),
  `rsSpin`/`rsWaveA`/`rsDrawPulse`/`rsBlip`/`rsBob`/`rsDash` (motifs), `rsGridDrift` (bench grid),
  `rsCaret` (reserved).
- `prefers-reduced-motion` is short-circuited globally in `index.css` **and** in every JS hook
  (`prefersReducedMotion()` in `motion.ts`).

## Spacing & layout

- Section padding: `clamp(64px, 9vw, 120px)` vertical; gutters `clamp(20px, 5vw, 64px)`.
- Container max-width: **1320px** (`max-w-ledger`).
- **View-tabbed SPA**: desktop (>860px) shows one `[data-viewsection]` at a time, swapped via
  CSS on `[data-view-root]`; mobile (≤860px) stacks all sections and the nav smooth-scrolls.
  All content stays in the DOM so every `/:section` deep link is crawlable.
- Mobile overrides live in `index.css` as `[data-*]` attribute rules ported from the source
  (hero collapses to one column, stats to 2-up, phase track goes vertical, grids to 1-up).

## Banned

- Generic Inter/Roboto body, purple-on-white, evenly-timid pastel palettes.
- Cookie-cutter SaaS-cream hero, hero-metric template, sidebar nav.
- Rounded-friendly corners (>3px), drop-shadow elevation, glassmorphism beyond the top nav.
- Spring/bounce easing, confetti, parallax on anything but the two video loops.
- Logos on the brands rail (motifs only), color as the sole signal of state.
- The B&W video-brand palette (JetBrains Mono, blue-on-black) anywhere on the site.

## Accessibility

- Every interactive element is a real `<a>`/`<button>` with a visible
  `focus-visible` outline in signal blue.
- Selectors are `role="group"` toggle buttons with `aria-pressed`; the nav uses `aria-current`.
- Active states pair color with a structural cue (border bar, fill, weight) — color is never
  the sole signal.
- One `h1` (hero), `h2` per section, `h3` for cards/panels. Skip-to-content link before the
  announce bar. Decorative SVGs/videos are `aria-hidden`.
- `prefers-reduced-motion` zeroes every animation and disables smooth scroll + parallax.
