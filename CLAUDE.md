# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio website for Rafael Schwart at **https://rafaelschwart.com**. This file is the fast onboarding brief for any Claude session working in this repo.

## Who / why
- Owner: Rafael Schwart — Senior Operations Program Manager (NPI) at Motorola Solutions, Miami, FL.
- Contact email: Hi@rafaelschwart.com (Google Workspace — MX records are separate from web hosting, never touch them).
- GitHub: https://github.com/rafaelschwart/rafael-schwart-bio (renamed from `rrgschwart-pixel` in April 2026; old URLs redirect).

## Stack

- **Vite 5** + **React 18** + **TypeScript** + **Tailwind** + **shadcn/ui** (heavy Radix)
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

There is no test runner configured — `lint` + `build` is the full pre-push check. Imports use the `@/` alias → `src/` (configured in `vite.config.ts`); prefer it over relative paths.

Project lives at `C:\dev\rafael-schwart-bio` on the owner's machine — deliberately **outside OneDrive** to avoid sync issues with `node_modules` / `.git`. Node 24.15 installed via winget.

## Repo layout

```
rafael-schwart-bio/
├── .claude/agents/           # Subagents (gitignored — see Agents section)
├── profile/                  # Generated bio artifact
│   └── Rafael_Schwart_Profile.pdf
├── public/                   # Static — llms.txt, sitemap.xml, robots.txt, headshot
├── scripts/                  # Out-of-band Python tooling (see Python scripts)
├── src/                      # Lovable-managed React app
│   └── components/landing/   # The post-2026-05-01 single-page surface (data.ts is bio source of truth)
├── vercel.json               # SPA rewrite for deep links
├── CLAUDE.md                 # This file (onboarding brief)
├── PRODUCT.md                # Brand brief for the impeccable skill (users, voice, anti-references)
├── DESIGN.md                 # Design tokens / palette / typography / motion (mirrors src/index.css + tailwind.config.ts)
├── README.md                 # Stale Lovable template — ignore in favor of CLAUDE.md
├── .env / .env.example       # PINECONE_API_KEY only (.env is gitignored)
└── package.json + Vite/TS configs
```

`.claude/`, `.env`, `*.log`, `node_modules`, `dist` are all gitignored.

**Personal Obsidian content lives outside this repo** at `C:/dev/Obsidian Vault/wiki/Biography/` (master vault). The project has no embedded vault. Any bio-related notes belong in the master vault under the `Biography` topic — see the **Personal Obsidian vault** section below.

## Deployment

- **Host:** Vercel. Project URL: `rafael-schwart-bio.vercel.app`. Auto-deploys on push to `main`.
- **Custom domain:** `rafaelschwart.com`, DNS managed at **IONOS**. Apex A record → `216.198.79.1` (Vercel). `www` also points to Vercel.
- **Email:** Google Workspace MX records (`aspmx.l.google.com` etc.) — **never modify MX or email-related TXT/CNAME records** when changing DNS.
- **vercel.json** at repo root has a catch-all SPA rewrite (`/(.*)` → `/index.html`). Without it, deep-link routes 404 on Vercel because no static file matches.
- **Previous host:** Lovable's built-in Publish (Cloudflare CDN at `185.158.133.1`). Still works as a fallback if DNS points back to it.

## Routing

Single-page scroll layout, URL-driven anchor scroll. `App.tsx` declares `/` and `/:section`; `Index.tsx` reads the param via `useParams`, validates against `VALID_SECTIONS`, and passes it to `Landing`. `Landing.tsx`'s effect calls `scrollIntoView()` on the section whose `id` matches the URL slug — so `rafaelschwart.com/experience` deep-links to the `#experience` section, AI agents still get crawlable per-section URLs, and humans see the alternating-color rhythm. The `TopNav` anchor links call `useNavigate` so the URL updates as you click through.

Valid section slugs (must match a section `id` in `Landing.tsx`):
```
about  experience  skills  certifications  projects
recommendations  employment-verification  contact
```

When adding a new section:
1. Add a `Landing*` component under `src/components/landing/` and render it inside `Landing.tsx`
2. Mirror its `id` into `VALID_SECTIONS` in `src/pages/Index.tsx`
3. Add a nav entry in `src/components/landing/data.ts` → `navLinks`
4. Append a `<url>` entry to `public/sitemap.xml`
5. Mirror the content to `public/llms.txt`

