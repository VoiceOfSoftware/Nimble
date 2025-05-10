<script lang="ts">
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";
	import InsertionTarget from "./InsertionTarget.svelte";

	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onclick"];
	}
	export function getProps() {
		return [
			{ name: "disabled", type: "boolean" },
		];
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

	function insertSiblingAbove(newComponent, index) {
		layoutStructure.children?.splice(index, 0, newComponent);
	}
</script>

<div class={theClass} draggable={layoutStructure.props?.draggable}>
	{#each layoutStructure.children as child, index (child)}
		{#if pageContext.editMode}
			<InsertionTarget
				{index}
				{layoutStructure}
				notifyDropped={(index, newObject) =>
					insertSiblingAbove(newObject, index)}
			/>
		{/if}
		<Layout
			layoutStructure={child}
			{dataValues}
			parent={layoutStructure}
			{index}
		/>
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
