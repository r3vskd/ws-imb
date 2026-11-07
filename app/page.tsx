"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { REAL_PROPERTIES, Property } from "@/lib/properties"
import { trackMetaEvent } from "@/components/analytics/meta-pixel"
import { Testimonials } from "@/components/cuicui/testimonials"
import { TestimonialCard } from "@/components/cuicui/testimony-card"
import BlurryBlob from "@/components/animata/background/blurry-blob"
import { LazyGlobe } from "@/components/eldoraui/lazy-globe"
import { BlurInText } from "@/components/eldoraui/blur-in-text"
import { ContactForm } from "@/components/forms/contact-form"
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

import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdvisorSelectorModal } from "@/components/layout/advisor-selector-modal"

const rentSteps = [
  "Asesoría inicial y estimación de valor",
  "Promoción profesional en portales y redes",
  "Filtro y calificación de prospectos",
  "Revisión documental y verificación",
  "Elaboración de contrato de arrendamiento",
  "Inventario de entrega y acompañamiento",
  "Seguimiento durante toda la relación",
  "Acompañamiento jurídico cuando corresponde",
]

const sellSteps = [
  "Estrategia de comercialización personalizada",
  "Estimación profesional de valor",
  "Promoción en portales inmobiliarios y redes",
  "Fotografía profesional y recorrido virtual",
  "Atención y filtro de prospectos calificados",
  "Revisión documental y verificación de fondos",
  "Seguimiento de la operación hasta el cierre",
  "Acompañamiento jurídico integral",
]

const PROPERTY_CARD_ASPECTS = [
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[3/2]",
  "aspect-[4/3]",
]

const services = [
  {
    icon: Search,
    title: "Compra",
    description:
      "Te ayudamos a encontrar la propiedad ideal según tus necesidades y presupuesto. Análisis de mercado, visitas y negociación incluidas.",
    features: ["Análisis de mercado", "Visitas", "Negociación"],
  },
  {
    icon: Building2,
    title: "Venta",
    description:
      "Estrategia de comercialización, promoción profesional, filtro de prospectos y seguimiento hasta el cierre de la operación.",
    features: ["Comercialización", "Promoción", "Filtro de prospectos"],
  },
  {
    icon: Home,
    title: "Renta",
    description:
      "Publicación, filtrado de candidatos, revisión documental, contrato y acompañamiento durante toda la relación de arrendamiento.",
    features: ["Publicación", "Revisión documental", "Contrato"],
  },
  {
    icon: Award,
    title: "Opinión de Valor",
    description:
      "Estimación profesional del valor de tu propiedad basada en análisis de mercado comparativo y condiciones actuales.",
    features: ["Estimación", "Análisis comparativo", "Condiciones actuales"],
  },
  {
    icon: Building,
    title: "Comercialización",
    description:
      "Promoción integral de tu propiedad en portales inmobiliarios, redes sociales y nuestra base de datos calificada.",
    features: ["Portales inmobiliarios", "Redes sociales", "Base de datos"],
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Integral",
    description:
      "Revisión documental, acompañamiento jurídico, inventario de entrega y seguimiento post-operación.",
    features: ["Revisión documental", "Acompañamiento jurídico", "Inventario"],
  },
]

const testimonials = [
  {
    content:
      "Excelente persona y como asesora inmobiliaria, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sánchez.",
    author: "Denisse Aznar, Propietaria",
  },
  {
    content:
      "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios. Gracias Wendy.",
    author: "Pilar Patrón, Compradora",
  },
  {
    content:
      "Muy buena asesora, buscó inquilinos muy buenos para mi propiedad, clara y te resuelve todo. Muy recomendada.",
    author: "Eddie Ruiz, Propietario",
  },
  {
    content:
      "Excelente asesora inmobiliaria, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso.",
    author: "María Arcila, Cliente Frecuente",
  },
]

