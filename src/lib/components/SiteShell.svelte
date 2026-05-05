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

<div
	class="min-h-screen bg-[var(--color-parchment)] text-[var(--color-ink)] transition-colors noise-overlay relative grid-pattern"
>
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white"
	>
		Skip to content
	</a>

	<header
		class="sticky top-0 z-30 border-b border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] bg-[rgba(243,244,247,0.82)] backdrop-blur-md dark:bg-[rgba(18,21,25,0.82)] supports-[backdrop-filter]:bg-[rgba(243,244,247,0.72)] dark:supports-[backdrop-filter]:bg-[rgba(18,21,25,0.72)]"
	>
		<div class="h-0.5 bg-[var(--color-signal)] transition-transform duration-300 origin-left {$navigating ? 'scale-x-100' : 'scale-x-0'}"></div>
		<div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-6 py-4">
			<a
				href="/"
				class="font-display font-bold text-lg md:text-xl tracking-tight text-[var(--color-ink-strong)] truncate transition-transform duration-200 hover:-translate-y-px"
				aria-label={$t('hero.name')}
			>
				DA
			</a>

			<div class="flex items-center gap-2 shrink-0">
				<LanguageToggler />
				<button
					onclick={() => darkMode.toggle()}
					class="w-10 h-10 rounded-lg border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--color-signal)_42%,transparent)] transition-all duration-200 flex items-center justify-center"
					aria-label={$t('hero.toggleDarkMode')}
				>
					<svg class="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
					<svg class="w-5 h-5 hidden dark:block opacity-95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

		<nav aria-label={$t('nav.sections')} class="no-scrollbar overflow-x-auto border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
			<div class="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
				<div class="flex items-center gap-1 w-max">
					{#each sectionDefinitions as section (section.slug)}
						{@const isActive = isSectionActive($page.url.pathname, section.path)}
						<a
							href={section.path}
							class="group relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] rounded-lg transition-all duration-200
								{isActive
									? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)]'
									: 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink-strong)] hover:bg-[rgba(31,35,42,0.05)] dark:hover:bg-[rgba(210,217,226,0.06)]'}"
						>
							<span class="relative z-10">{$t(section.labelKey)}</span>
							<span class="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-0.5 bg-[var(--color-signal)] rounded-full transition-transform duration-300 origin-left opacity-90
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
