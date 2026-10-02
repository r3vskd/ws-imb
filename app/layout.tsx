import type { Metadata } from 'next'
import { Poppins, Josefin_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-josefin',
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
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${josefinSans.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground selection:bg-teal-600 selection:text-white`}>
        <ThemeProvider attribute={['class', 'data-theme']} defaultTheme="system" enableSystem>
          <MetaPixel />
          {children}
          <WhatsAppButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
