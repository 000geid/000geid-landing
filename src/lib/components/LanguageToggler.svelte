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
	class="w-10 h-10 rounded-lg border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[rgba(53,90,76,0.35)] dark:hover:border-[rgba(155,203,177,0.35)] transition-all duration-200 flex items-center justify-center font-mono text-xs font-medium uppercase tracking-[0.12em]"
	aria-label={$t('toggler.toggleLanguage')}
>
	{$language === 'en' ? 'EN' : 'ES'}
</button>
