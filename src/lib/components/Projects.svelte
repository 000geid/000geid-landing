<script lang="ts">
	import { t } from '$lib/stores/i18n';
</script>

<section class="py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('projects.title')}
	</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<a
			href="#"
			target="_blank"
			rel="noopener noreferrer"
			class="group p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:scale-[1.02]"
		>
			<h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-2 group-hover:text-blue-500 transition-colors">
				{$t('projects.project1.title')}
			</h3>
			<p class="text-neutral-600 dark:text-neutral-400 mb-4">
				{$t('projects.project1.description')}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each $t('projects.project1.tags') as tag}
					<span class="px-2 py-1 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
						{tag}
					</span>
				{/each}
			</div>
		</a>

		<a
			href="#"
			target="_blank"
			rel="noopener noreferrer"
			class="group p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:scale-[1.02]"
		>
			<h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-2 group-hover:text-blue-500 transition-colors">
				{$t('projects.project2.title')}
			</h3>
			<p class="text-neutral-600 dark:text-neutral-400 mb-4">
				{$t('projects.project2.description')}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each $t('projects.project2.tags') as tag}
					<span class="px-2 py-1 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
						{tag}
					</span>
				{/each}
			</div>
		</a>

		<a
			href="#"
			target="_blank"
			rel="noopener noreferrer"
			class="group p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:scale-[1.02]"
		>
			<h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-2 group-hover:text-blue-500 transition-colors">
				{$t('projects.project3.title')}
			</h3>
			<p class="text-neutral-600 dark:text-neutral-400 mb-4">
				{$t('projects.project3.description')}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each $t('projects.project3.tags') as tag}
					<span class="px-2 py-1 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
						{tag}
					</span>
				{/each}
			</div>
		</a>
	</div>
</section>
