"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Home, Building2, Building, Warehouse, Search, Bath, BedDouble, MapPin, ArrowRight, Star, User } from 'lucide-react'

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

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  
  const [featuredRef, featuredInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expertiseRef, expertiseInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/ajVnNQ.jpg')",

          }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu propiedad con el mejor equipo de agentes inmobiliarios.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Propiedades en las mejores zonas de Mérida, con un excelente servicio al cliente. <br />
            Merida Yucatan es una de las ciudades mas seguras del mundo, segun la reconocida CEOWORLD Magazine y la mas segura de México.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Buscar por ubicacion"
              className="bg-white/90 text-black"
            />
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Buscar
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
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Categorias Destacadas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "Casas", count: 150 },
              { icon: Building2, title: "Departamentos", count: 120 },
              { icon: Building, title: "Villas y Desarrollos", count: 80 },
              { icon: Warehouse, title: "Locales Comerciales", count: 40 },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <category.icon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.count} Propiedades</p>
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
        className="py-20 bg-muted/50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Propiedades Destacadas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/ho1.jpg",
                title: "Casa en Dzitya",
                location: "Merida Yucatan",
                price: "$2,600,000",
                beds: 3,
                baths: 2
              },
              {
                image: "/ho2.jpg",
                title: "Casa en Dzitya",
                location: "Merida Yucatan",
                price: "$2,231,000",
                beds: 2,
                baths: 2
              },
              {
                image: "/ho3.jpg",
                title: "Casa en Dzitya",
                location: "Merida Yucatan",
                price: "$",
                beds: 2,
                baths: 2
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-[300px] object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                      Destacada
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-primary">{property.price}</p>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center">
                        <BedDouble className="w-4 h-4 mr-1" />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.baths} Baths</span>
                      </div>
                    </div>
                    <Button className="w-full group">
                      Ver detalles
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-6">
                Propiedades de lujo en zonas exclusivas
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nuestro equipo de profesionales de la inmobiliaria combina conocimientos profundos del mercado local con experiencia en propiedades de lujo para ayudarte a encontrar tu hogar perfecto.
              </p>
              <Button size="lg" className="group">
                Ver más
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <img
                src="/contract-hands.jpg"
                alt="Real estate professionals shaking hands"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-muted/50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Nuestros clientes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Denisse Aznar",
                role: "Homeowner",
                quote: "Excelente persona y como asesor inmobilario, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sanchez.",
                stars: 5
              },
              {
                name: "Pilar Patron",
                role: "First-time Buyer",
                quote: "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios.Gracias Wendy.",
                stars: 5
              },
              {
                name: "Eddie Ruiz",
                role: "Homeowner",
                quote: "Muy buena asesora, busco inquilinos muy buenos para mi propiedad, clara y te resuelve todo muy recomendada.",
                stars: 5
              },
              {
                name: "María Arcila",
                role: "Homeowner",
                quote: "Excelente asesora inmobiliaria!!!!, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso.",
                stars: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
