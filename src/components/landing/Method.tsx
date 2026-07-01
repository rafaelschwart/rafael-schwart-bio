import { useRef, useState } from "react"
import { capabilities, phases, skills } from "./data"
import { CapabilityIconSvg, Eyebrow } from "./atoms"
import { snapSwap } from "./motion"

/**
 * Method view — the stage-gate operating model (3 selectable phases with a
 * dark detail panel) followed by the capabilities grid and the 24-skill
 * mono ledger on ink.
 */
export function Method() {
  const [phase, setPhase] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const cur = phases[Math.min(phase, phases.length - 1)]

  const selectPhase = (i: number) => {
    setPhase(i)
    snapSwap(panelRef.current)
  }

  return (
    <>
      {/* -------------------------------------------------- stage gate ---- */}
      <section style={{ borderBottom: "1px solid var(--rule-strong)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)" }}>
          <Eyebrow icon="crosshair">Operating method</Eyebrow>
          <h2
            data-reveal
            style={{
              fontFamily: "var(--fdisp)",
              fontWeight: 500,
              fontSize: "clamp(30px, 4.4vw, 54px)",
              lineHeight: 1.05,
              letterSpacing: "-.025em",
              margin: "22px 0 0",
              maxWidth: "18ch",
            }}
          >
            How a program moves from concept to volume.
          </h2>

          <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }} data-reveal>
            <div
              data-phase-track
              role="group"
              aria-label="Program phases"
              style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid var(--rule)" }}
            >
              {phases.map((p, i) => {
                const active = i === phase
                return (
                  <button
                    key={p.no}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectPhase(i)}
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                      flex: 1,
                      textAlign: "left",
                      border: "none",
                      borderTop: `2px solid ${active ? "var(--signal)" : "var(--rule)"}`,
                      background: active ? "var(--paper-2)" : "transparent",
                      padding: "22px clamp(16px, 2vw, 28px)",
                      fontFamily: "inherit",
                      transition: "background .18s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          display: "grid",
                          placeItems: "center",
                          border: `1px solid ${active ? "var(--signal)" : "var(--rule-strong)"}`,
                          background: active ? "var(--signal)" : "transparent",
                          color: active ? "#ffffff" : "var(--mute)",
                          fontFamily: "var(--fmono)",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {p.no}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--fmono)",
                          fontSize: 9.5,
                          letterSpacing: ".11em",
                          textTransform: "uppercase",
                          color: active ? "var(--signal)" : "var(--fade)",
                        }}
                      >
                        {p.gate}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--fdisp)",
                        fontWeight: 700,
                        fontSize: "clamp(15px, 1.6vw, 18px)",
                        letterSpacing: "-.01em",
                        marginTop: 14,
                        color: active ? "var(--ink)" : "var(--mute)",
                        transition: "color .18s ease",
                      }}
                    >
                      {p.title}
                    </div>
                  </button>
                )
              })}
            </div>
            <div ref={panelRef} data-phase-panel style={{ background: "var(--ink)", color: "var(--paper)" }}>
              <div
                data-phase-detail
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.08fr 1fr",
                  gap: "clamp(24px, 4vw, 52px)",
                  padding: "clamp(28px, 3.5vw, 44px)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--fmono)",
                      fontSize: 10.5,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--signal)",
                    }}
                  >
                    Phase {cur.no} · {cur.phase}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--fdisp)",
                      fontWeight: 500,
                      fontSize: "clamp(22px, 2.6vw, 32px)",
                      letterSpacing: "-.02em",
                      lineHeight: 1.1,
                      margin: "14px 0 0",
                    }}
                  >
                    {cur.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--fdisp)",
                      fontWeight: 400,
                      fontSize: 15,
                      lineHeight: 1.62,
                      color: "rgba(245,243,236,.72)",
                      margin: "16px 0 0",
                      maxWidth: "52ch",
                    }}
                  >
                    {cur.desc}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 11,
                      marginTop: 22,
                      padding: "11px 15px",
                      border: "1px solid rgba(255,255,255,.18)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--fmono)",
                        fontSize: 9.5,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(245,243,236,.5)",
                      }}
                    >
                      Exit gate
                    </span>
                    <span style={{ fontFamily: "var(--fdisp)", fontWeight: 600, fontSize: 13.5, color: "var(--signal)" }}>
                      {cur.gateFull}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--fmono)",
                        fontSize: 10,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(245,243,236,.5)",
                        borderBottom: "1px solid rgba(255,255,255,.14)",
                        paddingBottom: 11,
                      }}
                    >
                      Key deliverables
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                      {cur.deliverables.map((d) => (
                        <span
                          key={d}
                          style={{
                            fontFamily: "var(--fmono)",
                            fontSize: 10.5,
                            color: "rgba(245,243,236,.82)",
                            border: "1px solid rgba(255,255,255,.2)",
                            padding: "7px 12px",
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--fmono)",
                        fontSize: 10,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(245,243,236,.5)",
                        borderBottom: "1px solid rgba(255,255,255,.14)",
                        paddingBottom: 11,
                      }}
                    >
                      Tooling
                    </div>
                    <div style={{ fontFamily: "var(--fdisp)", fontSize: 14.5, color: "rgba(245,243,236,.82)", marginTop: 14 }}>
                      {cur.tools}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- capabilities ---- */}
      <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--ink)", color: "var(--paper)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)" }}>
          <Eyebrow tone="ink">Capabilities</Eyebrow>
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
            The toolset.
          </h2>

          <div
            data-feat-grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(20px, 3vw, 40px)",
              marginTop: "clamp(40px, 5vw, 60px)",
            }}
          >
            {capabilities.map((c) => (
              <div key={c.title} data-reveal>
                <CapabilityIconSvg icon={c.icon} />
                <h3 style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 16.5, letterSpacing: "-.01em", margin: "16px 0 0" }}>
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--fdisp)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(245,243,236,.6)",
                    margin: "9px 0 0",
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <ul
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "clamp(36px, 4vw, 52px)",
              border: "1px solid rgba(255,255,255,.16)",
              borderRight: "none",
              borderBottom: "none",
              width: "fit-content",
              maxWidth: "100%",
              listStyle: "none",
              padding: 0,
              marginBottom: 0,
            }}
          >
            {skills.map((sk) => (
              <li
                key={sk}
                className="text-[rgba(245,243,236,.82)] transition-colors duration-150 ease-eng hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 12,
                  letterSpacing: ".02em",
                  padding: "13px 18px",
                  borderRight: "1px solid rgba(255,255,255,.16)",
                  borderBottom: "1px solid rgba(255,255,255,.16)",
                }}
              >
                {sk}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
