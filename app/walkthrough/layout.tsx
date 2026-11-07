import type { ReactNode } from 'react'
import PaseoNavbar from '@/components/journey/PaseoNavbar'
import '../paseo/paseo.css'

export default function WalkthroughLayout({ children }: { children: ReactNode }) {
  return (
    <div className="paseo-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
        precedence="default"
      />
      <PaseoNavbar />
      {children}
    </div>
  )
}
