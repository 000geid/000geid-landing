export interface Education {
  id: string
  institution: string
  degree_es: string
  degree_en: string
  description_en: string
  description_es: string
  dates: string
  location?: string
}

export const educationData: Education[] = [
  {
    id: '1',
    institution: 'Universidad de Belgrano',
    degree_es: 'Bachiller en Ingeniería Informática',
    degree_en: 'Bachelor of Computer Engineering',
    description_en: 'Core curriculum in algorithms, data structures, systems design, and software engineering. Currently in progress.',
    description_es: 'Plan de estudios en algoritmos, estructuras de datos, diseño de sistemas e ingeniería de software. Actualmente en curso.',
    dates: 'Current',
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '2',
    institution: 'Lord Byron School',
    degree_es: 'Bachillerato Internacional',
    degree_en: 'International Baccalaureate',
    description_en: 'Internationally recognized pre-university diploma covering sciences, mathematics, and humanities with an emphasis on critical thinking.',
    description_es: 'Diploma preuniversitario de reconocimiento internacional con énfasis en ciencias, matemáticas y humanidades.',
    dates: 'Completed',
    location: 'Buenos Aires, Argentina'
  }
]

export interface DiplomaEntry {
  id: string
  title_en: string
  title_es: string
  issuer_en: string
  issuer_es: string
  description_en: string
  description_es: string
  year?: string
  imageSrc?: string
  credentialUrl?: string
}

export const diplomasData: DiplomaEntry[] = [
  {
    id: 'ai-fluency-framework-foundations',
    title_en: 'AI Fluency: Framework & Foundations',
    title_es: 'AI Fluency: marco y fundamentos',
    issuer_en: 'Anthropic',
    issuer_es: 'Anthropic',
    description_en: 'Conceptual foundations of large language models, prompt design, and responsible AI integration practices for engineering and product teams.',
    description_es: 'Fundamentos conceptuales de los modelos de lenguaje, diseño de prompts e integración responsable de IA para equipos de ingeniería y producto.',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/m9vixrp68pik'
  },
  {
    id: 'claude-code-in-action',
    title_en: 'Claude Code in Action',
    title_es: 'Claude Code en acción',
    issuer_en: 'Anthropic',
    issuer_es: 'Anthropic',
    description_en: 'Hands-on training in AI-assisted coding with Claude Code—automation patterns, agentic workflows, and practical integration into software development cycles.',
    description_es: 'Entrenamiento práctico en desarrollo asistido por IA con Claude Code: patrones de automatización, flujos agénticos e integración en ciclos reales de desarrollo.',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/o5cmnhoji3kd'
  },
  {
    id: 'huc-virtual-research-internship',
    title_en: 'HUC Virtual Research Internship',
    title_es: 'Pasantía Virtual de Investigación HUC',
    issuer_en: 'Hemispheric University Consortium (HUC)',
    issuer_es: 'Consorcio Hemisférico de Universidades (HUC)',
    description_en: 'Applied machine learning research internship focused on medical imaging—anomaly detection models, clinical data pipelines, and collaboration with healthcare professionals.',
    description_es: 'Pasantía de investigación en machine learning aplicado a diagnóstico médico por imágenes: modelos de detección de anomalías, pipelines clínicos y trabajo junto a médicos.',
    year: '2023',
    credentialUrl:
      'https://www.credential.net/e0beb01e-540d-4ab3-9900-ab8d912bdd8b#acc.aOAlGwK4'
  }
]
