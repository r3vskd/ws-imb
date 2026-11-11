"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { REAL_PROPERTIES, Property } from "@/lib/properties"
import { trackMetaEvent } from "@/components/analytics/meta-pixel"
import { Testimonials } from "@/components/cuicui/testimonials"
import { TestimonialCard } from "@/components/cuicui/testimony-card"
import BlurryBlob from "@/components/animata/background/blurry-blob"
import { LazyGlobe } from "@/components/eldoraui/lazy-globe"
import { BlurIn, BlurInText } from "@/components/eldoraui/blur-in-text"
import HeroMorph from "@/components/landing/hero-morph"
import { DragToSlide } from "@/components/ui/drag-to-slide"
import { ContactForm } from "@/components/forms/contact-form"
import { useLocale } from "@/lib/i18n"
import { dict, localizePropertyTitle } from "@/lib/i18n-dict"
import {
  Home,
  Building2,
  Building,
  Search,
  Bath,
  BedDouble,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react'

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

/**
 * Reveal variants without opacity: cards carrying backdrop-filter must never
 * inherit a transparent ancestor, otherwise the compositor can drop them.
 */
const revealUp = {
  hidden: { y: 18 },
  visible: {
    y: 0,
    transition: { duration: 0.5 }
  }
}

const staggerReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

import Link from "next/link"
import { AdvisorSelectorModal } from "@/components/layout/advisor-selector-modal"

const PROPERTY_CARD_ASPECTS = [
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[3/2]",
  "aspect-[4/3]",
]

const services = [
  {
    icon: Search,
    title: { es: "Compra", en: "Buying" },
    description: {
      es: "Te ayudamos a encontrar la propiedad ideal según tus necesidades y presupuesto. Análisis de mercado, visitas y negociación incluidas.",
      en: "We help you find the ideal property for your needs and budget. Market analysis, visits and negotiation included.",
    },
    features: [
      { es: "Análisis de mercado", en: "Market analysis" },
      { es: "Visitas", en: "Visits" },
      { es: "Negociación", en: "Negotiation" },
    ],
  },
  {
    icon: Building2,
    title: { es: "Venta", en: "Selling" },
    description: {
      es: "Estrategia de comercialización, promoción profesional, filtro de prospectos y seguimiento hasta el cierre de la operación.",
      en: "Sales strategy, professional promotion, lead screening and follow-up through closing.",
    },
    features: [
      { es: "Comercialización", en: "Marketing" },
      { es: "Promoción", en: "Promotion" },
      { es: "Filtro de prospectos", en: "Lead screening" },
    ],
  },
  {
    icon: Home,
    title: { es: "Renta", en: "Rentals" },
    description: {
      es: "Publicación, filtrado de candidatos, revisión documental, contrato y acompañamiento durante toda la relación de arrendamiento.",
      en: "Listing, tenant screening, document review, contract and support throughout the lease.",
    },
    features: [
      { es: "Publicación", en: "Listing" },
      { es: "Revisión documental", en: "Document review" },
      { es: "Contrato", en: "Contract" },
    ],
  },
  {
    icon: Award,
    title: { es: "Opinión de Valor", en: "Value Opinion" },
    description: {
      es: "Estimación profesional del valor de tu propiedad basada en análisis de mercado comparativo y condiciones actuales.",
      en: "Professional estimate of your property's value based on comparative market analysis and current conditions.",
    },
    features: [
      { es: "Estimación", en: "Estimate" },
      { es: "Análisis comparativo", en: "Comparative analysis" },
      { es: "Condiciones actuales", en: "Current conditions" },
    ],
  },
  {
    icon: Building,
    title: { es: "Comercialización", en: "Marketing" },
    description: {
      es: "Promoción integral de tu propiedad en portales inmobiliarios, redes sociales y nuestra base de datos calificada.",
      en: "Full promotion of your property on real-estate portals, social media and our qualified database.",
    },
    features: [
      { es: "Portales inmobiliarios", en: "Real-estate portals" },
      { es: "Redes sociales", en: "Social media" },
      { es: "Base de datos", en: "Database" },
    ],
  },
  {
    icon: ShieldCheck,
    title: { es: "Asesoría Integral", en: "Comprehensive Advisory" },
    description: {
      es: "Revisión documental, acompañamiento jurídico, inventario de entrega y seguimiento post-operación.",
      en: "Document review, legal support, handover inventory and post-transaction follow-up.",
    },
    features: [
      { es: "Revisión documental", en: "Document review" },
      { es: "Acompañamiento jurídico", en: "Legal support" },
      { es: "Inventario", en: "Inventory" },
    ],
  },
]

const testimonials = [
  {
    content: {
      es: "Excelente persona y como asesora inmobiliaria, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sánchez.",
      en: "Excellent person and real-estate advisor — the seriousness and professionalism in her work is why I highly recommend Wendy Sánchez.",
    },
    author: "Denisse Aznar, Propietaria|Owner",
  },
  {
    content: {
      es: "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios. Gracias Wendy.",
      en: "Excellent advisor — reliable, kind, with an impeccable screening process when choosing a tenant. Delighted with her services. Thank you, Wendy.",
    },
    author: "Pilar Patrón, Compradora|Buyer",
  },
  {
    content: {
      es: "Muy buena asesora, buscó inquilinos muy buenos para mi propiedad, clara y te resuelve todo. Muy recomendada.",
      en: "Very good advisor — found great tenants for my property, clear and solves everything. Highly recommended.",
    },
    author: "Eddie Ruiz, Propietario|Owner",
  },
  {
    content: {
      es: "Excelente asesora inmobiliaria, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso.",
      en: "Excellent real-estate advisor — I say this from experience; she has managed my properties' rentals for years and the result has always been successful.",
    },
    author: "María Arcila, Cliente Frecuente|Frequent Client",
  },
]

export default function HomePage() {
  const { locale } = useLocale()
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const t = dict

  const [filterType, setFilterType] = React.useState<string>('Todos')
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null)
  const [advisorOpen, setAdvisorOpen] = React.useState(false)

  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expertiseRef, expertiseInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const featuredIds = ['WS038', 'WS047', 'WS051', 'WS052']
  const filteredProperties = REAL_PROPERTIES.filter(prop => {
    if (!featuredIds.includes(prop.id)) return false
    const matchesFilter = filterType === 'Todos' || prop.type === filterType
    return matchesFilter
  })

  const handlePropertyWhatsApp = (property: Property) => {
    trackMetaEvent('ViewContent', {
      content_name: property.title,
      content_type: 'product',
      value: property.price,
      currency: 'MXN',
    })
    setSelectedProperty(property)
  }

  return (
    <div className="landing-page min-h-screen text-foreground overflow-x-hidden">
      <Navbar darkTop />

      {/* Hero Section */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative min-h-[100svh] flex items-center justify-center pt-16"
      >
        <HeroMorph />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/75 to-[#0F1012]/45 backdrop-blur-[2px]" />

        <BlurIn className="relative container mx-auto px-4 text-center text-white py-20 max-md:-translate-y-3">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-md">
            {t.hero.title[locale]}
          </h1>

          <p className="text-lg md:text-xl text-[#D6D7DB] mb-8 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow">
            {t.hero.subtitle[locale]}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <Button
              asChild
              className="group h-11 rounded-md border-0 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/contact" className="no-underline">
                {t.hero.enviarMensaje[locale]}
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              className="group h-11 rounded-md border-0 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/propiedades" className="no-underline">
                {t.hero.verCatalogo[locale]}
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </BlurIn>

        <a
          href="#servicios"
          className="hero-scroll"
          aria-label={t.hero.scrollAria[locale]}
        >
          <span className="hero-scroll-label">{t.hero.explore[locale]}</span>
          <span className="hero-scroll-mouse" aria-hidden="true">
            <span className="hero-scroll-wheel"></span>
          </span>
        </a>
      </motion.section>

      {/* Servicios Section — vertical card marquee */}
      <section id="servicios" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <BlurInText text={t.servicios.titulo[locale]} />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-center">
            {t.servicios.subtitulo[locale]}
          </p>

          <div className="ws-marquee-fade relative mx-auto mt-12 h-[460px] w-full max-w-4xl overflow-hidden">
            <DragToSlide ariaLabel={t.testimonios.drag[locale]} orientation="vertical">
              <div className="services-marquee">
                {[0, 1].map((setIndex) => (
                  <div
                    key={setIndex}
                    aria-hidden={setIndex === 1 ? true : undefined}
                  >
                    {services.map((service) => (
                      <article
                        key={service.title.es}
                        className="mb-4 flex items-start gap-4 rounded-2xl border border-border bg-white/30 p-5 backdrop-blur-md transition duration-300 hover:border-foreground/30 dark:border-white/10 dark:bg-[#141416] dark:backdrop-blur-none dark:hover:border-zinc-700"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground dark:bg-white/5 dark:text-white">
                          <service.icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold tracking-tight text-foreground dark:text-white">
                            {service.title[locale]}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground dark:text-white/60">
                            {service.description[locale]}
                          </p>
                          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground dark:text-white/35">
                            {service.features.map((f) => f[locale]).join(" · ")}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </DragToSlide>
          </div>
        </div>
      </section>

      {/* Fused services & categories — PrebuiltUI blog grid */}
      <section
        id="featured"
        className="scroll-mt-24 relative overflow-hidden font-geist text-foreground"
      >
        <div
          aria-hidden
          className="absolute inset-0 hidden dark:block ws-black-surface"
        ></div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:flex items-center justify-center overflow-hidden"
        >
          <BlurryBlob
            firstBlobColor="bg-white/20"
            secondBlobColor="bg-zinc-500/20"
            className="h-96 w-96"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-10 sm:py-12">
          <div className="flex flex-col items-center mb-8 text-center">
            <span className="border border-border bg-foreground/5 text-sm px-6 py-1.5 rounded-full mb-5 dark:border-transparent dark:bg-zinc-800">
              {t.fused.badge[locale]}
            </span>
            <BlurIn>
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-medium max-w-[530px] leading-tight">
                {t.fused.titulo[locale]}
              </h2>
            </BlurIn>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Rentar */}
            <article
              id="rentar"
              className="border border-border rounded-[18px] flex flex-col group bg-white/30 backdrop-blur-md hover:border-foreground/30 transition duration-300 row-span-1 lg:row-span-2 h-full overflow-hidden hover:-translate-y-1 dark:border-zinc-800 dark:bg-transparent dark:backdrop-blur-none dark:hover:border-zinc-700"
            >
              <div className="relative w-full flex-1 min-h-52 overflow-hidden rounded-2xl">
                <img
                  src="/images/casa2.jpg"
                  alt="Propiedades en renta"
                  className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">{t.fused.renta[locale]}</span>
                  <div className="w-px h-3 bg-foreground/20 dark:bg-white"></div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 1.5h3m-1.5 9 2.25-2.25M9 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">{t.rentSteps.length} {t.fused.pasos[locale]}</span>
                  </div>
                </div>
                <h3 className="text-lg/6.5 font-medium max-w-[360px] mb-3">
                  {t.fused.rentarTitulo[locale]}
                </h3>
                <p className="text-sm/5 text-muted-foreground dark:text-white/80 font-light mb-5 max-w-[370px]">
                  {t.fused.rentarDesc[locale]}
                </p>
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.rentSteps.map((step) => (
                    <div key={step.es} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground dark:text-white/60"
                        aria-hidden
                      />
                      <span className="text-xs leading-relaxed text-muted-foreground dark:text-white/70">
                        {step[locale]}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => setAdvisorOpen(true)}
                  className="group h-9 w-fit rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
                >
                  <MessageCircle className="mr-2 size-4" />
                  {t.fused.rentarMiPropiedad[locale]}
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </article>

            {/* Vender */}
            <article
              id="vender"
              className="border border-border rounded-[18px] flex flex-col sm:flex-row gap-5 group bg-white/30 backdrop-blur-md hover:border-foreground/30 transition duration-300 overflow-hidden hover:-translate-y-1 dark:border-zinc-800 dark:bg-transparent dark:backdrop-blur-none dark:hover:border-zinc-700"
            >
              <img
                src="/images/casa1.jpg"
                alt="Propiedades en venta"
                className="w-full sm:w-[220px] lg:w-[260px] h-48 sm:h-auto object-cover rounded-2xl"
              />
              <div className="flex flex-col py-3 md:py-5 pr-2 max-md:pl-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">{t.fused.venta[locale]}</span>
                  <div className="w-px h-3 bg-foreground/20 dark:bg-white"></div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 1.5h3m-1.5 9 2.25-2.25M9 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">{t.sellSteps.length} {t.fused.pasos[locale]}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-3">
                  {t.fused.venderTitulo[locale]}
                </h3>
                <p className="text-sm/5 text-muted-foreground dark:text-white/80 font-light mb-4">
                  {t.fused.venderDesc[locale]}
                </p>
                <div className="mb-5 space-y-1.5">
                  {t.sellSteps.map((step) => (
                    <div key={step.es} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground dark:text-white/60"
                        aria-hidden
                      />
                      <span className="text-xs leading-relaxed text-muted-foreground dark:text-white/70">
                        {step[locale]}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => setAdvisorOpen(true)}
                  className="group mt-auto h-9 w-fit rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
                >
                  <MessageCircle className="mr-2 size-4" />
                  {t.fused.venderMiPropiedad[locale]}
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </article>

            {/* Categorías */}
            <article className="border border-border rounded-[18px] flex flex-col sm:flex-row gap-5 group bg-white/30 backdrop-blur-md hover:border-foreground/30 transition duration-300 overflow-hidden hover:-translate-y-1 dark:border-zinc-800 dark:bg-transparent dark:backdrop-blur-none dark:hover:border-zinc-700">
              <img
                src="/images/map.webp"
                alt="Mapa de zonas destacadas en Mérida"
                className="w-full sm:w-[220px] lg:w-[260px] h-48 sm:h-auto object-cover rounded-2xl"
              />
              <div className="flex flex-col py-3 md:py-5 pr-2 max-md:pl-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">{t.fused.zonas[locale]}</span>
                  <div className="w-px h-3 bg-foreground/20 dark:bg-white"></div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-[18px]" aria-hidden />
                    <span className="text-sm">2 {t.fused.categorias[locale]}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-3">
                  {t.fused.zonasTitulo[locale]}
                </h3>
                <p className="text-sm/5 text-muted-foreground dark:text-white/80 font-light mb-4">
                  {t.fused.zonasDesc[locale]}
                </p>

                <div className="mb-5 space-y-3">
                  <div className="rounded-xl border border-border p-3 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Home className="size-4" aria-hidden />
                      <span className="text-sm font-medium">{t.fused.ventas[locale]}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground dark:text-white/60">
                      {t.fused.ventasDesc[locale]}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold">{t.fused.desde2m[locale]}</span>
                      <Button
                        asChild
                        className="group h-9 w-full rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20 sm:w-auto"
                      >
                        <Link
                          href="/propiedades?tipo=ventas"
                          className="no-underline"
                        >
                          <Search className="mr-2 size-4" />
                          {t.fused.buscarCatalogo[locale]}
                          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-3 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" aria-hidden />
                      <span className="text-sm font-medium">{t.fused.rentas[locale]}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground dark:text-white/60">
                      {t.fused.rentasDesc[locale]}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold">
                        {t.fused.desde5k[locale]}
                      </span>
                      <Button
                        asChild
                        className="group h-9 w-full rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20 sm:w-auto"
                      >
                        <Link
                          href="/propiedades?tipo=rentas"
                          className="no-underline"
                        >
                          <Search className="mr-2 size-4" />
                          {t.fused.buscarCatalogo[locale]}
                          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-8 sm:mt-10">
            <Button
              asChild
              className="group h-9 w-fit rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
            >
              <Link href="/propiedades" className="no-underline">
                {t.fused.verPropiedades[locale]}
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <motion.section
        id="properties"
        ref={propertiesRef}
        initial="hidden"
        animate={propertiesInView ? "visible" : "hidden"}
        variants={staggerReveal}
        className="scroll-mt-24 py-8 sm:py-10"
      >
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <BlurIn>
                <h2 className="text-3xl font-bold tracking-tight">
                  {t.destacadas.titulo[locale]}
                </h2>
              </BlurIn>
              <p className="text-muted-foreground mt-1">
                {t.destacadas.subtitulo[locale]}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {([
                { value: 'Todos', label: t.destacadas.todos[locale] },
                { value: 'Venta', label: t.fused.venta[locale] },
                { value: 'Renta', label: t.fused.renta[locale] },
              ]).map(({ value, label }) => (
                <Button
                  key={value}
                  variant={filterType === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(value)}
                  className={`rounded-full border-0 font-medium transition-all duration-200 ${
                    filterType === value
                      ? 'ws-black-surface text-white hover:bg-[#1b1b1d]'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="columns-1 gap-3 sm:gap-4 md:columns-2">
            {filteredProperties.map((property, index) => (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`group relative mb-3 min-h-[15rem] break-inside-avoid overflow-hidden rounded-xl sm:mb-4 max-md:aspect-auto ${
                  PROPERTY_CARD_ASPECTS[index % PROPERTY_CARD_ASPECTS.length]
                }`}
              >
                <img
                  src={
                    property.image ||
                    (property.type === 'Venta'
                      ? '/ventas-placeholder.jpg'
                      : '/rentas-placeholder.jpg')
                  }
                  alt={localizePropertyTitle(property.title, locale)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                <div className="relative flex h-full flex-col justify-between p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                      {property.type === 'Venta' ? t.propiedades.typeVenta[locale] : t.propiedades.typeRenta[locale]}
                    </span>
                    {property.featured && (
                      <span className="rounded-full border-0 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        {t.destacadas.destacado[locale]}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                      <MapPin className="size-3.5" aria-hidden />
                      {property.zone}
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl md:text-2xl">
                      {localizePropertyTitle(property.title, locale)}
                    </h3>
                    <p className="mt-2 text-base font-bold text-white sm:text-lg">
                      {property.price}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/80">
                      {property.bedrooms > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <BedDouble className="size-4" aria-hidden />
                          {property.bedrooms} {t.destacadas.habs[locale]}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Bath className="size-4" aria-hidden />
                        {property.bathrooms} {t.destacadas.banos[locale]}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Home className="size-4" aria-hidden />
                        {property.constructionArea}
                      </span>
                    </div>

                    <Button
                      onClick={() => handlePropertyWhatsApp(property)}
                      className="group mt-4 h-9 w-fit rounded-md border-0 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <MessageCircle className="mr-2 size-4" />
                      {t.destacadas.consultarWhatsApp[locale]}
                      <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section
        id="expertise"
        ref={expertiseRef}
        initial="hidden"
        animate={expertiseInView ? "visible" : "hidden"}
        variants={staggerReveal}
        className="scroll-mt-24 relative overflow-hidden text-foreground"
      >
        <div aria-hidden className="absolute inset-0 hidden dark:block ws-black-surface"></div>
        <div className="relative z-10 flex items-center justify-center px-4 py-16">
          <div className="max-w-[1100px] w-full">
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-sm text-foreground border border-border px-5 py-1 rounded-full dark:text-slate-50 dark:border-zinc-800">
                {t.expertise.badge[locale]}
              </span>
              <BlurIn>
                <h2 className="text-4xl font-medium text-foreground mt-5">
                  {t.expertise.titulo[locale]}
                </h2>
              </BlurIn>
              <p className="text-sm text-muted-foreground dark:text-white mt-2 max-w-xl">
                {t.expertise.subtitulo[locale]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  image: "/images/juridico.jpg",
                  tag: t.expertise.confianza[locale],
                  note: t.expertise.revisionDocumental[locale],
                  title: t.expertise.certezaTitulo[locale],
                  description: t.expertise.certezaDesc[locale],
                },
                {
                  icon: Award,
                  image: "/images/experiencia.jpg",
                  tag: t.expertise.trayectoria[locale],
                  note: t.expertise.sieteAnios[locale],
                  title: t.expertise.experienciaTitulo[locale],
                  description: t.expertise.experienciaDesc[locale],
                },
                {
                  icon: CheckCircle2,
                  image: "/images/filtrado.webp",
                  tag: t.expertise.proteccion[locale],
                  note: t.expertise.prospectos[locale],
                  title: t.expertise.filtradoTitulo[locale],
                  description: t.expertise.filtradoDesc[locale],
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={revealUp}
                  className="group rounded-2xl border border-border bg-white/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 dark:border-zinc-800 dark:bg-transparent dark:backdrop-blur-none dark:hover:border-zinc-700"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover rounded-2xl mb-5 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex items-center gap-4 mb-2 px-2">
                    <p className="text-xs text-muted-foreground dark:text-zinc-200">{item.tag}</p>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-3 text-muted-foreground dark:text-zinc-300" aria-hidden />
                      <span className="text-xs text-muted-foreground dark:text-zinc-200">{item.note}</span>
                    </div>
                  </div>
                  <h3 className="px-2 text-base/6 font-medium text-foreground max-w-2xs">
                    {item.title}
                  </h3>
                  <p className="mt-2 px-2 pb-2 text-sm/5 font-light text-muted-foreground dark:text-zinc-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                href="/sobre-nosotros"
                className="group flex items-center gap-2 rounded-lg border-0 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 dark:text-white"
              >
                {t.expertise.conoceAsesoria[locale]}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Presencia — Cobe globe */}
      <section id="cifras" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
            {t.presencia.titulo[locale]}
          </h2>
          <div className="relative z-10 mt-10 h-[380px] w-full overflow-hidden sm:h-[560px] md:h-[600px]">
            <LazyGlobe />
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Testimonials
            title={t.testimonios.titulo[locale]}
            subtitle={t.testimonios.subtitulo[locale]}
            testimonials={testimonials.map((x) => ({
              content: x.content[locale],
              author: x.author.split('|')[locale === 'en' ? 1 : 0],
            }))}
          />
        </div>
      </section>

      {/* Equipo Section */}
      <motion.section
        id="equipo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerReveal}
        className="scroll-mt-24 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <BlurIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.equipo.titulo[locale]}
              </h2>
            </BlurIn>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.equipo.subtitulo[locale]}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-6 md:grid-cols-2">
            <TestimonialCard
              avatar="/team/wendy.svg"
              name="Lic. Wendy Guadalupe Sánchez Villalobos"
              position={t.team.wendyPosition[locale]}
              message={t.team.wendyMessage[locale]}
            >
              <div className="flex flex-wrap gap-1.5">
                {t.team.wendyChips.map((cred) => (
                  <span
                    key={cred.es}
                    className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-600/50 dark:text-neutral-300"
                  >
                    {cred[locale]}
                  </span>
                ))}
              </div>
            </TestimonialCard>

            <TestimonialCard
              avatar="/team/jose.svg"
              name="C.P. José Luis Peraza Peraza"
              position={t.team.josePosition[locale]}
              message={t.team.joseMessage[locale]}
            >
              <div className="flex flex-wrap gap-1.5">
                {t.team.joseChips.map((cred) => (
                  <span
                    key={cred.es}
                    className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-600/50 dark:text-neutral-300"
                  >
                    {cred[locale]}
                  </span>
                ))}
              </div>
            </TestimonialCard>
          </div>
        </div>
      </motion.section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t.formulario.titulo[locale]}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.formulario.subtitulo[locale]}
            </p>
          </div>
          <ContactForm className="contact-form w-full transition-colors duration-300 hover:border-foreground/30 dark:hover:border-zinc-700" />
        </div>
      </section>

      {/* CTA Final */}
      <motion.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="scroll-mt-24 ws-grain ws-grain-fade py-20"
      >
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.cta.titulo[locale]}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground dark:text-[#B4B6BC] max-w-2xl mx-auto mb-10 text-lg">
            {t.cta.subtitulo[locale]}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="group h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
            >
              <a
                href="https://wa.me/529992284783"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <MessageCircle className="mr-2 size-4" />
                {t.cta.contacto[locale]}
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              onClick={() => setAdvisorOpen(true)}
              className="group h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
            >
              <Building className="mr-2 size-4" />
              {t.cta.vender[locale]}
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => setAdvisorOpen(true)}
              className="group h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20"
            >
              <Home className="mr-2 size-4" />
              {t.cta.rentar[locale]}
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <AdvisorSelectorModal
        isOpen={!!selectedProperty || advisorOpen}
        onClose={() => {
          setSelectedProperty(null)
          setAdvisorOpen(false)
        }}
        propertyTitle={selectedProperty?.title}
        propertyPrice={selectedProperty?.price}
      />

      <Footer />
    </div>
  )
}
