/**
 * Site-wide ES/EN strings. Spanish is the source of truth (the existing site
 * copy); English entries mirror it for the language switcher.
 */
export const dict = {
  // Navbar
  nav: {
    propiedades: { es: "Propiedades", en: "Properties" },
    contacto: { es: "Contacto", en: "Contact" },
    menu: { es: "Abrir menú de navegación", en: "Open navigation menu" },
    categorias: { es: "Categorías", en: "Categories" },
    testimonios: { es: "Testimonios", en: "Testimonials" },
    sobreNosotros: { es: "Sobre nosotros", en: "About us" },
    paseo: { es: "Paseo", en: "Tour" },
  },

  // Hero
  hero: {
    title: { es: "Confianza. Cercanía. Permanencia.", en: "Trust. Closeness. Permanence." },
    subtitle: {
      es: "Porque una buena decisión merece algo más que un buen servicio: merece un equipo que siga contigo a lo largo del tiempo.",
      en: "Because a good decision deserves more than a good service: it deserves a team that stays with you over time.",
    },
    verCatalogo: { es: "Ver catálogo de propiedades", en: "View property catalog" },
    enviarMensaje: { es: "Enviar mensaje", en: "Send message" },
    explore: { es: "Explorar", en: "Explore" },
    scrollAria: { es: "Desplazarse al siguiente contenido", en: "Scroll to the next content" },
  },

  // Servicios marquee
  servicios: {
    titulo: { es: "Nuestros Servicios", en: "Our Services" },
    subtitulo: {
      es: "Mas que encontrar una propiedad, construimos relaciones que perduran. Te acompañamos en cada decisión inmobiliaria con atención personalizada, compromiso y una relación que no termina con la operación.",
      en: "More than just finding a property, we build lasting relationships. We support you through every real estate decision with personalized attention, commitment, and a connection that extends well beyond the transaction.",
    },
  },

  // Fused section
  fused: {
    badge: { es: "Servicios", en: "Services" },
    titulo: { es: "Renta, venta y zonas destacadas", en: "Rentals, sales and featured areas" },
    renta: { es: "Renta", en: "Rental" },
    venta: { es: "Venta", en: "Sale" },
    zonas: { es: "Zonas", en: "Areas" },
    pasos: { es: "pasos", en: "steps" },
    categorias: { es: "categorías", en: "categories" },
    rentarTitulo: { es: "¿Quieres rentar tu propiedad?", en: "Do you want to rent out your property?" },
    rentarDesc: {
      es: "En WS no solo publicamos tu propiedad. Nos encargamos de todo el proceso para que tú solo disfrutes de los beneficios.",
      en: "At WS we don't just list your property. We handle the entire process so you simply enjoy the benefits.",
    },
    venderTitulo: { es: "¿Quieres vender tu propiedad?", en: "Do you want to sell your property?" },
    venderDesc: {
      es: "Desarrollamos una estrategia de comercialización personalizada para obtener el mejor valor por tu propiedad.",
      en: "We build a personalized sales strategy to obtain the best value for your property.",
    },
    zonasTitulo: { es: "Categorías y Zonas Destacadas", en: "Featured Categories and Areas" },
    zonasDesc: {
      es: "Explora las mejores opciones de inversión patrimonial en el norte y poniente estratégico de Mérida.",
      en: "Explore the best heritage-investment options in Mérida's strategic north and west.",
    },
    rentarMiPropiedad: { es: "Rentar mi propiedad", en: "Rent out my property" },
    venderMiPropiedad: { es: "Vender mi propiedad", en: "Sell my property" },
    buscarCatalogo: { es: "Buscar catálogo", en: "Browse catalog" },
    verPropiedades: { es: "Ver propiedades", en: "View properties" },
    ventas: { es: "Ventas", en: "Sales" },
    rentas: { es: "Rentas", en: "Rentals" },
    ventasDesc: { es: "Casas, departamentos, townhouses y más", en: "Houses, apartments, townhouses and more" },
    rentasDesc: { es: "Propiedades en renta para vivir o invertir", en: "Rental properties to live in or invest" },
    desde2m: { es: "Desde $2M MXN", en: "From $2M MXN" },
    desde5k: { es: "Desde $5,000 MXN/mes", en: "From $5,000 MXN/month" },
  },

  rentSteps: [
    { es: "Asesoría inicial y estimación de valor", en: "Initial advisory and value estimate" },
    { es: "Promoción profesional en portales y redes", en: "Professional listing on portals and social media" },
    { es: "Filtro y calificación de prospectos", en: "Lead screening and qualification" },
    { es: "Revisión documental y verificación", en: "Document review and verification" },
    { es: "Inventario de entrega y acompañamiento", en: "Handover inventory and support" },
    { es: "Seguimiento durante toda la relación", en: "Follow-up throughout the relationship" },
    {
      es: "Acompañamiento jurídico en contratos, convenios, promesas de compraventa y escrituración",
      en: "Legal support for contracts, agreements, purchase promises and deed execution",
    },
  ],

  sellSteps: [
    { es: "Estrategia de comercialización personalizada", en: "Personalized sales strategy" },
    { es: "Estimación profesional de valor", en: "Professional value estimate" },
    { es: "Promoción en portales inmobiliarios y redes", en: "Listing on real-estate portals and social media" },
    { es: "Fotografía profesional y recorrido virtual", en: "Professional photography and virtual tour" },
    { es: "Atención y filtro de prospectos calificados", en: "Qualified-lead handling and screening" },
    { es: "Revisión documental y verificación de fondos", en: "Document review and proof-of-funds verification" },
    { es: "Seguimiento de la operación hasta el cierre", en: "Transaction follow-up through closing" },
    {
      es: "Acompañamiento jurídico en contratos, convenios, promesas de compraventa y escrituración",
      en: "Legal support for contracts, agreements, purchase promises and deed execution",
    },
  ],

  // Propiedades destacadas
  destacadas: {
    titulo: { es: "Propiedades Destacadas", en: "Featured Properties" },
    subtitulo: {
      es: "Catálogo de propiedades destacadas en Mérida, Yucatán.",
      en: "Catalog of featured properties in Mérida, Yucatán.",
    },
    todos: { es: "Todos", en: "All" },
    destacado: { es: "Destacado", en: "Featured" },
    habs: { es: "Habs", en: "Beds" },
    banos: { es: "Baños", en: "Baths" },
    consultarWhatsApp: { es: "Consultar por WhatsApp", en: "Ask on WhatsApp" },
  },

  // Expertise
  expertise: {
    badge: { es: "Asesoría", en: "Advisory" },
    titulo: { es: "¿Por qué asesorarte con WS?", en: "Why choose WS advisory?" },
    subtitulo: {
      es: "No solo publicamos propiedades; construimos relaciones de confianza con un servicio integral, transparente y profesional.",
      en: "We don't just list properties; we build trusting relationships with comprehensive, transparent, professional service.",
    },
    confianza: { es: "Confianza", en: "Trust" },
    trayectoria: { es: "Trayectoria", en: "Track record" },
    proteccion: { es: "Protección", en: "Protection" },
    revisionDocumental: { es: "Revisión documental", en: "Document review" },
    sieteAnios: { es: "+7 años de experiencia", en: "7+ years of experience" },
    prospectos: { es: "Prospectos verificados", en: "Verified prospects" },
    certezaTitulo: { es: "Certeza Jurídica", en: "Legal Certainty" },
    certezaDesc: {
      es: "Revisión documental exhaustiva de cada propiedad para garantizar operaciones seguras sin sorpresas. Acompañamiento y coordinación jurídica inmobiliaria. Te acompañamos durante los procesos legales de tu operación inmobiliaria, coordinando la intervención de abogados especializados y notarías aliadas para brindarte seguimiento y atención en cada etapa.",
      en: "Thorough document review of every property to guarantee safe transactions with no surprises. Real-estate legal support and coordination. We walk with you through the legal processes of your operation, coordinating specialized attorneys and partner notaries to give you follow-up and attention at every stage.",
    },
    experienciaTitulo: { es: "Experiencia Comprobada", en: "Proven Experience" },
    experienciaDesc: {
      es: "Más de 7 años asesorando a propietarios e inversionistas en el mercado inmobiliario de Mérida. Construimos relaciones duraderas mediante confianza, cercanía y compromiso, acompañándote antes, durante y después de cada decisión inmobiliaria.",
      en: "Over 7 years advising owners and investors in Mérida's real-estate market. We build lasting relationships through trust, closeness and commitment, supporting you before, during and after every real-estate decision.",
    },
    filtradoTitulo: { es: "Filtrado Riguroso", en: "Rigorous Screening" },
    filtradoDesc: {
      es: "Evaluamos la capacidad legal y financiera de cada prospecto para proteger el patrimonio de nuestros clientes, reducir riesgos y brindar certeza, transparencia y tranquilidad durante todo el proceso inmobiliario. Verificamos documentación, analizamos antecedentes y damos seguimiento puntual a cada etapa, procurando operaciones seguras, responsables y respaldadas por criterios profesionales que priorizan tus intereses.",
      en: "We assess each prospect's legal and financial capacity to protect our clients' assets, reduce risk, and provide certainty, transparency and peace of mind throughout the real-estate process. We verify documentation, analyze background records and follow up closely at every stage, ensuring safe, responsible transactions backed by professional criteria that put your interests first.",
    },
    conoceAsesoria: { es: "Conoce nuestra asesoría", en: "Discover our advisory" },
  },

  // Globe
  presencia: {
    titulo: { es: "Presencia y Origen de Nuestros Compradores", en: "Presence and Origin of Our Buyers" },
  },

  // Testimonios
  testimonios: {
    titulo: { es: "Lo que dicen nuestros clientes", en: "What our clients say" },
    subtitulo: {
      es: "Experiencias reales de propietarios y compradores atendidos con seriedad, transparencia y filtrado riguroso.",
      en: "Real experiences of owners and buyers served with seriousness, transparency and rigorous screening.",
    },
    drag: { es: "Arrastra para deslizar los testimonios", en: "Scroll to slide the testimonials" },
  },

  // Equipo
  equipo: {
    titulo: { es: "Nuestro Equipo", en: "Our Team" },
    subtitulo: {
      es: "Profesionales comprometidos con la excelencia y la confianza de nuestros clientes.",
      en: "Professionals committed to excellence and to our clients' trust.",
    },
  },

  // Formulario
  formulario: {
    titulo: { es: "Hablemos de tu propiedad", en: "Let's talk about your property" },
    subtitulo: {
      es: "Comparte tus datos y recibe asesoría personalizada para tu operación inmobiliaria.",
      en: "Share your details and receive personalized advice for your real-estate operation.",
    },
  },

  // CTA final
  cta: {
    titulo: { es: "¿Listo para empezar?", en: "Ready to get started?" },
    subtitulo: {
      es: "Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.",
      en: "Contact us today and receive personalized advice for your real-estate operation.",
    },
    contacto: { es: "Contacto", en: "Contact" },
    vender: { es: "Vender mi propiedad", en: "Sell my property" },
    rentar: { es: "Rentar mi propiedad", en: "Rent out my property" },
  },

  // Footer
  footer: {
    sobre: { es: "Sobre Nosotros", en: "About Us" },
    sobreDesc: {
      es: "Nos dedicamos a brindar servicios de asesoría inmobiliaria excepcionales, guiándote en todo el proceso para encontrar tu propiedad perfecta en Mérida, Yucatán.",
      en: "We provide exceptional real-estate advisory services, guiding you through the entire process to find your perfect property in Mérida, Yucatán.",
    },
    sobreDesc2: {
      es: "Nuestro catálogo de propiedades es cuidadosamente seleccionado para garantizar calidad, certeza jurídica y plusvalía.",
      en: "Our property catalog is carefully selected to guarantee quality, legal certainty and value growth.",
    },
    recursos: { es: "Recursos", en: "Resources" },
    infoContacto: { es: "Información de Contacto", en: "Contact Information" },
    redes: { es: "Síguenos en Redes", en: "Follow Us" },
    negocios: { es: "Negocios: ventas@wsinmobiliaria.com", en: "Business: ventas@wsinmobiliaria.com" },
    info: { es: "Información: contacto@wsinmobiliaria.com", en: "Info: contacto@wsinmobiliaria.com" },
    derechos: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    privacidad: { es: "Política de Privacidad", en: "Privacy Policy" },
    terminos: { es: "Términos de Servicio", en: "Terms of Service" },
  },
  // Formulario de contacto
  contact: {
    titulo: { es: "Escríbenos", en: "Write to us" },
    subtitulo: {
      es: "Déjanos tus datos y recibe asesoría inmobiliaria personalizada.",
      en: "Leave your details and receive personalized real-estate advice.",
    },
    nombre: { es: "Nombre", en: "First name" },
    nombrePh: { es: "Tu nombre", en: "Your first name" },
    apellido: { es: "Apellido", en: "Last name" },
    apellidoPh: { es: "Tu apellido", en: "Your last name" },
    telefono: { es: "Número de teléfono", en: "Phone number" },
    telefonoPh: { es: "Ej. +52 999 123 4567", en: "e.g. +52 999 123 4567" },
    correo: { es: "Correo electrónico", en: "Email address" },
    correoPh: { es: "tu@correo.com", en: "you@email.com" },
    ciudad: { es: "Ciudad", en: "City" },
    ciudadPh: { es: "Ej. Mérida, CDMX, Monterrey", en: "e.g. Mérida, CDMX, Monterrey" },
    pais: { es: "País", en: "Country" },
    paisPh: { es: "Ej. México", en: "e.g. Mexico" },
    mensaje: { es: "Mensaje", en: "Message" },
    mensajePh: {
      es: "Cuéntanos qué tipo de propiedad buscas o qué propiedad deseas vender/rentar",
      en: "Tell us what kind of property you are looking for or which property you want to sell/rent",
    },
    palabras: { es: "palabras", en: "words" },
    mensajeHelp: {
      es: "Máximo 200 palabras. La información se confirma directamente con WS Asesoría Inmobiliaria.",
      en: "Maximum 200 words. Information is confirmed directly with WS Asesoría Inmobiliaria.",
    },
    restablecer: { es: "Restablecer", en: "Reset" },
    enviar: { es: "Enviar Formulario", en: "Send Form" },
    enviando: { es: "Enviando...", en: "Sending..." },
    error: {
      es: "Hubo un error al enviar. Intenta de nuevo o contáctanos por WhatsApp.",
      en: "There was an error sending. Please try again or contact us on WhatsApp.",
    },
    successTitulo: { es: "¡Mensaje Recibido!", en: "Message received!" },
    successDesc: {
      es: "Gracias por ponerte en contacto. Si deseas respuesta inmediata por WhatsApp, presiona el botón a continuación.",
      en: "Thank you for reaching out. If you'd like an immediate reply on WhatsApp, press the button below.",
    },
    successCta: { es: "Continuar por WhatsApp", en: "Continue on WhatsApp" },
    whatsappSaludo: { es: "Hola Wendy, mi nombre es", en: "Hi Wendy, my name is" },
    whatsappDesde: { es: "Les escribo desde", en: "I'm writing from" },
    whatsappMensaje: { es: "Mensaje", en: "Message" },
  },

  // Modal de equipo
  modal: {
    titulo: { es: "Equipo", en: "Team" },
    general: {
      es: "Selecciona con quién deseas comunicarte vía WhatsApp para una atención personalizada.",
      en: "Choose who you'd like to contact on WhatsApp for personalized attention.",
    },
    conProp: { es: "¿Con quién deseas consultar sobre", en: "Who would you like to ask about" },
    wendyRole: {
      es: "Asesora Inmobiliaria | Licenciada INAPIM y especialista en Certeza Jurídica",
      en: "Real Estate Advisor | INAPIM licensed and Legal Certainty specialist",
    },
    joseRole: {
      es: "Asesor Inmobiliario | Estrategias Patrimoniales y Administrativas",
      en: "Real Estate Advisor | Asset and Administrative Strategies",
    },
    consultar: { es: "Consultar por WhatsApp", en: "Ask on WhatsApp" },
  },

  // Página de propiedades
  propiedades: {
    badge: { es: "Catálogo", en: "Catalog" },
    titulo: { es: "Catálogo de Propiedades", en: "Property Catalog" },
    subtitulo: {
      es: "Explora nuestra selección de propiedades en Mérida, Yucatán. Encuentra la inversión perfecta o tu próximo hogar.",
      en: "Explore our selection of properties in Mérida, Yucatán. Find the perfect investment or your next home.",
    },
    ventas: { es: "Ventas", en: "Sales" },
    rentas: { es: "Rentas", en: "Rentals" },
    buscarPh: { es: "Buscar por palabra: zona, nombre, precio...", en: "Search by keyword: area, name, price..." },
    filtros: { es: "Filtros", en: "Filters" },
    price: { es: "Rango de precio", en: "Price range" },
    priceMin: { es: "Precio mínimo", en: "Minimum price" },
    priceMax: { es: "Precio máximo", en: "Maximum price" },
    amenidades: { es: "Amenidades", en: "Amenities" },
    todos: { es: "Todos", en: "All" },
    encontradas: { es: "propiedades encontradas", en: "properties found" },
    limpiar: { es: "Limpiar filtros", en: "Clear filters" },
    emptyTitulo: { es: "No se encontraron propiedades", en: "No properties found" },
    emptyDesc: {
      es: "No hay propiedades que coincidan con tu búsqueda. Intenta ajustar los filtros o explorar otras categorías.",
      en: "No properties match your search. Try adjusting the filters or exploring other categories.",
    },
    anterior: { es: "Anterior", en: "Previous" },
    siguiente: { es: "Siguiente", en: "Next" },
    ctaTitulo: { es: "¿No encuentras lo que buscas?", en: "Can't find what you're looking for?" },
    ctaDesc: {
      es: "Contáctanos y te ayudamos a encontrar la propiedad ideal para ti. Tenemos acceso a más opciones en el mercado.",
      en: "Contact us and we'll help you find the ideal property for you. We have access to more options on the market.",
    },
    ctaBoton: { es: "Contactar a Wendy", en: "Contact Wendy" },
    habs: { es: "Habs", en: "Beds" },
    banos: { es: "Baños", en: "Baths" },
    consultar: { es: "Consultar por WhatsApp", en: "Ask on WhatsApp" },
    destacado: { es: "Destacado", en: "Featured" },
    typeVenta: { es: "Venta", en: "For Sale" },
    typeRenta: { es: "Renta", en: "For Rent" },
  },

  amenity: {
    "mascotas-permitidas": { es: "Mascotas permitidas", en: "Pets allowed" },
    "dos-plantas": { es: "Dos plantas", en: "Two stories" },
    piscina: { es: "Piscina", en: "Pool" },
    "acceso-discapacitados": { es: "Acceso discapacitados", en: "Wheelchair access" },
    "aire-acondicionado": { es: "Aire acondicionado", en: "Air conditioning" },
  } as Record<string, { es: string; en: string }>,

  category: {
    casas: { es: "Casas", en: "Houses" },
    departamentos: { es: "Departamentos", en: "Apartments" },
    townhouses: { es: "Townhouses", en: "Townhouses" },
    "naves-industriales": { es: "Naves Industriales", en: "Industrial Warehouses" },
    "locales-comerciales": { es: "Locales Comerciales", en: "Commercial Units" },
    "lotes-inversion": { es: "Lotes de Inversión", en: "Investment Lots" },
    terrenos: { es: "Terrenos", en: "Land" },
    oficinas: { es: "Oficinas", en: "Offices" },
  } as Record<string, { es: string; en: string }>,
  // Equipo (tarjetas del landing)
  team: {
    wendyPosition: {
      es: "Directora General / Asesora Inmobiliaria Certificada-Licencia REAI-INSEJUPY-A-00027",
      en: "General Director / Certified Real Estate Advisor — License REAI-INSEJUPY-A-00027",
    },
    wendyMessage: {
      es: "Más de 7 años de experiencia. Especialista en relaciones a largo plazo con propietarios.",
      en: "Over 7 years of experience. Specialist in long-term relationships with property owners.",
    },
    josePosition: {
      es: "Director De Finanzas Y Operaciones / Asesor Inmobiliario Certificado",
      en: "Finance and Operations Director / Certified Real Estate Advisor",
    },
    joseMessage: {
      es: "Contador Público con más de 25 años de experiencia. Gestión operativa de compra, venta y renta.",
      en: "Public Accountant with over 25 years of experience. Operational management of purchases, sales and rentals.",
    },
    wendyChips: [
      { es: "Asesora Inmobiliaria Certificada", en: "Certified Real Estate Advisor" },
      { es: "Especialista en Renta y Venta Residencial", en: "Residential Rental & Sales Specialist" },
      { es: "Cierre de Operaciones", en: "Deal Closing" },
    ],
    joseChips: [
      { es: "Asesor Inmobiliario Certificado", en: "Certified Real Estate Advisor" },
      { es: "Gestión de Operaciones", en: "Operations Management" },
      { es: "Análisis Financiero", en: "Financial Analysis" },
    ],
  },

  // Sobre nosotros
  sobre: {
    badge: { es: "Sobre nosotros", en: "About us" },
    titulo: { es: "WS Asesoría Inmobiliaria", en: "WS Asesoría Inmobiliaria" },
    intro1: {
      es: "Somos un equipo profesional que acompaña a quienes buscan comprar o rentar una propiedad, así como a propietarios que desean vender o poner su propiedad en renta.",
      en: "We are a professional team that supports those looking to buy or rent a property, as well as owners who want to sell or list their property for rent.",
    },
    intro2: {
      es: "Más que publicar propiedades, acompañamos cada operación con experiencia, orden y atención profesional.",
      en: "More than listing properties, we support every transaction with experience, order and professional attention.",
    },
    serviciosLabel: { es: "Nuestros servicios", en: "Our services" },
    brandSub: { es: "Asesoría Inmobiliaria", en: "Real Estate Advisory" },
    servicioCompra: { es: "Compra", en: "Buying" },
    servicioVenta: { es: "Venta", en: "Selling" },
    servicioRenta: { es: "Renta", en: "Rentals" },
    servicioComercializacion: { es: "Comercialización", en: "Marketing" },
    servicioAsesoria: { es: "Asesoría", en: "Advisory" },
    rentasTitulo: {
      es: "Rentas que van más allá de publicar una propiedad",
      en: "Rentals that go beyond listing a property",
    },
    rentasP1: {
      es: "Cuando un propietario nos confía una propiedad para renta, nuestro trabajo comienza mucho antes de encontrar a un inquilino.",
      en: "When an owner entrusts us with a property for rent, our work begins long before finding a tenant.",
    },
    procesoLabel: { es: "Proceso de renta", en: "Rental process" },
    procesoIntro: {
      es: "Asesoramos al propietario durante todo el proceso:",
      en: "We advise the owner throughout the process:",
    },
    rentaSteps: [
      { es: "Asesoría inicial", en: "Initial advisory" },
      { es: "Promoción de la propiedad", en: "Property promotion" },
      { es: "Filtro de prospectos", en: "Lead screening" },
      { es: "Revisión de documentación", en: "Document review" },
      { es: "Contrato", en: "Contract" },
      { es: "Convenio", en: "Agreement" },
      { es: "Inventario", en: "Inventory" },
      { es: "Entrega", en: "Handover" },
      { es: "Seguimiento", en: "Follow-up" },
    ],
    procesoNote: {
      es: "Con acompañamiento de nuestro equipo jurídico.",
      en: "With support from our legal team.",
    },
    rentasP2: {
      es: "Realizamos un proceso de filtro y revisión, damos seguimiento al proceso para que el propietario tenga mayor claridad y respaldo durante la operación.",
      en: "We carry out a screening and review process, and follow up so the owner has greater clarity and support during the transaction.",
    },
    rentasP3: {
      es: "Nosotros nos ocupamos del proceso inmobiliario; el propietario conserva la tranquilidad de saber que su propiedad está siendo atendida profesionalmente.",
      en: "We take care of the real-estate process; the owner keeps the peace of mind of knowing their property is being handled professionally.",
    },
    quote: {
      es: "Porque para nosotros, rentar una propiedad no consiste solamente en encontrar a alguien que la ocupe. Se trata de cuidar el proceso, filtrar adecuadamente y proteger la relación entre propietario e inquilino.",
      en: "Because for us, renting out a property is not just about finding someone to occupy it. It is about caring for the process, screening properly and protecting the relationship between owner and tenant.",
    },
    ventaTitulo: {
      es: "Vender una propiedad es más que publicarla",
      en: "Selling a property is more than listing it",
    },
    ventaP1: {
      es: "Cuando un propietario nos confía una propiedad para venta, lo asesoramos durante todo el proceso: desde definir una estrategia de comercialización y, cuando corresponde, realizar una Estimación de valor para orientar el precio, hasta la promoción, atención y filtro de prospectos.",
      en: "When an owner entrusts us with a property for sale, we advise them throughout the process: from defining a marketing strategy and, when appropriate, preparing a value estimate to guide the price, through promotion, attention and lead screening.",
    },
    ventaP2: {
      es: "También damos seguimiento a la revisión de la documentación, identificando lo que debe estar en orden para avanzar con la operación, y acompañamos al propietario durante las distintas etapas del proceso de venta, con respaldo y acompañamiento jurídico cuando corresponde.",
      en: "We also follow up on document review, identifying what must be in order to move the transaction forward, and we support the owner through the different stages of the sale process, with legal backing and support when appropriate.",
    },
    whyBadge: { es: "Confianza", en: "Trust" },
    whyTitulo: { es: "¿Por qué trabajar con WS?", en: "Why work with WS?" },
    whyP: {
      es: "Porque una operación inmobiliaria requiere más que mostrar una propiedad y publicarla.",
      en: "Because a real-estate transaction requires more than showing and listing a property.",
    },
    razon1Tag: { es: "Experiencia", en: "Experience" },
    razon1Note: { es: "Acompañamiento", en: "Support" },
    razon1Title: { es: "Experiencia y acompañamiento", en: "Experience and support" },
    razon1Desc: {
      es: "En WS combinamos experiencia, conocimiento del mercado y acompañamiento profesional para orientar a clientes durante cada etapa del proceso.",
      en: "At WS we combine experience, market knowledge and professional support to guide clients through every stage of the process.",
    },
    razon2Tag: { es: "Proceso", en: "Process" },
    razon2Note: { es: "Orden y claridad", en: "Order and clarity" },
    razon2Title: { es: "Proceso ordenado", en: "An orderly process" },
    razon2Desc: {
      es: "Trabajamos con un proceso ordenado que incluye comercialización, promoción, atención y filtro de prospectos, revisión de documentación y seguimiento, además de acompañamiento jurídico cuando corresponde.",
      en: "We work with an orderly process that includes marketing, promotion, attention and lead screening, document review and follow-up, plus legal support when appropriate.",
    },
    razon3Tag: { es: "Respaldo", en: "Backing" },
    razon3Note: { es: "Certeza", en: "Certainty" },
    razon3Title: { es: "Orden, claridad y respaldo", en: "Order, clarity and backing" },
    razon3Desc: {
      es: "Nuestro objetivo es que cada operación se lleve a cabo con orden, claridad y el respaldo necesario, cuidando tanto el proceso como el patrimonio involucrado.",
      en: "Our goal is for every transaction to be carried out with order, clarity and the necessary backing, caring for both the process and the assets involved.",
    },
    whyCta: { es: "Hablemos de tu propiedad", en: "Let's talk about your property" },
    teamTitulo: { es: "Nuestro Equipo", en: "Our Team" },
    wendyRole: {
      es: "Directora General | Asesora Inmobiliaria",
      en: "General Director | Real Estate Advisor",
    },
    joseRole: {
      es: "Director de Finanzas y Operaciones | Asesor Inmobiliario",
      en: "Finance and Operations Director | Real Estate Advisor",
    },
    rowLicencia: { es: "Licencia inmobiliaria", en: "Real estate license" },
    rowFolio: { es: "Folio CONOCER", en: "CONOCER folio" },
    rowCertificacion: { es: "Certificación", en: "Certification" },
    inapimDesc: {
      es: "Asesor Inmobiliario Certificado INAPIM — Instituto Nacional de Asesores Profesionales Inmobiliarios de México",
      en: "INAPIM Certified Real Estate Advisor — National Institute of Professional Real Estate Advisors of Mexico",
    },
    enProceso: { es: "EN PROCESO", en: "IN PROGRESS" },
    ctaTitulo: { es: "¿Listo para empezar?", en: "Ready to get started?" },
    ctaP: {
      es: "Contáctanos hoy y recibe asesoría personalizada para tu operación inmobiliaria.",
      en: "Contact us today and receive personalized advice for your real-estate operation.",
    },
    ctaBoton: { es: "Contacto", en: "Contact" },
  },
} as const

