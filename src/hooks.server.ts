import type { Handle } from '@sveltejs/kit';
import { SITE_LANG_COOKIE } from '$lib/seo/site';

export const handle: Handle = async ({ event, resolve }) => {
	const langRaw = event.cookies.get(SITE_LANG_COOKIE);
	const lang = langRaw === 'en' || langRaw === 'es' ? langRaw : 'es';

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%lang%', lang)
	});

	return response;
};
