import { EMAIL, footer, type SectionId } from "./data"

type FooterProps = { onNav: (id: SectionId) => void }

const footerNav: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "method", label: "Method" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
]

/**
 * Footer — ink slab with the nav rail and the giant gradient wordmark
 * sinking off the bottom edge.
 */
export function Footer({ onNav }: FooterProps) {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 64px) clamp(20px, 5vw, 64px) 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span
            aria-hidden="true"
            style={{
              width: 30,
              height: 30,
              background: "var(--paper)",
              color: "var(--ink)",
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
          <span style={{ fontFamily: "var(--fmono)", fontSize: 11.5, letterSpacing: ".04em", color: "rgba(245,243,236,.7)" }}>
            {footer.tagline}
          </span>
        </div>
        <nav aria-label="Footer" style={{ display: "flex", gap: 26 }}>
          {footerNav.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onNav(n.id)}
              className="text-[rgba(245,243,236,.7)] transition-colors duration-150 ease-eng hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
              style={{
                appearance: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--fmono)",
                fontSize: 12,
                padding: "6px 0",
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
      <div
        style={{
          maxWidth: 1320,
          margin: "clamp(24px, 3vw, 40px) auto 0",
          padding: "16px clamp(20px, 5vw, 64px) 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          borderTop: "1px solid rgba(255,255,255,.12)",
        }}
      >
        <span className="tnum" style={{ fontFamily: "var(--fmono)", fontSize: 11, letterSpacing: ".06em", color: "rgba(245,243,236,.45)" }}>
          {footer.copyright}
        </span>
        <a
          href={`mailto:${EMAIL}`}
          className="text-[rgba(245,243,236,.45)] transition-colors duration-150 ease-eng hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
          style={{
            fontFamily: "var(--fmono)",
            fontSize: 11,
            letterSpacing: ".06em",
            textDecoration: "none",
          }}
        >
          {EMAIL}
        </a>
      </div>
      <div style={{ lineHeight: 0.8, marginTop: "clamp(8px, 1.5vw, 20px)", userSelect: "none" }} aria-hidden="true">
        <span
          style={{
            display: "block",
            fontFamily: "var(--fdisp)",
            fontWeight: 900,
            fontSize: "clamp(72px, 17vw, 250px)",
            letterSpacing: "-.04em",
            whiteSpace: "nowrap",
            background: "linear-gradient(180deg, #3a3a3a, #0f0f0f)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            transform: "translateY(18%)",
          }}
        >
          Rafael Schwart
        </span>
      </div>
    </footer>
  )
}
