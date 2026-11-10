"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useLocale } from "@/lib/i18n"
import { dict } from "@/lib/i18n-dict"
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

const s = dict.sobre

const servicios = [
  { icon: Home, label: s.servicioCompra },
  { icon: Tag, label: s.servicioVenta },
  { icon: KeyRound, label: s.servicioRenta },
  { icon: Megaphone, label: s.servicioComercializacion },
  { icon: Handshake, label: s.servicioAsesoria },
]

const razones = [
  {
    icon: Award,
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_1.png",
    tag: s.razon1Tag,
    note: s.razon1Note,
    title: s.razon1Title,
    description: s.razon1Desc,
  },
  {
    icon: ClipboardList,
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_2.png",
    tag: s.razon2Tag,
    note: s.razon2Note,
    title: s.razon2Title,
    description: s.razon2Desc,
  },
  {
    icon: ShieldCheck,
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_3.png",
    tag: s.razon3Tag,
    note: s.razon3Note,
    title: s.razon3Title,
    description: s.razon3Desc,
  },
]

export default function SobreNosotrosPage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar darkTop />

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
            {s.badge[locale]}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            {s.titulo[locale]}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-4"
          >
            {s.intro1[locale]}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            {s.intro2[locale]}
          </motion.p>

          {/* Diagrama de servicios */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-6">
              {s.serviciosLabel[locale]}
            </p>
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center">
              <div className="shrink-0 rounded-2xl ws-black-surface border border-white/10 px-6 py-4 text-center shadow-md">
                <p className="text-lg font-extrabold leading-tight text-white">WS</p>
                <p className="text-[11px] text-white/60 leading-tight">{s.brandSub[locale]}</p>
              </div>
              <div className="hidden md:block w-10 h-px bg-white/15 shrink-0 self-center" />
              <div className="flex flex-col gap-2.5 mt-5 md:mt-0 md:border-l-2 border-white/15">
                {servicios.map((servicio) => (
                  <div
                    key={servicio.label.es}
                    className="relative flex items-center gap-2 py-2 pl-6 pr-4 rounded-xl bg-white/[0.04] border border-white/10 shadow-sm w-fit before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 md:before:w-4 before:h-px before:bg-white/15 before:content-['']"
                  >
                    <servicio.icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{servicio.label[locale]}</span>
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
            {s.rentasTitulo[locale]}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-muted-foreground leading-relaxed mb-6"
          >
            {s.rentasP1[locale]}
          </motion.p>

          <motion.div variants={fadeInUp} className="bg-card border border-border rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {s.procesoLabel[locale]}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {s.procesoIntro[locale]}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {s.rentaSteps.map((step) => (
                <span
                  key={step.es}
                  className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs md:text-sm font-medium text-muted-foreground"
                >
                  {step[locale]}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {s.procesoNote[locale]}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              {s.rentasP2[locale]}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {s.rentasP3[locale]}
            </p>
          </motion.div>

          <motion.blockquote
            variants={fadeInUp}
            className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <Quote className="w-8 h-8 text-foreground/30 mb-3" />
            <p className="text-base md:text-lg italic text-muted-foreground leading-relaxed">
              {s.quote[locale]}
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
            {s.ventaTitulo[locale]}
          </motion.h2>
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              {s.ventaP1[locale]}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {s.ventaP2[locale]}
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
                {s.whyBadge[locale]}
              </span>
              <h2 className="text-4xl font-medium text-white mt-5">
                {s.whyTitulo[locale]}
              </h2>
              <p className="text-sm text-white mt-2 max-w-xl">
                {s.whyP[locale]}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {razones.map((item) => (
                <motion.div
                  key={item.title.es}
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
                    <p className="text-xs text-zinc-200">{item.tag[locale]}</p>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-3 text-zinc-300" aria-hidden />
                      <span className="text-xs text-zinc-200">{item.note[locale]}</span>
                    </div>
                  </div>
                  <h3 className="text-base/6 font-medium text-white max-w-2xs">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm/5 font-light text-zinc-300">
                    {item.description[locale]}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                asChild
                className="group h-9 w-fit rounded-md border-0 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/contact" className="no-underline">
                  {s.whyCta[locale]}
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
            {s.teamTitulo[locale]}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="overflow-x-auto rounded-2xl border border-border bg-card"
          >
            <table className="w-full min-w-[42rem] text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 w-36" />
                  <th className="p-4 align-top">
                    <span className="block font-bold text-foreground">
                      Lic. Wendy Guadalupe Sánchez Villalobos
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      {s.wendyRole[locale]}
                    </span>
                  </th>
                  <th className="p-4 align-top">
                    <span className="block font-bold text-foreground">
                      C.P. Jose Luis Peraza Peraza
                    </span>
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      {s.joseRole[locale]}
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
                    {s.inapimDesc[locale]}
                  </td>
                  <td className="p-4 align-top">
                    {s.inapimDesc[locale]}
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    {s.rowLicencia[locale]}
                  </td>
                  <td className="p-4 align-top">REAI-INSEJUPY-A-00027</td>
                  <td className="p-4 align-top">{s.enProceso[locale]}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    {s.rowFolio[locale]}
                  </td>
                  <td className="p-4 align-top">D-0038946223</td>
                  <td className="p-4 align-top text-muted-foreground">—</td>
                </tr>
                <tr>
                  <td className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top">
                    {s.rowCertificacion[locale]}
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
            {s.ctaTitulo[locale]}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-white/70 leading-relaxed mb-8"
          >
            {s.ctaP[locale]}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              asChild
              className="group h-9 rounded-md border-0 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/contact" className="no-underline">
                <MessageCircle className="mr-2 size-4" />
                {s.ctaBoton[locale]}
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
