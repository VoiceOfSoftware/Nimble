<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");

	const theClass = $derived(
		macroReplace(layoutStructure.props?.class, pageContext, dataValues, false) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
	const url = $derived(
		macroReplace(
			layoutStructure.props?.url,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<iframe class={theClass} src={url} />
