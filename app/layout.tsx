import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

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
      <body className="font-sans antialiased bg-background text-foreground selection:bg-white selection:text-black">
        <ThemeProvider attribute={['class', 'data-theme']} defaultTheme="dark" enableSystem>
          <MetaPixel />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
