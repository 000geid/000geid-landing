export interface ProjectStory {
  title: string
  summary: string
  role?: string
  timeline?: string
  problem: string[]
  solution: string[]
  impact?: string[]
  technologies: string[]
  link?: {
    label: string
    href: string
  }
}

export interface ProjectEntry {
  id: string
  title: string
  description: {
    en: string
    es: string
  }
  tags: string[]
  story: {
    en: ProjectStory
    es: ProjectStory
  }
}

export const projectsData: ProjectEntry[] = [
  {
    id: 'filo',
    title: 'Filo',
    description: {
      en: 'Digitalizing neighborhood gastronomy: interactive QR menus, analytics, and customer reviews.',
      es: 'Digitalizando la gastronomía de barrio: cartas QR interactivas, analíticas y reseñas de clientes.'
    },
    tags: ['SvelteKit', 'Cloudflare', 'D1', 'Hono'],
    story: {
      en: {
        title: 'Filo',
        summary:
          'At lunchtime in Lima, every minute counts. The spark was simple: my father kept buying the same daily menu out of proximity, not preference. Filo exists so the menu of the day is discovered in seconds, not by walking block after block.',
        role: 'Founder • Full-stack end-to-end (UI/UX, backend, deployment)',
        timeline: '2023 - Present',
        problem: [
          'Lunch is a rushed decision: without clear information, people default to the familiar and waste time hunting for alternatives.',
          'Neighborhood menus live on a chalkboard and habit: they change daily, but rarely get published somewhere reliable.',
          'For many small restaurants, “being online” means WhatsApp or nothing: no catalog, no comparability, no discovery.'
        ],
        solution: [
          'A marketplace built specifically for daily menus: simple listings, visible prices/hours, and fast comparison on mobile.',
          'Publish in minutes for owners: upload today’s menu with minimal friction, keeping information fresh by design.',
          'Built end-to-end with performance and shipping speed in mind: mobile-first UX, edge backend, and streamlined deployment.'
        ],
        impact: [
          'Turns an everyday decision into a guided experience: less guesswork, more informed choice.',
          'Gives visibility to small eateries that previously depended on foot traffic and word of mouth.',
          'A clear north star: make the neighborhood menu visible in two taps, every day.'
        ],
        technologies: ['SvelteKit', 'Cloudflare Workers', 'D1', 'R2', 'Hono'],
        link: {
          label: 'Visit Filo',
          href: 'https://filoapp.ogeid.xyz'
        }
      },
      es: {
        title: 'Filo',
        summary:
          'En la caótica hora del almuerzo en Lima, cada minuto es valioso. La idea de Filo surgió de una observación personal: ver a mi padre almorzando siempre en el mismo lugar, no por preferencia, sino por la imposibilidad de explorar otras opciones sin perder su hora de descanso. Esa limitación fue el catalizador para crear una solución que digitalizara los menús del barrio, permitiendo que la elección de qué comer pase de ser una apuesta ciega a una decisión informada en segundos.',
        role: 'Founder • Full-stack integral (UI/UX, backend, despliegue)',
        timeline: '2023 - Actualidad',
        problem: [
          'La decisión del almuerzo suele ser frustrante: con poco tiempo y hambre, terminamos eligiendo lo mismo de siempre por falta de información.',
          'Mientras tanto, los restaurantes locales tienen una oferta increíble que cambia todos los días, pero que muere escrita en una pizarra invisible para el mundo digital.',
          'Existe una brecha enorme: negocios con gran comida pero sin alcance, y comensales buscando variedad sin saber dónde encontrarla.'
        ],
        solution: [
          'Filo nace para conectar estos dos mundos: una plataforma donde el menú del día se publica y descubre al instante.',
          'Simplificamos la digitalización al extremo: permitiendo que los dueños publiquen su oferta diaria en segundos, manteniendo la información siempre fresca.',
          'Entregamos a los usuarios el poder de elegir: comparar precios, platos y cercanía desde el celular, rompiendo la inercia de "ir al sitio de siempre".'
        ],
        impact: [
          'Convertimos la búsqueda del almuerzo en una experiencia de descubrimiento, ahorrando tiempo y mejorando la satisfacción diaria.',
          'Empoderamos a los pequeños restaurantes con visibilidad digital real, permitiéndoles competir por calidad y no solo por ubicación.',
          'Redefinimos la gastronomía de barrio, creando un ecosistema local más dinámico, transparente y conectado.'
        ],
        technologies: ['SvelteKit', 'Cloudflare Workers', 'D1', 'R2', 'Hono'],
        link: {
          label: 'Visitar Filo',
          href: 'https://filoapp.ogeid.xyz'
        }
      }
    }
  },
  {
    id: 'plandeck',
    title: 'Plandeck',
    description: {
      en: 'Mobile-first kanban board with real-time sync, built for touch-friendly planning on any device.',
      es: 'Tablero kanban mobile-first con sincronización en tiempo real, diseñado para planificación táctil en cualquier dispositivo.'
    },
    tags: ['React', 'Vite', 'Convex', 'Cloudflare Workers'],
    story: {
      en: {
        title: 'Plandeck',
        summary:
          'Plandeck started as a simple need: a kanban board that feels native on mobile. Most boards are desktop-first, and drag-and-drop breaks down on touch devices. The goal was to ship a fast, responsive board with real-time collaboration and a clean, focused UI.',
        role: 'Founder • Full-stack end-to-end (UI/UX, backend, deployment)',
        timeline: '2025 - Present',
        problem: [
          'Kanban tools often optimize for desktop and become frustrating on phones: small hit targets, awkward gestures, and heavy UIs.',
          'Without real-time sync, multi-device planning becomes error-prone: the board state drifts between tabs and devices.',
          'Teams and solo builders still need a lightweight way to spin up multiple boards without complex setup.'
        ],
        solution: [
          'A mobile-first board with touch-friendly drag-and-drop (dnd-kit) and responsive layouts (column tabs on mobile).',
          'Real-time sync using a self-hosted Convex backend, keeping updates consistent across devices.',
          'A simple information architecture: multiple boards, fast add/edit flows, and a UI that stays out of the way.'
        ],
        impact: [
          'Planning stays usable on the go: moving cards on mobile feels predictable and fast.',
          'The same board stays in sync across devices in real time, enabling quick context switching.',
          'A reusable foundation for lightweight project planning, deployed on Cloudflare Workers.'
        ],
        technologies: ['React', 'TypeScript', 'Vite', 'Convex (self-hosted)', 'Cloudflare Workers', 'dnd-kit'],
        link: {
          label: 'Visit Plandeck',
          href: 'https://plandeck.ogeid.xyz'
        }
      },
      es: {
        title: 'Plandeck',
        summary:
          'Plandeck nació de una frustración cotidiana: intentar organizar mis tareas desde el celular y sentir que luchaba contra la interfaz. La mayoría de las herramientas Kanban están diseñadas para mouse y teclado, haciendo que el "drag-and-drop" en pantallas táctiles sea una experiencia torpe. Mi objetivo fue crear lo opuesto: un tablero que se sintiera nativo en móvil, rápido, intuitivo y sincronizado en tiempo real, eliminando el dolor de planificar "on-the-go".',
        role: 'Founder • Full-stack integral (UI/UX, backend, despliegue)',
        timeline: '2025 - Actualidad',
        problem: [
          'Las herramientas de gestión de proyectos suelen ignorar la experiencia móvil: botones pequeños, gestos que se confunden con el scroll y una interfaz sobrecargada que hace imposible mover una tarjeta sin frustración.',
          'Además, la falta de sincronización instantánea real convierte el cambio entre dispositivos en un riesgo de conflictos de versiones, rompiendo el flujo de trabajo.',
          'Faltaba una herramienta que priorizara la agilidad y la simplicidad para el creador solitario, sin la sobrecarga de configuraciones empresariales complejas.'
        ],
        solution: [
          'Diseñé Plandeck con una filosofía "mobile-first": implementando gestos táctiles precisos y una navegación por pestañas para columnas que hace que el uso en pantallas pequeñas sea fluido.',
          'Todo esto respaldado por una sincronización en tiempo real (vía Convex) que asegura que lo que editas en tu teléfono aparece instantáneamente en tu escritorio, sin fricción ni recargas.',
          'Una arquitectura minimalista que permite crear múltiples tableros y gestionar estados con la menor cantidad de clics posible.'
        ],
        impact: [
          'Transformamos la planificación móvil de una tarea tediosa a una experiencia ágil y predecible, donde mover una tarjeta se siente natural.',
          'Logramos una consistencia absoluta entre dispositivos, permitiendo empezar una tarea en el celular y terminarla en la laptop sin perder contexto.',
          'Creamos una base sólida y reutilizable para aplicaciones de gestión rápida, demostrando el poder de las arquitecturas serverless modernas.'
        ],
        technologies: ['React', 'TypeScript', 'Vite', 'Convex (self-hosted)', 'Cloudflare Workers', 'dnd-kit'],
        link: {
          label: 'Visitar Plandeck',
          href: 'https://plandeck.ogeid.xyz'
        }
      }
    }
  }
]
