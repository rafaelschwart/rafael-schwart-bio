import pmpCertificate from "@/assets/pmp-certificate.png"
import { Section, SectionHead, Btn } from "./atoms"

export function Credentials() {
  return (
    <Section id="certifications" surface="ivory">
      <SectionHead eyebrow="Credentials" title="Certified, verified." />

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="card-hover bg-offwhite border border-border-medium rounded-2xl p-6 md:p-8">
          <img
            src={pmpCertificate}
            alt="PMP certificate — Rafael Schwart"
            loading="lazy"
            className="w-full h-auto rounded-xl border border-border-soft block"
          />
        </div>
        <div>
          <h3 className="display-h3 text-charcoal">
            Project Management
            <br />
            Professional.
          </h3>
          <p className="lead mt-4">
            Issued by the Project Management Institute (PMI). Verified credential covering
            scope, schedule, cost, quality, risk, and stakeholder management on hardware
            programs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn
              href="https://www.credly.com/badges/f6c6c143-768b-4b63-836a-ca062b99639a"
              target="_blank"
              rel="noopener"
              variant="dark"
            >
              Verify on Credly
            </Btn>
            <Btn
              href="https://drive.google.com/file/d/1JKohOdgfwKokcy-hL8WHf0pze3dp6vX-/view?usp=sharing"
              target="_blank"
              rel="noopener"
              variant="ghost"
            >
              View diploma
            </Btn>
          </div>
        </div>
      </div>

      <div className="grid gap-3.5 mt-8">
        <CredentialItem
          name="Six Sigma Green Belt"
          issuer="American Society for Quality (ASQ) · Certified"
          href="https://drive.google.com/file/d/1fIUGdS8duNPwlG2wxCVrj9yv7frJTR7j/view?usp=sharing"
          ctaLabel="View diploma"
        />
        <CredentialItem
          name="Agile Foundations"
          issuer="Professional Development · Certified"
          rightLabel="Certificate on file"
        />
      </div>
    </Section>
  )
}

interface CredentialItemProps {
  name: string
  issuer: string
  href?: string
  ctaLabel?: string
  rightLabel?: string
}

function CredentialItem({ name, issuer, href, ctaLabel, rightLabel }: CredentialItemProps) {
  return (
    <div className="card-hover bg-offwhite border border-border-medium rounded-xl px-5 py-4 md:px-6 md:py-5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-center">
      <div>
        <div className="font-display font-semibold text-[17px] md:text-[18px] tracking-[-0.022em] text-charcoal">
          {name}
        </div>
        <div className="text-[13px] text-muted-foreground">{issuer}</div>
      </div>
      {href ? (
        <Btn href={href} target="_blank" rel="noopener" variant="ghost" size="sm">
          {ctaLabel ?? "View"}
        </Btn>
      ) : (
        <span className="text-[13px] text-muted-foreground">{rightLabel}</span>
      )}
    </div>
  )
}