Bio copy lives in `src/components/landing/data.ts` (single source of truth for the React app). Keep it in sync with `public/llms.txt`. The legacy `src/components/MainContent.tsx`, `Sidebar.tsx`, `Navigation.tsx`, and per-section files (`AboutSection.tsx`, `HeroSection.tsx`, `ContactSection.tsx`, `ExperienceSection.tsx`, `RecommendationsSection.tsx`) are **orphaned** as of the 2026-05-01 design migration — Vite tree-shakes them out of the bundle but they still live in the tree because Lovable expects them. If Lovable regenerates them with new content, fold the deltas into `landing/data.ts` and ignore the rest.

## AI-agent / SEO files (live at the site root)

- **`public/llms.txt`** — full bio as markdown per llmstxt.org convention. AI agents fetch this for a JS-free structured summary. **Keep in sync with `src/components/landing/data.ts`** whenever you change bio facts.
- **`public/sitemap.xml`** — lists all 9 URLs.
- **`public/robots.txt`** — explicitly allows `GPTBot`, `ClaudeBot`, `PerplexityBot`, plus standard crawlers. Points to sitemap.

### `index.html` `<head>` + noscript fallback (canonical values)

Every section URL serves the same `index.html` (SPA rewrite), so this file **is** the crawler/social-preview content for the entire site. The head and noscript body were scrubbed of Lovable template defaults on 2026-04-24. If Lovable regenerates `index.html`, re-apply:

- **`<title>` / `og:title`:** `Rafael Schwart — Senior Operations Program Manager (NPI), Motorola Solutions`
- **`<meta name="description">` / `og:description`:** PMP-certified Senior Operations Program Manager (NPI) at Motorola Solutions — process engineer with 10+ years across consumer electronics, AR, medical devices, robotics, aerospace, solar.
- **`og:image` / `twitter:image`:** `https://rafaelschwart.com/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png` (the professional headshot — referenced from `src/components/landing/data.ts` as `HEADSHOT_SRC`).
- **`twitter:site`:** **omit** — no X/Twitter handle on file. Do not restore `@lovable_dev`.
- **`og:url`:** `https://rafaelschwart.com/`.
- **Fonts:** Fraunces (display, variable weights 400/480/600) + Inter (body, 400/500/600) loaded from Google Fonts via the `<link>` in `index.html`. If Lovable swaps these for Manrope/Barlow (its old defaults), restore them — the design depends on Fraunces specifically.
- **Noscript fallback contact email:** `rrgschwart@hotmail.com`. This is the canonical public contact address — it matches the rendered Contact section in [src/components/landing/Contact.tsx](src/components/landing/Contact.tsx) and `llms.txt`'s "preferred" field. **Never** restore `rafaelschwart@gmail.com` (Lovable invented that — it's not a real address of Rafael's). `Hi@rafaelschwart.com` is the Google Workspace address and is intentionally not surfaced publicly.

## Python scripts (`scripts/`)

Out-of-band tooling that publishes Rafael's bio to non-web surfaces. Not part of the Vite build — run manually with system Python (Playwright + Pinecone SDK + pypdf required).

- **`build_profile_pdf.py`** — uses Playwright Chromium to render `profile/Rafael_Schwart_Profile.pdf` from three sources: `public/llms.txt` (canonical bio), the master Obsidian vault at `C:/dev/Obsidian Vault/wiki/Biography/` (richer per-employer notes, recommenders, certs), and Claude memory files under `~/.claude/projects/c--dev-rafael-schwart-bio/memory/`. Re-run whenever bio facts change.
- **`vectorize_profile_pdf.py`** — chunks that PDF (~220 words, section-aware) and upserts to Pinecone serverless index `rafaels-bio`, namespace **`Biography`**, using server-side `multilingual-e5-large` integrated embeddings (1024 dim, hosted by Pinecone — no local model). Reads `PINECONE_API_KEY` from `.env`. Chunk IDs are deterministic (`profile-chunk-NNN`), so re-runs are idempotent.

