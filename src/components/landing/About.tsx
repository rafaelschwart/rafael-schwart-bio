import { Section, Eyebrow } from "./atoms"

export function About() {
  return (
    <Section id="about" surface="ivory">
      <Eyebrow>About</Eyebrow>
      <h2 className="display-h2 text-charcoal max-w-[20ch]">
        Strategy meets the shop floor.
      </h2>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8">
        <p className="text-[18px] leading-[1.55] text-[hsl(40_8%_11%/0.82)]">
          Dynamic and results-driven Technical Project Manager and Process Engineer with over
          10 years of experience across Consumer Electronics, Augmented Reality, Medical
          Devices, Robotics, Aerospace, and Solar Energy.
        </p>
        <p className="text-[18px] leading-[1.55] text-[hsl(40_8%_11%/0.82)]">
          Expert in CAD, CAE, FEA, FMEA, GD&amp;T, and project management tools (ERP, PDM,
          PLM). Adept at Lean Manufacturing, Six Sigma, and Agile methodologies, driving
          cross-functional teams to deliver high-performance products under tight deadlines.
          Born in Caracas, Venezuela; based in Miami, Florida.
        </p>
      </div>
    </Section>
  )
}
