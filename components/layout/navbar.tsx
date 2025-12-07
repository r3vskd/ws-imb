"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl">RealEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("featured")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("properties")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <Button>Contact Us</Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <button
                onClick={() => scrollToSection("featured")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Featured
              </button>
              <button
                onClick={() => scrollToSection("properties")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Properties
              </button>
              <button
                onClick={() => scrollToSection("expertise")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Expertise
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Testimonials
              </button>
              <Button className="w-full">Contact Us</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
