<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import Home from '$lib/components/Home.svelte';
	import { legacyHashRedirects } from '$lib/data/sections';
	import { absoluteUrl, resolveSiteOrigin } from '$lib/seo/site';
	import { t } from '$lib/stores/i18n';

	const personJsonLd = $derived.by(() => {
		const origin = resolveSiteOrigin($page.url.origin);
		const siteUrl = absoluteUrl(origin, '/');
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Diego Alvarado',
			url: siteUrl,
			jobTitle: 'Product Engineer',
			email: 'mailto:dmalvaradog26@gmail.com',
			sameAs: ['https://github.com/000geid', 'https://www.linkedin.com/in/ogeid/'],
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Buenos Aires',
				addressCountry: 'AR'
			}
		};
	});

	onMount(() => {
		const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
		const targetPath = hash ? legacyHashRedirects[hash] : null;
		if (targetPath) {
			void goto(targetPath, { replaceState: true, noScroll: true });
		}
	});
</script>

<SeoMeta
	title="{$t('hero.name')} — {$t('home.meta.title')}"
	description={$t('home.meta.description')}
	jsonLd={personJsonLd}
/>

<main id="main-content" class="border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)]">
	<Home />
</main>
