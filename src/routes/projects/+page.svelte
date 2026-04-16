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

<main id="main-content" class="border-t-2 border-black dark:border-white">
	<SectionRenderer slug="projects" />
</main>
