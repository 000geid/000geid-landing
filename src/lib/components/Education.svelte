<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { educationData } from '$lib/data/education';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';
</script>

<section id="education" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader kicker={$t('education.kicker')} title={$t('education.title')}>
		<svelte:fragment slot="aside">
			<p class="font-body text-sm md:text-base text-black/65 dark:text-white/65 max-w-xl leading-relaxed">
				{$t('education.intro')}
			</p>
		</svelte:fragment>
	</SectionPageHeader>

	<div class="relative pl-4 sm:pl-6">
		<div
			class="absolute left-5 top-2 bottom-0 w-px bg-black/15 dark:bg-white/15"
			aria-hidden="true"
		></div>

		{#each educationData as item, index}
			<div
				class="reveal relative pb-12 last:pb-0 pl-10 sm:pl-12"
				use:reveal
			>
				<div
					class="absolute left-5 top-2 w-7 h-7 -translate-x-1/2 border-2 border-black dark:border-white bg-[var(--color-surface)] flex items-center justify-center font-display text-[10px] tabular-nums text-[var(--color-primary)]"
				>
					{String(index + 1).padStart(2, '0')}
				</div>

				<div
					class="border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-7
						hover:border-black/25 dark:hover:border-white/25 transition-colors duration-300"
				>
					<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
						<div>
							<h3 class="font-display font-bold text-xl md:text-2xl text-black dark:text-white mb-1">
								{$language === 'es' ? item.degree_es : item.degree_en}
							</h3>
							<p class="font-body text-sm md:text-base text-black/70 dark:text-white/70">
								{item.institution}
							</p>
						</div>
						<span
							class="self-start px-3 py-1 bg-[var(--color-surface-alt)] dark:bg-white/5 font-body text-xs uppercase tracking-wider text-black/60 dark:text-white/60 border border-black/15 dark:border-white/15"
						>
							{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
						</span>
					</div>

					{#if item.location}
						<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
							{item.location}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
