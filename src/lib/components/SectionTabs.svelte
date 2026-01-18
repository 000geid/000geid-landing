<script lang="ts">
	import { t } from '$lib/stores/i18n';

	type TabItem = {
		id: string;
		labelKey: string;
	};

	export let tabs: TabItem[] = [];
	export let activeTab = '';

	let tabRefs: HTMLButtonElement[] = [];

	function setActiveTab(id: string) {
		activeTab = id;
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		const count = tabs.length;
		if (!count) return;

		let nextIndex = index;

		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				nextIndex = (index + 1) % count;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				nextIndex = (index - 1 + count) % count;
				break;
			case 'Home':
				nextIndex = 0;
				break;
			case 'End':
				nextIndex = count - 1;
				break;
			default:
				return;
		}

		event.preventDefault();
		activeTab = tabs[nextIndex].id;
		tabRefs[nextIndex]?.focus();
	}
</script>

<nav class="w-full md:w-auto">
	<div
		role="tablist"
		aria-label={$t('nav.sections')}
		class="flex flex-wrap justify-center md:justify-start gap-2 rounded-full bg-neutral-100 dark:bg-neutral-900/70 p-1.5 shadow-sm"
	>
		{#each tabs as tab, index}
			<button
				bind:this={tabRefs[index]}
				id={`tab-${tab.id}`}
				role="tab"
				type="button"
				aria-selected={activeTab === tab.id}
				aria-controls={`panel-${tab.id}`}
				tabindex={activeTab === tab.id ? 0 : -1}
				on:click={() => setActiveTab(tab.id)}
				on:keydown={(event) => handleKeyDown(event, index)}
				class={`px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 ${
					activeTab === tab.id
						? 'bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950'
						: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
				}`}
			>
				{$t(tab.labelKey)}
			</button>
		{/each}
	</div>
</nav>
