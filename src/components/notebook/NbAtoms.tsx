/**
 * Notebook iteration — shared primitives.
 * Every visual device from the reference (entry stamps, highlighter swipes,
 * handwritten margin notes, taped sticker cards, marquee tape) rendered in the
 * V2 palette: paper, ink, blue signal.
 */

import type { CSSProperties, ReactNode } from "react"

/* ------------------------------------------------------------- stamps ---- */

/** `▪ ENTRY 03, THE NUMBERS / NIGHT MODE` — the page-marker above every block. */
export function EntryStamp({ entry, title, note }: { entry: string; title: string; note?: string }) {
  return (
    <div className="nb-stamp" data-reveal>
      <span className="nb-stamp-sq" aria-hidden />
      <span>
        Entry {entry}, {title}
        {note ? <span style={{ color: "var(--fade)" }}> / {note}</span> : null}
      </span>
    </div>
  )
}

/* -------------------------------------------------------- annotations ---- */

/** Highlighter swipe behind a phrase. `ink` swipes harder (dark surfaces). */
export function Hl({ children, ink = false }: { children: ReactNode; ink?: boolean }) {
  return (
    <span className={`nb-hl${ink ? " nb-hl-ink" : ""}`}>
      <span>{children}</span>
    </span>
  )
}

/** Hand-drawn underline stroke under a phrase. */
export function Ul({ children }: { children: ReactNode }) {
  return <span className="nb-underline">{children}</span>
}

/** Struck-through word — used in the tape marquee. */
export function Strike({ children }: { children: ReactNode }) {
  return <span className="nb-strike">{children}</span>
}

/** Marker-pen margin note. `tone="signal"` writes it in blue. */
export function Scribble({
  children,
  tone = "ink",
  size = "md",
  style,
}: {
  children: ReactNode
  tone?: "ink" | "signal"
  size?: "md" | "sm"
  style?: CSSProperties
}) {
  const cls = [size === "sm" ? "nb-hand-sm" : "nb-hand", tone === "signal" ? "nb-hand-signal" : ""]
    .filter(Boolean)
    .join(" ")
  return (
    <p className={cls} style={style} data-reveal>
      <span className="nb-write">{children}</span>
    </p>
  )
}

/* --------------------------------------------------------------- tape ---- */

/** Infinite tape strip — the blue band that cuts across the page at an angle. */
export function TapeMarquee({ items }: { items: ReactNode[] }) {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const run = [...items, ...items]
  return (
    <div className="nb-marquee" aria-hidden>
      <div className="nb-marquee-track">
        {run.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--fmono)",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 34,
            }}
          >
            {item}
            <span style={{ opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- cards ---- */

type CardProps = {
  children: ReactNode
  /** Hard offset shadow — the "sticker peeled off the page" lift. */
  lift?: boolean
  /** Strip of tape across the top edge. */
  tape?: boolean
  tilt?: "l" | "r" | "none"
  style?: CSSProperties
  className?: string
}

export function NbCard({ children, lift, tape, tilt = "none", style, className = "" }: CardProps) {
  const cls = [
    "nb-card",
    lift ? "nb-lift" : "",
    tilt === "l" ? "nb-tilt-l" : tilt === "r" ? "nb-tilt-r" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <div className={cls} style={style} data-reveal>
      {tape ? <span className="nb-tape" aria-hidden /> : null}
      {children}
    </div>
  )
}

/** Sticky note — the small aside the reference pins in the margins. */
export function StickyNote({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="nb-sticky" style={{ padding: "14px 16px", ...style }} data-reveal>
      {children}
    </div>
  )
}

/* --------------------------------------------------------- check rows ---- */

export function CheckRow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0" }}
      data-reveal
    >
      <span
        data-tick
        style={{
          color: "var(--signal)",
          fontFamily: "var(--fmono)",
          fontSize: 14,
          lineHeight: 1.35,
          flex: "none",
        }}
        aria-hidden
      >
        ✓
      </span>
      <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-2)" }}>{children}</span>
    </div>
  )
}

export function CrossCard({ title, body }: { title: string; body: string }) {
  return (
    <NbCard style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--fmono)",
            fontSize: 17,
            color: "var(--ink-3)",
            lineHeight: 1.1,
            flex: "none",
          }}
          aria-hidden
        >
          ✕
        </span>
        <div>
          <p style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 6 }}>{title}</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--mute)" }}>{body}</p>
        </div>
      </div>
    </NbCard>
  )
}

/* ---------------------------------------------------------------- cta ---- */

/**
 * The sticker CTA. Hover / press motion lives in `notebook.css` (.nb-cta) so
 * it survives keyboard focus and respects prefers-reduced-motion, rather than
 * being driven by mouse handlers.
 */
export function NbCta({
  children,
  href,
  variant = "signal",
  onClick,
  icon,
  arrow: showArrow = true,
  label,
}: {
  children: ReactNode
  href?: string
  variant?: "signal" | "ink" | "paper"
  onClick?: () => void
  /** Mark rendered before the label, inheriting the button's colour */
  icon?: ReactNode
  /** Brand-mark buttons read better without the trailing arrow */
  arrow?: boolean
  /** Accessible name, when the visible label alone is not descriptive */
  label?: string
}) {
  const cls = `nb-cta nb-cta--${variant}`
  const inner = (
    <>
      {icon ? (
        <span className="nb-cta-icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children}
      {showArrow ? (
        <span className="nb-cta-arrow" aria-hidden>
          →
        </span>
      ) : null}
    </>
  )

  if (href) {
    const external = href.startsWith("http")
    return (
      <a
        href={href}
        className={cls}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={cls} aria-label={label} onClick={onClick}>
      {inner}
    </button>
  )
}

/* ------------------------------------------------------------ section ---- */

/** One notebook spread. `tone="night"` flips it to the inverted ink block. */
export function Spread({
  children,
  tone = "paper",
  graph = false,
  id,
  style,
}: {
  children: ReactNode
  tone?: "paper" | "soft" | "night"
  graph?: boolean
  id?: string
  style?: CSSProperties
}) {
  const bg =
    tone === "night" ? undefined : tone === "soft" ? "var(--paper-soft)" : "transparent"
  return (
    <section
      id={id}
      className={[tone === "night" ? "nb-night" : "", graph ? "nb-graph" : ""]
        .filter(Boolean)
        .join(" ")}
      style={{ background: bg, padding: "clamp(56px, 8vw, 104px) 0", position: "relative", ...style }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
        {children}
      </div>
    </section>
  )
}
