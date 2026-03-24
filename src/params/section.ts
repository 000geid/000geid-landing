import { dynamicSectionSlugs } from '$lib/data/sections';

export function match(param: string): boolean {
	return dynamicSectionSlugs.includes(param as (typeof dynamicSectionSlugs)[number]);
}
