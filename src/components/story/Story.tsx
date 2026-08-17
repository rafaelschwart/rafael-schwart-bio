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

import { Fragment, useEffect, useRef, useState } from "react"
import {
  ANNOUNCE,
  CONTACT_POSTER,
  CONTACT_VIDEO,
  EMAIL,
  HEADSHOT_SRC,
  LINKEDIN_URL,
  RESUME_URL,
  certifications,
  footer as footerData,
  pmp,
  projects,
  refs,
  skills,
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
import {
  coda,
  eras,
  footerPitch,
  forwardDeployed,
  howIWork,
  opening,
  prologue,
  shipped,
  storyNav,
  ventures,
} from "./chapters"
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

/**
 * One category = one page. Hidden views stay mounted (hidden, not unmounted)
 * so the full record remains in the DOM for crawlers and in-page search, and
 * so switching back is instant.
 */
function View({
  id,
  active,
  children,
}: {
  id: string
  active: string
  children: React.ReactNode
}) {
  return (
    <div className="st-view" data-storyview={id} hidden={active !== id}>
      {children}
    </div>
  )
}

/** Year marker read by the rail; zero-height, sits at the top of a section. */
function YearMark({ year }: { year: number }) {
  return <span data-year={year} aria-hidden style={{ display: "block", height: 0 }} />
}

export function Story() {
  const rootRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const navBarRef = useRef<HTMLDivElement>(null)
  const navIndRef = useRef<HTMLSpanElement>(null)
  const [view, setView] = useState<string>(() => {
    const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : ""
    return storyNav.some((n) => n.id === h) ? h : "cover"
  })
  const [dossier, setDossier] = useState<string | null>(null)

  useEnter(rootRef, [view])
  useImageWipe(rootRef, [view])
  useDraw(rootRef, [view])
  useParallax(rootRef)
  useCounters(rootRef, [view])
  useYearRail(rootRef, yearRef, eras.map((e) => e.yearValue))
  useNotebookMotion(rootRef, [view])
  useNavIndicator(navBarRef, navIndRef, view)
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

  // Category switching. The hash keeps a view shareable and makes the browser
  // back button behave the way a reader expects.
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "")
      if (storyNav.some((n) => n.id === h)) setView(h)
      else if (!h) setView("cover")
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const go = (id: string) => {
    setView(id)
    if (window.location.hash.replace("#", "") !== id) {
      window.history.pushState(null, "", id === "cover" ? window.location.pathname : `#${id}`)
    }
    window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" })
  }

  const activeIndex = Math.max(0, storyNav.findIndex((n) => n.id === view))

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
              alignItems: "flex-start",
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
                paddingTop: 12,
              }}
            >
              rs<span style={{ color: "var(--signal)" }}>_</span>
            </a>
            <div
              ref={navBarRef}
              className="st-navbar"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {storyNav.map((n, i) => (
                <button
                  key={n.id}
                  type="button"
                  data-nav={n.id}
                  onClick={() => go(n.id)}
                  data-active={view === n.id ? "1" : undefined}
                  /* gates already passed are drawn live, like the NPI pipeline */
                  data-done={i < activeIndex ? "1" : undefined}
                >
                  {n.label}
                  <span className="st-flow-tip" aria-hidden />
                </button>
              ))}
              <span ref={navIndRef} className="st-navind" aria-hidden />
            </div>
          </div>
        </nav>

        <main>
          {/* ============================================ ENTRY 01 ==== */}
          <View id="cover" active={view}>
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
                <NbCard tape tilt="r" lift className="st-photo" style={{ padding: 14 }}>
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
          </View>

          {/* ================================= FORWARD DEPLOYED ==== */}
          <View id="forward" active={view}>
          <Spread id="forward" tone="soft">
            <EntryStamp
              entry={forwardDeployed.no}
              title="forward deployed"
              note={forwardDeployed.standfirst}
            />

            {/* Headline + a two-sentence lede. The diagram does the explaining. */}
            <div
              className="st-two"
              style={{
                display: "grid",
                gridTemplateColumns: "1.05fr 0.95fr",
                gap: "clamp(24px, 4vw, 56px)",
                alignItems: "end",
                marginTop: 22,
              }}
            >
              <h2 className="st-h2" style={{ margin: 0 }} data-enter>
                <Hl>
                  <span>{forwardDeployed.title}</span>
                </Hl>
              </h2>
              <div>
                <Passage paragraphs={forwardDeployed.passage} />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 14,
                    alignItems: "center",
                    marginTop: 22,
                  }}
                  data-enter
                >
                  <NbCta href={forwardDeployed.url}>Arqentia</NbCta>
                  <a
                    href={forwardDeployed.url}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-link-ul"
                    style={{ fontFamily: "var(--fmono)", fontSize: 11.5, color: "var(--signal)" }}
                  >
                    {forwardDeployed.urlLabel} <span className="nb-nudge">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* The diagram is the hero of this page, not a sidebar. */}
            <figure
              className="st-plate"
              style={{ margin: "clamp(28px, 4vw, 44px) 0 0", background: "var(--paper-soft)" }}
              data-enter
            >
              <div className="st-plate-inner">
                <video
                  src="/assets/story/fde-workflow.mp4"
                  poster="/assets/story/fde-workflow.webp"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="A production line on the left, a blue flow line passing through four nodes, resolving into a dashboard and an automation graph on the right."
                  style={{ width: "100%", height: "auto", display: "block", filter: "none" }}
                />
              </div>
              <figcaption className="st-plate-cap">
                <span>The same line, drawn on software</span>
                <span>Arqentia · forward deployed</span>
              </figcaption>
            </figure>

            {/* The method as a process flow, not four paragraphs */}
            <div style={{ marginTop: "clamp(30px, 4vw, 48px)" }}>
              <p className="nb-stamp" style={{ marginBottom: 16 }} data-enter>
                The method, ported from the factory floor
              </p>
              <div className="st-flow" data-stagger>
                {forwardDeployed.method.map((m) => (
                  <div key={m.k} className="st-flow-step">
                    <NbCard style={{ padding: "18px 18px", height: "100%" }}>
                      <p className="st-step-no" style={{ marginBottom: 9 }}>
                        {m.k}
                      </p>
                      <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.28, marginBottom: 7 }}>
                        {m.title}
                      </p>
                      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--mute)" }}>
                        {m.desc}
                      </p>
                    </NbCard>
                  </div>
                ))}
              </div>
            </div>

            {/* the working stack */}
            <div style={{ marginTop: "clamp(28px, 4vw, 44px)" }}>
              <NbCard style={{ padding: "20px 22px 22px" }}>
                <p className="nb-stamp st-stack-label" style={{ fontSize: 10, marginBottom: 14 }}>
                  {forwardDeployed.stack.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {[...forwardDeployed.stack.agents, ...forwardDeployed.stack.automation].map((t) => (
                    <span key={t} className="st-tool">
                      {t}
                    </span>
                  ))}
                </div>
              </NbCard>
            </div>
          </Spread>
          </View>


          {/* ======================================= ERAS 03 — 08 ==== */}
          {eras.map((era, i) => {
            const entryNo = String(i + 3).padStart(2, "0")
            return (
            <Fragment key={era.id}>
              <View id={era.id} active={view}>
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

                      </div>

                      <div style={{ position: "sticky", top: 92 }}>
                        <Plate
                          src={era.plate}
                          alt={era.plateAlt}
                          label={era.plateLabel}
                          index={era.span}
                          ratio="3 / 4"
                          tilt={i % 2 === 0 ? "l" : "r"}
                          priority={i === 0}
                        />
                        {era.metric ? (
                          <div style={{ marginTop: 24 }}>
                            <Metric {...era.metric} />
                          </div>
                        ) : null}
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
              </View>

              {/* "What shipped" is its own category, not a mid-era detour */}
              {era.id === "line" ? (
                <View id="shipped" active={view}>
                  <Spread id="shipped" tone="night" graph>
                    <EntryStamp
                      entry={shipped.no}
                      title="what shipped"
                      note={shipped.standfirst}
                    />
                    <h2
                      className="st-h2"
                      style={{ margin: "24px 0 0", maxWidth: 900, color: "var(--paper)" }}
                      data-enter
                    >
                      Things that exist because{" "}
                      <Hl ink>
                        <span style={{ color: "#fff" }}>I worked on them.</span>
                      </Hl>
                    </h2>
                    <DrawRule width={460} />
                    <Passage paragraphs={shipped.passage} />

                    <div style={{ marginTop: 30 }} data-stagger>
                      {shipped.items.map((it) => (
                        <div key={it.thing} className="st-thing">
                          {it.img ? (
                            <div className="st-thing-shot">
                              <img src={it.img} alt="" loading="lazy" decoding="async" />
                            </div>
                          ) : null}
                          <div>
                            <p className="st-thing-name">{it.thing}</p>
                            <p
                              style={{
                                fontSize: 13.5,
                                lineHeight: 1.6,
                                color: "rgba(245,243,236,.62)",
                                marginTop: 7,
                                maxWidth: "62ch",
                              }}
                            >
                              {it.detail}
                            </p>
                          </div>
                          <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                            <p
                              className="nb-stamp"
                              style={{ fontSize: 10, color: "var(--signal)" }}
                            >
                              {it.where}
                            </p>
                            {it.metric ? (
                              <p
                                className="tnum"
                                data-counter
                                data-value={it.metric.value}
                                data-suffix={it.metric.suffix}
                                style={{
                                  fontFamily: "var(--fdisp)",
                                  fontWeight: 700,
                                  fontSize: 26,
                                  letterSpacing: "-0.03em",
                                  color: "var(--paper)",
                                  marginTop: 6,
                                }}
                              >
                                {it.metric.value}
                                {it.metric.suffix}
                              </p>
                            ) : null}
                            {it.metric ? (
                              <p
                                className="nb-stamp"
                                style={{ fontSize: 9, color: "var(--fade)" }}
                              >
                                {it.metric.label}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="nb-hand" style={{ marginTop: 28 }} data-enter>
                      {shipped.note}
                    </p>
                  </Spread>
                </View>
              ) : null}
            </Fragment>
            )
          })}

          {/* ============================================ ENTRY 09 ==== */}
          <View id="method" active={view}>
          <Spread id="method">
            <EntryStamp entry={howIWork.no} title="how i work" note={howIWork.standfirst} />
            <h2 className="st-h2" style={{ margin: "24px 0 0", maxWidth: "16ch" }} data-enter>
              How I <em style={{ fontStyle: "italic" }}>actually</em> work.
            </h2>
            <DrawRule width={440} />
            <Passage paragraphs={howIWork.passage} />

            <div
              className="nb-grid-2"
              data-stagger
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginTop: 36,
              }}
            >
              {howIWork.principles.map((pr, i) => (
                <NbCard
                  key={pr.k}
                  lift={i === 0}
                  tilt={i % 2 === 0 ? "l" : "r"}
                  style={{ padding: "24px 24px" }}
                >
                  <p className="st-step-no" style={{ marginBottom: 12 }}>
                    {pr.k}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.28, marginBottom: 10 }}>
                    {pr.title}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--mute)" }}>{pr.desc}</p>
                  <p
                    className="nb-dashed"
                    style={{
                      marginTop: 16,
                      paddingTop: 12,
                      fontFamily: "var(--fmono)",
                      fontSize: 10.5,
                      letterSpacing: "0.04em",
                      color: "var(--signal)",
                    }}
                  >
                    {pr.tools}
                  </p>
                </NbCard>
              ))}
            </div>

            {/* the toolset, kept as supporting evidence */}
            <div style={{ marginTop: 44 }}>
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
                {skills.map((sk) => (
                  <CheckRow key={sk}>{sk}</CheckRow>
                ))}
              </div>
            </div>
          </Spread>
          </View>

          {/* ============================================ ENTRY 10 ==== */}
          <View id="credentials" active={view}>
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
          </View>

          {/* ============================================ ENTRY 11 ==== */}
          <View id="references" active={view}>
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
          </View>

          {/* ============================================ ENTRY 12 ==== */}
          {/* ====================== VENTURES: one page each ==== */}
          {ventures.map((v, i) => (
            <View key={v.id} id={v.id} active={view}>
              <Spread id={v.id} tone={i % 2 === 0 ? "soft" : "paper"}>
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
                    <EntryStamp entry={v.no} title={v.name} note={v.standfirst} />
                    <h2 className="st-h2" style={{ margin: "22px 0 0" }} data-enter>
                      {i === 0 ? (
                        <Hl>
                          <span>{v.name}</span>
                        </Hl>
                      ) : (
                        v.name
                      )}
                    </h2>
                    <DrawRule width={420} />
                    <p className="nb-stamp" style={{ marginBottom: 22 }} data-enter>
                      {v.role}
                    </p>
                    <Passage paragraphs={v.passage} />

                    <div style={{ marginTop: 28 }}>
                      <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 12 }} data-enter>
                        What it is
                      </p>
                      <div data-checks>
                        {v.facts.map((f) => (
                          <CheckRow key={f}>{f}</CheckRow>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 28 }}
                      data-enter
                    >
                      <NbCta href={v.url}>Visit {v.name}</NbCta>
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        className="nb-link-ul"
                        style={{ fontFamily: "var(--fmono)", fontSize: 11.5, color: "var(--signal)" }}
                      >
                        {v.urlLabel} <span className="nb-nudge">↗</span>
                      </a>
                    </div>
                  </div>

                  <div style={{ position: "sticky", top: 92 }}>
                    <Plate
                      src={v.image}
                      alt={v.imageAlt}
                      label={v.plateLabel}
                      index={v.role}
                      ratio="3 / 4"
                      tilt={i % 2 === 0 ? "r" : "l"}
                    />
                  </div>
                </div>
              </Spread>
            </View>
          ))}

          {/* ============================================ ENTRY 13 ==== */}
          <View id="contact" active={view}>
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
          </View>
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
                    fontSize: 16.5,
                    lineHeight: 1.55,
                    color: "var(--paper)",
                    maxWidth: "44ch",
                    fontWeight: 500,
                  }}
                >
                  {footerPitch.lead}
                </p>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "rgba(245,243,236,.66)",
                    maxWidth: "52ch",
                    marginTop: 12,
                  }}
                >
                  {footerPitch.body}
                </p>
                <p
                  className="nb-stamp"
                  style={{ fontSize: 10, color: "var(--fade)", marginTop: 14 }}
                >
                  {footerPitch.based}
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
                    onClick={() => go("references")}
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
