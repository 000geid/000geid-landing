<script lang="ts">
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		darkMode.init();
	});
</script>

<section class="min-h-[75vh] flex flex-col items-center justify-center px-6">
	<div class="max-w-4xl text-center">
		<h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 mb-6">
			{$t('hero.name')}
		</h1>
		<div class="flex items-center justify-center gap-2 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium mb-12">
			<span>{$t('hero.subtitle')}</span>
			<span class="text-neutral-400 dark:text-neutral-600">•</span>
			<span class="text-blue-500">Buenos Aires, Argentina</span>
		</div>
		<p class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium mb-12">
			{$t('hero.subtitle')}
		</p>
	</div>

	<div class="fixed top-6 right-6 flex gap-3">
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
</section>
