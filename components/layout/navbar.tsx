"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isPropiedades = pathname.startsWith('/propiedades')

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
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isPropiedades
        ? isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-sm border-b border-white/25 py-2"
          : "bg-black py-4"
        : isScrolled
          ? "bg-black/70 backdrop-blur-2xl shadow-sm py-2"
          : "bg-black/35 backdrop-blur-lg py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2 no-underline">
            <img src="/ws-logo.png" alt="WS Asesoría Inmobiliaria" className="h-10 md:h-11 w-auto object-contain transition-all drop-shadow"/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("featured")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled && !isPropiedades ? "text-slate-200 hover:text-white" : "text-slate-100 hover:text-white"
              )}
            >
              Categorías
            </button>
            <Link
              href="/propiedades"
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled && !isPropiedades ? "text-slate-200 hover:text-white" : "text-slate-100 hover:text-white"
              )}
            >
              Propiedades
            </Link>
            <button
              onClick={() => scrollToSection("expertise")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled && !isPropiedades ? "text-slate-200 hover:text-white" : "text-slate-100 hover:text-white"
              )}
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled && !isPropiedades ? "text-slate-200 hover:text-white" : "text-slate-100 hover:text-white"
              )}
            >
              Testimonios
            </button>
            <Link
              href="/sobre-nosotros"
              className={cn(
                "text-sm font-semibold transition-colors duration-200 no-underline focus:outline-none",
                isScrolled && !isPropiedades ? "text-slate-200 hover:text-white" : "text-slate-100 hover:text-white"
              )}
            >
              Sobre nosotros
            </Link>

            <ThemeToggle
              className={cn(
                isScrolled && !isPropiedades
                  ? "text-slate-200 hover:text-white hover:bg-white/10"
                  : "text-slate-100 hover:text-white hover:bg-white/10"
              )}
            />

            <Button
              asChild
              className={cn(
                "rounded-xl px-5 h-10 font-semibold shadow-sm transition-all duration-200 no-underline hover:scale-[1.02] active:scale-[0.98]",
                isScrolled && !isPropiedades
                  ? "ws-black-surface text-white hover:bg-[#1b1b1d]"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm"
              )}
            >
              <Link href="/paseo" className="no-underline">Paseo</Link>
            </Button>

            <Button
              asChild
              className={cn(
                "rounded-xl px-5 h-10 font-semibold shadow-sm transition-all duration-200 no-underline hover:scale-[1.02] active:scale-[0.98]",
                isScrolled && !isPropiedades
                  ? "ws-black-surface text-white hover:bg-[#1b1b1d]"
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
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={cn("h-6 w-6", isScrolled && !isPropiedades ? "text-slate-900 dark:text-white" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", isScrolled && !isPropiedades ? "text-slate-900 dark:text-white" : "text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-white/40 shadow-xl rounded-b-2xl">
            <div className="flex flex-col space-y-4 px-6 py-6">
              <button
                onClick={() => scrollToSection("featured")}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Categorías
              </button>
              <Link
                href="/propiedades"
                onClick={() => setIsOpen(false)}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Propiedades
              </Link>
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
              <Link
                href="/sobre-nosotros"
                onClick={() => setIsOpen(false)}
                className="text-left text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 no-underline"
              >
                Sobre nosotros
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Apariencia</span>
                <ThemeToggle className="text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" />
              </div>
              <Button asChild className="w-full ws-black-surface text-white hover:bg-[#1b1b1d] rounded-xl h-11 font-semibold no-underline">
                <Link href="/paseo" onClick={() => setIsOpen(false)} className="no-underline">Paseo</Link>
              </Button>
              <Button asChild className="w-full ws-black-surface text-white hover:bg-[#1b1b1d] rounded-xl h-11 font-semibold no-underline">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="no-underline">Contacto</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
