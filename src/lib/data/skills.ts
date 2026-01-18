export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillsData: SkillCategory[] = [
  {
    name: 'languages',
    skills: ['TypeScript', 'Python', 'Rust', 'Go', 'C#', 'Java', 'Shell Scripting']
  },
  {
    skills: ['LLMs', 'LangChain', 'RAG', 'APIs Backend', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD']
  }
]
