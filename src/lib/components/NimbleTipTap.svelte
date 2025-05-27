<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import TipTap from "./TipTap.svelte";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [{ name: "value", type: "string" }];
	}

	const theClass = $derived(
		macroReplace(layoutStructure.props?.class, pageContext, dataValues, false) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
	const content = $derived(
		macroReplace(
			layoutStructure.props.value,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<div class={theClass} draggable={layoutStructure.props?.draggable}>
	<TipTap bind:content={layoutStructure.props.value} editing={pageContext.editMode} />
</div>
