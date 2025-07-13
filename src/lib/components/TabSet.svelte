<script lang="ts">
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";

	let { layoutStructure, dataValues, dataSourceName } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [
			{
				name: "selectedTab",
				type: "choice",
				choices: layoutStructure.children.map((item) => item.id),
			},
		];
	}
	export function getDataSourceName() {
		return dataSourceName;
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

<div class={theClass} draggable={layoutStructure.props?.draggable}>
	{#each layoutStructure.children as child, index (child)}
		{#if child.id == layoutStructure.props?.selectedTab}
			<Layout
				layoutStructure={child}
				{dataValues}
				parent={layoutStructure}
				{index}
			/>
		{/if}
	{/each}
</div>
