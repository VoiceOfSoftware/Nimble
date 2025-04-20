<script lang="ts">
	import { getComponent } from "./componentRegistry.js";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";

	import Icon from "@iconify/svelte";

	let { layoutStructure, dataValues, parent, index } = $props();

	const pageContext = getContext("pageContext");
	let myself = $state();

	const DynamicComponent = getComponent(layoutStructure.type)?.component;

	function editComponent() {
		pageContext.selectedLayout = layoutStructure;
		pageContext.selectedComponent = myself;
	}

	function deleteComponent() {
		//	If we're deleting a named object, remove that from it global list
		if (parent.children[index].id) {
			delete pageContext.namedPageObjects[parent.children[index].id];
		}
		parent.children.splice(index, 1);
	}

	$effect(() => {
		//	Whenever the user gives a component an id, capture it into the list of named objects.
		//	This allows us to access page objects by name (well, id, I guess!) from script
		if (layoutStructure.id && myself) {
			pageContext.namedPageObjects[layoutStructure.id] = myself;
		}
	});

	function dragStart(event: DragEvent) {
		event.stopPropagation();
		if (!layoutStructure.props?.draggable) {
			return;
		}
		if (layoutStructure.props?.dragData) {
			event.dataTransfer?.setData(
				"text/plain",
				macroReplace(
					layoutStructure.props?.dragData,
					pageContext,
					dataValues,
					false,
				),
			);
		}
	}
</script>

<svelte:boundary>
	{#if DynamicComponent}
		{#if pageContext?.editMode}
			<div class="relative border border-dashed border-gray-400 p-2 m-1">
				<span class="absolute -top-2 -right-2 opacity-60">
					<Icon
						onclick={() => editComponent()}
						icon="mdi:gear"
						width="24"
						class="text-primary bg-white rounded-full p-1 shadow-md hover:text-accent hover:scale-150 transition-transform"
					/>
				</span>
				<div
					class="absolute -left-2 -top-2 z-10 rounded bg-white opacity-60"
					onclick={() => deleteComponent(index)}
				>
					<Icon
						icon="lucide:trash-2"
						width="24"
						class="text-primary bg-white rounded-full p-1 shadow-md hover:text-error hover:scale-150 transition-transform"
					/>
				</div>

				<DynamicComponent
					bind:this={myself}
					{layoutStructure}
					{dataValues}
					{myself}
				/>
			</div>
		{:else}
			<div ondragstart={(e) => dragStart(e)}>
				<DynamicComponent
					bind:this={myself}
					{layoutStructure}
					{dataValues}
					{myself}
				/>
			</div>
		{/if}
	{/if}

	{#snippet failed(error, reset)}
		<button class="btn btn-error btn-xs" onclick={reset}
			>oops! try again</button
		>
		{error}
	{/snippet}
</svelte:boundary>
