<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { educationData, diplomasData, type DiplomaEntry } from '$lib/data/education';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	type EducationTab = 'degrees' | 'diplomas';

	let panel: EducationTab = 'degrees';
	let degreesTabBtn: HTMLButtonElement | undefined;
	let diplomasTabBtn: HTMLButtonElement | undefined;

	function setPanel(next: EducationTab) {
		panel = next;
	}

	function tabsKeydown(event: KeyboardEvent, from: EducationTab) {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const order: EducationTab[] = ['degrees', 'diplomas'];
		const i = order.indexOf(from);
		const nextIndex = event.key === 'ArrowRight' ? (i + 1) % order.length : (i - 1 + order.length) % order.length;
		const nextTab = order[nextIndex];
		if (!nextTab) return;
		setPanel(nextTab);
		queueMicrotask(() => {
			const el = nextTab === 'degrees' ? degreesTabBtn : diplomasTabBtn;
			el?.focus();
		});
	}

	function issuer(d: DiplomaEntry): string {
		return $language === 'es' ? d.issuer_es : d.issuer_en;
	}

	function diplomaTitle(d: DiplomaEntry): string {
		return d.title_en;
	}

	function isAnthropicIssuer(d: DiplomaEntry): boolean {
		return d.issuer_en === 'Anthropic';
	}
</script>

