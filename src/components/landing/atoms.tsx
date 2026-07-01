/**
 * V2 ledger atoms — the small recurring instruments of the design system:
 * mono eyebrow labels, corner ticks, CTAs with press feedback, chips, and the
 * animated line-work motifs used on the brands rail.
 * Precise values are ported 1:1 from `Rafael Schwart V2/Rafael Schwart.dc.html`.
 */

import type { CSSProperties, ReactNode } from "react"
import type { MotifKind, CapabilityIcon } from "./data"

/* ------------------------------------------------------------- eyebrow ---- */

type EyebrowProps = {
  children: ReactNode
  /** Marker drawn inside the little square: signal dot, crosshair, or check */
  icon?: "dot" | "crosshair" | "check"
  /** Which surface the label sits on */
  tone?: "paper" | "ink"
  /** Solid ink/paper marker box (hero + contact) vs hairline outline */
  filled?: boolean
}

export function Eyebrow({ children, icon = "dot", tone = "paper", filled = false }: EyebrowProps) {
  const onInk = tone === "ink"
  const boxStyle: CSSProperties = filled
    ? {
        width: 20,
        height: 20,
        background: onInk ? "var(--paper)" : "var(--ink)",
        display: "grid",
        placeItems: "center",
        flex: "none",
      }
    : {
        width: 18,
        height: 18,
        border: `1px solid ${onInk ? "rgba(255,255,255,.22)" : "var(--rule-strong)"}`,
        display: "grid",
        placeItems: "center",
        flex: "none",
      }
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <span style={boxStyle} aria-hidden="true">
        {icon === "dot" && <span style={{ width: 6, height: 6, background: "var(--signal)" }} />}
        {icon === "crosshair" && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.4">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        )}
        {icon === "check" && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="3">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
      <span
        style={{
          fontFamily: "var(--fmono)",
          fontSize: filled ? 11.5 : 11,
          letterSpacing: filled ? ".12em" : ".14em",
          textTransform: "uppercase",
          color: onInk ? "rgba(245,243,236,.55)" : filled ? "var(--ink-3)" : "var(--mute)",
        }}
      >
        {children}
      </span>
    </div>
  )
}

/* --------------------------------------------------------- corner tick ---- */

type TickProps = {
  corner: "tl" | "tr" | "br"
  size?: number
  color?: string
  inset?: number
}

/** The bracket that frames ledger cards. Parent needs position:relative. */
export function CornerTick({ corner, size = 10, color = "var(--ink-3)", inset = 6 }: TickProps) {
  const border = `1.5px solid ${color}`
  const style: CSSProperties = { position: "absolute", width: size, height: size }
  if (corner === "tl") Object.assign(style, { top: inset, left: inset, borderTop: border, borderLeft: border })
  if (corner === "tr") Object.assign(style, { top: inset, right: inset, borderTop: border, borderRight: border })
  if (corner === "br") Object.assign(style, { bottom: inset, right: inset, borderBottom: border, borderRight: border })
  return <span aria-hidden="true" style={style} />
}

/* --------------------------------------------------------------- ctas ---- */

/* Arrows nudge along their direction of travel when a `group` parent is
   hovered — a 21st.dev-sourced micro-interaction, re-timed to ease-eng. */

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 ease-eng group-hover:translate-x-[3px]"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 ease-eng group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

type CtaProps = {
  children: ReactNode
  variant?: "ink" | "ghost" | "signal" | "ghost-dark"
  href?: string
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

const ctaBase =
  "group press inline-flex items-center gap-2.5 rounded-[3px] font-bold text-[15px] no-underline cursor-pointer border-0 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"

const ctaVariants: Record<NonNullable<CtaProps["variant"]>, string> = {
  ink: "bg-[var(--ink)] text-[var(--paper)] px-[26px] py-[15px] transition-colors duration-200 ease-eng hover:bg-[var(--signal)] hover:text-white",
  ghost:
    "bg-transparent text-[var(--ink)] px-6 py-[15px] border border-solid border-[var(--rule-strong)] transition-colors duration-200 ease-eng hover:bg-[var(--paper-2)]",
  signal:
    "bg-[var(--signal)] text-white px-7 py-[15px] transition-[filter] duration-200 ease-eng hover:brightness-110",
  "ghost-dark":
    "bg-[rgba(255,255,255,.06)] text-[var(--paper)] px-6 py-[15px] border border-solid border-[rgba(255,255,255,.3)] transition-colors duration-200 ease-eng hover:bg-[rgba(255,255,255,.14)]",
}

export function Cta({ children, variant = "ink", href, onClick, className = "", ariaLabel }: CtaProps) {
  const cls = `${ctaBase} ${ctaVariants[variant]} ${className}`
  const style: CSSProperties = { fontFamily: "var(--fdisp)" }
  if (href) {
    const external = href.startsWith("http")
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        style={style}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

/* ---------------------------------------------------------------- chip ---- */

export function Chip({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "paper" }) {
  const onInk = tone === "ink"
  return (
    <span
      style={{
        fontFamily: "var(--fmono)",
        fontSize: 10.5,
        letterSpacing: ".03em",
        color: onInk ? "rgba(245,243,236,.72)" : "var(--mute)",
        border: `1px solid ${onInk ? "rgba(255,255,255,.2)" : "var(--rule-strong)"}`,
        padding: "6px 11px",
      }}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------- motifs ---- */

const INK = "#0a0a0a"

const spin = (dur: string, origin = "20px 20px"): CSSProperties => ({
  transformBox: "view-box",
  transformOrigin: origin,
  animation: `rsSpin ${dur} linear infinite`,
})

/**
 * Animated line-work motif for each industry — comms waves, AR frame, ECG
 * trace, radar sweep, gear, rotor, plane. Replaces logos on the brands rail.
 */
export function Motif({ kind }: { kind: MotifKind }) {
  const svgProps = {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fill: "none",
    style: { display: "block", overflow: "visible" } as CSSProperties,
    "aria-hidden": true as const,
  }
  switch (kind) {
    case "comms":
      return (
        <svg {...svgProps}>
          <circle cx="20" cy="29" r="2.6" fill={INK} />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d="M11 29 A13 13 0 0 1 29 29"
              stroke="var(--signal)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                transformBox: "view-box",
                transformOrigin: "20px 29px",
                animation: `rsWaveA 2.6s ease-out ${i * 0.55}s infinite`,
              }}
            />
          ))}
        </svg>
      )
    case "ar":
      return (
        <svg {...svgProps}>
          <path d="M9 13V9h4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M27 9h4v4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 27v4h4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M31 27v4h-4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <rect x="16" y="16" width="8" height="8" stroke={INK} strokeWidth="1.6" />
          <g style={spin("3.2s")}>
            <circle cx="20" cy="6" r="2" fill="var(--signal)" />
          </g>
        </svg>
      )
    case "medical":
      return (
        <svg {...svgProps}>
          <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(0,0,0,.12)" strokeWidth="1" />
          <polyline
            points="2,20 11,20 14,11 18,29 22,20 26,20 29,15 32,20 38,20"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="22 60"
            style={{ animation: "rsDrawPulse 2s linear infinite" }}
          />
        </svg>
      )
    case "radar":
      return (
        <svg {...svgProps}>
          <circle cx="20" cy="20" r="13" stroke={INK} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6.5" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
          <line x1="20" y1="20" x2="20" y2="7" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" style={spin("2.6s")} />
          <circle cx="27" cy="13" r="1.8" fill="var(--signal)" style={{ animation: "rsBlip 2.6s ease-in-out infinite" }} />
        </svg>
      )
    case "gear": {
      const teeth = Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        const c = Math.cos(a)
        const s = Math.sin(a)
        return (
          <line
            key={i}
            x1={20 + c * 8.5}
            y1={20 + s * 8.5}
            x2={20 + c * 13}
            y2={20 + s * 13}
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })
      return (
        <svg {...svgProps}>
          <g style={spin("5s")}>
            <circle cx="20" cy="20" r="8.5" stroke={INK} strokeWidth="1.6" />
            {teeth}
          </g>
          <circle cx="20" cy="20" r="3" fill="var(--signal)" />
        </svg>
      )
    }
    case "rotor":
      return (
        <svg {...svgProps}>
          <g style={spin("1.5s")}>
            {[0, 120, 240].map((d) => (
              <ellipse key={d} cx="20" cy="11" rx="3" ry="8" fill="rgba(0,0,0,.8)" transform={`rotate(${d} 20 20)`} />
            ))}
          </g>
          <circle cx="20" cy="20" r="3" fill="var(--signal)" />
        </svg>
      )
    case "plane":
      return (
        <svg {...svgProps}>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1="3"
              y1={13 + i * 7}
              x2="12"
              y2={13 + i * 7}
              stroke="var(--signal)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="5 6"
              style={{ animation: `rsDash 1s linear ${i * 0.15}s infinite` }}
            />
          ))}
          <path d="M15 27 L30 20 L15 13 L19 20 Z" fill={INK} style={{ animation: "rsBob 2.6s ease-in-out infinite" }} />
        </svg>
      )
  }
}

/* --------------------------------------------------- capability icons ---- */

export function CapabilityIconSvg({ icon }: { icon: CapabilityIcon }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--paper)",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  }
  switch (icon) {
    case "npi":
      return (
        <svg {...common}>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      )
    case "sigma":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" fill="var(--signal)" stroke="none" />
        </svg>
      )
    case "quality":
      return (
        <svg {...common}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case "leadership":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <line x1="8.3" y1="13.4" x2="15.6" y2="17.6" />
          <line x1="15.6" y1="6.4" x2="8.3" y2="10.6" />
        </svg>
      )
  }
}

/* ----------------------------------------------------------- verified ---- */

/** The blue beacon check used for hero proof points. */
export function VerifiedCheck({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          width: 17,
          height: 17,
          borderRadius: "50%",
          background: "var(--beacon)",
          display: "grid",
          placeItems: "center",
          flex: "none",
        }}
        aria-hidden="true"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <span style={{ fontFamily: "var(--fmono)", fontSize: 12, letterSpacing: ".03em", color: "var(--ink-3)" }}>
        {label}
      </span>
    </div>
  )
}
