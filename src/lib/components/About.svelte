<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
</script>

<section id="about" class="scroll-mt-24 pt-10 pb-20 px-6 max-w-5xl mx-auto">
	<p class="uppercase text-sm font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
		{$t('hero.subtitle')}
	</p>

	<h1 class="mt-4 text-4xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
		{$t('hero.name')}
	</h1>

	<p class="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
		Buenos Aires, Argentina
	</p>

	<p class="mt-6 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
		{$t('about.description')}
	</p>

	<div class="mt-8 flex flex-wrap gap-2">
		{#each $t('about.highlights') as highlight}
			<Badge variant="outline">{highlight}</Badge>
		{/each}
	</div>

	<div class="mt-8 flex flex-wrap gap-3">
		<Button href="#projects">{$t('projects.title')}</Button>
		<Button href="#contact" variant="outline">{$t('contact.title')}</Button>
		<Button href={cvHref} target="_blank" rel="noopener noreferrer" variant="ghost">
			{cvLabel}
		</Button>
	</div>
</section>
