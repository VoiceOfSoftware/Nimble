<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";

	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getID() {
		return layoutStructure.id;
	}
	export function getLayout() {
		return layoutStructure;
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
</script>

<button
	use:tooltip={{
		content: macroReplace(layoutStructure.tooltip, dataValues, false),
	}}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext.data, data: dataValues, self: myself },
		dataValues,
	)}
	class={theClass}
	draggable={layoutStructure.draggable}>{content}</button
>
