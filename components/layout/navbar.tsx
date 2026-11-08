"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/cuicui/mac-os-dropdown"

const navButtonClass =
  "group flex items-center gap-2 rounded-lg bg-white/40 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 dark:bg-white/10 dark:hover:bg-white/20"

const navArrowClass =
  "size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"

export function Navbar() {
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
          ? "bg-[#F6F1E7]/90 dark:bg-black/90 backdrop-blur-md py-2"
          : "bg-[#F6F1E7]/85 dark:bg-black py-4"
        : isScrolled
          ? "bg-[#F6F1E7]/85 dark:bg-black/70 backdrop-blur-2xl py-2"
          : "bg-[#F6F1E7]/75 dark:bg-black/35 backdrop-blur-lg py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3 h-14">
          <Link href="/" className="flex shrink-0 items-center no-underline">
            <img
              src="/ws-logo.png"
              alt="WS Asesoría Inmobiliaria"
              className="h-8 max-w-[64px] w-auto object-contain object-left transition-all drop-shadow invert dark:invert-0 max-[359px]:max-w-[50px] sm:h-10 sm:max-w-none md:h-11"
            />
          </Link>

          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <Link
              href="/propiedades"
              className={cn(
                navButtonClass,
                "!h-9 !px-2 !py-0 !text-[11px] sm:!h-auto sm:!px-4 sm:!py-2 sm:!text-sm max-[359px]:!h-8 max-[359px]:!px-1.5 max-[359px]:!text-[10px]",
              )}
            >
              Propiedades
              <ArrowRight className={navArrowClass} aria-hidden />
            </Link>

            <Button
              asChild
              className="inline-flex !h-10 !px-2.5 !text-[11px] rounded-xl font-semibold shadow-sm transition-all duration-200 no-underline hover:scale-[1.02] active:scale-[0.98] ws-black-surface text-white hover:bg-[#1b1b1d] sm:!h-10 sm:!px-5 sm:!text-sm max-[359px]:!h-8 max-[359px]:!px-2 max-[359px]:!text-[10px]"
            >
              <Link href="/contact" className="no-underline">Contacto</Link>
            </Button>

            {/* Cuicui Mac OS dropdown — always present */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-foreground/5 focus:outline-none max-[359px]:h-8 max-[359px]:w-8"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-6 w-6 group-data-[state=open]:hidden max-[359px]:h-5 max-[359px]:w-5" aria-hidden />
                  <X className="hidden h-6 w-6 group-data-[state=open]:block max-[359px]:h-5 max-[359px]:w-5" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="min-w-40">
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => scrollToSection('featured')}
                >
                  Categorías
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => scrollToSection('testimonials')}
                >
                  Testimonios
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => router.push('/sobre-nosotros')}
                >
                  Sobre nosotros
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => router.push('/paseo')}
                >
                  Paseo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle className="h-9 w-9 rounded-xl text-foreground max-[359px]:h-8 max-[359px]:w-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
