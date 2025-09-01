import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import heroBackground from "@/assets/hero-background.jpg"

interface HeroSectionProps {
  onScrollToNext: () => void
}

export const HeroSection = ({ onScrollToNext }: HeroSectionProps) => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in slide-in-from-bottom-8 duration-1000">
            Rafael Schwart
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
            Professional & Technology Leader
          </p>
          
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-400">
            Building innovative solutions and driving digital transformation through strategic leadership and technical expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button 
              size="lg" 
              className="bg-gradient-accent text-accent-foreground hover:scale-105 transition-bounce shadow-medium px-8 py-3 rounded-full"
              onClick={onScrollToNext}
            >
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:border-accent hover:bg-accent/10 transition-smooth">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:border-accent hover:bg-accent/10 transition-smooth">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:border-accent hover:bg-accent/10 transition-smooth">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onScrollToNext}
          className="rounded-full hover:bg-accent/10 transition-smooth"
        >
          <ArrowDown className="h-6 w-6 text-accent" />
        </Button>
      </div>
    </section>
  )
}