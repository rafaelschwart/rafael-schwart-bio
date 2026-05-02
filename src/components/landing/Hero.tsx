import { Btn, Pill } from "./atoms"
import { HEADSHOT_SRC, LINKEDIN_URL, RESUME_URL } from "./data"

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-surface-cream scroll-mt-20"
    >
      <div aria-hidden className="hero-wash" />
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1.4fr_1fr] items-center">
          <div className="fade-in-up">
            <div className="flex flex-wrap gap-2 mb-5">
              <Pill>PMP-certified</Pill>
              <Pill>Six Sigma Green Belt</Pill>
              <Pill>Miami, FL</Pill>
            </div>
            <h1 className="display-xl text-charcoal">
              Engineering programs,
              <br />
              end-to-end.
            </h1>
            <p className="lead mt-5 max-w-[560px] text-[hsl(40_8%_11%/0.78)]">
              Senior Operations Program Manager (NPI) at Motorola Solutions. PMP-certified
              Technical Project Manager &amp; Process Engineer with 10+ years across consumer
              electronics, AR, medical devices, robotics, aerospace, and solar.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Btn href="#experience" variant="dark">
                See my work
              </Btn>
              <Btn href={RESUME_URL} target="_blank" rel="noopener" variant="ghost">
                Download resume
              </Btn>
              <Btn href={LINKEDIN_URL} target="_blank" rel="noopener" variant="ghost">
                LinkedIn
              </Btn>
            </div>
          </div>
          <div className="fade-in-up" style={{ ["--stagger-delay" as string]: "2" }}>
            <img
              src={HEADSHOT_SRC}
              alt="Rafael Schwart"
              loading="eager"
              className="w-full aspect-square rounded-2xl object-cover border border-border-soft bg-[hsl(var(--tint-3))]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
