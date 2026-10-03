import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TerminosYCondicionesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-4 py-24 max-w-3xl flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Términos y Condiciones
          </h1>
        </div>

        <div className="space-y-8 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Estos Términos y Condiciones regulan el uso del sitio web de{" "}
            <strong>WS Asesoría Inmobiliaria</strong> (en adelante, "el sitio"). Al navegar o
            utilizar este sitio declaras haber leído, comprendido y aceptado los términos aquí
            descritos.
          </p>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Identificación del sitio</h2>
            <p>
              El sitio es operado por WS Asesoría Inmobiliaria, asesoría inmobiliaria independiente
              con domicilio en Mérida, Yucatán, México. Contacto:{" "}
              <a href="mailto:contacto@wsinmobiliaria.com" className="text-primary font-semibold underline">
                contacto@wsinmobiliaria.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Objeto</h2>
            <p>
              El sitio tiene carácter informativo: presenta servicios de asesoría en compra, venta,
              renta y comercialización de propiedades, así como un catálogo de propiedades
              disponibles en Mérida y sus alrededores. El uso del sitio es personal y no comercial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              3. Información de propiedades y precios
            </h2>
            <p className="mb-3">
              Los precios, características, dimensiones, disponibilidad y fotografías de las
              propiedades publicadas tienen carácter informativo y pueden modificarse o retirarse
              sin aviso previo. La información publicada no constituye una oferta vinculante.
            </p>
            <p>
              Toda operación se formaliza exclusivamente por escrito (contrato de arrendamiento,
              promesa de compraventa o escritura pública, según corresponda), previa revisión y
              validación de la documentación de la propiedad y de las partes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Alcance de la asesoría</h2>
            <p>
              La información del sitio no constituye asesoría legal, fiscal, notarial ni de
              inversión. WS Asesoría Inmobiliaria acompaña cada operación con respaldo profesional
              y, cuando corresponde, con el apoyo de su equipo jurídico, pero las decisiones
              definitivas y los formalismos legales corresponden a las partes intervinientes y a
              los profesionales que estas designen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Propiedad intelectual</h2>
            <p>
              La marca WS Asesoría Inmobiliaria, su logotipo, textos, diseño, fotografías de
              propiedades y demás contenidos del sitio son propiedad de WS Asesoría Inmobiliaria o
              de sus respectivos titulares y están protegidos por la legislación aplicable. No
              está permitida su reproducción, distribución, modificación o uso comercial sin
              autorización escrita.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Uso permitido del sitio</h2>
            <p className="mb-3">Al utilizar el sitio te comprometes a:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Proporcionar información veraz en formularios y comunicaciones.</li>
              <li>
                No suplantar la identidad de terceros ni utilizar el sitio con fines ilícitos,
                fraudulentos o que perjudiquen a WS Asesoría Inmobiliaria o a terceros.
              </li>
              <li>
                No introducir virus, código malicioso ni realizar actividades de extracción
                automatizada (scraping) de los contenidos del sitio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Formulario de contacto y WhatsApp</h2>
            <p>
              Al enviar el formulario de contacto o iniciar una conversación por WhatsApp aceptas
              que tratemos tus datos conforme a nuestra{" "}
              <a href="/politicas-de-privacidad" className="text-primary font-semibold underline">
                Política de Privacidad
              </a>
              . Las comunicaciones por WhatsApp se rigen además por los términos de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Enlaces a sitios de terceros</h2>
            <p>
              El sitio puede incluir enlaces a plataformas de terceros (WhatsApp, redes sociales,
              portales inmobiliarios). WS Asesoría Inmobiliaria no controla ni se responsable del
              contenido, disponibilidad o prácticas de privacidad de dichos sitios, cuyos términos
              propios son los aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Limitación de responsabilidad</h2>
            <p>
              El sitio se ofrece "tal cual". En la medida permitida por la ley, WS Asesoría
              Inmobiliaria no será responsable de decisiones tomadas exclusivamente con base en la
              información publicada, ni de daños derivados de interrupciones, errores o
              inexactitudes en los contenidos, salvo aquellos que la ley establezca de manera
              imperativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Modificaciones</h2>
            <p>
              Podemos actualizar estos Términos y Condiciones en cualquier momento. La versión
              vigente será siempre la publicada en esta página con su fecha de última actualización.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Ley aplicable y jurisdicción</h2>
            <p>
              Estos Términos se rigen por la legislación del Estado de Yucatán, México. Para la
              interpretación o cumplimiento de estos términos, las partes se someten a las
              autoridades judiciales competentes de Mérida, Yucatán, renunciando a cualquier otro
              fuero que pudiera corresponderles.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
