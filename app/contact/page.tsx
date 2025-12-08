'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
    console.log('Contacto enviado:', values)
  }

  const mensajeValue = form.watch('mensaje') || ''
  const wordCount = mensajeValue.trim() ? mensajeValue.trim().split(/\s+/).filter(Boolean).length : 0

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
        <p className="text-muted-foreground mb-8">
          Completa el formulario y nos pondremos en contacto contigo.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input placeholder="Ciudad" {...field} />
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
                      <Input placeholder="País" {...field} />
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
                    <Textarea rows={6} placeholder="Cuéntanos cómo podemos ayudarte" {...field} />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">{wordCount} / 200 palabras</div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Enviar</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

