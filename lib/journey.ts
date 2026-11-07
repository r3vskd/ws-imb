export type Stop = {
  id: string
  label: string
  title: string
  note: string
  /** base de las imágenes, sin extensión: `<base>-1920.avif`, `<base>-1280.webp`, … */
  base: string
  /** mapa de profundidad (PNG de 8 bits, claro = lejos) */
  depth: string
  /** proporción ancho/alto de la foto */
  aspect: number
  /** 0..1 — qué parte horizontal queda a la vista en móvil */
  focus?: number
  video: {
    webm: string
    mp4: string
    poster: string
  }
}

export type GalleryImage = {
  base: string
  alt: string
  label: string
  aspect: number
}

export const stops: Stop[] = [
  {
    id: 'sala',
    label: 'Sala',
    title: 'La sala, de un solo trazo.',
    note: 'Sofá, tres sillones verdes y mesa de madera. La puerta de doble hoja queda al fondo.',
    base: '/paseo/property/sala',
    depth: '/paseo/property/sala-depth.png',
    aspect: 16 / 9,
    focus: 0.5,
    video: {
      webm: '/paseo/videos/sala/clip.webm',
      mp4: '/paseo/videos/sala/clip.mp4',
      poster: '/paseo/videos/sala/poster.webp',
    },
  },
  {
    id: 'entrada',
    label: 'Acceso',
    title: 'El umbral.',
    note: 'La cámara entra desde la puerta de madera y abre el volumen de la sala.',
    base: '/paseo/property/entrada',
    depth: '/paseo/property/entrada-depth.png',
    aspect: 16 / 9,
    focus: 0.72,
    video: {
      webm: '/paseo/videos/entrada/clip.webm',
      mp4: '/paseo/videos/entrada/clip.mp4',
      poster: '/paseo/videos/entrada/poster.webp',
    },
  },
  {
    id: 'cocina',
    label: 'Cocina',
    title: 'La cocina, al frente.',
    note: 'Barra, fregadero, estufa de acero y comedor de madera en un mismo frente.',
    base: '/paseo/property/cocina',
    depth: '/paseo/property/cocina-depth.png',
    aspect: 16 / 9,
    focus: 0.68,
    video: {
      webm: '/paseo/videos/cocina/clip.webm',
      mp4: '/paseo/videos/cocina/clip.mp4',
      poster: '/paseo/videos/cocina/poster.webp',
    },
  },
]

export const gallery: GalleryImage[] = [
  {
    base: '/paseo/property/sala',
    alt: 'Sala con sofá gris, sillones verdes y mesa de madera.',
    label: 'Sala',
    aspect: 16 / 9,
  },
  {
    base: '/paseo/property/cocina-2',
    alt: 'Cocina con comedor de madera, barra y estufa de acero.',
    label: 'Cocina',
    aspect: 4 / 3,
  },
  {
    base: '/paseo/property/sala-3',
    alt: 'Sala vista desde el comedor, con sofá y cuadro del gallo.',
    label: 'Sala',
    aspect: 4 / 3,
  },
  {
    base: '/paseo/property/cocina-1',
    alt: 'Cocina con estufa, campana y puerta hacia la recámara.',
    label: 'Cocina',
    aspect: 4 / 3,
  },
  {
    base: '/paseo/property/entrada',
    alt: 'Puerta de madera de doble hoja y ventanal hacia el exterior.',
    label: 'Acceso',
    aspect: 16 / 9,
  },
  {
    base: '/paseo/property/cocina',
    alt: 'Cocina con alacena verde, mesa de madera y barra.',
    label: 'Cocina',
    aspect: 16 / 9,
  },
]
