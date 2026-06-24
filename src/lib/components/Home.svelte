<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { reveal } from '$lib/actions/reveal';
	import { homeFlowGroups } from '$lib/data/homeFlow';
	import { getSectionBySlug, type SectionSlug } from '$lib/data/sections';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	const recruiterEmail = 'dmalvaradog26@gmail.com';

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
	$: recruiterHref = `mailto:${recruiterEmail}`;
	$: freelanceHref = `mailto:${recruiterEmail}?subject=${encodeURIComponent($t('about.freelance.emailSubject'))}`;

	function sectionPath(slug: SectionSlug): string {
		const section = getSectionBySlug(slug);
		return section?.path ?? `/${slug}`;
	}
</script>

<div id="home">
	<!-- Hero fold -->
	<section class="scroll-mt-32 py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
			<div class="lg:col-span-7 reveal" use:reveal>
				<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
					{$t('hero.subtitle')}
				</p>

				<h1 class="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[var(--color-ink-strong)] leading-[0.95] mb-4">
					{$t('hero.name')}
				</h1>

				<div class="flex items-center gap-2.5 mb-5">
					<MapPin class="shrink-0 text-[var(--color-signal)]" size={18} strokeWidth={2} aria-hidden="true" />
					<p class="font-body text-sm text-[var(--color-ink-muted)]">Buenos Aires, Argentina</p>
				</div>

				<p class="font-body text-base md:text-lg text-[var(--color-ink)] leading-relaxed max-w-2xl mb-6">
					{$t('hero.description')}
				</p>

				<div class="flex flex-wrap gap-2 mb-8" aria-label="Availability">
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wide border border-[color-mix(in_srgb,var(--color-signal)_35%,transparent)] text-[var(--color-signal)] bg-[var(--color-signal-soft)]">
						<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] availability-pulse shrink-0" aria-hidden="true"></span>
						{$t('home.availability.openToRoles')}
					</span>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wide border border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] text-[var(--color-ink-muted)] bg-[rgba(31,35,42,0.03)] dark:bg-[rgba(210,217,226,0.03)]">
						{$t('home.availability.takingFreelance')}
					</span>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wide border border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] text-[var(--color-ink-muted)] bg-[rgba(31,35,42,0.03)] dark:bg-[rgba(210,217,226,0.03)]">
						{$t('home.availability.remote')}
					</span>
				</div>

				<div class="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
					<a
						href={recruiterHref}
						class="px-6 py-4 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] font-display font-semibold text-base md:text-lg tracking-tight text-center border border-transparent dark:border-[rgba(210,217,226,0.12)] hover:bg-[var(--color-ink)] dark:hover:bg-[rgba(210,217,226,0.07)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover min-h-[44px]"
					>
						{$t('about.ctaEmail')}
					</a>
					<a
						href="/projects"
						class="px-6 py-4 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-base md:text-lg tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 min-h-[44px]"
					>
						{$t('about.ctaProjects')}
					</a>
					<a
						href={cvHref}
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-4 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-base md:text-lg tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px]"
					>
						<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						{cvLabel}
					</a>
				</div>

				<div>
					<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-3">
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
			</div>

			<!-- Profile card (desktop sidebar) -->
			<div class="lg:col-span-5 hidden lg:block">
				<div class="reveal delay-200 lg:sticky lg:top-28" use:reveal>
					<div class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] overflow-hidden brutalist-shadow">
						<div class="p-6 md:p-7 border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
							<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-faint)] mb-4">
								{$t('about.profileCard.label')}
							</p>
							<ul class="space-y-2">
								{#each $t('about.profileCard.items') as item}
									<li class="flex items-center gap-2.5 font-body text-sm text-[var(--color-ink-muted)]">
										<span class="w-1 h-1 rounded-full bg-[var(--color-signal)] shrink-0" aria-hidden="true"></span>
										{item}
									</li>
								{/each}
							</ul>
						</div>
						<div class="p-6 md:p-7">
							<p class="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed">
								{$t('home.flowHint')}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<FeaturedProjects />

	<!-- Dual-audience cards -->
	<section class="py-14 md:py-20 px-4 md:px-6 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
		<div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
			<div class="reveal rounded-2xl border border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] p-6 md:p-7 flex flex-col" use:reveal>
				<h2 class="font-display font-semibold text-xl tracking-tight text-[var(--color-ink-strong)] mb-3">
					{$t('home.audience.hiring.title')}
				</h2>
				<ul class="space-y-2 mb-4 flex-1">
					{#each $t('about.profileCard.items') as item}
						<li class="flex items-start gap-2 font-body text-sm text-[var(--color-ink-muted)]">
							<span class="mt-[0.4rem] w-1 h-1 rounded-full bg-[var(--color-signal)] shrink-0" aria-hidden="true"></span>
							{item}
						</li>
					{/each}
					<li class="flex items-start gap-2 font-body text-sm text-[var(--color-ink-muted)]">
						<span class="mt-[0.4rem] w-1 h-1 rounded-full bg-[var(--color-signal)] shrink-0" aria-hidden="true"></span>
						{$t('home.audience.hiring.highlight')}
					</li>
				</ul>
				<div class="flex flex-col gap-2 mt-auto">
					<a
						href={cvHref}
						target="_blank"
						rel="noopener noreferrer"
						class="px-5 py-3 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] font-display font-semibold text-sm tracking-tight text-center border border-transparent dark:border-[rgba(210,217,226,0.12)] hover:bg-[var(--color-ink)] transition-all duration-200 min-h-[44px] flex items-center justify-center"
					>
						{$t('home.audience.hiring.ctaCv')}
					</a>
					<a
						href="/career"
						class="px-5 py-3 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] font-display font-semibold text-sm tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] transition-all duration-200 min-h-[44px] flex items-center justify-center"
					>
						{$t('home.audience.hiring.ctaCareer')}
					</a>
				</div>
			</div>

			<div class="reveal delay-100 rounded-2xl border border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] bg-[rgba(31,35,42,0.02)] dark:bg-[rgba(210,217,226,0.02)] p-6 md:p-7 flex flex-col" use:reveal>
				<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-3">
					{$t('about.freelance.label')}
				</p>
				<h2 class="font-display font-semibold text-xl tracking-tight text-[var(--color-ink-strong)] mb-3">
					{$t('home.audience.freelance.title')}
				</h2>
				<p class="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
					{$t('about.freelance.body')}
				</p>
				<ul class="space-y-2 mb-6 flex-1">
					{#each $t('home.audience.freelance.items') as item}
						<li class="flex items-start gap-2 font-body text-sm text-[var(--color-ink-muted)]">
							<span class="mt-[0.4rem] w-1 h-1 rounded-full bg-[var(--color-signal)] shrink-0" aria-hidden="true"></span>
							{item}
						</li>
					{/each}
				</ul>
				<a
					href={freelanceHref}
					class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] font-display font-semibold text-sm tracking-tight text-[var(--color-signal)] hover:bg-[var(--color-signal-soft)] transition-all duration-200 min-h-[44px] mt-auto"
				>
					{$t('about.freelance.cta')}
					<ArrowRight class="w-3.5 h-3.5" strokeWidth={2} aria-hidden={true} />
				</a>
			</div>
		</div>
	</section>

	<!-- Explore-more grid -->
	<section class="py-14 md:py-20 px-4 md:px-6 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] bg-[rgba(243,244,247,0.35)] dark:bg-[rgba(18,21,25,0.25)]">
		<div class="max-w-4xl mx-auto">
			<header class="mb-8 md:mb-10">
				<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
					{$t('home.explore.kicker')}
				</p>
				<h2 class="font-display font-bold text-3xl md:text-4xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]">
					{$t('home.explore.title')}
				</h2>
			</header>

			<div class="space-y-8 md:space-y-10">
				{#each homeFlowGroups as group}
					<div>
						<h3 class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-3">
							{$t(group.groupKey)}
						</h3>
						<div class="space-y-2">
							{#each group.slugs as slug}
								{@const section = getSectionBySlug(slug)}
								<a
									href={sectionPath(slug)}
									class="group flex items-center justify-between gap-4 rounded-xl border border-[rgba(31,35,42,0.09)] dark:border-[rgba(210,217,226,0.09)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] px-5 py-4 hover:border-[rgba(31,35,42,0.16)] dark:hover:border-[rgba(210,217,226,0.16)] hover:bg-[rgba(31,35,42,0.03)] dark:hover:bg-[rgba(210,217,226,0.03)] transition-all duration-200 min-h-[44px]"
								>
									<span class="min-w-0">
										<span class="block font-display font-semibold text-base tracking-tight text-[var(--color-ink-strong)] mb-0.5">
											{section ? $t(section.labelKey) : slug}
										</span>
										<span class="block font-body text-sm text-[var(--color-ink-muted)] truncate">
											{$t(`home.blurbs.${slug}`)}
										</span>
									</span>
									<ArrowRight class="w-4 h-4 shrink-0 text-[var(--color-signal)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" strokeWidth={2} aria-hidden={true} />
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

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
