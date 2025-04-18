<script>
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";

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
			"optionValueField",
			"optionTitleField",
			"value",
		];
	}
</script>

<select
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself },
		dataValues,
	)}
	bind:value={layoutStructure.props.value}
	class={layoutStructure.class}
>
	{#each pageContext.data[layoutStructure.dataSource] as row}
		<option
			selected={row[layoutStructure.props.optionValueField] ==
				layoutStructure.props.value}
			value={row[layoutStructure.props.optionValueField]}
			>{row[layoutStructure.props.optionTitleField]}
		</option>
	{/each}
</select>
