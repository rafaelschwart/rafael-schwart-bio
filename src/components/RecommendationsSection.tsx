import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink, FileText, User, Building, Calendar } from "lucide-react"

interface Recommender {
  id: string
  name: string
  currentRole: string
  company: string
  relationship: string
  timeWorked: string
  bio: string
  linkedinUrl: string
  profileImage?: string
  fullLetter: string
}

const recommenders: Recommender[] = [
  {
    id: "jose-gibaja",
    name: "Jose Gibaja",
    currentRole: "Principal Engineer",
    company: "Stryker",
    relationship: "Senior Engineer at Stryker",
    timeWorked: "~2 years",
    bio: "Jose Gibaja is a highly accomplished Principal Engineer and Technical Lead in Advanced Operations Robotics at Stryker, where he drives innovation in robotic-assisted surgical systems. With deep expertise in process development, manufacturing engineering, and product design transfer, Jose has played a pivotal role in scaling advanced medical robotics technologies for global markets. I had the privilege of working under Jose's leadership during my time at Stryker. Over nearly two years, we collaborated closely on projects within the Process Development Team, focusing on robotic arm modules, PFMEA/PCP deliverables, and fixture validation. His guidance was instrumental in strengthening my technical foundation and ensuring the success of critical milestones. Jose not only provided mentorship but also modeled a balance of technical rigor and strategic thinking that had a lasting impact on my career development.",
    linkedinUrl: "https://www.linkedin.com/in/josegibaja/",
    profileImage: "/lovable-uploads/396f95fa-f518-421e-b070-324f81e60131.png",
    fullLetter: ""
  },
  {
    id: "joe-zeichmann",
    name: "Joe Zeichmann", 
    currentRole: "Manufacturing Engineering Director",
    company: "Magic Leap",
    relationship: "Engineering Director during AR device development",
    timeWorked: "~1.5 years",
    bio: "Joe is a seasoned manufacturing engineering director with deep expertise in AR/VR technologies and advanced manufacturing processes. At Magic Leap, he led the manufacturing engineering organization responsible for scaling AR device production. His background includes extensive experience in cleanroom operations, precision manufacturing, and technology scaling from prototype to high-volume production.",
    linkedinUrl: "https://www.linkedin.com/in/joseph-zeichman/",
    profileImage: "/lovable-uploads/1c19c458-57ad-4ae9-87ea-abe731dfbe91.png",
    fullLetter: "Rafael Schwart was an exceptional Senior Manufacturing Engineer on my team at Magic Leap, where he played a crucial role in scaling our AR device manufacturing operations. His technical expertise and problem-solving abilities were instrumental in achieving a 15% improvement in production efficiency.\n\nRafael's proficiency with MES analytics and Gauge R&R studies helped us establish robust manufacturing processes that could scale effectively. His work in cleanroom optimization and PFMEA development created the foundation for our manufacturing stability protocols. What set Rafael apart was his ability to conduct thorough design-for-manufacturability reviews while training production teams to ensure long-term operational success.\n\nRafael consistently demonstrated strong analytical skills and attention to detail, which were essential in our precision manufacturing environment. His contributions to process optimization and team development made a lasting impact on our organization's capabilities.\n\nI would not hesitate to work with Rafael again and strongly recommend him for any manufacturing engineering or operations role requiring technical depth and leadership skills."
  },
  {
    id: "melody-chan",
    name: "Melody Chan",
    currentRole: "Senior Quality Engineer",
    company: "Stryker Corporation",
    relationship: "Quality Engineering Peer in Robotics Division",
    timeWorked: "~2.5 years",
    bio: "Melody is a highly experienced senior quality engineer at Stryker Corporation specializing in medical device quality systems and regulatory compliance. She works closely with manufacturing engineering teams to ensure product quality and process validation in the robotics division. Her expertise includes PPAP, SICR compliance, NC/CAPA management, and medical device regulations.",
    linkedinUrl: "https://www.linkedin.com/in/melodychan1/",
    profileImage: "/lovable-uploads/3c24dbd3-0cb3-4db6-8d58-85285bb21a89.png",
    fullLetter: "I had the opportunity to work closely with Rafael Schwart during his time as a Senior Manufacturing Engineer in Stryker's Robotics division. Rafael's technical competence and collaborative approach made him an excellent partner in ensuring our manufacturing processes met the highest quality standards.\n\nRafael's work on MAPs redesign and SolidWorks simulation significantly enhanced our robotic assembly processes. His leadership in Kaizen/6S initiatives and commitment to PPAP and SICR compliance demonstrated his understanding of quality systems critical to medical device manufacturing. I was particularly impressed by his ability to effectively close NC/CAPA issues and support critical debug/rebuild operations for our high-precision surgical robotics.\n\nRafael consistently showed strong problem-solving skills and attention to detail, which are essential qualities in medical device manufacturing. His ability to work collaboratively across teams while maintaining focus on quality and regulatory requirements made him a valuable team member.\n\nI highly recommend Rafael for any engineering role requiring both technical expertise and quality system knowledge."
  },
  {
    id: "alan-fitzpatrick",
    name: "Alan Fitzpatrick",
    currentRole: "Engineering Manager",
    company: "Gables Engineering",
    relationship: "Engineering Manager during Boeing avionics projects",
    timeWorked: "~1 year", 
    bio: "Alan is an experienced engineering manager at Gables Engineering with extensive expertise in aerospace test equipment and automation systems. He leads engineering teams developing sophisticated test solutions for major aerospace clients including Boeing. His technical background includes fixture design, automation engineering, and PDM/PLM system implementation.",
    linkedinUrl: "https://www.linkedin.com/in/alan-fitzpatrick-38679a14/",
    profileImage: "/lovable-uploads/0c33187d-3ade-4b59-a0ac-1fdf4c85ed2f.png",
    fullLetter: "Rafael Schwart was an outstanding Mechanical Engineer on my team at Gables Engineering, where he made significant contributions to our aerospace test equipment projects. His innovative approach to fixture design and automation resulted in remarkable improvements to our testing processes.\n\nRafael's design of automated fixtures reduced our test cycle times by over 50% for Boeing avionics projects, which had a major impact on our operational efficiency and client satisfaction. His implementation of a PDM system streamlined our ECN/ECO workflows and significantly reduced design cycle times across multiple projects.\n\nWhat impressed me most about Rafael was his combination of technical creativity and practical engineering sense. He could develop innovative solutions while maintaining focus on manufacturability and cost-effectiveness. His automation expertise and systematic approach to process improvement made him a valuable asset to our aerospace projects.\n\nRafael is a talented engineer who brings both technical depth and process improvement mindset to any organization. I strongly recommend him for engineering or program management roles."
  }
]

