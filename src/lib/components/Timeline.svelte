<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { timelineData } from '$lib/data/timeline';
	import { onMount } from 'svelte';

	let expandedId = $state<string | null>(null);
	let animateItems = $state(false);

	onMount(() => {
		animateItems = true;
	});

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function getIcon(iconName: string) {
		switch (iconName) {
			case 'lead-dev':
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`;
			case 'freelance':
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>`;
			case 'ai-health':
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
			default:
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
		}
	}
</script>

<section class="py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('careerPath.title')}
	</h2>

	<div class="relative">
		<div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 transform md:-translate-x-1/2"></div>

		{#each timelineData as item, index}
			<div
				class="relative mb-12 md:mb-16 animate-fade-in-up"
				style={animateItems ? `animation-delay: ${index * 100}ms` : ''}
			>
				<div class="md:flex items-center {index % 2 === 0 ? '' : 'md:flex-row-reverse'}">
					<div class="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white transform md:-translate-x-1/2 z-10">
						{@html getIcon(item.icon)}
					</div>

					<div class="md:w-1/2 md:pr-12 {index % 2 === 0 ? 'md:pl-12 md:ml-12' : 'md:pl-12 md:mr-12'}">
						<div class="ml-12 md:ml-0">
							<div class="text-sm font-semibold text-blue-500 mb-1">{item.dates}</div>
							<h3 class="text-xl md:text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">
								{$language === 'es' ? item.title_es : item.title_en}
							</h3>
							<div class="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-3">{item.company}</div>
							<p class="text-neutral-700 dark:text-neutral-300 mb-3">
								{$language === 'es' ? item.description_es : item.description_en}
							</p>

							<button
								onclick={() => toggleExpand(item.id)}
								class="text-blue-500 hover:text-blue-600 font-medium text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
								aria-expanded={expandedId === item.id}
								aria-label={expandedId === item.id ? $t('careerPath.collapseButton') : $t('careerPath.expandButton')}
							>
								{expandedId === item.id ? $t('careerPath.collapseButton') : $t('careerPath.expandButton')}
							</button>

							{#if expandedId === item.id}
								<div class="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4 animate-expand">
									<h4 class="font-semibold text-neutral-950 dark:text-neutral-50 mb-3">
										{$language === 'es' ? 'Responsabilidades' : 'Responsibilities'}
									</h4>
									<ul class="space-y-2">
										{#each ($language === 'es' ? item.responsibilities_es : item.responsibilities_en) as resp}
											<li class="flex items-start text-neutral-700 dark:text-neutral-300">
												<span class="text-blue-500 mr-2 mt-1">•</span>
												<span>{resp}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
