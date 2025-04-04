<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
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

<iframe class={theClass} src={layoutStructure.props?.src} />
