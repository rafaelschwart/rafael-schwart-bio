import { useEffect, useRef } from "react"
import anime from "animejs"
import { navItems, type SectionId } from "./data"
import { ArrowRight } from "./atoms"
import { prefersReducedMotion } from "./motion"

type TopNavProps = {
  view: SectionId
  onNav: (id: SectionId) => void
}

/**
 * Sticky category-tab nav. On desktop the tabs swap the active view; on
 * mobile the same rail (horizontally scrollable) smooth-scrolls the stack.
 * A single signal underline slides to the active tab (measure-and-slide
 * pattern sourced via 21st.dev, driven by anime.js on the settle curve).
 */
export function TopNav({ view, onNav }: TopNavProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const placedOnce = useRef(false)

  useEffect(() => {
    const rail = railRef.current
    const ind = indicatorRef.current
    if (!rail || !ind) return

    const place = (animate: boolean) => {
      const activeBtn = rail.querySelector<HTMLButtonElement>('button[aria-current="page"]')
      anime.remove(ind)
      if (!activeBtn) {
        // Contact view — no tab is active; the underline retracts.
        ind.style.width = "0px"
        return
      }
      const left = activeBtn.offsetLeft
      const width = activeBtn.offsetWidth
      if (!animate || prefersReducedMotion()) {
        ind.style.left = `${left}px`
        ind.style.width = `${width}px`
      } else {
        anime({
          targets: ind,
          left,
          width,
          duration: 350,
          easing: "cubicBezier(0.2, 0, 0, 1)",
        })
      }
      // Keep the active tab in view on the mobile scroll rail.
      activeBtn.scrollIntoView({ block: "nearest", inline: "nearest" })
    }

    place(placedOnce.current)
    placedOnce.current = true

    const remeasure = () => place(false)
    const ro = new ResizeObserver(remeasure)
    ro.observe(rail)
    window.addEventListener("resize", remeasure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", remeasure)
    }
  }, [view])

  return (
    <nav
      aria-label="Primary"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 80,
        background: "color-mix(in srgb, var(--paper) 90%, transparent)",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "13px clamp(20px, 5vw, 64px)",
        }}
      >
        <button
          type="button"
          onClick={() => onNav("home")}
          aria-label="Rafael Schwart — home"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
          style={{
            appearance: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: 0,
            color: "var(--ink)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 30,
              height: 30,
              background: "var(--ink)",
              color: "var(--paper)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--fdisp)",
              fontWeight: 900,
              fontSize: 15,
              letterSpacing: "-.03em",
            }}
          >
            R
          </span>
          <span
            style={{
              fontFamily: "var(--fdisp)",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-.02em",
              whiteSpace: "nowrap",
            }}
          >
            Rafael Schwart
          </span>
        </button>

        <div
          ref={railRef}
          className="rail"
          data-nav-links
          style={{ position: "relative", display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}
        >
          <span
            ref={indicatorRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 0,
              height: 2,
              background: "var(--signal)",
              pointerEvents: "none",
            }}
          />
          {navItems.map((n) => {
            const active = view === n.id
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onNav(n.id)}
                aria-current={active ? "page" : undefined}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                style={{
                  appearance: "none",
                  background: "none",
                  cursor: "pointer",
                  border: "none",
                  color: active ? "var(--ink)" : "var(--mute)",
                  fontFamily: "var(--fdisp)",
                  fontWeight: active ? 700 : 500,
                  fontSize: 14.5,
                  padding: "9px 13px",
                  whiteSpace: "nowrap",
                  transition: "color .18s ease",
                }}
              >
                {n.label}
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => onNav("contact")}
            aria-current={view === "contact" ? "page" : undefined}
            className={`group press ${
              view === "contact" ? "bg-[var(--signal)]" : "bg-[var(--ink)] hover:bg-[var(--signal)]"
            } transition-colors duration-200 ease-eng focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]`}
            style={{
              appearance: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              color: view === "contact" ? "#ffffff" : "var(--paper)",
              border: "none",
              padding: "11px 18px",
              borderRadius: 3,
              fontFamily: "var(--fdisp)",
              fontWeight: 700,
              fontSize: 14,
              marginLeft: 10,
              whiteSpace: "nowrap",
            }}
          >
            Get in touch
            <ArrowRight />
          </button>
        </div>
      </div>
    </nav>
  )
}
