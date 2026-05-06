<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import { legacyHashRedirects, getSectionBySlug, type SectionDefinition, type SectionSlug } from '$lib/data/sections';
	import { homeFlowGroups } from '$lib/data/homeFlow';
	import { absoluteUrl, resolveSiteOrigin } from '$lib/seo/site';
	import { t } from '$lib/stores/i18n';

	const personJsonLd = $derived.by(() => {
		const origin = resolveSiteOrigin($page.url.origin);
		const siteUrl = absoluteUrl(origin, '/');
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Diego Alvarado',
			url: siteUrl,
			jobTitle: 'Lead AI Product Engineer',
			email: 'mailto:dmalvaradog26@gmail.com',
			sameAs: ['https://github.com/000geid', 'https://www.linkedin.com/in/ogeid/'],
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Buenos Aires',
				addressCountry: 'AR'
			}
		};
	});

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

<SeoMeta
	title="{$t('hero.name')} | {$t('hero.subtitle')}"
	description={$t('hero.description')}
	jsonLd={personJsonLd}
/>

<main id="main-content" class="border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)]">
		<section class="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-24">
			<div class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-start">
				<header class="lg:col-span-5 mb-10 lg:mb-0 lg:sticky lg:top-28">
					<p class="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-4">
						{$t('home.indexLabel')}
					</p>
					<h1
						class="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl tracking-tighter text-[var(--color-ink-strong)] leading-[0.96] mb-5"
					>
						{$t('hero.name')}
					</h1>
					<p class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed mb-4 font-medium">
						{$t('hero.subtitle')}
					</p>
					<p class="font-body text-base md:text-lg text-[var(--color-ink)] leading-relaxed max-w-xl">
						{$t('hero.description')}
					</p>
					<p
						class="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-xl mt-6 pl-4 border-l-2 border-[var(--color-signal)] rounded-sm"
					>
						{$t('home.flowHint')}
					</p>
				</header>

				<div class="lg:col-span-7">
					<div class="flex items-center justify-between gap-4 mb-3">
						<p class="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-ink-faint)]">
							{$t('home.flowListLabel')}
						</p>
						<span class="hidden sm:inline font-body text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
							>{$t('nav.sections')}</span
						>
					</div>

					<div
						class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow overflow-hidden"
					>
						{#each flowBlocks as block}
							<div class="border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] last:border-b-0">
								<p
									class="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-signal)] px-4 pt-4 pb-2"
								>
									{$t(block.groupKey)}
								</p>
								<ul class="divide-y divide-[rgba(31,35,42,0.06)] dark:divide-[rgba(210,217,226,0.08)]">
									{#each block.items as { section, step, slug } (slug)}
										<li>
											<a
												href={section.path}
												class="group flex items-start gap-3 sm:gap-5 px-4 py-4 sm:py-4
													text-left w-full transition-[background-color,color,border-color] duration-200
													hover:bg-[var(--color-signal-soft)]
													focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-signal)]"
											>
												<span
													class="font-mono text-sm tabular-nums text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-strong)] shrink-0 pt-0.5 w-8 sm:w-10"
												>
													{String(step).padStart(2, '0')}
												</span>
												<span class="flex-1 min-w-0">
													<span
														class="font-display font-bold text-lg sm:text-xl tracking-tight text-[var(--color-ink-strong)] block mb-1"
													>
														{$t(section.labelKey)}
													</span>
													<span
														class="font-body text-sm text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] leading-snug block"
													>
														{$t(`home.blurbs.${slug}`)}
													</span>
												</span>
												<span class="shrink-0 pt-1 text-[var(--color-ink-muted)] group-hover:text-[var(--color-signal)] transition-colors" aria-hidden="true"
												>
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
