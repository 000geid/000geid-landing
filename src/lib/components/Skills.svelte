<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { skillsData } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="skills" class="scroll-mt-32 py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
		<div class="lg:col-span-5">
			<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
				{$language === 'es' ? 'Especialidades' : 'Expertise'}
			</p>
			<h2 class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black dark:text-white leading-none">
				{$t('skills.title')}
			</h2>
		</div>
		<div class="lg:col-span-7 flex flex-col justify-end gap-5">
			<div class="w-full h-px bg-black/20 dark:bg-white/20"></div>
			<p class="font-body text-sm md:text-base text-black/60 dark:text-white/60 max-w-lg">
				{$language === 'es'
					? 'Ingeniería full-stack con enfoque AI-first, desde arquitectura de producto hasta entrega en producción.'
					: 'AI-first full-stack engineering from product architecture to production delivery.'}
			</p>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each skillsData as category, index}
			<div
				class="reveal group border border-black/10 dark:border-white/10 bg-white dark:bg-black/80 p-6 md:p-7
					hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
				use:reveal
			>
				<div class="flex items-start justify-between mb-5">
					<div>
						<p class="font-body text-[11px] uppercase tracking-[0.24em] text-black/45 dark:text-white/45 mb-2">
							{index + 1 < 10 ? `0${index + 1}` : index + 1}
						</p>
						<h3 class="font-display font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-white">
							{$t(`skills.${category.name}`)}
						</h3>
					</div>
					<div class="shrink-0 border border-black/15 dark:border-white/15 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
						{category.skills.length} {$language === 'es' ? 'items' : 'items'}
					</div>
				</div>

				<div class="h-px w-full bg-black/10 dark:bg-white/10 mb-5"></div>

				<div class="flex flex-wrap gap-2.5">
					{#each category.skills as skill}
						<span class="px-3 py-1.5 bg-[var(--color-surface-alt)] dark:bg-white/5 font-body text-xs uppercase tracking-wider text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
