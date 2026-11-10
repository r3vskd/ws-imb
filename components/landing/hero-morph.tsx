"use client"

const HERO_IMAGES = [
  { src: "/images/main1.jpg", alt: "Residencia en Mérida al atardecer" },
  { src: "/images/main2.jpg", alt: "Fachada de propiedad en Yucatán" },
  { src: "/images/main3.jpg", alt: "Casa con alberca en Mérida" },
]

const STATIC_MS = 5000
const TRANSITION_MS = 2000
const CYCLE_MS = STATIC_MS + TRANSITION_MS
const TOTAL_MS = CYCLE_MS * HERO_IMAGES.length

// Keyframes for one layer across the shared cycle:
// visible (1) through its static window, fades out over TRANSITION_MS,
// stays hidden, then fades back in during the final TRANSITION_MS.
const fadeOutStart = ((CYCLE_MS - TRANSITION_MS / 2) / TOTAL_MS) * 100
const fadeOutEnd = ((CYCLE_MS + TRANSITION_MS / 2) / TOTAL_MS) * 100
const fadeInStart = ((TOTAL_MS - TRANSITION_MS / 2) / TOTAL_MS) * 100

export default function HeroMorph() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <style>{`
        @keyframes hero-morph-cycle {
          0% { opacity: 1; }
          ${fadeOutStart}% { opacity: 1; }
          ${fadeOutEnd}% { opacity: 0; }
          ${fadeInStart}% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      {HERO_IMAGES.map((image, i) => (
        <div
          key={image.src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${image.src}')`,
            animation: `hero-morph-cycle ${TOTAL_MS}ms linear infinite`,
            animationDelay: `${-i * CYCLE_MS}ms`,
          }}
        />
      ))}
    </div>
  )
}
