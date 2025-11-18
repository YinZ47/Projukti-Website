"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Terminal, Linkedin } from "lucide-react"

export function CliNavbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/contact", label: "contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
            <div className="relative w-24 h-24">
              <Image
                src="/images/projukti-lipi-logo.png"
                alt="Projukti-Lipi"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              <span className="font-bold text-sm">~/projukti-lipi</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-mono transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary font-semibold" : "text-foreground/70"
                }`}
              >
                <span className="text-accent">$</span> {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-2 pl-2 border-l border-border">
              <a
                href="https://www.linkedin.com/company/projukti-lipi/?fbclid=IwY2xjawNJ4nNleHRuA2FlbQIxMABicmlkETFEVVMyTm1pckMwTU82OGZHAR758JMnYu5TW02wEAP9d3b6sGZyJ4qaOW53563fklyQgEVqbOWBa78CqWDKUQ_aem_0aywKE2aa4yUHdbRTXXO-Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
