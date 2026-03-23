<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { educationData } from '$lib/data/education';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="education" class="scroll-mt-32 py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
		<div class="lg:col-span-5">
			<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
				{$language === 'es' ? 'Académico' : 'Academic'}
			</p>
			<h2 class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black dark:text-white leading-none">
				{$t('education.title')}
			</h2>
		</div>
		<div class="lg:col-span-7 flex items-end">
			<div class="w-full h-px bg-black/20 dark:bg-white/20"></div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each educationData as item, index}
			<div
				class="reveal group border border-black/10 dark:border-white/10 bg-white dark:bg-black p-6
					hover:border-black dark:hover:border-white transition-all duration-300"
				use:reveal
			>
				<div class="flex items-start justify-between mb-4">
					<div class="flex-1">
						<h3 class="font-display font-bold text-xl text-black dark:text-white mb-1">
							{$language === 'es' ? item.degree_es : item.degree_en}
						</h3>
						<p class="font-body text-sm text-black/70 dark:text-white/70">
							{item.institution}
						</p>
					</div>
					<div class="w-2 h-2 bg-[var(--color-primary)] shrink-0 mt-2"></div>
				</div>

				{#if item.location}
					<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
						{item.location}
					</p>
				{/if}

				<div class="pt-3 border-t border-black/10 dark:border-white/10">
					<span class="px-3 py-1 bg-[var(--color-surface-alt)] dark:bg-white/5 font-body text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
						{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
					</span>
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
