import { contact, CONTACT_POSTER, CONTACT_VIDEO, EMAIL, LINKEDIN_URL, RESUME_URL } from "./data"
import { Cta, Eyebrow } from "./atoms"

/**
 * Contact — grayscale workshop loop dimmed under an ink scrim with the white
 * bench grid drifting over it. One signal CTA (email), two ghost CTAs.
 */
export function Contact() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--ink)",
        color: "var(--paper)",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <video
        data-parallax="52"
        muted
        loop
        playsInline
        preload="auto"
        poster={CONTACT_POSTER}
        src={CONTACT_VIDEO}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-16%",
          left: 0,
          right: 0,
          height: "132%",
          width: "100%",
          objectFit: "cover",
          opacity: 0.36,
          willChange: "transform",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,.72), rgba(10,10,10,.9))",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          animation: "rsGridDrift 70s linear infinite",
        }}
      />
      <div
        data-reveal
        style={{
          position: "relative",
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(80px, 11vw, 168px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <Eyebrow tone="ink" filled>
          {contact.eyebrow}
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--fdisp)",
            fontWeight: 500,
            fontSize: "clamp(36px, 6.2vw, 80px)",
            lineHeight: 1.02,
            letterSpacing: "-.03em",
            margin: "26px auto 0",
            maxWidth: "18ch",
          }}
        >
          {contact.headline}
        </h2>
        <p
          style={{
            fontFamily: "var(--fdisp)",
            fontWeight: 400,
            color: "rgba(245,243,236,.72)",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "22px auto 0",
            maxWidth: "46ch",
          }}
        >
          {contact.sub}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 36 }}>
          <Cta variant="signal" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </Cta>
          <Cta variant="ghost-dark" href={LINKEDIN_URL} ariaLabel="Rafael Schwart on LinkedIn (opens in a new tab)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11.1 22 14.3V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21h-4z" />
            </svg>
            LinkedIn
          </Cta>
          <Cta variant="ghost-dark" href={RESUME_URL}>
            Download résumé
          </Cta>
        </div>
      </div>
    </section>
  )
}
