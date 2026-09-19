import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_WEBSITE_FORMS)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, apellido, telefono, correo, mensaje, ciudad, pais } = body

    if (!nombre || !correo || !mensaje) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="background: #059669; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🏠 Nuevo Lead - WS Asesoría Inmobiliaria</h1>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Nombre:</td><td style="padding: 8px 0; color: #6b7280;">${nombre} ${apellido}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Teléfono:</td><td style="padding: 8px 0; color: #6b7280;">${telefono}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #6b7280;">${correo}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Ciudad:</td><td style="padding: 8px 0; color: #6b7280;">${ciudad}, ${pais}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold; color: #374151;">Mensaje:</p>
              <p style="margin: 8px 0 0 0; color: #6b7280;">${mensaje}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="https://wa.me/529992284783?text=Hola%20Wendy,%20recibí%20el%20lead%20de%20${encodeURIComponent(nombre)}%20${encodeURIComponent(apellido)}" style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Responder por WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'WS Asesoría <onboarding@resend.dev>',
      to: ['contacto@wsinmobiliaria.com', 'software@wsinmobiliaria.com'],
      subject: `Nuevo lead: ${nombre} ${apellido} - ${ciudad}`,
      html,
      reply_to: correo,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 })
  }
}
