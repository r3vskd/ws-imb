"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Wheel-to-slide over a CSS-animated marquee.
 *
 * - While the cursor is over the area, the page scroll is consumed by the
 *   cards and the auto-slide animation holds (stays paused) until the cursor
 *   leaves the area.
 * - Wheel input shifts the marquee position by adjusting the animation-delay,
 *   so the slide follows the wheel and the auto animation resumes from there.
 */
export function DragToSlide({
  children,
  className,
  orientation = "horizontal",
  ariaLabel,
}: {
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
  ariaLabel?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)

  const marquee = () =>
    innerRef.current?.querySelector<HTMLElement>(
      orientation === "horizontal" ? ".testimonials-marquee" : ".services-marquee",
    ) ?? null

  const animationMeta = () => {
    const el = marquee()
    if (!el) return null
    const style = window.getComputedStyle(el)
    const duration = (parseFloat(style.animationDuration) || 0) * 1000
    if (!duration) return null
    let delay = (parseFloat(style.animationDelay) || 0) * 1000
    delay = ((delay % duration) + duration) % duration
    const trackLength =
      orientation === "horizontal" ? el.scrollWidth / 2 : el.scrollHeight / 2
    return { el, duration, delay, trackLength }
  }

  // Keyframes travel 50% of the track per cycle: px -> time shift.
  const shiftDelay = (px: number) => {
    const meta = animationMeta()
    if (!meta || !meta.trackLength) return
    const timeShift = (px * meta.duration) / meta.trackLength
    meta.el.style.animationDelay = `${meta.delay - timeShift - meta.duration}ms`
  }

  // Wheel inside the area: consume the event (no page scroll) and slide.
  const onWheel = (e: WheelEvent) => {
    const el = marquee()
    if (!el) return
    const delta =
      orientation === "horizontal"
        ? (e.deltaX !== 0 ? e.deltaX : e.deltaY)
        : (e.deltaY !== 0 ? e.deltaY : e.deltaX)
    if (!delta) return

    e.preventDefault()
    e.stopPropagation()
    shiftDelay(delta)
  }

  // Hold the auto-slide while the cursor is over the area; resume on leave.
  const onMouseEnter = () => {
    const el = marquee()
    if (el) el.style.animationPlayState = "paused"
  }

  const onMouseLeave = () => {
    const el = marquee()
    if (el) el.style.animationPlayState = ""
  }

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // React attaches wheel listeners as passive by default; register a
    // non-passive listener so preventDefault can block page scrolling.
    container.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      container.removeEventListener("wheel", onWheel)
    }
  })

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={cn("select-none", className)}
      style={{ overflow: "hidden" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}

export default DragToSlide
