<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";

	let { layoutStructure, dataValues, myself, parent, dataSourceName } =
		$props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["oninput", "onchange", "onclick"];
	}
	export function getProps() {
		return [{ name: "value", type: "string" }];
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
	const content = $derived(
		macroReplace(
			layoutStructure.props?.value,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<p
	class={theClass}
	draggable={layoutStructure.props?.draggable}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself?.getLayout() },
		dataValues,
	)}
>
	{@html content}
</p>
