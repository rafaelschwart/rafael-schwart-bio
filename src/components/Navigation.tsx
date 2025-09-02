import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-medium">
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onSectionChange(item.id)}
              className={`
                rounded-full px-4 py-2 text-sm font-medium transition-smooth
                ${activeSection === item.id 
                  ? 'bg-accent text-accent-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }
              `}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}