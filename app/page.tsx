"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { TypingText } from "@/components/typing-text"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronRight, Sparkles, ChevronDown } from "lucide-react"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Projukti Lipi and what does the name mean?",
      answer:
        'Projukti Lipi is a non-profit organisation founded by passionate innovators who aim to bridge the gap between theory and real-world solutions. The name translates to "The Script of Technology", reflecting our mission to document, develop, and deploy impactful ideas that serve society.',
    },
    {
      question: "What types of projects does Projukti Lipi work on?",
      answer:
        "We innovate at the intersection of software and hardware, developing projects in robotics, software, SaaS, AI and computer vision. Currently we are working on 5 projects.",
    },
    {
      question: "What are the expectations from our team members?",
      answer:
        "Commitment and accountability. Regular updates and communication. A collaborative and open mindset. Willingness to learn or share knowledge. You don't need to know everything. Your eagerness to grow and contribute meaningfully matters most to us.",
    },
    {
      question: "Will I get a certificate or recognition for working here?",
      answer:
        "Yes. Active contributors will receive: A certificate of contribution. Acknowledgement on our official website. Possible features on our social media platforms or pitch decks. Your work with Projukti Lipi also strengthens your resume and showcases your real-world project experience.",
    },
    {
      question: "Is Projukti Lipi a registered organisation?",
      answer:
        "Currently, Projukti Lipi operates as a non-profit initiative. Formal registration is in progress so we can expand outreach, apply for grants, join competitions, and build collaborations.",
    },
    {
      question: "How is work assigned and managed in Projukti Lipi?",
      answer:
        "We maintain an organised workflow: Projects are divided into clear segments. Each segment has a coordinator who manages task distribution and progress tracking. Collaboration happens via Discord (communication), Notion/Trello (task management), and GitHub.",
    },
  ]

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />
      <CliNavbar />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {/* Terminal header */}
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <span className="text-primary font-semibold">student@projukti-lipi</span>
              <span>:</span>
              <span className="text-accent font-semibold">~</span>
              <span>$</span>
            </div>

            {/* Main intro */}
            <div className="space-y-6">
              <div className="text-lg font-mono">
                <span className="text-accent font-semibold">$</span>{" "}
                <TypingText
                  text="cat mission.txt"
                  delay={80}
                  onComplete={() => setTimeout(() => setShowContent(true), 500)}
                />
              </div>

              {showContent && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  {/* Hero Section with Logo */}
                  <div className="border-l-4 border-primary pl-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src="/images/projukti-lipi-logo.png"
                          alt="Projukti-Lipi Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Projukti-Lipi</h1>
                        <p className="text-xl md:text-2xl text-accent font-semibold leading-relaxed mt-2">
                          Empowering Student Innovation, One Project at a Time
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mission Statement */}
                  <div className="space-y-6 border-2 border-primary/30 rounded-lg p-6 bg-card/95 backdrop-blur-sm shadow-lg shadow-primary/10">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div className="space-y-4">
                        <p className="text-lg text-foreground leading-relaxed">
                          We believe every student deserves a chance to transform their ambitions into reality. We're a{" "}
                          <span className="text-primary font-semibold">student-led initiative</span> born from a simple
                          observation: too many talented individuals arrive at university with passion gleaming in their
                          eyes, only to find themselves overwhelmed by exclusive clubs that forget what it means to be a
                          beginner.
                        </p>
                        <p className="text-lg text-primary font-bold bg-primary/20 p-4 rounded border-l-4 border-primary shadow-md shadow-primary/20">
                          We're changing that narrative.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-primary/30 rounded-lg p-5 bg-card/90 backdrop-blur-sm hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
                      <div className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-primary mb-2">No Prerequisites for Passion</h3>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            No barriers to entry for those willing to learn. Your curiosity is your qualification.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-primary/30 rounded-lg p-5 bg-card/90 backdrop-blur-sm hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
                      <div className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-primary mb-2">Your Launchpad</h3>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            A community where curiosity is celebrated, mistakes are learning opportunities, and every
                            voice matters.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-accent/30 rounded-lg p-5 bg-card/90 backdrop-blur-sm hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all">
                      <div className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-accent mb-2">SaaS Excellence</h3>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            Building efficient, user-friendly software products that solve real problems.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-accent/30 rounded-lg p-5 bg-card/90 backdrop-blur-sm hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all">
                      <div className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-accent mb-2">Robotics Innovation</h3>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            Pursuing excellence in the ever-growing field of robotics and automation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 border-2 border-accent/30 rounded-lg p-6 bg-card/95 backdrop-blur-sm shadow-lg shadow-accent/10">
                    <h2 className="text-3xl font-bold text-primary">
                      <span className="text-accent">#</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg bg-secondary/50 overflow-hidden hover:border-primary/50 transition-all"
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/80 transition-colors"
                          >
                            <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${
                                openFaq === index ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openFaq === index && (
                            <div className="px-4 pb-4 pt-2 text-foreground/90 leading-relaxed border-t border-border bg-card/50">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="border-l-4 border-accent pl-6 py-4 bg-card/95 backdrop-blur-sm rounded-r-lg shadow-lg shadow-accent/10">
                    <p className="text-lg text-foreground italic leading-relaxed">
                      Whether you're taking your first steps in technology or ready to lead ambitious projects,{" "}
                      <span className="text-primary font-semibold">you'll find your place with us.</span>
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button asChild className="font-mono" size="lg">
                      <Link href="/projects">
                        <Terminal className="mr-2 h-4 w-4" />
                        View Our Projects
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="font-mono bg-transparent" size="lg">
                      <Link href="/about">Discover Our Story</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
