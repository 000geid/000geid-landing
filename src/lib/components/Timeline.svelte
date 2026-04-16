<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { timelineData } from '$lib/data/timeline';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	let expandedId = $state<string | null>(null);

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function formatDate(dateString: string | null) {
		if (!dateString) return $t('careerPath.present');

		const date = new Date(dateString);
		return new Intl.DateTimeFormat($language === 'es' ? 'es-ES' : 'en-US', {
			month: 'short',
			year: 'numeric'
		}).format(date);
	}

	function getDuration(startDate: string, endDate: string | null) {
		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

		const years = Math.floor(diffMonths / 12);
		const months = diffMonths % 12;

		const parts = [];
		if (years > 0)
			parts.push(
				`${years} ${$language === 'es' ? (years === 1 ? 'año' : 'años') : years === 1 ? 'year' : 'years'}`
			);
		if (months > 0)
			parts.push(
				`${months} ${$language === 'es' ? (months === 1 ? 'mes' : 'meses') : months === 1 ? 'month' : 'months'}`
			);

		return parts.join(' ');
	}
</script>

<section id="career" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader kicker={$t('careerPath.kicker')} title={$t('careerPath.title')}>
		<svelte:fragment slot="aside">
			<p
				class="font-body text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed pl-4 border-l-2 border-[var(--color-primary)]"
			>
				{$t('careerPath.intro')}
			</p>
		</svelte:fragment>
	</SectionPageHeader>

	<div class="space-y-6 mt-2 md:mt-4">
		{#each timelineData as item, index}
			<div
				class="reveal group relative border-l-2 border-black/10 dark:border-white/10 pl-6 md:pl-8
					{index === timelineData.length - 1 ? '' : 'pb-8'}"
				use:reveal
			>
				<!-- Timeline marker -->
				<div class="absolute left-0 top-2 w-4 h-4 -translate-x-1/2 border-2 border-[var(--color-primary)] bg-white dark:bg-black group-hover:bg-[var(--color-primary)] transition-colors duration-300"></div>

				<!-- Main content -->
				<div
					class="border-2 border-black/5 dark:border-white/5 bg-white dark:bg-black p-6 md:p-8
						hover:border-black/10 dark:hover:border-white/10 transition-all duration-300"
				>
					<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<span class="font-body text-xs uppercase tracking-wider text-[var(--color-primary)]">
									{formatDate(item.startDate)} — {formatDate(item.endDate)}
								</span>
								<span class="w-px h-3 bg-black/20 dark:bg-white/20"></span>
								<span class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
									{getDuration(item.startDate, item.endDate)}
								</span>
							</div>

							<h3 class="font-display font-bold text-2xl md:text-3xl text-black dark:text-white mb-1">
								{$language === 'es' ? item.title_es : item.title_en}
							</h3>
							<p class="font-body text-base text-black/70 dark:text-white/70">
								{item.company}
							</p>
						</div>

						<button
							onclick={() => toggleExpand(item.id)}
							class="group/btn shrink-0 px-4 py-2 font-body text-xs uppercase tracking-wider
								border border-black/20 dark:border-white/20 text-black/70 dark:text-white/70
								hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
								transition-all duration-200"
							aria-expanded={expandedId === item.id}
						>
							<span class="flex items-center gap-2">
								{expandedId === item.id ? $t('careerPath.collapseButton') : $t('careerPath.expandButton')}
								<svg
									class="w-3 h-3 transition-transform duration-200 {expandedId === item.id
										? 'rotate-180'
										: ''}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</button>
					</div>

					<p class="font-body text-base text-black/70 dark:text-white/70 leading-relaxed mb-4">
						{$language === 'es' ? item.description_es : item.description_en}
					</p>

					{#if expandedId === item.id}
						<div class="pt-4 border-t border-black/10 dark:border-white/10">
							<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
								{$t('careerPath.responsibilitiesHeading')}
							</p>
							<ul class="space-y-2">
								{#each $language === 'es' ? item.responsibilities_es : item.responsibilities_en as resp}
									<li class="flex items-start gap-3 font-body text-sm text-black/70 dark:text-white/70">
										<span class="mt-1.5 w-1 h-1 bg-[var(--color-primary)] shrink-0"></span>
										<span>{resp}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateX(-30px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateX(0);
	}
</style>
