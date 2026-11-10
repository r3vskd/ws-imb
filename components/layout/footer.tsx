"use client"

import { ArrowRight, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"
import { useLocale } from "@/lib/i18n"
import { dict } from "@/lib/i18n-dict"

export function Footer() {
  const { locale } = useLocale()
  const t = dict.footer

  return (
    <footer className="border-t border-transparent bg-transparent text-muted-foreground dark:border-border">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-base font-bold text-foreground tracking-wide">
              {t.sobre[locale]}
            </h3>

            <p className="mt-3 text-xs text-muted-foreground leading-relaxed font-light">
              {t.sobreDesc[locale]}
              <br /><br />
              {t.sobreDesc2[locale]}
            </p>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-base font-bold text-foreground tracking-wide">
              {t.recursos[locale]}
            </h3>

            <div className="flex flex-col mt-3 space-y-2 text-xs font-medium">
              <Link
                href="/propiedades"
                className="no-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.nav.propiedades[locale]}
              </Link>

              <Link
                href="/sobre-nosotros"
                className="no-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.nav.sobreNosotros[locale]}
              </Link>

              <Link
                href="/contact"
                className="no-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.nav.contacto[locale]}
              </Link>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-base font-bold text-foreground tracking-wide">
              {t.infoContacto[locale]}
            </h3>

            <div className="flex flex-col mt-3 space-y-3 text-xs font-medium text-muted-foreground">

              {/* Ubicación */}
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-foreground" />

                <span>
                  Mérida, Yucatán, México
                </span>
              </div>

              {/* Teléfonos */}
              <div className="flex items-start">
                <Phone className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-foreground" />

                <div className="flex flex-col">
                  <span>999 258 3858</span>
                  <span>999 228 4783</span>
                </div>
              </div>

              {/* Correos */}
              <div className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-foreground" />

                <div className="flex flex-col gap-1">
                  <span>{t.negocios[locale]}</span>

                  <span>{t.info[locale]}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-base font-bold text-foreground tracking-wide">
              {t.redes[locale]}
            </h3>

            <div className="mt-3 flex flex-col gap-2">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/wensavi29/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-2 rounded-lg border-0 px-4 py-2 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-foreground/20"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" aria-hidden />
                <span>Facebook</span>
                <ArrowRight className="ml-auto size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/wendy_asesoria/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-2 rounded-lg border-0 px-4 py-2 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-foreground/20"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" aria-hidden />
                <span>Instagram</span>
                <ArrowRight className="ml-auto size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-2 rounded-lg border-0 px-4 py-2 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-foreground/20"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
                <span>TikTok</span>
                <ArrowRight className="ml-auto size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>

            </div>
          </div>

        </div>

        <hr className="my-8 border-border hidden dark:block" />

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between text-xs text-muted-foreground font-medium dark:mt-2 sm:flex-row">

          <p>
            © 2026 WS Asesoría Inmobiliaria. {t.derechos[locale]}
          </p>

          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link
              href="/politicas-de-privacidad"
              className="no-underline text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.privacidad[locale]}
            </Link>

            <Link
              href="/terminos-y-condiciones"
              className="no-underline text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.terminos[locale]}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}
