import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Btn } from "./atoms"
import { navLinks, RESUME_URL } from "./data"
import { cn } from "@/lib/utils"

/**
 * Sticky top nav. Anchor links update both URL (so deep-link routes stay
 * crawlable) and scroll position. Mobile collapses into a sheet drawer.
 */
export function TopNav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
    navigate(id === "about" ? "/" : `/${id}`, { replace: false })
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md backdrop-saturate-150 bg-cream/85 border-b border-border-soft">
      <div className="mx-auto flex max-w-[1180px] items-center gap-8 px-6 md:px-8 py-3.5">
        <a
          href="#home"
          onClick={(e) => handleAnchor(e, "home")}
          className="font-display text-[18px] font-semibold tracking-[-0.02em] text-charcoal no-underline"
        >
          Rafael Schwart
        </a>

        <nav className="hidden lg:flex items-center gap-[22px] ml-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.id)}
              className="text-sm text-charcoal/85 hover:text-charcoal no-underline transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Btn
            href={RESUME_URL}
            target="_blank"
            rel="noopener"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Résumé
          </Btn>
          <Btn
            href="#contact"
            onClick={(e) => handleAnchor(e, "contact")}
            variant="dark"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Get in touch
          </Btn>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md border border-border-soft text-charcoal hover:bg-cream"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-border-soft overflow-hidden transition-[max-height] duration-300 ease-out",
          open ? "max-h-[480px]" : "max-h-0",
        )}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.id)}
              className="py-2.5 text-base text-charcoal no-underline"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <Btn href={RESUME_URL} target="_blank" rel="noopener" variant="ghost" size="sm">
              Résumé
            </Btn>
            <Btn
              href="#contact"
              onClick={(e) => handleAnchor(e, "contact")}
              variant="dark"
              size="sm"
            >
              Get in touch
            </Btn>
          </div>
        </nav>
      </div>
    </header>
  )
}
