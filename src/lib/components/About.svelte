<script lang="ts">
	import { t } from '$lib/stores/i18n';
</script>

<section class="py-16 px-6 max-w-5xl mx-auto">
	<div class="text-center space-y-6 mb-12">
		<h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
			{$t('hero.name')}
		</h1>
		<div class="flex flex-wrap items-center justify-center gap-2 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium">
			<span>{$t('hero.subtitle')}</span>
			<span class="text-neutral-400 dark:text-neutral-600">•</span>
			<span class="text-blue-500">Buenos Aires, Argentina</span>
		</div>
		<p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium">
			{$t('hero.subtitle')}
		</p>
	</div>

	<div class="space-y-6">
		<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50">
			{$t('about.title')}
		</h2>
		<p class="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
			{$t('about.description')}
		</p>
	</div>
</section>
