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
		return ["label"];
	}

	export function getContent() {
		return content;
	}
	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
	const content = $derived(
		macroReplace(
			layoutStructure.props?.label,
			pageContext,
			dataValues,
			false,
		),
	);
	// onclick={() =>
	// 	performAction(
	// 		layoutStructure.actions?.onclick,
	// 		{ page: pageContext, data: pageContext.data, self: myself },
	// 		dataValues,
	// 	)}

</script>

<button
	use:tooltip={{
		content: macroReplace(layoutStructure.tooltip, dataValues, false),
	}}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself },
		dataValues,
	)}
	class={theClass}
	draggable={layoutStructure.draggable}>{content}</button
>
