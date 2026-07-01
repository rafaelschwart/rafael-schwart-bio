# PRODUCT.md

> Written for the impeccable / frontend-design skills — concise brand brief that survives sessions.
> Updated 2026-07-01 for the V2 "engineering ledger" redesign.

**Register:** brand. The site IS the product. It exists to convince a recruiter, hiring manager,
or co-founder to take Rafael seriously in 90 seconds.

## Product

A view-tabbed portfolio at https://rafaelschwart.com for **Rafael Schwart**, a PMP-certified
Senior Operations Program Manager (NPI) at Motorola Solutions in Miami, FL. Public positioning:
*"I take hardware from first build to volume production."* 10+ years across consumer electronics,
AR (Magic Leap), medical robotics (Stryker), aerospace, automation, and solar. Bilingual EN/ES,
born Caracas, Venezuela.

Information architecture (V2): **home** (hero, past companies, stats) · **method** (stage-gate
operating model, capabilities, 24 skills) · **experience** (9-company selector) · **work**
(4 ventures) · **credentials** (PMP + certs + references + employment verification) · **contact**.

## Users

1. **Recruiters / hiring managers** for senior program management, NPI, and process engineering
   roles. They want a fast scan: title, employer, dates, certs, hard outcomes.
2. **Background-check vendors** verifying employment dates and titles. They want official
   verification letters on letterhead (credentials view, real Drive links).
3. **AI agents** (ChatGPT, Claude, Perplexity) answering "who is Rafael Schwart?" — they want
   `llms.txt` and per-section deep links (`/method`, `/experience`, …).
4. **Co-founders / investors** evaluating the ventures (Arqentia, Tiento, Earth Robotics,
   Recovrz). They want to see range.

## Voice

Confident, declarative, technical — an engineer reading from the bench ledger. Short sentences.
Sentence fragments allowed in headlines ("Ten years, nine companies."). The mono uppercase
microcopy ("SELECT A COMPANY →", "GATE · PILOT YIELD MET", "● STATUS: ON TRACK") is part of the
voice — instrument labels, not decoration. No emoji. No marketing hype ("revolutionary,"
"game-changing"). Numbers do persuasion ("15% production lift at Magic Leap," "50%+ faster test
cycles at Gables"). Em dashes are part of Rafael's bio voice — preserve them in bio copy.

## Anti-references

- **No SaaS-cream "AI workflow" landing pages** — purple gradients, Inter everything, 3-column
  feature cards, hero-metric template.
- **No Apple-clone** single-blue-accent commerce polish, and no dark editorial portfolio with
  serif-on-black + neon accent. The site is warm paper with one blue signal.
- **No sidebar navigation.** The nav is a horizontal category-tab rail.
- **No stock photography.** The only photograph is the headshot; the only footage is the two
  grayscale workshop loops.
- **No confetti/spring/bounce motion.** Motion is draw / snap / settle — an instrument, not a toy.
- **Not the video brand.** The B&W + signal-blue JetBrains-Mono system in the Brand Manual PDFs
  is @rafa_flows short-form video, never the website.

## Strategic principles

1. **Real evidence over polish.** Rafael's strongest signal is named employers + verification
   letters + named recommenders + measured outcomes. The design displays these as ledger
   entries; it never decorates around them.
2. **View-tabbed but deep-linkable.** Desktop swaps views; mobile stacks and scrolls. Every
   section keeps a crawlable URL, and all content stays in the DOM for AI agents.
3. **One live wire.** Signal blue (#3664ff, owner-selected 2026-07-01, previously orange) marks
   what is active, measured, verified, or currently true. Discipline here is the brand.
4. **The headshot is the photograph.** One grayscale portrait in an instrument card (corner
   ticks, mono caption). Text never sits over photography without a scrim.
5. **data.ts is the source of truth.** Bio facts live in `src/components/landing/data.ts`,
   mirrored to `public/llms.txt`, then PDF + Pinecone via the bio-sync flow.

## Key facts (don't drift)

- Public contact email: `hi@rafaelschwart.com` (Google Workspace). Never restore
  `rrgschwart@hotmail.com` / `rafaelschwart@gmail.com`.
- Headshot: `/assets/headshot.jpg` (V2). Hero/contact loops: `/assets/hero-loop.mp4`,
  `/assets/contact-loop.mp4` with poster JPGs.
- LinkedIn: `https://www.linkedin.com/in/rafaelschwart/`.
- Résumé: `https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link`.
- 9 employers; current is Motorola Solutions (2024–present). Featured metric: 15% production
  lift at Magic Leap.
- Active certifications: PMP (PMI, Credly-verifiable), Six Sigma Green Belt (ASQ),
  Agile Foundations.
- Ventures: Arqentia (Co-Founder), Tiento (CTO, tiento.io), Earth Robotics (Mechanical
  Engineer), Recovrz (Co-Founder).
