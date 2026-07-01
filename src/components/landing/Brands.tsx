import { brands, brandsLabel } from "./data"
import { CornerTick, Eyebrow, Motif } from "./atoms"

/**
 * Past-experience strip — a horizontal snap rail of instrument cards, each
 * carrying an animated line-work motif for its industry instead of a logo.
 */
export function Brands() {
  return (
    <section style={{ borderBottom: "1px solid var(--rule-strong)", background: "var(--paper-2)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(40px, 5vw, 64px) 0 clamp(44px, 5vw, 68px)" }}>
        <div style={{ padding: "0 clamp(20px, 5vw, 64px)" }}>
          <Eyebrow>{brandsLabel}</Eyebrow>
        </div>
        <ul
          className="rail"
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            padding: "22px clamp(20px, 5vw, 64px) 6px",
            scrollSnapType: "x proximity",
            listStyle: "none",
            margin: 0,
          }}
        >
          {brands.map((b, i) => (
            <li
              key={`${b.name}-${i}`}
              className="border border-solid border-[var(--rule)] transition-colors duration-200 ease-eng hover:border-[var(--rule-strong)]"
              style={{
                position: "relative",
                flex: "0 0 auto",
                width: 216,
                background: "var(--white)",
                padding: "22px 20px",
                scrollSnapAlign: "start",
              }}
            >
              <CornerTick corner="tr" size={8} color="var(--rule-strong)" inset={7} />
              <div
                style={{
                  width: 46,
                  height: 46,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--paper-2)",
                  border: "1px solid var(--rule)",
                }}
              >
                <Motif kind={b.motif} />
              </div>
              <div style={{ fontFamily: "var(--fdisp)", fontWeight: 700, fontSize: 15.5, letterSpacing: "-.01em", marginTop: 22 }}>
                {b.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 10.5,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                  marginTop: 7,
                }}
              >
                {b.role}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
