import Rss from 'lucide-svelte/icons/rss';
import Utensils from 'lucide-svelte/icons/utensils';
import Kanban from 'lucide-svelte/icons/kanban';
import Headphones from 'lucide-svelte/icons/headphones';

/** Lucide Svelte components for project list tiles (expand when adding projects). */
export const PROJECT_LUCIDE_GLYPHS = {
	rss: Rss,
	utensils: Utensils,
	kanban: Kanban,
	headphones: Headphones
} as const;

export type ProjectLucideGlyph = keyof typeof PROJECT_LUCIDE_GLYPHS;
