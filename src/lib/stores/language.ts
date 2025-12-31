import { writable } from 'svelte/store';

type Language = 'en' | 'es';

const KEY = 'language';

function createLanguage() {
	const { subscribe, set, update } = writable<Language>('es');

	return {
		subscribe,
		toggle: () => update((n) => (n === 'en' ? 'es' : 'en')),
		set: (value: Language) => {
			set(value);
			if (typeof window !== 'undefined') {
				localStorage.setItem(KEY, value);
			}
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem(KEY) as Language;
				set(stored || 'es');
			}
		}
	};
}

export const language = createLanguage();
