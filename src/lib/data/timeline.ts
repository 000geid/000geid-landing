export interface WorkExperience {
  id: string
  title_es: string
  title_en: string
  company: string
  startDate: string
  endDate: string | null
  description_es: string
  description_en: string
  responsibilities_es: string[]
  responsibilities_en: string[]
  icon: string
}

export const timelineData: WorkExperience[] = [
  {
    id: '1',
    title_es: 'Lead Software Developer',
    title_en: 'Lead Software Developer',
    company: 'Alt 94',
    startDate: '2025-01-01',
    endDate: null, // Present
    description_es: 'Lidero el diseño y desarrollo de productos AI-first en producción, desde la definición de arquitectura hasta el despliegue y la operación, alineando decisiones técnicas con objetivos de negocio.',
    description_en: 'Lead the design and development of AI-first products in production, from architecture definition to deployment and operations, aligning technical decisions with business objectives.',
    responsibilities_es: [
      'Migré la capa de orquestación a LangGraph, mejorando el throughput del pipeline RAG un 30%.',
      'Arquitecté Muveran AI de punta a punta: microservicios, Nginx, Docker Compose, CI/CD y despliegue en VPS—hoy en beta con cientos de usuarios.',
      'Reduje costos de infraestructura rediseñando la estrategia de load balancing sobre un cluster de máquinas virtuales.',
      'Desarrollé y publiqué Pacto (CLI en Go para desarrollo orientado a specs) y Madie (editor WYSIWYG de Markdown para VS Code), ambos en uso activo.'
    ],
    responsibilities_en: [
      'Migrated the orchestration layer to LangGraph, improving RAG pipeline throughput by 30%.',
      'Architected Muveran AI end-to-end—microservices, Nginx, Docker Compose, CI/CD, and VPS deployment—now in beta serving hundreds of users.',
      'Reduced infrastructure cost by redesigning the load-balancing strategy around a virtual machine cluster.',
      'Built and open-sourced Pacto (Go CLI for spec-driven development) and Madie (WYSIWYG Markdown editor for VS Code), both in active use.'
    ],
    icon: 'lead-dev'
  },
  {
    id: '2',
    title_es: 'Desarrollador Freelance',
    title_en: 'Freelance Developer',
    company: 'Independiente',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    description_es: 'Diseñé y desarrollé soluciones de software a medida para más de 10 clientes, cubriendo el ciclo completo del producto: desde la definición del problema hasta el despliegue en producción.',
    description_en: 'Designed and developed custom software solutions for over 10 clients, covering the complete product lifecycle: from problem definition to production deployment.',
    responsibilities_es: [
      'Entregué 12 proyectos end-to-end para clientes de las industrias de belleza y alimentos—ciclos de 2 a 3 semanas, a veces en paralelo.',
      'Construí sistemas que soportaron picos de 300+ usuarios concurrentes con tiempos de respuesta cortos.',
      'Desarrollé un sistema de gestión de inventario para Riccadonna que potenciaba un juego multisucursal estilo Candy Crush con stock en tiempo real.',
      'Lancé experiencias interactivas para La Roche-Posay, Molitalia, Costa y Riccadonna: frontend Unity, backend Node.js/Python, persistencia en PostgreSQL o SQLite.'
    ],
    responsibilities_en: [
      'Delivered 12 client projects end-to-end in beauty and food industries—2–3 week cycles, sometimes running concurrently.',
      'Built systems that handled 300+ concurrent users at peak with short response times.',
      'Created an intelligent stock management system for Riccadonna powering a multi-location Candy Crush-style game with real-time inventory.',
      'Shipped interactive branded experiences for La Roche-Posay, Molitalia, Costa, and Riccadonna—Unity frontend, Node.js/Python backend, PostgreSQL/SQLite persistence.'
    ],
    icon: 'freelance'
  },
  {
    id: '3',
    title_es: 'Desarrollador Fullstack',
    title_en: 'Fullstack Developer',
    company: 'Proyecto de IA aplicada a Salud – Universidad Austral',
    startDate: '2023-03-01',
    endDate: '2023-12-31',
    description_es: 'Participé en el desarrollo de un sistema de detección de anomalías en radiografías de tórax, utilizado como soporte en la toma de decisiones médicas.',
    description_en: 'Participated in the development of a chest X-ray anomaly detection system, used as support in medical decision-making.',
    responsibilities_es: [
      'Diseñé, entrené y realicé fine-tuning de una CNN para detección de anomalías en radiografías de tórax—70% AUROC en datos reales de pacientes.',
      'Construí el pipeline de preprocesamiento y la interfaz Gradio; desplegado en servidores on-premise del hospital.',
      'Sistema en producción procesando ~200 radiografías por día (~6.000 mensuales).',
      'Colaboré con profesionales de la salud para integrar el modelo en flujos reales de toma de decisiones clínicas.'
    ],
    responsibilities_en: [
      'Designed, trained, and fine-tuned a CNN for chest X-ray anomaly detection—70% AUROC on real patient data.',
      'Built the preprocessing pipeline and Gradio interface; deployed on hospital on-premise servers.',
      'Production system processing ~200 X-rays/day (~6,000 monthly).',
      'Collaborated with medical professionals to integrate the model into real clinical decision-support workflows.'
    ],
    icon: 'ai-health'
  }
]
