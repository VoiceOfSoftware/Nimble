<script>
	import { getContext } from "svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import { commonProperties } from "./componentRegistry";
	import DataPillDragSource from "./DataPillDragSource.svelte";

	const pageContext = getContext("pageContext");

	function setComponentID(id) {
		//	If component already has an id, rename it by first removing from the global list of named objects
		if (pageContext.selectedLayout.id) {
			delete pageContext.namedPageObjects[pageContext.selectedLayout.id];
		}
		if (id) {
			pageContext.selectedLayout.id = id;
		}
	}

	//	User dropped JSON text onto an property text field
	function handleDrop(event, propName) {
		event.preventDefault();
		event.stopPropagation();
		const field = event.dataTransfer.getData("text");
		pageContext.selectedLayout.props[propName] = field; //	This updates the reactive layout value
	}

	const schema = $derived(extractArraySchema(pageContext.selectedLayout.props.dataSource));

	function extractArraySchema(dataSourceName) {
		const dataSources = pageContext.data;
		const schema = {};

		// Iterate through each key in the JSON object
		for (const key in dataSources) {
			// Check if the value is an array and has at least one element
			if (Array.isArray(dataSources[key]) && dataSources[key].length > 0) {
				// Extract the keys from the first element of the array
				schema[key] = Object.keys(dataSources[key][0]);
			}
		}
		return schema[dataSourceName];
	}
</script>

<b class="mt-2">Common Properties:</b>

<div class="text-xs">id</div>
<input
	class="mb-1 border border-base-300 w-full"
	value={pageContext.selectedLayout.id}
	onblur={(event) => setComponentID(event.target.value)}
/>

{#snippet propertyEditor(prop)}
	{#if prop.type === "string"}
		<div class="text-xs">{prop.name}</div>
		<input
			ondrop={(event) => handleDrop(event, prop.name)}
			class="mb-2 border border-base-300 w-full"
			bind:value={pageContext.selectedLayout.props[prop.name]}
			placeholder={prop.placeholder}
		/>
	{/if}
	{#if prop.type === "choice"}
		<div class="text-xs">{prop.name}</div>
		<select
			class="border border-gray-300 rounded text-sm mb-2"
			bind:value={pageContext.selectedLayout.props[prop.name]}
		>
			{#each prop.choices as choice}
				<option value={choice}>{choice}</option>
			{/each}
		</select>
	{/if}
	{#if prop.type === "color"}
		<div class="text-xs">{prop.name}</div>
		<div class="mb-1 flex items-baseline text-xs">
			<ColorPicker
				bind:hex={pageContext.selectedLayout.props[prop.name]}
				label=""
			/>
			<input
				ondrop={(event) => handleDrop(event, prop.name)}
				class="mb-2 border border-base-300 w-full"
				bind:value={pageContext.selectedLayout.props[prop.name]}
				placeholder={prop.placeholder}
			/>
		</div>
	{/if}
	{#if prop.type === "boolean"}
		<div class="mb-1 flex items-baseline text-xs">
			<input
				class="mr-1"
				id={prop.name}
				type="checkbox"
				bind:checked={pageContext.selectedLayout.props[prop.name]}
			/>
			<label for={prop.name}>{prop.name}</label>
		</div>
	{/if}
	{#if prop.type == "dataSource"}
		<div class="text-xs">{prop.name}</div>
		<select
			class="border border-base-300 rounded mb-2"
			bind:value={pageContext.selectedLayout.props[prop.name]}
		>
			<option value="__none__">-None-</option>
			{#each Object.keys(pageContext.data) as dataSource}
				{#if Array.isArray(pageContext.data[dataSource])}
					<option value={dataSource}>{dataSource}</option>
				{/if}
			{/each}
		</select>
		<DataPillDragSource fields={schema} />
	{/if}
{/snippet}

{#each commonProperties as prop}
	{@render propertyEditor(prop)}
{/each}

{#if pageContext.selectedComponent?.getProps}
	<b class="mt-2">{pageContext.selectedLayout.type} Properties:</b>
	{#each pageContext.selectedComponent?.getProps() as prop}
		{@render propertyEditor(prop)}
	{/each}
{/if}

{#if pageContext.selectedComponent?.getAlternates}
	{@render pageContext.selectedComponent?.getAlternates()}
{/if}
