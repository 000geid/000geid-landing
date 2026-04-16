<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	const email = 'dmalvaradog26@gmail.com';
</script>

<footer id="contact" class="scroll-mt-32 border-t-2 border-black dark:border-white">
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
		<SectionPageHeader kicker={$t('contact.kicker')} title={$t('contact.title')}>
			<svelte:fragment slot="aside">
				<p class="font-body text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed max-w-xl">
					{$t('contact.description')}
				</p>
			</svelte:fragment>
		</SectionPageHeader>

		<div
			class="border-2 border-black dark:border-white bg-[var(--color-surface)] dark:bg-[var(--color-surface)] brutalist-shadow divide-y divide-black/15 dark:divide-white/15"
		>
			<a
				href="https://github.com/000geid"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
			>
				<span class="font-display font-bold text-lg md:text-xl tracking-tight">{$t('contact.github')}</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
			<a
				href="https://www.linkedin.com/in/ogeid/"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
			>
				<span class="font-display font-bold text-lg md:text-xl tracking-tight">{$t('contact.linkedin')}</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
			<a
				href={`mailto:${email}`}
				class="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5
					hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
			>
				<span class="font-display font-bold text-lg md:text-xl tracking-tight">{$t('contact.email')}</span>
				<svg class="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</a>
		</div>

		<p class="font-body text-sm text-black/55 dark:text-white/55 mt-6 md:mt-8 font-mono">
			{email}
		</p>

		<div class="pt-10 md:pt-12 mt-10 md:mt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
				© {new Date().getFullYear()} Diego Alvarado
			</p>
			<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
				Buenos Aires, Argentina
			</p>
		</div>
	</div>
</footer>
