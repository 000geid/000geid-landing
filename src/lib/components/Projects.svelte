<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { projectsData, type PortfolioGroup, type ProjectEntry } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	const GROUP_ORDER: PortfolioGroup[] = ['products', 'oss', 'client'];

	function buildGroups(): { group: PortfolioGroup; items: ProjectEntry[] }[] {
		const map = new Map<PortfolioGroup, ProjectEntry[]>();
		for (const g of GROUP_ORDER) map.set(g, []);
		for (const p of projectsData) {
			map.get(p.portfolioGroup)?.push(p);
		}
		return GROUP_ORDER.map((g) => ({ group: g, items: map.get(g) ?? [] })).filter((x) => x.items.length > 0);
	}

	const grouped = buildGroups();

	const indexById = new Map<string, number>();
	let n = 0;
	for (const { items } of grouped) {
		for (const p of items) {
			indexById.set(p.id, n++);
		}
	}
</script>

<section id="projects" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader layout="banner" kicker={$t('projects.kicker')} title={$t('projects.title')} />

	<p
		class="font-body text-base md:text-lg text-black/75 dark:text-white/75 leading-relaxed max-w-3xl mb-10 md:mb-14 pl-4 border-l-2 border-[var(--color-primary)]"
	>
		{$t('projects.intro')}
	</p>

	{#each grouped as { group, items } (group)}
		<div class="mb-14 md:mb-20 last:mb-0">
			<h3 class="font-display font-bold text-xl md:text-2xl tracking-tight text-black dark:text-white mb-6 md:mb-8">
				{$t(`projects.groups.${group}`)}
			</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
				{#each items as project (project.id)}
					<a
						href={`/projects/${project.id}`}
						class="reveal group relative block border-2 border-black dark:border-white bg-white dark:bg-black p-6 md:p-8
							hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white
							transition-all duration-300 brutalist-shadow brutalist-shadow-hover"
						style="animation-delay: {(indexById.get(project.id) ?? 0) * 100}ms"
						use:reveal
					>
						<div class="relative z-10">
							<div class="flex items-start justify-between mb-4">
								<span class="font-body text-xs uppercase tracking-wider text-black/40 dark:text-white/40 group-hover:text-white/60 transition-colors">
									{String((indexById.get(project.id) ?? 0) + 1).padStart(2, '0')}
								</span>
								<div class="w-8 h-8 border border-black/20 dark:border-white/20 group-hover:border-white/40 transition-colors flex items-center justify-center">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</div>
							</div>

							<h4 class="font-display font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-white group-hover:text-white transition-colors mb-3">
								{$language === 'es' ? project.story.es.title : project.story.en.title}
							</h4>

							<p class="font-body text-base text-black/70 dark:text-white/70 group-hover:text-white/80 transition-colors leading-relaxed mb-6">
								{project.description[$language]}
							</p>

							<div class="flex flex-wrap gap-2">
								{#each project.tags.slice(0, 3) as tag}
									<span class="px-2 py-1 bg-black/5 dark:bg-white/5 font-body text-xs uppercase tracking-wider text-black/60 dark:text-white/60 group-hover:bg-white/20 group-hover:text-white transition-colors">
										{tag}
									</span>
								{/each}
								{#if project.tags.length > 3}
									<span class="px-2 py-1 font-body text-xs uppercase tracking-wider text-black/40 dark:text-white/40 group-hover:text-white/60 transition-colors">
										+{project.tags.length - 3}
									</span>
								{/if}
							</div>
						</div>

						<div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-white/40 transition-colors"></div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
