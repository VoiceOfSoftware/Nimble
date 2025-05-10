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
		return [{ name: "choiceProperty", type: "string" }];
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
	{#each Object.keys(layoutStructure.alternates) as alternateName}
		<Layout
			{dataValues}
			layoutStructure={layoutStructure.alternates[alternateName]}
		/>
	{/each}
{:else}
	<Layout
		{dataValues}
		layoutStructure={layoutStructure.alternates[
			dataValues[layoutStructure.props.choiceProperty]
		]}
	/>
{/if}
