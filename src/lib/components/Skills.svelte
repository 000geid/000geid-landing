<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { skillsData } from '$lib/data/skills';
	import type { SkillCategoryAccent } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';

	function accentBorderClass(accent: SkillCategoryAccent): string {
		return accent === 'primary'
			? 'border-l-[var(--color-primary)]'
			: 'border-l-[var(--color-secondary)]';
	}
</script>

<section id="skills" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6">
	<div class="max-w-4xl mx-auto">
		<header class="mb-12 md:mb-16">
			<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
				{$t('skills.kicker')}
			</p>
			<h2
				class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03] mb-6 md:mb-8"
			>
				{$t('skills.title')}
			</h2>
			<div class="max-w-2xl h-px bg-[rgba(31,35,42,0.12)] dark:bg-[rgba(210,217,226,0.12)]"></div>
			<p
				class="font-body text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-2xl mt-6 md:mt-8"
			>
				{$t('skills.intro')}
			</p>
		</header>

		<div class="flow-root border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
			{#each skillsData as category, index (category.name)}
				<article
					id={`skill-${category.name}`}
					class="reveal border-b border-[rgba(31,35,42,0.08)] py-10 md:py-12 last:border-b-0 dark:border-[rgba(210,217,226,0.08)]
						transition-colors duration-300 hover:bg-[rgba(31,35,42,0.02)] dark:hover:bg-[rgba(210,217,226,0.03)]"
					style="animation-delay: {index * 70}ms"
					use:reveal
					aria-labelledby={`skill-heading-${category.name}`}
				>
					<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
						<div
							class="border-l-[3px] pl-5 md:pl-6 {accentBorderClass(category.accent)} lg:w-[12rem] lg:shrink-0"
						>
							<h3
								id={`skill-heading-${category.name}`}
								class="font-display font-semibold text-2xl md:text-[1.65rem] tracking-tight text-[var(--color-ink-strong)] leading-snug"
							>
								{$t(`skills.${category.name}`)}
							</h3>
							<p class="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed mt-3 lg:max-w-[11rem]">
								{$t(`skills.blurbs.${category.name}`)}
							</p>
						</div>

						<div class="min-w-0 flex-1 space-y-7">
							<div>
								<p
									class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-faint)] mb-4"
									id="skills-practice-{category.name}"
								>
									{$t('skills.practiceLabel')}
								</p>
								<ul
									class="space-y-3.5 pl-5 md:pl-6 border-l border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.12)]"
									aria-labelledby="skills-practice-{category.name}"
								>
									{#each category.bullets[$language] as line}
										<li
											class="font-body text-[0.95rem] md:text-base text-[var(--color-ink-muted)] leading-relaxed pl-1 md:pl-2"
										>
											{line}
										</li>
									{/each}
								</ul>
							</div>

							<div>
								<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-faint)] mb-3">
									{$t('skills.toolsLabel')}
								</p>
								<ul class="flex flex-wrap gap-x-2 gap-y-2" aria-label={$t(`skills.${category.name}`)}>
									{#each category.skills as skill}
										<li>
											<span
												class="inline-block rounded-md px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-muted)] ring-1 ring-[rgba(31,35,42,0.1)] bg-[rgba(31,35,42,0.04)] transition-[ring-color] duration-200 dark:bg-[rgba(210,217,226,0.06)] dark:ring-[rgba(210,217,226,0.12)]"
											>
												{skill}
											</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
