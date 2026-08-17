# Mobile Portfolio Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a lighter, more attractive, fully accessible mobile portfolio without visually changing the desktop site above 860px.

**Architecture:** Add a mobile-only navigation and summary layer alongside the untouched desktop rail, then refine phone/tablet CSS behind explicit media queries. Centralize compact-viewport detection so motion and media work can opt out without removing narrative content, and use existing Radix primitives for focus-safe overlays.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, Radix UI, CSS media queries, FFmpeg-generated responsive images.

**Spec:** `docs/superpowers/specs/2026-08-16-mobile-portfolio.md`

## Global Constraints

- All visual and layout changes apply only at viewport widths of 860px or less.
- The existing desktop layout, visual hierarchy, copy, and behavior above 860px remain visually unchanged.
- Preserve the existing paper, ink, signal-blue, tape, mono-label, and hard-shadow design language.
- Mobile primary interactive targets are at least 44px high.
- No ordinary horizontal clipping at 320, 360, 390, 430, or 768px.
- Use existing Radix/shadcn primitives before adding dependencies.
- Tests must exercise behavior rather than source-text snapshots.

---

### Task 1: Mobile navigation and recruiter-first shell

**Files:**
- Create: `src/components/story/mobile.ts`
- Create: `src/components/story/MobileStoryNav.tsx`
- Create: `src/components/story/MobileStoryNav.test.tsx`
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`
- Modify: `src/components/story/Story.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `COMPACT_VIEWPORT_QUERY = "(max-width: 860px)"` and `useCompactViewport(): boolean`.
- Produces: `MobileStoryNav({ items, activeId, onSelect })`, where each item has `id`, `label`, and optional `index`.
- Produces: Story DOM hooks `.st-mobile-index`, `.st-mobile-summary`, `.st-mobile-copy`, `.st-desktop-copy`, `#story-main`, and `.st-sr-status` for Task 2 styling.

- [ ] **Step 1: Add the test runner and write failing navigation tests**

Create real component tests that render `MobileStoryNav`, open the Entries panel, verify all nine section buttons are available, verify the active entry has `aria-current="page"`, and verify selecting an entry calls `onSelect(id)` and closes the panel. Add a test for Escape closing the panel.

- [ ] **Step 2: Run the focused test and observe the missing-component failure**

Run: `npm.cmd test -- MobileStoryNav.test.tsx`

Expected: FAIL because `MobileStoryNav.tsx` does not exist.

- [ ] **Step 3: Implement the compact navigation and Story integration**

Use a non-modal disclosure panel controlled by a 44px-or-taller Entries button. Keep the current desktop `.st-index` markup and styling path intact, add `aria-current` to both navigation variants, add a skip link, focus `#story-main` after mobile selection, and announce the selected label through a polite live region. Add mobile-only concise announcement and recruiter summary copy using the existing verified role and metrics.

- [ ] **Step 4: Run focused tests and the production build**

Run: `npm.cmd test -- MobileStoryNav.test.tsx`

Run: `npm.cmd run build`

