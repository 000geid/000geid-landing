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

<div class="min-h-screen bg-[var(--color-surface)] dark:bg-[var(--color-surface)] transition-colors noise-overlay relative">
	<a
		href="#home"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white"
	>
		Skip to content
	</a>

	<header class="sticky top-0 z-30 border-b-2 border-black dark:border-white bg-[var(--color-surface)] dark:bg-[var(--color-surface)]">
		<div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-6 py-4">
			<a
				href="#home"
				class="font-display font-bold text-lg md:text-xl tracking-tight text-black dark:text-white truncate uppercase"
				aria-label={$t('hero.name')}
			>
				DA
			</a>

			<div class="flex items-center gap-3 shrink-0">
				<LanguageToggler />
				<button
					on:click={() => darkMode.toggle()}
					class="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
					aria-label={$t('hero.toggleDarkMode')}
				>
					<svg class="w-5 h-5 text-black dark:text-white dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
					<svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

		<nav aria-label={$t('nav.sections')} class="no-scrollbar overflow-x-auto border-t border-black/10 dark:border-white/10">
			<div class="max-w-7xl mx-auto px-4 md:px-6 py-3">
				<div class="flex items-center gap-1 w-max">
					{#each sections as section (section.id)}
						<a
							href={`#${section.id}`}
							class="px-3 py-1.5 text-sm font-body uppercase tracking-wider transition-all duration-200 no-rounded
								{activeSection === section.id
									? 'bg-black dark:bg-white text-white dark:text-black font-medium'
									: 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}"
						>
							{$t(section.labelKey)}
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</header>

	<main id="home" class="border-t-2 border-black dark:border-white">
		<About />
		<div class="max-w-7xl mx-auto px-4 md:px-6 border-t border-black/10 dark:border-white/10"></div>
		<Projects />
		<div class="max-w-7xl mx-auto px-4 md:px-6 border-t border-black/10 dark:border-white/10"></div>
		<Skills />
		<div class="max-w-7xl mx-auto px-4 md:px-6 border-t border-black/10 dark:border-white/10"></div>
		<Timeline />
		<div class="max-w-7xl mx-auto px-4 md:px-6 border-t border-black/10 dark:border-white/10"></div>
		<Education />
		<div class="max-w-7xl mx-auto px-4 md:px-6 border-t border-black/10 dark:border-white/10"></div>
		<Contact />
	</main>
</div>
