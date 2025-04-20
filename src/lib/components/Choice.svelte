<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { tooltip } from "./Tippy";
	import { macroReplace } from "./dataPillMacros.js";

	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["oninput", "onchange"];
	}
	export function getProps() {
		return [
			{ name: "disabled", type: "boolean" },
			{ name: "dataSource", type: "dataSource" },
			{ name: "optionValueField", type: "string" },
			{ name: "optionTitleField", type: "string" },
			{ name: "value", type: "string" },
		];
	}
</script>

<select
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			dataValues,
			false,
		),
	}}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself },
		dataValues,
	)}
	disabled={layoutStructure.props?.disabled}
	bind:value={layoutStructure.props.value}
	class={layoutStructure.props?.class}
>
	{#each pageContext.data[layoutStructure.props?.dataSource] as row}
		<option
			selected={row[layoutStructure.props.optionValueField] ==
				layoutStructure.props.value}
			value={row[layoutStructure.props.optionValueField]}
			>{row[layoutStructure.props.optionTitleField]}
		</option>
	{/each}
</select>
