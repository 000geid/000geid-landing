<script lang="ts">
	import { page } from '$app/stores';
	import { language } from '$lib/stores/language';
	import {
		DEFAULT_OG_IMAGE_PATH,
		absoluteUrl,
		resolveSiteOrigin
	} from '$lib/seo/site';

	interface Props {
		title: string;
		description: string;
		imagePath?: string;
		ogType?: 'website' | 'article';
		jsonLd?: Record<string, unknown>;
	}

	let {
		title,
		description,
		imagePath,
		ogType = 'website',
		jsonLd
	}: Props = $props();

	const pathname = $derived($page.url.pathname);

	const siteOrigin = $derived(resolveSiteOrigin($page.url.origin));
	const canonicalUrl = $derived(absoluteUrl(siteOrigin, pathname));

	const resolvedImagePath = $derived(
		imagePath && imagePath.length > 0
			? imagePath.startsWith('/')
				? imagePath
				: `/${imagePath}`
			: DEFAULT_OG_IMAGE_PATH
	);

	const imageAbsolute = $derived(absoluteUrl(siteOrigin, resolvedImagePath));

	const ogLocale = $derived($language === 'en' ? 'en_US' : 'es_AR');
	const ogLocaleAlt = $derived($language === 'en' ? 'es_AR' : 'en_US');

	const jsonLdInset = $derived(
		jsonLd
			? '<script type="application/ld+json">' +
				JSON.stringify(jsonLd).replace(/</g, '\\u003c') +
				'</scr' +
				'ipt>'
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Diego Alvarado" />

	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageAbsolute} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:locale:alternate" content={ogLocaleAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageAbsolute} />

	{#if jsonLdInset}
		{@html jsonLdInset}
	{/if}
</svelte:head>
