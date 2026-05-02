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
  recommendationUrl?: string
}

const recommenders: Recommender[] = [
  {
    id: "jose-gibaja",
    name: "Jose Gibaja",
    currentRole: "Principal Engineer",
    company: "Stryker",
    relationship: "Senior Engineer at Stryker",
    timeWorked: "~2 years",
    bio: "Jose Gibaja is a Principal Engineer and Technical Lead in Advanced Operations Robotics at Stryker, specializing in robotic-assisted surgical systems and process development. During my time at Stryker, I had the privilege of working under Jose's leadership for nearly two years on the Process Development Team.\n\nWe collaborated closely on robotic arm modules, PFMEA/PCP deliverables, and fixture validation projects. Jose's guidance was instrumental in strengthening my technical foundation and ensuring critical milestone success. His mentorship and strategic thinking approach had a lasting impact on my career development.",
    linkedinUrl: "https://www.linkedin.com/in/josegibaja/",
    profileImage: "/lovable-uploads/396f95fa-f518-421e-b070-324f81e60131.png",
    fullLetter: "",
    recommendationUrl: "https://drive.google.com/file/d/1gsqFCu4JNY6-6nbR1ym2mCNjVzYt-fWF/view?usp=drive_link"
  },
  {
    id: "joe-zeichmann",
    name: "Joe Zeichmann", 
    currentRole: "Senior Staff Engineer",
    company: "Stryker",
    relationship: "Senior Staff Engineer at Stryker",
    timeWorked: "~2 years",
    bio: "Joe Zeichmann is an accomplished Senior Staff Engineer at Stryker, where he has extensive experience in robotics process development, design transfer, and advanced manufacturing engineering. His work has focused on guiding complex build and testing activities for robotic surgical systems, including actuator design, sensor calibration, and manufacturability reviews.\n\nI had the privilege of working with Joe for nearly two years as part of the Process Development Team at Stryker. Joe highlighted my contributions to PFMEA/PCP creation, fixture design, and robot arm upgrades, as well as my ability to take ownership of challenging build and testing activities. In his recommendation, he emphasized my passion, enthusiasm, and technical versatility—particularly in areas such as actuator assembly, force torque sensor swaps, and MAP template guidance for Stryker's Mako robotic systems. Joe's mentorship and collaborative leadership were instrumental in shaping my development as an engineer.",
    linkedinUrl: "https://www.linkedin.com/in/joseph-zeichman/",
    profileImage: "/lovable-uploads/eac60b64-93bb-46c5-876f-f74cc89c612d.png",
    fullLetter: "Rafael Schwart was an exceptional Senior Manufacturing Engineer on my team at Magic Leap, where he played a crucial role in scaling our AR device manufacturing operations. His technical expertise and problem-solving abilities were instrumental in achieving a 15% improvement in production efficiency.\n\nRafael's proficiency with MES analytics and Gauge R&R studies helped us establish robust manufacturing processes that could scale effectively. His work in cleanroom optimization and PFMEA development created the foundation for our manufacturing stability protocols. What set Rafael apart was his ability to conduct thorough design-for-manufacturability reviews while training production teams to ensure long-term operational success.\n\nRafael consistently demonstrated strong analytical skills and attention to detail, which were essential in our precision manufacturing environment. His contributions to process optimization and team development made a lasting impact on our organization's capabilities.\n\nI would not hesitate to work with Rafael again and strongly recommend him for any manufacturing engineering or operations role requiring technical depth and leadership skills.",
    recommendationUrl: "https://drive.google.com/file/d/12BXRuEfVv9GFW5c1fcSluN-37kefTSYz/view?usp=drive_link"
  },
  {
    id: "melody-chan",
    name: "Melody Chan",
    currentRole: "Project Manager",
    company: "Stryker",
    relationship: "Senior Project Manager at Stryker",
    timeWorked: "~2.5 years",
    bio: "Melody Chan is a highly skilled Senior Project Manager at Stryker, specializing in Connected Joint Technologies and advanced medical device development. With expertise in managing cross-functional projects, driving innovation, and leading complex engineering initiatives, she has a proven track record of delivering successful outcomes in regulated industries.\n\nI had the privilege of working with Melody for more than two and a half years at Stryker, where I supported her team on projects involving retrofit upgrades of prototype robotic systems. Melody highlighted my initiative, problem-solving skills, and ability to thrive under tight deadlines when tackling challenging robotics upgrades. She also recognized my natural project management abilities and encouraged my growth into leadership roles. Melody's mentorship and trust helped shape my engineering career, providing me with both confidence and guidance to take on high-impact projects.",
    linkedinUrl: "https://www.linkedin.com/in/melodychan1/",
    profileImage: "/lovable-uploads/10f1466e-3b59-48d4-9575-e75ca5f719d1.png",
    fullLetter: "I had the opportunity to work closely with Rafael Schwart during his time as a Senior Manufacturing Engineer in Stryker's Robotics division. Rafael's technical competence and collaborative approach made him an excellent partner in ensuring our manufacturing processes met the highest quality standards.\n\nRafael's work on MAPs redesign and SolidWorks simulation significantly enhanced our robotic assembly processes. His leadership in Kaizen/6S initiatives and commitment to PPAP and SICR compliance demonstrated his understanding of quality systems critical to medical device manufacturing. I was particularly impressed by his ability to effectively close NC/CAPA issues and support critical debug/rebuild operations for our high-precision surgical robotics.\n\nRafael consistently showed strong problem-solving skills and attention to detail, which are essential qualities in medical device manufacturing. His ability to work collaboratively across teams while maintaining focus on quality and regulatory requirements made him a valuable team member.\n\nI highly recommend Rafael for any engineering role requiring both technical expertise and quality system knowledge.",
    recommendationUrl: "https://drive.google.com/file/d/1EyDO2Iokxw6xLZIG26hUYYUY6n0iLzWU/view?usp=drive_link"
  },
  {
    id: "alan-fitzpatrick",
    name: "Alan Fitzpatrick",
    currentRole: "Manufacturing Manager",
    company: "Stryker",
    relationship: "Manager and Mentor at Stryker",
    timeWorked: "~2.5 years", 
    bio: "Alan Fitzpatrick is an experienced Senior Manager of Manufacturing Engineering at Stryker, specializing in advanced medical device production and large-scale operations leadership. With a strong background in manufacturing systems, lean practices, and engineering management, he has successfully guided cross-functional teams to deliver innovative surgical and robotic solutions.\n\nDuring my time at Stryker, I had the privilege of working with Alan as both a mentor and manager. Our collaboration centered on process development and new product introduction initiatives, where Alan's leadership ensured technical excellence and operational readiness. His support was critical in sharpening my technical problem-solving skills while reinforcing the importance of discipline and collaboration in a high-stakes manufacturing environment.",
    linkedinUrl: "https://www.linkedin.com/in/alan-fitzpatrick-38679a14/",
    profileImage: "/lovable-uploads/0e9931aa-8f5e-40d2-8650-d2a15dc6640a.png",
    fullLetter: "",
    recommendationUrl: "https://drive.google.com/file/d/1UhJ70FumtafzIgLPVOQGZjqzQkGQhoNs/view?usp=drive_link"
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
      <div>
        <p className="eyebrow mb-4">Recommendations</p>
        <h2 className="display-headline text-5xl md:text-6xl text-foreground mb-6">In their <br/>own words.</h2>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8">
          References and testimonials from colleagues and leaders I've worked with.
        </p>
      </div>

      {/* Recommender Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-12">
        {recommenders.map((recommender, index) => (
          <Card 
            key={recommender.id} 
            className="p-4 lg:p-6 bg-card border-border engineering-hover fade-in-up stagger-animation"
            style={{"--stagger-delay": index} as React.CSSProperties}
          >
            <CardHeader className="pb-3 lg:pb-4">
              <div className="flex items-start gap-3 lg:gap-4">
                {/* Profile Image */}
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
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
                    <User className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base lg:text-lg text-foreground mb-1">
                    {recommender.name}
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{recommender.currentRole} at {recommender.company}</span>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 lg:space-y-4">
              {/* Relationship & Time */}
              <div className="space-y-1 lg:space-y-2">
                <div className="flex items-start gap-2 text-xs lg:text-sm text-muted-foreground">
                  <User className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium">Relationship:</span>
                    <span className="ml-1">{recommender.relationship}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="font-medium">Duration:</span>
                  <span>{recommender.timeWorked}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                {recommender.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs lg:text-sm"
                  onClick={() => window.open(recommender.linkedinUrl, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View LinkedIn
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs lg:text-sm"
                  asChild
                >
                  <a 
                    href={recommender.recommendationUrl || "https://drive.google.com/drive/folders/1iztU_X76k2Xv4cuVmQBywuWWjI4VNNKp"} 
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