<script lang="ts">
	import '../../../style.css';

	let { children } = $props();
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css"
		rel="stylesheet"
		type="text/css"
	/>
	<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
