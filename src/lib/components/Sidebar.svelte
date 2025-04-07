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
		},
		{ attr: "tooltip", type: "string", placeholder: "" },
		{
			attr: "background",
			type: "string",
			placeholder: "URL of background image",
		},
	];
</script>

<svelte:boundary>
	<div class="h-screen bg-content-neutral">
		<ul class="menu w-full p-2">
			{#if pageContext.selectedLayout}
				<div class="text-xs underline text-center">
					{pageContext.selectedLayout.type}
				</div>
				<b class="mt-2">Common Properties:</b>

				{#each commonProperties as commonProp}
					{#if !commonProp.components || commonProp.components.find((type) => type == pageContext.selectedLayout.type)}
						{#if commonProp.type === "string"}
							<div class="text-xs">{commonProp.attr}</div>
							<input
								class="mb-1 border"
								bind:value={
									pageContext.selectedLayout[commonProp.attr]
								}
								placeholder={commonProp.placeholder}
							/>
						{/if}
						{#if commonProp.type === "boolean"}
							<div class="mb-1 flex items-baseline text-xs">
								<input
									class="mr-1"
									id="draggable"
									type="checkbox"
									bind:checked={
										pageContext.selectedLayout[
											commonProp.attr
										]
									}
								/>
								<label for="draggable">{commonProp.attr}</label>
							</div>
						{/if}
					{/if}
				{/each}
				{#each ["onclick", "onkeyup"] as action}
					<div class="flex flex-row items-baseline">
						<input
							type="checkbox"
							bind:checked={pageContext.selectedLayout[action]}
						/>
						<button class="btn btn-xs">{action}</button>
					</div>
					{#if pageContext.selectedLayout[action]?.action === "clientScript"}
						{pageContext.selectedLayout[action].value}
					{/if}
					{#if pageContext.selectedLayout[action]?.action === "navigate"}
						{pageContext.selectedLayout[action].target}
					{/if}
					{#if pageContext.selectedLayout[action]?.action === "setProperty"}
						{pageContext.selectedLayout[action].target}
					{/if}
				{/each}

				<b class="mt-2">Specific Properties:</b>
				{#if pageContext.selectedLayout?.props}
					{#each Object.keys(pageContext.selectedLayout?.props) as prop}
						<div class="text-xs">{prop}</div>
						<input
							ondrop={(event) => handleDrop(event, prop)}
							class="mb-2 border"
							bind:value={pageContext.selectedLayout.props[prop]}
						/>
					{/each}
				{/if}
			{:else}
				Please select a component
			{/if}
		</ul>
	</div>
</svelte:boundary>
