<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';
	import MapPin from 'lucide-svelte/icons/map-pin';

	const email = 'dmalvaradog26@gmail.com';
</script>

<footer id="contact" class="scroll-mt-32 border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)] bg-[rgba(243,244,247,0.5)] dark:bg-[rgba(18,21,25,0.35)]">
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
		<SectionPageHeader kicker={$t('contact.kicker')} title={$t('contact.title')}>
			<svelte:fragment slot="aside">
				<p class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed max-w-xl">
					{$t('contact.description')}
				</p>
			</svelte:fragment>
		</SectionPageHeader>

		<div
			class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow divide-y divide-[rgba(31,35,42,0.08)] dark:divide-[rgba(210,217,226,0.08)] overflow-hidden"
		>
			<a
				href="https://github.com/000geid"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
			>
				<span class="flex flex-col gap-0.5">
					<span class="font-display font-semibold text-lg md:text-xl tracking-tight text-[var(--color-ink-strong)]">{$t('contact.github')}</span>
					<span class="font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors duration-200">@000geid</span>
				</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
			<a
				href="https://www.linkedin.com/in/ogeid/"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
			>
				<span class="flex flex-col gap-0.5">
					<span class="font-display font-semibold text-lg md:text-xl tracking-tight text-[var(--color-ink-strong)]">{$t('contact.linkedin')}</span>
					<span class="font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors duration-200">linkedin.com/in/ogeid</span>
				</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
			<a
				href={`mailto:${email}`}
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
			>
				<span class="flex flex-col gap-0.5">
					<span class="font-display font-semibold text-lg md:text-xl tracking-tight text-[var(--color-ink-strong)]">{$t('contact.email')}</span>
					<span class="font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors duration-200">{email}</span>
				</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</a>
		</div>

		<div class="pt-10 md:pt-12 mt-10 md:mt-12 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="font-body text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
				© {new Date().getFullYear()} Diego Alvarado
			</p>
			<p class="font-body text-xs uppercase tracking-wider text-[var(--color-ink-muted)] flex items-center gap-1.5 justify-center sm:justify-end">
				<MapPin class="shrink-0 opacity-80" size={14} strokeWidth={2} aria-hidden="true" />
				Buenos Aires, Argentina
			</p>
		</div>
	</div>
</footer>
