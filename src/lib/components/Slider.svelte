<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onchange", "oninput"];
	}
	export function getProps() {
		return [
			{ name: "min", type: "string" },
			{ name: "max", type: "string" },
			{ name: "value", type: "string" },
			{ name: "step", type: "string" },
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
	step={macroReplace(
		layoutStructure.props?.step + "",
		pageContext,
		dataValues,
		false,
	)}
	bind:value={layoutStructure.props.value}
/>
