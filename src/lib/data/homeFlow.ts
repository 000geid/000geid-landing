import type { SectionSlug } from '$lib/data/sections';

/** Reading order for the home page: profile → work → connect. */
export const homeFlowGroups: { groupKey: string; slugs: SectionSlug[] }[] = [
	{ groupKey: 'home.groups.profile', slugs: ['about', 'career', 'education'] },
	{ groupKey: 'home.groups.work', slugs: ['projects', 'skills'] },
	{ groupKey: 'home.groups.connect', slugs: ['contact'] }
];
