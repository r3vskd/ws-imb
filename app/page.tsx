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
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home%20v.jpg-rxnX7mys6JuAm5Bl56jYtHDucXciNT.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Enjoy The Finest Homes
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover luxury living at its finest with our curated selection of premium properties
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search by location..."
              className="bg-white/90 text-black"
            />
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
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
            Featured Categories
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "Houses", count: 150 },
              { icon: Building2, title: "Apartments", count: 120 },
              { icon: Building, title: "Villas", count: 80 },
              { icon: Warehouse, title: "Commercial", count: 40 },
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
                    <p className="text-muted-foreground">{category.count} Properties</p>
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
            Featured Properties
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home%20v5.jpg-T9OVKOsAOgLdaDgaUYCCqzfJDGvSKi.jpeg",
                title: "Modern Minimalist Villa",
                location: "Beverly Hills, CA",
                price: "$4,500,000",
                beds: 5,
                baths: 4
              },
              {
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home%20v6.jpg-VAhHlKiqYrQxxjS6BMiSKo09zCxBi3.jpeg",
                title: "Contemporary Luxury Estate",
                location: "Hollywood Hills, CA",
                price: "$6,900,000",
                beds: 6,
                baths: 5
              },
              {
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home%20v2.jpg-87OkF6xD9cEKaGu0C7lhG8DdvuL5p6.jpeg",
                title: "Beachfront Paradise",
                location: "Malibu, CA",
                price: "$12,500,000",
                beds: 7,
                baths: 6
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
                      Featured
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
                      View Details
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
                Local expertise for luxury homes
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our team of experienced real estate professionals combines deep local market knowledge with expertise in luxury properties to help you find your perfect home.
              </p>
              <Button size="lg" className="group">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home%20v1.jpg-5s9E8GT21DqRpLZOgBx87fRzXIEkqn.jpeg"
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
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Thompson",
                role: "Homeowner",
                quote: "RealEstate made finding our dream home an enjoyable experience. Their expertise and personalized approach exceeded our expectations.",
                stars: 5
              },
              {
                name: "Michael Chen",
                role: "Property Investor",
                quote: "The market insights provided by RealEstate have significantly boosted my investment portfolio. Their professionalism is unmatched.",
                stars: 5
              },
              {
                name: "Sarah Miller",
                role: "First-time Buyer",
                quote: "As a first-time buyer, I was nervous about the process. RealEstate guided me every step of the way, making it smooth and stress-free.",
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
