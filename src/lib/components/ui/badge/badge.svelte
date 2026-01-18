<script lang="ts">
	import { cn } from '$lib/utils';
	import { badgeVariants, type BadgeVariant } from './variants';

	export let variant: BadgeVariant = 'default';
	export let className: string = '';
</script>

<span class={cn(badgeVariants({ variant }), className)}>
	<slot />
</span>
