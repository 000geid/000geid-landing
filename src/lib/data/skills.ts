export type SkillCategoryAccent = 'primary' | 'secondary';

export type LocalizedBullets = { en: string[]; es: string[] };

export interface SkillCategory {
	name: string;
	accent: SkillCategoryAccent;
	skills: string[];
	bullets: LocalizedBullets;
}

export const skillsData: SkillCategory[] = [
	{
		name: 'languages',
		accent: 'primary',
		skills: ['TypeScript', 'Python', 'Rust', 'Go', 'C#', 'Java', 'Shell'],
		bullets: {
			en: [
				'Build and maintain production services, CLIs, and internal tooling—mostly TypeScript and Python, with Rust or Go when performance or systems work calls for it.',
				'Own features end to end: from typed contracts and APIs to scripts, migrations, and small automation.',
				'Comfortable context-switching across stacks for web backends, data-heavy jobs, and glue code around infra.'
			],
			es: [
				'Construyo y mantengo servicios en producción, CLIs y tooling interno—sobre todo TypeScript y Python, con Rust o Go cuando el rendimiento o el trabajo de sistemas lo piden.',
				'Me hago cargo de features de punta a punta: contratos tipados, APIs, scripts, migraciones y automatización ligera.',
				'Me muevo entre stacks para backends web, jobs con datos y código de integración alrededor de infraestructura.'
			]
		}
	},
	{
		name: 'aiLlm',
		accent: 'secondary',
		skills: ['LLMs', 'LangChain', 'RAG'],
		bullets: {
			en: [
				'Ship retrieval-augmented flows and grounded answers over your own data—not demo prompts, but production constraints (latency, failures, evals).',
				'Orchestrate chains and tools with LangChain-style patterns where they earn their complexity; keep prompts and retrieval observable.',
				'Iterate with product on guardrails, quality checks, and when *not* to call a model.'
			],
			es: [
				'Publico flujos RAG y respuestas fundamentadas sobre vuestros datos—no demos: latencia, fallos y evaluación en producción.',
				'Orquesto cadenas y herramientas con patrones tipo LangChain cuando aportan; mantengo prompts y recuperación observables.',
				'Itero con producto sobre guardrails, calidad y cuándo *no* conviene llamar al modelo.'
			]
		}
	},
	{
		name: 'backendData',
		accent: 'primary',
		skills: ['REST / GraphQL APIs', 'PostgreSQL', 'Data modeling'],
		bullets: {
			en: [
				'Design HTTP and GraphQL surfaces that match how clients evolve—versioning, errors, and clear boundaries between domains.',
				'Model relational schemas, migrations, and queries with PostgreSQL as the source of truth for transactional data.',
				'Keep APIs aligned with consistency needs, observability, and how data is actually queried in production.'
			],
			es: [
				'Diseño superficies REST y GraphQL acordes a cómo evolucionan los clientes: versionado, errores y límites claros entre dominios.',
				'Modelo esquemas relacionales, migraciones y consultas con PostgreSQL como fuente de verdad para datos transaccionales.',
				'Alineo APIs con consistencia, observabilidad y con cómo se consultan los datos en producción.'
			]
		}
	},
	{
		name: 'cloudDevOps',
		accent: 'secondary',
		skills: ['Docker', 'AWS', 'CI/CD'],
		bullets: {
			en: [
				'Package and ship services in containers; aim for reproducible builds and environments that match from CI to prod.',
				'Use AWS primitives where they fit—compute, networking, secrets—without over-architecting the first release.',
				'Wire CI/CD so every merge is deployable: tests, artifacts, and predictable rollouts.'
			],
			es: [
				'Empaqueto y publico servicios en contenedores; busco builds y entornos reproducibles de CI a producción.',
				'Uso primitivas de AWS donde encajan—cómputo, red, secretos—sin sobre-diseñar el primer release.',
				'Conecto CI/CD para que cada merge sea desplegable: tests, artefactos y releases predecibles.'
			]
		}
	}
];
