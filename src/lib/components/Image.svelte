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
		return ["onclick"];
	}
	export function getProps() {
		return [
			{ name: "src", type: "string" },
			{ name: "alt", type: "string" },
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
	const content = $derived(
		macroReplace(
			layoutStructure.props?.src,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<img
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			dataValues,
			false,
		),
	}}
	class={theClass}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself?.getLayout() },
		dataValues,
	)}
	draggable={layoutStructure.props?.draggable}
	src={content}
	alt={layoutStructure.props?.alt}
/>
