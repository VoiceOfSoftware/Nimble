<script>
	import { getContext } from "svelte";
	import { performAction } from "./dataPillMacros.js";

	const pageContext = getContext("pageContext");

	let { layoutStructure, dataValues, myself } = $props();

	let selectedOption = $state();
	function handleChoice() {
		performAction(
			layoutStructure.actions?.onchange,
			{ page: pageContext, data: pageContext.data, self: myself },
			dataValues,
		);
	}
</script>

<select
	onchange={handleChoice}
	bind:value={selectedOption}
	class={layoutStructure.class}
>
	{#each pageContext.data[layoutStructure.dataSource] as row}
		<option value={row[layoutStructure.props.optionValueField]}
			>{row[layoutStructure.props.optionTitleField]}
		</option>
	{/each}
</select>
