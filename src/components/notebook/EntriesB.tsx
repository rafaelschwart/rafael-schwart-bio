/**
 * Notebook iteration — entries 05 to 10.
 * What it isn't · the log · pasted proof · the sheet · the curriculum · close.
 */

import {
  EMAIL,
  LINKEDIN_URL,
  RESUME_URL,
  capabilities,
  certifications,
  contact,
  experience,
  pmp,
  projects,
  refs,
  skills,
  verifs,
} from "@/components/landing/data"
import {
  CheckRow,
  CrossCard,
  EntryStamp,
  Hl,
  NbCard,
  NbCta,
  Scribble,
  Spread,
  StickyNote,
  Ul,
} from "./NbAtoms"

/* ============================================================ ENTRY 05 ==== */

const NOT_THIS = [
  {
    title: "Not a slide-deck program manager.",
    body: "I spent my first six years on the bench — SolidWorks, Creo, Mastercam, FEA, CNC. I can read the drawing and argue about the tolerance, not just the schedule.",
  },
  {
    title: "Not a single-industry specialist.",
    body: "Nine companies, six industries: communications hardware, AR, medical robotics, aerospace, industrial automation, solar. The gates transfer; the tolerances don't.",
  },
  {
    title: "Not a hand-off at pilot.",
    body: "Pilot is the easy part. I stay through ramp — fixture validation, supplier quality, CM escalations at Sanmina Penang and BCM — until volume is boring.",
  },
  {
    title: "Not process for its own sake.",
    body: "PFMEA and control plans exist to move a number. If yield, cycle time, or defect rate doesn't shift, the process was decoration.",
  },
]

export function WhatItIsnt() {
  return (
    <Spread id="not" tone="soft">
      <EntryStamp entry="05" title="this is not" note="claims vs record" />

      <h2 className="display-h2" style={{ margin: "26px 0 32px", maxWidth: 820 }} data-reveal>
        Let&apos;s kill the doubts <em style={{ fontStyle: "italic" }}>at once.</em>
      </h2>

      <div
        className="nb-grid-2"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
      >
        {NOT_THIS.map((n) => (
          <CrossCard key={n.title} title={n.title} body={n.body} />
        ))}
      </div>

      {/* The one affirmative block — the reference's lime "What it IS" bar */}
      <div
        className="nb-card"
        style={{
          marginTop: 26,
          padding: "24px 26px",
          background: "var(--signal)",
          borderColor: "var(--ink)",
          boxShadow: "5px 5px 0 var(--ink)",
        }}
        data-reveal
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 26, color: "#fff", lineHeight: 1 }} aria-hidden>
            ✓
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 6 }}>
              What it IS: the whole path, gate by gate.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
              Concept → pilot → ramp → volume, with the same person accountable at every gate.
            </p>
          </div>
        </div>
      </div>

      <div
        className="nb-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginTop: 30,
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
    </Spread>
  )
}

/* ============================================================ ENTRY 06 ==== */

