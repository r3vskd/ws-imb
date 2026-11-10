import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { ThemeProvider } from '@/components/theme-provider'
import { LocaleProvider } from '@/lib/i18n'
import './globals.css'

export const metadata: Metadata = {
  title: 'WS Asesoría Inmobiliaria | Mérida, Yucatán',
  description: 'Más que encontrar una propiedad, construimos relaciones que perduran.',
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
        <ThemeProvider
          attribute={['class', 'data-theme']}
          defaultTheme="light"
          enableSystem={false}
          storageKey="ws-theme"
        >
          <LocaleProvider>
            <MetaPixel />
            {children}
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
