<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { getFeaturedProjects } from '$lib/data/projects';
	import { PROJECT_LUCIDE_GLYPHS } from '$lib/project-lucide';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { reveal } from '$lib/actions/reveal';

	const featured = getFeaturedProjects();
</script>

<section id="featured-work" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
	<div class="max-w-4xl mx-auto">
		<header class="mb-8 md:mb-10">
			<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
				{$t('home.featured.kicker')}
			</p>
			<h2
				class="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]"
			>
				{$t('home.featured.title')}
			</h2>
		</header>

		<div class="space-y-3">
			{#each featured as project, idx (project.id)}
				{@const ProjectGlyph = PROJECT_LUCIDE_GLYPHS[project.lucideGlyph]}
				<a
					href={`/projects/${project.id}`}
					class="reveal group block rounded-xl border border-[rgba(31,35,42,0.09)] dark:border-[rgba(210,217,226,0.09)]
						bg-[rgba(31,35,42,0.02)] dark:bg-[rgba(210,217,226,0.02)]
						p-5 md:p-6 min-h-[44px]
						hover:bg-[rgba(31,35,42,0.05)] dark:hover:bg-[rgba(210,217,226,0.05)]
						hover:border-[rgba(31,35,42,0.16)] dark:hover:border-[rgba(210,217,226,0.16)]
						transition-all duration-200
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2"
					style="animation-delay: {idx * 80}ms"
					use:reveal
				>
					<div class="flex items-start gap-4">
						<span
							class="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
								bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)]
								border border-[rgba(31,35,42,0.07)] dark:border-[rgba(210,217,226,0.08)]
								text-[var(--color-signal)]"
							aria-hidden="true"
						>
							<ProjectGlyph size={21} strokeWidth={1.75} />
						</span>

						<div class="flex-1 min-w-0">
							<h3
								class="font-display font-semibold text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)] group-hover:text-[var(--color-ink)] mb-2"
							>
								{$language === 'es' ? project.story.es.title : project.story.en.title}
							</h3>

							<p class="font-body text-[0.9rem] md:text-base text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] leading-relaxed mb-3">
								{project.description[$language]}
							</p>

							{#if project.metric}
								<p class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-signal)] mb-4">
									{project.metric[$language]}
								</p>
							{/if}

							<span
								class="inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--color-signal)] opacity-80 group-hover:opacity-100"
							>
								<span>{$t('projects.flowReadStory')}</span>
								<ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden={true} />
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-8 md:mt-10">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 font-display font-semibold text-sm tracking-tight text-[var(--color-signal)] hover:underline"
			>
				{$t('home.featured.viewAll')}
				<ArrowRight class="w-4 h-4" strokeWidth={2} aria-hidden={true} />
			</a>
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
