import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollJourney from '@/components/journey/ScrollJourney'
import FichaReveal from '@/components/journey/FichaReveal'
import TableOfContent from '@/components/cuicui/table-of-content'
import ImagesReveal from '@/components/animata/image/images-reveal'
import { Button } from '@/components/ui/button'
import { gallery, stops } from '@/lib/journey'

const REVEAL_ANGLES = ['8deg', '-15deg', '-5deg', '10deg', '-5deg', '12deg']

const revealImages = gallery.map((item, i) => ({
  src: `${item.base}-1280.jpg`,
  alt: item.alt,
  angle: REVEAL_ANGLES[i] ?? '0deg',
}))

export const metadata: Metadata = {
  title: 'Recorrido del inmueble | WS Asesoría Inmobiliaria',
  description:
    'Tres paradas del inmueble: sala, acceso y cocina. El recorrido avanza con el scroll.',
  robots: { index: false, follow: false },
}

export default function PaseoPage() {
  return (
    <main className="paseo-root bg-[#141416]">
      <noscript>
        <style>{`.paseo-stage, .paseo-track { display: none !important; }`}</style>
      </noscript>

      <a
        href="#ficha"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#0F1012]"
      >
        Saltar a la ficha
      </a>

      <h1 className="sr-only">Recorrido del inmueble | WS Asesoría Inmobiliaria</h1>

      <ScrollJourney exitColor="#141416" accentColor="#FFFFFF" />

      <section
        id="ficha"
        className="ws-grain relative z-20 scroll-mt-24"
      >
        <FichaReveal>
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-40 sm:px-10">
            <div className="flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="paseo-label text-white/55">Ficha del recorrido</p>
              <p className="paseo-label text-white/40">Mérida, Yucatán</p>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
              <div id="tres-paradas-content">
                <h2
                  id="tres-paradas"
                  className="paseo-display text-4xl leading-[1.03] text-white sm:text-5xl"
                >
                  Tres paradas.
                  <br />
                  Una sola cámara.
                </h2>
                <p className="paseo-sans mt-7 max-w-lg text-base leading-relaxed text-white/70">
                  El recorrido avanza con el scroll. La sala, el umbral de la puerta y la
                  cocina se suceden sin cortes visibles.
                </p>
                <p className="paseo-sans mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  El recorrido se activa al entrar y avanza únicamente con el scroll.
                </p>

                <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                  {stops.map((s, i) => (
                    <section key={s.id} id={s.id} className="scroll-mt-28 py-5">
                      <div className="flex gap-6">
                        <span className="paseo-sans w-6 shrink-0 pt-0.5 text-sm tabular-nums text-white/35">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="paseo-sans text-sm font-medium text-white">
                            {s.label}
                          </h3>
                          <p className="paseo-sans mt-1 max-w-sm text-sm leading-relaxed text-white/65">
                            {s.note}
                          </p>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <TableOfContent
                className="order-first w-full rounded-lg p-2 lg:order-none lg:sticky lg:top-24 lg:self-start"
                idOfParentContainer="tres-paradas-content"
              />
            </div>

            <div className="mt-20 border-t border-white/15 pt-10">
              <ImagesReveal title="El inmueble" images={revealImages} />
              <p className="paseo-label mt-2 text-center text-white/40">
                06 imágenes
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="paseo-sans max-w-md text-sm leading-relaxed text-white/60">
                La información comercial y la disponibilidad se confirman directamente con
                WS Asesoría Inmobiliaria.
              </p>
              <Button
                asChild
                className="h-9 w-fit rounded-md border border-white/30 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/contact" className="no-underline">
                  Solicitar informes
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FichaReveal>
      </section>
    </main>
  )
}
