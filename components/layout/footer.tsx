import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0F1012] text-[#B4B6BC] border-t border-border">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Sobre Nosotros
            </h3>

            <p className="mt-3 text-xs text-[#8A8C93] leading-relaxed font-light">
              Nos dedicamos a brindar servicios de asesoría inmobiliaria
              excepcionales, guiándote en todo el proceso para encontrar tu
              propiedad perfecta en Mérida, Yucatán.
              <br /><br />
              Nuestro catálogo de propiedades es cuidadosamente seleccionado
              para garantizar calidad, certeza jurídica y plusvalía.
            </p>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Recursos
            </h3>

            <div className="flex flex-col mt-3 space-y-2 text-xs font-medium">
              <Link
                href="/propiedades"
                className="no-underline text-[#8A8C93] hover:text-white transition-colors"
              >
                Propiedades
              </Link>

              <Link
                href="/sobre-nosotros"
                className="no-underline text-[#8A8C93] hover:text-white transition-colors"
              >
                Sobre nosotros
              </Link>

              <Link
                href="/contact"
                className="no-underline text-[#8A8C93] hover:text-white transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Información de Contacto
            </h3>

            <div className="flex flex-col mt-3 space-y-3 text-xs font-medium text-[#8A8C93]">

              {/* Ubicación */}
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-white" />

                <span>
                  Mérida, Yucatán, México
                </span>
              </div>

              {/* Teléfonos */}
              <div className="flex items-start">
                <Phone className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-white" />

                <div className="flex flex-col">
                  <span>999 258 3858</span>
                  <span>999 228 4783</span>
                </div>
              </div>

              {/* Correos */}
              <div className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-white" />

                <div className="flex flex-col gap-1">
                  <span>
                    Negocios: ventas@wsinmobiliaria.com
                  </span>

                  <span>
                    Información: contacto@wsinmobiliaria.com
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Síguenos en Redes
            </h3>

            <div className="mt-3 flex flex-col gap-2">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/wensavi29/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline flex w-full items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-[#B4B6BC] hover:text-[#18181B] hover:border-[#18181B]/40 dark:hover:text-white dark:hover:border-white/40 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/wendy_asesoria/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline flex w-full items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-[#B4B6BC] hover:text-[#18181B] hover:border-[#18181B]/40 dark:hover:text-white dark:hover:border-white/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline flex w-full items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-[#B4B6BC] hover:text-[#18181B] hover:border-[#18181B]/40 dark:hover:text-white dark:hover:border-white/40 transition-all"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
                <span>TikTok</span>
              </a>

            </div>
          </div>

        </div>

        <hr className="my-8 border-border" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between sm:flex-row text-xs text-[#8A8C93] font-medium">

          <p>
            © 2026 WS Asesoría Inmobiliaria. Todos los derechos reservados.
          </p>

          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link
              href="/politicas-de-privacidad"
              className="no-underline text-[#8A8C93] hover:text-[#D6D7DB] transition-colors"
            >
              Política de Privacidad
            </Link>

            <Link
              href="/terminos-y-condiciones"
              className="no-underline text-[#8A8C93] hover:text-[#D6D7DB] transition-colors"
            >
              Términos de Servicio
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}