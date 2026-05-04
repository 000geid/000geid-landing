<script lang="ts">
	import { projectsData } from '$lib/data/projects';
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
	import { Button } from '$lib/components/ui/button';

	let { params } = $props();
	let activeClientId = $state('');
	let activeSlideIndex = $state(0);
	let isViewerOpen = $state(false);
	let viewerIndex = $state(0);
	let zoomLevel = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let isPanning = $state(false);
	let panStartX = $state(0);
	let panStartY = $state(0);
	let panOriginX = $state(0);
	let panOriginY = $state(0);
	let viewerContainer = $state<HTMLElement | null>(null);

	const project = $derived(projectsData.find((item) => item.id === params.id));
	const story = $derived(project ? ($language === 'en' ? project.story.en : project.story.es) : null);
	const isFreelanceGallery = $derived(project?.mode === 'freelance-gallery');
	const freelanceClients = $derived(project?.freelanceClients ?? []);
	const activeClient = $derived(freelanceClients.find((client) => client.id === activeClientId));
	const currentScreenshots = $derived(activeClient?.screenshots ?? []);
	const currentShot = $derived(currentScreenshots[activeSlideIndex] ?? null);
	const viewerShot = $derived(currentScreenshots[viewerIndex] ?? null);
	const hasMultipleShots = $derived(currentScreenshots.length > 1);

	const storyScreenshots = $derived(project?.screenshots ?? []);
	let isStoryGalleryOpen = $state(false);
	let storyImageIndex = $state(0);
	const storyGalleryShot = $derived(storyScreenshots[storyImageIndex] ?? null);

	let storyPointerDownX = 0;
	let storyPointerMoved = false;

	$effect(() => {
		if (typeof document === 'undefined') return;
		const theme = projectsData.find((item) => item.id === params.id)?.detailTheme;
		if (theme) {
			document.documentElement.setAttribute('data-project-detail', theme);
		} else {
			document.documentElement.removeAttribute('data-project-detail');
		}
		return () => {
			document.documentElement.removeAttribute('data-project-detail');
		};
	});

	$effect(() => {
		void params.id;
		storyImageIndex = 0;
	});

	$effect(() => {
		if (freelanceClients.length === 0) {
			activeClientId = '';
			return;
		}

		if (!freelanceClients.some((client) => client.id === activeClientId)) {
			activeClientId = freelanceClients[0].id;
		}
	});

	$effect(() => {
		activeClientId;
		activeSlideIndex = 0;
		viewerIndex = 0;
		isViewerOpen = false;
		resetZoom();
	});

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = isViewerOpen || isStoryGalleryOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function clamp(value: number, min: number, max: number) {
		return Math.min(max, Math.max(min, value));
	}

	function getMaxPan(axis: 'x' | 'y') {
		if (!viewerContainer || zoomLevel <= 1) return 0;
		const size = axis === 'x' ? viewerContainer.clientWidth : viewerContainer.clientHeight;
		return (size * (zoomLevel - 1)) / 2;
	}

	function resetZoom() {
		zoomLevel = 1;
		panX = 0;
		panY = 0;
		isPanning = false;
	}

	function setSlide(index: number) {
		if (!currentScreenshots.length) return;
		activeSlideIndex = (index + currentScreenshots.length) % currentScreenshots.length;
	}

	function prevSlide() {
		setSlide(activeSlideIndex - 1);
	}

	function nextSlide() {
		setSlide(activeSlideIndex + 1);
	}

	function setViewerSlide(index: number) {
		if (!currentScreenshots.length) return;
		viewerIndex = (index + currentScreenshots.length) % currentScreenshots.length;
		resetZoom();
	}

	function prevViewerSlide() {
		setViewerSlide(viewerIndex - 1);
	}

	function nextViewerSlide() {
		setViewerSlide(viewerIndex + 1);
	}

	function openViewer(index: number) {
		setViewerSlide(index);
		isViewerOpen = true;
	}

	function closeViewer() {
		isViewerOpen = false;
		resetZoom();
	}

	function setStoryImageIndex(index: number) {
		if (!storyScreenshots.length) return;
		storyImageIndex = (index + storyScreenshots.length) % storyScreenshots.length;
	}

	function openStoryGallery(index?: number) {
		if (typeof index === 'number') setStoryImageIndex(index);
		isStoryGalleryOpen = true;
	}

	function closeStoryGallery() {
		isStoryGalleryOpen = false;
	}

	function storyGalleryPrev() {
		if (!storyScreenshots.length) return;
		storyImageIndex = (storyImageIndex - 1 + storyScreenshots.length) % storyScreenshots.length;
	}

	function storyGalleryNext() {
		if (!storyScreenshots.length) return;
		storyImageIndex = (storyImageIndex + 1) % storyScreenshots.length;
	}

	function handleStoryPointerDown(event: PointerEvent) {
		storyPointerDownX = event.clientX;
		storyPointerMoved = false;
	}

	function handleStoryPointerMove(event: PointerEvent) {
		if (Math.abs(event.clientX - storyPointerDownX) > 14) storyPointerMoved = true;
	}

	function handleStoryPointerUp(event: PointerEvent) {
		const dx = event.clientX - storyPointerDownX;
		const swipeThreshold = 48;
		if (storyPointerMoved && Math.abs(dx) > swipeThreshold) {
			if (dx > 0) storyGalleryPrev();
			else storyGalleryNext();
			return;
		}
		const target = event.target as HTMLElement | null;
		if (target?.closest('button')) return;
		if (!storyPointerMoved) openStoryGallery();
	}

	function toggleZoom() {
		if (zoomLevel === 1) {
			zoomLevel = 2;
			panX = 0;
			panY = 0;
			return;
		}
		resetZoom();
	}

	function startPan(event: PointerEvent) {
		if (zoomLevel <= 1) return;
		isPanning = true;
		panStartX = event.clientX;
		panStartY = event.clientY;
		panOriginX = panX;
		panOriginY = panY;
	}

	function movePan(event: PointerEvent) {
		if (!isPanning || zoomLevel <= 1) return;
		const maxPanX = getMaxPan('x');
		const maxPanY = getMaxPan('y');
		const nextX = panOriginX + (event.clientX - panStartX);
		const nextY = panOriginY + (event.clientY - panStartY);
		panX = clamp(nextX, -maxPanX, maxPanX);
		panY = clamp(nextY, -maxPanY, maxPanY);
	}

	function endPan() {
		isPanning = false;
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (isStoryGalleryOpen) {
			if (event.key === 'Escape') {
				closeStoryGallery();
				return;
			}
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				storyGalleryPrev();
				return;
			}
			if (event.key === 'ArrowRight') {
				event.preventDefault();
				storyGalleryNext();
				return;
			}
			return;
		}
		if (!isViewerOpen) return;
		if (event.key === 'Escape') {
			closeViewer();
			return;
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prevViewerSlide();
			return;
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			nextViewerSlide();
		}
	}
