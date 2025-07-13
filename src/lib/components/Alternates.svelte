<script lang="ts">
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";
	import type { Snippet } from "svelte";
	let { layoutStructure, dataValues, dataSourceName } = $props();

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
	export function getDataSourceName() {
		return dataSourceName;
	}
	export { getAlternates };

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

{#snippet getAlternates()}
	<div class="text-xs underline">variants</div>
	{#each Object.keys(layoutStructure.alternates) as alternateName}
		{alternateName}:
		<input
			class="mb-2 border w-full"
			bind:value={layoutStructure.alternates[alternateName]}
		/>
	{/each}
{/snippet}

{#if pageContext.editMode}
	{#each Object.keys(layoutStructure.alternates) as alternateName}
		{#if layoutStructure.alternates[alternateName]}
			<Layout
				{dataValues}
				layoutStructure={JSON.parse(
					layoutStructure.alternates[alternateName],
				)}
				{dataSourceName}
			/>
		{/if}
	{/each}
{:else}
	<Layout
		{dataValues}
		layoutStructure={JSON.parse(
			layoutStructure.alternates[
				dataValues[layoutStructure.props.choiceProperty]
			],
		)}
		{dataSourceName}
	/>
{/if}
