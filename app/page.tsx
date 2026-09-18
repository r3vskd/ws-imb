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

  const filteredProperties = REAL_PROPERTIES.filter(prop => {
    const matchesFilter = filterType === 'Todos' || prop.type === filterType || prop.zone.toLowerCase().includes(filterType.toLowerCase())
    const matchesSearch = searchQuery === '' || prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || prop.zone.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handlePropertyWhatsApp = (property: Property) => {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Casas en venta y renta", zone: "Distintas zonas de Mérida", count: "En venta desde $2M", count2: "En renta accesibles desde $9,000/mes" },
              { icon: Building2, title: "Departamentos en venta y renta", zone: "Norte Mérida", count: "En venta desde $2.5M", count2: "En renta accesibles desde $5,000/mes" },
              { icon: Building, title: "Townhouses", zone: "Norte Mérida", count: "Desde $3.1M" },
              { icon: Warehouse, title: "Naves Industriales, Locales y Terrenos", zone: "Yucatán", count: "En venta desde $1.6M", count2: "En renta desde $13,000/mes" },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.zone}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                        {category.count}
                      </span>
                      {category.count2 && (
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                          {category.count2}
                        </span>
                      )}
                    </div>
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
                  className="rounded-full font-medium"
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
                      src={property.image}
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
        className="py-20 bg-slate-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué asesorarte con WS Asesoría Inmobiliaria?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed">
              No solo publicamos propiedades; filtramos prospectos de manera metódica y rigurosa, verificamos la certeza Legal y Jurídica del patrimonio, contamos con un equipo legal especializado, acompañamos todo el proceso formal con notaría y estándares éticos.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BadgeCheck,
                title: "Licencia Inmobiliaria",
                description: "Somos una de las primeras inmobiliarias del país en contar con licencia inmobiliaria del IMPI, Instituto Mexicano de la Propiedad Industrial."
              },
              {
                icon: ShieldCheck,
                title: "Certeza Jurídica Rigurosa",
                description: "Revisión documental exhaustiva bajo la norma NOM-247-SE-2021 para garantizar operaciones seguras."
              },
              {
                icon: Award,
                title: "Respaldo e Integración INAPIM",
                description: "Dirección de capacitaciones en INAPIM 2026, respaldando un servicio informado y profesional."
              },
              {
                icon: CheckCircle2,
                title: "Filtrado y Protección Patrimonial",
                description: "Protegemos a propietarios y compradores verificando capacidad legal y financiera sin falsas promesas."
              },

            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-slate-800/60 hover:bg-slate-800/90 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 backdrop-blur flex flex-col justify-between transition-colors duration-200 cursor-pointer"
              >
                <div>
                  <item.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-105 transition-transform duration-200" />
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
        className="py-20 bg-slate-50 dark:bg-slate-900/30"
      >
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-3 tracking-tight">
            Lo que dicen nuestros clientes de Wendy Sánchez
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
            Experiencias reales de propietarios y compradores atendidos con seriedad, transparencia y filtrado riguroso.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                name: "Denisse Aznar",
                role: "Homeowner / Propietaria",
                comment: "Excelente persona y como asesor inmobilario, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sanchez."
              },
              {
                name: "Pilar Patron",
                role: "First-time Buyer",
                comment: "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios. Gracias Wendy."
              },
              {
                name: "Eddie Ruiz",
                role: "Homeowner / Propietario",
                comment: "Muy buena asesora, busco inquilinos muy buenos para mi propiedad, clara y te resuelve todo muy recomendada."
              },
              {
                name: "María Arcila",
                role: "Homeowner / Cliente Frecuente",
                comment: "Excelente asesora inmobiliaria!!!!, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso."
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-4 leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.name}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{item.role}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
