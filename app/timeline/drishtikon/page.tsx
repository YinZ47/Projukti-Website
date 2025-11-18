"use client"

import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { timelinePosts } from "@/data/timelinePosts"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function LocalImage({ weekNumber, srcFallback, idx }: { weekNumber: number; srcFallback: string; idx: number }) {
  const exts = ["jpg", "jpeg", "png", "webp", "svg"]
  const [attempt, setAttempt] = useState(0)
  // Build candidate list. If srcFallback is already a local timeline path, try it first
  const localCandidates = exts.map((e) => `/images/timeline/${weekNumber}-${idx}.${e}`)
  const isSrcLocal = srcFallback && srcFallback.startsWith("/images/timeline/")
  const candidates = isSrcLocal ? [srcFallback, ...localCandidates, "/placeholder.jpg"] : [...localCandidates, srcFallback, "/placeholder.jpg"]
  const current = candidates[Math.min(attempt, candidates.length - 1)]

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={`Progress update image ${idx + 1}`}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      onError={() => setAttempt((a: number) => a + 1)}
    />
  )
}

export default function DrishtikonTimelinePage() {
  return (
    <div className="relative min-h-screen scanlines">
      <ThreeBackground />
      <CliNavbar />

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="mb-8">
          <div className="space-y-8">
            {timelinePosts.map((post, postIndex) => {
              // prefer explicit post.id (week number) if available, otherwise derive from index
              const weekNumber = typeof post.id === "number" ? post.id : postIndex + 1

              return (
                <article key={post.id ?? postIndex} className="p-6 bg-card/80 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{post.name}</h3>
                      <p className="text-sm text-foreground/80">Week {weekNumber} • {post.day}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-foreground/90 whitespace-pre-wrap">{post.description}</div>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {post.images.map((image, idx) => (
                        <div
                          key={idx}
                          className={`overflow-hidden rounded-lg border border-border ${
                            post.images.length === 1 ? "col-span-2 h-96" : "h-48"
                          }`}
                        >
                          <LocalImage weekNumber={weekNumber} srcFallback={image} idx={idx} />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border-2 border-primary/30 rounded-lg p-8 bg-card/90 backdrop-blur-sm text-center shadow-lg shadow-primary/10">
          <h2 className="text-2xl font-bold mb-3 text-primary text-glow">Stay Updated</h2>
          <p className="text-foreground/90 mb-6 max-w-2xl mx-auto">
            Want to follow our progress more closely? Connect with us on LinkedIn or reach out directly.
          </p>
          <Button asChild size="lg" className="font-mono">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
