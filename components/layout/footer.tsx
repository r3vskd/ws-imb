import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Nos dedicamos a brindar servicios inmobiliarios excepcionales, ayudándole a encontrar su propiedad perfecta.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="flex flex-col mt-4 space-y-2 text-sm">
              <Link href="/properties" className="hover:underline">Propiedades</Link>
              <Link href="/about" className="hover:underline">Sobre nosotros</Link>
              <Link href="/contact" className="hover:underline">Contacto</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Informacion de Contacto</h3>
            <div className="flex flex-col mt-4 space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Merida Yucatan</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+52 999 228 4783</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>wsinmobiliaria19@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Siguenos en Redes</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="https://www.facebook.com/wendy.sanchez.729310" className="hover:text-primary">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/wendy_asesorinmob/" className="hover:text-primary">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby" className="hover:text-primary" aria-label="TikTok">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 WS Inmobiliaria. Todos los derechos reservados.
          </p>
          <div className="flex mt-4 space-x-4 text-sm sm:mt-0">
            <Link href="/privacy" className="hover:underline">Politica de Privacidad</Link>
            <Link href="/terms" className="hover:underline">Terminos de Servicio</Link> 
          </div>
        </div>
      </div>
    </footer>
  )
}
