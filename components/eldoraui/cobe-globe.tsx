"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { useSpring } from "react-spring"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CobeVariant =
  | "default"
  | "draggable"
  | "auto-draggable"
  | "auto-rotation"
  | "rotate-to-location"
  | "scaled"

interface Location {
  name: string
  lat?: number
  long?: number
  emoji?: string
}

interface GeocodeResult {
  lat: number
  lng: number
  display_name: string
}

interface CobeProps {
  variant?: CobeVariant
  className?: string
  style?: React.CSSProperties
  locations?: Location[]
  phi?: number
  theta?: number
  mapSamples?: number
  mapBrightness?: number
  mapBaseBrightness?: number
  diffuse?: number
  dark?: number
  baseColor?: string
  markerColor?: string
  markerSize?: number
  glowColor?: string
  scale?: number
  offsetX?: number
  offsetY?: number
  opacity?: number
}

type CobeState = Record<string, unknown>

export function Cobe({
  variant = "default",
  className,
  style,
  locations = [
    { name: "San Francisco", emoji: "📍" },
    { name: "Berlin", emoji: "📍" },
    { name: "Tokyo", emoji: "📍" },
    { name: "Buenos Aires", emoji: "📍" },
  ],
  phi = 0,
  theta = 0.2,
  mapSamples = 16000,
  mapBrightness = 1.8,
  mapBaseBrightness = 0.05,
  diffuse = 3,
  dark = 1.0,
  baseColor = "#ffffff",
  markerColor = "#fb6415",
  markerSize = 0.05,
  glowColor = "#ffffff",
  scale = 1.0,
  offsetX = 0.0,
  offsetY = 0.0,
  opacity = 0.7,
}: CobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractingY = useRef<number | null>(null)
  const pointerInteractionMovement = useRef<number>(0)
  const pointerInteractionMovementY = useRef<number>(0)
  const focusRef = useRef<[number, number]>([0, 0])
  const [customLocations, setCustomLocations] = useState<Location[]>([])
  const [isInitializing, setIsInitializing] = useState(true)

  const [{ r }, api] = useSpring<{ r: number }>(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  const [{ t }, apiTheta] = useSpring<{ t: number }>(() => ({
    t: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ] as [number, number]
  }

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ]
      : [0, 0, 0]
  }

  const geocodeLocation = async (
    query: string,
  ): Promise<GeocodeResult | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display_name: data[0].display_name,
        }
      }
      return null
    } catch (error) {
      console.error("Geocoding error:", error)
      return null
    }
  }

  const geocodeLocationList = useCallback(async (locationList: Location[]) => {
    const geocodedLocations: Location[] = []

    for (const location of locationList) {
      if (location.lat && location.long) {
        geocodedLocations.push(location)
      } else {
        const result = await geocodeLocation(location.name)
        if (result) {
          geocodedLocations.push({
            ...location,
            lat: result.lat,
            long: result.lng,
          })
        }
      }
    }

    return geocodedLocations
  }, [])

  useEffect(() => {
    const initializeLocations = async () => {
      if (variant === "rotate-to-location" && locations.length > 0) {
        setIsInitializing(true)
        const geocoded = await geocodeLocationList(locations)
        setCustomLocations(geocoded)
        setIsInitializing(false)
      }
    }

    initializeLocations()
  }, [variant, locations, geocodeLocationList])

  useEffect(() => {
    let phi = 0
    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: variant === "scaled" ? width * 2 * 0.4 : width * 2,
      phi: phi,
      theta: theta,
      dark: dark,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: mapBrightness,
      mapBaseBrightness: mapBaseBrightness,
      baseColor: hexToRgb(baseColor),
      markerColor: hexToRgb(markerColor),
      glowColor: hexToRgb(glowColor),
      markers:
        variant === "default" ||
        variant === "draggable" ||
        variant === "auto-draggable" ||
        variant === "auto-rotation" ||
        variant === "scaled"
          ? [
              // México — 5
              { location: [20.9674, -89.5926], size: markerSize }, // Mérida
              { location: [19.4326, -99.1332], size: markerSize }, // CDMX
              { location: [20.6597, -103.3496], size: markerSize }, // Guadalajara
              { location: [25.6866, -100.3161], size: markerSize }, // Monterrey
              { location: [21.1619, -86.8515], size: markerSize }, // Cancún
              // Estados Unidos — 3
              { location: [40.7128, -74.006], size: markerSize }, // New York
              { location: [34.0522, -118.2437], size: markerSize }, // Los Angeles
              { location: [25.7617, -80.1918], size: markerSize }, // Miami
              // Canadá — 1
              { location: [43.6532, -79.3832], size: markerSize }, // Toronto
              // Brasil — 1
              { location: [-23.5505, -46.6333], size: markerSize }, // São Paulo
            ]
          : variant === "rotate-to-location"
            ? customLocations
                .filter((loc) => loc.lat && loc.long)
                .map((loc) => ({
                  location: [loc.lat!, loc.long!],
                  size: markerSize,
                }))
            : [],
      scale: variant === "scaled" ? 2.5 : undefined,
      offset: variant === "scaled" ? [0, width * 2 * 0.4 * 0.6] : undefined,
      opacity: opacity,
      onRender: (state: CobeState) => {
        switch (variant) {
          case "default":
            state.phi = phi + r.get()
            state.theta = theta + t.get()
            phi += 0.005
            break
          case "draggable":
            state.phi = r.get()
            state.theta = theta + t.get()
            break
          case "auto-draggable":
            if (!pointerInteracting.current) {
              phi += 0.005
            }
            state.phi = phi + r.get()
            state.theta = theta + t.get()
            break
          case "auto-rotation":
            state.phi = phi
            phi += 0.005
            break
          case "rotate-to-location": {
            state.phi = currentPhi
            state.theta = currentTheta
            const [focusPhi, focusTheta] = focusRef.current
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
            if (distPositive < distNegative) {
              currentPhi += distPositive * 0.08
            } else {
              currentPhi -= distNegative * 0.08
            }
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08
            break
          }
          case "scaled":
            break
        }

        state.width = width * 2
        state.height = variant === "scaled" ? width * 2 * 0.4 : width * 2
      },
    })

    if (canvasRef.current) {
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = opacity.toString()
        }
      })
    }

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [
    variant,
    r,
    t,
    customLocations,
    phi,
    theta,
    mapSamples,
    mapBrightness,
    mapBaseBrightness,
    diffuse,
    dark,
    baseColor,
    markerColor,
    markerSize,
    glowColor,
    scale,
    offsetX,
    offsetY,
    opacity,
  ])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (
      variant === "draggable" ||
      variant === "auto-draggable" ||
      variant === "default"
    ) {
      pointerInteracting.current =
        e.clientX - pointerInteractionMovement.current
      pointerInteractingY.current =
        e.clientY - pointerInteractionMovementY.current
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    }
  }

  const handlePointerUp = () => {
    if (
      variant === "draggable" ||
      variant === "auto-draggable" ||
      variant === "default"
    ) {
      pointerInteracting.current = null
      pointerInteractingY.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    }
  }

  const handlePointerOut = () => {
    if (
      variant === "draggable" ||
      variant === "auto-draggable" ||
      variant === "default"
    ) {
      pointerInteracting.current = null
      pointerInteractingY.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      (variant === "draggable" ||
        variant === "auto-draggable" ||
        variant === "default") &&
      pointerInteracting.current !== null
    ) {
      const delta = e.clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      api.start({
        r: delta / 200,
      })

      if (pointerInteractingY.current !== null) {
        const deltaY = e.clientY - pointerInteractingY.current
        pointerInteractionMovementY.current = deltaY
        apiTheta.start({
          t: Math.max(-0.8, Math.min(0.8, deltaY / 200)),
        })
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      (variant === "draggable" ||
        variant === "auto-draggable" ||
        variant === "default") &&
      pointerInteracting.current !== null &&
      e.touches[0]
    ) {
      const delta = e.touches[0].clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      api.start({
        r: delta / 100,
      })

      if (pointerInteractingY.current !== null) {
        const deltaY = e.touches[0].clientY - pointerInteractingY.current
        pointerInteractionMovementY.current = deltaY
        apiTheta.start({
          t: Math.max(-0.8, Math.min(0.8, deltaY / 100)),
        })
      }
    }
  }

  const handleLocationClick = (lat: number, long: number) => {
    if (variant === "rotate-to-location") {
      focusRef.current = locationToAngles(lat, long)
    }
  }

  const containerStyle = {
    width: "100%",
    maxWidth: variant === "scaled" ? 800 : 600,
    aspectRatio: variant === "scaled" ? 2.5 : 1,
    margin: "auto",
    position: "relative" as const,
    ...style,
  }

  const canvasStyle = {
    width: "100%",
    height: "100%",
    contain: "layout paint size" as const,
    opacity: 0,
    touchAction: "none" as const,
    transition: "opacity 1s ease",
    cursor:
      variant === "draggable" ||
      variant === "auto-draggable" ||
      variant === "default"
        ? "grab"
        : undefined,
    borderRadius:
      variant === "default" ||
      variant === "draggable" ||
      variant === "auto-draggable" ||
      variant === "auto-rotation"
        ? "50%"
        : variant === "scaled"
          ? "8px"
          : undefined,
  }

  return (
    <div className={cn("", className)} style={containerStyle}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerOut}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={canvasStyle}
      />
      {variant === "rotate-to-location" && (
        <>
          <div
            className="control-buttons flex flex-col items-center justify-center md:flex-row"
            style={{ gap: ".5rem" }}
          >
            {isInitializing ? "Loading locations..." : ""}
            {customLocations
              .filter((loc) => loc.lat && loc.long)
              .map((location, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    handleLocationClick(location.lat!, location.long!)
                  }
                  className="bg-background/80 text-foreground hover:bg-background/90 border-border transition-all duration-200 hover:scale-105"
                >
                  {location.emoji || "📍"} {location.name}
                </Button>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
