"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  Building2,
  Building,
  Warehouse,
  Store,
  LandPlot,
  Trees,
  Briefcase,
  Search,
  BedDouble,
  Bath,
  MapPin,
  ArrowRight,
  X,
  SlidersHorizontal,
  MessageCircle,
} from 'lucide-react'
import { REAL_PROPERTIES, PROPERTY_CATEGORIES, Property, PropertyCategory } from "@/lib/properties"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { trackMetaEvent } from "@/components/analytics/meta-pixel"
import { AdvisorSelectorModal } from "@/components/layout/advisor-selector-modal"
import Link from "next/link"

const CATEGORY_ICONS: Record<PropertyCategory, React.ElementType> = {
  'casas': Home,
  'departamentos': Building2,
  'townhouses': Building,
  'naves-industriales': Warehouse,
  'locales-comerciales': Store,
  'lotes-inversion': LandPlot,
  'terrenos': Trees,
  'oficinas': Briefcase,
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const PROPERTIES_PER_PAGE = 9

const normalizeText = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null)

  const handleWhatsApp = (property: Property) => {
    trackMetaEvent('ViewContent', {
      content_name: property.title,
      content_type: 'product',
      value: property.price,
      currency: 'MXN',
    })
    setSelectedProperty(property)
  }

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all h-full flex flex-col group">
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full text-white shadow-md ${property.type === 'Venta' ? 'bg-primary' : 'bg-cta'}`}>
                {property.type}
              </span>
            </div>
            {property.featured && (
              <div className="absolute top-3 right-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-md">
                  Destacada
                </span>
              </div>
            )}
          </div>

          <CardContent className="p-5 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {property.title}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{property.zone}</span>
            </div>

            <p className="text-xl font-bold text-cta mb-3">{property.price}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-xs">{property.constructionArea}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {property.description}
            </p>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              onClick={() => handleWhatsApp(property)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contactar
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <AdvisorSelectorModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        propertyTitle={selectedProperty?.title}
        propertyPrice={selectedProperty?.price}
      />
    </>
  )
}

export default function PropiedadesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PropiedadesContent />
    </React.Suspense>
  )
}

function PropiedadesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tipoInicial = searchParams.get('tipo') === 'rentas' ? 'Renta' : 'Venta'
  const [activeTab, setActiveTab] = React.useState<'Venta' | 'Renta'>(tipoInicial)
  const [selectedCategory, setSelectedCategory] = React.useState<PropertyCategory | null>(null)
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get('q') ?? '')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [showFilters, setShowFilters] = React.useState(false)

  React.useEffect(() => {
    setActiveTab(tipoInicial)
  }, [tipoInicial])

  React.useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '')
    setCurrentPage(1)
  }, [searchParams])

  const filteredProperties = React.useMemo(() => {
    let results = REAL_PROPERTIES

    results = results.filter(p => p.type === activeTab)

    if (selectedCategory) {
      results = results.filter(p => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const terms = normalizeText(searchQuery).split(/\s+/).filter(Boolean)
      results = results.filter(p => {
        const haystack = normalizeText([
          p.title,
          p.zone,
          p.description,
          p.price,
          p.type,
          PROPERTY_CATEGORIES.find(c => c.value === p.category)?.label ?? '',
          p.highlights.join(' '),
        ].join(' '))
        return terms.every(term => haystack.includes(term))
      })
    }

    return results
  }, [activeTab, selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE)
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * PROPERTIES_PER_PAGE,
    currentPage * PROPERTIES_PER_PAGE
  )

  const handleTabChange = (tab: 'Venta' | 'Renta') => {
    setActiveTab(tab)
    setSelectedCategory(null)
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tipo', tab === 'Venta' ? 'ventas' : 'rentas')
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    else params.delete('q')
    router.replace(`/propiedades?${params.toString()}`, { scroll: false })
  }

  const handleCategoryChange = (category: PropertyCategory | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSearchQuery('')
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    const qs = params.toString()
    router.replace(qs ? `/propiedades?${qs}` : '/propiedades', { scroll: false })
  }

  const activeCategoryLabel = selectedCategory
    ? PROPERTY_CATEGORIES.find(c => c.value === selectedCategory)?.label
    : null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Catálogo de Propiedades
            </h1>
            <p className="text-muted-foreground text-lg">
              Explora nuestra selección de propiedades en Mérida, Yucatáan. Encuentra la inversión perfecta o tu próximo hogar.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-14 z-40 bg-background/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-full sm:w-auto">
              {(['Venta', 'Renta'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'Venta' ? 'Ventas' : 'Rentas'}
                </button>
              ))}
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por palabra: zona, nombre, precio..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || selectedCategory
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {selectedCategory && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        !selectedCategory
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Todos
                    </button>
                    {PROPERTY_CATEGORIES.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.value]
                      return (
                        <button
                          key={cat.value}
                          onClick={() => handleCategoryChange(cat.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === cat.value
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {cat.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProperties.length}</span> propiedades encontradas
              </p>
              {activeCategoryLabel && (
                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {activeCategoryLabel}
                  <button onClick={() => handleCategoryChange(null)} className="hover:text-primary/70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          {paginatedProperties.length > 0 ? (
            <motion.div
              key={`${activeTab}-${selectedCategory}-${currentPage}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No se encontraron propiedades</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No hay propiedades que coincidan con tu búsqueda. Intenta ajustar los filtros o explorar otras categorías.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Limpiar filtros
              </Button>
            </motion.div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-slate-200 dark:border-slate-700 hover:border-primary/50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contáctanos y te ayudamos a encontrar la propiedad ideal para ti. Tenemos acceso a más opciones en el mercado.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cta hover:bg-cta/90 text-white font-semibold"
            >
              <Link href="/contact">
                Contactar a Wendy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
