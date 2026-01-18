<script lang="ts">
	import { projectsData } from '$lib/data/projects';
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';

	let { params } = $props();

	const project = projectsData.find((item) => item.id === params.id);
	const story = project ? ($language === 'en' ? project.story.en : project.story.es) : null;
</script>

<section class="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
	<div class="max-w-4xl mx-auto px-6 py-20">
		<div class="flex items-center justify-between gap-4">
			<div>
				<p class="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{$t('projects.story.label')}</p>
				<h1 class="text-3xl md:text-5xl font-bold text-neutral-950 dark:text-neutral-50 mt-2">
					{story?.title ?? project?.title ?? $t('projects.story.notFoundTitle')}
				</h1>
			</div>
			<Button href="/" variant="ghost">{$t('projects.story.back')}</Button>
		</div>

		<Separator className="my-8" />
		
		{#if story}
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
				<div class="md:col-span-2">
					<p class="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
						{story.summary}
					</p>
				</div>
				<div class="space-y-4">
					{#if story.role}
						<div>
							<p class="text-xs uppercase tracking-wider text-neutral-500">{$t('projects.story.role')}</p>
							<p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{story.role}</p>
						</div>
					{/if}
					{#if story.timeline}
						<div>
							<p class="text-xs uppercase tracking-wider text-neutral-500">{$t('projects.story.timeline')}</p>
							<p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{story.timeline}</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="grid gap-12">
				<div>
					<h2 class="text-xl font-bold text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
						<span class="h-1 w-6 bg-red-500 rounded-full"></span>
						{$t('projects.story.problem')}
					</h2>
					<ul class="mt-6 space-y-4">
						{#each story.problem as item}
							<li class="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
								{item}
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<h2 class="text-xl font-bold text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
						<span class="h-1 w-6 bg-green-500 rounded-full"></span>
						{$t('projects.story.solution')}
					</h2>
					<ul class="mt-6 space-y-4">
						{#each story.solution as item}
							<li class="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
								{item}
							</li>
						{/each}
					</ul>
				</div>

				{#if story.impact?.length}
					<div>
						<h2 class="text-xl font-bold text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
							<span class="h-1 w-6 bg-blue-500 rounded-full"></span>
							{$t('projects.story.impact')}
						</h2>
						<ul class="mt-6 space-y-4">
							{#each story.impact as item}
								<li class="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<div class="mt-16 pt-10 border-t border-neutral-100 dark:border-neutral-800">
				<h2 class="text-xl font-bold text-neutral-950 dark:text-neutral-50">{$t('projects.story.technologies')}</h2>
				<div class="mt-6 flex flex-wrap gap-3">
					{#each story.technologies as tech}
						<Badge variant="default" className="px-3 py-1 text-sm">{tech}</Badge>
					{/each}
				</div>
			</div>

			{#if story.link?.href}
				<div class="mt-12">
					<Button href={story.link.href} target="_blank" rel="noreferrer" size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
						{story.link.label}
					</Button>
				</div>
			{/if}
		{:else}
			<p class="text-neutral-600 dark:text-neutral-400">{$t('projects.story.notFoundBody')}</p>
		{/if}
	</div>
</section>
