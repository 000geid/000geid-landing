<script lang="ts">
	import { page } from '$app/stores';
	import SectionRenderer from '$lib/components/SectionRenderer.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { type DynamicSectionSlug, getSectionBySlug } from '$lib/data/sections';
	import { t } from '$lib/stores/i18n';

	$: sectionSlug = $page.params.section as DynamicSectionSlug;
	$: section = getSectionBySlug(sectionSlug);
</script>

<svelte:head>
	<title>{$t(section?.labelKey ?? 'hero.name')} | {$t('hero.name')}</title>
	<meta name="description" content={$t(section?.descriptionKey ?? 'hero.description')} />
</svelte:head>

<SiteShell>
	<main id="main-content" class="border-t-2 border-black dark:border-white">
		<SectionRenderer slug={sectionSlug} />
	</main>
</SiteShell>
