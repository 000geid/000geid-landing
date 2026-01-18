<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
</script>

<div class={cn('flex flex-col gap-2 p-6', className)}>
	<slot />
</div>
