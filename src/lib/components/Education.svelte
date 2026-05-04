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
</script>

<section id="education" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader layout="banner" kicker={$t('education.kicker')} title={$t('education.title')} />

	<div
		class="mb-10 flex flex-wrap gap-2 md:mb-12"
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
			class="rounded-lg px-4 py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200
				{panel === 'degrees'
				? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] ring-2 ring-[var(--color-signal)]/35'
				: 'text-[var(--color-ink-muted)] ring-1 ring-[rgba(31,35,42,0.12)] hover:text-[var(--color-ink-strong)] hover:ring-[rgba(31,35,42,0.22)] dark:ring-[rgba(210,217,226,0.14)] dark:hover:text-[var(--color-ink-strong)]'}"
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
			class="rounded-lg px-4 py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200
				{panel === 'diplomas'
				? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] ring-2 ring-[var(--color-signal)]/35'
				: 'text-[var(--color-ink-muted)] ring-1 ring-[rgba(31,35,42,0.12)] hover:text-[var(--color-ink-strong)] hover:ring-[rgba(31,35,42,0.22)] dark:ring-[rgba(210,217,226,0.14)] dark:hover:text-[var(--color-ink-strong)]'}"
		>
			{$t('education.tabDiplomas')}
		</button>
	</div>

	{#if panel === 'degrees'}
		<div
			id="education-panel-degrees"
			role="tabpanel"
			tabindex="-1"
			class="outline-none border-t border-[rgba(31,35,42,0.08)] pt-10 dark:border-[rgba(210,217,226,0.08)]"
			aria-labelledby="education-tab-degrees"
		>
			<div class="relative pl-4 sm:pl-6">
				<div
					class="absolute left-5 top-2 bottom-0 w-px bg-[rgba(31,35,42,0.12)] dark:bg-[rgba(210,217,226,0.1)]"
					aria-hidden="true"
				></div>

				{#each educationData as item, index}
					<div class="reveal relative pb-12 last:pb-0 pl-10 sm:pl-12" use:reveal>
						<div
							class="absolute left-5 top-2 w-7 h-7 -translate-x-1/2 rounded-full border border-[rgba(31,35,42,0.14)] bg-[var(--color-elevated)] flex items-center justify-center font-mono text-[10px] tabular-nums font-semibold text-[var(--color-signal)] dark:border-[rgba(210,217,226,0.14)] shadow-sm"
						>
							{String(index + 1).padStart(2, '0')}
						</div>

						<div
							class="rounded-2xl border border-[rgba(31,35,42,0.12)] bg-[var(--color-elevated)] p-6 md:p-7 hover:border-[rgba(53,90,76,0.35)] transition-colors duration-300 dark:border-[rgba(210,217,226,0.11)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow"
						>
							<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
								<div>
									<h3 class="font-display font-semibold text-xl md:text-2xl text-[var(--color-ink-strong)] mb-1">
										{$language === 'es' ? item.degree_es : item.degree_en}
									</h3>
									<p class="font-body text-sm md:text-base text-[var(--color-ink-muted)]">
										{item.institution}
									</p>
								</div>
								<span
									class="self-start px-3 py-1 rounded-md bg-[rgba(31,35,42,0.05)] font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-muted)] border border-[rgba(31,35,42,0.08)] dark:bg-[rgba(210,217,226,0.06)] dark:border-[rgba(210,217,226,0.08)]"
								>
									{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
								</span>
							</div>

							{#if item.location}
								<p class="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
									{item.location}
								</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div
			id="education-panel-diplomas"
			role="tabpanel"
			tabindex="-1"
			class="outline-none border-t border-[rgba(31,35,42,0.08)] pt-10 md:pt-12 dark:border-[rgba(210,217,226,0.08)]"
			aria-labelledby="education-tab-diplomas"
		>
			{#if diplomasData.length === 0}
				<p class="font-mono text-[12px] leading-relaxed text-[var(--color-ink-faint)] max-w-2xl">
					{$t('education.diplomasEmpty')}
				</p>
			{:else}
				<ul class="flex flex-col gap-10 sm:gap-12" role="list">
					{#each diplomasData as d (d.id)}
						<li
							class="border-b border-[rgba(31,35,42,0.08)] pb-10 last:border-b-0 last:pb-0 dark:border-[rgba(210,217,226,0.08)]"
						>
							<div class="border-l-[3px] border-l-[var(--color-primary)] pl-5 md:pl-6 space-y-3">
								<h3 class="font-display font-semibold text-xl md:text-2xl text-[var(--color-ink-strong)] leading-snug">
									{diplomaTitle(d)}
								</h3>
								<p class="font-body text-sm md:text-[0.9375rem] text-[var(--color-ink-muted)]">{issuer(d)}</p>
								{#if d.year}
									<p class="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
										{d.year}
									</p>
								{/if}
								{#if d.credentialUrl}
									<p class="pt-1">
										<a
											href={d.credentialUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-signal)] underline decoration-[rgba(53,90,76,0.35)] underline-offset-4 hover:decoration-[var(--color-signal)] transition-colors duration-200"
										>
											{$t('education.verifyCredential')}
											<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10m0-10h10v10" />
											</svg>
										</a>
									</p>
								{/if}

								{#if d.imageSrc}
									<div
										class="mt-6 overflow-hidden rounded-xl border border-[rgba(31,35,42,0.12)] bg-[var(--color-elevated)] max-w-md dark:border-[rgba(210,217,226,0.11)] dark:bg-[var(--color-parchment-alt)]"
									>
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
	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
