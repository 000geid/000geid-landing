<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { skillsData } from '$lib/data/skills';
	import type { SkillCategoryAccent } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	const accentBar: Record<SkillCategoryAccent, string> = {
		primary: 'border-l-[var(--color-primary)]',
		secondary: 'border-l-[var(--color-secondary)]'
	};

	const bulletSquare: Record<SkillCategoryAccent, string> = {
		primary: 'bg-[var(--color-primary)]',
		secondary: 'bg-[var(--color-secondary)]'
	};
</script>

<section id="skills" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
	<SectionPageHeader kicker={$t('skills.kicker')} title={$t('skills.title')}>
		<svelte:fragment slot="aside">
			<p class="font-body text-sm md:text-base text-black/65 dark:text-white/65 max-w-xl leading-relaxed">
				{$t('skills.intro')}
			</p>
		</svelte:fragment>
	</SectionPageHeader>

	<div
		class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
		role="list"
		aria-label={$t('skills.title')}
	>
		{#each skillsData as category, index}
			<article
				class="reveal group relative flex flex-col border border-black/10 dark:border-white/10 bg-white dark:bg-black/80
					border-l-[3px] {accentBar[category.accent]}
					p-5 md:p-6
					hover:border-black/25 dark:hover:border-white/25 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.06)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.06)]
					transition-all duration-300"
				use:reveal
				role="listitem"
			>
				<header class="mb-4">
					<p
						class="font-body text-[10px] uppercase tracking-[0.28em] text-black/40 dark:text-white/45 tabular-nums mb-2"
						aria-hidden="true"
					>
						{String(index + 1).padStart(2, '0')}
					</p>
					<h3 class="font-display font-bold text-xl md:text-2xl tracking-tight text-black dark:text-white leading-[1.15]">
						{$t(`skills.${category.name}`)}
					</h3>
					<p class="font-body text-xs md:text-[13px] text-black/55 dark:text-white/55 leading-snug mt-2.5">
						{$t(`skills.blurbs.${category.name}`)}
					</p>
				</header>

				<div class="mb-5">
					<p
						class="font-body text-[10px] uppercase tracking-[0.22em] text-black/40 dark:text-white/45 mb-2.5"
						id="skills-practice-{category.name}"
					>
						{$t('skills.practiceLabel')}
					</p>
					<ul
						class="space-y-2.5"
						aria-labelledby="skills-practice-{category.name}"
					>
						{#each category.bullets[$language] as line}
							<li class="flex gap-2.5 text-left">
								<span
									class="mt-[0.4rem] w-1.5 h-1.5 shrink-0 {bulletSquare[category.accent]}"
									aria-hidden="true"
								></span>
								<span class="font-body text-[12px] md:text-[13px] text-black/70 dark:text-white/70 leading-relaxed">
									{line}
								</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
					<ul class="flex flex-wrap gap-2" aria-label={$t(`skills.${category.name}`)}>
						{#each category.skills as skill}
							<li>
								<span
									class="inline-block px-2.5 py-1 bg-[var(--color-surface-alt)] dark:bg-white/[0.06] font-body text-[11px] md:text-xs uppercase tracking-wider text-black/75 dark:text-white/75 border border-black/10 dark:border-white/10 rounded-none
										group-hover:border-black/18 dark:group-hover:border-white/18 transition-colors duration-200"
								>
									{skill}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
