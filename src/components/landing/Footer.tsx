import { EMAIL, LINKEDIN_URL, RESUME_URL } from "./data"

export function Footer() {
  return (
    <footer className="border-t border-border-soft py-8 bg-surface-cream">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="text-sm text-muted-foreground">
          © 2026 Rafael Schwart · PMP · Miami, FL
        </div>
        <nav className="ml-auto flex flex-wrap gap-[18px]">
          <a href={`mailto:${EMAIL}`} className="text-sm text-charcoal underline decoration-[hsl(var(--foreground)/0.3)] underline-offset-[3px] hover:opacity-70">
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener"
            className="text-sm text-charcoal underline decoration-[hsl(var(--foreground)/0.3)] underline-offset-[3px] hover:opacity-70"
          >
            LinkedIn
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener"
            className="text-sm text-charcoal underline decoration-[hsl(var(--foreground)/0.3)] underline-offset-[3px] hover:opacity-70"
          >
            Résumé
          </a>
        </nav>
      </div>
    </footer>
  )
}
