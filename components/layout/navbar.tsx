"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
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
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-2"
        : "bg-gradient-to-b from-slate-950/80 to-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2 no-underline">
            {isScrolled ? (
              <img src="/ws-logo-blue.png" alt="WS Asesoría Inmobiliaria" className="h-10 md:h-11 w-auto object-contain transition-all"/>
            ) : (
              <img src="/ws-logo.png" alt="WS Asesoría Inmobiliaria" className="h-10 md:h-11 w-auto object-contain transition-all drop-shadow"/>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("featured")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400" : "text-slate-100 hover:text-white"
              )}
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection("properties")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400" : "text-slate-100 hover:text-white"
              )}
            >
              Propiedades
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400" : "text-slate-100 hover:text-white"
              )}
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400" : "text-slate-100 hover:text-white"
              )}
            >
              Testimonios
            </button>

            <Button
              asChild
              className={cn(
                "rounded-xl px-5 h-10 font-semibold shadow-sm transition-all duration-200 no-underline hover:scale-[1.02] active:scale-[0.98]",
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm"
              )}
            >
              <Link href="/contact" className="no-underline">Contacto</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú de navegación"
          >
            {isOpen ? (
              <X className={cn("h-6 w-6", isScrolled ? "text-slate-900 dark:text-white" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", isScrolled ? "text-slate-900 dark:text-white" : "text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl rounded-b-2xl">
            <div className="flex flex-col space-y-4 px-6 py-6">
              <button
                onClick={() => scrollToSection("featured")}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Categorías
              </button>
              <button
                onClick={() => scrollToSection("properties")}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Propiedades
              </button>
              <button
                onClick={() => scrollToSection("expertise")}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Expertise
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Testimonios
              </button>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold no-underline">
                <Link href="/contact" className="no-underline">Contacto</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
