'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { trackMetaEvent } from '@/components/analytics/meta-pixel'
import { MessageCircle, User, Sparkles } from 'lucide-react'

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
  const wendyUrl = 'https://wa.me/message/5OLQ37AI3J2FO1'
  const joseLuisUrl = 'https://wa.me/message/IUSRNTQEZ4HCN1'

  const handleSelectAdvisor = (advisorName: string, targetUrl: string) => {
    trackMetaEvent('Lead', {
      advisor: advisorName,
      property: propertyTitle || 'Consulta general',
      price: propertyPrice || 'N/A',
    })
    window.open(targetUrl, '_blank')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl bg-background">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-1">
            <MessageCircle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Elige a tu Asesor Inmobiliario
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {propertyTitle
              ? `¿Con quién deseas consultar sobre "${propertyTitle}"?`
              : 'Selecciona con quién deseas comunicarte vía WhatsApp para una atención personalizada.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 pt-4">
          {/* Wendy Sanchez Card */}
          <button
            onClick={() => handleSelectAdvisor('Wendy Sánchez', wendyUrl)}
            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
                W
              </div>
              <div>
                <div className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  Wendy Sánchez 
                </div>
                <div className="text-xs text-muted-foreground">
                  Asesora Inmobiliaria | Licenciada IMPI y especialista en Certeza Jurídica
                </div>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
          </button>

          {/* Jose Luis Card */}
          <button
            onClick={() => handleSelectAdvisor('José Luis', joseLuisUrl)}
            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-lg shadow">
                JL
              </div>
              <div>
                <div className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  José Luis
                </div>
                <div className="text-xs text-muted-foreground">
                  Asesor Inmobiliario | Estrategias Patrimoniales y Administrativas
                </div>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
