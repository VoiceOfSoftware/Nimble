<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";

	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}

	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
	const content = $derived(
		macroReplace(
			layoutStructure.props?.content,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<p
	class={theClass}
	draggable={layoutStructure.draggable}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext.data, data: dataValues, self: myself },
		dataValues,
	)}
>
	{@html content}
</p>
