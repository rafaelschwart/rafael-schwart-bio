import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

export const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Technology Leader",
      company: "Global Technology Solutions",
      location: "Remote",
      period: "2022 - Present",
      description: "Leading digital transformation initiatives and managing cross-functional teams to deliver innovative technology solutions.",
      achievements: [
        "Spearheaded digital transformation strategy resulting in 40% efficiency improvement",
        "Built and managed high-performing teams of 20+ professionals",
        "Implemented data-driven decision making processes across organization"
      ],
      technologies: ["Strategic Planning", "Team Leadership", "Digital Transformation", "Process Optimization"]
    },
    {
      title: "Product & Strategy Manager",
      company: "Innovation Hub",
      location: "San Francisco, CA",
      period: "2020 - 2022",
      description: "Drove product strategy and managed end-to-end product development lifecycle for multiple high-impact initiatives.",
      achievements: [
        "Launched 3 successful products generating $2M+ in revenue",
        "Established product management frameworks and best practices",
        "Coordinated with stakeholders across engineering, design, and business teams"
      ],
      technologies: ["Product Management", "Strategic Planning", "Market Analysis", "Agile Methodology"]
    },
    {
      title: "Business Development Manager",
      company: "Tech Ventures",
      location: "New York, NY",
      period: "2018 - 2020",
      description: "Identified and developed strategic partnerships while driving business growth through market expansion initiatives.",
      achievements: [
        "Secured partnerships worth $5M+ in annual contract value",
        "Expanded market presence in 3 new geographical regions",
        "Developed comprehensive go-to-market strategies"
      ],
      technologies: ["Business Development", "Partnership Management", "Market Expansion", "Sales Strategy"]
    }
  ]

  return (
    <section id="experience" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A track record of delivering results across various roles and industries, 
              with a focus on innovation and strategic growth.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <Card 
                key={index} 
                className="p-8 bg-gradient-card border-border/50 hover:border-accent/20 transition-smooth shadow-soft hover:shadow-medium group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">
                      {experience.title}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {experience.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline"
                        className="border-accent/20 hover:border-accent hover:bg-accent/10 transition-smooth"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}