export function TheLog() {
  return (
    <Spread id="log" graph>
      <EntryStamp entry="06" title="the log" note="dated entries" />

      <h2 className="display-h2" style={{ margin: "26px 0 14px", maxWidth: 820 }} data-reveal>
        The log: <em style={{ fontStyle: "italic" }}>ten years, in order.</em>
      </h2>
      <p
        style={{ fontSize: 16, lineHeight: 1.65, color: "var(--mute)", maxWidth: 640 }}
        data-reveal
      >
        Every entry is dated and verifiable — three of them with signed employment verification
        letters further down this page.
      </p>

      <div style={{ marginTop: 40, display: "grid", gap: 26 }}>
        {experience.map((e, i) => (
          <div key={e.company} className="nb-log-item" data-live={i === 0 ? "1" : undefined} data-reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span className="nb-date-chip">{e.dates}</span>
              <span className="nb-stamp" style={{ fontSize: 10 }}>
                {e.industry} · {e.location}
              </span>
              {i === 0 ? (
                <span
                  style={{
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "var(--signal)",
                    color: "#fff",
                    padding: "3px 7px",
                  }}
                >
                  Current entry
                </span>
              ) : null}
            </div>

            <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 2 }}>
              {e.title} —{" "}
              {e.metricValue ? (
                <Hl>
                  <span>{e.company}</span>
                </Hl>
              ) : (
                e.company
              )}
            </p>

            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.65,
                color: "var(--mute)",
                maxWidth: 760,
                marginTop: 8,
              }}
            >
              {e.summary}
            </p>

            {e.featured || e.metricValue ? (
              <ul
                style={{
                  margin: "12px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 7,
                  maxWidth: 760,
                }}
              >
                {e.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: "var(--ink-3)",
                      paddingLeft: 16,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{ position: "absolute", left: 0, color: "var(--signal)" }}
                      aria-hidden
                    >
                      ·
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {e.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--fmono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    padding: "4px 7px",
                    border: "1px solid var(--rule)",
                    color: "var(--mute)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {e.metricValue ? (
              <p className="nb-hand" style={{ marginTop: 12 }}>
                {e.metricValue} {e.metric?.toLowerCase()} ✓
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Spread>
  )
}

/* ============================================================ ENTRY 07 ==== */

export function PastedProof() {
  return (
    <Spread id="proof" tone="soft">
      <EntryStamp entry="07" title="pasted in" note="real proof" />

      <h2 className="display-h2" style={{ margin: "26px 0 14px", maxWidth: 860 }} data-reveal>
        Don&apos;t take my word for it.{" "}
        <em style={{ fontStyle: "italic" }}>Take theirs.</em>
      </h2>
      <p
        style={{ fontSize: 16, lineHeight: 1.65, color: "var(--mute)", maxWidth: 620 }}
        data-reveal
      >
        Four signed letters of recommendation from Stryker, and three third-party employment
        verifications. All of them open in a new tab.
      </p>

      <p className="nb-stamp" style={{ margin: "34px 0 14px" }} data-reveal>
        Recommendations · {refs.length} letters
      </p>
      <div
        className="nb-grid-4"
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

      <p className="nb-stamp" style={{ margin: "42px 0 14px" }} data-reveal>
        Employment verification · third party
      </p>
      <div
        className="nb-grid-3"
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

      <Scribble style={{ marginTop: 30 }}>and the certifications behind all of it ↓</Scribble>
    </Spread>
  )
}

/* ============================================================ ENTRY 08 ==== */

export function TheSheet() {
  return (
    <Spread id="credentials">
      <EntryStamp entry="08" title="the sheet" note="3 credentials" />

      <h2 className="display-h2" style={{ margin: "26px 0 32px", maxWidth: 820 }} data-reveal>
        Certified, current, <em style={{ fontStyle: "italic" }}>and on file.</em>
      </h2>

      <div
        className="nb-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Six Sigma */}
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

        {/* PMP — the featured, inverted card (the reference's "Pack Complete") */}
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
            style={{
              padding: "34px 26px 26px",
              background: "var(--ink)",
              borderColor: "var(--ink)",
            }}
          >
            <p
              className="nb-stamp"
              style={{ fontSize: 10, marginBottom: 14, color: "var(--signal)" }}
            >
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
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "var(--signal)",
                  color: "#fff",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 3,
                  textDecoration: "none",
                }}
              >
                Verify on Credly →
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

        {/* Agile */}
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
  )
}

/* ============================================================ ENTRY 09 ==== */

export function TheCurriculum() {
  return (
    <Spread id="work" tone="soft">
      <EntryStamp entry="09" title="the curriculum" note="toolset + side projects" />

      <h2 className="display-h3" style={{ margin: "26px 0 10px" }} data-reveal>
        No cardboard promises: <em style={{ fontStyle: "italic" }}>here&apos;s the whole toolset.</em>
      </h2>
      <p
        style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--mute)", maxWidth: 620 }}
        data-reveal
      >
        Everything I actually use, from the CAD bench to the ramp floor. {skills.length} items, no
        filler.
      </p>

      <div
        className="nb-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px 26px",
          marginTop: 26,
        }}
      >
        {skills.map((s) => (
          <CheckRow key={s}>{s}</CheckRow>
        ))}
      </div>

      <p className="nb-hand" style={{ margin: "34px 0 0" }} data-reveal>
        <Ul>and what I build on the side</Ul> ↓
      </p>

      <div
        className="nb-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 26,
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
  )
}

/* ============================================================ ENTRY 10 ==== */

export function TheClose() {
  return (
    <Spread id="contact" tone="night" graph>
      <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <EntryStamp entry="10" title="the close" />
        </div>

        <h2
          className="display-h2"
          style={{ margin: "26px 0 22px", color: "var(--paper)" }}
          data-reveal
        >
          <Hl ink>
            <span style={{ color: "#fff" }}>{contact.headline}</span>
          </Hl>
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "rgba(245,243,236,0.72)",
            marginBottom: 10,
          }}
          data-reveal
        >
          {contact.sub}
        </p>

        <p className="nb-hand" style={{ marginBottom: 34 }} data-reveal>
          The whole record is up there — dated, sourced, and verifiable.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 26,
          }}
          data-reveal
        >
          <NbCta href={`mailto:${EMAIL}`}>Email {EMAIL}</NbCta>
          <NbCta href={LINKEDIN_URL} variant="paper">
            LinkedIn
          </NbCta>
          <NbCta href={RESUME_URL} variant="paper">
            Resume
          </NbCta>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StickyNote style={{ maxWidth: 420, transform: "rotate(1.2deg)" }}>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>
              <strong>PS:</strong> based in Miami, working globally. Fastest reply is email —
              usually same day.
            </p>
          </StickyNote>
        </div>
      </div>
    </Spread>
  )
}
