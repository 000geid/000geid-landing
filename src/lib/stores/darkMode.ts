import { writable } from 'svelte/store';

const KEY = 'darkMode';

function createDarkMode() {
	const { subscribe, set, update } = writable<boolean>(false);

	return {
		subscribe,
		toggle: () =>
			update((current) => {
				const next = !current;
				if (typeof window !== 'undefined') {
					localStorage.setItem(KEY, String(next));
					document.documentElement.classList.toggle('dark', next);
				}
				return next;
			}),
		set: (value: boolean) => {
			set(value);
			if (typeof window !== 'undefined') {
				localStorage.setItem(KEY, String(value));
				document.documentElement.classList.toggle('dark', value);
			}
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem(KEY);
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const value = stored ? stored === 'true' : prefersDark;
				document.documentElement.classList.toggle('dark', value);
				set(value);
			}
		}
	};
}

export const darkMode = createDarkMode();
