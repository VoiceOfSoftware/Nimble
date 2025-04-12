<script>
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");

	const commonProperties = [
		{ attr: "id", type: "string", placeholder: "" },
		{ attr: "class", type: "string", placeholder: "" },
		{ attr: "draggable", type: "boolean" },
		{
			attr: "dataSource",
			type: "string",
			components: [
				"calendar",
				"chart",
				"choice",
				"kanban",
				"map",
				"repeater",
				"table",
				"timeline",
			],
			placeholder: "Name of data source array",
		},
		{
			attr: "tooltip",
			type: "string",
			placeholder: "Show text when user hovers",
		},
		{
			attr: "background",
			type: "string",
			placeholder: "URL of background image",
		},
	];
</script>

<b class="mt-2">Common Properties:</b>

{#each commonProperties as commonProp}
	{#if !commonProp.components || commonProp.components.find((type) => type == pageContext.selectedLayout.type)}
		{#if commonProp.type === "string"}
			<div class="text-xs">{commonProp.attr}</div>
			<input
				class="mb-1 border w-full"
				bind:value={pageContext.selectedLayout[commonProp.attr]}
				placeholder={commonProp.placeholder}
			/>
		{/if}
		{#if commonProp.type === "boolean"}
			<div class="mb-1 flex items-baseline text-xs">
				<input
					class="mr-1"
					id="draggable"
					type="checkbox"
					bind:checked={pageContext.selectedLayout[commonProp.attr]}
				/>
				<label for="draggable">{commonProp.attr}</label>
			</div>
		{/if}
	{/if}
{/each}

<b class="mt-2">{pageContext.selectedLayout.type} Properties:</b>
{#if pageContext.selectedLayout?.props}
	{#each Object.keys(pageContext.selectedLayout?.props) as prop}
		<div class="text-xs">{prop}</div>
		<input
			ondrop={(event) => handleDrop(event, prop)}
			class="mb-2 border w-full"
			bind:value={pageContext.selectedLayout.props[prop]}
		/>
	{/each}
{/if}
