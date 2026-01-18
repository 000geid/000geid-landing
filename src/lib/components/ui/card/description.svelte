<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
</script>

<p class={cn('text-sm text-neutral-600 dark:text-neutral-300', className)}>
	<slot />
</p>
