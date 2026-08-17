# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio website for Rafael Schwart at **https://rafaelschwart.com**. This file is the fast onboarding brief for any Claude session working in this repo.

> **Design status (2026-07-01): the V2 "engineering ledger" rebuild is code-complete locally**
> (all views, motion, routing, SEO files, docs — build + lint green), **not yet pushed/deployed.**
> The old warm-earthy *editorial* look (cream + Fraunces serif) is fully retired; its components
> were deleted. **Build to V2 only** — see **Design system** below. The canonical reference stays
> `Rafael Schwart V2/Rafael Schwart.dc.html`. The V2 build was produced with the `frontend-design`,
> `ui-ux-pro-max`, `power-design`, and `animejs` skills plus the Magic (21st.dev) MCP; keep using
> them for new UI. Remove this note once the deploy to rafaelschwart.com is verified.

## Who / why
- Owner: Rafael Schwart — Senior Operations Program Manager (NPI) at Motorola Solutions, Miami, FL. Public positioning: *"I take hardware from first build to volume production."*
- Contact email: Hi@rafaelschwart.com (Google Workspace — MX records are separate from web hosting, **never touch them**).
- GitHub: https://github.com/rafaelschwart/rafael-schwart-bio (renamed from `rrgschwart-pixel`; old URLs redirect).

## Stack

- **Vite 5** + **React 18** + **TypeScript** + **Tailwind** + **shadcn/ui** (heavy Radix)
- **anime.js 3** (`animejs`) — the engineered draw/snap/settle motion layer for V2
- **Capacitor 7** mobile wrappers in deps — irrelevant for the web site, ignore
- **react-router-dom** for client-side routing
- Generated and edited via **Lovable** (lovable.dev). Lovable auto-commits its changes to `main`.

## Running locally

```sh
npm install           # use npm.cmd on Windows PowerShell (execution policy blocks npm.ps1)
npm run dev           # http://localhost:8080 (port set in vite.config.ts)
npm run build         # outputs to dist/
npm run lint          # eslint over the repo — there is no test suite
npm run preview       # serve the built dist/ locally
```

No test runner — `lint` + `build` is the full pre-push check. Imports use the `@/` alias → `src/` (in `vite.config.ts`); prefer it over relative paths. Project lives at `C:\dev\rafael schwart website` on the owner's machine — deliberately **outside OneDrive**. Node 24.15 via winget.

## Design system — V2 "engineering ledger"  (rs · v02 · 26.07)

The canonical design reference is **`Rafael Schwart V2/Rafael Schwart.dc.html`** (a Design Compose
export — a self-contained React-like component with the full markup, motion, and content). The
`v1 (growmodo-structure)` and `v2 (motion-library)` files in that folder are **earlier explorations**;
the unversioned file is the final website. Tokens live in `src/index.css` + `tailwind.config.ts` and
are documented in **`DESIGN.md`**.

