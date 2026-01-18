<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';
	import { onMount } from 'svelte';

	const sections = [
		{ id: 'about', labelKey: 'about.title' },
		{ id: 'projects', labelKey: 'projects.title' },
		{ id: 'skills', labelKey: 'skills.title' },
		{ id: 'career', labelKey: 'careerPath.title' },
		{ id: 'education', labelKey: 'education.title' },
		{ id: 'contact', labelKey: 'contact.title' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];
	let activeSection: SectionId = 'about';

	onMount(() => {
		darkMode.init();

		const elements = sections
			.map((section) => document.getElementById(section.id))
			.filter((element): element is HTMLElement => Boolean(element));

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

				if (visible[0]?.target instanceof HTMLElement) {
					activeSection = visible[0].target.id as SectionId;
				}
			},
			{
				root: null,
				threshold: [0.1, 0.25, 0.4, 0.6],
				rootMargin: '-25% 0px -65% 0px'
			}
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	});
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
	<a
		href="#home"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-neutral-950 focus:text-neutral-50"
	>
		Skip to content
	</a>

	<header class="sticky top-0 z-30 border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
		<div class="max-w-6xl mx-auto flex items-center justify-between gap-3 px-6 py-3">
			<a
				href="#home"
				class="font-black tracking-tight text-neutral-950 dark:text-neutral-50 truncate"
				aria-label={$t('hero.name')}
			>
				{$t('hero.name')}
			</a>

			<div class="flex items-center gap-2 shrink-0">
				<LanguageToggler />
				<button
					on:click={() => darkMode.toggle()}
					class="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
					aria-label={$t('hero.toggleDarkMode')}
				>
					<svg class="w-5 h-5 text-neutral-950 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
					<svg class="w-5 h-5 text-neutral-50 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</button>
			</div>
		</div>

		<nav aria-label={$t('nav.sections')} class="no-scrollbar overflow-x-auto">
			<div class="max-w-6xl mx-auto px-6 pb-3">
				<div class="flex items-center gap-2 w-max">
					{#each sections as section (section.id)}
						<Button
							href={`#${section.id}`}
							variant={activeSection === section.id ? 'default' : 'ghost'}
							size="sm"
							className="whitespace-nowrap"
						>
							{$t(section.labelKey)}
						</Button>
					{/each}
				</div>
			</div>
		</nav>
	</header>

	<main id="home" class="pt-4">
		<About />
		<div class="max-w-6xl mx-auto px-6"><Separator /></div>
		<Projects />
		<div class="max-w-6xl mx-auto px-6"><Separator /></div>
		<Skills />
		<div class="max-w-6xl mx-auto px-6"><Separator /></div>
		<Timeline />
		<div class="max-w-6xl mx-auto px-6"><Separator /></div>
		<Education />
		<div class="max-w-6xl mx-auto px-6"><Separator /></div>
		<Contact />
	</main>
</div>
