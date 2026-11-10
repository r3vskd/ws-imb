'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { trackMetaEvent } from '@/components/analytics/meta-pixel'
import { useLocale } from '@/lib/i18n'
import { dict, localizePropertyTitle } from '@/lib/i18n-dict'

interface AdvisorSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle?: string
  propertyPrice?: string
}

export function AdvisorSelectorModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyPrice,
}: AdvisorSelectorModalProps) {
  const { locale } = useLocale()
  const m = dict.modal
  const c = dict.contact

  const buildWhatsAppUrl = (phone: string, advisor: string) => {
    const context = propertyTitle
      ? ` sobre "${propertyTitle}"${propertyPrice ? ` (${propertyPrice})` : ''}`
      : ''
    const message = `${c.whatsappSaludo[locale]} ${advisor === 'Wendy' ? 'Wendy' : 'José Luis'}, ${locale === 'en' ? 'I would like real-estate advice' : 'quiero recibir asesoría inmobiliaria'}${context}.`
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  const wendyUrl = buildWhatsAppUrl('529992284783', 'Wendy')
  const joseLuisUrl = buildWhatsAppUrl('529992583858', 'José Luis')

  const handleSelectAdvisor = (advisorName: string) => {
    trackMetaEvent('Contact', {
      advisor: advisorName,
      property: propertyTitle || 'Consulta general',
      price: propertyPrice || 'N/A',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-border p-6 shadow-2xl bg-background">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {m.titulo[locale]}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {propertyTitle
              ? `${m.conProp[locale]} "${localizePropertyTitle(propertyTitle, locale)}"?`
              : m.general[locale]}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <a
            href={wendyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSelectAdvisor('Wendy Sánchez')}
            className="block rounded-xl border-0 bg-foreground/10 p-4 text-left no-underline backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="font-bold text-base text-foreground">Wendy Sánchez</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {m.wendyRole[locale]}
            </div>
            <div className="mt-2 text-xs font-semibold text-foreground">
              {m.consultar[locale]}
            </div>
          </a>

          <a
            href={joseLuisUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSelectAdvisor('José Luis')}
            className="block rounded-xl border-0 bg-foreground/10 p-4 text-left no-underline backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="font-bold text-base text-foreground">José Luis</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {m.joseRole[locale]}
            </div>
            <div className="mt-2 text-xs font-semibold text-foreground">
              {m.consultar[locale]}
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