Order of operations when bio facts change: edit `src/components/landing/data.ts` → mirror to `public/llms.txt` → run `build_profile_pdf.py` → run `vectorize_profile_pdf.py`. The `bio-sync` agent automates this whole chain (note: the agent's frontmatter still references `MainContent.tsx`; in practice the source of truth is now `landing/data.ts` — update the agent if you regenerate it).

Current Pinecone state (verified 2026-04-30): index `rafaels-bio` is healthy, namespace `Biography` holds 8 chunks. Old `profile` namespace was deleted as part of the 2026-04-30 reorg. Re-vectorize **only** when bio content changes — not on folder/path refactors.

## Agents (`.claude/agents/`)

Project-scoped Claude Code subagents for the workflows that show up repeatedly. The `.claude/` folder is gitignored, so these live locally; copy them between machines manually if you want them in multiple places.

- **`bio-sync`** — invoke after editing bio facts in `src/components/landing/data.ts` (the new source of truth, post-2026-05-01). Mirrors changes to `public/llms.txt`, rebuilds the PDF, re-vectorizes Pinecone.
- **`section-scaffolder`** — invoke when adding a brand-new top-level section (publications, speaking, etc.). Edits all five required surfaces in lockstep so deep links and AI-agent crawls work from day one.
- **`lovable-rescue`** — invoke when `git diff` shows Lovable has clobbered the canonical `index.html` head/noscript or the `/:section` routing. Restores from documented values without overwriting legitimate Lovable visual edits.
- **`deploy-validator`** — invoke before pushing (build + lint + `vercel.json` sanity) and again ~60–90s after push (curl checks against both `rafael-schwart-bio.vercel.app` and `rafaelschwart.com`).

Each agent file has its own scoped tool allowlist and step-by-step playbook — read the agent's frontmatter before invoking if you're unsure whether it fits the situation.

## Personal Obsidian vault (master, outside this repo)

Rafael's mind map lives in his **master vault** at `C:/dev/Obsidian Vault/`. The bio content is consolidated under `wiki/Biography/` with these subfolders:

- `Identity/` — RAFAEL hub, Professional Summary, Contact, Education, Resume
- `Experience/` — 9 employer notes (Motorola Solutions, Magic Leap, Stryker, Gables Engineering, Robotray, TerraSmart, Piece-makers LLC, Prompt Aero Services, General MRO Aerospace)
- `Certifications/` — PMP, Six Sigma Green Belt, Agile Foundations, B.S. Mechanical Engineering
- `Skills/`, `Side projects/`, `Recommendations/`, `Infrastructure/`, `Site management/`

`Site management/` holds the runbooks for *this* repo (Project map, Workflows, Agents, Bio sources of truth, Ops cheat-sheet). Consumed by `scripts/build_profile_pdf.py` as one of the PDF's source materials. Hub note is `RAFAEL.md` under `Identity/`. The vault is **not** part of this git repo — it's a separate Obsidian vault entirely.

## What Lovable owns vs what survives

Lovable rewrites files when the user edits via Lovable's UI. To avoid having your changes clobbered:
- **Lovable-managed (risky to edit outside Lovable):** everything under `src/` — especially `App.tsx`, `src/pages/*`, `src/components/*`, `src/main.tsx`, `index.html`.
- **Safe to edit here and Lovable won't touch:** `public/*`, `scripts/*`, `profile/*`, `obsidian/*`, `.claude/*`, `vercel.json`, `.github/workflows/*`, `vite.config.ts` (usually), `.env`/`.env.example`, `CLAUDE.md`.

If Lovable overwrites the routing work in `App.tsx` or `Index.tsx`, re-apply the `/:section` route and `useParams` logic from the git history (commit `3d977bf`) — or invoke the `lovable-rescue` agent.

## Design system (`PRODUCT.md` + `DESIGN.md` at repo root)

- **`PRODUCT.md`** — brand brief consumed by the [impeccable](https://github.com/anthropics/skills/tree/main/skills/frontend/impeccable) skill. Captures who the site is for (recruiters, background-check vendors, AI agents, co-founders), Rafael's voice (declarative, em-dash-ok, no marketing hype), and anti-references (no SaaS-cream landing, no Apple-clone, no sidebar nav).
- **`DESIGN.md`** — design tokens / palette / typography / motion / banned patterns. Mirrors `src/index.css` + `tailwind.config.ts`. The visual language is **warm-earthy editorial**: cream parchment + charcoal + Fraunces serif, alternating section surfaces (peach / sage / ivory / clay / slate). Distilled from the Lovable design language during the 2026-05-01 design migration.

If you're using `/impeccable` or `/frontend-design`, read both before designing. If you change tokens in `src/index.css` or `tailwind.config.ts`, mirror the change into `DESIGN.md`. If brand strategy or anti-references shift, update `PRODUCT.md`.

## Git conventions

- `main` is the only branch; both Lovable and humans push to it.
- For commits from an unconfigured machine, use `git -c user.email="<handle>@users.noreply.github.com" -c user.name="<handle>"` per-command rather than setting global config.
- Include `Co-Authored-By: Claude <noreply@anthropic.com>` trailer when Claude made the edits.
- Don't `--amend` or rewrite Lovable's commits — they sync from Lovable's side.

## Sanity checks before pushing

```sh
npm run build              # must succeed
```

After pushing, Vercel rebuild takes ~30–60s. Verify from any shell:
```sh
curl -I https://rafael-schwart-bio.vercel.app/about           # expect 200
curl -sI https://rafael-schwart-bio.vercel.app/llms.txt | head -1   # expect 200
```
