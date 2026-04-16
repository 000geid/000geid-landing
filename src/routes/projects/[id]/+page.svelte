<script lang="ts">
	import { projectsData } from '$lib/data/projects';
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
	import { Badge } from '$lib/components/ui/badge';
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
		document.body.style.overflow = isViewerOpen ? 'hidden' : '';
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

	function handleViewerKeydown(event: KeyboardEvent) {
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

<main id="main-content" class="border-t-2 border-black dark:border-white">
		{#if story}
			<section class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
					<div class="lg:col-span-8">
						<p class="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
							{$t('projects.story.label')}
						</p>
						<h1 class="font-display font-bold text-4xl md:text-6xl tracking-tight text-black dark:text-white leading-[0.92] mb-6">
							{story.title}
						</h1>
						<p class="font-body text-base md:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-4xl">
							{story.summary}
						</p>
					</div>

					<div class="lg:col-span-4 flex lg:justify-end items-start">
						<Button
							href="/projects"
							variant="outline"
							className="group no-rounded border-2 border-black dark:border-white px-5 py-3 uppercase tracking-wider font-body text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
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
					<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-12">
						<div class="lg:col-span-8 border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8">
							<div class="flex items-center justify-between mb-4">
								<p class="font-body text-xs uppercase tracking-[0.24em] text-black/50 dark:text-white/50">
									{$t('projects.story.technologies')}
								</p>
								<div class="w-8 h-[2px] bg-[var(--color-primary)]"></div>
							</div>
							<div class="flex flex-wrap gap-2.5">
								{#each story.technologies as tech}
									<Badge
										variant="outline"
										className="no-rounded border-black/20 dark:border-white/20 bg-[var(--color-surface-alt)] dark:bg-white/5 text-black/70 dark:text-white/70 px-3 py-1 uppercase tracking-wider text-xs"
									>
										{tech}
									</Badge>
								{/each}
							</div>
						</div>

						<div class="lg:col-span-4 border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8">
							{#if story.role}
								<div class="mb-6">
									<p class="font-body text-xs uppercase tracking-[0.22em] text-black/50 dark:text-white/50 mb-2">
										{$t('projects.story.role')}
									</p>
									<p class="font-body text-base text-black dark:text-white leading-relaxed">
										{story.role}
									</p>
								</div>
							{/if}

							{#if story.timeline}
								<div>
									<p class="font-body text-xs uppercase tracking-[0.22em] text-black/50 dark:text-white/50 mb-2">
										{$t('projects.story.timeline')}
									</p>
									<p class="font-body text-base text-black dark:text-white leading-relaxed">
										{story.timeline}
									</p>
								</div>
							{/if}

							{#if story.link?.href}
								<a
									href={story.link.href}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-8 inline-flex items-center gap-2 px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-body text-xs uppercase tracking-[0.22em] hover:bg-[var(--color-primary)] transition-colors duration-200"
								>
									<span>{story.link.label}</span>
									<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10m0-10h10v10" />
									</svg>
								</a>
							{/if}
						</div>
					</div>
				{/if}

				{#if isFreelanceGallery}
					<section class="border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8 mb-10 md:mb-12">
						<div class="flex items-center justify-between mb-5">
							<p class="font-body text-xs uppercase tracking-[0.24em] text-black/50 dark:text-white/50">
								{$t('projects.story.clientGallery')}
							</p>
							<div class="w-8 h-[2px] bg-[var(--color-primary)]"></div>
						</div>

						<div class="flex flex-wrap gap-2.5 mb-6">
							{#each freelanceClients as client}
								<button
									onclick={() => (activeClientId = client.id)}
									class="px-3 py-2 border text-xs uppercase tracking-[0.2em] font-body transition-all duration-200
										{activeClientId === client.id
											? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
											: 'border-black/20 dark:border-white/20 text-black/60 dark:text-white/60 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}"
								>
									{client.name}
								</button>
							{/each}
						</div>

						{#if activeClient}
							<div class="mb-6 border border-black/10 dark:border-white/10 bg-[var(--color-surface-alt)] dark:bg-white/5 p-4 md:p-6">
								<div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
									<img src={activeClient.logo} alt={`${activeClient.name} logo`} class="h-16 md:h-20 w-auto object-contain shrink-0" loading="lazy" />
									<div>
										<p class="font-display text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white leading-none">
											{activeClient.name}
										</p>
										<p class="mt-2 font-body text-base md:text-lg text-black/65 dark:text-white/65">
											{$language === 'es' ? activeClient.summary.es : activeClient.summary.en}
										</p>
									</div>
								</div>
							</div>

							<div class="border border-black/10 dark:border-white/10 bg-[var(--color-surface-alt)] dark:bg-white/5 p-3 md:p-4">
								<div class="relative max-w-[430px] mx-auto">
									<button
										type="button"
										onclick={prevSlide}
										aria-label={$language === 'es' ? 'Imagen anterior' : 'Previous image'}
										class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 border border-black/25 dark:border-white/25 bg-white/90 dark:bg-black/85 text-black dark:text-white hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
										</svg>
									</button>

									<button
										type="button"
										onclick={nextSlide}
										aria-label={$language === 'es' ? 'Siguiente imagen' : 'Next image'}
										class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 border border-black/25 dark:border-white/25 bg-white/90 dark:bg-black/85 text-black dark:text-white hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 flex items-center justify-center"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</button>

									<button
										type="button"
										onclick={() => openViewer(activeSlideIndex)}
										class="block w-full overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-black"
										aria-label={$language === 'es' ? 'Abrir imagen en visor' : 'Open image in viewer'}
									>
										{#if currentShot}
											<div class="w-full aspect-[9/16] bg-black/5 dark:bg-white/5 flex items-center justify-center">
												<img
													src={currentShot.src}
													alt={$language === 'es' ? currentShot.alt.es : currentShot.alt.en}
													class="w-full h-full object-contain"
													loading="eager"
												/>
											</div>
										{/if}
									</button>
								</div>

								{#if hasMultipleShots}
									<div class="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
										{#each currentScreenshots as shot, index}
											<button
												type="button"
												onclick={() => setSlide(index)}
												aria-label={`${$language === 'es' ? 'Ir a imagen' : 'Go to image'} ${index + 1}`}
												class="shrink-0 border transition-all duration-200
													{activeSlideIndex === index
														? 'border-[var(--color-primary)]'
														: 'border-black/10 dark:border-white/10 hover:border-black/40 dark:hover:border-white/40'}"
											>
												<img
													src={shot.src}
													alt={$language === 'es' ? shot.alt.es : shot.alt.en}
													class="w-[68px] h-[122px] object-cover"
													loading="lazy"
												/>
											</button>
										{/each}
									</div>
								{/if}

								<p class="mt-3 font-body text-[11px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
									{$t('projects.story.viewerHint')}
								</p>
							</div>
						{/if}
					</section>
				{/if}

				{#if !isFreelanceGallery}
					<div class="space-y-4 md:space-y-5">
						<section class="border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8 hover:border-[var(--color-primary)] transition-colors duration-300">
							<div class="flex items-center gap-3 mb-5">
								<div class="w-2 h-2 bg-[var(--color-primary)]"></div>
								<h2 class="font-display font-bold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
									{$t('projects.story.problem')}
								</h2>
							</div>
							<ul class="space-y-3.5">
								{#each story.problem as item}
									<li class="flex items-start gap-3 font-body text-base text-black/75 dark:text-white/75">
										<span class="mt-2 w-1.5 h-1.5 bg-black/35 dark:bg-white/40 shrink-0"></span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</section>

						<section class="border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8 hover:border-[var(--color-primary)] transition-colors duration-300">
							<div class="flex items-center gap-3 mb-5">
								<div class="w-2 h-2 bg-[var(--color-primary)]"></div>
								<h2 class="font-display font-bold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
									{$t('projects.story.solution')}
								</h2>
							</div>
							<ul class="space-y-3.5">
								{#each story.solution as item}
									<li class="flex items-start gap-3 font-body text-base text-black/75 dark:text-white/75">
										<span class="mt-2 w-1.5 h-1.5 bg-black/35 dark:bg-white/40 shrink-0"></span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</section>

						{#if story.impact?.length}
							<section class="border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-8 hover:border-[var(--color-primary)] transition-colors duration-300">
								<div class="flex items-center gap-3 mb-5">
									<div class="w-2 h-2 bg-[var(--color-primary)]"></div>
									<h2 class="font-display font-bold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
										{$t('projects.story.impact')}
									</h2>
								</div>
								<ul class="space-y-3.5">
									{#each story.impact as item}
										<li class="flex items-start gap-3 font-body text-base text-black/75 dark:text-white/75">
											<span class="mt-2 w-1.5 h-1.5 bg-black/35 dark:bg-white/40 shrink-0"></span>
											<span>{item}</span>
										</li>
									{/each}
								</ul>
							</section>
						{/if}
					</div>
				{/if}
			</section>
		{:else}
			<section class="max-w-3xl mx-auto px-4 md:px-6 py-20 md:py-24 text-center">
				<p class="font-body text-base text-black/70 dark:text-white/70 mb-8">
					{$t('projects.story.notFoundBody')}
				</p>
				<Button
					href="/projects"
					variant="outline"
					className="no-rounded border-2 border-black dark:border-white uppercase tracking-wider font-body text-xs px-6 py-3"
				>
					{$t('projects.story.back')}
				</Button>
			</section>
		{/if}
	</main>

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

<svelte:window onkeydown={handleViewerKeydown} />
