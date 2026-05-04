<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { projectsData, type PortfolioGroup, type ProjectEntry } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';

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
	const flattenedProjects: ProjectEntry[] = grouped.flatMap((g) => g.items);
</script>

<section id="projects" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6">
	<div class="max-w-4xl mx-auto">
		<header class="mb-10 md:mb-12">
			<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
				{$t('projects.kicker')}
			</p>
			<h2
				class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]"
			>
				{$t('projects.title')}
			</h2>
		</header>

		<div class="space-y-3">
			{#each flattenedProjects as project, idx (project.id)}
				<a
					href={`/projects/${project.id}`}
					class="reveal group block rounded-xl border border-[rgba(31,35,42,0.09)] dark:border-[rgba(210,217,226,0.09)]
						bg-[rgba(31,35,42,0.02)] dark:bg-[rgba(210,217,226,0.02)]
						p-5 md:p-6
						hover:bg-[rgba(31,35,42,0.05)] dark:hover:bg-[rgba(210,217,226,0.05)]
						hover:border-[rgba(31,35,42,0.16)] dark:hover:border-[rgba(210,217,226,0.16)]
						transition-all duration-200
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2"
					style="animation-delay: {idx * 80}ms"
					use:reveal
				>
					<div class="flex items-start gap-4">
						{#if project.icon}
							<span
								class="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl
									bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)]
									border border-[rgba(31,35,42,0.07)] dark:border-[rgba(210,217,226,0.08)]"
								aria-hidden="true"
							>
								{project.icon}
							</span>
						{/if}

						<div class="flex-1 min-w-0">
							<h4
								class="font-display font-semibold text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)] group-hover:text-[var(--color-ink)] mb-2"
							>
								{$language === 'es' ? project.story.es.title : project.story.en.title}
							</h4>

							<p class="font-body text-[0.9rem] md:text-base text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] leading-relaxed mb-4">
								{project.description[$language]}
							</p>

							<div class="flex flex-wrap gap-x-2 gap-y-1.5 items-center mb-4">
								{#each project.tags.slice(0, 4) as tag}
									<span
										class="px-2 py-1 rounded-md font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-muted)] bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)] ring-1 ring-transparent group-hover:ring-[rgba(53,90,76,0.15)] transition-[ring-color] duration-200"
									>
										{tag}
									</span>
								{/each}
								{#if project.tags.length > 4}
									<span class="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
										+{project.tags.length - 4}
									</span>
								{/if}
							</div>

							<span
								class="inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--color-signal)] opacity-80 group-hover:opacity-100"
							>
								<span>{$t('projects.flowReadStory')}</span>
								<svg
									class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
