import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PoliticasDePrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-4 py-24 max-w-3xl flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Política de Privacidad
          </h1>
        </div>

        <div className="space-y-8 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Esta Política de Privacidad describe cómo <strong>WS Asesoría Inmobiliaria</strong>{" "}
            recaba, utiliza y protege los datos personales que nos proporcionas a través de este
            sitio web, de conformidad con la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares (LFPDPPP).
          </p>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Responsable del tratamiento</h2>
            <p>
              WS Asesoría Inmobiliaria, con domicilio en Mérida, Yucatán, México, representada por
              la Lic. Wendy Guadalupe Sánchez Villalobos. Para cualquier asunto relacionado con la
              protección de datos personales puedes escribirnos a{" "}
              <a href="mailto:contacto@wsinmobiliaria.com" className="text-primary font-semibold underline">
                contacto@wsinmobiliaria.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Datos personales que recabamos</h2>
            <p className="mb-3">A través de este sitio podemos recabar los siguientes datos:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Formulario de contacto:</strong> nombre, apellidos, número de teléfono,
                correo electrónico, ciudad, país y el mensaje que nos envías.
              </li>
              <li>
                <strong>Datos de navegación:</strong> al visitar el sitio se carga Meta Pixel, que
                puede registrar tu dirección IP, tipo de navegador, dispositivo y las páginas que
                visitas, con fines de medición.
              </li>
              <li>
                <strong>Preferencias locales:</strong> guardamos en tu navegador la preferencia de
                tema (claro/oscuro) mediante almacenamiento local. No es un dato personal identificable.
              </li>
            </ul>
            <p className="mt-3">
              No recabamos datos personales sensibles de forma intencional ni solicitamos
              información de menores de edad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Finalidades del tratamiento</h2>
            <p className="mb-3">
              <strong>Finalidades primarias</strong> (necesarias para atender tu solicitud):
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>Responder a tu mensaje y brindarte asesoría inmobiliaria.</li>
              <li>Comunicarte por correo electrónico o WhatsApp en relación con tu solicitud.</li>
              <li>Gestionar citas, visitas y seguimiento de operaciones de compra, venta o renta.</li>
            </ul>
            <p className="mb-3">
              <strong>Finalidades secundarias</strong> (medición y mejora, puedes oponerte):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Medir el desempeño de nuestras campañas publicitarias y mejorar el contenido del
                sitio mediante Meta Pixel.
              </li>
            </ul>
            <p className="mt-3">
              Puedes oponerte a las finalidades secundarias escribiendo a nuestro correo de contacto.
              <strong> No vendemos ni rentamos tus datos personales a terceros.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Cookies y tecnologías similares</h2>
            <p className="mb-3">Este sitio utiliza:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cookie de Meta Pixel (_fbp):</strong> para identificar el navegador y medir
                eventos del sitio (por ejemplo, envíos del formulario o clics a WhatsApp).
              </li>
              <li>
                <strong>Almacenamiento local:</strong> para recordar tu preferencia de tema
                (claro/oscuro).
              </li>
            </ul>
            <p className="mt-3">
              Puedes eliminar o bloquear estas cookies desde la configuración de tu navegador; sin
              ellas, algunas mediciones podrían no registrarse correctamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Transferencias de datos</h2>
            <p className="mb-3">Tus datos pueden ser comunicados a los siguientes terceros:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Resend</strong> (proveedor de correo transaccional): procesa el envío del
                formulario hacia nuestros correos, exclusivamente por cuenta de WS.
              </li>
              <li>
                <strong>Meta (Facebook/Instagram) y WhatsApp:</strong> cuando visitas el sitio
                aplica Meta Pixel; si haces clic en un botón de WhatsApp, el mensaje se gestiona
                sobre la plataforma de Meta.
              </li>
            </ul>
            <p className="mt-3">
              Las transferencias se realizan cuando son necesarias para atender tu solicitud, para
              el cumplimiento de una relación precontractual o cuando la ley lo permite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              6. Derechos ARCO y revocación del consentimiento
            </h2>
            <p className="mb-3">
              Tienes derecho a <strong>A</strong>cceder, <strong>R</strong>ectificar,{" "}
              <strong>C</strong>ancelar u <strong>O</strong>ponerte al tratamiento de tus datos
              personales (derechos ARCO, artículos 22 y 23 de la LFPDPPP), así como a revocar en
              cualquier momento el consentimiento que nos hayas otorgado (artículo 28 de la
              LFPDPPP).
            </p>
            <p className="mb-3">Para ejercer cualquiera de estos derechos, envíanos un correo a contacto@wsinmobiliaria.com con:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tu nombre completo y medio para comunicarte la respuesta.</li>
              <li>La descripción de los datos personales respecto de los cuales ejerces el derecho.</li>
              <li>Copia de una identificación oficial o representación legal.</li>
              <li>El derecho que deseas ejercer y la solicitud concreta (acceso, rectificación, cancelación, oposición o revocación).</li>
            </ul>
            <p className="mt-3">
              Daremos respuesta dentro de los plazos establecidos por la ley (veinte días hábiles
              para resolver, con los días adicionales que correspondan para hacer efectivo el
              derecho, artículo 32 de la LFPDPPP). El ejercicio de estos derechos es gratuito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Conservación de los datos</h2>
            <p>
              Conservamos tus datos personales durante el tiempo necesario para atender tu
              solicitud y dar seguimiento a posibles operaciones, y después durante los plazos que
              exija la legislación aplicable o la defensa de eventualidades legales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Medidas de seguridad</h2>
            <p>
              Mantenemos medidas de seguridad administrativas, físicas y técnicas razonables para
              proteger tus datos contra daño, pérdida, alteración, destrucción o uso no autorizado.
              El sitio opera sobre conexión cifrada (HTTPS) y el acceso a la información interna
              está restringido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Menores de edad</h2>
            <p>
              Este sitio no está dirigido a menores de 18 años y no recabamos conscientemente sus
              datos personales. Si detectamos que hemos recibido información de un menor, la
              eliminaremos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Modificaciones</h2>
            <p>
              Podemos actualizar esta Política de Privacidad en cualquier momento. La versión
              vigente será siempre la publicada en esta página con su fecha de última actualización.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Consultas y reclamaciones</h2>
            <p>
              Para cualquier duda sobre el tratamiento de tus datos escribe a{" "}
              <a href="mailto:contacto@wsinmobiliaria.com" className="text-primary font-semibold underline">
                contacto@wsinmobiliaria.com
              </a>
              . Si consideras que tu derecho a la protección de datos personales ha sido lesionado,
              puedes acudir al Instituto Nacional de Transparencia, Acceso a la Información y
              Protección de Datos Personales (INAI) en www.inai.org.mx.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
