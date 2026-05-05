import type { ProjectLucideGlyph } from '$lib/project-lucide';

/** Display grouping on /projects — products vs OSS. */
export type PortfolioGroup = 'products' | 'oss' | 'client'

export interface ProjectStory {
  title: string
  summary: string
  role?: string
  timeline?: string
  problem: string[]
  solution: string[]
  impact?: string[]
  technologies: string[]
  /** Architecture / design patterns — rendered separately from the tech stack. */
  patterns?: string[]
  link?: {
    label: string
    href: string
  }
}

/** Branded chrome on /projects/[id] via html[data-project-detail] (tokens in app.css). */
export type ProjectDetailTheme = 'filo' | 'plandeck' | 'cuecast' | 'openfeed'

export interface ProjectEntry {
  id: string
  title: string
  /** Lucide glyph for `/projects` list tiles (see `project-lucide.ts`). */
  lucideGlyph: ProjectLucideGlyph
  /** Products vs OSS (extend with `client` if a freelance gallery returns). */
  portfolioGroup: PortfolioGroup
  mode?: 'case-study' | 'freelance-gallery'
  detailTheme?: ProjectDetailTheme
  description: {
    en: string
    es: string
  }
  company?: {
    name: string
    logo: string
    website?: string
  }
  screenshots?: Array<{
    src: string
    alt: {
      en: string
      es: string
    }
  }>
  freelanceClients?: Array<{
    id: string
    name: string
    logo: string
    website?: string
    summary: {
      en: string
      es: string
    }
    screenshots: Array<{
      src: string
      alt: {
        en: string
        es: string
      }
    }>
  }>
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
    lucideGlyph: 'utensils',
    portfolioGroup: 'products',
    detailTheme: 'filo',
    description: {
      en: 'Digitalizing neighborhood gastronomy: interactive QR menus, analytics, and customer reviews.',
      es: 'Digitalizando la gastronomía de barrio: cartas QR interactivas, analíticas y reseñas de clientes.'
    },
    tags: ['SvelteKit', 'Cloudflare', 'D1', 'Hono'],
    /** Gallery images: regenerate with `npm run capture:filo` (see scripts/capture-filo.mjs). */
    screenshots: [
      {
        src: '/images/filo/filo-1.png',
        alt: {
          en: 'Filo — landing hero focused on diner discovery (Spanish)',
          es: 'Filo — hero de la landing y propuesta para comensales'
        }
      },
      {
        src: '/images/filo/filo-2.png',
        alt: {
          en: 'Marketing — diner and restaurant sections, feature bullets',
          es: 'Sitio público — secciones para comensales y restaurantes'
        }
      },
      {
        src: '/images/filo/filo-3.png',
        alt: {
          en: 'Restaurant list — mobile search, filters, and venues on /restaurants',
          es: 'Listado en /restaurants — búsqueda, filtros y tarjetas de locales'
        }
      },
      {
        src: '/images/filo/filo-4.png',
        alt: {
          en: 'Digital Carta tab — categories and dishes from a venue menu page',
          es: 'Pestaña Carta — categorías y platos del menú digital del local'
        }
      }
    ],
    story: {
      en: {
        title: 'Filo',
        summary:
          'At lunchtime in Lima, every minute counts. My father would eat at the same place every day — not because it was his favorite, but because he had no time to find anything better. Filo exists to turn that missed choice into a decision you can make in seconds.',
        role: 'Founder • Full-stack end-to-end (UI/UX, backend, deployment)',
        timeline: '2023 - Present',
        problem: [
          'Lunch decisions happen under pressure — and when you\'re short on time, you stick to whatever\'s nearby, not whatever\'s best.',
          'Neighborhood menus change daily but live on chalkboards. Owners who want to be online end up on WhatsApp — no catalog, no visibility, no way to be discovered.',
          'For small restaurants, not being findable online means competing only on foot traffic. The best food on the block can still be the least chosen.'
        ],
        solution: [
          'A marketplace built for daily menus: fast listings, visible prices and hours, and easy comparison on mobile — designed for the five-minute lunch window.',
          'Restaurant owners can publish today\'s menu in minutes. No technical know-how required, no ongoing setup.',
          'Built for performance from the start: fast loading on any connection, works on any mobile device, and deploys in a single step.'
        ],
        impact: [
          'Turns a rushed habit into a real choice — people can find and compare options without leaving their desk.',
          'Gives small eateries a real online presence, so they compete on quality, not just location.',
          'A clear north star: the neighborhood menu, visible in two taps, every day.'
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
          'A la hora del almuerzo en Lima, cada minuto cuenta. Mi padre volvía al mismo lugar todos los días — no porque fuera su favorito, sino porque no tenía tiempo de buscar otra opción. Filo existe para convertir esa elección perdida en una decisión que se toma en segundos.',
        role: 'Founder • Full-stack integral (UI/UX, backend, despliegue)',
        timeline: '2023 - Actualidad',
        problem: [
          'El almuerzo se decide bajo presión: con poco tiempo, terminamos eligiendo lo de siempre, aunque no sea lo mejor.',
          'Los menús de barrio cambian a diario pero viven en una pizarra. Los dueños que quieren estar online terminan en WhatsApp — sin catálogo, sin visibilidad, sin forma de ser descubiertos.',
          'Para los restaurantes pequeños, no ser encontrable online significa competir solo por ubicación. La mejor comida de la cuadra puede ser la menos elegida.'
        ],
        solution: [
          'Un marketplace pensado para el menú del día: listados rápidos, precios y horarios visibles, y comparación fácil desde el celular — diseñado para la ventana de cinco minutos del almuerzo.',
          'Los dueños pueden publicar el menú del día en minutos. Sin conocimientos técnicos, sin configuración complicada.',
          'Construido para funcionar rápido desde el primer día: carga en cualquier conexión, anda en cualquier celular, y se despliega en un paso.'
        ],
        impact: [
          'Convierte un hábito apresurado en una elección real — la gente puede comparar opciones sin moverse de su silla.',
          'Da a los pequeños restoranes una presencia online real, para que compitan por calidad y no solo por cercanía.',
          'Una dirección clara: el menú del barrio, visible en dos toques, todos los días.'
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
    lucideGlyph: 'kanban',
    portfolioGroup: 'products',
    detailTheme: 'plandeck',
    description: {
      en: 'Mobile-first kanban board with real-time sync, built for touch-friendly planning on any device.',
      es: 'Tablero kanban mobile-first con sincronización en tiempo real, diseñado para planificación táctil en cualquier dispositivo.'
    },
    tags: ['React', 'Vite', 'Convex', 'Cloudflare Workers'],
    /** Gallery images: regenerate with `npm run capture:plandeck` (see scripts/capture-plandeck.mjs). */
    screenshots: [
      {
        src: '/images/plandeck/plandeck-1.png',
        alt: {
          en: 'Live site — landing hero with product positioning (Spanish)',
          es: 'Sitio público — hero de la landing con el mensaje de producto'
        }
      },
      {
        src: '/images/plandeck/plandeck-2.png',
        alt: {
          en: 'Feature highlight — Kanban boards and onboarding copy on mobile',
          es: 'Bloque de funciones — tableros Kanban y texto de valor en mobile'
        }
      },
      {
        src: '/images/plandeck/plandeck-3.png',
        alt: {
          en: 'Create-account flow — form layout, SSO entry point, branded shell',
          es: 'Alta de cuenta — layout del formulario, Google y marca'
        }
      },
      {
        src: '/images/plandeck/plandeck-4.png',
        alt: {
          en: 'Sign-in screen — same design system before entering the workspace',
          es: 'Pantalla de inicio de sesión — mismo diseño antes del tablero'
        }
      }
    ],
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
          'Transformé la planificación móvil de una tarea tediosa a una experiencia ágil y predecible, donde mover una tarjeta se siente natural.',
          'Logré una consistencia absoluta entre dispositivos, permitiendo empezar una tarea en el celular y terminarla en la laptop sin perder contexto.',
          'Creé una base sólida y reutilizable para aplicaciones de gestión rápida, demostrando el poder de las arquitecturas serverless modernas.'
        ],
        technologies: ['React', 'TypeScript', 'Vite', 'Convex (self-hosted)', 'Cloudflare Workers', 'dnd-kit'],
        link: {
          label: 'Visitar Plandeck',
          href: 'https://plandeck.ogeid.xyz'
        }
      }
    }
  },
  {
    id: 'openfeed',
    title: 'Openfeed',
    lucideGlyph: 'rss',
    portfolioGroup: 'oss',
    detailTheme: 'openfeed',
    description: {
      en: 'A real-time content feed platform — live, open-source, and built with clean domain architecture you can explore without signing up.',
      es: 'Plataforma de feed en tiempo real—en producción, open-source y con arquitectura por dominios que podés explorar sin registrarte.'
    },
    tags: ['TypeScript', 'DDD', 'Open Source', 'Feed Platform'],
    /** Gallery images: regenerate with `npm run capture:openfeed` (see scripts/capture-openfeed.mjs). */
    screenshots: [
      {
        src: '/images/openfeed/openfeed-1.png',
        alt: {
          en: 'Openfeed — top of the live feed (Spanish UI)',
          es: 'Openfeed — parte superior del feed en producción'
        }
      },
      {
        src: '/images/openfeed/openfeed-2.png',
        alt: {
          en: 'Openfeed — scrolled feed with headlines and cards',
          es: 'Openfeed — scroll del listado de noticias y tarjetas'
        }
      },
      {
        src: '/images/openfeed/openfeed-3.png',
        alt: {
          en: 'Openfeed — article/detail or deeper feed view',
          es: 'Openfeed — detalle de artículo o vista más profunda del feed'
        }
      },
      {
        src: '/images/openfeed/openfeed-4.png',
        alt: {
          en: 'Openfeed — reading chrome or returned top of feed',
          es: 'Openfeed — lectura o vuelta al inicio del feed'
        }
      }
    ],
    story: {
      en: {
        title: 'Openfeed',
        summary:
          'Openfeed is a content feed platform I build through Triple0 Labs, my studio. It\'s live at openfeed.ogeid.xyz — no account required to try it. The codebase is open-source, designed with Domain-Driven Design, and structured so authoring, ingestion, and delivery are independent layers anyone can understand and extend.',
        role: 'Founder • Triple0 Labs (product, platform & engineering)',
        timeline: '2025 - Present',
        problem: [
          'Every team building a feed product starts from scratch on the same core infrastructure: how content gets created, validated, stored, and delivered. That\'s weeks of foundational work before any real product decisions can happen.',
          'Most existing feed platforms are closed systems — you can\'t meaningfully evaluate integration until you\'re already committed to a paid plan or a long onboarding process.',
          'Without clean architectural boundaries, feed systems become fragile over time: adding a new content type or delivery channel ends up touching unrelated code, and each change gets harder.'
        ],
        solution: [
          'A fully deployed sandbox at openfeed.ogeid.xyz — the same codebase that runs in production, open to explore without any setup. What you test is what ships.',
          'Designed with Domain-Driven Design from the start: Authoring, Ingestion, and Delivery are isolated domains with clear contracts between them. Each evolves independently without breaking the others.',
          'Explicit release cadence and open development keep the live product and the public codebase in sync — real production feedback goes back into the architecture, not a private fork.'
        ],
        impact: [
          'Anyone evaluating content feed infrastructure can go from first look to real, hands-on testing in under five minutes — no sales call, no setup.',
          'The DDD structure makes the codebase readable at a glance — contributors can navigate the domain model without a guide, and integrators know exactly where to look.',
          'A credible open baseline that studios and teams can extend to their specific pipeline, rather than building the same foundation from scratch every time.'
        ],
        technologies: ['TypeScript', 'Open Source'],
        patterns: ['Domain-Driven Design (DDD)'],
        link: {
          label: 'Visit Openfeed',
          href: 'https://openfeed.ogeid.xyz'
        }
      },
      es: {
        title: 'Openfeed',
        summary:
          'Openfeed es una plataforma de feeds de contenido que construyo desde Triple0 Labs, mi estudio. Está en producción en openfeed.ogeid.xyz — podés probarla sin crear una cuenta. El código es open-source, diseñado con Domain-Driven Design, y estructurado de modo que autoría, ingesta y entrega son capas independientes que cualquiera puede entender y extender.',
        role: 'Fundador • Triple0 Labs (producto, plataforma e ingeniería)',
        timeline: '2025 - Actualidad',
        problem: [
          'Cada equipo que construye un producto de feed empieza desde cero con la misma infraestructura base: cómo se crea, valida, almacena y entrega el contenido. Son semanas de trabajo antes de poder tomar las decisiones reales del producto.',
          'La mayoría de las plataformas de feeds son sistemas cerrados — no podés evaluar la integración de forma real hasta haber aceptado un plan de pago o completado un onboarding largo.',
          'Sin límites arquitectónicos claros, los sistemas de feed se vuelven frágiles: agregar un tipo de contenido o canal de entrega termina tocando código no relacionado, y cada cambio se vuelve más difícil.'
        ],
        solution: [
          'Un sandbox completamente desplegado en openfeed.ogeid.xyz — el mismo código que corre en producción, disponible para explorar sin ninguna configuración previa. Lo que probás es lo que se publica.',
          'Diseñado con Domain-Driven Design desde el inicio: Autoría, Ingesta y Entrega son dominios aislados con contratos claros entre ellos. Cada uno evoluciona de forma independiente sin romper los demás.',
          'Una cadencia de releases explícita y el desarrollo abierto mantienen el producto en producción y el código público sincronizados — el feedback real alimenta la arquitectura, no un fork privado.'
        ],
        impact: [
          'Cualquier persona evaluando infraestructura de feeds puede pasar de la primera mirada a pruebas reales en menos de cinco minutos — sin llamada de ventas, sin configuración.',
          'La estructura DDD hace que el código sea legible de un vistazo — los colaboradores pueden navegar el modelo de dominio sin una guía, y los integradores saben exactamente dónde buscar.',
          'Una base open-source creíble que estudios y equipos pueden extender a su pipeline específico, en lugar de construir la misma fundación desde cero cada vez.'
        ],
        technologies: ['TypeScript', 'Open Source'],
        patterns: ['Domain-Driven Design (DDD)'],
        link: {
          label: 'Visitar Openfeed',
          href: 'https://openfeed.ogeid.xyz'
        }
      }
    }
  },
  {
    id: 'cuecast',
    title: 'Cuecast',
    lucideGlyph: 'headphones',
    portfolioGroup: 'oss',
    detailTheme: 'cuecast',
    description: {
      en: 'A virtual desktop soundboard for streamers, enabling audio triggering and routing to virtual devices.',
      es: 'Soundboard virtual de escritorio para streamers, permitiendo disparar audio y rutearlo a dispositivos virtuales.'
    },
    tags: ['Electron', 'React', 'TypeScript', 'Vite'],
    story: {
      en: {
        title: 'Cuecast',
        summary:
          'Cuecast is a virtual soundboard designed to replace expensive hardware for streamers. It runs on your desktop, allowing you to trigger sounds via clicks or global hotkeys and route them directly to virtual audio devices for seamless OBS integration.',
        role: 'Creator • Full-stack end-to-end (Electron, React, Audio routing)',
        timeline: '2024 - Present',
        problem: [
          'Hardware soundboards like Elgato Stream Deck are prohibitively expensive for new streamers.',
          'Existing software solutions often lack reliable audio routing capabilities, making it hard to separate sound effects from other system audio in OBS.',
          'Generic soundboard apps often lack global hotkey support, requiring the window to be focused to work.'
        ],
        solution: [
          'Built a cross-platform Electron app that mimics the functionality of a physical deck directly on screen.',
          'Implemented global hotkey registration in the main process to trigger sounds even when the app is in the background.',
          'Integrated virtual audio device routing to ensure sound effects are captured cleanly on their own audio track.'
        ],
        impact: [
          'Provides a free, open-source professional audio tool for content creators, lowering the barrier to entry.',
          'Eliminates the hardware cost for high-quality stream production, allowing investment in other areas.',
          'Offers a customizable and extensible platform that can grow with the streamer\'s needs.'
        ],
        technologies: ['Electron', 'React', 'TypeScript', 'Vite'],
        link: {
          label: 'Visit Cuecast',
          href: 'https://github.com/000geid/cuecast'
        }
      },
      es: {
        title: 'Cuecast',
        summary:
          'Cuecast es una soundboard virtual diseñada para reemplazar hardware costoso para streamers. Funciona en tu escritorio, permitiendo disparar sonidos mediante clics o atajos globales y rutearlos directamente a dispositivos de audio virtuales para una integración fluida con OBS.',
        role: 'Creador • Full-stack integral (Electron, React, Ruteo de audio)',
        timeline: '2024 - Actualidad',
        problem: [
          'Las soundboards de hardware como Elgato Stream Deck son prohibitivamente costosas para streamers que recién empiezan.',
          'Las soluciones de software existentes a menudo carecen de capacidades confiables de enrutamiento de audio, dificultando la separación de efectos de sonido en OBS.',
          'Las aplicaciones genéricas de soundboard a menudo carecen de soporte para atajos globales, requiriendo que la ventana esté enfocada para funcionar.'
        ],
        solution: [
          'Construí una aplicación Electron multiplataforma que imita la funcionalidad de un deck físico directamente en pantalla.',
          'Implementé registro de atajos globales en el proceso principal para disparar sonidos incluso con la app en segundo plano.',
          'Integré enrutamiento a dispositivos de audio virtuales para asegurar que los efectos se capturen limpiamente en su propia pista de audio.'
        ],
        impact: [
          'Proporciona una herramienta de audio profesional, gratuita y de código abierto para creadores de contenido.',
          'Elimina la barrera de costo hardware para una producción de stream de alta calidad.',
          'Ofrece una plataforma personalizable y extensible que puede crecer con las necesidades del streamer.'
        ],
        technologies: ['Electron', 'React', 'TypeScript', 'Vite'],
        link: {
          label: 'Ver en GitHub',
          href: 'https://github.com/000geid/cuecast'
        }
      }
    }
  }
]
