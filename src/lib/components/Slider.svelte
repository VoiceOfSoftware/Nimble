<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace, performAction } from "./dataPillMacros.js";
	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onchange","oninput"];
	}
	export function getProps() {
		return ["value"];
	}

	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
</script>

<input
	class={theClass}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself },
		dataValues,
	)}
	type="range"
	min={macroReplace(
		layoutStructure.props?.min + "",
		pageContext,
		dataValues,
		false,
	)}
	max={macroReplace(
		layoutStructure.props?.max + "",
		pageContext,
		dataValues,
		false,
	)}
	bind:value={layoutStructure.props.value}
/>
