<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import CV from '$lib/components/CV.svelte';
	import SectionTabs from '$lib/components/SectionTabs.svelte';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';

	const tabs = [
		{ id: 'about', labelKey: 'about.title' },
		{ id: 'cv', labelKey: 'cv.title' },
		{ id: 'projects', labelKey: 'projects.title' }
	];

	let activeTab = 'about';
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
	<div class="fixed top-6 right-6 flex gap-3 z-20">
		<LanguageToggler />
		<button
			onclick={() => darkMode.toggle()}
			class="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
			aria-label={$t('hero.toggleDarkMode')}
		>
			<svg
				class="w-5 h-5 text-neutral-950 dark:hidden"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
			<svg
				class="w-5 h-5 text-neutral-50 hidden dark:block"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		</button>
	</div>
	<div class="pt-6 pb-4">
		<SectionTabs {tabs} bind:activeTab />
	</div>

	{#if activeTab === 'about'}
		<div role="tabpanel" id="panel-about" aria-labelledby="tab-about">
			<About />
		</div>
	{:else if activeTab === 'cv'}
		<div role="tabpanel" id="panel-cv" aria-labelledby="tab-cv">
			<CV />
		</div>
	{:else if activeTab === 'projects'}
		<div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects">
			<Projects />
		</div>
	{/if}
</div>
