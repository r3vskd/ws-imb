import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { label: 'Propiedades', href: '/propiedades' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros' },
  { label: 'Contacto', href: '/contact' },
]

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/wensavi29/' },
  { label: 'Instagram', href: 'https://www.instagram.com/wendy_asesoria/' },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby',
  },
]

const contact = [
  { label: '999 258 3858', href: 'tel:+529992583858' },
  { label: '999 228 4783', href: 'tel:+529992284783' },
  { label: 'ventas@wsinmobiliaria.com', href: 'mailto:ventas@wsinmobiliaria.com' },
  { label: 'contacto@wsinmobiliaria.com', href: 'mailto:contacto@wsinmobiliaria.com' },
]

const linkClass =
  'paseo-sans text-sm text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export default function WalkthroughFooter() {
  return (
    <footer className="bg-[#1B1917] text-[#F4F1EB]">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10 sm:pb-24 sm:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.7fr_0.9fr]">
          <div>
            <Image
              src="/ws-logo.png"
              alt="WS Asesoría Inmobiliaria"
              width={2471}
              height={904}
              className="h-10 w-auto"
            />
            <p className="paseo-sans mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Compra, venta y renta de propiedades en Mérida, Yucatán.
            </p>
          </div>

          <div>
            <p className="paseo-label text-white/55">Navegación</p>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="paseo-label text-white/55">Contacto</p>
            <ul className="mt-4 space-y-3">
              {contact.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="paseo-sans text-xs text-white/55">
            © 2026 WS Asesoría Inmobiliaria. Mérida, Yucatán.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="paseo-sans text-xs text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/politicas-de-privacidad"
              className="paseo-sans text-xs text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="paseo-sans text-xs text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
