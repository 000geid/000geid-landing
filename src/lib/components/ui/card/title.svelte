<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
</script>

<h3 class={cn('text-xl font-semibold leading-none tracking-tight text-neutral-950 dark:text-neutral-50', className)}>
	<slot />
</h3>
