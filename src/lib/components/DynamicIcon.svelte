<script lang="ts">
	import Icon from "@iconify/svelte";
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
			layoutStructure.props?.icon,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<span class={theClass} draggable={layoutStructure.draggable}>
	<Icon
		color={macroReplace(
			layoutStructure.props?.color,
			pageContext,
			dataValues,
			false,
		)}
		icon={content}
		width={macroReplace(
			layoutStructure.props?.size + "",
			pageContext,
			dataValues,
			false,
		)}
		height={macroReplace(
			layoutStructure.props?.size + "",
			pageContext,
			dataValues,
			false,
		)}
	/>
</span>