**Aesthetic:** warm **paper** canvas, charcoal **ink**, one **blue signal** as the single live wire (orange until 2026-07-01, switched at the owner's request),
a **blue beacon** reserved for verified/status moments. Sharp corners (≤3px radius), 1px hairline
rules, corner ticks framing cards, a faint **square technical grid** ("bench grid") on stat/contact
canvases, and grayscale video loops behind the hero and contact. Surfaces alternate
`paper → paper-soft → ink` to carry the section rhythm. It should read like a precision instrument /
an engineer's bench ledger — declarative, measured, never hype.

**Tokens (see `src/index.css`):**
```
--paper #f5f3ec   --paper-soft #faf8f2   --paper-2 #edeae0   --paper-3 #e2dfd5
--ink #0a0a0a     --ink-2 #181818        --ink-3 #353535     --mute #57534b   --fade #8e8e8e
--signal #3664ff (blue · CTAs, active nodes)     --signal-deep #2348d4
--beacon #3664ff (blue · verified/status only)   --grow #269926 (green · sparing)
--rule rgba(24,24,24,.1)   --rule-strong rgba(24,24,24,.22)   --white #fff
```
Tailwind exposes these as `bg-paper`, `text-ink`, `text-signal`, `border-signal`, `text-beacon`, etc.
The shadcn/ui HSL tokens are **re-mapped onto this palette** so Radix primitives keep rendering right.

**Typography:** **Satoshi** (display + body, weights 400/500/700/900 via Fontshare) + **IBM Plex Mono**
(technical voice — labels, version stamps, `/ code-comment` dividers, metrics) via Google Fonts. Display
uses weight **500** with tight negative tracking (~−0.025em). Mono labels are uppercase, `0.12em`
tracking. Body reads 16px. Use `.mono-label`, `.display-xl/h2/h3` from `index.css`.

**Motion — engineered, never bouncy.** draw / snap / settle. Elements reveal on scroll (fade + 18px
rise, 0.6s `cubic-bezier(.2,0,0,1)`), signals travel paths, counters tick up, nodes pulse. Easing is
`cubic-bezier(.42,0,.58,1)` (`ease-eng`). Press = scale 0.97. **No spring overshoot, no bounce, no
confetti.** Motion is implemented with **anime.js** (reveal controller + staggered counters/draws) and
CSS keyframes (`rsPulse`, `rsRamp`, `rsSpin`, `rsGridDrift`, `rsDrawPulse`…) defined in `index.css` /
`tailwind.config.ts`. Always honor `prefers-reduced-motion` (already globally short-circuited in
`index.css`). Concentrate motion on high-impact moments; animate only `transform`/`opacity`.

**Styling approach:** the V2 components port the source's precise inline styles referencing
`var(--token)` (exact `clamp()` sizes, hairline borders, corner ticks) for fidelity, with Tailwind for
layout scaffolding. This is deliberate — don't "Tailwind-ify" the intricate details away.

**NOT the website — Rafael's video identity:** the `Rafael Schwart - Brand Manual.pdf` and
`Motion Graphics Manual.pdf` in `Rafael Schwart V2/uploads/` describe a **black-&-white + signal-blue**
"instrument" system with JetBrains Mono. That is the **short-form video / `@rafa_flows` brand** (a
60-clip motion kit for on-camera content), **not** the website. Don't apply the B&W video palette to the
site; the site is the warm ledger above. (They share the draw/snap/settle motion language and the
`rs` mono voice.)

**Anti-slop guardrails:** no generic Inter/Roboto body, no purple-on-white, no evenly-timid pastel
palette, no cookie-cutter SaaS-cream hero, no Apple-clone, no sidebar nav. Dominant warm surface +
one sharp accent, distinctive type, restraint. See `PRODUCT.md` for voice + anti-references.

## Routing — view-tabbed SPA

The V2 site is a **view-tabbed SPA on desktop** and a **scroll-stacked page on mobile** (breakpoint
`860px`). `App.tsx` declares `/` and `/:section`; `Index.tsx` reads the param via `useParams`,
validates against `VALID_SECTIONS`, and passes it to `Landing`. On desktop the nav swaps the active
**view** and scrolls to top; on mobile it smooth-scrolls to the matching section. Per-section URLs stay
crawlable for AI agents and shareable.

Valid section slugs (must match a `data-viewsection` / section `id` in the landing):
```
home  method  experience  work  credentials  contact
```
`home` also answers at `/`. (This replaces the old `about/skills/certifications/projects/
recommendations/employment-verification` slugs — the V2 information architecture consolidates skills +
certs + references + employment verification into `method` and `credentials`.)

When adding / renaming a section:
1. Add/adjust the view block in `src/components/landing/` and render it in `Landing.tsx`
2. Mirror its slug into `VALID_SECTIONS` in `src/pages/Index.tsx`
3. Add a nav entry in `src/components/landing/data.ts` → nav/view list
4. Update `public/sitemap.xml`
5. Mirror the content to `public/llms.txt`

Bio copy lives in **`src/components/landing/data.ts`** (single source of truth for the React app).
Keep it in sync with `public/llms.txt`. Legacy per-section components from the editorial era
(`About.tsx`, `Skills.tsx`, `Recommendations.tsx`, `MainContent.tsx`, `Sidebar.tsx`, etc.) are being
replaced by the V2 view components; if Lovable regenerates stale ones, fold real content deltas into
`landing/data.ts` and ignore the rest.

## Deployment

- **Host:** Vercel. Project URL: `rafael-schwart-bio.vercel.app`. Auto-deploys on push to `main`.
- **Custom domain:** `rafaelschwart.com`, DNS at **IONOS**. Apex A → `216.198.79.1` (Vercel); `www` → Vercel.
- **Email:** Google Workspace MX (`aspmx.l.google.com` etc.) — **never modify MX or email-related TXT/CNAME** when changing DNS.
- **vercel.json** has a catch-all SPA rewrite (`/(.*)` → `/index.html`) so deep-link routes don't 404. Static files in `public/` (incl. `public/bio/index.html`) win over the rewrite via filesystem priority — that's how `/bio` serves the linktree page.
- **V2 media:** the hero + contact video loops, poster frames, and headshot live in `public/assets/` (`hero-loop.mp4`, `hero-loop-poster.jpg`, `contact-loop.mp4`, `contact-loop-poster.jpg`, `headshot.jpg`), copied from `Rafael Schwart V2/assets/`. Referenced as `/assets/…`.
- **Linktree page:** `public/bio/index.html` — self-contained static page at `rafaelschwart.com/bio` (B&W Space Grotesk aesthetic, independent of the React app).
- **Previous host:** Lovable Publish (Cloudflare CDN `185.158.133.1`) still works as a fallback.

## AI-agent / SEO files (live at the site root)

- **`public/llms.txt`** — full bio as markdown (llmstxt.org). **Keep in sync with `landing/data.ts`.**
- **`public/sitemap.xml`** — lists the section URLs.
- **`public/robots.txt`** — allows `GPTBot`, `ClaudeBot`, `PerplexityBot` + standard crawlers; points to sitemap.

### `index.html` `<head>` + noscript fallback (canonical values)

Every section URL serves the same `index.html` (SPA rewrite), so it **is** the crawler/social content
for the whole site. If Lovable regenerates `index.html`, re-apply:

- **`<title>` / `og:title`:** `Rafael Schwart — Senior Operations Program Manager (NPI), Motorola Solutions`
- **`meta description` / `og:description`:** lead with *"I take hardware from first build to volume production."* + PMP-certified Senior Operations Program Manager (NPI), 10+ years across consumer electronics, AR, medical, robotics, aerospace, solar.
- **`og:image` / `twitter:image`:** `https://rafaelschwart.com/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png`.
- **`twitter:site`:** **omit** — no X handle on file. Do not restore `@lovable_dev`.
- **`og:url`:** `https://rafaelschwart.com/`.
- **Favicon:** `public/favicon.ico` is the **`rs` monogram** — paper letters in IBM Plex Mono Bold on an ink plate, under the signal-blue rule. It is a multi-frame ICO (16/24/32/48/64/128/256) with **per-size artwork**: 16 and 24 drop the rule and set the letters larger. Paired with `public/apple-touch-icon.png` (180) and `public/icon-512.png`, declared via `<link rel="icon">` + `<link rel="apple-touch-icon">`. If Lovable restores its **gradient heart**, rebuild from `scripts/build_favicon.py`.
- **Fonts:** **Satoshi** (Fontshare `api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900`) + **IBM Plex Mono** (Google `family=IBM+Plex+Mono:wght@400;500;600`). If Lovable swaps these for Fraunces/Inter/Manrope, **restore Satoshi + IBM Plex Mono** — the V2 design depends on them.
- **Noscript fallback contact email:** `hi@rafaelschwart.com` — the canonical public contact address. Matches the rendered Contact view, `llms.txt`'s "preferred" field, and the PDF résumé. It's the Google Workspace address; its MX records live at IONOS and must never be touched when changing DNS. **Never** restore `rrgschwart@hotmail.com` or `rafaelschwart@gmail.com` (invented by Lovable).

## Python scripts (`scripts/`)

Out-of-band tooling that publishes Rafael's bio to non-web surfaces. Not part of the Vite build — run manually with system Python (Playwright + Pinecone SDK + pypdf required).

- **`build_profile_pdf.py`** — Playwright Chromium renders `profile/Rafael_Schwart_Profile.pdf` from `public/llms.txt` (canonical bio), the master Obsidian vault at `C:/dev/Obsidian Vault/wiki/Biography/`, and Claude memory files. Re-run whenever bio facts change.
- **`vectorize_profile_pdf.py`** — chunks that PDF and upserts to Pinecone serverless index `rafaels-bio`, namespace **`Biography`**, using server-side `multilingual-e5-large` embeddings. Reads `PINECONE_API_KEY` from `.env`. Chunk IDs deterministic → idempotent.

Order of operations when bio facts change: edit `src/components/landing/data.ts` → mirror to `public/llms.txt` → run `build_profile_pdf.py` → run `vectorize_profile_pdf.py`. The `bio-sync` agent automates this (its frontmatter still references `MainContent.tsx`; source of truth is now `landing/data.ts`).

Pinecone state (verified 2026-04-30): index `rafaels-bio` healthy, namespace `Biography` holds 8 chunks. Re-vectorize **only** when bio content changes.

## Agents (`.claude/agents/`)

Project-scoped subagents (`.claude/` is gitignored — copy between machines manually):

- **`bio-sync`** — after editing bio facts in `landing/data.ts`: mirror to `llms.txt`, rebuild PDF, re-vectorize Pinecone.
- **`section-scaffolder`** — adding a brand-new top-level section: edits all five surfaces in lockstep.
- **`lovable-rescue`** — when `git diff` shows Lovable clobbered canonical `index.html` head/noscript, fonts, or the `/:section` routing. Restores from the documented values above (fonts = Satoshi + IBM Plex Mono now).
- **`deploy-validator`** — before pushing (build + lint + `vercel.json` sanity) and ~60–90s after (curl checks against both hosts).

## Personal Obsidian vault (master, outside this repo)

Rafael's mind map lives in his master vault at `C:/dev/Obsidian Vault/`, bio consolidated under
`wiki/Biography/` (`Identity/`, `Experience/` — 9 employer notes, `Certifications/`, `Skills/`,
`Side projects/`, `Recommendations/`, `Infrastructure/`, `Site management/`). `Site management/` holds
runbooks for *this* repo and is consumed by `build_profile_pdf.py`. Hub note: `RAFAEL.md` under
`Identity/`. The vault is **not** part of this git repo.

## What Lovable owns vs what survives

- **Lovable-managed (risky to edit outside Lovable):** everything under `src/` — especially `App.tsx`, `src/pages/*`, `src/components/*`, `src/main.tsx`, `index.html`.
- **Safe to edit here:** `public/*`, `scripts/*`, `profile/*`, `.claude/*`, `vercel.json`, `.github/workflows/*`, `vite.config.ts` (usually), `.env`/`.env.example`, `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`.

If Lovable overwrites the routing in `App.tsx`/`Index.tsx`, re-apply the `/:section` route + `useParams` + `VALID_SECTIONS` logic — or invoke `lovable-rescue`.

## Design docs (`PRODUCT.md` + `DESIGN.md` at repo root)

- **`PRODUCT.md`** — brand brief (users, Rafael's voice, anti-references) consumed by the `impeccable`/`frontend-design` skills. Updated for V2.
- **`DESIGN.md`** — V2 tokens / palette / typography / motion / banned patterns. Mirrors `src/index.css` + `tailwind.config.ts`. If you change tokens, mirror the change into `DESIGN.md`.

## Git conventions

- `main` is the only branch; both Lovable and humans push to it.
- From an unconfigured machine: `git -c user.email="<handle>@users.noreply.github.com" -c user.name="<handle>"` per-command.
- Include `Co-Authored-By: Claude <noreply@anthropic.com>` when Claude made the edits.
- Don't `--amend` or rewrite Lovable's commits — they sync from Lovable's side.

## Sanity checks before pushing

```sh
npm run build              # must succeed
npm run lint               # keep clean
```

After pushing, Vercel rebuild takes ~30–60s. Verify:
```sh
curl -I https://rafael-schwart-bio.vercel.app/experience        # expect 200
curl -sI https://rafael-schwart-bio.vercel.app/llms.txt | head -1   # expect 200
```
