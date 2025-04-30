<script>
	import { getContext } from "svelte";
	import { commonProperties } from "./componentRegistry";
	import ColorPicker from "svelte-awesome-color-picker";

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
</script>

<b class="mt-2">Common Properties:</b>

<div class="text-xs">id</div>
<input
	class="mb-1 border w-full"
	value={pageContext.selectedLayout.id}
	onblur={(event) => setComponentID(event.target.value)}
/>

{#snippet propertyEditor(prop)}
	{#if prop.type === "string"}
		<div class="text-xs">{prop.name}</div>
		<input
			ondrop={(event) => handleDrop(event, prop.name)}
			class="mb-2 border w-full"
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
				class="mb-2 border w-full"
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
			class="border border-gray-300 rounded mb-2"
			bind:value={pageContext.selectedLayout.props[prop.name]}
		>
			<option value="__none__">-None-</option>
			{#each Object.keys(pageContext.data) as dataSource}
				{#if Array.isArray(pageContext.data[dataSource])}
					<option value={dataSource}>{dataSource}</option>
				{/if}
			{/each}
		</select>
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
