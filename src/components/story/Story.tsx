/**
 * /story — the whole professional profile, built in the NOTEBOOK design.
 *
 * Design system: `components/notebook` (spiral binding, ruled paper, margin
 * rule, ENTRY stamps, highlighter swipes, tape, sticker cards, handwritten
 * margin notes, night-mode spreads). Colours are the V2 tokens throughout —
 * paper, ink, blue signal.
 *
 * What this page adds over the original notebook page:
 *   · Rafael's photograph, taped onto the cover
 *   · a chronological story: six eras with narrative between the facts
 *   · the complete record — 9 roles, 4 recommendation letters, 3 employment
 *     verifications, every certification, the method, 24 skills, 4 ventures
 *   · an anime.js motion pass (reveals, counters, drawn rules, plate wipes,
 *     parallax, a year rail) and a scroll-linked word reveal
 */

import { useEffect, useRef, useState } from "react"
import {
  ANNOUNCE,
  CONTACT_POSTER,
  CONTACT_VIDEO,
  EMAIL,
  HEADSHOT_SRC,
  LINKEDIN_URL,
  RESUME_URL,
  capabilities,
  certifications,
  footer as footerData,
  phases,
  pipelineStages,
  pmp,
  projects,
  refs,
  skills,
  stats,
  statsHeadline,
  verifs,
} from "@/components/landing/data"
import {
  CheckRow,
  EntryStamp,
  Hl,
  NbCard,
  NbCta,
  Scribble,
  Spread,
  StickyNote,
  Strike,
  TapeMarquee,
  Ul,
} from "@/components/notebook/NbAtoms"
import { useCounters } from "@/components/landing/motion"
import { coda, eras, footerPitch, opening, parallel, prologue, storyNav } from "./chapters"
import { CompanyModal, DrawRule, Metric, Passage, Plate, RoleCard } from "./StoryAtoms"
import { reduced, useDraw, useEnter, useImageWipe, useParallax, useProgress, useYearRail } from "./motion"
import { useNavIndicator, useNotebookMotion } from "./notebookMotion"
import "@/components/notebook/notebook.css"
import "./story.css"

const CAVEAT =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap"

/**
 * The announce bar reads from `landing/data.ts` so every surface stays in
 * sync. That copy is deliberately a positioning statement, not an
 * availability signal — this is a portfolio.
 */

/** Year marker read by the rail; zero-height, sits at the top of a section. */
function YearMark({ year }: { year: number }) {
  return <span data-year={year} aria-hidden style={{ display: "block", height: 0 }} />
}

