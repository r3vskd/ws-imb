"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Award, ClipboardList, ShieldCheck, Quote, MessageCircle, Home, Tag, KeyRound, Megaphone, Handshake } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const servicios = [
  { icon: Home, label: "Compra" },
  { icon: Tag, label: "Venta" },
  { icon: KeyRound, label: "Renta" },
  { icon: Megaphone, label: "Comercialización" },
  { icon: Handshake, label: "Asesoría" },
]

const rentaSteps = [
  "Asesoría inicial",
  "Promoción de la propiedad",
  "Filtro de prospectos",
  "Revisión de documentación",
  "Contrato",
  "Convenio",
  "Inventario",
  "Entrega",
  "Seguimiento",
]

const razones = [
  {
    icon: Award,
    title: "Experiencia y acompañamiento",
    description:
      "En WS combinamos experiencia, conocimiento del mercado y acompañamiento profesional para orientar a clientes durante cada etapa del proceso.",
  },
  {
    icon: ClipboardList,
    title: "Proceso ordenado",
    description:
      "Trabajamos con un proceso ordenado que incluye comercialización, promoción, atención y filtro de prospectos, revisión de documentación y seguimiento, además de acompañamiento jurídico cuando corresponde.",
  },
  {
    icon: ShieldCheck,
    title: "Orden, claridad y respaldo",
    description:
      "Nuestro objetivo es que cada operación se lleve a cabo con orden, claridad y el respaldo necesario, cuidando tanto el proceso como el patrimonio involucrado.",
  },
]

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      {/* Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="pt-28 md:pt-32 pb-12 md:pb-16"
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.p
            variants={fadeInUp}
            className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-4"
          >
            Sobre nosotros
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            WS Asesoría Inmobiliaria
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4"
          >
            Somos un equipo profesional que acompaña a quienes buscan comprar o rentar una
            propiedad, así como a propietarios que desean vender o poner su propiedad en renta.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Más que publicar propiedades, acompañamos cada operación con experiencia, orden y
            atención profesional.
          </motion.p>

          {/* Diagrama de servicios */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Nuestros servicios
            </p>
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center">
              <div className="shrink-0 rounded-2xl bg-primary text-white px-6 py-4 text-center shadow-md">
                <p className="text-lg font-extrabold leading-tight">WS</p>
                <p className="text-[11px] text-white/85 leading-tight">Asesoría Inmobiliaria</p>
              </div>
              <div className="hidden md:block w-10 h-px bg-slate-300 dark:bg-slate-600 shrink-0 self-center" />
              <div className="flex flex-col gap-2.5 mt-5 md:mt-0 md:border-l-2 border-slate-200 dark:border-slate-700">
                {servicios.map((servicio) => (
                  <div
                    key={servicio.label}
                    className="relative flex items-center gap-2 py-2 pl-6 pr-4 rounded-xl bg-card border border-slate-200 dark:border-slate-800 shadow-sm w-fit before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 md:before:w-4 before:h-px before:bg-slate-300 dark:before:bg-slate-600 before:content-['']"
                  >
                    <servicio.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{servicio.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Rentas */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
          >
            Rentas que van más allá de publicar una propiedad
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6"
          >
            Cuando un propietario nos confía una propiedad para renta, nuestro trabajo comienza
            mucho antes de encontrar a un inquilino.
          </motion.p>

          <motion.div variants={fadeInUp} className="bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Proceso de renta
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Asesoramos al propietario durante todo el proceso:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {rentaSteps.map((step) => (
                <span
                  key={step}
                  className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-background px-4 py-1.5 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {step}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Con acompañamiento de nuestro equipo jurídico.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 space-y-4">
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Realizamos un proceso de filtro y revisión, damos seguimiento al proceso para que el
              propietario tenga mayor claridad y respaldo durante la operación.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Nosotros nos ocupamos del proceso inmobiliario; el propietario conserva la tranquilidad
              de saber que su propiedad está siendo atendida profesionalmente.
            </p>
          </motion.div>

          <motion.blockquote
            variants={fadeInUp}
            className="mt-6 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <Quote className="w-8 h-8 text-primary/40 mb-3" />
            <p className="text-base md:text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed">
              Porque para nosotros, rentar una propiedad no consiste solamente en encontrar a alguien
              que la ocupe. Se trata de cuidar el proceso, filtrar adecuadamente y proteger la
              relación entre propietario e inquilino.
            </p>
          </motion.blockquote>
        </div>
      </motion.section>

      {/* Venta */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="py-16 md:py-20"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
          >
            Vender una propiedad es más que publicarla
          </motion.h2>
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Cuando un propietario nos confía una propiedad para venta, lo asesoramos durante todo
              el proceso: desde definir una estrategia de comercialización y, cuando corresponde,
              realizar una Estimación de valor para orientar el precio, hasta la promoción, atención
              y filtro de prospectos.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              También damos seguimiento a la revisión de la documentación, identificando lo que debe
              estar en orden para avanzar con la operación, y acompañamos al propietario durante las
              distintas etapas del proceso de venta, con respaldo y acompañamiento jurídico cuando
              corresponde.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Por qué trabajar con WS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="py-16 md:py-20 bg-black text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              ¿Por qué trabajar con WS?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-300 leading-relaxed">
              Porque una operación inmobiliaria requiere más que mostrar una propiedad y publicarla.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {razones.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-white/10 hover:bg-white/15 p-6 rounded-2xl border border-white/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Equipo — credenciales */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 md:py-20 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8"
          >
            Nuestro Equipo
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-sm"
          >
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 w-36" />
                  <th className="p-4 align-top">
                    <span className="block font-bold text-slate-900 dark:text-slate-100">
                      Lic. Wendy Guadalupe Sánchez Villalobos
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      Directora General | Asesora Inmobiliaria
                    </span>
                  </th>
                  <th className="p-4 align-top">
                    <span className="block font-bold text-slate-900 dark:text-slate-100">
                      C.P. Jose Luis Peraza Peraza
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      Director de Finanzas y Operaciones | Asesor Inmobiliario
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    INAPIM
                  </td>
                  <td className="p-4 align-top">
                    Socio de INAPIM — Instituto Nacional de Asesores Profesionales Inmobiliarios de
                    México
                  </td>
                  <td className="p-4 align-top">
                    Socio de INAPIM — Instituto Nacional de Asesores Profesionales Inmobiliarios de
                    México
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    Licencia inmobiliaria
                  </td>
                  <td className="p-4 align-top">REAI-INSEJUPY-A-00027</td>
                  <td className="p-4 align-top">REAI-INSEJUPY-EN PROCESO</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    Folio CONOCER
                  </td>
                  <td className="p-4 align-top">D-0038946223</td>
                  <td className="p-4 align-top text-muted-foreground">—</td>
                </tr>
                <tr>
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    Certificación
                  </td>
                  <td className="p-4 align-top">EC0110.02</td>
                  <td className="p-4 align-top">EC0110.02</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900"
      >
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
          >
            ¿Listo para empezar?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-muted-foreground leading-relaxed mb-8"
          >
            Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              asChild
              className="h-12 px-8 rounded-2xl text-base font-semibold bg-card text-card-foreground border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-card hover:shadow-lg hover:-translate-y-0.5 dark:hover:bg-black/65 transition-all duration-300"
            >
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contacto
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
