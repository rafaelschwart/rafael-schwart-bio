/**
 * Motion layer for /story — anime.js 3.
 *
 * Five behaviours, all of which honour prefers-reduced-motion:
 *   1. scroll-linked word reveal for the narrative passages (rAF, not anime)
 *   2. staggered chapter-header entrance  (anime)
 *   3. curtain wipe + slow scale-down on chapter images  (anime)
 *   4. SVG hairline draw under chapter numerals  (anime)
 *   5. the fixed year rail counter that ticks between chapters  (anime)
 *
 * Everything animates transform / opacity only.
 */

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react"
import anime from "animejs"

const EASE = "cubicBezier(0.16, 1, 0.3, 1)" // ease-out-expo-ish, no overshoot

export function reduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/* --------------------------------------------------------- word reveal ---- */

/**
 * Returns the number of words that should currently be "lit" inside `ref`,
 * driven by scroll position. The passage lights up as it crosses the reader's
 * eye line, then stays lit.
 */
export function useWordReveal(ref: RefObject<HTMLElement>, totalWords: number) {
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (reduced()) {
      setLit(totalWords)
      return
    }
    const el = ref.current
    if (!el) return

    let raf: number | null = null
    let target = 0
    let current = 0

    const tick = () => {
      current += (target - current) * 0.14
      if (Math.abs(target - current) > 0.0015) {
        setLit(Math.floor(current * totalWords))
        raf = requestAnimationFrame(tick)
      } else {
        current = target
        setLit(Math.floor(target * totalWords))
        raf = null
      }
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      // Reading line sits a little above centre; the passage is fully lit
      // once its last line has crossed it.
      const eye = vh * 0.68
      const start = rect.top - eye
      const distance = rect.height + vh * 0.18
      target = Math.max(0, Math.min(1, -start / distance))
      if (raf === null) raf = requestAnimationFrame(tick)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, totalWords])

  return lit
}

/* ------------------------------------------------------ chapter entrance --- */

/**
 * Wires every [data-enter] inside `root`: elements rise and fade as they cross
 * into view, staggered by their [data-enter-group]. Runs once per element.
 */
export function useEnter(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const host = root.current
    if (!host) return
    const els = Array.from(host.querySelectorAll<HTMLElement>("[data-enter]"))
    if (!els.length) return

    if (reduced()) {
      els.forEach((el) => {
        el.style.opacity = "1"
        el.style.transform = "none"
      })
      return
    }

    els.forEach((el) => {
      if (el.dataset.entered !== "1") el.style.opacity = "0"
    })

    const play = (batch: HTMLElement[]) => {
      batch.forEach((el) => (el.dataset.entered = "1"))
      anime({
        targets: batch,
        translateY: [26, 0],
        opacity: [0, 1],
        duration: 900,
        easing: EASE,
        delay: anime.stagger(70),
        complete: () => batch.forEach((el) => (el.style.transform = "")),
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .filter((el) => el.dataset.entered !== "1")
        if (!hit.length) return
        hit.forEach((el) => io.unobserve(el))
        play(hit)
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    els.forEach((el) => io.observe(el))

    // Safety net: never leave content invisible.
    const rescue = window.setTimeout(() => {
      els.forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          el.style.opacity = "1"
          el.style.transform = "none"
          el.dataset.entered = "1"
        }
      })
    }, 2600)

    return () => {
      io.disconnect()
      window.clearTimeout(rescue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, ...deps])
}

/* ----------------------------------------------------------- image wipe ---- */

/**
 * Chapter images reveal with a curtain that slides off while the photograph
 * settles from a slight overscale. [data-wipe] wraps the figure; the curtain
 * is [data-wipe-curtain] and the image [data-wipe-img].
 */
