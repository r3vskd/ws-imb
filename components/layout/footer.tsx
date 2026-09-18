import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Sobre Nosotros</h3>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed font-light">
              Nos dedicamos a brindar servicios de asesoría inmobiliaria excepcionales, guiándote en todo el proceso para encontrar tu propiedad perfecta en Mérida, Yucatán.
              <br /><br />
              Nuestro catálogo de propiedades es cuidadosamente seleccionado para garantizar calidad, certeza jurídica y plusvalía.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Recursos</h3>
            <div className="flex flex-col mt-3 space-y-2 text-xs font-medium">
              <Link href="#properties" className="no-underline text-slate-400 hover:text-blue-400 transition-colors">Propiedades</Link>
              <Link href="#expertise" className="no-underline text-slate-400 hover:text-blue-400 transition-colors">Sobre nosotros</Link>
              <Link href="/contact" className="no-underline text-slate-400 hover:text-blue-400 transition-colors">Contacto</Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Información de Contacto</h3>
            <div className="flex flex-col mt-3 space-y-2 text-xs font-medium text-slate-400">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span>Mérida, Yucatán, México</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                <span>999 228 4783</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <span>ventas@wsinmobiliaria.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Síguenos en Redes</h3>
            <div className="flex mt-3 space-x-3">
              <a href="https://www.facebook.com/wensavi29/" target="_blank" rel="noopener noreferrer" className="no-underline w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/wendy_asesoria/" target="_blank" rel="noopener noreferrer" className="no-underline w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby" target="_blank" rel="noopener noreferrer" className="no-underline w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all" aria-label="TikTok">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-800" />

        <div className="flex flex-col items-center justify-between sm:flex-row text-xs text-slate-500 font-medium">
          <p>
            © 2026 WS Asesoría Inmobiliaria. Todos los derechos reservados.
          </p>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link href="/contact" className="no-underline text-slate-500 hover:text-slate-300 transition-colors">Política de Privacidad</Link>
            <Link href="/contact" className="no-underline text-slate-500 hover:text-slate-300 transition-colors">Términos de Servicio</Link> 
          </div>
        </div>
      </div>
    </footer>
  )
}
