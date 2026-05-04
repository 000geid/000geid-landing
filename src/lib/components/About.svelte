<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { reveal } from '$lib/actions/reveal';
	import { ABOUT_SECTOR_IDS } from '$lib/data/aboutSectors';

	const recruiterEmail = 'dmalvaradog26@gmail.com';

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
	$: recruiterHref = `mailto:${recruiterEmail}`;
</script>

<section id="about" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
		<!-- Left side: Name and Location -->
		<div class="lg:col-span-7">
			<div class="reveal" use:reveal>
				<p class="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-4">
					{$t('about.kicker')}
				</p>

				<h1 class="font-display font-semibold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[var(--color-ink-strong)] leading-[0.93] mb-6">
					{$t('hero.name')}
				</h1>

				<div class="flex items-center gap-3 mb-8">
					<div class="w-2 h-2 rounded-full bg-[var(--color-signal)] shrink-0"></div>
					<p class="font-body text-sm md:text-base text-[var(--color-ink-muted)]">
						Buenos Aires, Argentina
					</p>
				</div>

				<p class="font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)] mb-4 max-w-2xl">
					{$t('about.headline')}
				</p>

				<p class="font-body text-base md:text-lg text-[var(--color-ink)] leading-relaxed max-w-2xl mb-8">
					{$t('about.valueProp')}
				</p>

				<p class="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-ink-muted)] mb-5">
					{$t('about.sectorsIntro')}
				</p>

				<div class="space-y-8 max-w-2xl">
					{#each ABOUT_SECTOR_IDS as sectorId}
						<div class="border-l-2 border-[var(--color-signal)] pl-4 md:pl-5 rounded-sm">
							<h3 class="font-display font-semibold text-base md:text-lg tracking-tight text-[var(--color-ink-strong)] mb-3">
								{$t(`about.sectors.${sectorId}.title`)}
							</h3>
							<ul class="space-y-2.5">
								{#each $t(`about.sectors.${sectorId}.points`) as point}
									<li class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed pl-4 relative">
										<span class="absolute left-0 top-[0.52rem] w-1.5 h-1.5 rounded-full bg-[var(--color-signal-soft)] ring-2 ring-transparent"></span>
										{point}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right side: Highlights and Actions -->
		<div class="lg:col-span-5 lg:pl-8 flex flex-col justify-center">
			<div class="reveal delay-200" use:reveal>
				<div class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] p-6 md:p-8 brutalist-shadow">
					<p class="font-body text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-4">
						{$t('about.coreExpertise')}
					</p>

					<div class="flex flex-wrap gap-2 mb-8">
						{#each $t('about.highlights') as highlight}
							<span class="px-3 py-1.5 rounded-md bg-[rgba(31,35,42,0.06)] dark:bg-[rgba(210,217,226,0.06)] border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] font-body text-sm text-[var(--color-ink-strong)] uppercase tracking-[0.12em]"
							>
								{highlight}
							</span>
						{/each}
					</div>

					<div class="flex flex-col gap-3">
						<a
							href={recruiterHref}
							class="group px-6 py-4 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] font-display font-semibold text-lg tracking-tight text-center border border-transparent dark:border-[rgba(210,217,226,0.12)] hover:bg-[var(--color-ink)] dark:hover:bg-[rgba(210,217,226,0.07)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover"
						>
							<span class="relative z-10">{$t('about.ctaEmail')}</span>
						</a>

						<a
							href="/projects"
							class="group px-6 py-4 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-lg tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] transition-all duration-200"
						>
							{$t('about.ctaProjects')}
						</a>

						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="group px-6 py-3 font-body text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-signal)] text-center tracking-wide border-b border-[rgba(31,35,42,0.12)] hover:border-[var(--color-signal)] transition-all duration-200"
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
