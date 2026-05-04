export interface Education {
  id: string
  institution: string
  degree_es: string
  degree_en: string
  dates: string
  location?: string
}

export const educationData: Education[] = [
  {
    id: '1',
    institution: 'Universidad de Belgrano',
    degree_es: 'Bachiller en Ingeniería Informática',
    degree_en: 'Bachelor of Computer Engineering',
    dates: 'Current',
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '2',
    institution: 'Lord Byron School',
    degree_es: 'Bachillerato Internacional',
    degree_en: 'International Baccalaureate',
    dates: 'Completed',
    location: 'Buenos Aires, Argentina'
  }
]

/** Short courses / certificates — Education → Diplomas tab (`static/` paths). */
export interface DiplomaEntry {
  id: string
  /** Heading text in Diplomas tab (same in every UI locale). */
  title_en: string
  /** Optional Spanish label retained for parity; UI always shows `title_en`. */
  title_es: string
  issuer_en: string
  issuer_es: string
  /** e.g. 2024 */
  year?: string
  /** Public URL — e.g. `/images/diplomas/foo.jpg` from `static/images/diplomas/` */
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
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/m9vixrp68pik'
  },
  {
    id: 'claude-code-in-action',
    title_en: 'Claude Code in Action',
    title_es: 'Claude Code en acción',
    issuer_en: 'Anthropic',
    issuer_es: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/o5cmnhoji3kd'
  },
  {
    id: 'huc-virtual-research-internship',
    title_en: 'HUC Virtual Research Internship',
    title_es: 'Pasantía Virtual de Investigación HUC',
    issuer_en: 'Hemispheric University Consortium (HUC)',
    issuer_es: 'Consorcio Hemisférico de Universidades (HUC)',
    year: '2023',
    credentialUrl:
      'https://www.credential.net/e0beb01e-540d-4ab3-9900-ab8d912bdd8b#acc.aOAlGwK4'
  }
]
