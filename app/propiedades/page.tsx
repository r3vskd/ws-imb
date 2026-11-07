"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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

function PropertyCard({ property }: { property: Property }) {
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
      <motion.article
        variants={fadeInUp}
        className="group relative aspect-[4/3] min-h-[17rem] overflow-hidden rounded-xl"
      >
        <img
          src={
            property.image ||
            (property.type === 'Venta'
              ? '/ventas-placeholder.jpg'
              : '/rentas-placeholder.jpg')
          }
          alt={property.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-white">
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
            <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">
              {property.title}
            </h3>
            <p className="mt-1.5 text-base font-bold text-white">
              {property.price}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-white/80">
              {property.bedrooms > 0 && (
                <span className="inline-flex items-center gap-1">
                  <BedDouble className="size-4" aria-hidden />
                  {property.bedrooms} Habs
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Bath className="size-4" aria-hidden />
                  {property.bathrooms} Baños
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Home className="size-4" aria-hidden />
                {property.constructionArea}
              </span>
            </div>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70">
              {property.description}
            </p>

            <Button
              onClick={() => handleWhatsApp(property)}
              className="mt-3 h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <MessageCircle className="mr-2 size-4" />
              Consultar por WhatsApp
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </motion.article>

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

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ws-black-surface" />
        <div className="relative z-10 container mx-auto px-4 pb-12 pt-28 md:pb-16 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="mb-5 inline-flex rounded-full border border-zinc-800 px-5 py-1 text-sm text-slate-50">
              Catálogo
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Catálogo de Propiedades
            </h1>
            <p className="text-sm md:text-base text-white/70">
              Explora nuestra selección de propiedades en Mérida, Yucatán. Encuentra la inversión perfecta o tu próximo hogar.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-14 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex w-full items-center rounded-lg border border-border bg-card p-1 sm:w-auto">
              {(['Venta', 'Renta'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none ${
                    activeTab === tab
                      ? 'ws-black-surface text-white'
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
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40 transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                showFilters || selectedCategory
                  ? 'ws-black-surface border-transparent text-white'
                  : 'border-border text-foreground hover:border-foreground/40'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {selectedCategory && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-xs text-white">1</span>
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
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        !selectedCategory
                          ? 'ws-black-surface text-white'
                          : 'border border-border bg-card text-muted-foreground hover:text-foreground'
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
                          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            selectedCategory === cat.value
                              ? 'ws-black-surface text-white'
                              : 'border border-border bg-card text-muted-foreground hover:text-foreground'
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
      </div>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProperties.length}</span> propiedades encontradas
              </p>
              {activeCategoryLabel && (
                <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  {activeCategoryLabel}
                  <button onClick={() => handleCategoryChange(null)} className="hover:text-foreground/70">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">No se encontraron propiedades</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No hay propiedades que coincidan con tu búsqueda. Intenta ajustar los filtros o explorar otras categorías.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-border text-foreground hover:bg-foreground/5"
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
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all hover:border-foreground/40 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'ws-black-surface text-white'
                      : 'border border-border hover:border-foreground/40'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all hover:border-foreground/40 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="ws-grain ws-grain-fade py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-white/70 mb-6">
              Contáctanos y te ayudamos a encontrar la propiedad ideal para ti. Tenemos acceso a más opciones en el mercado.
            </p>
            <Button
              asChild
              className="h-9 rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/contact" className="no-underline">
                <MessageCircle className="mr-2 size-4" />
                Contactar a Wendy
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
