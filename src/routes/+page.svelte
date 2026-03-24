<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { legacyHashRedirects, sectionDefinitions } from '$lib/data/sections';
	import { t } from '$lib/stores/i18n';

	onMount(() => {
		const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
		const targetPath = hash ? legacyHashRedirects[hash] : null;

		if (targetPath) {
			void goto(targetPath, { replaceState: true, noScroll: true });
		}
	});
</script>

<svelte:head>
	<title>{$t('hero.name')} | {$t('hero.subtitle')}</title>
	<meta name="description" content={$t('hero.description')} />
</svelte:head>

<SiteShell>
	<main id="main-content" class="border-t-2 border-black dark:border-white">
		<section class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
			<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
				{$t('home.indexLabel')}
			</p>
			<h1 class="font-display font-bold text-5xl md:text-7xl tracking-tighter text-black dark:text-white leading-[0.9] mb-6 uppercase">
				{$t('hero.name')}
			</h1>
			<p class="font-body text-base md:text-lg text-black/70 dark:text-white/70 max-w-3xl leading-relaxed mb-12">
				{$t('hero.description')}
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				{#each sectionDefinitions as section (section.slug)}
					<a
						href={section.path}
						class="group block border-2 border-black dark:border-white bg-white dark:bg-black p-6 md:p-7
							hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white
							transition-all duration-300 brutalist-shadow brutalist-shadow-hover"
					>
						<div class="flex items-center justify-between mb-6">
							<p class="font-body text-xs uppercase tracking-[0.22em] text-black/45 dark:text-white/45 group-hover:text-white/60 transition-colors">
								{section.path}
							</p>
							<svg class="w-4 h-4 text-black/60 dark:text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</div>
						<h2 class="font-display font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-white group-hover:text-white transition-colors">
							{$t(section.labelKey)}
						</h2>
					</a>
				{/each}
			</div>
		</section>
	</main>
</SiteShell>
