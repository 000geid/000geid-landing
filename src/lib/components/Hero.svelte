<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { Button } from '$lib/components/ui/button';
</script>

<section id="home" class="scroll-mt-24 px-6 pt-10 pb-16">
	<div class="max-w-6xl mx-auto">
		<div class="max-w-3xl">
			<p class="uppercase text-sm font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
				{$t('hero.subtitle')}
			</p>
			<h1 class="mt-4 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
				{$t('hero.name')}
			</h1>
			<p class="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
				Buenos Aires, Argentina
			</p>
			<p class="mt-6 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
				{$t('hero.description')}
			</p>

			<div class="mt-8 flex flex-wrap gap-3">
				<Button href="#projects">{$t('projects.title')}</Button>
				<Button href="#contact" variant="outline">{$t('contact.title')}</Button>
			</div>
		</div>
	</div>
</section>
