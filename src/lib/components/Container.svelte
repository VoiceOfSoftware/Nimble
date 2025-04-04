<script lang="ts">
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

<div class={theClass} draggable={layoutStructure.draggable}>
	{#each layoutStructure.children as child, index}
		{#if pageContext.editMode}
			<InsertionTarget
				{index}
				{layoutStructure}
				notifyDropped={(index, newObject) =>
					insertSiblingAbove(newObject, index)}
			/>
		{/if}
		<Layout layoutStructure={child} {dataValues} />
	{/each}
	{#if pageContext.editMode}
		<InsertionTarget
			index={layoutStructure.children?.length}
			{layoutStructure}
			notifyDropped={(index, newObject) =>
				insertSiblingAbove(newObject, index)}
		/>
	{/if}
</div>
