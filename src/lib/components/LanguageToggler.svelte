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
	class="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all duration-200 flex items-center justify-center font-body text-xs font-semibold uppercase tracking-wider"
	aria-label={$t('toggler.toggleLanguage')}
>
	{$language === 'en' ? 'EN' : 'ES'}
</button>
