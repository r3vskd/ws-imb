'use client'

import * as React from 'react'
import { MessageCircle } from 'lucide-react'
import { AdvisorSelectorModal } from './advisor-selector-modal'

export function WhatsAppButton() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Contactar Asesor por WhatsApp"
        aria-label="Contactar Asesor por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current stroke-emerald-500 group-hover:stroke-emerald-600 transition-colors" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          ¡Contacta un Asesor por WhatsApp!
        </span>
      </button>

      <AdvisorSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
