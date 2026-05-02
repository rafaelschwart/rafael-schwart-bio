import { Btn, Eyebrow } from "./atoms"
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "./data"

export function Contact() {
  return (
    <section id="contact" className="bg-surface-cream py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <div className="bg-offwhite border border-border-medium rounded-2xl px-6 py-12 md:px-14 md:py-14 text-center">
          <Eyebrow className="!mb-3.5">Contact</Eyebrow>
          <h2 className="display-h2 text-charcoal">Let's build something.</h2>
          <p className="lead max-w-[540px] mx-auto mt-3.5">
            Open to senior program management, NPI, and process engineering roles.
          </p>
          <div className="inline-flex flex-wrap gap-3 justify-center mt-7">
            <Btn href={`mailto:${EMAIL}`} variant="dark">
              {EMAIL}
            </Btn>
            <Btn href={LINKEDIN_URL} target="_blank" rel="noopener" variant="ghost">
              linkedin.com/in/rafaelschwart
            </Btn>
            <Btn href={RESUME_URL} target="_blank" rel="noopener" variant="ghost">
              Download résumé
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
