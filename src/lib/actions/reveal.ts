import type { Action } from 'svelte/action';

const defaultOptions: IntersectionObserverInit = {
	threshold: 0.12,
	rootMargin: '0px 0px -10% 0px'
};

export const reveal: Action<HTMLElement, IntersectionObserverInit | undefined> = (
	node,
	options = defaultOptions
) => {
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('visible');
		return {};
	}

	const observer = new IntersectionObserver((entries) => {
		if (entries[0]?.isIntersecting) {
			node.classList.add('visible');
			observer.unobserve(node);
		}
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
