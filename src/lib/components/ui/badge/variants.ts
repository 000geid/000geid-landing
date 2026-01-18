import { tv, type VariantProps } from 'tailwind-variants';

export const badgeVariants = tv({
	base:
		'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950',
	variants: {
		variant: {
			default: 'border-transparent bg-neutral-100 text-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200',
			outline: 'border-neutral-200 text-neutral-700 dark:border-neutral-800 dark:text-neutral-200'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
