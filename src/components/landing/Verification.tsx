import { ShieldCheck } from "lucide-react"
import { Section, SectionHead, Btn } from "./atoms"
import { verifications } from "./data"

export function Verification() {
  return (
    <Section id="employment-verification" surface="sage">
      <SectionHead
        eyebrow="Employment verification"
        title="Official letters of verification."
        lead="Verification letters from former employers on official letterhead, available for recruiters and background-check requests."
      />
      <div className="grid gap-3.5">
        {verifications.map((v) => (
          <div
            key={v.company}
            className="card-hover bg-offwhite border border-border-medium rounded-xl px-6 py-5 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] gap-x-5 gap-y-1.5 items-center"
          >
            <div className="w-9 h-9 rounded-full bg-[hsl(var(--tint-4))] grid place-items-center text-charcoal">
              <ShieldCheck className="h-[18px] w-[18px]" />
            </div>
            <div>
              <div className="font-display font-semibold text-[17px] md:text-[18px] tracking-[-0.022em] text-charcoal">
                {v.company}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">{v.role}</div>
            </div>
            <div className="col-start-2 md:col-start-3 text-[13px] text-muted-foreground whitespace-nowrap">
              {v.when}
            </div>
            <div className="col-start-2 md:col-auto">
              <Btn href={v.letter} target="_blank" rel="noopener" variant="ghost" size="sm">
                View letter
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
