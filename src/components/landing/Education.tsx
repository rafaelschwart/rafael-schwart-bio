import { Section, SectionHead, Btn } from "./atoms"

export function Education() {
  return (
    <Section id="education" surface="peach">
      <SectionHead
        eyebrow="Education"
        title="Mechanical Engineering, University of Miami."
      />
      <article className="card-hover bg-offwhite border border-border-medium rounded-2xl p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-x-6 gap-y-2">
        <div>
          <h3 className="font-display font-semibold text-[26px] md:text-[28px] leading-tight tracking-[-0.025em]">
            B.S. Mechanical Engineering
          </h3>
          <div className="text-[15px] text-muted-foreground mt-1.5">
            University of Miami · Coral Gables, FL
          </div>
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap pt-1.5 md:pt-2.5">
          2010 — 2014
        </div>
        <p className="md:col-span-2 text-[15px] leading-[1.55] text-[hsl(40_8%_11%/0.82)] mt-3.5">
          Comprehensive education in Mechanical Engineering, covering CAD, FEA, and
          manufacturing processes.
        </p>
        <div className="md:col-span-2 mt-4">
          <Btn
            href="https://drive.google.com/file/d/1NAQa9Kw5Zhb1YZoNg6kXXUB-_FbAMNKl/view?usp=sharing"
            target="_blank"
            rel="noopener"
            variant="ghost"
            size="sm"
          >
            View diploma
          </Btn>
        </div>
      </article>
    </Section>
  )
}
