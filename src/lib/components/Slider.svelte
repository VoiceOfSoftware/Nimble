<script>
	import { getContext } from "svelte";
	import { macroReplace, performAction } from "./dataPillMacros.js";
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
</script>

<input
	class={theClass}
	oninput={() =>
		performAction(
			layoutStructure.actions?.onchange,
			{ page: pageContext, data: pageContext.data, self: myself },
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
