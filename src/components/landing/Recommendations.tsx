import { Section, SectionHead, Btn } from "./atoms"
import { recommendations } from "./data"

export function Recommendations() {
  return (
    <Section id="recommendations" surface="peach">
      <SectionHead
        eyebrow="Recommendations"
        title="References from Stryker leadership."
        lead="Letters from colleagues and managers I worked with on robotics programs."
      />
      <div className="grid md:grid-cols-2 gap-4">
        {recommendations.map((r) => (
          <div
            key={r.name}
            className="card-hover bg-offwhite border border-border-medium rounded-xl p-6 flex flex-col gap-1"
          >
            <div className="font-display font-semibold text-[19px] md:text-[20px] tracking-[-0.022em] text-charcoal">
              {r.name}
            </div>
            <div className="text-sm text-muted-foreground">{r.role}</div>
            <div className="mt-3.5">
              <Btn href={r.letter} target="_blank" rel="noopener" variant="ghost" size="sm">
                Read letter
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
