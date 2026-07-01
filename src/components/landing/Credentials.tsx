import pmpCertificate from "@/assets/pmp-certificate.png"
import { certifications, pmp, refs, verifs } from "./data"
import { ArrowUpRight, Eyebrow } from "./atoms"

/**
 * Credentials view — featured PMP instrument card, the supporting
 * certifications, and the two verification ledgers (reference letters +
 * employment verification) with live Drive links.
 */
export function Credentials() {
  return (
    <section style={{ borderBottom: "1px solid var(--rule-strong)", background: "var(--paper-2)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <Eyebrow icon="check">Credentials</Eyebrow>
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
          Certified and verified.
        </h2>

        <div
          data-creds-grid
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "clamp(16px, 2vw, 24px)",
            marginTop: "clamp(36px, 4vw, 52px)",
          }}
        >
          {/* Featured PMP card */}
          <div data-reveal data-pmp-card style={{ border: "1px solid var(--ink)", background: "var(--white)", display: "grid", gridTemplateColumns: "auto 1fr" }}>
            <div style={{ borderRight: "1px solid var(--rule)", padding: 24, display: "grid", placeItems: "center", background: "var(--paper-2)" }}>
              <img
                src={pmpCertificate}
                alt="PMP certificate issued by PMI to Rafael Schwart"
                loading="lazy"
                style={{ width: 120, maxWidth: "34vw", height: "auto", display: "block", border: "1px solid var(--rule)" }}
              />
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ fontFamily: "var(--fmono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--signal)" }}>
                {pmp.issuer}
              </div>
              <h3 style={{ fontFamily: "var(--fdisp)", fontWeight: 500, fontSize: 23, letterSpacing: "-.02em", lineHeight: 1.16, margin: "12px 0 0" }}>
                {pmp.title}
              </h3>
              <p style={{ fontFamily: "var(--fdisp)", fontWeight: 400, fontSize: 14, lineHeight: 1.62, color: "var(--mute)", margin: "14px 0 0" }}>
                {pmp.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 18 }}>
                <a
                  href={pmp.credlyUrl}
                  target="_blank"
                  rel="noopener"
                  className="group text-[var(--ink)] transition-colors duration-200 ease-eng hover:text-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "var(--fdisp)",
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--ink)",
                    paddingBottom: 2,
                  }}
                >
                  Verify on Credly
                  <ArrowUpRight />
                </a>
                <a
                  href={pmp.diplomaUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--mute)] transition-colors duration-200 ease-eng hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "var(--fdisp)",
                    fontWeight: 500,
                    fontSize: 13,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--rule-strong)",
                    paddingBottom: 2,
                  }}
                >
                  View diploma
                </a>
              </div>
            </div>
          </div>

          {/* Supporting certifications */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
            {certifications.map((c) => (
              <div key={c.title} data-reveal style={{ border: "1px solid var(--rule)", background: "var(--white)", padding: 26, flex: 1 }}>
                <div style={{ fontFamily: "var(--fmono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mute)" }}>
                  {c.eyebrow}
                </div>
                <h3 style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 19, letterSpacing: "-.01em", margin: "12px 0 0" }}>
                  {c.title}
                </h3>
                <div style={{ fontFamily: "var(--fmono)", fontSize: 11.5, color: "var(--mute)", marginTop: 8 }}>{c.org}</div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="group text-[var(--ink)] transition-colors duration-200 ease-eng hover:text-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontFamily: "var(--fdisp)",
                      fontWeight: 700,
                      fontSize: 13,
                      textDecoration: "none",
                      marginTop: 16,
                      borderBottom: "1px solid var(--ink)",
                      paddingBottom: 2,
                    }}
                  >
                    {c.urlLabel}
                    <ArrowUpRight />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* References + employment verification ledgers */}
        <div
          data-refs-wrap
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 2vw, 24px)",
            marginTop: "clamp(24px, 3vw, 32px)",
          }}
        >
          <div data-reveal style={{ border: "1px solid var(--rule)", background: "var(--white)" }}>
            <h3
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--rule)",
                fontFamily: "var(--fmono)",
                fontSize: 10.5,
                fontWeight: 400,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--mute)",
                margin: 0,
              }}
            >
              References · Stryker leadership
            </h3>
            {refs.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener"
                aria-label={`Reference letter from ${r.name}, ${r.role} (opens in a new tab)`}
                className="transition-colors duration-150 ease-eng hover:bg-[var(--paper-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "16px 24px",
                  borderBottom: "1px solid var(--rule)",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <span>
                  <span style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 15 }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--fmono)", fontSize: 11, color: "var(--mute)", display: "block", marginTop: 4 }}>
                    {r.role}
                  </span>
                </span>
                <span style={{ fontFamily: "var(--fmono)", fontSize: 10.5, letterSpacing: ".04em", color: "var(--signal)", whiteSpace: "nowrap" }}>
                  READ LETTER →
                </span>
              </a>
            ))}
          </div>

          <div data-reveal style={{ border: "1px solid var(--rule)", background: "var(--white)" }}>
            <h3
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--rule)",
                fontFamily: "var(--fmono)",
                fontSize: 10.5,
                fontWeight: 400,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--mute)",
                margin: 0,
              }}
            >
              Employment verification letters
            </h3>
            {verifs.map((v) => (
              <a
                key={v.org}
                href={v.url}
                target="_blank"
                rel="noopener"
                aria-label={`Employment verification letter from ${v.org} (opens in a new tab)`}
                className="transition-colors duration-150 ease-eng hover:bg-[var(--paper-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "16px 24px",
                  borderBottom: "1px solid var(--rule)",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <span>
                  <span style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 15 }}>{v.org}</span>
                  <span className="tnum" style={{ fontFamily: "var(--fmono)", fontSize: 11, color: "var(--mute)", display: "block", marginTop: 4 }}>
                    {v.dates}
                  </span>
                </span>
                <span style={{ fontFamily: "var(--fmono)", fontSize: 10.5, letterSpacing: ".04em", color: "var(--signal)", whiteSpace: "nowrap" }}>
                  VIEW →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
