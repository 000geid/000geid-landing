<script lang="ts">
	import { projectsData } from "$lib/data/projects";
	import { language } from "$lib/stores/language";
	import { t } from "$lib/stores/i18n";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { fly, fade } from "svelte/transition";
	import { onMount } from "svelte";

	let { params } = $props();

	const project = projectsData.find((item) => item.id === params.id);
	const story = project
		? $language === "en"
			? project.story.en
			: project.story.es
		: null;

	let ready = $state(false);
	onMount(() => {
		ready = true;
	});

	function getIcon(name: string) {
		switch (name) {
			case "problem":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>`;
			case "solution":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 12 2s10 4.477 10 10z" /></svg>`;
			case "impact":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>`;
			case "user":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`;
			case "calendar":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12v-.008zM12 17.25h.008v.008H12v-.008zM8.25 15h.008v.008H8.25v-.008zM8.25 17.25h.008v.008H8.25v-.008zM15.75 15h.008v.008H15.75v-.008zM15.75 17.25h.008v.008H15.75v-.008z" /></svg>`;
			case "arrow-left":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>`;
		}
	}
</script>

<section
	class="min-h-screen bg-white dark:bg-neutral-950 transition-colors pb-24"
>
	<!-- Hero Header -->
	<div
		class="relative bg-neutral-50 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800"
	>
		<div class="max-w-5xl mx-auto px-6 py-16 md:py-24">
			<div class="flex flex-col items-center text-center gap-6">
				{#if ready}
					<div in:fly={{ y: -20, duration: 600 }}>
						<span
							class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800/50"
						>
							{$t("projects.story.label")}
						</span>
					</div>

					<h1
						class="text-4xl md:text-6xl font-black text-neutral-950 dark:text-neutral-50 tracking-tight"
						in:fly={{ y: 20, duration: 600, delay: 100 }}
					>
						{story?.title ??
							project?.title ??
							$t("projects.story.notFoundTitle")}
					</h1>

					<div in:fade={{ duration: 600, delay: 200 }}>
						<Button
							href="/#projects"
							variant="ghost"
							className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 gap-2"
						>
							{@html getIcon("arrow-left")}
							{$t("projects.story.back")}
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if story}
		<div class="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
			<!-- Main Context Card -->
			{#if ready}
				<div
					class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl shadow-neutral-200/50 dark:shadow-none p-8 md:p-10 mb-12"
					in:fly={{ y: 30, duration: 700, delay: 300 }}
				>
					<div
						class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
					>
						<div class="md:col-span-2">
							<p
								class="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium"
							>
								{story.summary}
							</p>

							<!-- Technologies -->
							<div
								class="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800"
							>
								<p
									class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4"
								>
									{$t("projects.story.technologies")}
								</p>
								<div class="flex flex-wrap gap-2">
									{#each story.technologies as tech}
										<Badge
											variant="secondary"
											className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
										>
											{tech}
										</Badge>
									{/each}
								</div>
							</div>
						</div>

						<!-- Metadata Sidebar -->
						<div
							class="space-y-6 md:border-l md:border-neutral-100 md:dark:border-neutral-800 md:pl-12"
						>
							{#if story.role}
								<div class="space-y-2">
									<div
										class="flex items-center gap-2 text-neutral-400"
									>
										<div class="text-blue-500">
											{@html getIcon("user")}
										</div>
										<p
											class="text-xs font-bold uppercase tracking-wider"
										>
											{$t("projects.story.role")}
										</p>
									</div>
									<p
										class="text-base font-medium text-neutral-900 dark:text-neutral-100"
									>
										{story.role}
									</p>
								</div>
							{/if}

							{#if story.timeline}
								<div class="space-y-2">
									<div
										class="flex items-center gap-2 text-neutral-400"
									>
										<div class="text-blue-500">
											{@html getIcon("calendar")}
										</div>
										<p
											class="text-xs font-bold uppercase tracking-wider"
										>
											{$t("projects.story.timeline")}
										</p>
									</div>
									<p
										class="text-base font-medium text-neutral-900 dark:text-neutral-100"
									>
										{story.timeline}
									</p>
								</div>
							{/if}

							{#if story.link?.href}
								<div class="pt-2">
									<Button
										href={story.link.href}
										target="_blank"
										rel="noreferrer"
										className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20"
									>
										{story.link.label}
									</Button>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Deep Dive Grid -->
				<div class="grid gap-8">
					<!-- Problem -->
					<div
						class="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/50 rounded-2xl p-8 hover:border-red-200 dark:hover:border-red-900/30 transition-colors duration-300 group"
						in:fly={{ y: 20, duration: 600, delay: 400 }}
					>
						<div class="flex items-center gap-3 mb-6">
							<div
								class="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300"
							>
								{@html getIcon("problem")}
							</div>
							<h2
								class="text-xl font-bold text-neutral-950 dark:text-neutral-50"
							>
								{$t("projects.story.problem")}
							</h2>
						</div>
						<ul class="space-y-4">
							{#each story.problem as item}
								<li
									class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
								>
									<span
										class="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 opacity-60"
									></span>
									<span class="leading-relaxed">{item}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Solution -->
					<div
						class="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/50 rounded-2xl p-8 hover:border-green-200 dark:hover:border-green-900/30 transition-colors duration-300 group"
						in:fly={{ y: 20, duration: 600, delay: 500 }}
					>
						<div class="flex items-center gap-3 mb-6">
							<div
								class="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300"
							>
								{@html getIcon("solution")}
							</div>
							<h2
								class="text-xl font-bold text-neutral-950 dark:text-neutral-50"
							>
								{$t("projects.story.solution")}
							</h2>
						</div>
						<ul class="space-y-4">
							{#each story.solution as item}
								<li
									class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
								>
									<span
										class="mt-2 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 opacity-60"
									></span>
									<span class="leading-relaxed">{item}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Impact -->
					{#if story.impact?.length}
						<div
							class="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/50 rounded-2xl p-8 hover:border-blue-200 dark:hover:border-blue-900/30 transition-colors duration-300 group"
							in:fly={{ y: 20, duration: 600, delay: 600 }}
						>
							<div class="flex items-center gap-3 mb-6">
								<div
									class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300"
								>
									{@html getIcon("impact")}
								</div>
								<h2
									class="text-xl font-bold text-neutral-950 dark:text-neutral-50"
								>
									{$t("projects.story.impact")}
								</h2>
							</div>
							<ul class="space-y-4">
								{#each story.impact as item}
									<li
										class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
									>
										<span
											class="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 opacity-60"
										></span>
										<span class="leading-relaxed"
											>{item}</span
										>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		<div class="max-w-4xl mx-auto px-6 py-20 text-center">
			<p class="text-neutral-600 dark:text-neutral-400">
				{$t("projects.story.notFoundBody")}
			</p>
			<Button href="/#projects" variant="outline" class="mt-6"
				>{$t("projects.story.back")}</Button
			>
		</div>
	{/if}
</section>
