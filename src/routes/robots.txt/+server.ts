import { resolveSiteOrigin } from '$lib/seo/site';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const origin = resolveSiteOrigin(url.origin);
	const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
