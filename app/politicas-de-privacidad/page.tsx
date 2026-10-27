import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Aviso de privacidad integral de Wendy Guadalupe Sánchez Villalobos, responsable del tratamiento y protección de datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
  alternates: {
    canonical: "/politicas-de-privacidad",
  },
}

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
          <h2 className="text-xl font-bold text-foreground text-center">
            Protección Integral de Datos Personales conforme a la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares
          </h2>

          <p>
            En atención a lo dispuesto por la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares y su Reglamento, Wendy Guadalupe Sánchez Villalobos, con
            domicilio en Calle 37 # 350 x 62 A Col. Reforma, informa a todas las personas usuarias,
            clientes, prospectos, proveedores y cualquier tercero relacionado con sus servicios
            inmobiliarios, que es responsable del tratamiento, resguardo y protección de los datos
            personales que nos sean proporcionados, ya sea de manera directa o indirecta, ya sea en
            forma física, electrónica, verbal o por cualquier otro medio permitido por la
            legislación vigente.
          </p>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Datos personales que recabamos</h3>
            <p className="mb-3">
              Los datos personales que recabamos pueden incluir, de manera enunciativa más no
              limitativa: nombre completo, domicilio particular y laboral, copia de identificaciones
              oficiales, fecha y lugar de nacimiento, nacionalidad, estado civil, firma autógrafa o
              electrónica, números telefónicos, correo electrónico, ocupación, información
              patrimonial y financiera, referencias personales y comerciales, así como cualquier otro
              dato o documento necesario para la debida identificación, verificación y cumplimiento
              de obligaciones legales y regulatorias relacionadas con la prestación de servicios
              inmobiliarios.
            </p>
            <p className="mb-3">
              A través de este sitio podemos recabar los siguientes datos:
            </p>
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
                tema (claro/oscuro) mediante almacenamiento local. No es un dato personal
                identificable.
              </li>
            </ul>
            <p className="mt-3">
              No recabamos datos personales sensibles de forma intencional ni solicitamos
              información de menores de edad.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Finalidades del tratamiento</h3>
            <p className="mb-3">
              La finalidad principal del tratamiento de los datos personales consiste en:
            </p>
            <ol className="list-[lower-roman] pl-6 space-y-2 mb-4">
              <li>
                Proporcionar servicios de intermediación, promoción, adquisición, renta, venta,
                administración y asesoría en operaciones inmobiliarias;
              </li>
              <li>
                Cumplir con obligaciones legales, contractuales y regulatorias, incluyendo las
                relacionadas con la Prevención de Lavado de Dinero (PLD) y Financiamiento al
                Terrorismo;
              </li>
              <li>
                Realizar procesos de identificación y validación de identidad, cotejo de información
                y antecedentes, elaboración de expedientes, informes o dictámenes;
              </li>
              <li>
                Mantener comunicación constante para el seguimiento de solicitudes, consultas,
                negociaciones, formalización de operaciones y atención a requerimientos de personas
                usuarias; y
              </li>
              <li>
                Enviar información relevante, actualizaciones, avisos y notificaciones derivadas de
                la relación comercial o profesional.
              </li>
            </ol>

            <p className="mb-3">
              <strong>Finalidades primarias</strong> (necesarias para atender tu solicitud):
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Responder a tu mensaje y brindarte asesoría inmobiliaria.</li>
              <li>
                Comunicarte por correo electrónico o WhatsApp en relación con tu solicitud.
              </li>
              <li>
                Gestionar citas, visitas y seguimiento de operaciones de compra, venta o renta.
              </li>
            </ul>

            <p className="mb-3">
              <strong>Finalidades secundarias</strong> (medición y mejora, puedes oponerte):
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Medir el desempeño de nuestras campañas publicitarias y mejorar el contenido del
                sitio mediante Meta Pixel.
              </li>
            </ul>

            <p className="mb-3">
              Puedes oponerte a las finalidades secundarias escribiendo a nuestro correo de contacto.{" "}
              <strong>No vendemos ni rentamos tus datos personales a terceros.</strong>
            </p>
            <p>
              En casos que se requiera su consentimiento expreso, este será solicitado de manera
              previa y clara.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Cookies y tecnologías similares
            </h3>
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
            <h3 className="text-lg font-bold text-foreground mb-3">Transferencias de datos</h3>
            <p className="mb-3">
              Los datos personales podrán ser transferidos, únicamente en la medida que resulte
              necesario, a autoridades competentes, dependencias gubernamentales, instituciones
              bancarias, crediticias o financieras, notarios públicos, corredores, valuadores,
              proveedores de servicios, empresas del mismo grupo empresarial, o a terceros que
              participen en los procesos relacionados con la operación inmobiliaria, todo ello bajo
              estricta confidencialidad y conforme a lo dispuesto en la ley.
            </p>
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
            <h3 className="text-lg font-bold text-foreground mb-3">
              Derechos ARCO y revocación del consentimiento
            </h3>
            <p className="mb-3">
              Las personas titulares de los datos personales tienen derecho a acceder, rectificar,
              cancelar u oponerse (derechos ARCO) al tratamiento de sus datos, así como a revocar en
              cualquier momento el consentimiento otorgado, bajo los términos establecidos por la
              normatividad aplicable.
            </p>
            <p className="mb-3">
              Para ejercer estos derechos, deberán presentar una solicitud por escrito al correo
              electrónico{" "}
              <a
                href="mailto:ventas@wsinmobiliaria.com"
                className="text-primary font-semibold underline"
              >
                ventas@wsinmobiliaria.com
              </a>{" "}
              en el domicilio señalado, acompañando los documentos que acrediten su identidad y los
              detalles necesarios para atender su petición.
            </p>
            <p>
              Nuestro equipo dará respuesta en los plazos legales correspondientes y orientará sobre
              el procedimiento a seguir.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Conservación de los datos</h3>
            <p>
              Conservamos tus datos personales durante el tiempo necesario para atender tu solicitud
              y dar seguimiento a posibles operaciones, y después durante los plazos que exija la
              legislación aplicable o la defensa de eventualidades legales.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Medidas de seguridad</h3>
            <p className="mb-3">
              Nos comprometemos a resguardar y proteger los datos personales a través de la
              implementación de medidas de seguridad administrativas, técnicas y físicas adecuadas,
              orientadas a prevenir el acceso no autorizado, uso indebido, alteración, pérdida,
              destrucción o divulgación indebida de la información.
            </p>
            <p>
              Mantenemos medidas de seguridad administrativas, físicas y técnicas razonables para
              proteger tus datos contra daño, pérdida, alteración, destrucción o uso no autorizado.
              El sitio opera sobre conexión cifrada (HTTPS) y el acceso a la información interna está
              restringido.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Principios de protección de datos</h3>
            <p>
              El tratamiento de datos se realiza en estricto apego a los principios de licitud,
              consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y
              responsabilidad.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Menores de edad</h3>
            <p>
              Este sitio no está dirigido a menores de 18 años y no recabamos conscientemente sus
              datos personales. Si detectamos que hemos recibido información de un menor, la
              eliminaremos.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Modificaciones al aviso de privacidad
            </h3>
            <p>
              Cualquier cambio o modificación a este aviso de privacidad será informado oportunamente
              a través de{" "}
              <a
                href="https://wsinmobiliaria.com/"
                className="text-primary font-semibold underline"
              >
                https://wsinmobiliaria.com/
              </a>{" "}
              por lo que invitamos a consultarlo periódicamente.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-3">Contacto</h3>
            <p>
              Para dudas, comentarios o solicitudes adicionales relacionadas con la privacidad y
              protección de datos personales, puede contactarnos mediante el correo{" "}
              <a
                href="mailto:ventas@wsinmobiliaria.com"
                className="text-primary font-semibold underline"
              >
                ventas@wsinmobiliaria.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
