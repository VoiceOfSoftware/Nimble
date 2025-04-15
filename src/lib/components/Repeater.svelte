<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";
	import InsertionTarget from "./InsertionTarget.svelte";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	function insertSiblingAbove(newComponent, index) {
		layoutStructure.children?.splice(index, 0, newComponent);
	}
</script>

{#if pageContext.editMode}
	<div class={theClass}>
		{#each layoutStructure.children as child, index (child)}
			<InsertionTarget
				{index}
				{layoutStructure}
				notifyDropped={(index, newObject) =>
					insertSiblingAbove(newObject, index)}
			/>
			<Layout layoutStructure={child} dataValues={{}} />
		{/each}
		<InsertionTarget
			index={layoutStructure.children?.length}
			{layoutStructure}
			notifyDropped={(index, newObject) =>
				insertSiblingAbove(newObject, index)}
		/>
	</div>
{:else}
	<div class={theClass} draggable={layoutStructure.draggable}>
		{#each pageContext.data[layoutStructure.dataSource] as row}
			{#each layoutStructure.children as child, index (child)}
				<Layout layoutStructure={child} dataValues={row} />
			{/each}
		{/each}
	</div>
{/if}
