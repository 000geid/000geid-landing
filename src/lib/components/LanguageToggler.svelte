<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
	import { onMount } from 'svelte';

	onMount(() => {
		language.init();
	});
</script>

<button
	onclick={() => language.toggle()}
	class="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
	aria-label={$t('toggler.toggleLanguage')}
>
	<svg
		class="w-5 h-5 text-neutral-950 dark:text-neutral-50"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
		/>
	</svg>
	<span class="text-sm font-semibold text-neutral-950 dark:text-neutral-50">{$language === 'en' ? 'EN' : 'ES'}</span>
</button>
