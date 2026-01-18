<script lang="ts">
	import { cn } from '$lib/utils';

	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let className: string = '';
</script>

{#if orientation === 'vertical'}
	<div aria-hidden="true" class={cn('w-px self-stretch bg-neutral-200 dark:bg-neutral-800', className)}></div>
{:else}
	<hr aria-hidden="true" class={cn('h-px w-full border-0 bg-neutral-200 dark:bg-neutral-800', className)} />
{/if}
