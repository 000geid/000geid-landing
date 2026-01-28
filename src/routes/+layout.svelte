<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
	import { language } from "$lib/stores/language";
	import { darkMode } from "$lib/stores/darkMode";
	import { t } from "$lib/stores/i18n";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		language.init();
		darkMode.init();
	});
</script>

<svelte:head>
	<title>{$t("hero.name")} | {$t("hero.subtitle")}</title>
	<meta name="description" content={$t("hero.description")} />
	<meta name="author" content="Diego Alvarado" />
	<meta
		name="keywords"
		content="Software Engineer, AI, Fullstack, Machine Learning, Web Development, Argentina"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="{$t('hero.name')} | {$t('hero.subtitle')}"
	/>
	<meta property="og:description" content={$t("hero.description")} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta
		property="twitter:title"
		content="{$t('hero.name')} | {$t('hero.subtitle')}"
	/>
	<meta property="twitter:description" content={$t("hero.description")} />

	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