export function Story() {
  const rootRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const navBarRef = useRef<HTMLDivElement>(null)
  const navIndRef = useRef<HTMLSpanElement>(null)
  const [activeId, setActiveId] = useState("cover")
  const [dossier, setDossier] = useState<string | null>(null)

  useEnter(rootRef)
  useImageWipe(rootRef)
  useDraw(rootRef)
  useParallax(rootRef)
  useCounters(rootRef, [])
  useYearRail(rootRef, yearRef, eras.map((e) => e.yearValue))
  useNotebookMotion(rootRef)
  useNavIndicator(navBarRef, navIndRef, activeId)
  const progress = useProgress(rootRef)

  // Caveat carries the handwritten margin notes; loaded only while mounted so
  // index.html keeps its canonical Satoshi + IBM Plex Mono head.
  useEffect(() => {
    if (document.querySelector(`link[href="${CAVEAT}"]`)) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = CAVEAT
    document.head.appendChild(link)
    return () => link.remove()
  }, [])

  useEffect(() => {
    document.title =
      "Rafael Schwart — Senior Operations Program Manager (NPI), Motorola Solutions"
  }, [])

  useEffect(() => {
    const host = rootRef.current
    if (!host) return
    const vids = Array.from(host.querySelectorAll("video"))
    if (!vids.length || reduced()) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) void v.play().catch(() => undefined)
          else v.pause()
        }),
      { threshold: 0.25 },
    )
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const ids = storyNav.map((n) => n.id)
    const onScroll = () => {
      const line = window.innerHeight * 0.4
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActiveId(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 52,
      behavior: reduced() ? "auto" : "smooth",
    })
  }

  const marquee = [
    <>Aerospace</>,
    <Strike key="s1">guesswork</Strike>,
    <>Solar</>,
    <Strike key="s2">slideware</Strike>,
    <>Automation</>,
    <Strike key="s3">hand-offs</Strike>,
    <>Medical robotics</>,
    <Strike key="s4">surprises at ramp</Strike>,
    <>Augmented reality</>,
    <Strike key="s5">firefighting</Strike>,
    <>Communications</>,
  ]

  return (
    <div ref={rootRef} className="nb nb-paper st-root">
      {/* Spiral binding + margin rule — the notebook shell */}
      <div className="nb-rail" aria-hidden />
      <div className="nb-margin-rule" aria-hidden />

      {/* Year rail hung off the binding */}
      <aside className="st-yearrail" aria-hidden>
        <span className="st-yearlabel">The record</span>
        <div className="st-track">
          <div className="st-fill" style={{ transform: `scaleY(${progress})` }} />
        </div>
        <span className="st-year" ref={yearRef}>
          2014
        </span>
      </aside>

      <div className="nb-page">
        {/* ------------------------------------------------- announce --- */}
        <div
          role="status"
          style={{
            background: "var(--signal)",
            color: "#fff",
            textAlign: "center",
            padding: "9px 16px",
            fontFamily: "var(--fmono)",
            fontSize: 11.5,
            letterSpacing: ".08em",
          }}
        >
          ● {ANNOUNCE}
        </div>

        {/* ------------------------------------------------ entry index --- */}
        <nav className="st-index" aria-label="Entries">
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "0 clamp(20px, 4vw, 56px)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <a
              href="/"
              className="st-wordmark"
              style={{
                fontFamily: "var(--fmono)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "var(--ink)",
                textDecoration: "none",
                flex: "none",
              }}
            >
              rs<span style={{ color: "var(--signal)" }}>_</span>
            </a>
            <div
              ref={navBarRef}
              className="st-navbar"
              style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" }}
            >
              {storyNav.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  data-nav={n.id}
                  onClick={() => jump(n.id)}
                  data-active={activeId === n.id ? "1" : undefined}
                >
                  {n.label}
                </button>
              ))}
              <span ref={navIndRef} className="st-navind" aria-hidden />
            </div>
          </div>
        </nav>

        <main>
          {/* ============================================ ENTRY 01 ==== */}
          <Spread id="cover" style={{ paddingTop: "clamp(38px, 5vw, 68px)" }}>
            <YearMark year={2014} />
            <div
              className="st-two"
              style={{
                display: "grid",
                gridTemplateColumns: "1.12fr 0.88fr",
                gap: "clamp(28px, 5vw, 60px)",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}
                  data-enter
                >
                  <span
                    style={{
                      fontFamily: "var(--fmono)",
                      fontSize: 10.5,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "var(--signal)",
                      color: "#fff",
                      border: "1px solid var(--ink)",
                      padding: "6px 10px",
                    }}
                  >
                    Field notebook · vol. 03 · always current
                  </span>
                </div>

                <p
                  className="nb-stamp"
                  style={{ margin: "22px 0 10px" }}
                  data-enter
                >
                  {opening.eyebrow}
                </p>

                <h1
                  className="display-xl"
                  style={{ margin: "0 0 6px", fontSize: "clamp(32px, 4.1vw, 58px)", maxWidth: "16ch" }}
                  data-enter
                >
                  Twelve years of engineering,{" "}
                  <Hl>
                    <em style={{ fontStyle: "italic" }}>in the order it happened.</em>
                  </Hl>
                </h1>

                <DrawRule width={480} />

                <p
                  style={{ fontSize: 16.5, lineHeight: 1.62, color: "var(--ink-2)", maxWidth: "56ch" }}
                  data-enter
                >
                  {opening.sub}
                </p>

                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "24px 0 26px" }}
                  data-enter
                >
                  {opening.proof.map((p) => (
                    <span
                      key={p}
                      className="nb-card nb-lift-soft"
                      style={{
                        padding: "8px 12px",
                        fontFamily: "var(--fmono)",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span style={{ color: "var(--signal)" }}>✓</span> {p}
                    </span>
                  ))}
                </div>

                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}
                  data-enter
                >
                  <NbCta href={`mailto:${EMAIL}`}>Start a conversation</NbCta>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{ fontSize: 14.5, color: "var(--ink-2)" }}
                  >
                    Or open the resume ↓
                  </a>
                </div>

                <Scribble tone="signal" size="sm" style={{ marginTop: 22 }}>
                  twelve years of it, written down and dated ↓
                </Scribble>
              </div>

              {/* ---- Rafael's photograph, taped to the cover ---- */}
              <div>
                <NbCard tape tilt="r" lift style={{ padding: 14 }}>
                  <img
                    src={HEADSHOT_SRC}
                    alt="Rafael Schwart"
                    loading="eager"
                    decoding="async"
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 5",
                      objectFit: "cover",
                      display: "block",
                      filter: "grayscale(1) contrast(1.04)",
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      paddingTop: 12,
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 15 }}>Rafael Schwart</span>
                    <span className="nb-stamp" style={{ fontSize: 10 }}>
                      Miami, FL
                    </span>
                  </div>
                  <p className="nb-hand-sm" style={{ marginTop: 4 }}>
                    bench → pilot line → volume, nine times over
                  </p>
                </NbCard>

                <StickyNote style={{ marginTop: 22, transform: "rotate(1.4deg)" }}>
                  <p
                    className="nb-stamp"
                    style={{ marginBottom: 6, fontSize: 10, color: "var(--signal)" }}
                  >
                    Pinned
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>
                    Senior Operations Program Manager, NPI at{" "}
                    <strong>Motorola Solutions</strong>. Nine companies, six industries, and twelve
                    years of getting hardware to volume.
                  </p>
                </StickyNote>
              </div>
            </div>
          </Spread>

          <div style={{ padding: "22px 0 6px" }}>
            <TapeMarquee items={marquee} />
          </div>

          {/* ============================================ ENTRY 02 ==== */}
          <Spread tone="soft">
            <YearMark year={2014} />
            <EntryStamp entry="02" title="where it starts" note={prologue.standfirst} />
            <h2 className="st-h2" style={{ margin: "24px 0 0", maxWidth: "18ch" }} data-enter>
              {prologue.title}
            </h2>
            <DrawRule width={380} />
            <Passage paragraphs={prologue.passage} />
            <Scribble style={{ marginTop: 28 }}>
              <Ul>and then it goes, in order</Ul> ↓
            </Scribble>
          </Spread>

          {/* ======================================= ERAS 03 — 08 ==== */}
          {eras.map((era, i) => {
            const entryNo = String(i + 3).padStart(2, "0")
            return (
              <div key={era.id}>
                <Spread id={era.id} tone={i % 2 === 1 ? "soft" : "paper"}>
                  <YearMark year={era.yearValue} />
                  <div className="st-era">
                    <span className="st-spine" aria-hidden />

                    <div
                      className="st-era-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.1fr 0.9fr",
                        gap: "clamp(28px, 5vw, 62px)",
                        alignItems: "start",
                      }}
                    >
                      <div>
                        <EntryStamp
                          entry={entryNo}
                          title={era.title}
                          note={era.span}
                        />
                        <h2 className="st-h2" style={{ margin: "22px 0 0" }} data-enter>
                          {i === 5 ? (
                            <Hl>
                              <span>{era.title}</span>
                            </Hl>
                          ) : (
                            era.title
                          )}
                        </h2>
                        <DrawRule width={440} />
                        <p className="nb-stamp" style={{ marginBottom: 24 }} data-enter>
                          {era.standfirst}
                        </p>
                        <Passage paragraphs={era.passage} />

                        {era.metric ? (
                          <div style={{ marginTop: 38 }}>
                            <Metric {...era.metric} />
                          </div>
                        ) : null}
                      </div>

                      <div style={{ position: "sticky", top: 92 }}>
                        <Plate
                          src={era.plate}
                          alt={era.plateAlt}
                          label={era.plateLabel}
                          index={era.span}
                          ratio={era.id === "drawing" ? "4 / 5" : "4 / 3"}
                          tilt={i % 2 === 0 ? "l" : "r"}
                          priority={i === 0}
                        />
                      </div>
                    </div>

                    {/* the complete record for this era */}
                    <div style={{ marginTop: "clamp(36px, 5vw, 68px)" }}>
                      <p className="nb-stamp" style={{ marginBottom: 14 }} data-enter>
                        From the record · {era.companies.length}{" "}
                        {era.companies.length === 1 ? "role" : "roles"}
                      </p>
                      <div
                        data-stagger
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            era.companies.length > 1
                              ? "repeat(auto-fit, minmax(285px, 1fr))"
                              : "1fr",
                          gap: 18,
                        }}
                      >
                        {era.companies.map((e) => (
                          <RoleCard
                            key={e.company}
                            e={e}
                            live={e.company === "Motorola Solutions"}
                            onKnowMore={setDossier}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Spread>

                {/* NIGHT MODE numbers spread, dropped in after "The line" */}
                {era.id === "line" ? (
                  <Spread tone="night" graph>
                    <EntryStamp entry="06" title="the numbers" note="night mode" />
                    <h2
                      className="st-h2"
                      style={{ margin: "24px 0 40px", maxWidth: 780, color: "var(--paper)" }}
                      data-enter
                    >
                      {statsHeadline.lead}{" "}
                      <Hl ink>
                        <span style={{ color: "#fff" }}>{statsHeadline.tail}</span>
                      </Hl>
                    </h2>

                    <div
                      className="nb-grid-4"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 26,
                      }}
                    >
                      {stats.map((s) => (
                        <div key={s.label} data-enter>
                          <div
                            className="tnum"
                            data-counter
                            data-value={s.value}
                            data-suffix={s.suffix}
                            style={{
                              fontSize: "clamp(38px, 5vw, 64px)",
                              fontWeight: 700,
                              letterSpacing: "-0.03em",
                              lineHeight: 1,
                              color: s.accent ? "var(--signal)" : "var(--paper)",
                            }}
                          >
                            {s.value}
                            {s.suffix}
                          </div>
                          <p
                            style={{
                              whiteSpace: "pre-line",
                              fontSize: 13,
                              lineHeight: 1.5,
                              color: "rgba(245,243,236,0.64)",
                              marginTop: 12,
                            }}
                          >
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="nb-hand" style={{ marginTop: 26 }} data-enter>
                      every one of these walked the same path ↓
                    </p>

                    <NbCard style={{ padding: "22px 24px", marginTop: 32 }}>
                      <div
                        data-pipeline
                        style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}
                      >
                        {pipelineStages.map((st) => (
                          <div
                            key={st.label}
                            style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}
                          >
                            <span
                              style={{
                                flex: 1,
                                textAlign: "center",
                                fontFamily: "var(--fmono)",
                                fontSize: 11.5,
                                letterSpacing: "0.12em",
                                padding: "11px 8px",
                                border: `1px solid ${
                                  st.active ? "var(--signal)" : "rgba(245,243,236,0.22)"
                                }`,
                                background: st.active ? "var(--signal)" : "transparent",
                                color: st.active ? "#fff" : "rgba(245,243,236,0.8)",
                                animation: st.active
                                  ? "rsRamp 2.6s var(--ease-eng) infinite"
                                  : undefined,
                              }}
                            >
                              {st.label}
                            </span>
                            {st.arrow ? (
                              <span style={{ color: "var(--fade)", fontSize: 13 }} aria-hidden>
                                →
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </NbCard>
                  </Spread>
                ) : null}
              </div>
            )
          })}

          {/* ============================================ ENTRY 09 ==== */}
          <Spread id="method">
            <EntryStamp entry="09" title="the method" note="3 gates" />
            <h2 className="st-h2" style={{ margin: "24px 0 0", maxWidth: "20ch" }} data-enter>
              A gate for every phase.
            </h2>
            <DrawRule width={440} />
            <p className="nb-stamp" style={{ marginBottom: 30 }} data-enter>
              Three phases · three gates · a fixed set of deliverables
            </p>

            <div
              className="nb-grid-3"
              data-stagger
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            >
              {phases.map((p, i) => (
                <NbCard
                  key={p.no}
                  lift={i === 1}
                  tilt={i === 0 ? "l" : i === 2 ? "r" : "none"}
                  style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column" }}
                >
                  <span
                    className="nb-stamp"
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 16,
                      background: "var(--paper)",
                      padding: "0 8px",
                      fontSize: 10,
                    }}
                  >
                    Card {p.no}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginTop: 6,
                    }}
                  >
                    <span
                      className="tnum"
                      style={{
                        fontSize: 38,
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "var(--signal)",
                        lineHeight: 1,
                      }}
                    >
                      {p.no}
                    </span>
                    <span className="nb-stamp" style={{ fontSize: 10 }}>
                      {p.phase}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 17, margin: "16px 0 8px" }}>{p.title}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--mute)", flex: 1 }}>
                    {p.desc}
                  </p>
                  <div className="nb-dashed" style={{ marginTop: 18, paddingTop: 14 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.deliverables.map((d) => (
                        <span
                          key={d}
                          style={{
                            fontFamily: "var(--fmono)",
                            fontSize: 10.5,
                            padding: "4px 7px",
                            border: "1px solid var(--rule-strong)",
                            background: "var(--paper-2)",
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p
                    style={{
                      marginTop: 16,
                      fontFamily: "var(--fmono)",
                      fontSize: 11,
                      color: "var(--signal)",
                      borderTop: "1px solid var(--signal)",
                      paddingTop: 10,
                    }}
                  >
                    ▸ {p.gateFull}
                  </p>
                </NbCard>
              ))}
            </div>

            {/* capabilities */}
            <div
              className="nb-grid-4"
              data-stagger
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                marginTop: 34,
              }}
            >
              {capabilities.map((c) => (
                <NbCard key={c.title} style={{ padding: "18px 18px" }}>
                  <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 10 }}>
                    Capability
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3, marginBottom: 8 }}>
                    {c.title}
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--mute)" }}>{c.desc}</p>
                </NbCard>
              ))}
            </div>

            {/* skills */}
            <div style={{ marginTop: 40 }}>
              <p className="nb-stamp" style={{ marginBottom: 10 }} data-enter>
                Toolset · {skills.length} items, no filler
              </p>
              <div
                className="nb-grid-4"
                data-checks
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "2px 26px",
                }}
              >
                {skills.map((s) => (
                  <CheckRow key={s}>{s}</CheckRow>
                ))}
              </div>
            </div>
          </Spread>

          {/* ============================================ ENTRY 10 ==== */}
          <Spread id="credentials" tone="soft">
            <EntryStamp entry="10" title="the sheet" note="3 credentials" />
            <h2 className="st-h2" style={{ margin: "24px 0 0", maxWidth: "20ch" }} data-enter>
              Certified, current, <em style={{ fontStyle: "italic" }}>and on file.</em>
            </h2>
            <DrawRule width={420} />

            <div
              className="nb-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.1fr 1fr",
                gap: 20,
                alignItems: "start",
                marginTop: 26,
              }}
            >
              <NbCard tilt="l" style={{ padding: "24px 22px" }}>
                <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 14 }}>
                  {certifications[0].eyebrow}
                </p>
                <p style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.15, marginBottom: 8 }}>
                  {certifications[0].title}
                </p>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--mute)", marginBottom: 18 }}>
                  {certifications[0].org}
                </p>
                <div className="nb-dashed" style={{ paddingTop: 14, display: "grid", gap: 8 }}>
                  {["8D root cause", "PFMEA", "Control plans", "Kaizen / 6S"].map((d) => (
                    <p key={d} style={{ fontSize: 13, color: "var(--ink-2)" }}>
                      <span style={{ color: "var(--signal)" }}>✓</span> {d}
                    </p>
                  ))}
                </div>
                {certifications[0].url ? (
                  <a
                    href={certifications[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{
                      display: "inline-block",
                      marginTop: 18,
                      fontFamily: "var(--fmono)",
                      fontSize: 11,
                      color: "var(--signal)",
                    }}
                  >
                    {certifications[0].urlLabel} ↗
                  </a>
                ) : null}
              </NbCard>

              <div style={{ position: "relative" }}>
                <span
                  className="nb-card"
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%) rotate(-1.5deg)",
                    zIndex: 3,
                    padding: "5px 12px",
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "var(--paper-soft)",
                    borderColor: "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ★ The one that anchors the rest
                </span>
                <NbCard
                  lift
                  style={{ padding: "34px 26px 26px", background: "var(--ink)", borderColor: "var(--ink)" }}
                >
                  <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 14, color: "var(--signal)" }}>
                    {pmp.issuer} · Active
                  </p>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 46,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "var(--paper)",
                      marginBottom: 10,
                    }}
                  >
                    PMP
                  </p>
                  <p style={{ fontWeight: 500, fontSize: 17, color: "var(--paper)", marginBottom: 10 }}>
                    {pmp.title}
                  </p>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.65,
                      color: "rgba(245,243,236,0.68)",
                      marginBottom: 20,
                    }}
                  >
                    {pmp.desc}
                  </p>
                  <div style={{ display: "grid", gap: 10 }}>
                    <a
                      href={pmp.credlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="nb-cta nb-cta--signal nb-cta--sm nb-cta--block"
                    >
                      Verify on Credly
                      <span className="nb-cta-arrow" aria-hidden>
                        →
                      </span>
                    </a>
                    <a
                      href={pmp.diplomaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="nb-link-ul"
                      style={{
                        textAlign: "center",
                        fontFamily: "var(--fmono)",
                        fontSize: 11,
                        color: "rgba(245,243,236,0.72)",
                      }}
                    >
                      View diploma ↗
                    </a>
                  </div>
                </NbCard>
              </div>

              <NbCard tilt="r" style={{ padding: "24px 22px" }}>
                <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 14 }}>
                  {certifications[1].eyebrow}
                </p>
                <p style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.15, marginBottom: 8 }}>
                  {certifications[1].title}
                </p>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--mute)", marginBottom: 18 }}>
                  {certifications[1].org}
                </p>
                <div className="nb-dashed" style={{ paddingTop: 14, display: "grid", gap: 8 }}>
                  {["Sprint planning", "Cross-functional rituals", "Hardware-adapted Agile"].map((d) => (
                    <p key={d} style={{ fontSize: 13, color: "var(--ink-2)" }}>
                      <span style={{ color: "var(--signal)" }}>✓</span> {d}
                    </p>
                  ))}
                </div>
              </NbCard>
            </div>
          </Spread>

          {/* ============================================ ENTRY 11 ==== */}
          <Spread id="references">
            <EntryStamp entry="11" title="pasted in" note="real proof" />
            <h2 className="st-h2" style={{ margin: "24px 0 0", maxWidth: "22ch" }} data-enter>
              Don&apos;t take my word for it. <em style={{ fontStyle: "italic" }}>Take theirs.</em>
            </h2>
            <DrawRule width={440} />
            <p
              style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--mute)", maxWidth: "60ch" }}
              data-enter
            >
              Four signed letters of recommendation from Stryker, and three third-party employment
              verifications. All of them open in a new tab.
            </p>

            <p className="nb-stamp" style={{ margin: "32px 0 14px" }} data-enter>
              Recommendations · {refs.length} letters
            </p>
            <div
              className="nb-grid-4"
              data-stagger
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
            >
              {refs.map((r, i) => (
                <NbCard
                  key={r.name}
                  tape={i % 2 === 0}
                  tilt={i % 2 === 0 ? "l" : "r"}
                  style={{ padding: "24px 18px 18px" }}
                >
                  <p style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{r.name}</p>
                  <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--mute)", marginBottom: 14 }}>
                    {r.role}
                  </p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{ fontFamily: "var(--fmono)", fontSize: 11, color: "var(--signal)" }}
                  >
                    Read letter ↗
                  </a>
                </NbCard>
              ))}
            </div>

            <p className="nb-stamp" style={{ margin: "40px 0 14px" }} data-enter>
              Employment verification · third party
            </p>
            <div
              className="nb-grid-3"
              data-stagger
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
            >
              {verifs.map((v) => (
                <NbCard key={v.org} style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "var(--signal)",
                        color: "#fff",
                        fontSize: 10,
                        display: "grid",
                        placeItems: "center",
                      }}
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="nb-stamp" style={{ fontSize: 10, color: "var(--signal)" }}>
                      Verified
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{v.org}</p>
                  <p
                    className="tnum"
                    style={{ fontFamily: "var(--fmono)", fontSize: 12, color: "var(--mute)" }}
                  >
                    {v.dates}
                  </p>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      fontFamily: "var(--fmono)",
                      fontSize: 11,
                      color: "var(--signal)",
                    }}
                  >
                    Open letter ↗
                  </a>
                </NbCard>
              ))}
            </div>
          </Spread>

          {/* ============================================ ENTRY 12 ==== */}
          <Spread id="parallel" tone="soft">
            <YearMark year={2026} />
            <div
              className="st-era-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "clamp(28px, 5vw, 62px)",
                alignItems: "start",
              }}
            >
              <div>
                <EntryStamp entry="12" title={parallel.title} note={parallel.standfirst} />
                <h2 className="st-h2" style={{ margin: "22px 0 0" }} data-enter>
                  {parallel.title}
                </h2>
                <DrawRule width={420} />
                <Passage paragraphs={parallel.passage} />
              </div>
              <div>
                <Plate
                  src={parallel.plate}
                  alt={parallel.plateAlt}
                  label={parallel.plateLabel}
                  ratio="4 / 3"
                  tilt="r"
                />
              </div>
            </div>

            <div
              className="nb-grid-2"
              data-stagger
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginTop: 40,
              }}
            >
              {projects.map((p, i) => (
                <NbCard
                  key={p.name}
                  tilt={i % 2 === 0 ? "l" : "r"}
                  style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 10,
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: 19 }}>{p.name}</p>
                    <span className="nb-date-chip">{p.role}</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--mute)", flex: 1 }}>
                    {p.desc}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{
                      marginTop: 16,
                      fontFamily: "var(--fmono)",
                      fontSize: 11,
                      color: "var(--signal)",
                    }}
                  >
                    {p.label} ↗
                  </a>
                </NbCard>
              ))}
            </div>
          </Spread>

          {/* ============================================ ENTRY 13 ==== */}
          <Spread id="contact" tone="night" graph style={{ position: "relative", overflow: "hidden" }}>
            <YearMark year={2026} />
            <video
              src={CONTACT_VIDEO}
              poster={CONTACT_POSTER}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.14,
                filter: "grayscale(1)",
              }}
            />
            <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <EntryStamp entry="13" title="the close" note={coda.standfirst} />
                </div>

                <h2
                  className="st-h2"
                  style={{ margin: "24px 0 22px", color: "var(--paper)" }}
                  data-enter
                >
                  <Hl ink>
                    <span style={{ color: "#fff" }}>{coda.title}</span>
                  </Hl>
                </h2>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ textAlign: "left" }}>
                    <Passage paragraphs={coda.passage} />
                  </div>
                </div>
              </div>

              {/* What a reader can actually engage him about */}
              <div
                className="nb-grid-2"
                data-stagger
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  margin: "40px 0 38px",
                  textAlign: "left",
                }}
              >
                {coda.help.map((h) => (
                  <NbCard key={h.title} style={{ padding: "20px 22px" }}>
                    <p
                      className="nb-stamp"
                      style={{ fontSize: 9.5, marginBottom: 10, color: "var(--signal)" }}
                    >
                      I can help with
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        lineHeight: 1.3,
                        marginBottom: 8,
                        color: "var(--paper)",
                      }}
                    >
                      {h.title}
                    </p>
                    <p
                      style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(245,243,236,.66)" }}
                    >
                      {h.desc}
                    </p>
                  </NbCard>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 26,
                }}
                data-enter
              >
                <NbCta href={`mailto:${EMAIL}`}>{coda.cta}</NbCta>
                <NbCta href={LINKEDIN_URL} variant="paper">
                  LinkedIn
                </NbCta>
                <NbCta href={RESUME_URL} variant="paper">
                  Resume
                </NbCta>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <StickyNote style={{ maxWidth: 460, transform: "rotate(1.2deg)" }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>
                    <strong>PS:</strong> Based in Miami, working globally. Fastest reply is email,
                    usually same day.
                  </p>
                </StickyNote>
              </div>
            </div>
          </Spread>
        </main>

        <CompanyModal company={dossier} onClose={() => setDossier(null)} />

        {/* ---------------------------------------------------- footer --- */}
        {/* A portfolio footer: who he is and what he does, then how to reach
            him. Deliberately carries no availability signal. */}
        <footer style={{ background: "var(--ink-2)", padding: "clamp(40px, 6vw, 68px) 0 34px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
            <div
              className="st-two"
              style={{
                display: "grid",
                gridTemplateColumns: "1.35fr 1fr",
                gap: "clamp(28px, 5vw, 64px)",
                alignItems: "start",
              }}
            >
              {/* identity + what he does */}
              <div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--fmono)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--paper)",
                    }}
                  >
                    rs<span style={{ color: "var(--signal)" }}>_</span>
                  </span>
                  <span
                    style={{ fontWeight: 700, fontSize: 17, color: "var(--paper)" }}
                  >
                    Rafael Schwart
                  </span>
                </div>

                <p
                  className="nb-stamp"
                  style={{ color: "var(--signal)", fontSize: 10, margin: "12px 0 14px" }}
                >
                  Senior Operations Program Manager, NPI · Miami, FL
                </p>

                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "rgba(245,243,236,.72)",
                    maxWidth: "52ch",
                  }}
                >
                  {footerPitch}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                  {["NPI", "Six Sigma", "PFMEA", "Supplier quality", "DFM", "Ramp to volume"].map(
                    (t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--fmono)",
                          fontSize: 10,
                          letterSpacing: "0.05em",
                          color: "rgba(245,243,236,.6)",
                          border: "1px solid rgba(255,255,255,.18)",
                          padding: "5px 9px",
                        }}
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* how to reach him */}
              <div>
                <p className="nb-stamp" style={{ color: "var(--fade)", fontSize: 10, marginBottom: 14 }}>
                  Get in touch
                </p>
                <div style={{ display: "grid", gap: 11, justifyItems: "start" }}>
                  <a href={`mailto:${EMAIL}`} className="st-footlink" style={{ color: "var(--paper)", fontSize: 15 }}>
                    {EMAIL}
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="st-footlink"
                    style={{ color: "rgba(245,243,236,.78)", fontSize: 14 }}
                  >
                    LinkedIn <span className="nb-nudge">↗</span>
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="st-footlink"
                    style={{ color: "rgba(245,243,236,.78)", fontSize: 14 }}
                  >
                    Resume <span className="nb-nudge">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => jump("references")}
                    className="st-footlink"
                    style={{
                      background: "none",
                      border: 0,
                      padding: 0,
                      cursor: "pointer",
                      color: "rgba(245,243,236,.78)",
                      fontSize: 14,
                      fontFamily: "var(--fdisp)",
                      textAlign: "left",
                    }}
                  >
                    References &amp; verification
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.12)",
                marginTop: "clamp(28px, 4vw, 44px)",
                paddingTop: 20,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "rgba(245,243,236,0.45)",
                }}
              >
                {footerData.copyright}
              </p>
              <a
                href="/credentials"
                className="st-footlink"
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "rgba(245,243,236,0.62)",
                }}
              >
                Credentials index ↗
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
