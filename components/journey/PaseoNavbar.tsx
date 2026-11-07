'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const links = [
  { index: '01', label: 'Categorías', href: '/#featured' },
  { index: '02', label: 'Propiedades', href: '/propiedades' },
  { index: '03', label: 'Expertise', href: '/#expertise' },
  { index: '04', label: 'Testimonios', href: '/#testimonials' },
  { index: '05', label: 'Sobre nosotros', href: '/sobre-nosotros' },
  { index: '06', label: 'Contacto', href: '/contact' },
]

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/wendy_asesoria/' },
  { label: 'Facebook', href: 'https://www.facebook.com/wensavi29/' },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@wendysanchezinmobiliaria?_r=1&_t=ZS-923VDKTDEby',
  },
]

const EASE_PANEL = [0.42, 0, 0.58, 1] as const
const EASE_ROW = [0.33, 0, 0.67, 1] as const
const EASE_HOVER = [0.16, 1, 0.3, 1] as const

export default function PaseoNavbar() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [time, setTime] = useState('10:37')

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const thin = compact && !open

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      )
    }
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-6 pt-5">
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto relative w-full max-w-[460px]"
      >
        {/* Page backdrop — blurs the whole page behind the panel */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{
            width: 6000,
            height: 3000,
            top: -300,
            left: 'calc(50% - 3000px)',
            backgroundColor: 'rgba(5, 5, 6, 0.45)',
            backdropFilter: 'blur(26px)',
            WebkitBackdropFilter: 'blur(26px)',
          }}
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_PANEL }}
        />

        {/* Glass panel */}
        <motion.div
          className="relative z-[1] flex w-full flex-col overflow-clip"
          style={{
            borderRadius: 28,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: 'rgba(8, 8, 10, 0.55)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            filter: 'saturate(1.32)',
            WebkitFilter: 'saturate(1.32)',
            boxShadow:
              '0px 28px 64px -22px rgba(0, 0, 0, 0.55), inset 0px -1px 0px 0px rgba(255, 255, 255, 0.05)',
          }}
          initial={false}
          animate={{ height: open ? 'auto' : thin ? 58 : 76 }}
          transition={{ type: 'spring', bounce: 0.22, duration: 0.7 }}
        >
          {/* Bar */}
          <motion.div
            className="relative flex w-full items-center justify-between pl-[26px] pr-[18px]"
            initial={false}
            animate={{
              paddingTop: thin ? 11 : 18,
              paddingBottom: thin ? 11 : 18,
            }}
            transition={{ type: 'spring', bounce: 0.22, duration: 0.7 }}
          >
            <p className="paseo-inter select-none whitespace-pre text-[15px] font-semibold leading-[1.1] tracking-[0.12em] text-[#F4F1EB]">
              WS INMOBILIARIA
            </p>

            <motion.button
              type="button"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full border border-[rgba(255,255,255,0.14)]"
              initial={false}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: 'spring', bounce: 0.28, duration: 0.7 }}
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                scale: 1.06,
              }}
            >
              <motion.span
                aria-hidden
                className="absolute block rounded-[2px] bg-[#F4F1EB]"
                initial={false}
                animate={
                  open
                    ? { left: 12, top: 19, width: 16, rotate: 45 }
                    : { left: 11, top: 17, width: 18, rotate: 0 }
                }
                transition={{ type: 'spring', bounce: 0.35, duration: 0.6 }}
              />
              <motion.span
                aria-hidden
                className="absolute block rounded-[2px] bg-[#F4F1EB]"
                initial={false}
                animate={
                  open
                    ? { left: 12, top: 19, width: 16, rotate: -45 }
                    : { left: 11, top: 23, width: 11, rotate: 0 }
                }
                transition={{ type: 'spring', bounce: 0.35, duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Drawer */}
          <div
            className="flex w-full flex-col items-start px-[26px] pb-[18px] pt-[14px]"
            style={{ pointerEvents: open ? 'auto' : 'none' }}
            aria-hidden={!open}
          >
            <div
              className="flex w-full flex-col items-start"
              onMouseLeave={() => setHovered(null)}
            >
              {links.map((link, i) => {
                const active = hovered === i
                const dimmed = hovered !== null && !active

                return (
                  <motion.div
                    key={link.href}
                    className="w-full"
                    initial={false}
                    animate={{ opacity: open ? 1 : 0 }}
                    transition={{
                      duration: 0.34,
                      delay: 0.04 + i * 0.03,
                      ease: EASE_ROW,
                    }}
                  >
                    <Link
                      href={link.href}
                      tabIndex={open ? 0 : -1}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className="relative flex w-full items-center justify-between py-4 no-underline"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-[rgba(255,255,255,0.14)]"
                      />
                      <motion.span
                        className="flex items-center gap-4"
                        initial={false}
                        animate={{
                          opacity: dimmed ? 0.35 : 1,
                          filter: dimmed ? 'blur(4px)' : 'blur(0px)',
                        }}
                        transition={{ duration: 0.3, ease: EASE_HOVER }}
                      >
                        <span className="paseo-switzer text-[12px] font-medium tracking-[0.06em] tabular-nums text-[rgba(255,255,255,0.35)]">
                          {link.index}
                        </span>
                        <span className="paseo-switzer whitespace-pre text-[30px] font-medium leading-[1.1] tracking-[-0.03em] text-[#F4F1EB]">
                          {link.label}
                        </span>
                      </motion.span>

                      <svg
                        aria-hidden
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0 transition-opacity duration-300"
                        style={{ opacity: active ? 1 : 0 }}
                      >
                        <path
                          d="M7 7h10v10"
                          stroke="#F4F1EB"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 17 17 7"
                          stroke="#F4F1EB"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Foot */}
            <motion.div
              className="mt-0 flex w-full items-center justify-between border-t border-[rgba(255,255,255,0.14)] pt-4"
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.34, delay: 0.16, ease: EASE_ROW }}
            >
              <div className="flex items-center gap-[9px]">
                <span
                  aria-hidden
                  className="h-[6px] w-[6px] shrink-0 rounded-full bg-[rgba(255,255,255,0.55)] paseo-dot"
                />
                <span className="paseo-switzer text-[13px] leading-none tabular-nums text-[rgba(255,255,255,0.45)]">
                  {time}
                </span>
              </div>

              <div className="flex items-center">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="paseo-switzer py-1.5 pl-[18px] text-[13px] leading-[1.3] text-[rgba(255,255,255,0.45)] no-underline transition-colors duration-300 hover:text-[#F4F1EB] focus-visible:text-[#F4F1EB] focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Shine */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-px"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)',
            }}
          />
        </motion.div>
      </nav>
    </div>
  )
}