export const RecommendationsSection = () => {
  const scrollToLetter = (recommenderId: string) => {
    const element = document.getElementById(`letter-${recommenderId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-8 fade-in-up">
      <div className="scan-line">
        <h2 className="text-3xl font-bold text-foreground mb-6">Recommendations</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Professional references and testimonials from colleagues and leaders I've worked with.
        </p>
      </div>

      {/* Recommender Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {recommenders.map((recommender, index) => (
          <Card 
            key={recommender.id} 
            className="p-6 bg-card border-border engineering-hover fade-in-up stagger-animation"
            style={{"--stagger-delay": index} as React.CSSProperties}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {recommender.profileImage ? (
                    <img 
                      src={recommender.profileImage}
                      alt={`${recommender.name} profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback')
                        if (fallback) {
                          (fallback as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                  ) : null}
                  <div className="fallback w-full h-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground mb-1">
                    {recommender.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {recommender.currentRole} at {recommender.company}
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Relationship & Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span className="font-medium">Relationship:</span>
                  <span>{recommender.relationship}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span className="font-medium">Duration:</span>
                  <span>{recommender.timeWorked}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {recommender.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(recommender.linkedinUrl, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View LinkedIn
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a 
                    href="https://drive.google.com/drive/folders/1iztU_X76k2Xv4cuVmQBywuWWjI4VNNKp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-3 w-3 mr-2" />
                    Read Full Recommendation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}