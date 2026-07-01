import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ANNOUNCE, type SectionId } from "./data"
import { prefersReducedMotion, useAutoplayVideos, useCounters, useParallax, useReveal } from "./motion"
import { TopNav } from "./TopNav"
import { Hero } from "./Hero"
import { Brands } from "./Brands"
import { Stats } from "./Stats"
import { Method } from "./Method"
import { Experience } from "./Experience"
import { Work } from "./Work"
import { Credentials } from "./Credentials"
import { Contact } from "./Contact"
import { Footer } from "./Footer"

const DESKTOP_QUERY = "(min-width: 861px)"

const BASE_TITLE = "Rafael Schwart — Senior Operations Program Manager (NPI), Motorola Solutions"
const SECTION_TITLES: Record<SectionId, string> = {
  home: BASE_TITLE,
  method: `Method — ${BASE_TITLE}`,
  experience: `Experience — ${BASE_TITLE}`,
  work: `Work — ${BASE_TITLE}`,
  credentials: `Credentials — ${BASE_TITLE}`,
  contact: `Contact — ${BASE_TITLE}`,
}

type LandingProps = {
  /** Active section slug from the URL (`/method`, `/experience`, …). */
  section: SectionId
}

/**
 * V2 landing — a view-tabbed SPA on desktop (only the active
 * [data-viewsection] renders, swapped via CSS on [data-view-root]) and a
 * scroll-stacked page on mobile (≤860px), where the nav smooth-scrolls.
 * All sections stay in the DOM so every /:section deep link is crawlable.
 */
export function Landing({ section }: LandingProps) {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  useReveal(rootRef, [section])
  useCounters(rootRef, [section])
  useParallax(rootRef)
  useAutoplayVideos(rootRef, [section])

  const scrollToView = (id: SectionId) => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      window.scrollTo(0, 0)
      return
    }
    const el = rootRef.current?.querySelector(`[data-viewsection="${id}"]`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - 64
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  const navTo = (id: SectionId) => {
    // Re-clicking the active tab (or the logo on "/") shouldn't be a dead
    // click or stack a duplicate history entry — just scroll back to it.
    if (id === section) {
      scrollToView(id)
      return
    }
    navigate(id === "home" ? "/" : `/${id}`)
  }

  useEffect(() => {
    document.title = SECTION_TITLES[section]

    const isFirst = firstRender.current
    firstRender.current = false
    const desktop = window.matchMedia(DESKTOP_QUERY).matches

    if (desktop) {
      if (!isFirst) {
        window.scrollTo(0, 0)
        // Announce the view swap to assistive tech by moving focus to main.
        mainRef.current?.focus({ preventScroll: true })
      }
      return
    }
    // Mobile: smooth-scroll the stack to the requested section. Skip the
    // initial landing on "/" so the page doesn't jump under the reader.
    if (isFirst && section === "home") return
    const id = window.setTimeout(() => scrollToView(section), 80)
    return () => window.clearTimeout(id)
  }, [section])

  return (
    <div
      ref={rootRef}
      data-view-root={section}
      style={{ background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--fdisp)" }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-[var(--ink)] focus:text-[var(--paper)] focus:px-4 focus:py-2 focus:rounded-[3px]"
      >
        Skip to content
      </a>

      <div
        role="status"
        style={{
          background: "var(--beacon)",
          color: "#fff",
          textAlign: "center",
          padding: "9px 16px",
          fontFamily: "var(--fmono)",
          fontSize: 11.5,
          letterSpacing: ".08em",
        }}
      >
        {ANNOUNCE}
      </div>

      <TopNav view={section} onNav={navTo} />

      {/* Always in the a11y tree — the desktop view swap hides the hero, so
          the page-level h1 lives outside the viewsections. */}
      <h1 className="sr-only">{BASE_TITLE}</h1>

      <main id="main" ref={mainRef} tabIndex={-1} style={{ outline: "none" }}>
        <div data-viewsection="home">
          <Hero onNav={navTo} />
          <Brands />
          <Stats />
        </div>

        <div data-viewsection="method">
          <Method />
        </div>

        <div data-viewsection="experience">
          <Experience />
        </div>

        <div data-viewsection="work">
          <Work />
        </div>

        <div data-viewsection="credentials">
          <Credentials />
        </div>

        <div data-viewsection="contact">
          <Contact />
        </div>
      </main>

      <Footer onNav={navTo} />
    </div>
  )
}
