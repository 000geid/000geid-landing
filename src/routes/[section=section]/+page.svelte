<script lang="ts">
	import { page } from '$app/stores';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import SectionRenderer from '$lib/components/SectionRenderer.svelte';
	import { type DynamicSectionSlug, getSectionBySlug } from '$lib/data/sections';
	import { t } from '$lib/stores/i18n';

	$: sectionSlug = $page.params.section as DynamicSectionSlug;
	$: section = getSectionBySlug(sectionSlug);
</script>

<SeoMeta
	title="{$t(section?.labelKey ?? 'hero.name')} | {$t('hero.name')}"
	description={$t(section?.descriptionKey ?? 'hero.description')}
/>

<main id="main-content" class="border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)]">
	<SectionRenderer slug={sectionSlug} />
</main>
