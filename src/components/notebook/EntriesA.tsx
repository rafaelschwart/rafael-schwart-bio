/**
 * Notebook iteration — entries 01 to 04.
 * Cover · the story · the numbers (night mode) · the method.
 * All copy comes from `landing/data.ts`, the single source of truth.
 */

import {
  EMAIL,
  HEADSHOT_SRC,
  RESUME_URL,
  brands,
  hero,
  phases,
  pipelineStages,
  stats,
  statsHeadline,
} from "@/components/landing/data"
import {
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
} from "./NbAtoms"

/* ============================================================ ENTRY 01 ==== */

export function Cover() {
  return (
    <Spread id="cover" style={{ paddingTop: "clamp(40px, 5vw, 72px)" }}>
      <div
        className="nb-cover"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "clamp(28px, 5vw, 64px)",
          alignItems: "start",
        }}
      >
        {/* ---------------------------------------------------- left page --- */}
        <div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}
            data-reveal
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
            <span className="nb-stamp" style={{ color: "var(--fade)" }}>
              {hero.eyebrow}
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--fmono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mute)",
              margin: "22px 0 10px",
            }}
            data-reveal
          >
            Not a resume · Not a portfolio
          </p>

          {/* Sized so the highlighted accent lands on its own single line —
              a swipe across two wrapped lines reads as a block, not a marker. */}
          <h2
            className="display-xl"
            style={{
              margin: "0 0 22px",
              fontSize: "clamp(34px, 4.4vw, 60px)",
              maxWidth: 620,
            }}
            data-reveal
          >
            {hero.headline}{" "}
            <Hl>
              <em style={{ fontStyle: "italic" }}>{hero.headlineAccent}</em>
            </Hl>
          </h2>

          <p
            style={{ fontSize: 17, lineHeight: 1.62, color: "var(--ink-2)", maxWidth: 560 }}
            data-reveal
          >
            {hero.sub}
          </p>

          {/* Sticker badges — the reference's "✓ chips" row */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "24px 0 28px" }}
            data-reveal
          >
            {hero.checks.map((c) => (
              <span
                key={c}
                className="nb-card nb-lift-soft"
                style={{
                  padding: "8px 12px",
                  fontFamily: "var(--fmono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "var(--signal)" }}>✓</span> {c}
              </span>
            ))}
          </div>

          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}
            data-reveal
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
            ten years of it, written down and dated ↓
          </Scribble>
        </div>

        {/* --------------------------------------------------- right page --- */}
        <div style={{ position: "relative" }}>
          <NbCard tape tilt="r" lift style={{ padding: 14 }}>
            <img
              src={HEADSHOT_SRC}
              alt="Rafael Schwart"
              loading="eager"
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
              pilot line → volume, nine times over
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
              Currently at <strong>Motorola Solutions</strong> — Senior Operations Program Manager,
              NPI. Twelve years taking hardware from the CAD bench to volume production.
            </p>
          </StickyNote>
        </div>
      </div>
    </Spread>
  )
}

/* ================================================== the tape marquee ===== */

export function IndustryTape() {
  const items = [
    <>Consumer electronics</>,
    <Strike key="s1">guesswork</Strike>,
    <>Augmented reality</>,
    <Strike key="s2">slideware</Strike>,
    <>Medical robotics</>,
    <Strike key="s3">hand-offs</Strike>,
    <>Aerospace</>,
    <Strike key="s4">surprises at ramp</Strike>,
    <>Solar</>,
    <Strike key="s5">firefighting</Strike>,
  ]
  return (
    <div style={{ padding: "26px 0 10px" }}>
      <TapeMarquee items={items} />
    </div>
  )
}

/* ============================================================ ENTRY 02 ==== */

export function TheStory() {
  return (
    <Spread id="story" tone="soft">
      <EntryStamp entry="02" title="the story" note="pg. 02" />

      <h2 className="display-h2" style={{ margin: "26px 0 28px", maxWidth: 900 }} data-reveal>
        Hardware doesn&apos;t fail at launch.{" "}
        <em style={{ fontStyle: "italic" }}>It fails at the hand-off.</em>
      </h2>

      <div style={{ maxWidth: 720, display: "grid", gap: 18 }}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }} data-reveal>
          I started on the bench — CAD, fixtures, FEA, CNC programs for aerospace and automation.
          Then I moved to the pilot line at Stryker and Magic Leap. Then to the ramp, at Motorola
          Solutions.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }} data-reveal>
          Same pattern every time: the design is fine, the pilot is fine, and then volume exposes
          everything nobody wrote down.{" "}
          <Hl>
            <strong>The gap is never the technology. It&apos;s the hand-off.</strong>
          </Hl>
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }} data-reveal>
          So I run programs the way you&apos;d run a notebook: every risk has an owner, every gate
          has a number, and every escape gets an 8D before it reaches the customer. Two things do
          most of the work:
        </p>
      </div>

      <div
        className="nb-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 34,
        }}
      >
        {[
          {
            n: "1",
            title: "De-risk before the first build, not after.",
            body: "WBS, a live risk register, PFMEA, and process control plans up front. Problems found on paper cost hours. The same problem found at volume costs a quarter.",
          },
          {
            n: "2",
            title: "The process isn't the point. The yield is.",
            body: "Control plans and MES analytics only matter if the number moves. At Magic Leap that meant 15% more production efficiency — measured, not asserted.",
          },
        ].map((c) => (
          <NbCard key={c.n} style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  flex: "none",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  background: "var(--signal)",
                  color: "#fff",
                  fontFamily: "var(--fmono)",
                  fontSize: 12,
                }}
              >
                {c.n}
              </span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.35, marginBottom: 8 }}>
                  {c.title}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--mute)" }}>{c.body}</p>
              </div>
            </div>
          </NbCard>
        ))}
      </div>

      <Scribble style={{ marginTop: 30 }}>
        <Ul>Put both together and you get numbers I can show you</Ul> ↓
      </Scribble>
    </Spread>
  )
}

