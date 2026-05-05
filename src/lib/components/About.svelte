<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { reveal } from '$lib/actions/reveal';
	import { ABOUT_SECTOR_IDS } from '$lib/data/aboutSectors';
	import MapPin from 'lucide-svelte/icons/map-pin';

	const recruiterEmail = 'dmalvaradog26@gmail.com';

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
	$: recruiterHref = `mailto:${recruiterEmail}`;

	$: stats = [
		{ value: '5', unit: $language === 'es' ? 'años' : 'years', label: $language === 'es' ? 'de experiencia' : 'of experience' },
		{ value: '10+', unit: $language === 'es' ? 'clientes' : 'clients', label: $language === 'es' ? 'atendidos' : 'delivered for' },
		{ value: '3', unit: $language === 'es' ? 'productos' : 'products', label: $language === 'es' ? 'en producción' : 'in production' },
	];
</script>

<section id="about" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16">

		<!-- Left column -->
		<div class="lg:col-span-7">
			<div class="reveal" use:reveal>

				<!-- Greeting (reads with name below: “Hola! Soy Diego Alvarado”) -->
				<p
					class="font-body text-lg md:text-2xl lg:text-3xl font-semibold leading-snug text-[var(--color-signal)] mb-3 md:mb-4"
				>
					{$t('about.kicker')}
				</p>

				<!-- Name -->
				<h1 class="font-display font-semibold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[var(--color-ink-strong)] leading-[0.93] mb-5">
					{$t('hero.name')}
				</h1>

				<!-- Location -->
				<div class="flex items-center gap-2.5 mb-8">
					<MapPin
						class="shrink-0 text-[var(--color-signal)]"
						size={18}
						strokeWidth={2}
						aria-hidden="true"
					/>
					<p class="font-body text-sm text-[var(--color-ink-muted)]">Buenos Aires, Argentina</p>
				</div>

				<!-- Stats bar -->
				<div class="flex items-start gap-0 mb-10 border-y border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] py-5 divide-x divide-[rgba(31,35,42,0.08)] dark:divide-[rgba(210,217,226,0.08)]">
					{#each stats as stat}
						<div class="flex flex-col pr-6 pl-6 first:pl-0 last:pr-0 gap-0.5">
							<span class="font-mono text-2xl md:text-3xl font-bold text-[var(--color-ink-strong)] leading-none tracking-tight tabular-nums">{stat.value}</span>
							<span class="font-body text-[11px] text-[var(--color-ink-muted)] leading-snug mt-1">{stat.unit}<br/><span class="text-[var(--color-ink-faint)]">{stat.label}</span></span>
						</div>
					{/each}
				</div>

				<!-- Headline + intro -->
				<p class="font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)] mb-3 max-w-xl">
					{$t('about.headline')}
				</p>
				<p class="font-body text-base md:text-lg text-[var(--color-ink)] leading-relaxed max-w-2xl mb-10">
					{$t('about.valueProp')}
				</p>

				<!-- Section label -->
				<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-6">
					{$t('about.sectorsIntro')}
				</p>

				<!-- Sector cards -->
				<div class="space-y-8 max-w-2xl">
					{#each ABOUT_SECTOR_IDS as sectorId}
						<div class="border-l-2 border-[var(--color-signal)] pl-5 md:pl-6">
							<h3 class="font-display font-semibold text-base md:text-lg tracking-tight text-[var(--color-ink-strong)] mb-3 leading-snug">
								{$t(`about.sectors.${sectorId}.title`)}
							</h3>
							<div class="space-y-2.5">
								{#each $t(`about.sectors.${sectorId}.points`) as point}
									<p class="font-body text-sm md:text-[0.9375rem] text-[var(--color-ink-muted)] leading-relaxed">
										{point}
									</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>

			</div>
		</div>

		<!-- Right column: contact card -->
		<div class="lg:col-span-5 flex flex-col justify-start lg:pt-[4.5rem]">
			<div class="reveal delay-200 lg:sticky lg:top-28" use:reveal>
				<div class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] overflow-hidden brutalist-shadow">

					<!-- Stack section -->
					<div class="p-6 md:p-7 border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
						<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-faint)] mb-4">
							{$t('about.coreExpertise')}
						</p>
						<div class="flex flex-wrap gap-1.5">
							{#each $t('about.highlights') as highlight}
								<span class="px-2.5 py-1.5 rounded-md bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.05)] border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] font-mono text-[11px] text-[var(--color-ink-strong)] uppercase tracking-[0.1em]">
									{highlight}
								</span>
							{/each}
						</div>
					</div>

					<!-- CTA section -->
					<div class="p-6 md:p-7 flex flex-col gap-3">
						<!-- Availability signal -->
						<div class="flex items-center gap-2 mb-1">
							<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] availability-pulse shrink-0"></span>
							<p class="font-body text-xs text-[var(--color-ink-muted)]">
								{$language === 'es' ? 'Disponible para nuevas oportunidades' : 'Open to new opportunities'}
							</p>
						</div>

						<!-- Primary CTA -->
						<a
							href={recruiterHref}
							class="group px-6 py-4 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] font-display font-semibold text-lg tracking-tight text-center border border-transparent dark:border-[rgba(210,217,226,0.12)] hover:bg-[var(--color-ink)] dark:hover:bg-[rgba(210,217,226,0.07)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover"
						>
							{$t('about.ctaEmail')}
						</a>

						<!-- Secondary CTAs -->
						<a
							href="/projects"
							class="group px-6 py-4 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-lg tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200"
						>
							{$t('about.ctaProjects')}
						</a>

						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="group px-6 py-4 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-lg tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 flex items-center justify-center gap-2"
						>
							<svg class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
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
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.availability-pulse {
		animation: availPulse 2.8s ease-in-out infinite;
	}

	@keyframes availPulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-signal) 40%, transparent); }
		50% { opacity: 0.7; box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-signal) 0%, transparent); }
	}
</style>
