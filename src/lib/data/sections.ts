export type SectionSlug =
	| 'about'
	| 'projects'
	| 'skills'
	| 'career'
	| 'education'
	| 'contact';

export interface SectionDefinition {
	slug: SectionSlug;
	path: `/${SectionSlug}`;
	labelKey: string;
	descriptionKey: string;
}

export const sectionDefinitions: SectionDefinition[] = [
	{
		slug: 'about',
		path: '/about',
		labelKey: 'about.title',
		descriptionKey: 'meta.about'
	},
	{
		slug: 'projects',
		path: '/projects',
		labelKey: 'projects.title',
		descriptionKey: 'meta.projects'
	},
	{
		slug: 'skills',
		path: '/skills',
		labelKey: 'skills.title',
		descriptionKey: 'meta.skills'
	},
	{
		slug: 'career',
		path: '/career',
		labelKey: 'careerPath.title',
		descriptionKey: 'meta.career'
	},
	{
		slug: 'education',
		path: '/education',
		labelKey: 'education.title',
		descriptionKey: 'meta.education'
	},
	{
		slug: 'contact',
		path: '/contact',
		labelKey: 'contact.title',
		descriptionKey: 'meta.contact'
	}
];

export const legacyHashRedirects: Record<string, `/${SectionSlug}`> = {
	about: '/about',
	projects: '/projects',
	skills: '/skills',
	career: '/career',
	education: '/education',
	contact: '/contact'
};

export const dynamicSectionSlugs = [
	'about',
	'skills',
	'career',
	'education',
	'contact'
] as const;

export type DynamicSectionSlug = (typeof dynamicSectionSlugs)[number];

export function getSectionBySlug(slug: SectionSlug) {
	return sectionDefinitions.find((section) => section.slug === slug);
}
