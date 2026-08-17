import { hero, HEADSHOT_SRC, HERO_VIDEO, HERO_POSTER, RESUME_URL, type SectionId } from "./data"
import { ArrowRight, CornerTick, Cta, Eyebrow, VerifiedCheck } from "./atoms"

type HeroProps = { onNav: (id: SectionId) => void }

/**
 * Hero — grayscale workshop loop behind a paper scrim, declarative headline
 * with the single orange signal, framed instrument-card headshot, and the
 * pulsing blue beacon marking live/verified status.
 */
export function Hero({ onNav }: HeroProps) {
  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--rule-strong)" }}>
      <video
        data-hero-video
        data-parallax="52"
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        src={HERO_VIDEO}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-16%",
          left: 0,
          right: 0,
          height: "132%",
          width: "100%",
          objectFit: "cover",
          opacity: 0.92,
          filter: "grayscale(1) contrast(1.06)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div
        data-hero-scrim
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--paper) 0%, var(--paper) 44%, color-mix(in srgb, var(--paper) 32%, transparent) 72%, color-mix(in srgb, var(--paper) 8%, transparent) 100%)",
        }}
      />
      <div
        data-hero-grid
        style={{
          position: "relative",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(44px, 6vw, 92px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 76px)",
          display: "grid",
          gridTemplateColumns: "1.12fr .88fr",
          gap: "clamp(36px, 5vw, 72px)",
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow filled>{hero.eyebrow}</Eyebrow>
          {/* h2 — the page-level h1 is the sr-only headline in Landing.tsx,
              which stays in the a11y tree on every desktop view. */}
          <h2
            style={{
              fontFamily: "var(--fdisp)",
              fontWeight: 500,
              fontSize: "clamp(38px, 5.6vw, 78px)",
              lineHeight: 1.02,
              letterSpacing: "-.025em",
              margin: "24px 0 0",
            }}
          >
            {hero.headline} <span style={{ color: "var(--signal)" }}>{hero.headlineAccent}</span>
          </h2>
          <p
            style={{
              maxWidth: "52ch",
              fontFamily: "var(--fdisp)",
              fontWeight: 400,
              color: "var(--mute)",
              fontSize: "clamp(16px, 1.2vw, 18px)",
              lineHeight: 1.55,
              margin: "26px 0 0",
            }}
          >
            {hero.sub}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
            <Cta onClick={() => onNav("work")}>
              See the work
              <span
                aria-hidden="true"
                style={{
                  width: 22,
                  height: 22,
                  background: "rgba(255,255,255,.14)",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                }}
              >
                <ArrowRight size={13} />
              </span>
            </Cta>
            <Cta variant="ghost" href={RESUME_URL}>
              Download resume
            </Cta>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginTop: 34 }}>
            {hero.checks.map((c) => (
              <VerifiedCheck key={c} label={c} />
            ))}
          </div>
        </div>

        <div data-reveal style={{ position: "relative", justifySelf: "center" }}>
          <div
            style={{
              position: "relative",
              width: "min(392px, 84vw)",
              background: "var(--white)",
              border: "1px solid var(--rule-strong)",
              padding: 10,
            }}
          >
            <CornerTick corner="tl" />
            <CornerTick corner="br" />
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", background: "#e2dfd5" }}>
              <img
                src={HEADSHOT_SRC}
                alt="Rafael Schwart"
                loading="eager"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "grayscale(1) contrast(1.04)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: "11px 13px",
                  background: "linear-gradient(transparent, rgba(10,10,10,.72))",
                  fontFamily: "var(--fmono)",
                  fontSize: 10.5,
                  letterSpacing: ".06em",
                  color: "#fff",
                }}
              >
                <span>RAFAEL SCHWART</span>
                <span style={{ color: "var(--signal)" }}>PM · NPI</span>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -14,
              left: -14,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--beacon)",
              display: "grid",
              placeItems: "center",
              animation: "rsPulse 3.2s ease-out infinite",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="2.4" />
              <path d="M12 5a7 7 0 0 1 7 7" />
              <path d="M12 8.5a3.5 3.5 0 0 1 3.5 3.5" />
              <path d="M12 19a7 7 0 0 1-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
