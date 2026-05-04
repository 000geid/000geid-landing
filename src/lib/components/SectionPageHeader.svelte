<script lang="ts">
	/**
	 * Shared section chrome: kicker + title, aligned with the home page flow.
	 * `split`: title left + optional aside (rule + text) right.
	 * `banner`: full-width title block + single rule (e.g. Projects).
	 */
	export let kicker: string;
	export let title: string;
	export let layout: 'split' | 'banner' = 'split';
</script>

{#if layout === 'banner'}
	<header class="mb-8 md:mb-10">
		<p class="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
			{kicker}
		</p>
		<h2
			class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]"
		>
			{title}
		</h2>
		<div class="max-w-3xl h-px bg-[rgba(31,35,42,0.12)] dark:bg-[rgba(210,217,226,0.12)] mt-6 md:mt-8"></div>
	</header>
{:else}
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-12 items-end">
		<div class="lg:col-span-5">
			<p class="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
				{kicker}
			</p>
			<h2
				class="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]"
			>
				{title}
			</h2>
			<slot name="underTitle" />
		</div>
		<div class="lg:col-span-7 flex flex-col justify-end gap-5">
			<div class="w-full h-px bg-[rgba(31,35,42,0.12)] dark:bg-[rgba(210,217,226,0.12)]"></div>
			<slot name="aside" />
		</div>
	</div>
{/if}
