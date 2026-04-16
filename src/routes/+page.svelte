<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { legacyHashRedirects, getSectionBySlug, type SectionDefinition, type SectionSlug } from '$lib/data/sections';
	import { homeFlowGroups } from '$lib/data/homeFlow';
	import { t } from '$lib/stores/i18n';

	onMount(() => {
		const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
		const targetPath = hash ? legacyHashRedirects[hash] : null;

		if (targetPath) {
			void goto(targetPath, { replaceState: true, noScroll: true });
		}
	});

	let step = 0;
	const flowBlocks: {
		groupKey: string;
		items: { slug: SectionSlug; section: SectionDefinition; step: number }[];
	}[] = [];

	for (const g of homeFlowGroups) {
		const items: { slug: SectionSlug; section: SectionDefinition; step: number }[] = [];
		for (const slug of g.slugs) {
			const section = getSectionBySlug(slug);
			if (!section) continue;
			step += 1;
			items.push({ slug, section, step });
		}
		if (items.length) {
			flowBlocks.push({ groupKey: g.groupKey, items });
		}
	}
</script>

<svelte:head>
	<title>{$t('hero.name')} | {$t('hero.subtitle')}</title>
	<meta name="description" content={$t('hero.description')} />
</svelte:head>

<main id="main-content" class="border-t-2 border-black dark:border-white">
		<section class="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-24">
			<div class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-start">
				<header class="lg:col-span-5 mb-10 lg:mb-0 lg:sticky lg:top-28">
					<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
						{$t('home.indexLabel')}
					</p>
					<h1
						class="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl tracking-tighter text-black dark:text-white leading-[0.95] mb-5 uppercase"
					>
						{$t('hero.name')}
					</h1>
					<p class="font-body text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed mb-4">
						{$t('hero.subtitle')}
					</p>
					<p class="font-body text-base md:text-lg text-black/80 dark:text-white/80 leading-relaxed max-w-xl">
						{$t('hero.description')}
					</p>
					<p
						class="font-body text-sm text-black/55 dark:text-white/55 leading-relaxed max-w-xl mt-6 pl-4 border-l-2 border-[var(--color-primary)]"
					>
						{$t('home.flowHint')}
					</p>
				</header>

				<div class="lg:col-span-7">
					<div class="flex items-center justify-between gap-4 mb-3">
						<p class="font-body text-xs uppercase tracking-[0.24em] text-black/45 dark:text-white/45">
							{$t('home.flowListLabel')}
						</p>
						<span class="hidden sm:inline font-body text-[10px] uppercase tracking-[0.2em] text-black/35 dark:text-white/35"
							>{$t('nav.sections')}</span
						>
					</div>

					<div
						class="border-2 border-black dark:border-white bg-[var(--color-surface)] dark:bg-[var(--color-surface)] brutalist-shadow"
					>
						{#each flowBlocks as block}
							<div class="border-b-2 border-black/10 dark:border-white/10 last:border-b-0">
								<p
									class="font-body text-[11px] uppercase tracking-[0.24em] text-[var(--color-primary)] px-4 pt-4 pb-2"
								>
									{$t(block.groupKey)}
								</p>
								<ul class="divide-y divide-black/10 dark:divide-white/10">
									{#each block.items as { section, step, slug } (slug)}
										<li>
											<a
												href={section.path}
												class="group flex items-start gap-3 sm:gap-5 px-4 py-4 sm:py-4
													text-left w-full transition-colors duration-200
													hover:bg-[var(--color-primary)] hover:text-white
													focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)]"
											>
												<span
													class="font-display text-sm tabular-nums text-black/35 dark:text-white/35 group-hover:text-white/80 shrink-0 pt-0.5 w-8 sm:w-10"
												>
													{String(step).padStart(2, '0')}
												</span>
												<span class="flex-1 min-w-0">
													<span
														class="font-display font-bold text-lg sm:text-xl tracking-tight block mb-1 group-hover:text-white"
													>
														{$t(section.labelKey)}
													</span>
													<span
														class="font-body text-sm text-black/60 dark:text-white/60 group-hover:text-white/90 leading-snug block"
													>
														{$t(`home.blurbs.${slug}`)}
													</span>
												</span>
												<span class="shrink-0 pt-1 text-black/50 group-hover:text-white" aria-hidden="true">
													<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M17 8l4 4m0 0l-4 4m4-4H3"
														/>
													</svg>
												</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>
	</main>
