<script lang="ts">
	import SectionRenderer from '$lib/components/SectionRenderer.svelte';
	import { getSectionBySlug } from '$lib/data/sections';
	import { t } from '$lib/stores/i18n';

	const projectsSection = getSectionBySlug('projects');
</script>

<svelte:head>
	<title>{$t(projectsSection?.labelKey ?? 'projects.title')} | {$t('hero.name')}</title>
	<meta name="description" content={$t(projectsSection?.descriptionKey ?? 'hero.description')} />
</svelte:head>

<main id="main-content" class="border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)]">
	<SectionRenderer slug="projects" />
</main>
