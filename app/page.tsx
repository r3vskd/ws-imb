"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { REAL_PROPERTIES, Property } from "@/lib/properties"
import { trackMetaEvent } from "@/components/analytics/meta-pixel"
import {
  Home,
  Building2,
  Building,
  Warehouse,
  Search,
  Bath,
  BedDouble,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Star,
  BadgeCheck
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
import { AdvisorSelectorModal } from "@/components/layout/advisor-selector-modal"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  const [filterType, setFilterType] = React.useState<string>('Todos')
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null)

  const [featuredRef, featuredInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expertiseRef, expertiseInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
    <div className="min-h-screen bg-background text-foreground">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40 backdrop-blur-[2px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center text-white py-20"
        >
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-md">
            Encuentra tu propiedad con el mejor equipo de agentes inmobiliarios.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow">
            Propiedades en las mejores zonas de Mérida, con un excelente servicio al cliente.<br />
            Mérida Yucatán es una de las ciudades más seguras del mundo, según la reconocida CEOWORLD Magazine y la más segura de México.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
            <Input
              type="text"
              placeholder="Buscar por zona (ej. Dzityá, Tixcacal, Temozón)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/90 text-slate-900 border-none h-12 text-base rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <Button size="lg" className="w-full sm:w-auto h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 shadow-lg">
              <Search className="mr-2 h-5 w-5" /> Buscar
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Servicios Section */}
      <motion.section
        id="servicios"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acompañamiento profesional en cada etapa de tu operación inmobiliaria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Compra",
                description: "Te ayudamos a encontrar la propiedad ideal según tus necesidades y presupuesto. Análisis de mercado, visitas y negociación incluidas."
              },
              {
                icon: Building2,
                title: "Venta",
                description: "Estrategia de comercialización, promoción profesional, filtro de prospectos y seguimiento hasta el cierre de la operación."
              },
              {
                icon: Home,
                title: "Renta",
                description: "Publicación, filtrado de candidatos, revisión documental, contrato y acompañamiento durante toda la relación de arrendamiento."
              },
              {
                icon: Award,
                title: "Opinión de Valor",
                description: "Estimación profesional del valor de tu propiedad basada en análisis de mercado comparativo y condiciones actuales."
              },
              {
                icon: Building,
                title: "Comercialización",
                description: "Promoción integral de tu propiedad en portales inmobiliarios, redes sociales y nuestra base de datos calificada."
              },
              {
                icon: ShieldCheck,
                title: "Asesoría Integral",
                description: "Revisión documental, acompañamiento jurídico, inventario de entrega y seguimiento post-operación."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quiero Rentar mi Propiedad */}
      <motion.section
        id="rentar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                ¿Quieres rentar tu propiedad?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                En WS no solo publicamos tu propiedad. Nos encargamos de todo el proceso 
                para que tú solo disfrutes de los beneficios.
              </p>

              <div className="space-y-4">
                {[
                  "Asesoría inicial y estimación de valor",
                  "Promoción profesional en portales y redes",
                  "Filtro y calificación de prospectos",
                  "Revisión documental y verificación",
                  "Elaboración de contrato de arrendamiento",
                  "Inventario de entrega y acompañamiento",
                  "Seguimiento durante toda la relación",
                  "Acompañamiento jurídico cuando corresponde"
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="mt-8 bg-cta hover:bg-cta/90 text-white"
                onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20rentar%20mi%20propiedad', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Rentar mi propiedad
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="/rentas-placeholder.jpg" alt="Propiedades en renta" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quiero Vender mi Propiedad */}
      <motion.section
        id="vender"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="/ventas-placeholder.jpg" alt="Propiedades en venta" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                ¿Quieres vender tu propiedad?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Desarrollamos una estrategia de comercialización personalizada para 
                obtener el mejor valor por tu propiedad.
              </p>

              <div className="space-y-4">
                {[
                  "Estrategia de comercialización personalizada",
                  "Estimación profesional de valor",
                  "Promoción en portales inmobiliarios y redes",
                  "Fotografía profesional y recorrido virtual",
                  "Atención y filtro de prospectos calificados",
                  "Revisión documental y verificación de fondos",
                  "Seguimiento de la operación hasta el cierre",
                  "Acompañamiento jurídico integral"
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="mt-8 bg-cta hover:bg-cta/90 text-white"
                onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20vender%20mi%20propiedad', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Vender mi propiedad
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <motion.section
        id="featured"
        ref={featuredRef}
        initial="hidden"
        animate={featuredInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-4 tracking-tight"
          >
            Categorías y Zonas Destacadas
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Explora las mejores opciones de inversión patrimonial en el norte y poniente estratégico de Mérida.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Home, title: "Ventas", description: "Casas, departamentos, townhouses y más", price: "Desde $2M MXN" },
              { icon: Building2, title: "Rentas", description: "Propiedades en renta para vivir o invertir", price: "Desde $5,000 MXN/mes" },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {category.title === "Rentas" && (
                    <div className="h-40 overflow-hidden">
                      <img src="/rentas-placeholder.jpg" alt="Rentas" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {category.title === "Ventas" && (
                    <div className="h-40 overflow-hidden">
                      <img src="/ventas-placeholder.jpg" alt="Ventas" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <category.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <p className="text-lg font-bold text-cta mb-6">{category.price}</p>
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-cta hover:bg-cta/90 text-white font-semibold rounded-xl"
                    >
                      <Link href={`/propiedades?tipo=${category.title.toLowerCase()}`}>
                        <Search className="w-4 h-4 mr-2" />
                        Buscar catálogo
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Properties Section */}
      <motion.section
        id="properties"
        ref={propertiesRef}
        initial="hidden"
        animate={propertiesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
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
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group flex"
              >
                <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-md flex flex-col w-full hover:shadow-xl transition-all duration-300">
                  <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={property.image || (property.type === 'Venta' ? '/ventas-placeholder.jpg' : '/rentas-placeholder.jpg')}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow">
                        {property.type}
                      </span>
                      {property.featured && (
                        <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Destacado
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow">
                      {property.price}
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center text-xs font-medium text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-blue-600" />
                        {property.zone}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>

                      <div className="flex items-center justify-between py-3 border-y border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center">
                            <BedDouble className="w-4 h-4 mr-1 text-blue-600" />
                            {property.bedrooms} Habs
                          </div>
                        )}
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1 text-blue-600" />
                          {property.bathrooms} Baños
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1 text-blue-600" />
                          {property.constructionArea}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {property.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePropertyWhatsApp(property)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow group/btn"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Consultar por WhatsApp
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
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
        className="py-20 bg-black text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué asesorarte con WS?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-300 leading-relaxed">
              No solo publicamos propiedades; construimos relaciones de confianza con un servicio integral, transparente y profesional.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BadgeCheck,
                title: "Licencia INAPIM",
                description: "Contamos con licencia inmobiliaria del Instituto Nacional de la Propiedad Inmobiliaria, respaldando la legalidad de cada operación."
              },
              {
                icon: ShieldCheck,
                title: "Certeza Jurídica",
                description: "Revisión documental exhaustiva de cada propiedad para garantizar operaciones seguras sin sorpresas."
              },
              {
                icon: Award,
                title: "Experiencia Comprobada",
                description: "Más de 10 años asesorando a propietarios e inversionistas en el mercado inmobiliario de Mérida."
              },
              {
                icon: CheckCircle2,
                title: "Filtrado Riguroso",
                description: "Evaluamos la capacidad legal y financiera de cada prospecto para proteger el patrimonio de nuestros clientes."
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-white/10 hover:bg-white/15 p-6 rounded-2xl border border-white/10 hover:border-primary/50 backdrop-blur-sm flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-900"
      >
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Experiencias reales de propietarios y compradores atendidos con seriedad, transparencia y filtrado riguroso.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                name: "Denisse Aznar",
                role: "Propietaria",
                comment: "Excelente persona y como asesora inmobiliaria, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sánchez.",
                color: "bg-primary/10 text-primary"
              },
              {
                name: "Pilar Patrón",
                role: "Compradora",
                comment: "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios. Gracias Wendy.",
                color: "bg-secondary/10 text-secondary"
              },
              {
                name: "Eddie Ruiz",
                role: "Propietario",
                comment: "Muy buena asesora, buscó inquilinos muy buenos para mi propiedad, clara y te resuelve todo. Muy recomendada.",
                color: "bg-cta/10 text-cta"
              },
              {
                name: "María Arcila",
                role: "Cliente Frecuente",
                comment: "Excelente asesora inmobiliaria, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso.",
                color: "bg-primary/10 text-primary"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-4 leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-bold text-sm`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Equipo Section */}
      <motion.section
        id="equipo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-white dark:bg-slate-900"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Lic. Wendy Guadalupe Sánchez Villalobos",
                role: "Directora General / Asesora Inmobiliaria",
                description: "Más de 6 años de experiencia en el mercado inmobiliario de Mérida. Especialista en rentas y relaciones a largo plazo con propietarios.",
                credentials: ["Asesora Inmobiliaria Certificada", "Especialista en Renta y VentaResidencial", "Cierre de Operaciones"]
              },
              {
                name: "Lic. José Luis Peraza Peraza",
                role: "Director General / Asesor Inmobiliario",
                description: "Contador Público con enfoque en finanzas inmobiliarias. Gestión operativa y administrativa de operaciones de compra, venta y renta.",
                credentials: ["Contador Público", "Gestión de Operaciones Inmobiliarias y Negociación", "Análisis Financiero"]
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-primary">
                          {member.name.split(' ').slice(-1)[0].charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {member.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.credentials.map((cred, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                              {cred}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Final */}
      <motion.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-black"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20comprar%20una%20propiedad', '_blank')}
            >
              <Home className="w-5 h-5 mr-2" />
              Comprar
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20rentar%20una%20propiedad', '_blank')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Rentar
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20vender%20mi%20propiedad', '_blank')}
            >
              <Building className="w-5 h-5 mr-2" />
              Vender
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => window.open('https://wa.me/529992284783?text=Hola%20Wendy%2C%20quiero%20rentar%20mi%20propiedad', '_blank')}
            >
              <Warehouse className="w-5 h-5 mr-2" />
              Rentar mi propiedad
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 font-semibold"
              onClick={() => window.open('https://wa.me/529992284783', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar a Wendy
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <AdvisorSelectorModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        propertyTitle={selectedProperty?.title}
        propertyPrice={selectedProperty?.price}
      />

      <Footer />
    </div>
  )
}
