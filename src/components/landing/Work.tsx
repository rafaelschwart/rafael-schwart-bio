import { projects } from "./data"
import { ArrowUpRight, CornerTick, Eyebrow } from "./atoms"

/**
 * Work view — the four ventures on ink, a 2×2 hairline grid of dark cards
 * with corner ticks and mono outbound links.
 */
export function Work() {
  return (
    <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--ink)", color: "var(--paper)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <Eyebrow tone="ink">Outside the day job</Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--fdisp)",
            fontWeight: 500,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.025em",
            margin: "22px 0 0",
          }}
        >
          Ventures I'm building.
        </h2>
        <div
          data-projects-grid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,.16)",
            border: "1px solid rgba(255,255,255,.16)",
            marginTop: "clamp(36px, 4vw, 52px)",
          }}
        >
          {projects.map((p) => (
            <div
              key={p.name}
              data-reveal
              style={{
                position: "relative",
                background: "var(--ink)",
                padding: "clamp(26px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CornerTick corner="tr" size={9} color="rgba(255,255,255,.24)" inset={12} />
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <h3
                  style={{
                    fontFamily: "var(--fdisp)",
                    fontWeight: 500,
                    fontSize: "clamp(20px, 2.4vw, 27px)",
                    letterSpacing: "-.02em",
                    margin: 0,
                  }}
                >
                  {p.name}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--signal)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.role}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--fdisp)",
                  fontWeight: 400,
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "rgba(245,243,236,.64)",
                  margin: "18px 0 0",
                }}
              >
                {p.desc}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                aria-label={`${p.name} — ${p.label} (opens in a new tab)`}
                className="group text-[var(--paper)] transition-colors duration-200 ease-eng hover:text-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--fmono)",
                  fontSize: 12,
                  letterSpacing: ".02em",
                  textDecoration: "none",
                  marginTop: 22,
                  borderBottom: "1px solid rgba(255,255,255,.4)",
                  paddingBottom: 3,
                  width: "fit-content",
                }}
              >
                {p.label}
                <ArrowUpRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
