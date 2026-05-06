<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
	import SiteShell from "$lib/components/SiteShell.svelte";
	import { language } from "$lib/stores/language";
	import { darkMode } from "$lib/stores/darkMode";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		language.init();
		darkMode.init();

		const unsub = language.subscribe((lang) => {
			document.documentElement.lang = lang;
		});

		return unsub;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SiteShell>
	{@render children()}
</SiteShell>
