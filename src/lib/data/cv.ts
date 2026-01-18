export interface CVExperience {
  role: { en: string; es: string }
  company: string
  dates: { en: string; es: string }
  summary: { en: string; es: string }
  responsibilities: { en: string[]; es: string[] }
}

export interface CVEducation {
  institution: string
  degree: { en: string; es: string }
}

export interface CVSkills {
  programming: string[]
  technologies: string[]
  languages: { label: { en: string; es: string }; level: { en: string; es: string } }[]
}

export interface CVProfile {
  name: string
  title: string
  location: string
  email: string
  introduction: { en: string; es: string }
}

export interface CVData {
  profile: CVProfile
  experience: CVExperience[]
  skills: CVSkills
  education: CVEducation[]
}

export const cvData: CVData = {
  profile: {
    name: 'Diego Alvarado',
    title: 'Software Engineer',
    location: 'Buenos Aires, Argentina',
    email: 'dmalvaradog26@gmail.com',
    introduction: {
      en: 'Software engineer with experience leading and building AI-first products end-to-end: from frontend, architecture, and backend to LLM integration, automation, and production deployment. Focused on real-world impact, scalability, and technical decisions grounded in business needs.',
      es: 'Software engineer con experiencia liderando y construyendo productos AI-first de punta a punta: desde frontend, arquitectura y backend hasta integración con LLMs, automatización y despliegue en producción. Enfocado en impacto real, escalabilidad y decisiones técnicas con criterio de negocio.'
    }
  },
  experience: [
    {
      role: {
        en: 'Lead Software Developer',
        es: 'Lead Software Developer'
      },
      company: 'Alt 94',
      dates: { en: '01/2025 - Present', es: '01/2025 - Actualidad' },
      summary: {
        en: 'Lead the design and development of AI-first products in production, from architecture definition through deployment and operations, aligning technical decisions with business objectives.',
        es: 'Lidero el diseño y desarrollo de productos AI-first en producción, desde la definición de arquitectura hasta el despliegue y la operación, alineando decisiones técnicas con objetivos de negocio.'
      },
      responsibilities: {
        en: [
          'Design and implement scalable backend architectures for AI-based products, prioritizing maintainability, observability, and performance.',
          'Integrate LLMs and AI pipelines (LangChain, RAG, automations) into real-world use cases, focusing on reliability and cost control.',
          'Define the full technology stack for production projects: backend services, databases, orchestration, and cloud infrastructure deployment.',
          'Make key technical decisions and establish best practices for development, CI/CD, and deployment.',
          'Coordinate technical development and act as a reference for architectural decision-making.'
        ],
        es: [
          'Diseño y ejecuto arquitecturas backend escalables para productos basados en IA, priorizando mantenibilidad, observabilidad y performance.',
          'Integro LLMs y pipelines de IA (LangChain, RAG, automatizaciones) en casos de uso reales, con foco en confiabilidad y control del costo.',
          'Defino el stack tecnológico completo en proyectos productivos: backend, bases de datos, orquestación y despliegue en infraestructura cloud.',
          'Tomo decisiones técnicas clave y establezco buenas prácticas de desarrollo, CI/CD y deployment.',
          'Coordino el desarrollo técnico y actúo como referente en la toma de decisiones de arquitectura.'
        ]
      }
    },
    {
      role: {
        en: 'Freelance Developer',
        es: 'Desarrollador freelance'
      },
      company: 'Independent',
      dates: { en: '01/2024 - 12/2024', es: '01/2024 - 12/2024' },
      summary: {
        en: 'Designed and developed bespoke software solutions for more than 10 clients, covering the full product lifecycle from problem definition to production deployment.',
        es: 'Diseñé y desarrollé soluciones de software a medida para más de 10 clientes, cubriendo el ciclo completo del producto: desde la definición del problema hasta el despliegue en producción.'
      },
      responsibilities: {
        en: [
          'Built backend and fullstack systems with a strong focus on scalability, performance, and maintainability.',
          'Implemented automations and integrations with external services (APIs, databases, messaging systems).',
          'Led end-to-end projects: requirements gathering, architecture design, implementation, and deployment.',
          'Delivered production-ready solutions aligned with real business needs, prioritizing impact over unnecessary complexity.'
        ],
        es: [
          'Construí sistemas backend y fullstack con foco en escalabilidad, performance y mantenibilidad.',
          'Implementé automatizaciones e integraciones con servicios externos (APIs, bases de datos, sistemas de mensajería).',
          'Lideré proyectos end-to-end: levantamiento de requerimientos, diseño de arquitectura, implementación y despliegue.',
          'Entregué soluciones productivas alineadas a necesidades reales de negocio, priorizando impacto sobre complejidad innecesaria.'
        ]
      }
    },
    {
      role: {
        en: 'Fullstack Developer',
        es: 'Desarrollador Fullstack'
      },
      company: 'Applied AI in Healthcare – Universidad Austral',
      dates: { en: '03/2023 - 12/2023', es: '03/2023 - 12/2023' },
      summary: {
        en: 'Contributed to an anomaly detection system for chest X-rays used as clinical decision support.',
        es: 'Participé en el desarrollo de un sistema de detección de anomalías en radiografías de tórax utilizado como soporte en la toma de decisiones médicas.'
      },
      responsibilities: {
        en: [
          'Designed, trained, and fine-tuned a convolutional neural network (CNN) for medical image analysis.',
          'Implemented a production system that processes approximately 200 X-rays daily (~6,000 monthly).',
          'Achieved an AUROC of 70% with the model in a real clinical environment.',
          'Collaborated on integrating the model into an operational workflow used by healthcare professionals.'
        ],
        es: [
          'Diseñé, entrené y realicé fine-tuning de una red neuronal convolucional (CNN) para análisis de imágenes médicas.',
          'Implementé un sistema productivo que procesa aproximadamente 200 radiografías diarias (~6.000 mensuales).',
          'El modelo alcanzó un AUROC del 70% en un entorno real de uso clínico.',
          'Colaboré en la integración del modelo dentro de un flujo operativo utilizado por profesionales de la salud.'
        ]
      }
    }
  ],
  skills: {
    programming: ['TypeScript', 'Python', 'Rust', 'Go', 'C#', 'Java', 'Shell Script'],
    technologies: ['LLMs', 'LangChain', 'RAG', 'Backend APIs', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD'],
    languages: [
      { label: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
      { label: { en: 'English', es: 'Inglés' }, level: { en: 'Proficient', es: 'Competente' } },
      { label: { en: 'French', es: 'Francés' }, level: { en: 'Intermediate', es: 'Intermedio' } }
    ]
  },
  education: [
    {
      institution: 'Universidad de Belgrano',
      degree: {
        en: "Bachelor's Degree in Computer Engineering",
        es: 'Bachiller en Ingeniería Informática'
      }
    },
    {
      institution: 'Lord Byron School',
      degree: {
        en: 'International Baccalaureate',
        es: 'Bachillerato Internacional'
      }
    }
  ]
}
