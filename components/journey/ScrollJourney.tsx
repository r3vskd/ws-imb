'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { stops } from '@/lib/journey'
import DepthStage, { type StageHandle } from './DepthStage'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export default function ScrollJourney({
  exitColor = '#141416',
  accentColor = '#C9B6F2',
}: {
  exitColor?: string
  accentColor?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<StageHandle>(null)
  const exitRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)
  const inViewRef = useRef(true)
  const hintRef = useRef<HTMLSpanElement>(null)
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(mq.matches)
    read()
    mq.addEventListener('change', read)
    return () => mq.removeEventListener('change', read)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    gsap.registerPlugin(ScrollTrigger)

    const previousBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'

    const lenis = new Lenis({
      duration: reduced ? 0.6 : 1.1,
      smoothWheel: !reduced,
      wheelMultiplier: 1,
    })
    const ticker = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const setVisibility = (visible: boolean) => {
      if (visible === inViewRef.current) return
      inViewRef.current = visible
      setInView(visible)
      if (!visible) window.dispatchEvent(new Event('paseo:stage-hidden'))
    }

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const p = self.progress * (stops.length + 1)
        let i = stops.length - 1
        let local = 1
        let exit = 0

        if (p < stops.length) {
          i = Math.min(stops.length - 1, Math.floor(p))
          local = clamp(p - i, 0, 1)
        } else {
          exit = clamp(p - stops.length, 0, 1)
        }

        stageRef.current?.setProgress(i, local)
        setIndex((prev) => (prev === i ? prev : i))

        if (hintRef.current) {
          hintRef.current.style.opacity = self.progress > 0.004 ? '0' : '1'
        }

        if (exitRef.current) {
          exitRef.current.style.opacity = String(exit)
          const blur = (exit * 28).toFixed(1)
          exitRef.current.style.backdropFilter = `blur(${blur}px)`
          exitRef.current.style.setProperty('-webkit-backdrop-filter', `blur(${blur}px)`)
        }

        if (railFillRef.current) {
          const fill = clamp((i + local) / Math.max(1, stops.length - 1), 0, 1)
          railFillRef.current.style.transform = `scaleY(${fill})`
        }

        const rect = track.getBoundingClientRect()
        setVisibility(rect.bottom > 0 && rect.top < window.innerHeight)
      },
      onRefresh: (self) => {
        const rect = track.getBoundingClientRect()
        setVisibility(rect.bottom > 0 && rect.top < window.innerHeight)
        if (self.progress === 0) {
          stageRef.current?.setProgress(0, 0)
          if (railFillRef.current) railFillRef.current.style.transform = 'scaleY(0)'
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      trigger.kill()
      gsap.ticker.remove(ticker)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      document.documentElement.style.scrollBehavior = previousBehavior
    }
  }, [reduced])

  return (
    <>
      <div
        ref={trackRef}
        aria-hidden
        style={{ height: `${(stops.length + 1) * 100}vh` }}
        className="paseo-track bg-[#14120F]"
      />

      <div
        className="paseo-stage fixed inset-0 z-30 bg-[#14120F] transition-opacity duration-200"
        style={{
          opacity: inView ? 1 : 0,
          visibility: inView ? 'visible' : 'hidden',
          pointerEvents: 'none',
        }}
      >
        <DepthStage ref={stageRef} />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 z-20 -translate-y-1/2 sm:right-8"
        >
          <div className="relative h-32 w-4">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/25" />
            <div
              ref={railFillRef}
              className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2"
              style={{ transform: 'scaleY(0)', backgroundColor: accentColor }}
            />
            {stops.map((stop, i) => {
              const reached = i <= index
              const current = i === index
              return (
                <span
                  key={stop.id}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                  style={{
                    top: `${(i / Math.max(1, stops.length - 1)) * 100}%`,
                    width: current ? 9 : 6,
                    height: current ? 9 : 6,
                    backgroundColor: reached ? accentColor : '#FFFFFF',
                    opacity: reached ? 1 : 0.35,
                    boxShadow: current
                      ? `0 0 0 3px ${accentColor}2E`
                      : 'none',
                  }}
                />
              )
            })}
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 px-5 pb-24 sm:px-8 sm:pb-10"
          aria-live="polite"
        >
          <div className="max-w-xl">
            <p className="paseo-sans text-xs tracking-[0.14em] text-white/55">
              {stops[index].label}
            </p>
            <h2 className="paseo-display mt-2 text-3xl leading-[1.02] text-white sm:text-4xl">
              {stops[index].title}
            </h2>
            <p className="paseo-sans mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {stops[index].note}
            </p>

            <div
              className="mt-7 flex gap-1.5"
              role="progressbar"
              aria-label="Parada del recorrido"
              aria-valuemin={1}
              aria-valuemax={stops.length}
              aria-valuenow={index + 1}
            >
              {stops.map((s, i) => (
                <span
                  key={s.id}
                  className="h-px flex-1 transition-colors duration-300"
                  style={{
                    backgroundColor:
                      i === index
                        ? accentColor
                        : i < index
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <span
            ref={hintRef}
            className="paseo-sans text-[11px] tracking-[0.16em] text-white/45 transition-opacity duration-500"
          >
            Desplaza para recorrer
          </span>
        </div>

        <div
          ref={exitRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundColor: exitColor,
            opacity: 0,
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>
      </div>
    </>
  )
}
