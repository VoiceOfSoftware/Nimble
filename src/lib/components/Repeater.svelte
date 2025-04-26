<script>
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
		return [{ name: "dataSource", type: "dataSource" }];
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

{#if pageContext.editMode}
	<div class={theClass + " repeater-section"} draggable={layoutStructure.props?.draggable}>
		{#each layoutStructure.children as child, index (child)}
			<InsertionTarget
				{index}
				{layoutStructure}
				notifyDropped={(index, newObject) =>
					insertSiblingAbove(newObject, index)}
			/>
			<Layout layoutStructure={child} dataValues={{}} parent={layoutStructure} {index}/>
		{/each}
		<InsertionTarget
			index={layoutStructure.children?.length}
			{layoutStructure}
			notifyDropped={(index, newObject) =>
				insertSiblingAbove(newObject, index)}
		/>
	</div>
{:else}
	<div class={theClass} draggable={layoutStructure.props?.draggable}>
		{#each pageContext.data[layoutStructure.props?.dataSource] as row}
			{#each layoutStructure.children as child, index (child)}
				<Layout layoutStructure={child} dataValues={row} />
			{/each}
		{/each}
	</div>
{/if}

<style>
	.repeater-section {
		/* Ensure relative positioning so pseudo-elements can be positioned */
		position: relative;

		/* Add padding to avoid content overlapping the bracket */
		padding-left: 20px;

		/* Add margin to separate each repeated section */
		margin-bottom: 15px;
	}

	.repeater-section::before,
	.repeater-section::after {
		/* Position the pseudo-elements absolutely on the left side */
		content: "";
		position: absolute;
		left: 0;
		width: 10px; /* Width of the bracket's top/bottom caps */
		height: 2px; /* Thickness of the caps */
		background-color: #606dbc; /* Red to match your drawing */
	}

	.repeater-section::before {
		/* Top cap of the bracket */
		top: 0;
	}

	.repeater-section::after {
		/* Bottom cap of the bracket */
		bottom: 0;
	}

	.repeater-section {
		/* Vertical line for the bracket's main body */
		border-left: 5px solid #606dbc; /* Red vertical line */
	}
</style>
