<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";

	let { layoutStructure, dataValues, myself, dataSourceName } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onclick"];
	}
	export function getProps() {
		return [
			{ name: "disabled", type: "boolean" },
			{ name: "label", type: "string" },
		];
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
	const label = $derived(
		macroReplace(
			layoutStructure.props?.label,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<button
	class={theClass}
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			pageContext,
			dataValues,
			false,
		),
	}}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself?.getLayout() },
		dataValues,
	)}
	disabled={layoutStructure.props?.disabled}
	draggable={layoutStructure.props?.draggable}>{label}</button
>
