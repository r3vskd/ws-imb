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

          <p>
            Los datos personales que recabamos pueden incluir, de manera enunciativa más no
            limitativa: nombre completo, domicilio particular y laboral, copia de identificaciones
            oficiales, fecha y lugar de nacimiento, nacionalidad, estado civil, firma autógrafa o
            electrónica, números telefónicos, correo electrónico, ocupación, información patrimonial
            y financiera, referencias personales y comerciales, así como cualquier otro dato o
            documento necesario para la debida identificación, verificación y cumplimiento de
            obligaciones legales y regulatorias relacionadas con la prestación de servicios
            inmobiliarios.
          </p>

          <p>La finalidad principal del tratamiento de los datos personales consiste en:</p>

          <ol className="list-[lower-roman] pl-6 space-y-2">
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
              Realizar procesos de identificación y validación de identidad, cotejo de información y
              antecedentes, elaboración de expedientes, informes o dictámenes;
            </li>
            <li>
              Mantener comunicación constante para el seguimiento de solicitudes, consultas,
              negociaciones, formalización de operaciones y atención a requerimientos de personas
              usuarias; y
            </li>
            <li>
              Enviar información relevante, actualizaciones, avisos y notificaciones derivadas de la
              relación comercial o profesional.
            </li>
          </ol>

          <p>
            Los datos personales podrán ser transferidos, únicamente en la medida que resulte
            necesario, a autoridades competentes, dependencias gubernamentales, instituciones
            bancarias, crediticias o financieras, notarios públicos, corredores, valuadores,
            proveedores de servicios, empresas del mismo grupo empresarial, o a terceros que
            participen en los procesos relacionados con la operación inmobiliaria, todo ello bajo
            estricta confidencialidad y conforme a lo dispuesto en la ley.
          </p>

          <p>
            En casos que se requiera su consentimiento expreso, este será solicitado de manera previa
            y clara.
          </p>

          <p>
            Las personas titulares de los datos personales tienen derecho a acceder, rectificar,
            cancelar u oponerse (derechos ARCO) al tratamiento de sus datos, así como a revocar en
            cualquier momento el consentimiento otorgado, bajo los términos establecidos por la
            normatividad aplicable.
          </p>

          <p>
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
            Nuestro equipo dará respuesta en los plazos legales correspondientes y orientará sobre el
            procedimiento a seguir.
          </p>

          <p>
            Nos comprometemos a resguardar y proteger los datos personales a través de la
            implementación de medidas de seguridad administrativas, técnicas y físicas adecuadas,
            orientadas a prevenir el acceso no autorizado, uso indebido, alteración, pérdida,
            destrucción o divulgación indebida de la información.
          </p>

          <p>
            El tratamiento de datos se realiza en estricto apego a los principios de licitud,
            consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y
            responsabilidad.
          </p>

          <p>
            Cualquier cambio o modificación a este aviso de privacidad será informado oportunamente a
            través de{" "}
            <a
              href="https://wsinmobiliaria.com/"
              className="text-primary font-semibold underline"
            >
              https://wsinmobiliaria.com/
            </a>{" "}
            por lo que invitamos a consultarlo periódicamente.
          </p>

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
        </div>
      </div>

      <Footer />
    </div>
  )
}
