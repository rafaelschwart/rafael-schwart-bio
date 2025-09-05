import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Building, Mail, Linkedin, Send, ExternalLink, Phone } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { RecommendationsSection } from "./RecommendationsSection"
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

    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoUrl = `mailto:rrgschwart@hotmail.com?subject=${subject}&body=${body}`

    // Open using a temporary anchor (more reliable on mobile and inside iframes)
    const a = document.createElement('a')
    a.href = mailtoUrl
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Fallback in case navigation was blocked
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        window.location.href = mailtoUrl
      }
    }, 150)

    toast({
      title: "Opening email client...",
      description: "If nothing happens, email me at rrgschwart@hotmail.com.",
    })
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const companyLinks: Record<string, string> = {
    "Motorola Solutions": "https://www.motorolasolutions.com",
    "Magic Leap": "https://www.magicleap.com",
    "Stryker": "https://www.stryker.com",  
    "Gables Engineering": "https://www.gableseng.com",
    "Robotray": "https://robotray.com",
    "TerraSmart": "https://www.terrasmart.com",
    "Piece-makers LLC": "https://piece-makers.com/",
    "Prompt Aero Services": "https://www.promptaero.com/",
    "General MRO Aerospace Inc.": "https://www.generalmroaerospace.com/"
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
      image: "/lovable-uploads/d9821a84-b324-402d-bba8-f821576ae930.png"
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
      image: "/lovable-uploads/1e4e8c1f-28e6-489b-91f4-aaffeb275a19.png"
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
      image: "/lovable-uploads/3f6e68c4-eef2-44dd-8f45-3870d690f6bc.png"
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
      image: "/lovable-uploads/ae4ea81f-5936-4f0a-ac7f-a5d00cea159e.png"
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
      image: "/lovable-uploads/11111415-3153-43c6-85cd-be1c092e7990.png"
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
      image: "/lovable-uploads/79ee2f7c-721b-44a7-b6a5-5e898dd42f64.png"
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
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Professional Summary</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Dynamic and results-driven Technical Project Manager and Process Engineer with over 10 years 
          of experience across Consumer Electronics, Augmented Reality, Medical Devices, Robotics, 
          Aerospace, and Solar Energy industries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="fade-in-up stagger-animation" style={{"--stagger-delay": "1"} as React.CSSProperties}>
          <h3 className="text-xl font-semibold text-foreground mb-4">Expertise</h3>
          <p className="text-muted-foreground leading-relaxed">
            Expert in CAD, CAE, FEA, FMEA, GD&T, and project management tools (ERP, PDM, PLM). 
            Adept at Lean Manufacturing, Six Sigma methodologies, and driving cross-functional 
            teams to deliver high-performance products under tight deadlines.
          </p>
        </div>
        
        <div className="fade-in-up stagger-animation" style={{"--stagger-delay": "2"} as React.CSSProperties}>
          <h3 className="text-xl font-semibold text-foreground mb-4">Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            Passionate about leveraging technical expertise to develop cutting-edge technologies 
            and continuously optimize processes. Currently serving as Senior Operations Program 
            Manager at Motorola Solutions, leading NPI operations across multiple product lines.
          </p>
        </div>
      </div>

      <div className="fade-in-up stagger-animation" style={{"--stagger-delay": "3"} as React.CSSProperties}>
        <h3 className="text-xl font-semibold text-foreground mb-4">Education</h3>
        <Card className="p-6 bg-card border-border engineering-hover">
          <h4 className="text-lg font-semibold text-foreground">Bachelor of Science (B.S.) in Mechanical Engineering</h4>
          <p className="text-muted-foreground">University of Miami | 2010 - 2014</p>
          <p className="text-muted-foreground mt-2">Comprehensive education in Mechanical Engineering, covering CAD, FEA, and manufacturing processes.</p>
        </Card>
      </div>

      {/* Professional Image at Bottom */}
      <div className="flex justify-center fade-in-up stagger-animation" style={{"--stagger-delay": "4"} as React.CSSProperties}>
        <div className="relative engineering-hover">
          <img 
            src="/lovable-uploads/49d50d9a-eb05-4f07-a5f6-cb056f47877b.png"
            alt="Rafael Schwart in professional robotics environment"
            className="w-full max-w-2xl rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Experience</h2>
      </div>
      
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <Card key={index} className="p-8 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": index} as React.CSSProperties}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-foreground mb-2">{experience.title}</h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    {companyLinks[experience.company] ? (
                      <a 
                        href={companyLinks[experience.company]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline transition-colors duration-200"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      <span>{experience.company}</span>
                    )}
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
                    <li key={achievementIndex} className="flex items-start pulse-dot">
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
                  className="w-full h-72 object-contain rounded bg-black transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSkills = () => (
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Skills</h2>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, skillList], index) => (
          <Card key={index} className="p-6 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": index} as React.CSSProperties}>
            <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
            <div className="space-y-2">
              {skillList.map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex} 
                  variant="secondary" 
                  className="block w-fit text-xs tech-badge-hover"
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
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Certifications</h2>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="p-6 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": index} as React.CSSProperties}>
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
                    className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
                    className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
              {cert.name === "Six Sigma Green Belt" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  <a 
                    href="https://drive.google.com/file/d/1fIUGdS8duNPwlG2wxCVrj9yv7frJTR7j/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View Diploma
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
              {cert.name === "B.S. Mechanical Engineering" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
      
      {/* Certification Badges */}
      <div className="mt-12 text-center fade-in-up">
        <h3 className="text-2xl font-semibold text-foreground mb-8 scan-line">Professional Badges</h3>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          <div className="certification-badge animate-fade-in hover-scale">
            <img 
              src="/lovable-uploads/0d22b2bb-8de4-4f9a-a091-6e1620ca6d8f.png" 
              alt="PMP Professional Certification Badge" 
              className="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-smooth engineering-hover"
              onError={(e) => {
                console.error('Failed to load PMP badge image');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>  
          <div className="certification-badge animate-fade-in hover-scale">
            <img 
              src="/lovable-uploads/4977df65-2cac-489d-8b37-6a178df59ff0.png" 
              alt="ASQ Six Sigma Green Belt Certification Badge"
              className="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-smooth engineering-hover"
              onError={(e) => {
                console.error('Failed to load Six Sigma badge image');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Side Projects</h2>
      </div>
      
      <div className="grid gap-8">
        {/* Earth Robotics */}
        <Card className="p-6 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": "0"} as React.CSSProperties}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">Mechanical Engineer</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-sm tech-badge-hover">Earth Robotics</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  <a 
                    href="https://www.earthrobotics.co/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
            <img 
              src="/lovable-uploads/beac616e-8f24-4d61-81af-8d6fc99b2216.png" 
              alt="Earth Robotics Logo" 
              className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Contributing mechanical engineering expertise to Earth Robotics, focusing on sustainable robotics solutions for environmental applications.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Key Responsibilities:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li className="pulse-dot">Design and develop robotic systems for environmental monitoring and sustainability</li>
                <li className="pulse-dot">Perform structural analysis and optimization using CAD/FEA tools</li>
                <li className="pulse-dot">Collaborate on mechatronic integration and sensor deployment</li>
                <li className="pulse-dot">Support field testing and validation of robotic platforms</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tiento Labs */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">Chief Technology Officer</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-sm">Tiento Labs</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <a 
                    href="https://www.tientolabs.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
            <img 
              src="/lovable-uploads/63a9c880-87f2-4ff6-9084-aae2560b0479.png" 
              alt="Tiento Labs Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Leading technical development at Tiento Labs, a revolutionary blockchain platform that tokenizes football player formation rights and provides verified scouting data.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Key Responsibilities:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Architect blockchain infrastructure for tokenizing player formation rights</li>
                <li>Develop secure platforms for fan investment in professional football players</li>
                <li>Build verification systems for player stats and scouting data using blockchain technology</li>
                <li>Lead technical team in creating scalable solutions connecting fans with football talent</li>
                <li>Implement smart contracts and decentralized systems for sports investment</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recovrz */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">Co-Founder</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-sm">Recovrz</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <a 
                    href="https://www.recovrz.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
            <img 
              src="/lovable-uploads/3c24dbd3-0cb3-4db6-8d58-85285bb21a89.png" 
              alt="Recovrz Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Co-founded Recovrz, an innovative athletic recovery company focused on providing next-generation solutions to help athletes recover better and reach new performance heights.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Company Focus:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Develop and market advanced recovery products for athletes</li>
                <li>Feature products including nose strips for improved breathing during recovery</li>
                <li>Create comprehensive recovery bundles for optimal performance enhancement</li>
                <li>Build brand focused on consistency and performance optimization</li>
                <li>Target both professional and amateur athletes seeking recovery solutions</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderEmploymentVerification = () => (
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Employment Verification</h2>
      </div>
      
      <div className="grid gap-8">
        {/* Gables Engineering Verification */}
        <Card className="p-8 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": "0"} as React.CSSProperties}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Gables Engineering, Inc.</h3>
              <p className="text-muted-foreground">Official Employment Verification Letter</p>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src="/lovable-uploads/a8c3d462-eec5-4f1c-a381-8b52a43769a7.png" 
                alt="Gables Engineering Inc." 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Position</h4>
                <p className="text-muted-foreground">Mechanical Engineer - Automation & Test Engineering</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Employment Period</h4>
                <p className="text-muted-foreground">July 24, 2017 - August 14, 2019</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Responsibilities Verified</h4>
              <ul className="space-y-2">
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Automated Fixture Design: Designing custom mechanical features for test equipment with over 50% efficiency improvement</span>
                </li>
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Engineering Data Management: Implementing PDM systems and streamlining ECN/ECO processes</span>
                </li>
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Technical Documentation: Creating quality assurance manuals and operator guides for aerospace systems</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <a 
                  href="https://drive.google.com/file/d/1xa-fAODnaGyCMsBTxdrShp0ZvehnaXo1/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Official Letter
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Magic Leap Verification */}
        <Card className="p-8 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": "1"} as React.CSSProperties}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Magic Leap, Inc.</h3>
              <p className="text-muted-foreground">Official Employment Verification Letter</p>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src="/lovable-uploads/327066c9-5187-4698-9787-05030841c585.png" 
                alt="Magic Leap Inc." 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Position</h4>
                <p className="text-muted-foreground">Senior Manufacturing Engineer - NPI</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Employment Period</h4>
                <p className="text-muted-foreground">January 3, 2023 - May 24, 2024</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Responsibilities Verified</h4>
              <ul className="space-y-2">
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Advanced Manufacturing for AR Devices: Driving manufacturing initiatives for next-generation Augmented Reality optical devices</span>
                </li>
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Manufacturing Execution Systems (MES): Using MES platforms for real-time production data analysis and 15% efficiency improvement</span>
                </li>
                <li className="flex items-start pulse-dot">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Cross-functional Collaboration: Partnering with Design Engineering, Manufacturing, Quality, and Operations teams</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <a 
                  href="https://drive.google.com/file/d/1oY8w8qy4pr_gRZ5gEVyl1lWRRQMqjWaK/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Official Letter
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Stryker Verification */}
        <Card className="p-8 bg-card border-border engineering-hover fade-in-up stagger-animation" style={{"--stagger-delay": "2"} as React.CSSProperties}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Stryker Corporation</h3>
              <p className="text-muted-foreground">Official Employment Verification Letter</p>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src="/lovable-uploads/0dd39ce5-75d5-48cb-928b-888475470798.png" 
                alt="Stryker Corporation" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Positions Held</h4>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Senior Engineer - Sustaining</p>
                  <p className="text-muted-foreground text-sm">Senior Manufacturing Engineer - Robotics</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Employment Periods</h4>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">02/17/2020 - 01/01/2020</p>
                  <p className="text-muted-foreground text-sm">05/05/2022 - 12/28/2022</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Verified Skills & Certifications</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">CAD - PTC Creo</span>
                  </li>
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">Lean Manufacturing and Six Sigma</span>
                  </li>
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">Project Management, Work Breakdown Structure (WBS), and Risk Mitigation</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">PFMEA (Process Failure Modes & Effects Analysis)</span>
                  </li>
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">PCPs (Process Control Plans)</span>
                  </li>
                  <li className="flex items-start pulse-dot">
                    <div className="w-1 h-1 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">Statistical Analysis, RCA, Pareto, and 8D</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <a 
                  href="https://drive.google.com/file/d/1G2VtB20hJUGoyxSDWz53OtADO1Pk8x2S/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Official Letter
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center fade-in-up">
        <p className="text-muted-foreground text-sm">
          All employment verifications are official documents issued by respective HR departments and can be verified directly with the companies.
        </p>
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
      case 'projects':
        return renderProjects()
      case 'recommendations':
        return <RecommendationsSection />
      case 'employment-verification':
        return renderEmploymentVerification()
      case 'contact':
        return renderContact()
      default:
        return renderAbout()
    }
  }

  return (
    <>
      {/* Desktop Version */}
      <main className="hidden md:block ml-80 min-h-screen bg-background schematic-background relative">
        <div className="p-12 flex justify-center">
          <div className="max-w-5xl w-full">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Mobile Version - Single Scrollable Page */}
      <main className="md:hidden min-h-screen bg-background schematic-background relative">
        <div className="max-h-screen overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Mobile Header */}
            <div className="text-center py-4">
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
              <p className="text-muted-foreground text-sm mb-1">Green Belt Certified</p>
              <p className="text-muted-foreground text-sm">Senior Operations Program Manager</p>
              <p className="text-muted-foreground text-xs mt-2">Born in Caracas, Venezuela • Based in Miami, FL</p>
            </div>

            {/* About Section */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Technical Project Manager & Process Engineer with 10+ years of experience across Consumer Electronics, AR, Medical Devices, Robotics, Aerospace, and Solar Energy industries.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Expert in CAD, CAE, FEA, FMEA, GD&T, and project management tools. Passionate about leveraging technical expertise to develop cutting-edge technologies.
              </p>
            </Card>

            {/* Professional Experience Section */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">Professional Experience</h2>
              <div className="space-y-4">
                {experiences.map((experience, index) => (
                  <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{experience.title}</h3>
                      <p className="text-muted-foreground text-xs">
                        {companyLinks[experience.company] ? (
                          <a 
                            href={companyLinks[experience.company]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {experience.company}
                          </a>
                        ) : (
                          experience.company
                        )} • {experience.location}
                      </p>
                      <p className="text-muted-foreground text-xs mb-2">{experience.period}</p>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Core Skills Section */}
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

            {/* Certifications Section */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    {cert.name === "Project Management Professional (PMP)" ? (
                      <Button variant="outline" size="sm" className="text-xs">
                        <a 
                          href="https://drive.google.com/file/d/1JKohOdgfwKokcy-hL8WHf0pze3dp6vX-/view?usp=drive_link" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          Look Diploma
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : cert.name === "Six Sigma Green Belt" ? (
                      <Button variant="outline" size="sm" className="text-xs">
                        <a 
                          href="https://drive.google.com/file/d/1fIUGdS8duNPwlG2wxCVrj9yv7frJTR7j/view?usp=sharing" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          View Diploma
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : cert.name === "B.S. Mechanical Engineering" ? (
                      <Button variant="outline" size="sm" className="text-xs">
                        <a 
                          href="https://drive.google.com/file/d/1NAQa9Kw5Zhb1YZoNg6kXXUB-_FbAMNKl/view?usp=drive_link" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          Look Diploma
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="default" className="text-xs">
                        {cert.status}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations Section for Mobile */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">Recommendations</h2>
              <p className="text-muted-foreground text-xs mb-4">
                Professional references from colleagues and leaders I've worked with.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Jose Gibaja", role: "Principal Engineer", company: "Stryker", url: "https://drive.google.com/file/d/1gsqFCu4JNY6-6nbR1ym2mCNjVzYt-fWF/view?usp=drive_link" },
                  { name: "Joe Zeichmann", role: "Senior Staff Engineer", company: "Stryker", url: "https://drive.google.com/file/d/12BXRuEfVv9GFW5c1fcSluN-37kefTSYz/view?usp=drive_link" },
                  { name: "Melody Chan", role: "Senior Project Manager", company: "Stryker Corporation", url: "https://drive.google.com/file/d/1EyDO2Iokxw6xLZIG26hUYYUY6n0iLzWU/view?usp=drive_link" },
                  { name: "Alan Fitzpatrick", role: "Senior Manager of Manufacturing Engineering", company: "Stryker", url: "https://drive.google.com/file/d/1UhJ70FumtafzIgLPVOQGZjqzQkGQhoNs/view?usp=drive_link" }
                ].map((rec, index) => (
                  <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{rec.name}</h3>
                        <p className="text-muted-foreground text-xs">{rec.role}</p>
                        <p className="text-muted-foreground text-xs">{rec.company}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        <a 
                          href={rec.url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          Read Letter
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Employment Verification Section for Mobile */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">Employment Verification</h2>
              <p className="text-muted-foreground text-xs mb-4">
                Official employment verification letters from HR departments.
              </p>
              <div className="space-y-3">
                {[
                  { 
                    company: "Gables Engineering, Inc.", 
                    url: "https://drive.google.com/file/d/1xa-fAODnaGyCMsBTxdrShp0ZvehnaXo1/view?usp=drive_link" 
                  },
                  { 
                    company: "Magic Leap, Inc.", 
                    url: "https://drive.google.com/file/d/1oY8w8qy4pr_gRZ5gEVyl1lWRRQMqjWaK/view?usp=drive_link" 
                  },
                  { 
                    company: "Stryker Corporation", 
                    url: "https://drive.google.com/file/d/1G2VtB20hJUGoyxSDWz53OtADO1Pk8x2S/view?usp=drive_link" 
                  }
                ].map((emp, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-border last:border-b-0 last:pb-0">
                    <h3 className="font-semibold text-foreground text-sm">{emp.company}</h3>
                    <Button variant="outline" size="sm" className="text-xs">
                      <a 
                        href={emp.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        Letter
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Side Projects Section */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-3">Side Projects</h2>
              <div className="space-y-4">
                {/* Earth Robotics */}
                <div className="pb-4 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Mechanical Engineer</h3>
                      <a 
                        href="https://www.earthrobotics.co/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        Earth Robotics
                      </a>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Contributing mechanical engineering expertise to sustainable robotics solutions for environmental applications.
                  </p>
                </div>

                {/* Tiento Labs */}
                <div className="pb-4 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Chief Technology Officer</h3>
                      <a 
                        href="https://www.tientolabs.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        Tiento Labs
                      </a>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Leading technical development of blockchain platform for tokenizing football player formation rights and providing verified scouting data.
                  </p>
                </div>

                {/* Recovrz */}
                <div className="pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Co-Founder</h3>
                      <a 
                        href="https://www.recovrz.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        Recovrz
                      </a>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Co-founded innovative athletic recovery company focused on next-generation solutions to help athletes recover better and reach new performance heights.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="p-6 bg-card border-border mb-8">
              <h2 className="text-lg font-bold text-foreground mb-3">Contact</h2>
              <div className="space-y-3">
                <a href="mailto:rrgschwart@hotmail.com" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4 mr-2" />
                  rrgschwart@hotmail.com
                </a>
                <a href="https://www.linkedin.com/in/rafaelschwart/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </a>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  Miami, Florida
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  Available upon request
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
