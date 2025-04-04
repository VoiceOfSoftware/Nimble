<script>
	import { getContext } from "svelte";
	import { macroReplace, performAction } from "./dataPillMacros.js";
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
	onclick={() =>
		performAction(
			layoutStructure.onclick,
			{ page: pageContext, data: pageContext.data, self: myself },
			dataValues,
		)}
	class={theClass}
	draggable={layoutStructure.draggable}>{content}</button
>
