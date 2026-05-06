import { env } from '$env/dynamic/public';
import type { ProjectEntry } from '$lib/data/projects';

/** Cookie mirrored from client language preference so SSR `<html lang>` matches content. */
export const SITE_LANG_COOKIE = 'site-lang';

/** Default Open Graph image path under `static/` (PNG screenshot present in repo). */
export const DEFAULT_OG_IMAGE_PATH = '/images/openfeed/openfeed-1.png';

export function resolveSiteOrigin(pageOrigin: string): string {
	const configured = env.PUBLIC_SITE_URL?.replace(/\/$/, '').trim();
	return configured && configured.length > 0 ? configured : pageOrigin.replace(/\/$/, '');
}

export function absoluteUrl(siteOrigin: string, pathnameOrPath: string): string {
	const origin = siteOrigin.replace(/\/$/, '');
	const path = pathnameOrPath.startsWith('/') ? pathnameOrPath : `/${pathnameOrPath}`;
	return `${origin}${path}`;
}

export function getProjectOgImagePath(project: ProjectEntry | undefined): string | undefined {
	if (!project) return undefined;
	const direct = project.screenshots?.[0]?.src;
	if (direct) return direct;
	return project.freelanceClients?.[0]?.screenshots?.[0]?.src;
}
