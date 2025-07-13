<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues, dataSourceName } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [{ name: "url", type: "string" }];
	}
	export function getDataSourceName() {
		return dataSourceName;
	}

	const theClass = $derived(
		macroReplace(
			layoutStructure.props?.class,
			pageContext,
			dataValues,
			false,
		) +
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
