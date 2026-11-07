import type { ReactNode } from 'react'
import PaseoNavbar from '@/components/journey/PaseoNavbar'
import './paseo.css'

export default function PaseoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="paseo-root">
      <PaseoNavbar />
      {children}
    </div>
  )
}
