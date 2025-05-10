<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [{ name: "clauseProperty", type: "string" }];
	}

	const theClass = $derived(
		macroReplace(
			layoutStructure.props?.class,
			pageContext,
			dataValues,
			false,
		) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
</script>

{#if pageContext.editMode}
	{#each Object.keys(layoutStructure.blocks) as blockName}
		<Layout
			{dataValues}
			layoutStructure={layoutStructure.blocks[blockName]}
		/>
	{/each}
{:else}
	<Layout
		{dataValues}
		layoutStructure={layoutStructure.blocks[
			dataValues[layoutStructure.props.clauseProperty]
		]}
	/>
{/if}
