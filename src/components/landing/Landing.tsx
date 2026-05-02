import { useEffect } from "react"
import { TopNav } from "./TopNav"
import { Hero } from "./Hero"
import { Stats } from "./Stats"
import { About } from "./About"
import { Education } from "./Education"
import { Experience } from "./Experience"
import { Brands } from "./Brands"
import { Projects } from "./Projects"
import { Skills } from "./Skills"
import { Credentials } from "./Credentials"
import { Recommendations } from "./Recommendations"
import { Verification } from "./Verification"
import { Contact } from "./Contact"
import { Footer } from "./Footer"

interface LandingProps {
  /**
   * Active section slug parsed from the URL path (`/about`, `/experience`, ...).
   * Used to scroll to the matching anchor on mount and on URL changes — keeps
   * the per-section deep links from sitemap.xml + llms.txt working alongside
   * the new single-page scroll layout.
   */
  activeSection: string
}

export function Landing({ activeSection }: LandingProps) {
  useEffect(() => {
    if (activeSection === "about" && window.location.pathname === "/") {
      // Default route — start at the top, don't auto-scroll.
      return
    }
    const target = document.getElementById(activeSection)
    if (!target) return
    // Defer until after layout so anchors land below the sticky nav.
    const id = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 80)
    return () => window.clearTimeout(id)
  }, [activeSection])

  return (
    <div className="bg-surface-cream text-charcoal">
      <TopNav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Education />
        <Experience />
        <Brands />
        <Projects />
        <Skills />
        <Credentials />
        <Recommendations />
        <Verification />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
