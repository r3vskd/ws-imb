import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollJourney from '@/components/journey/ScrollJourney'
import WalkthroughFooter from '@/components/journey/WalkthroughFooter'
import { gallery, stops } from '@/lib/journey'

export const metadata: Metadata = {
  title: 'Recorrido del inmueble | WS Asesoría Inmobiliaria',
  description:
    'Recorrido por la sala, el acceso y la cocina. El scroll mueve la cámara.',
  robots: { index: false, follow: false },
}

const card = 'rounded-2xl border border-white/10 bg-white/[0.04]'

export default function WalkthroughPage() {
  return (
    <main className="paseo-root bg-[#141416]">
      <noscript>
        <style>{`.paseo-stage, .paseo-track { display: none !important; }`}</style>
      </noscript>

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#C9B6F2] focus:px-4 focus:py-2 focus:text-sm focus:text-[#14121A]"
      >
        Saltar al contenido
      </a>

      <ScrollJourney />

      <section id="contenido" className="ws-grain relative z-20 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:px-10">
          <div className={`${card} p-8 sm:p-12`}>
            <h1 className="paseo-display max-w-3xl text-4xl leading-[1.02] text-[#ECECEF] sm:text-6xl">
              Tres paradas. Una sola cámara.
            </h1>
            <p className="paseo-sans mt-6 max-w-xl text-base leading-relaxed text-[#ECECEF]/65">
              La sala, el umbral de la puerta y la cocina se suceden con el scroll. El
              recorrido no se reproduce: avanza contigo.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {stops.map((stop, i) => (
              <article key={stop.id} className={`${card} flex flex-col p-6`}>
                <div className="flex items-baseline justify-between">
                  <span className="paseo-sans text-xs tabular-nums text-[#ECECEF]/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="paseo-label text-[#ECECEF]/60">{stop.label}</span>
                </div>
                <h2 className="paseo-display mt-8 text-2xl leading-tight text-[#ECECEF]">
                  {stop.title}
                </h2>
                <p className="paseo-sans mt-3 text-sm leading-relaxed text-[#ECECEF]/60">
                  {stop.note}
                </p>
              </article>
            ))}
          </div>

          <div className={`${card} mt-4 p-6 sm:p-8`}>
            <div className="flex items-baseline justify-between">
              <h2 className="paseo-display text-2xl text-[#ECECEF] sm:text-3xl">El inmueble</h2>
              <p className="paseo-label text-[#ECECEF]/60">06 imágenes</p>
            </div>

            <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((item) => (
                <figure key={item.base} className="mb-4 break-inside-avoid">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${item.base}-1280.avif 1280w, ${item.base}-1920.avif 1920w`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={`${item.base}-1280.webp 1280w, ${item.base}-1920.webp 1920w`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    <img
                      src={`${item.base}-1920.jpg`}
                      srcSet={`${item.base}-1280.jpg 1280w, ${item.base}-1920.jpg 1920w`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      alt={item.alt}
                      width={1920}
                      height={Math.round(1920 / item.aspect)}
                      loading="lazy"
                      className="w-full rounded-lg"
                    />
                  </picture>
                  <figcaption className="paseo-sans mt-2 text-xs text-[#ECECEF]/60">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={`${card} mt-4 p-6 sm:p-8`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="paseo-display text-2xl text-[#ECECEF]">
                  ¿Quieres verlo en persona?
                </h2>
                <p className="paseo-sans mt-2 max-w-md text-sm leading-relaxed text-[#ECECEF]/60">
                  La información comercial y la disponibilidad se confirman directamente
                  con WS Asesoría Inmobiliaria.
                </p>
              </div>
              <Link
                href="/contact"
                className="paseo-sans inline-flex w-fit items-center rounded-xl bg-[#C9B6F2] px-5 py-3 text-sm text-[#14121A] transition-colors duration-200 hover:bg-[#D8CBF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B6F2]"
              >
                Solicitar informes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WalkthroughFooter />
    </main>
  )
}
