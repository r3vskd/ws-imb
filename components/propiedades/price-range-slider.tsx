'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { dict } from '@/lib/i18n-dict'

const MIN_PRICE = 20000
const MAX_PRICE = 50000000

const formatMXN = (value: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)

export function PriceRangeSlider({
  value,
  onChange,
  className,
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
}) {
  const [minValue, maxValue] = value
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = React.useState<'min' | 'max' | null>(null)

  const clamp = (v: number) => Math.min(MAX_PRICE, Math.max(MIN_PRICE, v))

  const valueFromPointer = React.useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return MIN_PRICE
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return clamp(Math.round(ratio * (MAX_PRICE - MIN_PRICE)) + MIN_PRICE)
  }, [])

  const applyPointer = React.useCallback(
    (clientX: number) => {
      if (!dragging) return
      const next = valueFromPointer(clientX)
      if (dragging === 'min') {
        onChange([Math.min(next, maxValue), maxValue])
      } else {
        onChange([minValue, Math.max(next, minValue)])
      }
    },
    [dragging, minValue, maxValue, onChange, valueFromPointer],
  )

  React.useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => applyPointer(e.clientX)
    const onUp = () => setDragging(null)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [dragging, applyPointer])

  const minPercent = ((minValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  const maxPercent = ((maxValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  const handleKey = (thumb: 'min' | 'max') => (event: React.KeyboardEvent) => {
    const step = (MAX_PRICE - MIN_PRICE) / 100
    const delta =
      event.key === 'ArrowRight' || event.key === 'ArrowUp'
        ? step
        : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
          ? -step
          : 0
    if (!delta) return
    event.preventDefault()
    if (thumb === 'min') {
      onChange([clamp(minValue + delta), maxValue])
    } else {
      onChange([minValue, clamp(maxValue + delta)])
    }
  }

  const { locale } = useLocale()
  const priceLabel = dict.propiedades.price[locale]

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{priceLabel}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {formatMXN(minValue)} — {formatMXN(maxValue)}
        </span>
      </div>

      <div
        ref={trackRef}
        role="group"
        aria-label={priceLabel}
        className="relative flex h-5 w-full cursor-pointer touch-none items-center"
        onPointerDown={(event) => {
          const next = valueFromPointer(event.clientX)
          const toMin = Math.abs(next - minValue)
          const toMax = Math.abs(next - maxValue)
          const thumb = toMin <= toMax ? 'min' : 'max'
          setDragging(thumb)
          if (thumb === 'min') {
            onChange([Math.min(next, maxValue), maxValue])
          } else {
            onChange([minValue, Math.max(next, minValue)])
          }
        }}
      >
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-foreground"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />
        </div>

        {(['min', 'max'] as const).map((thumb) => (
          <button
            key={thumb}
            type="button"
            role="slider"
            aria-label={thumb === 'min' ? dict.propiedades.priceMin[locale] : dict.propiedades.priceMax[locale]}
            aria-valuemin={MIN_PRICE}
            aria-valuemax={MAX_PRICE}
            aria-valuenow={thumb === 'min' ? minValue : maxValue}
            onKeyDown={handleKey(thumb)}
            onPointerDown={(event) => {
              event.stopPropagation()
              setDragging(thumb)
            }}
            style={{
              left: `${thumb === 'min' ? minPercent : maxPercent}%`,
              position: 'absolute',
            }}
            className="block size-5 -translate-x-1/2 cursor-grab rounded-full border-2 border-foreground bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:cursor-grabbing"
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
        <span>{formatMXN(minValue)}</span>
        <span>{formatMXN(maxValue)}</span>
      </div>
    </div>
  )
}

export { MIN_PRICE as PRICE_RANGE_MIN, MAX_PRICE as PRICE_RANGE_MAX, formatMXN as formatPriceMXN }
