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
		return ["oninput", "onchange"];
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
	draggable={layoutStructure.draggable}
	disabled={layoutStructure.disabled}
	type="text"
	placeholder={macroReplace(
		layoutStructure.props?.placeholder,
		pageContext,
		dataValues,
		false,
	)}
	bind:value={layoutStructure.props.value}
/>
