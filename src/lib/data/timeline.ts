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
      'Diseño y ejecuto arquitecturas backend escalables para productos basados en IA, priorizando mantenibilidad, observabilidad y performance.',
      'Integro LLMs y pipelines de IA (LangChain, RAG, automatizaciones) en casos de uso reales, con foco en confiabilidad y control del costo.',
      'Defino el stack tecnológico completo en proyectos productivos: backend, bases de datos, orquestación y despliegue en infraestructura cloud.',
      'Tomo decisiones técnicas clave y establezco buenas prácticas de desarrollo, CI/CD y deployment.',
      'Coordino el desarrollo técnico y actúo como referente en la toma de decisiones de arquitectura.'
    ],
    responsibilities_en: [
      'Design and execute scalable backend architectures for AI-based products, prioritizing maintainability, observability and performance.',
      'Integrate LLMs and AI pipelines (LangChain, RAG, automations) in real use cases, focusing on reliability and cost control.',
      'Define the complete tech stack in production projects: backend, databases, orchestration and deployment in cloud infrastructure.',
      'Make key technical decisions and establish development best practices, CI/CD and deployment.',
      'Coordinate technical development and act as a reference in architecture decision-making.'
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
      'Construí sistemas backend y fullstack con foco en escalabilidad, performance y mantenibilidad.',
      'Implementé automatizaciones e integraciones con servicios externos (APIs, bases de datos, sistemas de mensajería).',
      'Lideré proyectos end-to-end: levantamiento de requerimientos, diseño de arquitectura, implementación y despliegue.',
      'Entregué soluciones productivas alineadas a necesidades reales de negocio, priorizando impacto sobre complejidad innecesaria.'
    ],
    responsibilities_en: [
      'Built backend and fullstack systems focusing on scalability, performance and maintainability.',
      'Implemented automations and integrations with external services (APIs, databases, messaging systems).',
      'Led end-to-end projects: requirements gathering, architecture design, implementation and deployment.',
      'Delivered production solutions aligned with real business needs, prioritizing impact over unnecessary complexity.'
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
      'Diseñé, entrené y realicé fine-tuning de una red neuronal convolucional (CNN) para análisis de imágenes médicas.',
      'Implementé un sistema productivo que procesa aproximadamente 200 radiografías diarias (~6.000 mensuales).',
      'El modelo alcanzó un AUROC del 70% en un entorno real de uso clínico.',
      'Colaboré en la integración del modelo dentro de un flujo operativo utilizado por profesionales de la salud.'
    ],
    responsibilities_en: [
      'Designed, trained and fine-tuned a convolutional neural network (CNN) for medical image analysis.',
      'Implemented a production system that processes approximately 200 X-rays daily (~6,000 monthly).',
      'The model achieved an AUROC of 70% in a real clinical use environment.',
      'Collaborated in integrating the model within an operational workflow used by healthcare professionals.'
    ],
    icon: 'ai-health'
  }
]