export type Dict = typeof dict

/**
 * Localizes listing titles without altering their meaning: the catalog uses a
 * strict "<Tipo> en <Venta|Renta> en <Zona>, <Ciudad>, Yucatán" pattern, so only
 * the leading type/operation phrase is translated; place names stay untouched.
 */
export function localizePropertyTitle(title: string, locale: "es" | "en") {
  if (locale !== "en") return title
  const map: [RegExp, string][] = [
    [/^Departamento en Renta en /, "Apartment for Rent in "],
    [/^Departamento en Venta en /, "Apartment for Sale in "],
    [/^Casa en Renta en /, "House for Rent in "],
    [/^Casa en Venta en /, "House for Sale in "],
    [/^Terreno en Renta en /, "Land for Rent in "],
    [/^Terreno en Venta en /, "Land for Sale in "],
    [/^Townhouse en Renta en /, "Townhouse for Rent in "],
    [/^Townhouse en Venta en /, "Townhouse for Sale in "],
    [/^Local Comercial en Renta en /, "Commercial Unit for Rent in "],
    [/^Local Comercial en Venta en /, "Commercial Unit for Sale in "],
    [/^Oficina en Renta en /, "Office for Rent in "],
    [/^Oficina en Venta en /, "Office for Sale in "],
    [/^Nave Industrial en Renta en /, "Industrial Warehouse for Rent in "],
    [/^Nave Industrial en Venta en /, "Industrial Warehouse for Sale in "],
  ]
  for (const [pattern, replacement] of map) {
    if (pattern.test(title)) return title.replace(pattern, replacement)
  }
  return title
}
