import { Button } from "@/components/ui/button"
import { User, Briefcase, Code, Trophy, Mail, FileText, FolderOpen, Users, Shield, Download, Linkedin, FileDown } from "lucide-react"
import rafaelHeadshot from "@/assets/rafael-headshot.png"
import { generatePortfolioPDF } from "@/utils/pdfGenerator"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Trophy },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'recommendations', label: 'Recommendations', icon: Users },
  { id: 'employment-verification', label: 'Employment Verification', icon: Shield },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-80 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-8 pt-10 pb-20">
          {/* Wordmark — microhub-style monoline brand lockup */}
          <div className="mb-10">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-medium tracking-tight text-sidebar-foreground">Rafael Schwart</span>
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
              Operations · NPI · Process
            </p>
          </div>

          {/* Profile Photo — full color, soft rounded rectangle (microhub uses big editorial photography) */}
          <div className="mb-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-sidebar-border">
              <img
                src="/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png"
                alt="Rafael Schwart Professional Headshot"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = rafaelHeadshot;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>

          {/* Hero copy — light-weight headline with the microhub period */}
          <div className="mb-8">
            <h1 className="display-headline text-3xl text-sidebar-foreground leading-[1.05] mb-3">
              Senior Operations <br />Program Manager.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PMP-certified Process Engineer building products in Miami, FL —
              from AR optics to mission-critical communications.
            </p>
          </div>

          {/* Primary CTAs — pill-shaped, monochrome */}
          <div className="mb-10 space-y-2.5">
            <Button
              onClick={() => window.open('https://www.linkedin.com/in/rafaelschwart/', '_blank')}
              className="w-full justify-center h-11"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              Connect on LinkedIn
            </Button>
            <Button
              onClick={() => window.open('https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link', '_blank')}
              variant="outline"
              className="w-full justify-center h-11"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
            <Button
              onClick={generatePortfolioPDF}
              variant="ghost"
              className="w-full justify-center h-11 text-muted-foreground hover:text-foreground"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download Portfolio
            </Button>
          </div>

          {/* Section nav — typographic, hairline-rule indicator instead of filled pill */}
          <nav className="space-y-px border-t border-sidebar-border pt-6">
            <p className="eyebrow mb-3 px-3">Sections</p>
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`group relative w-full flex items-center justify-between text-left h-11 px-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-foreground text-background'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
                    <item.icon className="h-3.5 w-3.5 opacity-60" />
                    {item.label}
                  </span>
                  <span className={`text-[10px] font-mono tracking-wider ${isActive ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'}`}>
                    /{item.id === 'about' ? '' : item.id}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-sidebar-border mt-auto">
          <p className="text-[11px] text-muted-foreground tracking-tight">
            © 2025 Rafael Schwart
          </p>
          <p className="text-[10px] text-muted-foreground/70 tracking-tight mt-1">
            Miami, FL · Born Caracas, VE · 1993
          </p>
        </div>
      </div>
    </aside>
  )
}