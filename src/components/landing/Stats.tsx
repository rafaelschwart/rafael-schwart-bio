import { stats, statsHeadline } from "./data"

/**
 * Stats — the bench-grid canvas. Four ledger tiles whose readouts tick up
 * (anime.js counters, wired via [data-counter] in motion.ts) when revealed.
 */
export function Stats() {
  return (
    <section
      className="bench-grid bench-grid-drift"
      style={{ borderBottom: "1px solid var(--rule-strong)", background: "var(--paper-3)" }}
    >
      <div
        data-reveal
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--fdisp)",
            fontWeight: 500,
            fontSize: "clamp(30px, 4.6vw, 58px)",
            lineHeight: 1.06,
            letterSpacing: "-.025em",
            margin: "0 auto",
            maxWidth: "20ch",
          }}
        >
          {statsHeadline.lead} <span style={{ color: "var(--mute)" }}>{statsHeadline.tail}</span>
        </h2>
        <div
          data-stats-grid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--rule)",
            border: "1px solid var(--rule)",
            marginTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ background: "var(--paper-soft)", padding: "32px 20px" }}>
              <div
                className="tnum"
                data-counter
                data-value={s.value}
                data-suffix={s.suffix}
                style={{
                  fontFamily: "var(--fdisp)",
                  fontWeight: 500,
                  fontSize: "clamp(34px, 4vw, 52px)",
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                  color: s.accent ? "var(--signal)" : undefined,
                }}
              >
                {s.value}
                {s.suffix}
              </div>
              <div
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 10.5,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                  marginTop: 14,
                  whiteSpace: "pre-line",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
