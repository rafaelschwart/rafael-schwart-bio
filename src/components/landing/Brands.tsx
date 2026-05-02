import { Section, SectionHead } from "./atoms"
import { brands } from "./data"

export function Brands() {
  return (
    <Section id="brands" surface="sage">
      <SectionHead
        eyebrow="Selected programs"
        title="Brands I've shipped with."
        lead="Hardware programs across consumer, medical, AR, aerospace, and industrial automation."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <div
            key={b.name}
            className="card-hover bg-offwhite border border-border-medium rounded-xl overflow-hidden"
          >
            <div className="aspect-[4/3] grid place-items-center bg-[hsl(var(--tint-3))] border-b border-border-soft">
              <img
                src={b.src}
                alt={b.name}
                loading="lazy"
                className="max-w-[70%] max-h-[70%] object-contain"
              />
            </div>
            <div className="px-4 py-3.5">
              <div className="text-[15px] md:text-base font-medium text-charcoal">{b.name}</div>
              <div className="text-[13px] text-muted-foreground mt-0.5">{b.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
