<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues } = $props();

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

<p class={theClass} draggable={layoutStructure.draggable}>
	{@html content}
</p>
