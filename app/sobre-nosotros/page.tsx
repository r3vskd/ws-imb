"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  ClipboardList,
  Handshake,
  Home,
  KeyRound,
  Megaphone,
  MessageCircle,
  Quote,
  ShieldCheck,
  Tag,
} from "lucide-react"

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
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_1.png",
    tag: "Experiencia",
    note: "Acompañamiento",
    title: "Experiencia y acompañamiento",
    description:
      "En WS combinamos experiencia, conocimiento del mercado y acompañamiento profesional para orientar a clientes durante cada etapa del proceso.",
  },
  {
    icon: ClipboardList,
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_2.png",
    tag: "Proceso",
    note: "Orden y claridad",
    title: "Proceso ordenado",
    description:
      "Trabajamos con un proceso ordenado que incluye comercialización, promoción, atención y filtro de prospectos, revisión de documentación y seguimiento, además de acompañamiento jurídico cuando corresponde.",
  },
  {
    icon: ShieldCheck,
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_3.png",
    tag: "Respaldo",
    note: "Certeza",
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
        className="relative overflow-hidden text-white"
      >
        <div aria-hidden className="absolute inset-0 ws-black-surface" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-28 text-center md:pb-16 md:pt-32">
          <motion.p
            variants={fadeInUp}
            className="mb-5 inline-flex rounded-full border border-zinc-800 px-5 py-1 text-sm text-slate-50"
          >
            Sobre nosotros
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            WS Asesoría Inmobiliaria
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-4"
          >
            Somos un equipo profesional que acompaña a quienes buscan comprar o rentar una
            propiedad, así como a propietarios que desean vender o poner su propiedad en renta.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            Más que publicar propiedades, acompañamos cada operación con experiencia, orden y
            atención profesional.
          </motion.p>

          {/* Diagrama de servicios */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-6">
              Nuestros servicios
            </p>
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center">
              <div className="shrink-0 rounded-2xl ws-black-surface border border-white/10 px-6 py-4 text-center shadow-md">
                <p className="text-lg font-extrabold leading-tight text-white">WS</p>
                <p className="text-[11px] text-white/60 leading-tight">Asesoría Inmobiliaria</p>
              </div>
              <div className="hidden md:block w-10 h-px bg-white/15 shrink-0 self-center" />
              <div className="flex flex-col gap-2.5 mt-5 md:mt-0 md:border-l-2 border-white/15">
                {servicios.map((servicio) => (
                  <div
                    key={servicio.label}
                    className="relative flex items-center gap-2 py-2 pl-6 pr-4 rounded-xl bg-white/[0.04] border border-white/10 shadow-sm w-fit before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 md:before:w-4 before:h-px before:bg-white/15 before:content-['']"
                  >
                    <servicio.icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{servicio.label}</span>
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
        className="py-16 md:py-20"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-5 text-foreground"
          >
            Rentas que van más allá de publicar una propiedad
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-muted-foreground leading-relaxed mb-6"
          >
            Cuando un propietario nos confía una propiedad para renta, nuestro trabajo comienza
            mucho antes de encontrar a un inquilino.
          </motion.p>

          <motion.div variants={fadeInUp} className="bg-card border border-border rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Proceso de renta
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Asesoramos al propietario durante todo el proceso:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {rentaSteps.map((step) => (
                <span
                  key={step}
                  className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs md:text-sm font-medium text-muted-foreground"
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
            <p className="text-base text-muted-foreground leading-relaxed">
              Realizamos un proceso de filtro y revisión, damos seguimiento al proceso para que el
              propietario tenga mayor claridad y respaldo durante la operación.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Nosotros nos ocupamos del proceso inmobiliario; el propietario conserva la tranquilidad
              de saber que su propiedad está siendo atendida profesionalmente.
            </p>
          </motion.div>

          <motion.blockquote
            variants={fadeInUp}
            className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <Quote className="w-8 h-8 text-foreground/30 mb-3" />
            <p className="text-base md:text-lg italic text-muted-foreground leading-relaxed">
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
            className="text-2xl md:text-3xl font-bold tracking-tight mb-5 text-foreground"
          >
            Vender una propiedad es más que publicarla
          </motion.h2>
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              Cuando un propietario nos confía una propiedad para venta, lo asesoramos durante todo
              el proceso: desde definir una estrategia de comercialización y, cuando corresponde,
              realizar una Estimación de valor para orientar el precio, hasta la promoción, atención
              y filtro de prospectos.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
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
        className="relative overflow-hidden text-white"
      >
        <div aria-hidden className="absolute inset-0 ws-black-surface" />
        <div className="relative z-10 flex items-center justify-center px-4 py-16">
          <div className="max-w-[1100px] w-full">
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center mb-10"
            >
              <span className="text-sm text-slate-50 border border-zinc-800 px-5 py-1 rounded-full">
                Confianza
              </span>
              <h2 className="text-4xl font-medium text-white mt-5">
                ¿Por qué trabajar con WS?
              </h2>
              <p className="text-sm text-white mt-2 max-w-xl">
                Porque una operación inmobiliaria requiere más que mostrar una propiedad y publicarla.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {razones.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="group transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full object-cover rounded-2xl mb-5 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex items-center gap-4 mb-2">
                    <p className="text-xs text-zinc-200">{item.tag}</p>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-3 text-zinc-300" aria-hidden />
                      <span className="text-xs text-zinc-200">{item.note}</span>
                    </div>
                  </div>
                  <h3 className="text-base/6 font-medium text-white max-w-2xs">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm/5 font-light text-zinc-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                asChild
                className="h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/contact" className="no-underline">
                  Hablemos de tu propiedad
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Equipo — credenciales */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 md:py-20"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 text-foreground"
          >
            Nuestro Equipo
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="overflow-x-auto rounded-2xl border border-border bg-card"
          >
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 w-36" />
                  <th className="p-4 align-top">
                    <span className="block font-bold text-foreground">
                      Lic. Wendy Guadalupe Sánchez Villalobos
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      Directora General | Asesora Inmobiliaria
                    </span>
                  </th>
                  <th className="p-4 align-top">
                    <span className="block font-bold text-foreground">
                      C.P. Jose Luis Peraza Peraza
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      Director de Finanzas y Operaciones | Asesor Inmobiliario
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    INAPIM
                  </td>
                  <td className="p-4 align-top">
                    Asesor Inmobiliario Certificado INAPIM — Instituto Nacional de Asesores Profesionales Inmobiliarios de
                    México
                  </td>
                  <td className="p-4 align-top">
                    Asesor Inmobiliario Certificado INAPIM — Instituto Nacional de Asesores Profesionales Inmobiliarios de
                    México
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    Licencia inmobiliaria
                  </td>
                  <td className="p-4 align-top">REAI-INSEJUPY-A-00027</td>
                  <td className="p-4 align-top">EN PROCESO</td>
                </tr>
                <tr className="border-b border-border">
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
        className="ws-grain ws-grain-fade py-20"
      >
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white"
          >
            ¿Listo para empezar?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-white/70 leading-relaxed mb-8"
          >
            Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              asChild
              className="h-9 rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/contact" className="no-underline">
                <MessageCircle className="mr-2 size-4" />
                Contacto
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
