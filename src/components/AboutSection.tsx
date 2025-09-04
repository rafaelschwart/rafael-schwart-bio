import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Lightbulb, TrendingUp, ExternalLink } from "lucide-react"
import pmpCertificate from "@/assets/pmp-certificate.png"

export const AboutSection = () => {
  const values = [
    {
      icon: Users,
      title: "Leadership",
      description: "Building and inspiring high-performing teams to achieve exceptional results."
    },
    {
      icon: Target,
      title: "Strategic Vision",
      description: "Developing comprehensive strategies that align technology with business objectives."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Fostering creative solutions and embracing emerging technologies."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Driving sustainable growth through data-driven decisions and optimization."
    }
  ]

  const skills = [
    "Strategic Planning", "Team Leadership", "Digital Transformation", 
    "Product Management", "Business Development", "Technology Strategy",
    "Project Management", "Data Analytics", "Process Optimization"
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A seasoned professional with extensive experience in technology leadership, 
              strategic planning, and driving organizational transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">My Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in combining strategic thinking with hands-on execution to deliver 
                measurable results. My experience spans across various industries, allowing me 
                to bring diverse perspectives to complex challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about leveraging technology to solve real-world problems and 
                creating environments where innovation can thrive. My focus is on building 
                sustainable solutions that drive long-term value.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-3 py-1 bg-card hover:bg-accent hover:text-accent-foreground transition-smooth cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-8">Professional Certifications</h3>
              <div className="flex justify-center">
                <div className="bg-gradient-card border border-border/50 rounded-lg p-6 shadow-soft hover:shadow-medium transition-smooth">
                  <img 
                    src={pmpCertificate} 
                    alt="PMP Project Management Professional Certification - Rafael Schwart" 
                    className="w-80 h-auto mx-auto mb-4 rounded-lg shadow-medium"
                  />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Project Management Professional (PMP)</h4>
                  <p className="text-sm text-muted-foreground mb-3">Project Management Institute (PMI)</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    <a 
                      href="https://www.credly.com/badges/f6c6c143-768b-4b63-836a-ca062b99639a" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      View Certification
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Certification Badges */}
              <div className="mt-12">
                <h4 className="text-xl font-semibold text-foreground mb-6">Professional Badges</h4>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <div className="certification-badge animate-fade-in">
                    <img 
                      src="/lovable-uploads/0d22b2bb-8de4-4f9a-a091-6e1620ca6d8f.png" 
                      alt="PMP Professional Certification Badge" 
                      className="w-28 h-28 md:w-32 md:h-32 object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-smooth hover:scale-105 hover-scale"
                      onError={(e) => {
                        console.error('Failed to load PMP badge image');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>  
                  <div className="certification-badge animate-fade-in">
                    <img 
                      src="/lovable-uploads/4fda119c-14c1-4759-96e9-1c9ba554ea5b.png" 
                      alt="ASQ Six Sigma Green Belt Certification Badge" 
                      className="w-28 h-28 md:w-32 md:h-32 object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-smooth hover:scale-105 hover-scale"
                      onError={(e) => {
                        console.error('Failed to load Six Sigma badge image');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 bg-gradient-card border-border/50 hover:border-accent/20 transition-smooth group cursor-default shadow-soft hover:shadow-medium"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}