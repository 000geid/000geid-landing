<script lang="ts">
	import { t } from "$lib/stores/i18n";
	import { language } from "$lib/stores/language";
	import { timelineData } from "$lib/data/timeline";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	let expandedId = $state<string | null>(null);
	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function formatDate(dateString: string | null) {
		if (!dateString) return $t("careerPath.present");

		const date = new Date(dateString);
		return new Intl.DateTimeFormat($language === "es" ? "es-ES" : "en-US", {
			month: "short",
			year: "numeric",
		}).format(date);
	}

	function getDuration(startDate: string, endDate: string | null) {
		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

		const years = Math.floor(diffMonths / 12);
		const months = diffMonths % 12;

		const parts = [];
		if (years > 0)
			parts.push(
				`${years} ${$language === "es" ? (years === 1 ? "año" : "años") : years === 1 ? "year" : "years"}`,
			);
		if (months > 0)
			parts.push(
				`${months} ${$language === "es" ? (months === 1 ? "mes" : "meses") : months === 1 ? "month" : "months"}`,
			);

		return parts.join(" ");
	}

	function getIcon(iconName: string) {
		switch (iconName) {
			case "lead-dev":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`;
			case "freelance":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>`;
			case "ai-health":
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>`;
			default:
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>`;
		}
	}
</script>

<section id="career" class="scroll-mt-24 py-24 px-6 max-w-4xl mx-auto">
	<div class="mb-16 text-center">
		<h2
			class="text-3xl md:text-5xl font-bold text-neutral-950 dark:text-neutral-50 mb-4 tracking-tight"
		>
			{$t("careerPath.title")}
		</h2>
		<div
			class="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"
		></div>
	</div>

	<div class="relative">
		<!-- Vertical Line -->
		<div
			class="absolute left-4 md:left-[28px] top-4 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800"
		></div>

		<div class="space-y-12">
			{#each timelineData as item, index}
				{#if isVisible}
					<div
						class="relative pl-16 md:pl-24"
						in:fly={{ y: 20, duration: 600, delay: index * 100 }}
					>
						<!-- Timeline Dot with Icon -->
						<div
							class="absolute left-0 md:left-[4px] top-0 w-10 md:w-12 h-10 md:h-12 rounded-full border-4 border-white dark:border-neutral-950 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center z-10 shadow-sm"
						>
							<div class="text-blue-600 dark:text-blue-400">
								{@html getIcon(item.icon)}
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="group relative bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors duration-300"
						>
							<!-- Header -->
							<div
								class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4"
							>
								<div>
									<h3
										class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white"
									>
										{$language === "es"
											? item.title_es
											: item.title_en}
									</h3>
									<div
										class="text-lg font-medium text-neutral-600 dark:text-neutral-400 mt-1"
									>
										{item.company}
									</div>
								</div>
								<div
									class="flex flex-col md:items-end shrink-0"
								>
									<div
										class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
									>
										<span
											>{formatDate(item.startDate)} - {formatDate(
												item.endDate,
											)}</span
										>
									</div>
									<div
										class="text-xs text-neutral-500 dark:text-neutral-500 mt-1.5 hidden md:block"
									>
										{getDuration(
											item.startDate,
											item.endDate,
										)}
									</div>
								</div>
							</div>

							<!-- Description -->
							<p
								class="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6"
							>
								{$language === "es"
									? item.description_es
									: item.description_en}
							</p>

							<!-- Expand/Collapse Button -->
							<button
								onclick={() => toggleExpand(item.id)}
								class="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none"
								aria-expanded={expandedId === item.id}
							>
								<span
									>{expandedId === item.id
										? $t("careerPath.collapseButton")
										: $t("careerPath.expandButton")}</span
								>
								<svg
									class="w-4 h-4 transition-transform duration-200 {expandedId ===
									item.id
										? 'rotate-180'
										: ''}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>

							<!-- Expanded Content -->
							{#if expandedId === item.id}
								<div
									class="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800"
									in:fade={{ duration: 200 }}
								>
									<h4
										class="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4"
									>
										{$language === "es"
											? "Responsabilidades Clave"
											: "Key Responsibilities"}
									</h4>
									<ul class="space-y-3">
										{#each $language === "es" ? item.responsibilities_es : item.responsibilities_en as resp}
											<li
												class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
											>
												<span
													class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"
												></span>
												<span class="leading-relaxed"
													>{resp}</span
												>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
