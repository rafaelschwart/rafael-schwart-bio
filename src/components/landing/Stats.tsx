const stats = [
  { num: "10+", label: "Years across hardware programs" },
  { num: "9", label: "Companies, 6 industries" },
  { num: "3", label: "Active certifications" },
  { num: "15%", label: "Production lift at Magic Leap" },
]

export function Stats() {
  return (
    <section className="bg-surface-cream">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-10 md:py-14 border-y border-border-soft">
          {stats.map((s) => (
            <div key={s.num}>
              <div className="font-display font-semibold text-[44px] md:text-[48px] leading-none tracking-[-0.025em] text-charcoal">
                {s.num}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
