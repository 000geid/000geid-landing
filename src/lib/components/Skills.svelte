<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { skillsData } from '$lib/data/skills';
</script>

<section class="py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('skills.title')}
	</h2>

	<div class="space-y-8">
		{#each skillsData as category}
			<div class="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-neutral-50 dark:bg-neutral-900/50">
				<h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-4">
					{$t(`skills.${category.name}`)}
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each category.skills as skill}
						<span class="px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
