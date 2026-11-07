"use client"

import { useEffect, useRef, useState } from "react"
import { Cobe } from "./cobe-globe"

export function LazyGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-full w-full">
      {visible && (
        <Cobe
          variant="default"
          phi={0}
          theta={0.2}
          mapSamples={16000}
          mapBrightness={1.8}
          mapBaseBrightness={0.05}
          diffuse={3}
          dark={1.1}
          baseColor="#ffffff"
          markerColor="#38bdf8"
          markerSize={0.06}
          glowColor="#ffffff"
          scale={1.0}
          offsetX={0.0}
          offsetY={0.0}
          opacity={0.7}
        />
      )}
    </div>
  )
}

export default LazyGlobe
