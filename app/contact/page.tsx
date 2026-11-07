import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/forms/contact-form'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-4 py-24 max-w-2xl flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Contáctanos</h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Déjanos tus datos o contáctanos de inmediato para recibir asesoría inmobiliaria personalizada en Mérida, Yucatán.
          </p>
        </div>

        <ContactForm className="contact-form w-full" />
      </div>

      <Footer />
    </div>
  )
}
