<script>
    import { page } from "$app/state";
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");
</script>

<b>These are all the variables available to the page object. Access them in macros like {"{page.data.endpoint1}"}. Arrays can be used as data sources for tables and repeaters.</b>
<p/>
{#each Object.keys(pageContext.data) as dataSource}
	{dataSource}
	{#if Array.isArray(pageContext.data[dataSource])}[]{/if}<br />
{/each}
