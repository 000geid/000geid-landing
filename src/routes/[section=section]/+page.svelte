<script lang="ts">
	import { page } from '$app/stores';
	import SectionRenderer from '$lib/components/SectionRenderer.svelte';
	import { type DynamicSectionSlug, getSectionBySlug } from '$lib/data/sections';
	import { t } from '$lib/stores/i18n';

	$: sectionSlug = $page.params.section as DynamicSectionSlug;
	$: section = getSectionBySlug(sectionSlug);
</script>

<svelte:head>
	<title>{$t(section?.labelKey ?? 'hero.name')} | {$t('hero.name')}</title>
	<meta name="description" content={$t(section?.descriptionKey ?? 'hero.description')} />
</svelte:head>

<main id="main-content" class="border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)]">
	<SectionRenderer slug={sectionSlug} />
</main>
