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
  const buildWhatsAppUrl = (phone: string, advisor: string) => {
    const context = propertyTitle
      ? ` sobre "${propertyTitle}"${propertyPrice ? ` (${propertyPrice})` : ''}`
      : ''
    const message = `Hola ${advisor}, quiero recibir asesoría inmobiliaria${context}.`
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
            Equipo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {propertyTitle
              ? `¿Con quién deseas consultar sobre "${propertyTitle}"?`
              : 'Selecciona con quién deseas comunicarte vía WhatsApp para una atención personalizada.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <a
            href={wendyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSelectAdvisor('Wendy Sánchez')}
            className="block rounded-xl border border-border bg-secondary/40 p-4 text-left no-underline transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="font-bold text-base text-foreground">Wendy Sánchez</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Asesora Inmobiliaria | Licenciada INAPIM y especialista en Certeza Jurídica
            </div>
            <div className="mt-2 text-xs font-semibold text-foreground">
              Consultar por WhatsApp
            </div>
          </a>

          <a
            href={joseLuisUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSelectAdvisor('José Luis')}
            className="block rounded-xl border border-border bg-secondary/40 p-4 text-left no-underline transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="font-bold text-base text-foreground">José Luis</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Asesor Inmobiliario | Estrategias Patrimoniales y Administrativas
            </div>
            <div className="mt-2 text-xs font-semibold text-foreground">
              Consultar por WhatsApp
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
