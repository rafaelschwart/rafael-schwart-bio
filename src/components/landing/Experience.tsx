import { useRef, useState } from "react"
import { experience, pipelineStages } from "./data"
import { Chip, CornerTick, Eyebrow } from "./atoms"
import { snapSwap } from "./motion"

/**
 * Experience view — nine-company selector rail on paper, dark detail panel
 * on ink. The featured Motorola card carries the live NPI program pipeline
 * (CONCEPT → PILOT → RAMP → VOLUME) with the ramp node pulsing.
 */
export function Experience() {
  const [sel, setSel] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const cur = experience[Math.min(sel, experience.length - 1)]

  const select = (i: number) => {
    setSel(i)
    snapSwap(panelRef.current)
  }

  return (
    <section style={{ borderBottom: "1px solid var(--rule-strong)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <Eyebrow>Experience</Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--fdisp)",
            fontWeight: 500,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.025em",
            margin: "22px 0 0",
            maxWidth: "16ch",
          }}
        >
          Ten years, nine companies.
        </h2>
        <p data-reveal style={{ fontFamily: "var(--fmono)", fontSize: 11.5, letterSpacing: ".06em", color: "var(--fade)", margin: "16px 0 0" }}>
          SELECT A COMPANY →
        </p>

        <div
          data-reveal
          data-exp-grid
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 306px) 1fr",
            gap: 1,
            background: "var(--rule)",
            border: "1px solid var(--rule)",
            marginTop: "clamp(28px, 3vw, 40px)",
          }}
        >
          <div
            role="group"
            aria-label="Companies"
            data-exp-list
            className="rail"
            style={{ background: "var(--paper)", display: "flex", flexDirection: "column" }}
          >
            {experience.map((e, i) => {
              const active = i === sel
              return (
                <button
                  key={e.company}
                  type="button"
                  aria-pressed={active}
                  data-active={active ? "true" : undefined}
                  onClick={() => select(i)}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    width: "100%",
                    border: "none",
                    borderLeft: `3px solid ${active ? "var(--signal)" : "transparent"}`,
                    borderBottom: "1px solid var(--rule)",
                    background: active ? "var(--paper-2)" : "transparent",
                    padding: "15px 18px",
                    fontFamily: "inherit",
                    transition: "background .16s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 14.5, letterSpacing: "-.01em", color: "var(--ink)" }}>
                      {e.company}
                    </span>
                    <span className="tnum" style={{ fontFamily: "var(--fmono)", fontSize: 9.5, letterSpacing: ".04em", color: "var(--fade)", whiteSpace: "nowrap" }}>
                      {e.years}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--fmono)",
                      fontSize: 10,
                      letterSpacing: ".03em",
                      textTransform: "uppercase",
                      color: "var(--mute)",
                      marginTop: 6,
                    }}
                  >
                    {e.roleShort}
                  </div>
                </button>
              )
            })}
          </div>

          <div
            ref={panelRef}
            data-exp-panel
            style={{ position: "relative", background: "var(--ink)", color: "var(--paper)", padding: "clamp(26px, 3vw, 44px)" }}
          >
            <CornerTick corner="tr" size={11} color="rgba(255,255,255,.3)" inset={12} />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <span className="tnum" style={{ fontFamily: "var(--fmono)", fontSize: 11, letterSpacing: ".06em", padding: "7px 12px", border: "1px solid rgba(255,255,255,.24)" }}>
                {cur.dates}
              </span>
              <span
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 10.5,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "rgba(245,243,236,.5)",
                }}
              >
                {cur.industry}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--fdisp)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.7vw, 32px)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                margin: "20px 0 0",
              }}
            >
              {cur.title}
            </h3>
            <div style={{ fontFamily: "var(--fmono)", fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--signal)", marginTop: 10 }}>
              {cur.company} · {cur.location}
            </div>
            <p style={{ fontFamily: "var(--fdisp)", fontWeight: 400, fontSize: 15, lineHeight: 1.62, color: "rgba(245,243,236,.7)", margin: "18px 0 0", maxWidth: "66ch" }}>
              {cur.summary}
            </p>

            {cur.metric && (
              <div style={{ display: "inline-flex", alignItems: "baseline", gap: 11, marginTop: 20, padding: "12px 16px", border: "1px solid rgba(255,255,255,.16)" }}>
                <span className="tnum" style={{ fontFamily: "var(--fdisp)", fontWeight: 500, fontSize: 28, color: "var(--signal)", lineHeight: 1 }}>
                  {cur.metricValue}
                </span>
                <span
                  style={{
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "rgba(245,243,236,.6)",
                  }}
                >
                  {cur.metric}
                </span>
              </div>
            )}

            {cur.featured && (
              <div style={{ marginTop: 22, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.02)" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "11px 16px",
                    borderBottom: "1px solid rgba(255,255,255,.14)",
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: ".1em",
                    color: "rgba(245,243,236,.5)",
                  }}
                >
                  <span>PROGRAM PIPELINE · NPI</span>
                  <span style={{ color: "var(--signal)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: "rsBlip 2.4s ease-in-out infinite" }} />
                    STATUS: ON TRACK
                  </span>
                </div>
                <div data-pipeline style={{ display: "flex", alignItems: "stretch", padding: 16 }}>
                  {(() => {
                    const liveIdx = pipelineStages.findIndex((s) => s.active)
                    return pipelineStages.map((st, i) => {
                      const state: "done" | "live" | "next" = st.active ? "live" : i < liveIdx ? "done" : "next"
                      return (
                        <div key={st.label} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 7,
                              minWidth: 0,
                              padding: "11px 8px",
                              border:
                                state === "live"
                                  ? "1px solid var(--signal)"
                                  : state === "done"
                                    ? "1px solid rgba(255,255,255,.28)"
                                    : "1px dashed rgba(255,255,255,.16)",
                              background: state === "live" ? "var(--signal)" : "transparent",
                              fontFamily: "var(--fmono)",
                              fontSize: 10.5,
                              letterSpacing: ".06em",
                              color:
                                state === "live"
                                  ? "#ffffff"
                                  : state === "done"
                                    ? "rgba(245,243,236,.75)"
                                    : "rgba(245,243,236,.4)",
                              animation: state === "live" ? "rsRamp 2.4s ease-in-out infinite" : "none",
                            }}
                          >
                            {state === "done" && (
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            )}
                            {state === "live" && (
                              <span aria-hidden="true" style={{ width: 5, height: 5, background: "#ffffff", flex: "none" }} />
                            )}
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{st.label}</span>
                            <span className="sr-only">
                              {state === "done" ? " (complete)" : state === "live" ? " (in progress)" : " (upcoming)"}
                            </span>
                          </div>
                          {st.arrow && (
                            <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true" style={{ flex: "none" }}>
                              <line
                                x1="0"
                                y1="4"
                                x2="18"
                                y2="4"
                                stroke={i < liveIdx ? "var(--signal)" : "rgba(255,255,255,.22)"}
                                strokeWidth="1.5"
                                strokeDasharray="4 5"
                                style={i < liveIdx ? { animation: "rsDash 1.1s linear infinite" } : undefined}
                              />
                            </svg>
                          )}
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", marginTop: 22, borderTop: "1px solid rgba(255,255,255,.14)" }}>
              {cur.bullets.map((bl) => (
                <div
                  key={bl}
                  style={{
                    display: "flex",
                    gap: 13,
                    fontFamily: "var(--fdisp)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(245,243,236,.82)",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,.14)",
                  }}
                >
                  <span aria-hidden="true" style={{ width: 5, height: 5, background: "var(--signal)", flex: "none", marginTop: 8 }} />
                  <span>{bl}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {cur.tags.map((tg) => (
                <Chip key={tg}>{tg}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
