<script lang="ts">
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';
	import { sectionDefinitions } from '$lib/data/sections';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';

	function isSectionActive(pathname: string, sectionPath: string) {
		if (sectionPath === '/projects') {
			return pathname === '/projects' || pathname.startsWith('/projects/');
		}

		return pathname === sectionPath;
	}
</script>

<div class="min-h-screen bg-[var(--color-surface)] dark:bg-[var(--color-surface)] transition-colors noise-overlay relative">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white"
	>
		Skip to content
	</a>

	<header class="sticky top-0 z-30 border-b-2 border-black dark:border-white bg-[var(--color-surface)] dark:bg-[var(--color-surface)]">
		<div class="h-[2px] bg-[var(--color-primary)] transition-transform duration-300 origin-left {$navigating ? 'scale-x-100' : 'scale-x-0'}"></div>
		<div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-6 py-4">
			<a
				href="/"
				class="font-display font-bold text-lg md:text-xl tracking-tight text-black dark:text-white truncate uppercase transition-transform duration-200 hover:-translate-y-0.5"
				aria-label={$t('hero.name')}
			>
				DA
			</a>

			<div class="flex items-center gap-3 shrink-0">
				<LanguageToggler />
				<button
					onclick={() => darkMode.toggle()}
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
					{#each sectionDefinitions as section (section.slug)}
						{@const isActive = isSectionActive($page.url.pathname, section.path)}
						<a
							href={section.path}
							class="group relative px-3 py-1.5 text-sm font-body uppercase tracking-wider transition-all duration-200 no-rounded
								{isActive
									? 'bg-black dark:bg-white text-white dark:text-black font-medium'
									: 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}"
						>
							<span class="relative z-10">{$t(section.labelKey)}</span>
							<span class="pointer-events-none absolute left-2 right-2 -bottom-px h-[2px] bg-[var(--color-primary)] transition-transform duration-300 origin-left
								{isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}"></span>
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</header>

	<div class="route-enter">
		<slot />
	</div>
</div>
