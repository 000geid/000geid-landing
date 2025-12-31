<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { educationData } from '$lib/data/education';
</script>

<section class="py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('education.title')}
	</h2>

	<div class="space-y-6">
		{#each educationData as item}
			<div class="border-l-4 border-blue-500 pl-6 py-2">
				<div class="text-sm font-semibold text-blue-500 mb-1">
					{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
				</div>
				<h3 class="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">
					{$language === 'es' ? item.degree_es : item.degree_en}
				</h3>
				<div class="text-lg text-neutral-600 dark:text-neutral-400">{item.institution}</div>
				{#if item.location}
					<div class="text-sm text-neutral-500 dark:text-neutral-500 mt-1">{item.location}</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