/* ============================================================ ENTRY 03 ==== */

export function TheNumbers() {
  return (
    <Spread id="numbers" tone="night" graph>
      <EntryStamp entry="03" title="the numbers" note="night mode" />

      <h2
        className="display-h2"
        style={{ margin: "26px 0 40px", maxWidth: 780, color: "var(--paper)" }}
        data-reveal
      >
        {statsHeadline.lead}{" "}
        <Hl ink>
          <span style={{ color: "#fff" }}>{statsHeadline.tail}</span>
        </Hl>
      </h2>

      <div
        className="nb-grid-4"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 26 }}
      >
        {stats.map((s) => (
          <div key={s.label} data-reveal>
            <div
              className="tnum"
              data-counter
              data-value={s.value}
              data-suffix={s.suffix}
              style={{
                fontSize: "clamp(40px, 5.4vw, 68px)",
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
                fontSize: 13.5,
                lineHeight: 1.5,
                color: "rgba(245,243,236,0.66)",
                marginTop: 12,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <p className="nb-hand" style={{ marginTop: 26 }} data-reveal>
        15% at Magic Leap — MES analytics + Gauge R&amp;R + cleanroom ✓
      </p>

      {/* The "clear math" box — here, the pipeline the numbers came out of */}
      <NbCard style={{ padding: "24px 26px", marginTop: 40 }}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 18, color: "var(--paper)" }}>
          Clear math: the path every one of those programs walked.
        </p>

        <div
          data-pipeline
          style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}
        >
          {pipelineStages.map((st) => (
            <div key={st.label} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily: "var(--fmono)",
                  fontSize: 11.5,
                  letterSpacing: "0.12em",
                  padding: "11px 8px",
                  border: `1px solid ${st.active ? "var(--signal)" : "rgba(245,243,236,0.22)"}`,
                  background: st.active ? "var(--signal)" : "transparent",
                  color: st.active ? "#fff" : "rgba(245,243,236,0.8)",
                  animation: st.active ? "rsRamp 2.6s var(--ease-eng) infinite" : undefined,
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

        <div className="nb-dashed" style={{ marginTop: 22, paddingTop: 18, display: "grid", gap: 14 }}>
          {[
            {
              k: "Before the build",
              v: "WBS · risk register · PFMEA · control plans. Every known risk gets an owner and a date.",
            },
            {
              k: "On the pilot line",
              v: "Fixture validation · Gauge R&R · DFM · 8D on every escape. Problems surface here, not at volume.",
            },
            {
              k: "Through the ramp",
              v: "MES / MQS analytics · PPAP / SICR · CM coordination. Yield tracked daily, not reported quarterly.",
            },
          ].map((r) => (
            <div key={r.k}>
              <p
                className="nb-stamp"
                style={{ color: "var(--signal)", marginBottom: 4, fontSize: 10.5 }}
              >
                {r.k}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,236,0.72)" }}>{r.v}</p>
            </div>
          ))}
        </div>
      </NbCard>

      <p className="nb-hand" style={{ marginTop: 26 }} data-reveal>
        And what does that actually look like, gate by gate? ↓
      </p>
    </Spread>
  )
}

/* ============================================================ ENTRY 04 ==== */

export function TheMethod() {
  return (
    <Spread id="method">
      <EntryStamp entry="04" title="the method" note="3 gates" />

      <h2 className="display-h2" style={{ margin: "26px 0 20px", maxWidth: 860 }} data-reveal>
        A gate for every phase.{" "}
        <em style={{ fontStyle: "italic" }}>Nothing moves without one.</em>
      </h2>

      <p
        style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--mute)", maxWidth: 660 }}
        data-reveal
      >
        Three phases, three gates, and a fixed set of deliverables under each. This is the same
        sequence whether the product is a radio, an AR headset, or a surgical robot — only the
        tolerances change.
      </p>

      <div
        className="nb-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 36,
        }}
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
                  fontSize: 40,
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
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--mute)", flex: 1 }}>{p.desc}</p>

            <div className="nb-dashed" style={{ marginTop: 18, paddingTop: 14 }}>
              <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 8 }}>
                Deliverables
              </p>
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
                letterSpacing: "0.06em",
                color: "var(--signal)",
                borderTop: "1px solid var(--signal)",
                paddingTop: 10,
              }}
            >
              ▸ {p.gateFull}
            </p>
            <p style={{ fontFamily: "var(--fmono)", fontSize: 10.5, color: "var(--fade)", marginTop: 8 }}>
              {p.tools}
            </p>
          </NbCard>
        ))}
      </div>

      <div style={{ marginTop: 36 }} data-reveal>
        <p className="nb-stamp" style={{ marginBottom: 12 }}>
          Where it&apos;s been run · {brands.length} of 9 companies shown
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {brands.map((b) => (
            <span
              key={b.name}
              style={{
                fontFamily: "var(--fmono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                padding: "7px 10px",
                border: "1px solid var(--rule-strong)",
                background: "var(--paper-soft)",
              }}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>

      <Scribble style={{ marginTop: 28 }}>Isn&apos;t this just process theater? Next entry ↓</Scribble>
    </Spread>
  )
}
