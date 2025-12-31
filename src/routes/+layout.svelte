<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { language } from '$lib/stores/language';
	import { darkMode } from '$lib/stores/darkMode';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		language.init();
		darkMode.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}
