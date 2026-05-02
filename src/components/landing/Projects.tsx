import { ArrowUpRight } from "lucide-react"
import { Section, SectionHead } from "./atoms"
import { projects } from "./data"

export function Projects() {
  return (
    <Section id="projects" surface="clay">
      <SectionHead eyebrow="Side projects" title="Building outside the day job." />
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <article
            key={p.name}
            className="card-hover bg-offwhite border border-border-medium rounded-xl p-6 flex flex-col gap-2"
          >
            <h3 className="font-display font-semibold text-[20px] md:text-[22px] leading-tight tracking-[-0.025em] text-charcoal">
              {p.name}
            </h3>
            <div className="text-[13px] text-muted-foreground">{p.role}</div>
            <p className="text-[14px] leading-[1.55] text-[hsl(40_8%_11%/0.82)] mt-2 flex-1">
              {p.description}
            </p>
            <a
              href={p.url}
              target="_blank"
              rel="noopener"
              className="text-sm text-charcoal mt-3.5 inline-flex items-center gap-1 hover:opacity-70"
            >
              {p.domain}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
}
