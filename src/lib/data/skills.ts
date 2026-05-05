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
		name: 'aiLlm',
		accent: 'secondary',
		skills: ['Claude Code', 'Cursor', 'LangGraph'],
		bullets: {
			en: [
				'Deliver with Claude Code and Cursor—repeatable automations, reviewable workflows, observable runs.',
				'Ground model output in real data: retrieval pipelines, evals, and production constraints baked in from day one.',
				'Orchestrate agents and tools (LangGraph) where complexity pays off; prompts and retrieval stay measurable.',
				'Work with product on guardrails, quality gates, and when not to call a model.'
			],
			es: [
				'Desarrollo con Claude Code y Cursor: automatizaciones repetibles, flujos auditables y ejecuciones observables.',
				'Integro los modelos con los datos reales del negocio: pipelines RAG, evaluaciones y restricciones de producción desde el día uno.',
				'Orquesto agentes y herramientas (LangGraph) cuando la complejidad lo justifica; prompts y recuperación siempre medibles.',
				'Trabajo con el equipo de producto para decidir qué automatizar con IA, con qué criterios de calidad y cuándo no usar el modelo.'
			]
		}
	},
	{
		name: 'fullStack',
		accent: 'primary',
		skills: ['TypeScript', 'Python', 'Rust', 'Go', 'REST / GraphQL APIs', 'PostgreSQL', 'Data modeling'],
		bullets: {
			en: [
				'Build and maintain production services, CLIs, and internal tooling—TypeScript and Python day-to-day, Rust or Go when performance demands it.',
				'Own features end to end: typed contracts, APIs, scripts, migrations, and automation that holds up in production.',
				'Design REST and GraphQL surfaces with versioning, clear error contracts, and domain boundaries that hold up as clients evolve.',
				'Model relational schemas and queries with PostgreSQL as the source of truth; keep data consistent and queryable as the product grows.'
			],
			es: [
				'Construyo y mantengo servicios en producción, CLIs y herramientas internas—principalmente TypeScript y Python, con Rust o Go cuando el rendimiento lo exige.',
				'Me hago cargo de funcionalidades de punta a punta: APIs, contratos tipados, migraciones y automatizaciones que funcionan en producción.',
				'Diseño APIs REST y GraphQL con versionado, manejo de errores y límites de dominio claros que se sostienen a medida que el producto crece.',
				'Modelo esquemas y consultas relacionales con PostgreSQL como fuente de verdad; los datos se mantienen consistentes y consultables.'
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
				'Empaqueto servicios en contenedores con builds reproducibles que se comportan igual en local, CI y producción.',
				'Uso los servicios de AWS necesarios—cómputo, red, secretos—sin complejidad innecesaria en el primer lanzamiento.',
				'Configuro pipelines de CI/CD para que cada cambio sea desplegable: tests automáticos, artefactos y releases predecibles.'
			]
		}
	}
];
