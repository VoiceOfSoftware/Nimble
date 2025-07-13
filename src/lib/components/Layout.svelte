<script lang="ts">
	import { getComponent } from "./componentRegistry.js";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";

	import Icon from "@iconify/svelte";

	let { layoutStructure, dataValues, parent, index, dataSourceName } = $props();

	const pageContext = getContext("pageContext");
	let myself = $state();

	const DynamicComponent = getComponent(layoutStructure.type)?.component;

	function editComponent() {
		pageContext.selectedLayout = layoutStructure;
		pageContext.selectedComponent = myself;
		if (dataValues != {}) {
			pageContext.isEditingNestedComponent = true;
			pageContext.dataValuesForLayoutBeingEdited = dataValues;
		} else {
			pageContext.isEditingNestedComponent = false;
		}
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

	//	For dragging of user-defined <Layout> objects, using their dragData prop as the payload
	function dragCustomLayout(event: DragEvent) {
		debugger;
		event.stopPropagation();
		if (!layoutStructure.props?.draggable) {
			return;
		}
		if (layoutStructure.props?.dragData) {
			event.dataTransfer?.setData(
				"text/plain",
				macroReplace(
					layoutStructure.props?.dragData,
					{
						page: pageContext,
						data: dataValues,
						self: myself?.getLayout(),
					},
					dataValues,
					false,
				),
			);
		}
	}

	//	For dragging in Edit Mode, using the JSON definition layoutStructure as the payload
	function dragEditMode(event: DragEvent) {
		event.stopPropagation();
		event.dataTransfer?.setData(
			"text/plain",
			JSON.stringify(layoutStructure),
		);
	}
</script>

<svelte:boundary>
	{#if DynamicComponent}
		{#if pageContext?.editMode}
			<div class="relative border border-dashed border-gray-400 p-2 m-1">
				<div
					class="group absolute left-0 w-full -top-2 z-10 flex justify-center space-x-1"
				>
					<span
						class="opacity-0 group-hover:opacity-60 shadow-md rounded bg-white"
						onclick={() => deleteComponent(index)}
					>
						<Icon
							icon="lucide:trash-2"
							width="24"
							class="text-primary hover:text-error hover:scale-150 p-1 transition-transform"
						/>
					</span>

					<span
						class="opacity-0 group-hover:opacity-60 text-xs text-white bg-primary rounded-t m-1 pl-1 pr-1"
					>
						{layoutStructure.type}
					</span>
					<span
						class="opacity-0 group-hover:opacity-60 shadow-md rounded bg-white"
						draggable="true"
						ondragstart={(e) => dragEditMode(e)}
					>
						<Icon
							icon="material-symbols:drag-pan-rounded"
							width="24"
							class="text-primary hover:scale-150 p-1 transition-transform"
						/>
					</span>

					<span
						class="opacity-0 group-hover:opacity-60 shadow-md rounded bg-white"
					>
						<Icon
							onclick={() => editComponent()}
							icon="mdi:gear"
							width="24"
							class="text-primary hover:text-accent hover:scale-150 p-1 transition-transform"
						/>
					</span>
				</div>

				<DynamicComponent
					bind:this={myself}
					{layoutStructure}
					{dataValues}
					{myself}
					{dataSourceName}
				/>
			</div>
		{:else}
			<DynamicComponent
				bind:this={myself}
				{layoutStructure}
				{dataValues}
				{myself}
				ondragstart={(e) => dragCustomLayout(e)}
			/>
		{/if}
	{/if}

	{#snippet failed(error, reset)}
		<button class="btn btn-error btn-xs" onclick={reset}
			>oops! try again</button
		>
		{error}
	{/snippet}
</svelte:boundary>
