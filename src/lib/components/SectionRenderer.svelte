<script lang="ts">
	import type { SectionSlug } from '$lib/data/sections';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';

	export let slug: SectionSlug;
</script>

{#if slug === 'about'}
	<About />
{:else if slug === 'projects'}
	<Projects />
{:else if slug === 'skills'}
	<Skills />
{:else if slug === 'career'}
	<Timeline />
{:else if slug === 'education'}
	<Education />
{:else if slug === 'contact'}
	<Contact />
{/if}
