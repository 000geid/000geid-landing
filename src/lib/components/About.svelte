<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { reveal } from '$lib/actions/reveal';

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
</script>

<section id="about" class="scroll-mt-32 pt-16 md:pt-24 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
		<!-- Left side: Name and Location -->
		<div class="lg:col-span-7">
			<div class="reveal" use:reveal>
				<p class="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-black/60 dark:text-white/60 mb-4">
					{$t('hero.subtitle')}
				</p>

				<h1 class="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-black dark:text-white leading-[0.9] uppercase mb-6">
					{$t('hero.name')}
				</h1>

				<div class="flex items-center gap-3 mb-8">
					<div class="w-2 h-2 bg-[var(--color-primary)]"></div>
					<p class="font-body text-sm md:text-base text-black/70 dark:text-white/70">
						Buenos Aires, Argentina
					</p>
				</div>

				<p class="font-body text-base md:text-lg text-black/80 dark:text-white/80 leading-relaxed max-w-2xl">
					{$t('about.description')}
				</p>
			</div>
		</div>

		<!-- Right side: Highlights and Actions -->
		<div class="lg:col-span-5 lg:pl-8 flex flex-col justify-center">
			<div class="reveal delay-200" use:reveal>
				<div class="border-2 border-black dark:border-white p-6 md:p-8 bg-white dark:bg-black">
					<p class="font-body text-xs uppercase tracking-wider text-black/60 dark:text-white/60 mb-4">
						Core Expertise
					</p>

					<div class="flex flex-wrap gap-2 mb-8">
						{#each $t('about.highlights') as highlight}
							<span class="px-3 py-1.5 bg-[var(--color-surface-alt)] dark:bg-white/10 font-body text-sm text-black dark:text-white border border-black/20 dark:border-white/20 uppercase tracking-wider">
								{highlight}
							</span>
						{/each}
					</div>

					<div class="flex flex-col gap-3">
						<a
							href="#projects"
							class="group relative px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-display font-semibold text-lg tracking-wide uppercase text-center border-2 border-black dark:border-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover"
						>
							<span class="relative z-10">{$t('projects.title')}</span>
						</a>

						<a
							href="#contact"
							class="group px-6 py-4 bg-transparent text-black dark:text-white font-display font-semibold text-lg tracking-wide uppercase text-center border-2 border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
						>
							{$t('contact.title')}
						</a>

						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="group px-6 py-3 font-body text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white text-center uppercase tracking-wider border-b border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-all duration-200"
						>
							{cvLabel}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
