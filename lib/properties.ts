export interface Property {
  id: string
  title: string
  zone: string
  type: 'Venta' | 'Renta'
  price: string
  numericPrice: number
  bedrooms: number
  bathrooms: number
  constructionArea: string
  landArea?: string
  description: string
  highlights: string[]
  image: string
  featured?: boolean
}

export const REAL_PROPERTIES: Property[] = [
  {
    id: 'solana-residencial-tixcacal',
    title: 'Casa Residencial en Solana',
    zone: 'Tixcacal, Mérida',
    type: 'Venta',
    price: '$2,403,135 MXN',
    numericPrice: 2403135,
    bedrooms: 3,
    bathrooms: 2.5,
    constructionArea: '124.85 m²',
    landArea: '140 m²',
    description: 'Residencia de 3 habitaciones (una flex en PB), piscina, espacio de home office y cochera techada. Excelente opción patrimonial en privada con amenidades.',
    highlights: ['Piscina privada', 'Habitación flex en PB', 'Cochera techada', 'Caseta de seguridad'],
    image: '/ho1.jpg',
    featured: true
  },
  {
    id: 'dzitya-modelo-palenque',
    title: 'Residencia Dzityá - Modelo Palenque',
    zone: 'Dzityá, Mérida (Norte)',
    type: 'Venta',
    price: '$2,159,000 MXN',
    numericPrice: 2159000,
    bedrooms: 3,
    bathrooms: 2.5,
    constructionArea: '135 m²',
    landArea: '166 m²',
    description: 'Propiedad de alta plusvalía en zona norte de Mérida. Amplio terreno con acabados de primera calidad, excelente conectividad a Periférico y centros comerciales.',
    highlights: ['Alta plusvalía norte', 'Terreno de 166 m²', 'Cocina equipada', 'Pasillo de servicio'],
    image: '/ho2.jpg',
    featured: true
  },
  {
    id: 'dzitya-modelo-tulum',
    title: 'Villa Dzityá - Modelo Tulum',
    zone: 'Dzityá, Mérida (Norte)',
    type: 'Venta',
    price: '$2,350,000 MXN',
    numericPrice: 2350000,
    bedrooms: 3,
    bathrooms: 3,
    constructionArea: '148 m²',
    landArea: '166 m²',
    description: 'Diseño arquitectónico moderno con acabados de chukum, recámara principal con walk-in closet y amplia terraza social.',
    highlights: ['Acabados de Chukum', '3 Recámaras con baño', 'Amplia terraza', 'Zona residencial'],
    image: '/ho3.jpg',
    featured: true
  },
  {
    id: 'townhouse-montebello',
    title: 'Townhouse Equipado Montebello',
    zone: 'Montebello, Mérida (Norte)',
    type: 'Venta',
    price: '$3,100,000 MXN',
    numericPrice: 3100000,
    bedrooms: 2,
    bathrooms: 2.5,
    constructionArea: '130 m²',
    description: 'Townhouse de lujo totalmente equipado en la zona de mayor plusvalía del norte de Mérida. Cercano a City Center y La Isla.',
    highlights: ['Ubicación Premium', 'Garage techado para 2 autos', 'Roof garden', 'Seguridad 24/7'],
    image: '/ho4.jpg',
    featured: false
  },
  {
    id: 'residencia-temozon-norte',
    title: 'Residencia en Temozón Norte',
    zone: 'Temozón Norte, Mérida',
    type: 'Venta',
    price: '$4,200,000 MXN',
    numericPrice: 4200000,
    bedrooms: 4,
    bathrooms: 4.5,
    constructionArea: '220 m²',
    landArea: '250 m²',
    description: 'Exclusiva residencia con acabados en piedra maya, piscina iluminada y cuarto de servicio independiente.',
    highlights: ['Piscina con terraza', 'Piedra maya', 'Cuarto de servicio', 'Norte premium'],
    image: '/ho5.jpg',
    featured: true
  },
  {
    id: 'local-comercial-montejo',
    title: 'Local Comercial Prolongación Montejo',
    zone: 'Prolongación Montejo, Mérida',
    type: 'Renta',
    price: '$28,000 MXN / mes',
    numericPrice: 28000,
    bedrooms: 0,
    bathrooms: 2,
    constructionArea: '95 m²',
    description: 'Local comercial en plaza estratégica sobre Prolongación Montejo. Alto flujo vehicular y peatonal, listo para acondicionar.',
    highlights: ['Alto flujo peatonal', 'Estacionamiento para clientes', 'Seguridad nocturna', 'Excelente vitrina'],
    image: '/ho6.jpg',
    featured: false
  }
]
