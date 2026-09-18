'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { trackMetaEvent } from '@/components/analytics/meta-pixel'
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre es requerido'),
  apellido: z.string().min(2, 'Apellido es requerido'),
  telefono: z
    .string()
    .min(7, 'Número de teléfono inválido')
    .max(20, 'Número de teléfono inválido'),
  correo: z.string().email('Correo electrónico inválido'),
  mensaje: z
    .string()
    .min(1, 'Mensaje es requerido')
    .refine((val) => val.trim().split(/\s+/).filter(Boolean).length <= 200, {
      message: 'El mensaje no puede superar 200 palabras',
    }),
  ciudad: z.string().min(2, 'Ciudad es requerida'),
  pais: z.string().min(2, 'País es requerido'),
})

type FormValues = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      mensaje: '',
      ciudad: '',
      pais: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    trackMetaEvent('Lead', {
      content_name: 'Formulario de Contacto Web',
      city: values.ciudad,
      country: values.pais
    })
    setSubmitted(true)
  }

  const handleOpenWhatsApp = () => {
    const values = form.getValues()
    const phone = '529992284783'
    const msg = encodeURIComponent(`Hola Wendy, mi nombre es ${values.nombre} ${values.apellido} (${values.telefono}). Les escribo desde ${values.ciudad}, ${values.pais}. Mensaje: ${values.mensaje}`)
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const mensajeValue = form.watch('mensaje') || ''
  const wordCount = mensajeValue.trim() ? mensajeValue.trim().split(/\s+/).filter(Boolean).length : 0

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-4 py-24 max-w-2xl flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Contáctanos</h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Déjanos tus datos o contáctanos de inmediato para recibir asesoría inmobiliaria personalizada en Mérida, Yucatán.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-8 rounded-2xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">¡Mensaje Recibido!</h2>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Gracias por ponerte en contacto. Si deseas respuesta inmediata por WhatsApp, presiona el botón a continuación.
            </p>
            <Button
              onClick={handleOpenWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 shadow-md"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Continuar por WhatsApp
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. +52 999 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@correo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Mérida, CDMX, Monterrey" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. México" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje (máximo 200 palabras)</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Cuéntanos qué tipo de propiedad buscas o qué propiedad deseas vender/rentar" {...field} />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">{wordCount} / 200 palabras</div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-12">
                <Send className="w-4 h-4 mr-2" /> Enviar Formulario
              </Button>
            </form>
          </Form>
        )}
      </div>

      <Footer />
    </div>
  )
}