<section id="education" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader layout="banner" kicker={$t('education.kicker')} title={$t('education.title')} />

	<!-- Segmented control -->
	<div
		class="mb-10 md:mb-14 inline-flex p-1 rounded-xl bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)] border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]"
		role="tablist"
		aria-label={$t('education.tablistLabel')}
	>
		<button
			bind:this={degreesTabBtn}
			type="button"
			id="education-tab-degrees"
			role="tab"
			aria-selected={panel === 'degrees'}
			aria-controls="education-panel-degrees"
			tabindex={panel === 'degrees' ? 0 : -1}
			onkeydown={(e) => tabsKeydown(e, 'degrees')}
			onclick={() => setPanel('degrees')}
			class="relative px-5 py-2.5 rounded-lg font-body text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200
				{panel === 'degrees'
					? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] shadow-sm'
					: 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink-strong)]'}"
		>
			{$t('education.tabDegrees')}
		</button>
		<button
			bind:this={diplomasTabBtn}
			type="button"
			id="education-tab-diplomas"
			role="tab"
			aria-selected={panel === 'diplomas'}
			aria-controls="education-panel-diplomas"
			tabindex={panel === 'diplomas' ? 0 : -1}
			onkeydown={(e) => tabsKeydown(e, 'diplomas')}
			onclick={() => setPanel('diplomas')}
			class="relative px-5 py-2.5 rounded-lg font-body text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200
				{panel === 'diplomas'
					? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] shadow-sm'
					: 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink-strong)]'}"
		>
			{$t('education.tabDiplomas')}
		</button>
	</div>

	<!-- Degrees panel -->
	{#if panel === 'degrees'}
		<div
			id="education-panel-degrees"
			role="tabpanel"
			tabindex="-1"
			class="outline-none panel-enter"
			aria-labelledby="education-tab-degrees"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl">
				{#each educationData as item, index}
					<div
						class="reveal credential-card group relative overflow-hidden rounded-2xl border border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.11)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow"
						style="animation-delay: {index * 100}ms"
						use:reveal
					>
						<!-- Top accent bar -->
						<div class="h-[3px] bg-[var(--color-signal)] w-full"></div>

						<!-- Watermark numeral -->
						<span class="absolute bottom-4 right-5 font-display font-bold text-[5.5rem] leading-none text-[var(--color-ink-strong)] opacity-[0.035] select-none pointer-events-none tabular-nums" aria-hidden="true">
							{String(index + 1).padStart(2, '0')}
						</span>

						<div class="p-6 md:p-8 flex flex-col gap-5">
							<!-- Status -->
							<div class="flex items-center justify-between">
								<span class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-signal)]">
									{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
								</span>
								{#if item.dates === 'Current'}
									<span class="flex items-center gap-1.5">
										<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] status-pulse"></span>
										<span class="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">Active</span>
									</span>
								{/if}
							</div>

							<!-- Degree title -->
							<div>
								<h3 class="font-display font-semibold text-2xl md:text-3xl text-[var(--color-ink-strong)] leading-[1.1] tracking-tight mb-3">
									{$language === 'es' ? item.degree_es : item.degree_en}
								</h3>
								<p class="font-body text-base text-[var(--color-ink-muted)] font-medium">
									{item.institution}
								</p>
							</div>

							<!-- Location -->
							{#if item.location}
								<div class="flex items-center gap-2 pt-1 border-t border-[rgba(31,35,42,0.07)] dark:border-[rgba(210,217,226,0.07)]">
									<svg class="w-3.5 h-3.5 text-[var(--color-ink-faint)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									<p class="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
										{item.location}
									</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

	<!-- Diplomas panel -->
	{:else}
		<div
			id="education-panel-diplomas"
			role="tabpanel"
			tabindex="-1"
			class="outline-none panel-enter"
			aria-labelledby="education-tab-diplomas"
		>
			{#if diplomasData.length === 0}
				<p class="font-mono text-[12px] leading-relaxed text-[var(--color-ink-faint)] max-w-2xl">
					{$t('education.diplomasEmpty')}
				</p>
			{:else}
				<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl" role="list">
					{#each diplomasData as d, index (d.id)}
						<li
							class="reveal"
							style="animation-delay: {index * 80}ms"
							use:reveal
						>
							<div
								class="h-full flex flex-col rounded-2xl border overflow-hidden brutalist-shadow transition-all duration-300
									{isAnthropicIssuer(d)
										? 'border-[color-mix(in_srgb,var(--color-signal)_30%,transparent)] dark:border-[color-mix(in_srgb,var(--color-signal)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-signal)_4%,var(--color-elevated))] dark:bg-[color-mix(in_srgb,var(--color-signal)_6%,var(--color-parchment-alt))]'
										: 'border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.11)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)]'}"
							>
								<!-- Top accent -->
								<div
									class="h-[3px] w-full
										{isAnthropicIssuer(d) ? 'bg-[var(--color-signal)]' : 'bg-[rgba(31,35,42,0.1)] dark:bg-[rgba(210,217,226,0.1)]'}"
								></div>

								<div class="flex flex-col gap-4 p-5 md:p-6 flex-1">
									<!-- Issuer row -->
									<div class="flex items-start justify-between gap-3">
										<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]
											{isAnthropicIssuer(d) ? 'text-[var(--color-signal)]' : 'text-[var(--color-ink-faint)]'}">
											{issuer(d)}
										</p>
										{#if d.year}
											<span class="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)] bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.05)] px-2 py-1 rounded-md">
												{d.year}
											</span>
										{/if}
									</div>

									<!-- Title -->
									<h3 class="font-display font-semibold text-lg md:text-xl text-[var(--color-ink-strong)] leading-snug tracking-tight flex-1">
										{diplomaTitle(d)}
									</h3>

									<!-- CTA -->
									{#if d.credentialUrl}
										<a
											href={d.credentialUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="mt-auto inline-flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl font-body text-sm font-semibold transition-all duration-200
												{isAnthropicIssuer(d)
													? 'bg-[var(--color-signal)] text-[var(--color-parchment)] hover:bg-[var(--color-secondary)]'
													: 'border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)]'}"
										>
											<span>{$t('education.verifyCredential')}</span>
											<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10m0-10h10v10" />
											</svg>
										</a>
									{/if}
								</div>

								{#if d.imageSrc}
									<div class="overflow-hidden border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
										<img
											src={d.imageSrc}
											alt={diplomaTitle(d)}
											class="w-full object-cover object-top"
											loading="lazy"
											decoding="async"
										/>
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</section>

<style>
	.panel-enter {
		animation: panelIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes panelIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.status-pulse {
		animation: pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.35; }
	}

	.credential-card {
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.credential-card:hover {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--color-signal) 40%, transparent);
	}
</style>
