import { derived } from 'svelte/store';
import { language } from './language';
import { en } from '$lib/i18n/en';
import { es } from '$lib/i18n/es';

const translations = {
	en,
	es
};

function getNestedValue(obj: any, path: string): string {
	return path.split('.').reduce((acc, key) => acc?.[key], obj) || path;
}

export const t = derived([language], ([$lang]) => {
	return (key: string) => {
		const langTranslations = translations[$lang as 'en' | 'es'];
		return getNestedValue(langTranslations, key);
	};
});
