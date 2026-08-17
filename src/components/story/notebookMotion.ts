/**
 * Notebook motion devices — anime.js 3.
 *
 * These animate the notebook's own vocabulary rather than generic UI: the
 * marker sweeps across a highlighted phrase, the handwritten notes write
 * themselves left-to-right, the ENTRY stamps hit the page, the tape presses
 * down, and the timeline spine draws as you descend the eras.
 *
 * The sweep/write/press devices are driven through CSS custom properties
 * (--hl, --write, --tape) whose defaults are the finished state, so any page
 * that doesn't run this controller renders identically without it.
 *
 * The highlighter follows the left-to-right on-scroll-into-view pattern from
 * 21st.dev's Text Highlighter (danielpetho), retimed to the ledger's easing:
 * engineered, no bounce, no overshoot.
 */

import { useEffect, type RefObject } from "react"
import anime from "animejs"
import { reduced } from "./motion"

const EASE = "cubicBezier(0.16, 1, 0.3, 1)"

/** Runs `play` once per element, the first time it crosses into view. */
function onceInView(
  els: HTMLElement[],
  flag: string,
  play: (el: HTMLElement, i: number) => void,
  threshold = 0.35,
) {
  if (!els.length) return () => undefined
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        if (el.dataset[flag] === "1") return
        el.dataset[flag] = "1"
        io.unobserve(el)
        play(el, els.indexOf(el))
      })
    },
    { threshold },
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/** Animates a CSS custom property from `from` to `to` on one element. */
function animateVar(
  el: HTMLElement,
  prop: string,
  from: number,
  to: number,
  duration: number,
  delay = 0,
) {
  const proxy = { v: from }
  el.style.setProperty(prop, String(from))
  anime({
    targets: proxy,
    v: to,
    duration,
    delay,
    easing: EASE,
    update: () => el.style.setProperty(prop, String(proxy.v)),
    complete: () => el.style.removeProperty(prop),
  })
}

export function useNotebookMotion(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return

    const q = <T extends Element>(sel: string) => Array.from(host.querySelectorAll<T>(sel))

    // Reduced motion: leave every device in its finished state (the CSS
    // defaults already are the finished state), so there is nothing to do.
    if (reduced()) return

    const cleanups: Array<() => void> = []

    /* ---- 1. Marker sweep across highlighted phrases ---------------------- */
    const marks = q<HTMLElement>(".nb-hl")
    marks.forEach((el) => el.style.setProperty("--hl", "0"))
    cleanups.push(
      onceInView(marks, "swiped", (el) => {
        animateVar(el, "--hl", 0, 1, 620)
      }),
    )

    /* ---- 2. Handwritten notes write themselves --------------------------- */
    const notes = q<HTMLElement>(".nb-hand, .nb-hand-sm")
    notes.forEach((el) => el.style.setProperty("--write", "0"))
    cleanups.push(
      onceInView(notes, "written", (el) => {
        animateVar(el, "--write", 0, 1, 900, 120)
      }),
    )

    /* ---- 3. Tape presses down from the centre ---------------------------- */
    const tapes = q<HTMLElement>(".nb-tape")
    tapes.forEach((el) => el.style.setProperty("--tape", "0.12"))
    cleanups.push(
      onceInView(tapes, "taped", (el) => {
        animateVar(el, "--tape", 0.12, 1, 520)
      }),
    )

    /* ---- 4. ENTRY stamps hit the page ------------------------------------ */
    const stamps = q<HTMLElement>(".nb-stamp-sq")
    cleanups.push(
      onceInView(
        stamps,
        "stamped",
        (el) => {
          anime({
            targets: el,
            scale: [1.9, 1],
            opacity: [0, 1],
            duration: 420,
            easing: EASE,
          })
        },
        0.6,
      ),
    )

    /* ---- 5. Timeline spine draws down ------------------------------------ */
    const spines = q<HTMLElement>(".st-spine")
    spines.forEach((el) => {
      el.style.transformOrigin = "top"
      el.style.transform = "scaleY(0)"
    })
    cleanups.push(
      onceInView(
        spines,
        "drawn",
        (el) => {
          anime({
            targets: el,
            scaleY: [0, 1],
            duration: 1100,
            easing: EASE,
            complete: () => {
              el.style.transform = ""
              el.style.transformOrigin = ""
            },
          })
        },
        0.05,
      ),
    )

    /* ---- 6. Card grids stagger in --------------------------------------- */
    // Grouped so each grid staggers on its own timeline rather than the whole
    // page sharing one — the pattern 21st's Stagger Reveal Grid uses.
    const grids = q<HTMLElement>("[data-stagger]")
    cleanups.push(
      onceInView(
        grids,
        "staggered",
        (grid) => {
          const items = Array.from(grid.children) as HTMLElement[]
          if (!items.length) return
          items.forEach((it) => (it.style.opacity = "0"))
          anime({
            targets: items,
            translateY: [22, 0],
            opacity: [0, 1],
            duration: 760,
            easing: EASE,
            delay: anime.stagger(70),
            complete: () => items.forEach((it) => (it.style.transform = "")),
          })
        },
        0.12,
      ),
    )

    /* ---- 7. Checklist ticks land one after another ----------------------- */
    const checkWraps = q<HTMLElement>("[data-checks]")
    cleanups.push(
      onceInView(
        checkWraps,
        "ticked",
        (wrap) => {
          const ticks = Array.from(wrap.querySelectorAll<HTMLElement>("[data-tick]"))
          if (!ticks.length) return
          ticks.forEach((t) => (t.style.opacity = "0"))
          anime({
            targets: ticks,
            opacity: [0, 1],
            scale: [0.4, 1],
            duration: 420,
            easing: EASE,
            delay: anime.stagger(26),
          })
        },
        0.1,
      ),
    )

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, ...deps])
}

/* ------------------------------------------------------- nav indicator ---- */

/**
 * Slides a hairline indicator under the active entry-index button. Animating
 * left/width on a single absolutely-positioned element, so nothing reflows.
 */
export function useNavIndicator(
  barRef: RefObject<HTMLElement>,
  indicatorRef: RefObject<HTMLElement>,
  activeId: string,
) {
  useEffect(() => {
    const bar = barRef.current
    const ind = indicatorRef.current
    if (!bar || !ind) return

    const btn = bar.querySelector<HTMLElement>(`[data-nav="${activeId}"]`)
    if (!btn) {
      ind.style.opacity = "0"
      return
    }

    const left = btn.offsetLeft - bar.scrollLeft
    const width = btn.offsetWidth

    if (reduced()) {
      ind.style.opacity = "1"
      ind.style.transform = `translateX(${left}px)`
      ind.style.width = `${width}px`
      return
    }

    ind.style.opacity = "1"
    anime.remove(ind)
    anime({
      targets: ind,
      translateX: left,
      width,
      duration: 420,
      easing: EASE,
    })
  }, [barRef, indicatorRef, activeId])
}