</script>

<svelte:head>
	<title>{story?.title ?? $t('projects.story.notFoundTitle')} | {$t('hero.name')}</title>
	<meta name="description" content={story?.summary ?? $t('projects.story.notFoundBody')} />
</svelte:head>

<main id="main-content" class="border-t border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)]">
		{#if story}
			<section class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
					<div class="lg:col-span-8">
						<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-signal)] mb-3">
							{$t('projects.story.label')}
						</p>
						<h1 class="font-display font-bold text-4xl md:text-6xl tracking-tight text-[var(--color-ink-strong)] leading-[0.92] mb-6">
							{story.title}
						</h1>
						{#if isFreelanceGallery}
							<p class="font-body text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-4xl">
								{story.summary}
							</p>
						{/if}
					</div>

					<div class="lg:col-span-4 flex lg:justify-end items-start">
						<Button
							href="/projects"
							variant="outline"
							className="group rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_18%,transparent)] px-5 py-3 uppercase tracking-wider font-mono text-xs font-medium hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_45%,transparent)] transition-all duration-200 dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)]"
						>
							<span class="inline-flex items-center gap-2">
								<svg class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								{$t('projects.story.back')}
							</span>
						</Button>
					</div>
				</div>

				{#if !isFreelanceGallery}
					<div class="max-w-4xl pb-12 md:pb-16">
						<p class="font-body text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed">
							{story.summary}
						</p>

						{#if story.technologies?.length}
							<div class="mt-8">
								<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-ink-faint)] mb-3">
									{$t('projects.story.technologies')}
								</p>
								<div class="flex flex-wrap gap-x-2 gap-y-2">
									{#each story.technologies as tech}
										<span
											class="px-2.5 py-1.5 rounded-md font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-muted)] bg-[color-mix(in_srgb,var(--color-ink-strong)_5%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--color-ink-strong)_8%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-ink-strong)_6%,transparent)] dark:ring-[color-mix(in_srgb,var(--color-ink-strong)_10%,transparent)] dark:text-[var(--color-ink-muted)]"
										>
											{tech}
										</span>
									{/each}
								</div>
							</div>
						{/if}

						<div class="mt-10 flex flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:gap-x-14 md:gap-y-8">
							{#if story.role}
								<div class="min-w-0 md:max-w-xs">
									<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-ink-faint)] mb-2">
										{$t('projects.story.role')}
									</p>
									<p class="font-body text-base text-[var(--color-ink-strong)] leading-relaxed">
										{story.role}
									</p>
								</div>
							{/if}

							{#if story.timeline}
								<div class="min-w-0 md:flex-1">
									<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-ink-faint)] mb-2">
										{$t('projects.story.timeline')}
									</p>
									<p class="font-body text-base text-[var(--color-ink-strong)] leading-relaxed tabular-nums">
										{story.timeline}
									</p>
								</div>
							{/if}

							{#if story.link?.href}
								<div class="md:ml-auto md:shrink-0 md:text-right md:pt-1">
									<a
										href={story.link.href}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-signal)] underline decoration-[color-mix(in_srgb,var(--color-signal)_38%,transparent)] underline-offset-4 hover:decoration-[var(--color-signal)] hover:text-[var(--color-ink-strong)] transition-colors duration-200"
									>
										<span>{story.link.label}</span>
										<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10m0-10h10v10" />
										</svg>
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				{#if !isFreelanceGallery && storyScreenshots.length > 0}
					<section class="relative mb-14 md:mb-20 max-w-4xl pt-12 md:pt-16 border-t border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)]">
						<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 mb-8 md:mb-10">
							<div class="max-w-2xl">
								<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-2">
									{$t('projects.story.gallery')}
								</p>
								<p class="font-display text-lg md:text-xl font-bold tracking-tight text-[var(--color-ink-strong)] leading-snug">
									{$t('projects.story.galleryLead')}
								</p>
								<p class="mt-2 font-body text-sm text-[var(--color-ink-muted)]">
									{$t('projects.story.galleryHint')}
								</p>
							</div>
							<div
								class="hidden md:block h-px flex-1 bg-gradient-to-r from-[var(--color-signal)]/50 to-transparent min-w-[3rem] max-w-xs shrink-0"
								aria-hidden="true"
							></div>
						</div>

						<div
							class="relative"
							role="region"
							aria-roledescription="carousel"
							aria-label={$t('projects.story.gallery')}
						>
							<div class="relative">
							{#if storyScreenshots.length > 1}
								<button
									type="button"
									onclick={() => storyGalleryPrev()}
									aria-label={$t('projects.story.carouselPrev')}
									class="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-1 md:-translate-x-2 w-11 h-11 md:w-12 md:h-12 rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] bg-[var(--color-elevated)]/95 backdrop-blur text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_52%,transparent)] transition-all duration-200 flex items-center justify-center shadow-sm dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)] dark:bg-[var(--color-parchment-alt)]"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
									</svg>
								</button>
								<button
									type="button"
									onclick={() => storyGalleryNext()}
									aria-label={$t('projects.story.carouselNext')}
									class="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1 md:translate-x-2 w-11 h-11 md:w-12 md:h-12 rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] bg-[var(--color-elevated)]/95 backdrop-blur text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_52%,transparent)] transition-all duration-200 flex items-center justify-center shadow-sm dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)] dark:bg-[var(--color-parchment-alt)]"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</button>
							{/if}

							<div
								class="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)] bg-[var(--color-elevated)]/80 select-none [touch-action:manipulation] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] dark:bg-[var(--color-parchment-alt)]/60"
								onpointerdown={handleStoryPointerDown}
								onpointermove={handleStoryPointerMove}
								onpointerup={handleStoryPointerUp}
								onpointercancel={handleStoryPointerUp}
							>
								<div
									class="flex motion-reduce:transition-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
									style="transform: translateX(-{storyImageIndex * 100}%);"
								>
									{#each storyScreenshots as shot, i}
										<div class="min-w-full shrink-0 px-1 sm:px-4 md:px-10" aria-hidden={i !== storyImageIndex}>
											<div class="group relative mx-auto max-w-[min(100%,320px)] md:max-w-[360px]">
												<span
													class="pointer-events-none absolute left-2 top-2 z-[1] font-body text-[10px] uppercase tracking-[0.35em] text-black/40 dark:text-white/45 tabular-nums"
													aria-hidden="true"
												>
													{String(i + 1).padStart(2, '0')}
												</span>
												<div
													class="aspect-[9/16] max-h-[min(56vh,560px)] w-full flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.04] p-3 md:p-5"
												>
													<img
														src={shot.src}
														alt={$language === 'es' ? shot.alt.es : shot.alt.en}
														class="h-full w-full object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
														loading={i === 0 ? 'eager' : 'lazy'}
														draggable="false"
													/>
												</div>
												<div class="border-t border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] px-3 py-2.5 dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)] md:px-4 md:py-3">
													<p
														class="font-body text-[11px] leading-snug text-[var(--color-ink-muted)] line-clamp-3 md:text-xs"
													>
														{$language === 'es' ? shot.alt.es : shot.alt.en}
													</p>
													<button
														type="button"
														onclick={() => openStoryGallery(i)}
														class="mt-3 w-full rounded-md border border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-strong)] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-signal)_45%,transparent)] hover:bg-[var(--color-signal-soft)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_18%,transparent)] dark:hover:bg-[color-mix(in_srgb,var(--color-ink-strong)_7%,transparent)]"
													>
														{$t('projects.story.galleryExpand')}
													</button>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
							</div>

							{#if storyScreenshots.length > 1}
								<div class="mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-2.5" aria-label={$t('projects.story.carouselGoTo')}>
									{#each storyScreenshots as _, i}
										<button
											type="button"
											aria-current={storyImageIndex === i ? 'true' : undefined}
											aria-label={`${$t('projects.story.carouselGoTo')} ${i + 1}`}
											onclick={() => setStoryImageIndex(i)}
											class={`h-2.5 w-2.5 md:h-2 md:w-8 rounded-full md:rounded-md border transition-all duration-200 motion-reduce:transition-none
												${
													storyImageIndex === i
														? 'border-[var(--color-signal)] bg-[var(--color-signal)] md:w-10'
														: 'border-[color-mix(in_srgb,var(--color-ink-strong)_20%,transparent)] bg-transparent hover:border-[var(--color-ink-muted)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_22%,transparent)]'
												}`}
										></button>
									{/each}
								</div>

								<div class="mt-5 flex justify-center gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
									{#each storyScreenshots as shot, i}
										<button
											type="button"
											onclick={() => setStoryImageIndex(i)}
											aria-label={`${$t('projects.story.carouselGoTo')} ${i + 1}`}
											class="shrink-0 overflow-hidden border-2 transition-all duration-200
												{storyImageIndex === i
													? 'border-[var(--color-primary)] shadow-[3px_3px_0_0_var(--color-primary)]'
													: 'border-black/15 dark:border-white/15 opacity-70 hover:opacity-100 hover:border-black/40 dark:hover:border-white/40'}"
										>
											<img
												src={shot.src}
												alt=""
												class="h-[88px] w-[50px] object-cover object-top sm:h-[102px] sm:w-[58px]"
												loading="lazy"
												draggable="false"
											/>
										</button>
									{/each}
								</div>
							{/if}
						</div>

					</section>
				{/if}

				{#if isFreelanceGallery}
					<section class="max-w-4xl border-t border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] pt-12 pb-16 dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] md:pt-16 md:pb-20">
						<div class="mb-8 flex flex-col gap-2 border-b border-[color-mix(in_srgb,var(--color-ink-strong)_9%,transparent)] pb-8 md:mb-10 md:flex-row md:items-end md:justify-between dark:border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)]">
							<p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-signal)]">
								{$t('projects.story.clientGallery')}
							</p>
							<div class="hidden h-px w-24 bg-gradient-to-r from-[var(--color-signal)]/50 to-transparent md:block md:translate-y-[-2px]" aria-hidden="true"></div>
						</div>

						<div class="mb-8 flex flex-wrap gap-2.5 md:mb-10">
							{#each freelanceClients as client}
								<button
									onclick={() => (activeClientId = client.id)}
									class="rounded-lg px-3 py-2 font-body text-[11px] uppercase tracking-[0.18em] transition-all duration-200
										{activeClientId === client.id
											? 'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-parchment)] dark:text-[var(--color-ink-strong)]'
											: 'text-[var(--color-ink-muted)] ring-1 ring-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)] hover:text-[var(--color-ink-strong)] hover:ring-[color-mix(in_srgb,var(--color-ink-strong)_22%,transparent)] dark:ring-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] dark:hover:ring-[color-mix(in_srgb,var(--color-ink-strong)_28%,transparent)]'}"
								>
									{client.name}
								</button>
							{/each}
						</div>

						{#if activeClient}
							<div class="mb-10 flex flex-col gap-6 border-b border-[color-mix(in_srgb,var(--color-ink-strong)_9%,transparent)] pb-10 md:mb-12 md:flex-row md:items-center md:gap-8 dark:border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)]">
								<img src={activeClient.logo} alt={`${activeClient.name} logo`} class="h-14 w-auto shrink-0 object-contain md:h-20" loading="lazy" />
								<div class="min-w-0">
									<p class="font-display text-3xl font-bold leading-none tracking-tight text-[var(--color-ink-strong)] md:text-4xl">
										{activeClient.name}
									</p>
									<p class="font-body mt-3 text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg">
										{$language === 'es' ? activeClient.summary.es : activeClient.summary.en}
									</p>
								</div>
							</div>

							<div>
								<div class="relative mx-auto max-w-[430px]">
									<button
										type="button"
										onclick={prevSlide}
										aria-label={$language === 'es' ? 'Imagen anterior' : 'Previous image'}
										class="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] bg-[var(--color-elevated)]/95 text-[var(--color-ink-strong)] shadow-sm backdrop-blur transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-signal)_45%,transparent)] hover:bg-[var(--color-signal-soft)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_18%,transparent)] dark:bg-[var(--color-parchment-alt)]/95"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
										</svg>
									</button>

									<button
										type="button"
										onclick={nextSlide}
										aria-label={$language === 'es' ? 'Siguiente imagen' : 'Next image'}
										class="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] bg-[var(--color-elevated)]/95 text-[var(--color-ink-strong)] shadow-sm backdrop-blur transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-signal)_45%,transparent)] hover:bg-[var(--color-signal-soft)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_18%,transparent)] dark:bg-[var(--color-parchment-alt)]/95"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</button>

									<button
										type="button"
										onclick={() => openViewer(activeSlideIndex)}
										class="block w-full overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)] bg-[var(--color-elevated)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_15%,transparent)] dark:bg-[var(--color-parchment-alt)]"
										aria-label={$language === 'es' ? 'Abrir imagen en visor' : 'Open image in viewer'}
									>
										{#if currentShot}
											<div class="flex aspect-[9/16] w-full items-center justify-center bg-[color-mix(in_srgb,var(--color-ink-strong)_3%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-ink-strong)_5%,transparent)]">
												<img
													src={currentShot.src}
													alt={$language === 'es' ? currentShot.alt.es : currentShot.alt.en}
													class="h-full w-full object-contain"
													loading="eager"
												/>
											</div>
										{/if}
									</button>
								</div>

								{#if hasMultipleShots}
									<div class="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
										{#each currentScreenshots as shot, index}
											<button
												type="button"
												onclick={() => setSlide(index)}
												aria-label={`${$language === 'es' ? 'Ir a imagen' : 'Go to image'} ${index + 1}`}
												class="shrink-0 rounded-md border transition-all duration-200
													{activeSlideIndex === index
														? 'border-[var(--color-signal)] ring-2 ring-[var(--color-signal)]/25'
														: 'border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)] hover:border-[color-mix(in_srgb,var(--color-ink-strong)_28%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--color-ink-strong)_36%,transparent)]'}"
											>
												<img
													src={shot.src}
													alt={$language === 'es' ? shot.alt.es : shot.alt.en}
													class="h-[122px] w-[68px] object-cover"
													loading="lazy"
												/>
											</button>
										{/each}
									</div>
								{/if}

								<p class="font-mono mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
									{$t('projects.story.viewerHint')}
								</p>
							</div>
						{/if}
					</section>
				{/if}

				{#if !isFreelanceGallery}
					<article class="max-w-4xl space-y-14 md:space-y-20 pt-12 md:pt-16 border-t border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_14%,transparent)]">
						<section aria-labelledby="project-problem-heading">
							<div class="flex items-baseline gap-3 mb-6 md:mb-8">
								<span class="h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--color-signal)]" aria-hidden="true"></span>
								<h2
									id="project-problem-heading"
									class="font-display font-bold text-2xl md:text-3xl tracking-tight text-[var(--color-ink-strong)]"
								>
									{$t('projects.story.problem')}
								</h2>
							</div>
							<ul class="space-y-4 md:space-y-[1.125rem] pl-6 md:pl-7 border-l border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)]">
								{#each story.problem as item}
									<li class="font-body text-base leading-relaxed text-[var(--color-ink-muted)] pl-3 md:pl-4">
										{item}
									</li>
								{/each}
							</ul>
						</section>

						<section aria-labelledby="project-solution-heading">
							<div class="flex items-baseline gap-3 mb-6 md:mb-8 pt-10 md:pt-12 border-t border-[color-mix(in_srgb,var(--color-ink-strong)_9%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)]">
								<span class="h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--color-signal)]" aria-hidden="true"></span>
								<h2
									id="project-solution-heading"
									class="font-display font-bold text-2xl md:text-3xl tracking-tight text-[var(--color-ink-strong)]"
								>
									{$t('projects.story.solution')}
								</h2>
							</div>
							<ul class="space-y-4 md:space-y-[1.125rem] pl-6 md:pl-7 border-l border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)]">
								{#each story.solution as item}
									<li class="font-body text-base leading-relaxed text-[var(--color-ink-muted)] pl-3 md:pl-4">
										{item}
									</li>
								{/each}
							</ul>
						</section>

						{#if story.impact?.length}
							<section aria-labelledby="project-impact-heading">
								<div class="flex items-baseline gap-3 mb-6 md:mb-8 pt-10 md:pt-12 border-t border-[color-mix(in_srgb,var(--color-ink-strong)_9%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_12%,transparent)]">
									<span class="h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--color-signal)]" aria-hidden="true"></span>
									<h2
										id="project-impact-heading"
										class="font-display font-bold text-2xl md:text-3xl tracking-tight text-[var(--color-ink-strong)]"
									>
										{$t('projects.story.impact')}
									</h2>
								</div>
								<ul class="space-y-4 md:space-y-[1.125rem] pl-6 md:pl-7 border-l border-[color-mix(in_srgb,var(--color-ink-strong)_11%,transparent)] dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)]">
									{#each story.impact as item}
										<li class="font-body text-base leading-relaxed text-[var(--color-ink-muted)] pl-3 md:pl-4">
											{item}
										</li>
									{/each}
								</ul>
							</section>
						{/if}
					</article>
				{/if}
			</section>
		{:else}
			<section class="max-w-3xl mx-auto px-4 md:px-6 py-20 md:py-24 text-center">
				<p class="font-body text-base text-[var(--color-ink-muted)] mb-8">
					{$t('projects.story.notFoundBody')}
				</p>
				<Button
					href="/projects"
					variant="outline"
					className="rounded-xl border border-[color-mix(in_srgb,var(--color-ink-strong)_18%,transparent)] uppercase tracking-wider font-mono text-xs font-semibold px-6 py-3 dark:border-[color-mix(in_srgb,var(--color-ink-strong)_16%,transparent)]"
				>
					{$t('projects.story.back')}
				</Button>
			</section>
		{/if}
	</main>

	{#if isStoryGalleryOpen && storyGalleryShot}
		<div class="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true">
			<button
				type="button"
				onclick={closeStoryGallery}
				class="absolute inset-0 bg-black/90"
				aria-label={$language === 'es' ? 'Cerrar galería' : 'Close gallery'}
			></button>

			<div
				class="relative z-10 w-full max-w-lg border-2 border-white/25 bg-black text-white no-rounded shadow-[8px_8px_0_0_var(--color-primary)]"
			>
				<div class="flex items-center justify-between px-4 py-3 border-b border-white/20">
					<p class="font-body text-xs uppercase tracking-[0.22em] text-white/70">
						{$t('projects.story.gallery')}
					</p>
					<div class="flex items-center gap-3">
						<span class="font-body text-xs text-white/70 tabular-nums">
							{storyImageIndex + 1} / {storyScreenshots.length}
						</span>
						<button
							type="button"
							onclick={closeStoryGallery}
							aria-label={$language === 'es' ? 'Cerrar' : 'Close'}
							class="w-8 h-8 border border-white/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div class="relative p-3 md:p-5">
					{#if storyScreenshots.length > 1}
						<button
							type="button"
							onclick={storyGalleryPrev}
							aria-label={$language === 'es' ? 'Imagen anterior' : 'Previous image'}
							class="absolute left-2 top-1/2 z-10 w-10 h-10 -translate-y-1/2 border border-white/35 bg-black/70 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							type="button"
							onclick={storyGalleryNext}
							aria-label={$language === 'es' ? 'Siguiente imagen' : 'Next image'}
							class="absolute right-2 top-1/2 z-10 w-10 h-10 -translate-y-1/2 border border-white/35 bg-black/70 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					{/if}

					<div class="flex max-h-[min(78vh,720px)] items-center justify-center bg-black px-2">
						<img
							src={storyGalleryShot.src}
							alt={$language === 'es' ? storyGalleryShot.alt.es : storyGalleryShot.alt.en}
							class="max-h-[min(78vh,720px)] max-w-full object-contain"
							draggable="false"
						/>
					</div>
				</div>

				<div class="border-t border-white/15 px-4 pb-4">
					<p class="pt-3 font-body text-sm text-white/85 leading-relaxed">
						{$language === 'es' ? storyGalleryShot.alt.es : storyGalleryShot.alt.en}
					</p>
				</div>
			</div>
		</div>
	{/if}

	{#if isViewerOpen && viewerShot}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true">
			<button
				type="button"
				onclick={closeViewer}
				class="absolute inset-0 bg-black/85"
				aria-label={$language === 'es' ? 'Cerrar visor' : 'Close viewer'}
			></button>

			<div class="relative z-10 w-full max-w-3xl border border-white/20 bg-black text-white">
				<div class="flex items-center justify-between px-4 py-3 border-b border-white/20">
					<p class="font-body text-xs uppercase tracking-[0.22em] text-white/70">
						{$t('projects.story.imageViewer')}
					</p>
					<div class="flex items-center gap-3">
						<span class="font-body text-xs text-white/70">
							{viewerIndex + 1} / {currentScreenshots.length}
						</span>
						<button
							type="button"
							onclick={closeViewer}
							aria-label={$language === 'es' ? 'Cerrar' : 'Close'}
							class="w-8 h-8 border border-white/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div class="relative p-3 md:p-4">
					<button
						type="button"
						onclick={prevViewerSlide}
						aria-label={$language === 'es' ? 'Imagen anterior' : 'Previous image'}
						class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/35 bg-black/70 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<button
						type="button"
						bind:this={viewerContainer}
						aria-label={$language === 'es' ? 'Imagen con zoom' : 'Zoomable image'}
						class="h-[78vh] max-w-[460px] mx-auto overflow-hidden bg-black touch-none flex items-center justify-center {zoomLevel > 1
							? isPanning
								? 'cursor-grabbing'
								: 'cursor-grab'
							: 'cursor-zoom-in'} w-full"
						onclick={toggleZoom}
						onpointerdown={startPan}
						onpointermove={movePan}
						onpointerup={endPan}
						onpointerleave={endPan}
						onpointercancel={endPan}
					>
						<img
							src={viewerShot.src}
							alt={$language === 'es' ? viewerShot.alt.es : viewerShot.alt.en}
							class="max-h-full max-w-full object-contain select-none"
							style="transform: translate3d({panX}px, {panY}px, 0) scale({zoomLevel}); transform-origin: center center; transition: {isPanning ? 'none' : 'transform 180ms ease'};"
							draggable="false"
						/>
					</button>

					<button
						type="button"
						onclick={nextViewerSlide}
						aria-label={$language === 'es' ? 'Siguiente imagen' : 'Next image'}
						class="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/35 bg-black/70 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				<div class="px-4 pb-4 pt-1 flex items-center justify-between gap-3">
					<p class="font-body text-[11px] uppercase tracking-[0.2em] text-white/55">
						{$language === 'es' ? 'Click para zoom • Arrastra para mover' : 'Click to zoom • Drag to pan'}
					</p>
					<button
						type="button"
						onclick={resetZoom}
						class="px-3 py-2 border border-white/30 text-xs uppercase tracking-[0.2em] font-body text-white/80 hover:bg-white hover:text-black transition-all duration-200"
					>
						{$t('projects.story.resetZoom')}
					</button>
				</div>
			</div>
		</div>
	{/if}

<svelte:window onkeydown={handleGlobalKeydown} />