export function useImageWipe(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const figures = Array.from(host.querySelectorAll<HTMLElement>("[data-wipe]"))
    if (!figures.length) return

    if (reduced()) {
      figures.forEach((f) => {
        const c = f.querySelector<HTMLElement>("[data-wipe-curtain]")
        if (c) c.style.transform = "translateY(-101%)"
      })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const fig = e.target as HTMLElement
          if (fig.dataset.wiped === "1") return
          fig.dataset.wiped = "1"
          io.unobserve(fig)

          const curtain = fig.querySelector<HTMLElement>("[data-wipe-curtain]")
          const img = fig.querySelector<HTMLElement>("[data-wipe-img]")

          if (curtain) {
            anime({
              targets: curtain,
              translateY: ["0%", "-101%"],
              duration: 1100,
              easing: EASE,
            })
          }
          if (img) {
            anime({
              targets: img,
              scale: [1.12, 1],
              duration: 1600,
              easing: EASE,
            })
          }
        })
      },
      { threshold: 0.2 },
    )
    figures.forEach((f) => io.observe(f))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, ...deps])
}

/* -------------------------------------------------------- hairline draw ---- */

/** Draws every [data-draw] SVG path left-to-right when it enters view. */
export function useDraw(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const paths = Array.from(host.querySelectorAll<SVGPathElement>("[data-draw]"))
    if (!paths.length) return

    if (reduced()) {
      paths.forEach((p) => {
        p.style.strokeDashoffset = "0"
        p.style.strokeDasharray = "none"
      })
      return
    }

    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const p = e.target as SVGPathElement
          if (p.dataset.drawn === "1") return
          p.dataset.drawn = "1"
          io.unobserve(p)
          anime({
            targets: p,
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1200,
            easing: EASE,
          })
        })
      },
      { threshold: 0.5 },
    )
    paths.forEach((p) => io.observe(p))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, ...deps])
}

/* ------------------------------------------------------------- year rail --- */

/**
 * Ticks a fixed year readout between chapter values as they scroll past.
 * `years` is the ordered list of chapter years; the rail settles on whichever
 * chapter currently owns the reading line.
 */
export function useYearRail(
  root: RefObject<HTMLElement>,
  readout: RefObject<HTMLElement>,
  years: number[],
  enabled = true,
) {
  const activeRef = useRef<number>(-1)

  useEffect(() => {
    if (!enabled) {
      activeRef.current = -1
      return
    }
    const host = root.current
    if (!host) return
    const sections = Array.from(host.querySelectorAll<HTMLElement>("[data-year]"))
    if (!sections.length) return

    const proxy = { v: years[0] ?? 2014 }

    const setYear = (next: number) => {
      const el = readout.current
      if (!el) return
      if (reduced()) {
        el.textContent = String(next)
        proxy.v = next
        return
      }
      anime.remove(proxy)
      anime({
        targets: proxy,
        v: next,
        round: 1,
        duration: 700,
        easing: EASE,
        update: () => {
          el.textContent = String(proxy.v)
        },
      })
    }

    const onScroll = () => {
      const line = (window.innerHeight || 800) * 0.42
      let current = -1
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= line) current = i
      })
      if (current === -1) current = 0
      if (current === activeRef.current) return
      activeRef.current = current
      const y = Number(sections[current].dataset.year)
      if (!Number.isNaN(y)) setYear(y)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [root, readout, years, enabled])
}

/* -------------------------------------------------------------- parallax --- */

/** Slow counter-scroll drift on [data-parallax] (value = px of travel). */
export function useParallax(root: RefObject<HTMLElement>, enabled = true) {
  useEffect(() => {
    if (!enabled || reduced()) return
    const host = root.current
    if (!host) return
    const els = Array.from(host.querySelectorAll<HTMLElement>("[data-parallax]"))
    if (!els.length) return

    let raf: number | null = null
    const apply = () => {
      raf = null
      const vh = window.innerHeight || 800
      els.forEach((el) => {
        const travel = Number(el.dataset.parallax || "60")
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > vh + 200) return
        // -1 → 1 across the viewport
        const p = (rect.top + rect.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${(-p * travel).toFixed(2)}px, 0)`
      })
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(apply)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    apply()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root, enabled])
}

/* ------------------------------------------------------- reading progress -- */

/** 0→1 progress of the whole narrative, for the rail's progress hairline. */
export function useProgress(root: RefObject<HTMLElement>, enabled = true) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!enabled) {
      setP(0)
      return
    }
    const host = root.current
    if (!host) return
    let raf: number | null = null
    const calc = () => {
      raf = null
      const rect = host.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return setP(0)
      setP(Math.max(0, Math.min(1, -rect.top / total)))
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(calc)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    calc()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root, enabled])
  return p
}
