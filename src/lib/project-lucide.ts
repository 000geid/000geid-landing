import { Rss, Utensils, Kanban, Headphones } from 'lucide-svelte';

/** Lucide Svelte components for project list tiles (expand when adding projects). */
export const PROJECT_LUCIDE_GLYPHS = {
	rss: Rss,
	utensils: Utensils,
	kanban: Kanban,
	headphones: Headphones
} as const;

export type ProjectLucideGlyph = keyof typeof PROJECT_LUCIDE_GLYPHS;
