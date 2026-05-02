import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Linkedin, Github, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export const ContactSection = () => {
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
    const mailtoUrl = `mailto:hi@rafaelschwart.com?subject=${subject}&body=${body}`

    // Try to open via a temporary anchor (more reliable on mobile and inside iframes)
    const a = document.createElement('a')
    a.href = mailtoUrl
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Fallback in case the programmatic click is blocked
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        window.location.href = mailtoUrl
      }
    }, 150)

    toast({
      title: "Opening email client...",
      description: "If nothing happens, email me at hi@rafaelschwart.com.",
    })
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rafaelschwart/",
      description: "Connect with me professionally"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "#",
      description: "Check out my projects"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:hi@rafaelschwart.com",
      description: "Send me an email directly"
    }
  ]

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm always interested in discussing new opportunities, innovative projects, 
              and strategic partnerships. Let's start a conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Get In Touch</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whether you're looking for strategic guidance, team leadership, or want to 
                  discuss potential collaborations, I'd love to hear from you.
                </p>
              </div>

              <div className="grid gap-4">
                {socialLinks.map((link, index) => (
                  <Card 
                    key={index} 
                    className="p-4 bg-gradient-card border-border/50 hover:border-accent/20 transition-smooth group cursor-pointer shadow-soft hover:shadow-medium"
                  >
                    <a 
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                        <link.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-smooth">
                          {link.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-card border-border/50 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-accent transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-accent transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border focus:border-accent transition-smooth resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-accent text-accent-foreground hover:scale-105 transition-bounce shadow-medium"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}