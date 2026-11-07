'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function FichaReveal({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    const track = document.querySelector('.paseo-track')
    const stageActive = track ? track.getBoundingClientRect().bottom > 0 : false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!stageActive || reduce) return

    setRevealed(false)

    const onHidden = () => setRevealed(true)
    window.addEventListener('paseo:stage-hidden', onHidden)
    return () => window.removeEventListener('paseo:stage-hidden', onHidden)
  }, [])

  return (
    <motion.div
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
