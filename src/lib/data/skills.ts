export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillsData: SkillCategory[] = [
  {
    name: 'languages',
    skills: ['TypeScript', 'Python', 'Rust', 'Go', 'C#', 'Java', 'Shell Script']
  },
  {
    name: 'technologies',
    skills: ['LLMs', 'LangChain', 'RAG', 'Backend APIs', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD']
  }
]
