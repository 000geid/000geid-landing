<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { projectsData } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="projects" class="scroll-mt-32 py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="flex items-end justify-between mb-12 md:mb-16">
		<div>
			<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
				Selected Work
			</p>
			<h2 class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black dark:text-white leading-none">
				{$t('projects.title')}
			</h2>
		</div>
		<div class="hidden md:block">
			<div class="w-16 h-1 bg-[var(--color-primary)]"></div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
		{#each projectsData as project, index (project.id)}
			<a
				href={`/projects/${project.id}`}
				class="reveal group relative block border-2 border-black dark:border-white bg-white dark:bg-black p-6 md:p-8
					hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white
					transition-all duration-300 brutalist-shadow brutalist-shadow-hover"
				style="animation-delay: {index * 100}ms"
				use:reveal
			>
				<div class="relative z-10">
					<div class="flex items-start justify-between mb-4">
						<span class="font-body text-xs uppercase tracking-wider text-black/40 dark:text-white/40 group-hover:text-white/60 transition-colors">
							0{index + 1}
						</span>
						<div class="w-8 h-8 border border-black/20 dark:border-white/20 group-hover:border-white/40 transition-colors flex items-center justify-center">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</div>
					</div>

					<h3 class="font-display font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-white group-hover:text-white transition-colors mb-3">
						{project.title}
					</h3>

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

				<!-- Decorative corner accent -->
				<div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-white/40 transition-colors"></div>
			</a>
		{/each}
	</div>
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
