import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Building, Mail, Linkedin, Send, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import manufacturingImg from "@/assets/manufacturing-environment.jpg"
import engineeringImg from "@/assets/engineering-workspace.jpg"
import projectMgmtImg from "@/assets/project-management.jpg"

interface MainContentProps {
  activeSection: string
}

export const MainContent = ({ activeSection }: MainContentProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    })
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const experiences = [
    {
      title: "Senior Operations Program Manager - NPI",
      company: "Motorola Solutions",
      location: "Remote",
      period: "05/2024 to Present",
      description: "Delivered exceptional alignment across R&D, Manufacturing, Logistics, and Quality to meet launch milestones.",
      achievements: [
        "Managed CAPEX/OPEX budgets, led PFMEA and control plans, and executed MES/MOS integrations",
        "Applied Six Sigma and 8D methods to drive yield improvement and reduce defect rates"
      ],
      image: manufacturingImg
    },
    {
      title: "Senior Manufacturing Engineer - NPI",
      company: "Magic Leap",
      location: "Remote",
      period: "01/2023 to 05/2024",
      description: "Boosted production efficiency by 15% using MES analytics and Gauss R&R studies.",
      achievements: [
        "Established cleanroom protocols and improved manufacturing stability via optimized PFMEAs",
        "Trained production teams, supporting knowledge transfer and scalable operations",
        "Supported NCC/CAPA closures and managed critical debug/rebuild tasks"
      ],
      image: engineeringImg
    },
    {
      title: "Senior Manufacturing Engineer - Robotics",
      company: "Stryker",
      location: "Remote",
      period: "01/2020 to 01/2023",
      description: "Improved robotic assembly through MAPs and SolidWorks-based process redesign.",
      achievements: [
        "Led Kaizen/5S initiatives and supplier quality compliance (PPAP, SICR)",
        "Supported NCC/CAPA closures and managed critical debug/rebuild tasks"
      ],
      image: projectMgmtImg
    }
  ]

  const skills = {
    "Technical Skills": [
      "CAD, CAE, FEA, FMEA, GD&T",
      "ERP, PDM, PLM",
      "Lean Manufacturing",
      "Six Sigma",
      "SolidWorks",
      "MES Analytics"
    ],
    "Management": [
      "Project Management",
      "Process Engineering", 
      "Cross-functional Teams",
      "NPI Operations",
      "CAPEX/OPEX Management",
      "Quality Control"
    ],
    "Industries": [
      "Consumer Electronics",
      "Augmented Reality",
      "Medical Devices",
      "Robotics",
      "Aerospace",
      "Solar Energy"
    ]
  }

  const certifications = [
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      status: "Certified"
    },
    {
      name: "Six Sigma Black Belt",
      issuer: "ASQ",
      status: "In Progress"
    },
    {
      name: "Lean Manufacturing Certification",
      issuer: "SME",
      status: "Certified"
    }
  ]

  const renderAbout = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-6">Professional Summary</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Dynamic and results-driven Technical Project Manager and Process Engineer with over 10 years 
          of experience across Consumer Electronics, Augmented Reality, Medical Devices, Robotics, 
          Aerospace, and Solar Energy industries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Expertise</h3>
          <p className="text-muted-foreground leading-relaxed">
            Expert in CAD, CAE, FEA, FMEA, GD&T, and project management tools (ERP, PDM, PLM). 
            Adept at Lean Manufacturing, Six Sigma methodologies, and driving cross-functional 
            teams to deliver high-performance products under tight deadlines.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            Passionate about leveraging technical expertise to develop cutting-edge technologies 
            and continuously optimize processes. Currently serving as Senior Operations Program 
            Manager at Motorola Solutions, leading NPI operations across multiple product lines.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Education</h3>
        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold text-foreground">Bachelor of Science (B.S.) in Mechanical Engineering</h4>
          <p className="text-muted-foreground">University of Miami | 2010 - 2014</p>
          <p className="text-muted-foreground mt-2">Comprehensive education in Mechanical Engineering, covering CAD, FEA, and manufacturing processes.</p>
        </Card>
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Experience</h2>
      
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <Card key={index} className="p-8 bg-card border-border">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-foreground mb-2">{experience.title}</h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{experience.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{experience.description}</p>

                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-1">
                <img 
                  src={experience.image} 
                  alt={`${experience.title} environment`}
                  className="w-full h-48 object-cover rounded border border-border"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSkills = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Skills</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, skillList], index) => (
          <Card key={index} className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
            <div className="space-y-2">
              {skillList.map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex} 
                  variant="secondary" 
                  className="block w-fit text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCertifications = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Certifications</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">{cert.name}</h3>
            <p className="text-muted-foreground mb-2">{cert.issuer}</p>
            <Badge variant={cert.status === 'Certified' ? 'default' : 'secondary'}>
              {cert.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Contact</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-6">
              I'm always interested in discussing new opportunities, innovative projects, 
              and strategic partnerships.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => window.open('mailto:rafael@example.com', '_blank')}
            >
              <Mail className="h-4 w-4 mr-3" />
              rafael@example.com
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => window.open('https://www.linkedin.com/in/rafaelschwart/', '_blank')}
            >
              <Linkedin className="h-4 w-4 mr-3" />
              LinkedIn Profile
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 resize-none"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return renderAbout()
      case 'experience':
        return renderExperience()
      case 'skills':
        return renderSkills()
      case 'certifications':
        return renderCertifications()
      case 'contact':
        return renderContact()
      default:
        return renderAbout()
    }
  }

  return (
    <main className="ml-80 min-h-screen bg-background">
      <div className="p-12">
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </main>
  )
}