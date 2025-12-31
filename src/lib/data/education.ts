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
