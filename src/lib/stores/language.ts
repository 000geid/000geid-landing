import { writable } from 'svelte/store';
import { SITE_LANG_COOKIE } from '$lib/seo/site';

export type Language = 'en' | 'es';

const KEY = 'language';

function syncLangCookie(lang: Language) {
	if (typeof document === 'undefined') return;
	document.cookie = `${SITE_LANG_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

function createLanguage() {
	const { subscribe, set, update } = writable<Language>('es');

	return {
		subscribe,
		toggle: () =>
			update((n) => {
				const next = n === 'en' ? 'es' : 'en';
				if (typeof window !== 'undefined') {
					localStorage.setItem(KEY, next);
					syncLangCookie(next);
				}
				return next;
			}),
		set: (value: Language) => {
			set(value);
			if (typeof window !== 'undefined') {
				localStorage.setItem(KEY, value);
				syncLangCookie(value);
			}
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem(KEY) as Language | null;
				const value: Language = stored === 'en' || stored === 'es' ? stored : 'es';
				set(value);
				syncLangCookie(value);
			}
		}
	};
}

export const language = createLanguage();
