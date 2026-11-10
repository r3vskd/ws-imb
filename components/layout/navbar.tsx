"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale, pick } from "@/lib/i18n"
import { dict } from "@/lib/i18n-dict"
import { ArrowRight, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/cuicui/mac-os-dropdown"

export function Navbar({ darkTop = false }: { darkTop?: boolean }) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { locale, setLocale } = useLocale()
  const n = dict.nav
  const isPropiedades = pathname.startsWith('/propiedades')

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const atTop = !isScrolled

  const navButtonClass = cn(
    "group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2",
    atTop
      ? darkTop
        ? "text-white hover:bg-white/10 focus-visible:ring-white/40"
        : "text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/30"
      : "text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/30",
  )

  const navArrowClass =
    "size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"

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
      atTop
        ? cn("bg-transparent backdrop-blur-none py-4", darkTop ? "text-white" : "text-foreground")
        : "text-foreground dark:text-white",
      isPropiedades
        ? !atTop && "bg-[#F6F1E7]/90 dark:bg-black/90 backdrop-blur-md py-2"
        : !atTop && "bg-[#F6F1E7]/85 dark:bg-black/70 backdrop-blur-2xl py-2"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3 h-14">
          <Link href="/" className="flex shrink-0 items-center no-underline">
            <img
              src="/ws-logo.png"
              alt="WS Asesoría Inmobiliaria"
              className={cn(
                "h-8 max-w-[64px] w-auto object-contain object-left transition-all drop-shadow max-[359px]:max-w-[50px] sm:h-10 sm:max-w-none md:h-11",
                atTop && darkTop ? "dark:invert-0" : "invert dark:invert-0",
              )}
            />
          </Link>

          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <Link
              href="/propiedades"
              className={cn(
                navButtonClass,
                "!h-9 !px-3 !py-0 !text-[11px] hidden md:!flex md:!px-4 md:!py-2 md:!text-sm max-[359px]:!h-8 max-[359px]:!px-1.5 max-[359px]:!text-[10px]",
              )}
            >
              {n.propiedades[locale]}
              <ArrowRight className={navArrowClass} aria-hidden />
            </Link>

            <Button
              asChild
              variant="ghost"
              className={cn(
                "hidden md:!inline-flex !h-10 !px-3 !text-[11px] rounded-xl font-semibold transition-all duration-200 no-underline hover:scale-[1.02] active:scale-[0.98] md:!px-5 md:!text-sm max-[359px]:!h-8 max-[359px]:!px-2 max-[359px]:!text-[10px]",
                atTop && darkTop
                  ? "text-white hover:text-white hover:bg-white/10"
                  : "text-foreground hover:text-foreground hover:bg-foreground/5",
              )}
            >
              <Link href="/contact" className="no-underline">{n.contacto[locale]}</Link>
            </Button>

            {/* Cuicui Mac OS dropdown — always present */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors focus:outline-none max-[359px]:h-8 max-[359px]:w-8",
                    atTop && darkTop ? "hover:bg-white/10" : "hover:bg-foreground/5",
                  )}
                  aria-label={n.menu[locale]}
                >
                  <Menu className="h-6 w-6 group-data-[state=open]:hidden max-[359px]:h-5 max-[359px]:w-5" aria-hidden />
                  <X className="hidden h-6 w-6 cursor-pointer group-data-[state=open]:block max-[359px]:h-5 max-[359px]:w-5" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="min-w-40">
                <DropdownMenuItem
                  className="py-1.5 md:hidden"
                  onSelect={() => router.push('/propiedades')}
                >
                  {n.propiedades[locale]}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5 md:hidden"
                  onSelect={() => router.push('/contact')}
                >
                  {n.contacto[locale]}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => scrollToSection('featured')}
                >
                  {n.categorias[locale]}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => scrollToSection('testimonials')}
                >
                  {n.testimonios[locale]}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => router.push('/sobre-nosotros')}
                >
                  {n.sobreNosotros[locale]}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-1.5"
                  onSelect={() => router.push('/paseo')}
                >
                  {n.paseo[locale]}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Language switcher — same dropdown styles */}
                <div className="flex items-center justify-between gap-2 px-1.5 py-1">
                  <span className="text-xs text-white/60">
                    {pick(locale, "Idioma", "Language")}
                  </span>
                  <div className="flex items-center rounded-[4px] bg-white/10 p-0.5">
                    {(["es", "en"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          setLocale(l)
                          setMenuOpen(false)
                        }}
                        className={cn(
                          "cursor-pointer rounded-[3px] px-2 py-0.5 text-xs font-semibold uppercase transition-colors",
                          locale === l
                            ? "bg-white text-[#1e1e1f]"
                            : "text-white/70 hover:text-white",
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle
              className={cn(
                "h-9 w-9 rounded-xl max-[359px]:h-8 max-[359px]:w-8",
                atTop && darkTop
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-foreground/5",
              )}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
