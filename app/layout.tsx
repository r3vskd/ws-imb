import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WS Asesoría Inmobiliaria | Mérida, Yucatán',
  description: 'Asesoría profesional independiente en compra, venta y renta de propiedades en las mejores zonas de Mérida, Yucatán. Solana Residencial, Dzityá, Temozón y Norte de Mérida.',
  generator: 'WS Asesoría Inmobiliaria',
  icons: {
    icon: '/ws-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${plusJakartaSans.className} font-sans antialiased bg-background text-foreground selection:bg-blue-600 selection:text-white`}>
        <MetaPixel />
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