Expected: all focused tests PASS and production build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json vitest.config.ts src/test/setup.ts src/components/story/mobile.ts src/components/story/MobileStoryNav.tsx src/components/story/MobileStoryNav.test.tsx src/components/story/Story.tsx
git commit -m "feat: add compact mobile portfolio navigation"
```

### Task 2: Responsive phone/tablet layout and portrait assets

**Files:**
- Create: `public/assets/headshot-mobile-480.webp`
- Create: `public/assets/headshot-mobile-720.webp`
- Modify: `src/components/story/Story.tsx`
- Modify: `src/components/story/story.css`
- Modify: `src/components/notebook/notebook.css`
- Test: `src/components/story/MobileStoryNav.test.tsx`

**Interfaces:**
- Consumes: Task 1 mobile shell class names and `COMPACT_VIEWPORT_QUERY`.
- Produces: phone layout through 599px, compact-tablet layout from 600px through 860px, responsive `<picture>` portrait sources, and mobile-only classes for Shipped metrics, Record grids, and recommendation grids.

- [ ] **Step 1: Extend the component test with mobile image and shell contracts**

Render the Story cover with a mocked compact viewport and assert that the recruiter summary is available, the portrait has mobile WebP source candidates, and desktop navigation remains present but separately identified for CSS control.

- [ ] **Step 2: Run the focused test and observe the missing responsive-source failure**

Run: `npm.cmd test -- MobileStoryNav.test.tsx`

Expected: FAIL because the mobile portrait sources and/or shell hooks are absent.

- [ ] **Step 3: Generate responsive assets and implement responsive layout rules**

Generate 480px and 720px WebP portrait variants from `public/assets/headshot.jpg`. Under `max-width: 860px`, replace the wrapped rail with the compact bar, remove mobile backdrop blur, raise contrast, enlarge targets, and keep the notebook visual language. Under `max-width: 599px`, use true single-column role/recommendation layouts and stack Shipped metrics without `nowrap`. Between 600px and 860px, restore selected two-column layouts and cap the portrait near 360px.

- [ ] **Step 4: Run tests, build, lint, and verify generated asset sizes**

Run: `npm.cmd test`

Run: `npm.cmd run build`

Run: `npm.cmd run lint`

Expected: tests/build PASS, lint has no errors, and each mobile portrait is materially smaller than the 3.21 MiB desktop JPEG.

- [ ] **Step 5: Commit**

```powershell
git add public/assets/headshot-mobile-480.webp public/assets/headshot-mobile-720.webp src/components/story/Story.tsx src/components/story/story.css src/components/notebook/notebook.css src/components/story/MobileStoryNav.test.tsx
git commit -m "feat: optimize portfolio layout for phones and tablets"
```

### Task 3: Mobile performance and accessibility hardening

**Files:**
- Modify: `src/components/story/mobile.ts`
- Modify: `src/components/story/mobile.test.ts`
- Modify: `src/components/story/motion.ts`
- Modify: `src/components/story/StoryAtoms.tsx`
- Modify: `src/components/story/Story.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/story/MobileStoryNav.test.tsx`

**Interfaces:**
- Consumes: `useCompactViewport()` and `COMPACT_VIEWPORT_QUERY` from Task 1.
- Produces: optional `enabled` parameters on `useYearRail`, `useParallax`, and `useProgress`; mobile-finished prose; user-initiated workflow media; poster-only decorative mobile media; focus-contained dossier dialog; lazy non-home routes.

- [ ] **Step 1: Write failing compact-viewport and accessibility tests**

Test `matchMedia` subscription behavior in `useCompactViewport`, test that mobile navigation exposes the active section and closes correctly, and test the dossier dialog closes with Escape while focus returns to its trigger.

- [ ] **Step 2: Run focused tests and observe behavior failures**

Run: `npm.cmd test -- mobile.test.ts MobileStoryNav.test.tsx`

Expected: FAIL for at least one missing compact-viewport subscription or focus-management behavior.

- [ ] **Step 3: Gate mobile work and correct semantics**

Skip year-rail, parallax, and reading-progress effects when compact. Render mobile Passage copy at final contrast without per-word listeners, do not autoplay mobile videos, and avoid eager media for hidden entries. Replace the custom dossier overlay with Radix Dialog primitives while preserving CSS classes. Remove unused query/toast providers and lazy-load Notebook/NotFound routes without changing visible desktop output.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm.cmd test`

Run: `npm.cmd run build`

Run: `npm.cmd run lint`

Run: `21st.cmd review src/components/story src/components/notebook/notebook.css src/App.tsx --json`

Expected: all tests/build PASS, lint has no errors, deterministic UI review has no error-level findings, and desktop-specific styles remain outside mobile media blocks.

- [ ] **Step 5: Commit**

```powershell
git add src/App.tsx src/components/story/mobile.ts src/components/story/mobile.test.ts src/components/story/motion.ts src/components/story/StoryAtoms.tsx src/components/story/Story.tsx src/components/story/MobileStoryNav.test.tsx
git commit -m "perf: lighten and harden the mobile portfolio"
```

