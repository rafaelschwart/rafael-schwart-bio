import { Button } from "@/components/ui/button"
import { User, Briefcase, Code, Trophy, Mail, FileText, FolderOpen } from "lucide-react"
import rafaelHeadshot from "@/assets/rafael-headshot.png"

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
  { id: 'contact', label: 'Contact', icon: Mail },
]

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-80 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-8">
        {/* Profile Photo */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-sidebar-border">
            <img 
              src="/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png"
              alt="Rafael Schwart Professional Headshot"
              className="w-full h-full object-cover grayscale"
              onError={(e) => {
                // Fallback to generated headshot if upload fails
                e.currentTarget.src = rafaelHeadshot;
                e.currentTarget.classList.remove('grayscale');
              }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">Rafael Schwart</h1>
          <p className="text-sidebar-foreground/80 text-sm mb-1">PMP</p>
          <p className="text-sidebar-foreground/80 text-sm mb-1">Senior Operations Program Manager</p>
          <p className="text-sidebar-foreground/60 text-xs">Technical Project Manager & Process Engineer</p>
        </div>

        {/* Personal Info */}
        <div className="mb-12 text-sidebar-foreground/70 text-sm space-y-2">
          <p>Born in Caracas, Venezuela, January 1993.</p>
          <p>Based in Miami, Florida.</p>
          <p>Passionate about leveraging technical expertise to develop</p>
          <p>cutting-edge technologies and continuously optimize processes.</p>
          <p>Driving innovation and operational excellence through</p>
          <p>continuous improvement methodologies.</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full justify-start text-left h-12 px-4 rounded-sm font-normal
                ${activeSection === item.id 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                }
              `}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-xs text-sidebar-foreground/40">
            © 2025 Rafael Schwart. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  )
}