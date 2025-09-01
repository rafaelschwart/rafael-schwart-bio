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
import rafaelHeadshot from "@/assets/rafael-headshot.png"
import motorolaImg from "@/assets/motorola-radio-complete.png"
import magicLeapImg from "@/assets/magic-leap-clean.png"
import strykerImg from "@/assets/stryker-robotics-diagram.png"
import gablesImg from "@/assets/gables-automation-diagram.png"
import robotrayImg from "@/assets/robotray-automation-diagram.png"
import terrasmartImg from "@/assets/terrasmart-solar-diagram.png"
import piecemakersImg from "@/assets/piece-makers-aerospace-diagram.png"
import promptAeroImg from "@/assets/prompt-aero-diagram.png"
import generalMroImg from "@/assets/general-mro-diagram.png"

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
      location: "Miami, FL",
      period: "05/2024 to Present",
      description: "Lead cross-functional alignment across R&D, Manufacturing, Logistics, and Quality to meet launch milestones for mission-critical communications systems.",
      achievements: [
        "Manage CAPEX/OPEX budgets, implement PFMEA and Process Control Plans (PCP), and integrate MES/MQS solutions into global supply chain operations",
        "Apply Six Sigma and 8D methodologies to drive yield improvements and reduce defect rates",
        "Coordinate contract manufacturers (Sanmina Penang, BCM) through pilot builds, ramp-ups, fixture validations, and supply chain escalations"
      ],
      image: "/lovable-uploads/f232f908-0965-4695-810c-1cad9cc3b545.png"
    },
    {
      title: "Senior Manufacturing Engineer - NPI",
      company: "Magic Leap",
      location: "Plantation, FL",
      period: "01/2023 to 05/2024",
      description: "Boosted production efficiency by 15% through MES analytics, Gauge R&R studies, and cleanroom optimization.",
      achievements: [
        "Developed PFMEA libraries and implemented manufacturing stability protocols for AR devices",
        "Conducted design-for-manufacturability reviews and trained production teams to ensure scalability of operations",
        "Established cleanroom protocols and optimized PFMEAs"
      ],
      image: "/lovable-uploads/98d03468-0305-444c-91d4-075dd436b3c7.png"
    },
    {
      title: "Senior Manufacturing Engineer - Robotics",
      company: "Stryker",
      location: "Fort Lauderdale, FL",
      period: "01/2020 to 01/2023",
      description: "Enhanced robotic assembly processes through MAPs redesign and SolidWorks simulation.",
      achievements: [
        "Led Kaizen/6S initiatives, ensuring compliance with PPAP and supplier quality standards (SICR)",
        "Closed NC/CAPA issues and supported critical debug/rebuild operations for high-precision surgical robotics",
        "Improved robotic assembly through MAPs and SolidWorks-based process redesign"
      ],
      image: "/lovable-uploads/f239227c-307a-4400-a163-c38dca55b476.png"
    },
    {
      title: "Mechanical Engineer - Test Engineering & Automation",
      company: "Gables Engineering",
      location: "Coral Gables, FL",
      period: "07/2018 to 08/2019",
      description: "Designed automated fixtures reducing test cycle times by over 50% for Boeing avionics.",
      achievements: [
        "Deployed a PDM system improving ECN/ECO workflows and reducing design cycle times",
        "Implemented automation solutions for aerospace test equipment",
        "Streamlined manufacturing processes through innovative fixture design"
      ],
      image: "/lovable-uploads/fc35aa94-e5ac-465a-a924-11296cdd22d3.png"
    },
    {
      title: "Mechanical Design Engineer",
      company: "Robotray",
      location: "Miami, FL",
      period: "11/2017 to 07/2018",
      description: "Designed automation systems and CNC programs for high-speed bakery and packaging equipment.",
      achievements: [
        "Optimized material usage through FEA analysis",
        "Introduced SolidWorks PDM for design version control",
        "Developed high-performance automation solutions for food processing industry"
      ],
      image: "/lovable-uploads/46c00a06-6ab1-4cc8-8068-57082d3935e0.png"
    },
    {
      title: "Mechanical Engineer - Solar Tracker Systems",
      company: "TerraSmart",
      location: "Naples, FL",
      period: "03/2017 to 10/2017",
      description: "Modeled solar tracking structures, providing casting/welding process improvements for utility-scale deployments.",
      achievements: [
        "Designed and optimized solar tracking systems for large-scale installations",
        "Improved manufacturing processes for renewable energy infrastructure",
        "Contributed to utility-scale solar energy projects"
      ],
      image: "/lovable-uploads/03cd8345-8028-4f19-ac73-690d56c0b4d6.png"
    },
    {
      title: "Mechanical Design Engineer",
      company: "Piece-makers LLC",
      location: "Miami, FL",
      period: "12/2016 to 03/2017",
      description: "Designed aerospace test fixtures, performed R&D prototyping, and supported CAM programming for manufacturing bids.",
      achievements: [
        "Developed precision test fixtures for aerospace applications",
        "Supported R&D initiatives and prototyping processes",
        "Contributed to manufacturing bid processes through CAM programming expertise"
      ],
      image: piecemakersImg
    },
    {
      title: "Mechanical Design Engineer",
      company: "Prompt Aero Services",
      location: "Miami, FL",
      period: "01/2016 to 11/2016",
      description: "Developed FAA-compliant aerospace fixtures and validated designs using FEA and CFD.",
      achievements: [
        "Created FAA-compliant design solutions for aerospace applications",
        "Performed advanced FEA and CFD analysis for design validation",
        "Ensured regulatory compliance in aerospace manufacturing processes"
      ],
      image: promptAeroImg
    },
    {
      title: "Mechanical Design Engineer",
      company: "General MRO Aerospace Inc.",
      location: "Miami, FL",
      period: "05/2014 to 12/2015",
      description: "Designed and built large-scale structural load fixtures for aerospace clients.",
      achievements: [
        "Developed structural load testing fixtures for aircraft components",
        "Improved NDT and plating processes through engineering-led optimizations",
        "Contributed to aerospace maintenance, repair, and overhaul operations"
      ],
      image: generalMroImg
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
      issuer: "Project Management Institute (PMI)",
      status: "Certified"
    },
    {
      name: "Six Sigma Green Belt",
      issuer: "ASQ",
      status: "Certified"
    },
    {
      name: "Agile Foundations",
      issuer: "Professional Development",
      status: "Certified"
    },
    {
      name: "B.S. Mechanical Engineering",
      issuer: "University of Miami",
      status: "Graduated 2014"
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
                  className="w-full h-72 object-contain rounded bg-black"
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
            <div className="flex items-center justify-between">
              <Badge variant={cert.status === 'Certified' ? 'default' : 'secondary'}>
                {cert.status}
              </Badge>
              {cert.name === "Project Management Professional (PMP)" && (
                <div className="flex gap-2">
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    <a 
                      href="https://drive.google.com/file/d/1JKohOdgfwKokcy-hL8WHf0pze3dp6vX-/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      View Diploma
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )}
              {cert.name === "B.S. Mechanical Engineering" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <a 
                    href="https://drive.google.com/file/d/1NAQa9Kw5Zhb1YZoNg6kXXUB-_FbAMNKl/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View Diploma
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
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
              onClick={() => window.open('mailto:rrgschwart@hotmail.com', '_blank')}
            >
              <Mail className="h-4 w-4 mr-3" />
              rrgschwart@hotmail.com
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
    <>
      {/* Desktop Version */}
      <main className="hidden md:block ml-80 min-h-screen bg-background">
        <div className="p-12 flex justify-center">
          <div className="max-w-5xl w-full">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Mobile Version - Single Scrollable Page */}
      <main className="md:hidden min-h-screen bg-background">
        <div className="p-6 space-y-8">
          {/* Mobile Header */}
          <div className="text-center py-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border mx-auto mb-4">
              <img 
                src="/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png"
                alt="Rafael Schwart Professional Headshot"
                className="w-full h-full object-cover grayscale"
                onError={(e) => {
                  e.currentTarget.src = rafaelHeadshot;
                  e.currentTarget.classList.remove('grayscale');
                }}
              />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-1">Rafael Schwart</h1>
            <p className="text-muted-foreground text-sm mb-1">PMP-Certified</p>
            <p className="text-muted-foreground text-sm">Senior Operations Program Manager</p>
            <p className="text-muted-foreground text-xs mt-2">Born in Caracas, Venezuela • Based in Miami, FL</p>
          </div>

          {/* Mobile About Section */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Technical Project Manager & Process Engineer with 10+ years of experience across Consumer Electronics, AR, Medical Devices, Robotics, Aerospace, and Solar Energy industries.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Expert in CAD, CAE, FEA, FMEA, GD&T, and project management tools. Passionate about leveraging technical expertise to develop cutting-edge technologies.
            </p>
          </Card>

          {/* Mobile Experience Section */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {experiences.map((experience, index) => (
                <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{experience.title}</h3>
                    <p className="text-muted-foreground text-xs">{experience.company} • {experience.location}</p>
                    <p className="text-muted-foreground text-xs mb-2">{experience.period}</p>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Mobile Skills Section */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Core Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {["CAD/CAE/FEA", "Project Management", "Six Sigma", "Lean Manufacturing", "FMEA/GD&T", "ERP/PDM/PLM"].map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs justify-center">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Mobile Certifications Section */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {cert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Mobile Contact Section */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Contact</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-10 text-sm"
                onClick={() => window.open('mailto:rrgschwart@hotmail.com', '_blank')}
              >
                <Mail className="h-4 w-4 mr-2" />
                rrgschwart@hotmail.com
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-10 text-sm"
                onClick={() => window.open('https://www.linkedin.com/in/rafaelschwart/', '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn Profile
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </Card>

          {/* Mobile Education */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Education</h2>
            <div>
              <p className="text-sm font-medium text-foreground">B.S. Mechanical Engineering</p>
              <p className="text-xs text-muted-foreground">University of Miami • 2014</p>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
