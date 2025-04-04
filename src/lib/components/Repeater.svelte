<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
</script>

<div class={theClass} draggable={layoutStructure.draggable}>
	{#each pageContext.data[layoutStructure.dataSource] as row}
		{#each layoutStructure.children as child, index}
			<Layout layoutStructure={child} dataValues={row} />
		{/each}
	{/each}
</div>
