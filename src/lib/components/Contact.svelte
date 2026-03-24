<script lang="ts">
	import { t } from '$lib/stores/i18n';

	const links = [
		{
			icon: 'github',
			url: 'https://github.com/000geid',
			label: $t('contact.github')
		},
		{
			icon: 'linkedin',
			url: 'https://www.linkedin.com/in/ogeid/',
			label: $t('contact.linkedin')
		},
		{
			icon: 'email',
			url: 'mailto:dmalvaradog26@gmail.com',
			label: $t('contact.email')
		}
	];

	const email = 'dmalvaradog26@gmail.com';
</script>

<footer id="contact" class="scroll-mt-32 border-t-2 border-black dark:border-white">
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
			<div class="lg:col-span-5">
				<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
					{$t('contact.kicker')}
				</p>
				<h2 class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black dark:text-white leading-none">
					{$t('contact.title')}
				</h2>
			</div>
			<div class="lg:col-span-7 flex items-end">
				<div class="w-full h-px bg-black/20 dark:bg-white/20"></div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
			<div class="lg:col-span-5">
				<p class="font-body text-base text-black/70 dark:text-white/70 leading-relaxed">
					{$t('contact.description')}
				</p>
			</div>

			<div class="lg:col-span-7">
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{#each links as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group relative px-4 py-4 border-2 border-black dark:border-white bg-white dark:bg-black
								hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white
								transition-all duration-200 flex items-center justify-between"
						>
							<span class="font-body text-xs uppercase tracking-wider text-black dark:text-white group-hover:text-white transition-colors">
								{link.label}
							</span>
							<svg class="w-4 h-4 text-black dark:text-white group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					{/each}
				</div>

				<a
					href={`mailto:${email}`}
					class="mt-6 inline-flex items-center gap-3 font-body text-sm text-black/60 dark:text-white/60 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] transition-colors"
				>
					<span>{email}</span>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</a>
			</div>
		</div>

		<div class="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
				© {new Date().getFullYear()} Diego Alvarado
			</p>
			<p class="font-body text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
				Buenos Aires, Argentina
			</p>
		</div>
	</div>
</footer>
