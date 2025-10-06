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
        <div className="flex-1 p-8 pb-20">
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
          <div className="mb-8 text-center">
            <h1 className="text-xl font-bold text-sidebar-foreground mb-3">Rafael Schwart</h1>
            <Button
              onClick={() => window.open('https://www.linkedin.com/in/rafaelschwart/', '_blank')}
              variant="outline"
              size="sm"
              className="mb-4 bg-[#0077B5] hover:bg-[#005885] text-white border-[#0077B5] hover:border-[#005885]"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              Connect on LinkedIn
            </Button>
            <p className="text-sidebar-foreground/80 text-sm mb-3">PMP | Six Sigma Green Belt</p>
            <p className="text-sidebar-foreground/80 text-sm">Senior Operations Program Manager</p>
          </div>

          {/* Resume Download Buttons */}
          <div className="mb-12 text-center space-y-3">
            <Button
              onClick={() => window.open('https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link', '_blank')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
            <Button
              onClick={generatePortfolioPDF}
              variant="outline"
              className="w-full h-10"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download Full Portfolio PDF
            </Button>
          </div>

          {/* Personal Info */}
          <div className="mb-12 text-sidebar-foreground/70 text-sm space-y-2">
            <p>Born in Caracas, Venezuela, January 1993.</p>
            <p>Based in Miami, Florida.</p>
            <ul className="space-y-1 text-xs">
              <li>• Leveraging technical expertise for cutting-edge solutions</li>
              <li>• Driving operational excellence through continuous improvement</li>
              <li>• Passionate about innovation and process optimization</li>
            </ul>
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
        </div>

        {/* Footer */}
        <div className="p-8 pt-4 mt-auto">
          <p className="text-xs text-sidebar-foreground/40 text-center">
            © 2025 Rafael Schwart. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  )
}