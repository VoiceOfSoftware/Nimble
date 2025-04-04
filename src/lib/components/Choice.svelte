<script>
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");

	let { layoutStructure } = $props();

	let selectedOption = $state();
	function handleChoice() {
		//	If we have a link to a single other object, send it a 'standard' data change message
		if (layoutStructure.link) {
			console.log("layoutStructure.link: " + layoutStructure.link);
		}
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
