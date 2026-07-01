/**
 * V2 motion layer — anime.js primitives for the engineering ledger.
 * draw / snap / settle: fade + 18px rise on reveal, counters that tick up,
 * a subtle scroll parallax on the video canvases. No spring, no bounce.
 * Everything short-circuits under prefers-reduced-motion.
 */

import { useEffect, useLayoutEffect, type RefObject, type DependencyList } from "react"
import anime from "animejs"

const EASE_SETTLE = "cubicBezier(0.2, 0, 0, 1)"

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/* ------------------------------------------------------------- reveal ---- */

/**
 * Scroll reveal controller. Elements marked [data-reveal] inside `root` rise
 * 18px and fade in over 0.6s. Above-the-fold elements play as one staggered
 * load sequence; the rest reveal as they enter the viewport.
 * Re-runs when `deps` change (e.g. the active view on desktop).
 */
export function useReveal(root: RefObject<HTMLElement>, deps: DependencyList = []) {
  // Layout effect so the initial hide lands before paint — no flash of
  // fully-visible content that then dims and re-animates.
  useLayoutEffect(() => {
    const host = root.current
    if (!host) return

    const els = Array.from(host.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (!els.length) return

    const showInstant = (el: HTMLElement) => {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.dataset.shown = "1"
    }

    if (prefersReducedMotion()) {
      els.forEach(showInstant)
      return
    }

    const rise = (targets: HTMLElement[], stagger = 55) => {
      targets.forEach((el) => (el.dataset.shown = "1"))
      anime({
        targets,
        translateY: [18, 0],
        opacity: [0, 1],
        duration: 600,
        easing: EASE_SETTLE,
        delay: anime.stagger(stagger),
        complete: () => targets.forEach((el) => (el.style.transform = "")),
      })
    }

    const vh = window.innerHeight || 800
    const aboveFold: HTMLElement[] = []
    const pending: HTMLElement[] = []
    els.forEach((el) => {
      if (el.dataset.shown === "1") return
      const rect = el.getBoundingClientRect()
      // display:none (inactive desktop view) reports a zero rect — leave those
      // for the next run, triggered when the view becomes active.
      if (rect.width === 0 && rect.height === 0) return
      el.style.opacity = "0"
      if (rect.top < vh * 0.96) aboveFold.push(el)
      else pending.push(el)
    })

    if (aboveFold.length) rise(aboveFold)

    let io: IntersectionObserver | undefined
    if (pending.length && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const hit = entries
            .filter((en) => en.isIntersecting)
            .map((en) => en.target as HTMLElement)
            // Skip anything already shown (e.g. by the rescue timer) so
            // visible content never blinks back to opacity 0 and re-rises.
            .filter((el) => el.dataset.shown !== "1")
          if (!hit.length) return
          hit.forEach((el) => io?.unobserve(el))
          rise(hit, 45)
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      )
      pending.forEach((el) => io?.observe(el))
    } else {
      pending.forEach(showInstant)
    }

    // Safety net — never leave content invisible if the observer misfires.
    const rescue = window.setTimeout(() => {
      els.forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          showInstant(el)
          io?.unobserve(el)
        }
      })
    }, 1600)

    return () => {
      io?.disconnect()
      window.clearTimeout(rescue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ----------------------------------------------------------- counters ---- */

/** Tick a stat readout from 0 to `value`, rendering `value + suffix`. */
export function animateCounter(el: HTMLElement, value: number, suffix = "") {
  if (prefersReducedMotion()) {
    el.textContent = `${value}${suffix}`
    return
  }
  const proxy = { v: 0 }
  anime({
    targets: proxy,
    v: value,
    round: 1,
    duration: 1400,
    easing: EASE_SETTLE,
    update: () => {
      el.textContent = `${proxy.v}${suffix}`
    },
  })
}

/**
 * Wires every [data-counter] inside `root` (reads data-value / data-suffix)
 * to tick up once when it scrolls into view.
 */
export function useCounters(root: RefObject<HTMLElement>, deps: DependencyList = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const els = Array.from(host.querySelectorAll<HTMLElement>("[data-counter]"))
    if (!els.length) return

    const run = (el: HTMLElement) => {
      if (el.dataset.counted === "1") return
      el.dataset.counted = "1"
      animateCounter(el, Number(el.dataset.value ?? "0"), el.dataset.suffix ?? "")
    }

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      els.forEach(run)
      return
    }
    // Zero the readouts up front (the final value stays in the static HTML
    // for crawlers / no-JS) so the tick-up never jumps backwards from the
    // painted final value to 0 when the tile crosses the threshold.
    els.forEach((el) => {
      if (el.dataset.counted !== "1") el.textContent = `0${el.dataset.suffix ?? ""}`
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            run(en.target as HTMLElement)
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ----------------------------------------------------------- parallax ---- */

/**
 * Slow counter-scroll drift on [data-parallax] elements (the grayscale video
 * loops). The attribute value is the travel in px across a viewport height.
 */
export function useParallax(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const host = root.current
    if (!host || prefersReducedMotion()) return
    const items = Array.from(host.querySelectorAll<HTMLElement>("[data-parallax]"))
    if (!items.length) return

    let ticking = false
    const update = () => {
      const vh = window.innerHeight || 800
      items.forEach((el) => {
        const anchor = el.closest("section, footer") ?? el.parentElement
        if (!anchor) return
        const r = anchor.getBoundingClientRect()
        if (!r.width) return
        const prog = (r.top + r.height / 2 - vh / 2) / vh
        const amt = parseFloat(el.dataset.parallax ?? "40") || 40
        const shift = Math.max(-1.2, Math.min(1.2, prog)) * amt
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
      })
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [root])
}

/* ------------------------------------------------------------- videos ---- */

/**
 * Muted-autoplay manager for the ambient video loops: plays a video while it
 * is on screen, pauses it off screen, and retries on the first interaction /
 * tab focus for browsers that block the initial play().
 */
export function useAutoplayVideos(root: RefObject<HTMLElement>, deps: DependencyList = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const vids = Array.from(host.querySelectorAll<HTMLVideoElement>("video"))
    if (!vids.length) return

    // Reduced motion: the ambient loops stay paused on their poster frames.
    if (prefersReducedMotion()) {
      vids.forEach((v) => v.pause())
      return
    }

    vids.forEach((v) => {
      v.defaultMuted = true
      v.muted = true
      v.volume = 0
    })
    const kick = (v: HTMLVideoElement) => {
      v.muted = true
      v.play()?.catch(() => {})
    }
    const kickVisible = () =>
      vids.forEach((v) => {
        const r = v.getBoundingClientRect()
        if (r.width && r.bottom > 0 && r.top < (window.innerHeight || 800)) kick(v)
      })

    kickVisible()

    let io: IntersectionObserver | undefined
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const v = en.target as HTMLVideoElement
            if (en.isIntersecting) kick(v)
            else v.pause()
          })
        },
        { threshold: 0.08 },
      )
      vids.forEach((v) => io?.observe(v))
    }

    const onVisibility = () => {
      if (!document.hidden) kickVisible()
    }
    document.addEventListener("visibilitychange", onVisibility)
    const once = () => {
      kickVisible()
      window.removeEventListener("scroll", once)
      window.removeEventListener("pointerdown", once)
    }
    window.addEventListener("scroll", once, { passive: true })
    window.addEventListener("pointerdown", once, { passive: true })

    return () => {
      io?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("scroll", once)
      window.removeEventListener("pointerdown", once)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ------------------------------------------------------------ re-snap ---- */

/** Snap-fade a swapped panel (experience / phase detail) — 0.38s rsFade. */
export function snapFade(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return
  el.style.animation = "none"
  void el.offsetWidth
  el.style.animation = "rsFade 0.38s cubic-bezier(0.42, 0, 0.58, 1)"
}

/**
 * Panel swap with depth: rsFade on the panel plus a short anime.js stagger of
 * its direct rows (35ms cadence, 10px rise) — snap, then settle.
 */
export function snapSwap(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return
  el.style.animation = "none"
  void el.offsetWidth
  el.style.animation = "rsFade 0.38s cubic-bezier(0.42, 0, 0.58, 1)"
  let rows = Array.from(el.querySelectorAll<HTMLElement>(":scope > *:not([aria-hidden])"))
  // A panel that wraps everything in one grid (Method) staggers its columns.
  if (rows.length === 1) {
    rows = Array.from(rows[0].querySelectorAll<HTMLElement>(":scope > *:not([aria-hidden])"))
  }
  if (!rows.length) return
  anime.remove(rows)
  anime({
    targets: rows,
    translateY: [10, 0],
    opacity: [0, 1],
    duration: 400,
    easing: EASE_SETTLE,
    delay: anime.stagger(35),
    complete: () =>
      rows.forEach((r) => {
        r.style.transform = ""
        r.style.opacity = ""
      }),
  })
}
