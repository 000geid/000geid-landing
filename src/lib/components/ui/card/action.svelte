<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
</script>

<div class={cn('ml-auto', className)}>
	<slot />
</div>
