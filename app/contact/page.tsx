"use client"

import { useEffect, useState } from "react"
import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { LandingHero } from "@/components/landing-hero"
import { Mail, Linkedin, Send, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectData {
  organization: {
    name: string
    email: string
  }
}

export default function ContactPage() {
  const [data, setData] = useState<ProjectData | null>(null)

  useEffect(() => {
    fetch("/projukti-lipi-data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to load data:", err))
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-primary">Loading...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />
      <CliNavbar />

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        {/* Terminal prompt */}
        <div className="mb-8 text-sm font-mono text-muted-foreground">
          <span className="text-primary font-semibold">student@projukti-lipi</span>
          <span>:</span>
          <span className="text-accent font-semibold">~/contact</span>
          <span>$</span>
          <span className="ml-2">./connect.sh</span>
        </div>

        <div className="space-y-8">
          <LandingHero title="Get In Touch" subtitle="Interested in joining our journey?" commandText="./connect.sh" showImmediately={true} ctaHref="/contact" ctaText="Contact Us" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6 bg-card shadow-md hover:shadow-lg hover:border-primary/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">Send us a direct message</p>
                  <Button asChild className="font-mono w-full" size="sm">
                    <a href={`mailto:${data.organization.email}`}>
                      <Send className="mr-2 h-4 w-4" />
                      Email Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card shadow-md hover:shadow-lg hover:border-primary/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground mb-4">Connect with us</p>
                  <Button asChild variant="outline" className="font-mono w-full bg-transparent" size="sm">
                    <a
                      href="https://www.linkedin.com/company/projukti-lipi/?fbclid=IwY2xjawNJ4nNleHRuA2FlbQIxMABicmlkETFEVVMyTm1pckMwTU82OGZHAR758JMnYu5TW02wEAP9d3b6sGZyJ4qaOW53563fklyQgEVqbOWBa78CqWDKUQ_aem_0aywKE2aa4yUHdbRTXXO-Q"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      Follow Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal-style contact info */}
          <div className="border border-border rounded-lg p-6 bg-card shadow-md font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Terminal className="h-4 w-4" />
              <span>contact_info.json</span>
            </div>
            <pre className="text-foreground/90">
              {JSON.stringify(
                {
                  organization: data.organization.name,
                  email: data.organization.email,
                  linkedin: "https://www.linkedin.com/company/projukti-lipi/",
                  status: "open_for_collaboration",
                  response_time: "24-48 hours",
                  focus: ["SaaS Development", "Robotics", "Student Innovation"],
                },
                null,
                2,
              )}
            </pre>
          </div>

          {/* Footer note */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-mono">$</span> Looking forward to hearing from you!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
