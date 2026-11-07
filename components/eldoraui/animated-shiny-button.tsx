"use client"

import type React from "react"
import { ChevronRight } from "lucide-react"

interface AnimatedShinyButtonProps {
  children: React.ReactNode
  className?: string
  url?: string
  onClick?: () => void
}

export function AnimatedShinyButton({
  children,
  className = "",
  url,
  onClick,
}: AnimatedShinyButtonProps) {
  return url ? (
    <a href={url} className={`shiny-cta-link group ${className}`}>
      <span className="flex items-center justify-center">
        {children}
        <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
      </span>
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`shiny-cta group ${className}`}
    >
      <span className="flex items-center justify-center">
        {children}
        <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
      </span>
    </button>
  )
}
