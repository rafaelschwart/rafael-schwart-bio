import { Section, SectionHead } from "./atoms"
import { experiences } from "./data"

export function Experience() {
  return (
    <Section id="experience" surface="cream">
      <SectionHead
        eyebrow="Experience"
        title="A track record on real programs."
        lead="From CAD bench through pilot line to volume — programs delivered on tight launch windows."
      />
      <div className="grid gap-4">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="card-hover bg-offwhite border border-border-medium rounded-xl px-6 py-5 md:px-7 md:py-6 grid md:grid-cols-[1fr_auto] gap-x-6 gap-y-1.5"
          >
            <div>
              <h3 className="font-display font-semibold text-[20px] md:text-[22px] leading-tight tracking-[-0.025em] text-charcoal">
                {exp.role}
              </h3>
              <div className="text-sm text-muted-foreground mt-1">
                {exp.company} · {exp.location}
              </div>
            </div>
            <div className="text-[13px] text-muted-foreground whitespace-nowrap pt-1.5 self-start">
              {exp.when}
            </div>
            <p className="md:col-span-2 text-[15px] leading-[1.55] text-[hsl(40_8%_11%/0.82)] mt-2">
              {exp.summary}
            </p>
            {exp.highlights ? (
              <ul className="md:col-span-2 mt-3 pl-[18px] list-disc marker:text-[hsl(40_8%_11%/0.4)]">
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.55] text-[hsl(40_8%_11%/0.82)] mb-1"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}
