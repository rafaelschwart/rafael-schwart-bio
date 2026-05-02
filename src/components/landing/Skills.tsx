import { Section, SectionHead, Chip } from "./atoms"
import { skills } from "./data"

export function Skills() {
  return (
    <Section id="skills" surface="slate">
      <SectionHead
        eyebrow="Capabilities"
        title="The toolset."
        lead="From CAD bench to production line, the daily kit."
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </Section>
  )
}
