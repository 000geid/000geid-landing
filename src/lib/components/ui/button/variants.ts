import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
	base:
		'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold tracking-tight transition-[color,background-color,border-color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-parchment)] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-[var(--color-parchment)]',
	variants: {
		variant: {
			default:
				'bg-[var(--color-ink-strong)] text-[var(--color-parchment)] shadow-sm hover:bg-[var(--color-ink)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] dark:border dark:border-[rgba(210,217,226,0.12)] dark:hover:bg-[rgba(210,217,226,0.08)] dark:hover:border-[rgba(210,217,226,0.18)]',
			outline:
				'border border-[rgba(31,35,42,0.18)] bg-transparent text-[var(--color-ink-strong)] hover:bg-[rgba(31,35,42,0.04)] hover:border-[rgba(31,35,42,0.26)] dark:border-[rgba(210,217,226,0.15)] dark:text-[var(--color-ink-strong)] dark:hover:bg-[rgba(210,217,226,0.06)]',
			ghost:
				'text-[var(--color-ink)] hover:bg-[rgba(31,35,42,0.05)] dark:hover:bg-[rgba(210,217,226,0.06)]',
			link: 'rounded-none px-0 h-auto font-medium text-[var(--color-signal)] hover:underline focus-visible:ring-0 underline-offset-4'
		},
		size: {
			default: 'px-5 py-3',
			sm: 'px-4 py-2 text-xs',
			lg: 'px-6 py-3.5 text-[0.9375rem]'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
