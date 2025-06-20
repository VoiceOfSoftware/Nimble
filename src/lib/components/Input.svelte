<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";

	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["oninput", "onchange"];
	}
	export function getProps() {
		return [
			{ name: "placeholder", type: "string" },
			{ name: "disabled", type: "boolean" },
			{ name: "value", type: "string" },
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
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			dataValues,
			false,
		),
	}}

	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself?.getLayout() },
		dataValues,
	)}
	draggable={layoutStructure.props?.draggable}
	disabled={layoutStructure.props?.disabled}
	type="text"
	placeholder={macroReplace(
		layoutStructure.props?.placeholder,
		pageContext,
		dataValues,
		false,
	)}
	bind:value={layoutStructure.props.value}
/>