export default function HomePage() {
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  const [filterType, setFilterType] = React.useState<string>('Todos')
  const [searchQuery, setSearchQuery] = React.useState<string>('')
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

  const handleHeroSearch = () => {
    const q = searchQuery.trim()
    if (q) {
      trackMetaEvent('Search', { search_string: q })
    }
    const params = new URLSearchParams()
    params.set('tipo', 'ventas')
    if (q) params.set('q', q)
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative min-h-[90vh] flex items-center justify-center pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/ajVnNQ.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/75 to-[#0F1012]/45 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center text-white py-20"
        >

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-md">
            Encuentra tu propiedad con el mejor equipo de agentes inmobiliarios.
          </h1>

          <p className="text-lg md:text-xl text-[#D6D7DB] mb-8 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow">
            Propiedades en las mejores zonas de Mérida, con un excelente servicio al cliente.<br />
            Mérida Yucatán es una de las ciudades más seguras del mundo, según la reconocida CEOWORLD Magazine y la más segura de México.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); handleHeroSearch() }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20"
          >
            <Input
              type="text"
              placeholder="Buscar por zona (ej. Dzityá, Tixcacal, Temozón)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/90 text-foreground border-none h-12 text-base rounded-xl focus-visible:ring-2 focus-visible:ring-white/40"
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto h-12 ws-black-surface text-white hover:bg-[#1b1b1d] font-semibold rounded-xl px-8 shadow-lg">
              <Search className="mr-2 h-5 w-5" /> Buscar
            </Button>
          </form>
        </motion.div>
      </motion.section>

      {/* Servicios Section — vertical card marquee */}
      <section id="servicios" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <BlurInText text="Nuestros Servicios" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-center">
            Acompañamiento profesional en cada etapa de tu operación inmobiliaria.
          </p>

          <div className="relative mx-auto mt-12 h-[460px] max-w-3xl overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background via-background/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/70 to-transparent" />

            <div className="services-marquee">
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  aria-hidden={setIndex === 1 ? true : undefined}
                >
                  {services.map((service) => (
                    <article
                      key={service.title}
                      className="mb-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-[#141416] p-5"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white">
                        <service.icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight text-white">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/60">
                          {service.description}
                        </p>
                        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white/35">
                          {service.features.join(" · ")}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fused services & categories — PrebuiltUI blog grid */}
      <section
        id="featured"
        className="relative overflow-hidden font-geist text-white"
      >
        <div
          aria-hidden
          className="absolute inset-0 ws-black-surface"
        ></div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <BlurryBlob
            firstBlobColor="bg-white/20"
            secondBlobColor="bg-zinc-500/20"
            className="h-96 w-96"
          />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-14">
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="bg-zinc-800 text-sm px-6 py-1.5 rounded-full mb-5">
              Servicios
            </span>
            <h2 className="text-[40px] font-medium max-w-[530px] leading-tight">
              Renta, venta y zonas destacadas
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rentar */}
            <article
              id="rentar"
              className="border border-zinc-800 rounded-[18px] flex flex-col group hover:border-zinc-700 transition duration-300 row-span-1 md:row-span-2 h-full overflow-hidden hover:-translate-y-1"
            >
              <div className="relative w-full flex-1 min-h-52 overflow-hidden rounded-2xl">
                <img
                  src="/rentas-placeholder.jpg"
                  alt="Propiedades en renta"
                  className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
                />
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">Renta</span>
                  <div className="w-px h-3 bg-white"></div>
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
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">8 pasos</span>
                  </div>
                </div>
                <h3 className="text-lg/6.5 font-medium max-w-[360px] mb-3">
                  ¿Quieres rentar tu propiedad?
                </h3>
                <p className="text-sm/5 text-white/80 font-light mb-5 max-w-[370px]">
                  En WS no solo publicamos tu propiedad. Nos encargamos de todo el
                  proceso para que tú solo disfrutes de los beneficios.
                </p>
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rentSteps.map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-white/60"
                        aria-hidden
                      />
                      <span className="text-xs leading-relaxed text-white/70">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => setAdvisorOpen(true)}
                  className="h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Rentar mi propiedad
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </article>

            {/* Vender */}
            <article
              id="vender"
              className="border border-zinc-800 rounded-[18px] flex flex-col sm:flex-row gap-5 group hover:border-zinc-700 transition duration-300 overflow-hidden hover:-translate-y-1"
            >
              <img
                src="/ventas-placeholder.jpg"
                alt="Propiedades en venta"
                className="w-full sm:w-[220px] lg:w-[260px] h-48 sm:h-auto object-cover rounded-2xl"
              />
              <div className="flex flex-col py-3 md:py-5 pr-2 max-md:pl-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">Venta</span>
                  <div className="w-px h-3 bg-white"></div>
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
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">8 pasos</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-3">
                  ¿Quieres vender tu propiedad?
                </h3>
                <p className="text-sm/5 text-white/80 font-light mb-4">
                  Desarrollamos una estrategia de comercialización personalizada para
                  obtener el mejor valor por tu propiedad.
                </p>
                <div className="mb-5 space-y-1.5">
                  {sellSteps.map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-white/60"
                        aria-hidden
                      />
                      <span className="text-xs leading-relaxed text-white/70">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => setAdvisorOpen(true)}
                  className="mt-auto h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Vender mi propiedad
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </article>

            {/* Categorías */}
            <article className="border border-zinc-800 rounded-[18px] flex flex-col sm:flex-row gap-5 group hover:border-zinc-700 transition duration-300 overflow-hidden hover:-translate-y-1">
              <img
                src="/ajVnNQ.jpg"
                alt="Propiedades en Mérida"
                className="w-full sm:w-[220px] lg:w-[260px] h-48 sm:h-auto object-cover rounded-2xl"
              />
              <div className="flex flex-col py-3 md:py-5 pr-2 max-md:pl-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm">Zonas</span>
                  <div className="w-px h-3 bg-white"></div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-[18px]" aria-hidden />
                    <span className="text-sm">2 categorías</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-3">
                  Categorías y Zonas Destacadas
                </h3>
                <p className="text-sm/5 text-white/80 font-light mb-4">
                  Explora las mejores opciones de inversión patrimonial en el norte y
                  poniente estratégico de Mérida.
                </p>

                <div className="mb-5 space-y-3">
                  <div className="rounded-xl border border-zinc-800 p-3">
                    <div className="flex items-center gap-2">
                      <Home className="size-4" aria-hidden />
                      <span className="text-sm font-medium">Ventas</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      Casas, departamentos, townhouses y más
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold">Desde $2M MXN</span>
                      <Button
                        asChild
                        className="h-9 rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                      >
                        <Link
                          href="/propiedades?tipo=ventas"
                          className="no-underline"
                        >
                          <Search className="mr-2 size-4" />
                          Buscar catálogo
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800 p-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" aria-hidden />
                      <span className="text-sm font-medium">Rentas</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      Propiedades en renta para vivir o invertir
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold">
                        Desde $5,000 MXN/mes
                      </span>
                      <Button
                        asChild
                        className="h-9 rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                      >
                        <Link
                          href="/propiedades?tipo=rentas"
                          className="no-underline"
                        >
                          <Search className="mr-2 size-4" />
                          Buscar catálogo
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-12">
            <Button
              asChild
              className="h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/propiedades" className="no-underline">
                Ver propiedades
                <ArrowRight className="ml-2 size-4" />
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
        variants={staggerContainer}
        className="py-14"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tight">
                Propiedades Destacadas
              </motion.h2>
              <p className="text-muted-foreground mt-1">
                Catálogo de propiedades destacadas en Mérida, Yucatán. 
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['Todos', 'Venta', 'Renta'].map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className={`rounded-full font-medium transition-all duration-200 ${
                    filterType === type 
                      ? 'ws-black-surface text-white hover:bg-[#1b1b1d]' 
                      : 'border-foreground/25 text-foreground hover:bg-foreground/10'
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="columns-1 gap-4 md:columns-2">
            {filteredProperties.map((property, index) => (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-xl ${
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
                  alt={property.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                      {property.type}
                    </span>
                    {property.featured && (
                      <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        Destacado
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                      <MapPin className="size-3.5" aria-hidden />
                      {property.zone}
                    </div>
                    <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                      {property.title}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-white">
                      {property.price}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/80">
                      {property.bedrooms > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <BedDouble className="size-4" aria-hidden />
                          {property.bedrooms} Habs
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Bath className="size-4" aria-hidden />
                        {property.bathrooms} Baños
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Home className="size-4" aria-hidden />
                        {property.constructionArea}
                      </span>
                    </div>

                    <Button
                      onClick={() => handlePropertyWhatsApp(property)}
                      className="mt-4 h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <MessageCircle className="mr-2 size-4" />
                      Consultar por WhatsApp
                      <ArrowRight className="ml-2 size-4" />
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
        variants={staggerContainer}
        className="relative overflow-hidden text-white"
      >
        <div aria-hidden className="absolute inset-0 ws-black-surface"></div>
        <div className="relative z-10 flex items-center justify-center px-4 py-16">
          <div className="max-w-[1100px] w-full">
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center mb-10"
            >
              <span className="text-sm text-slate-50 border border-zinc-800 px-5 py-1 rounded-full">
                Asesoría
              </span>
              <h2 className="text-4xl font-medium text-white mt-5">
                ¿Por qué asesorarte con WS?
              </h2>
              <p className="text-sm text-white mt-2 max-w-xl">
                No solo publicamos propiedades; construimos relaciones de confianza con un servicio integral, transparente y profesional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_1.png",
                  tag: "Confianza",
                  note: "Revisión documental",
                  title: "Certeza Jurídica",
                  description: "Revisión documental exhaustiva de cada propiedad para garantizar operaciones seguras sin sorpresas."
                },
                {
                  icon: Award,
                  image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_2.png",
                  tag: "Trayectoria",
                  note: "6+ años",
                  title: "Experiencia Comprobada",
                  description: "Más de 6 años asesorando a propietarios e inversionistas en el mercado inmobiliario de Mérida."
                },
                {
                  icon: CheckCircle2,
                  image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_3.png",
                  tag: "Protección",
                  note: "Prospectos verificados",
                  title: "Filtrado Riguroso",
                  description: "Evaluamos la capacidad legal y financiera de cada prospecto para proteger el patrimonio de nuestros clientes."
                },
              ].map((item) => (
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
              <Link
                href="/sobre-nosotros"
                className="flex items-center gap-2 text-sm text-white border border-zinc-800 px-4 py-2 rounded-lg transition-colors group"
              >
                Conoce nuestra asesoría
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.5 5.164h9.333M5.167.5l4.666 4.667-4.666 4.666"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Presencia — Cobe globe */}
      <section id="cifras" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
            Presencia y Origen de Nuestros Compradores
          </h2>
          <div className="relative z-10 mt-10 h-[380px] w-full overflow-hidden sm:h-[560px] md:h-[600px]">
            <LazyGlobe />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <Testimonials
            title="Lo que dicen nuestros clientes"
            subtitle="Experiencias reales de propietarios y compradores atendidos con seriedad, transparencia y filtrado riguroso."
            testimonials={testimonials}
          />
        </div>
      </section>

      {/* Equipo Section */}
      <motion.section
        id="equipo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profesionales comprometidos con la excelencia y la confianza de nuestros clientes.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-6 md:grid-cols-2">
            <TestimonialCard
              avatar="/team/wendy.svg"
              name="Lic. Wendy Guadalupe Sánchez Villalobos"
              position="Directora General / Asesora Inmobiliaria Certificada"
              message="Más de 6 años de experiencia. Especialista en relaciones a largo plazo con propietarios."
            >
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Asesora Inmobiliaria Certificada",
                  "Especialista en Renta y Venta Residencial",
                  "Cierre de Operaciones",
                ].map((cred) => (
                  <span
                    key={cred}
                    className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-600/50 dark:text-neutral-300"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </TestimonialCard>

            <TestimonialCard
              avatar="/team/jose.svg"
              name="C.P. José Luis Peraza Peraza"
              position="Director De Finanzas Y Operaciones / Asesor Inmobiliario Certificado"
              message="Contador Público con más de 25 años de experiencia. Gestión operativa de compra, venta y renta."
            >
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Asesor Inmobiliario Certificado",
                  "Gestión de Operaciones",
                  "Análisis Financiero",
                ].map((cred) => (
                  <span
                    key={cred}
                    className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-600/50 dark:text-neutral-300"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </TestimonialCard>
          </div>
        </div>
      </motion.section>

      {/* Formulario */}
      <section id="formulario" className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Hablemos de tu propiedad
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comparte tus datos y recibe asesoría personalizada para tu operación inmobiliaria.
            </p>
          </div>
          <ContactForm className="contact-form w-full" />
        </div>
      </section>

      {/* CTA Final */}
      <motion.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="ws-grain ws-grain-fade py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#B4B6BC] max-w-2xl mx-auto mb-10 text-lg">
            Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => window.open('https://wa.me/529992284783', '_blank')}
              className="h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <MessageCircle className="mr-2 size-4" />
              Contacto
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              onClick={() => setAdvisorOpen(true)}
              className="h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Building className="mr-2 size-4" />
              Vender mi propiedad
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              onClick={() => setAdvisorOpen(true)}
              className="h-9 w-64 sm:flex-1 sm:max-w-[260px] rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Home className="mr-2 size-4" />
              Rentar mi propiedad
              <ArrowRight className="ml-2 size-4" />
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
