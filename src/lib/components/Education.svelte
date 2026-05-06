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

	const diplomasSorted = [...diplomasData].sort((a, b) => {
		const ya = a.year ? parseInt(a.year, 10) : 0;
		const yb = b.year ? parseInt(b.year, 10) : 0;
		return yb - ya;
	});

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
		return $language === 'es' ? d.title_es : d.title_en;
	}

	function isAnthropicIssuer(d: DiplomaEntry): boolean {
		return d.issuer_en === 'Anthropic';
	}
</script>

<section id="education" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader layout="split" kicker={$t('education.kicker')} title={$t('education.title')}>
		<svelte:fragment slot="aside">
			<p
				class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed pl-4 border-l-2 border-[var(--color-signal)] rounded-sm"
			>
				{$t('meta.education')}
			</p>
		</svelte:fragment>
	</SectionPageHeader>

	<!-- Segmented control -->
	<div
		class="mb-10 md:mb-12 inline-flex p-1 rounded-xl bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)] border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]"
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

	{#if panel === 'degrees'}
		<div
			id="education-panel-degrees"
			role="tabpanel"
			tabindex="-1"
			class="outline-none panel-enter max-w-3xl"
			aria-labelledby="education-tab-degrees"
		>
			<div class="space-y-0 mt-1 md:mt-2">
				{#each educationData as item, index}
					<div
						class="reveal group relative border-l-2 border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.11)] pl-6 md:pl-8
							{index === educationData.length - 1 ? '' : 'pb-10 md:pb-12'}"
						style="animation-delay: {index * 90}ms"
						use:reveal
					>
						<div
							class="absolute left-0 top-1.5 w-3.5 h-3.5 -translate-x-1/2 rounded-sm border border-[var(--color-signal)] bg-[var(--color-parchment)] dark:bg-[var(--color-parchment-alt)] shadow-[0_0_0_3px_var(--color-parchment)] dark:shadow-[0_0_0_3px_var(--color-parchment-alt)] transition-colors duration-300 group-hover:bg-[var(--color-signal-soft)]"
							aria-hidden="true"
						></div>

						<div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
							{#if item.dates === 'Current'}
								<span class="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-signal)]">
									<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] status-pulse" aria-hidden="true"></span>
									{$t('education.current')}
								</span>
							{:else}
								<span class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
									{$t('education.completed')}
								</span>
							{/if}
						</div>

						<h3 class="font-display font-semibold text-xl md:text-2xl text-[var(--color-ink-strong)] leading-snug tracking-tight mb-2">
							{$language === 'es' ? item.degree_es : item.degree_en}
						</h3>
						<p class="font-body text-[15px] md:text-base text-[var(--color-ink-muted)] leading-relaxed mb-3">
							{item.institution}
						</p>

						{#if item.location}
							<p class="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-faint)] flex items-center gap-2">
								<svg class="w-3.5 h-3.5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								{item.location}
							</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div
			id="education-panel-diplomas"
			role="tabpanel"
			tabindex="-1"
			class="outline-none panel-enter max-w-3xl"
			aria-labelledby="education-tab-diplomas"
		>
			{#if diplomasData.length === 0}
				<p class="font-mono text-[12px] leading-relaxed text-[var(--color-ink-faint)] max-w-2xl">
					{$t('education.diplomasEmpty')}
				</p>
			{:else}
				<ul class="rounded-xl border border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)] bg-[var(--color-elevated)]/80 dark:bg-[var(--color-parchment-alt)]/80 divide-y divide-[rgba(31,35,42,0.08)] dark:divide-[rgba(210,217,226,0.08)] overflow-hidden" role="list">
					{#each diplomasSorted as d, index (d.id)}
						<li class="reveal" style="animation-delay: {index * 70}ms" use:reveal>
							<div
								class="relative px-5 py-5 md:px-7 md:py-6 pl-5 md:pl-7 border-l-[3px] transition-colors duration-200
									{isAnthropicIssuer(d)
										? 'border-l-[var(--color-signal)]'
										: 'border-l-transparent md:hover:border-l-[color-mix(in_srgb,var(--color-signal)_55%,transparent)]'}"
							>
								<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-10">
									<div class="min-w-0 flex-1 space-y-2">
										<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
											{issuer(d)}
										</p>
										<h3 class="font-display font-semibold text-lg md:text-xl text-[var(--color-ink-strong)] leading-snug tracking-tight">
											{diplomaTitle(d)}
										</h3>
									</div>

									<div class="shrink-0 flex flex-col md:items-end gap-3 md:min-w-[8.5rem]">
										{#if d.year}
											<span class="font-mono text-xs tabular-nums tracking-wide text-[var(--color-ink-muted)] md:text-right">
												{d.year}
											</span>
										{/if}
										{#if d.credentialUrl}
											<a
												href={d.credentialUrl}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="{$t('education.verifyCredential')} — {$t('education.credentialExternalHint')}"
												class="group/link inline-flex items-center gap-1.5 font-body text-sm font-medium text-[var(--color-signal)] hover:text-[var(--color-ink-strong)] md:justify-end transition-colors duration-200"
											>
												<span class="border-b border-[color-mix(in_srgb,var(--color-signal)_55%,transparent)] group-hover/link:border-[var(--color-ink-strong)] pb-px transition-colors">
													{$t('education.verifyCredential')}
												</span>
												<svg class="w-3.5 h-3.5 shrink-0 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10m0-10h10v10" />
												</svg>
											</a>
										{/if}
									</div>
								</div>

								{#if d.imageSrc}
									<div class="mt-5 overflow-hidden rounded-lg border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
										<img
											src={d.imageSrc}
											alt={diplomaTitle(d)}
											class="w-full max-h-48 object-cover object-top"
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
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}
</style>
