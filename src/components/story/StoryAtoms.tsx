/**
 * /story primitives.
 *
 * The design system comes from `components/notebook` — this file only adds the
 * pieces the notebook page didn't have: the scroll-lit narrative passage, the
 * taped photographic plate, the drawn hairline, and the full role card.
 */

import { useEffect, useMemo, useRef, type CSSProperties } from "react"
import anime from "animejs"
import type { Experience } from "@/components/landing/data"
import { NbCard } from "@/components/notebook/NbAtoms"
import { companies, initials } from "./companies"
import { reduced, useWordReveal } from "./motion"

/* ------------------------------------------------------------- passage ---- */

/** Narrative whose words light from faint to ink as the reader scrolls. */
export function Passage({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const split = useMemo(() => paragraphs.map((p) => p.split(" ")), [paragraphs])
  const total = useMemo(() => split.reduce((n, w) => n + w.length, 0), [split])
  const lit = useWordReveal(ref, total)

  let cursor = 0
  return (
    <div className="st-passage" ref={ref}>
      {split.map((words, pi) => {
        const start = cursor
        cursor += words.length
        return (
          <p key={pi}>
            {words.map((w, wi) => (
              <span key={wi} className="st-word" data-lit={start + wi < lit ? "1" : "0"}>
                {w}{" "}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------- drawn hairline --- */

/** Signal rule that draws itself left-to-right when it scrolls into view. */
export function DrawRule({ width = 420, tone = "signal" }: { width?: number; tone?: "signal" | "ink" }) {
  return (
    <svg
      width="100%"
      height="2"
      viewBox="0 0 600 2"
      preserveAspectRatio="none"
      style={{ display: "block", margin: "20px 0", maxWidth: width }}
      aria-hidden
    >
      <path
        data-draw
        d="M0 1 H600"
        stroke={tone === "ink" ? "var(--rule-strong)" : "var(--signal)"}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

/* --------------------------------------------------------------- plate ---- */

/** A photograph taped into the notebook, with a curtain wipe on reveal. */
export function Plate({
  src,
  alt,
  label,
  index,
  ratio = "4 / 3",
  parallax = 26,
  tape = true,
  tilt = "none",
  priority = false,
  style,
}: {
  src: string
  alt: string
  label: string
  index?: string
  ratio?: string
  parallax?: number
  tape?: boolean
  tilt?: "l" | "r" | "none"
  priority?: boolean
  style?: CSSProperties
}) {
  const cls = ["st-plate", tilt === "l" ? "nb-tilt-l" : tilt === "r" ? "nb-tilt-r" : ""]
    .filter(Boolean)
    .join(" ")
  return (
    <figure className={cls} style={{ margin: 0, ...style }} data-enter>
      {tape ? <span className="nb-tape" aria-hidden /> : null}
      <div className="st-plate-inner" style={{ aspectRatio: ratio }} data-wipe>
        <span className="st-curtain" data-wipe-curtain aria-hidden />
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          data-wipe-img
          data-parallax={parallax}
        />
      </div>
      <figcaption className="st-plate-cap">
        <span>{label}</span>
        {index ? <span>{index}</span> : null}
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------ role card ---- */

/**
 * One complete employment record. The employer's monochrome mark sits on top;
 * a "Know more" button opens the company dossier modal (description, facts,
 * product imagery, site link).
 */
export function RoleCard({
  e,
  live = false,
  onKnowMore,
}: {
  e: Experience
  live?: boolean
  onKnowMore?: (company: string) => void
}) {
  const co = companies[e.company]

  return (
    <NbCard lift={live} className="st-role" style={{ padding: "20px 22px" }}>
      {/* ---- employer identity ---- */}
      {co ? (
        <div style={{ marginBottom: 16 }}>
          <div className="st-logoplate">
            {co.logo ? (
              <img src={co.logo} alt={`${co.name} logo`} loading="lazy" decoding="async" />
            ) : (
              <span className="st-logomark">{initials(co.name)}</span>
            )}
          </div>
          <span
            className="st-brandrule"
            style={{ background: co.brand, display: "block", marginTop: 9 }}
            aria-hidden
          />
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <h4 style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em" }}>{e.company}</h4>
        <span className="nb-date-chip">{e.dates}</span>
      </div>

      <p className="st-role-title" style={{ marginTop: 9 }}>
        {e.title}
      </p>
      <p
        className="nb-stamp"
        style={{ fontSize: 10, marginTop: 5, color: "var(--fade)" }}
      >
        {e.industry} · {e.location}
      </p>

      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--mute)", marginTop: 13 }}>
        {e.summary}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: "13px 0 0", display: "grid", gap: 8 }}>
        {e.bullets.map((b) => (
          <li
            key={b}
            className="st-bullet"
            style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-3)" }}
          >
            {b}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 15 }}>
        {e.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--fmono)",
              fontSize: 10,
              letterSpacing: "0.04em",
              color: "var(--mute)",
              border: "1px solid var(--rule)",
              padding: "4px 8px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ---- dossier actions ---- */}
      {co ? (
        <div
          className="nb-dashed"
          style={{
            marginTop: 16,
            paddingTop: 15,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <button
            type="button"
            className="nb-cta nb-cta--paper nb-cta--sm"
            onClick={() => onKnowMore?.(e.company)}
            aria-haspopup="dialog"
          >
            Know more
            <span className="nb-cta-arrow" aria-hidden>
              →
            </span>
          </button>
          {co.url ? (
            <a
              href={co.url}
              target="_blank"
              rel="noreferrer"
              className="nb-link-ul"
              style={{ fontFamily: "var(--fmono)", fontSize: 11, color: "var(--signal)" }}
            >
              {co.urlLabel} <span className="nb-nudge">↗</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </NbCard>
  )
}

/* ------------------------------------------------------- dossier modal ---- */

/**
 * The company dossier, staged as a notebook page laid over the site: ruled
 * paper card, tape, the monochrome mark, what the company does, checklist
 * facts, a product study, and the link out. Esc / backdrop / ✕ close it;
 * focus moves in on open and returns to the trigger on close.
 */
export function CompanyModal({ company, onClose }: { company: string | null; onClose: () => void }) {
  const co = company ? companies[company] : undefined
  const cardRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!co) return
    restoreRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    document.body.style.overflow = "hidden"
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    if (!reduced() && cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [26, 0],
        scale: [0.96, 1],
        opacity: [0, 1],
        duration: 480,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      })
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
      restoreRef.current?.focus?.()
    }
  }, [co, onClose])

  if (!co) return null

  return (
    <>
      <div className="st-modal-backdrop" onClick={onClose} aria-hidden />
      <div className="st-modal-wrap" onClick={onClose}>
        <div
          ref={cardRef}
          className="st-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`About ${co.name}`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <span className="nb-tape" aria-hidden style={{ ["--tape" as string]: 1 }} />
          <button
            ref={closeRef}
            type="button"
            className="st-modal-close"
            onClick={onClose}
            aria-label="Close dossier"
          >
            ✕
          </button>

          <p className="nb-stamp" style={{ fontSize: 10, marginBottom: 16 }}>
            <span className="nb-stamp-sq" aria-hidden style={{ marginRight: 8 }} />
            Dossier · {co.name}
          </p>

          <div className="st-modal-logo">
            {co.logo ? (
              <img src={co.logo} alt={`${co.name} logo`} decoding="async" />
            ) : (
              <span className="st-logomark">{initials(co.name)}</span>
            )}
          </div>

          <span
            className="st-brandrule"
            style={{ background: co.brand, display: "block", width: 68, marginBottom: 14 }}
            aria-hidden
          />

          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)" }}>{co.blurb}</p>

          <p className="nb-stamp" style={{ fontSize: 10, margin: "20px 0 10px" }}>
            On the record
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
            {co.facts.map((f) => (
              <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span
                  aria-hidden
                  style={{
                    color: "var(--signal)",
                    fontFamily: "var(--fmono)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    flex: "none",
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-3)" }}>{f}</span>
              </li>
            ))}
          </ul>

          {co.product ? (
            <figure className="st-plate" style={{ margin: "22px 0 0", boxShadow: "none" }}>
              <div className="st-plate-inner">
                <img
                  src={co.product}
                  alt={`${co.name} — ${co.productLabel ?? "product"}`}
                  loading="lazy"
                  decoding="async"
                  style={{ display: "block", width: "100%" }}
                />
              </div>
              <figcaption className="st-plate-cap">
                <span>{co.productLabel}</span>
                <span>{co.productIsReal ? "Motorola Solutions" : "Study · not company photography"}</span>
              </figcaption>
            </figure>
          ) : null}

          {co.url ? (
            <div style={{ marginTop: 22 }}>
              <a href={co.url} target="_blank" rel="noreferrer" className="nb-cta nb-cta--signal nb-cta--sm">
                Visit {co.urlLabel}
                <span className="nb-cta-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------------------- metric ---- */

export function Metric({
  value,
  suffix,
  label,
  tone = "paper",
}: {
  value: number
  suffix: string
  label: string
  tone?: "paper" | "ink"
}) {
  return (
    <div data-enter style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
      <span className="st-metric" data-counter data-value={value} data-suffix={suffix}>
        {value}
        {suffix}
      </span>
      <span
        style={{
          fontFamily: "var(--fmono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: tone === "ink" ? "rgba(245,243,236,.6)" : "var(--ink-3)",
          maxWidth: 230,
          lineHeight: 1.6,
        }}
      >
        {label}
      </span>
    </div>
  )
}
