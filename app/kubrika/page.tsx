import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kubrika | Automatización y desarrollo digital',
  description:
    'Automatización de procesos, agentes de IA y desarrollo web para hoteles, clínicas, restaurantes y negocios de servicios. Kubrika Labs.',
}

const SERVICIOS = [
  {
    n: '01',
    titulo: 'AUTOMATIZACIÓN',
    acento: 'OPERATIVA',
    texto:
      'Reservas, citas, pedidos y seguimiento en WhatsApp. El sistema responde, agenda y cobra sin que nadie esté pendiente del teléfono.',
    items: ['Reservas y agenda', 'Recordatorios automáticos', 'Cobro y anticipos'],
  },
  {
    n: '02',
    titulo: 'WEB DE ALTO',
    acento: 'IMPACTO',
    texto:
      'Sitios rápidos, con imagen propia y catálogo conectado. Diseñados para que el cliente decida sin llamar a preguntar.',
    items: ['Diseño a medida', 'Catálogo conectado', 'Rendimiento real'],
  },
  {
    n: '03',
    titulo: 'SOPORTE Y',
    acento: 'MANTENIMIENTO',
    texto:
      'Actualizaciones, ajustes y monitoreo. El sistema no se entrega y se abandona: se mantiene funcionando.',
    items: ['Actualizaciones', 'Monitoreo', 'Ajustes incluidos'],
  },
]

const NICHOS = [
  { nombre: 'Hoteles', activo: true },
  { nombre: 'Clínicas', activo: true },
  { nombre: 'Restaurantes', activo: false },
  { nombre: 'Retail', activo: false },
  { nombre: 'Eventos', activo: false },
  { nombre: 'Gimnasios', activo: false },
  { nombre: 'Despachos', activo: false },
  { nombre: 'Escuelas', activo: false },
]

export default function KubrikaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Resplandor rojo superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_55%_at_50%_0%,rgba(237,27,47,0.20),transparent_72%)]"
      />
      {/* Retícula tenue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        {/* ── Marca ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-2xl font-bold tracking-[-0.03em]">KUBRIKA</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 sm:inline">
              Labs
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 transition hover:text-white"
          >
            wsinmobiliaria.com
          </Link>
        </header>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="pt-20 pb-20 sm:pt-28">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
            Automatización · Desarrollo digital · Sociedad con WS
          </p>
          <h1 className="font-heading text-[clamp(2.4rem,7vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.04em]">
            Software que
            <br />
            <span className="text-[#ED1B2F]">trabaja solo.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/60">
            Construimos el sistema que atiende, agenda y cobra mientras usted
            está en el mostrador. Sin apps nuevas que aprender, sin contratar
            más personal de recepción.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/529991234567?text=Hola%20Kubrika%2C%20quiero%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#ED1B2F] px-6 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-[#FF2D44]"
            >
              Hablar con Kubrika
              <span className="transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Ver servicios
            </a>
          </div>
        </section>

        {/* ── Servicios (tarjetas con blur) ─────────────────── */}
        <section id="servicios" className="scroll-mt-16">
          <div className="mb-8 flex items-end justify-between border-t border-white/10 pt-8">
            <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.28em] text-white/50">
              Tres frentes
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              01 — 03
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICIOS.map((s) => (
              <article
                key={s.n}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[#ED1B2F]/40 hover:bg-white/[0.06]"
              >
                {/* halo rojo al pasar */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#ED1B2F]/20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="mb-8 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ED1B2F]/40 text-[#ED1B2F]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                        {s.n === '01' && (
                          <path d="M4 6h16M4 12h16M4 18h10M18 18v4M15 21h6" strokeLinecap="round" />
                        )}
                        {s.n === '02' && (
                          <path d="M3 7h18v10H3zM3 11h18M8 7v10" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {s.n === '03' && (
                          <path
                            d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.5 4-1.8.9.3 2-1.8 1-1.6-1.2-2 .8-.4 1.9h-2l-.4-1.9-2-.8-1.6 1.2-1.8-1 .3-2L2.5 12 4.3 11l-.3-2 1.8-1 1.6 1.2 2-.8.4-1.9h2l.4 1.9 2 .8L16 8l1.8 1-.3 2 1.8 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </span>
                    <span className="font-mono text-[11px] text-white/25">{s.n}</span>
                  </div>

                  <h3 className="font-heading text-[17px] font-semibold leading-tight tracking-[-0.01em]">
                    {s.titulo} <span className="text-[#ED1B2F]">{s.acento}</span>
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-white/55">{s.texto}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-[12.5px] text-white/65">
                        <span className="text-[#ED1B2F]">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Nichos ────────────────────────────────────────── */}
        <section className="pt-20">
          <div className="mb-6 flex items-end justify-between border-t border-white/10 pt-8">
            <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.28em] text-white/50">
              Dónde trabajamos
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Dos de arranque
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {NICHOS.map((n) => (
              <div
                key={n.nombre}
                className={
                  n.activo
                    ? 'rounded-xl border border-[#ED1B2F]/45 bg-[#ED1B2F]/[0.07] px-4 py-3.5 backdrop-blur-xl'
                    : 'rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 backdrop-blur-xl'
                }
              >
                <span
                  className={
                    n.activo
                      ? 'font-mono text-[11px] uppercase tracking-[0.14em] text-[#ED1B2F]'
                      : 'font-mono text-[11px] uppercase tracking-[0.14em] text-white/45'
                  }
                >
                  {n.nombre}
                </span>
                {n.activo && (
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-[#ED1B2F]/60">
                    Arranque
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Cierre ────────────────────────────────────────── */}
        <section className="mt-20 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-8 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-[clamp(1.3rem,3vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em]">
                Hablemos de su operación.
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/55">
                Una llamada de 20 minutos basta para saber qué se puede
                automatizar primero y cuánto cuesta.
              </p>
            </div>
            <a
              href="https://wa.me/529991234567?text=Hola%20Kubrika%2C%20quiero%20agendar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.06em] text-black transition hover:bg-[#ED1B2F] hover:text-white"
            >
              Agendar llamada →
            </a>
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Kubrika Labs · Mérida, Yucatán</span>
          <span>Automatización · Agentes · Web</span>
        </footer>
      </div>
    </main>
  )
}
