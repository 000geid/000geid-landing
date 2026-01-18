import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
	base:
		'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-neutral-950',
	variants: {
		variant: {
			default:
				'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200',
			outline:
				'border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-900/60',
			ghost: 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/60',
			link: 'p-0 h-auto rounded-none normal-case text-blue-600 dark:text-blue-400 hover:underline'
		},
		size: {
			default: 'px-5 py-3',
			sm: 'px-4 py-2',
			lg: 'px-6 py-3.5'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
