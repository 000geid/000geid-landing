<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from './variants';

	export let variant: ButtonVariant = 'default';
	export let size: ButtonSize = 'default';
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let rel: string | undefined = undefined;
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let className: string = '';

	$: isLink = typeof href === 'string' && href.length > 0;
	$: classes = cn(buttonVariants({ variant, size }), className);
</script>

<svelte:element
	this={isLink ? 'a' : 'button'}
	class={classes}
	href={href}
	target={target}
	rel={rel}
	disabled={isLink ? undefined : disabled}
	type={isLink ? undefined : type}
>
	<slot />
</svelte:element>
