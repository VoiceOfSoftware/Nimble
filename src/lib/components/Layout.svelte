<script lang="ts">
	import { getComponent } from "./componentRegistry.js";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";

	import Icon from "@iconify/svelte";

	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	let myself = $state();

	const DynamicComponent = getComponent(layoutStructure.type)?.component;

	function editComponent() {
		pageContext.selectedLayout = layoutStructure;
		pageContext.selectedComponent = myself;
	}

	$effect(() => {
		if (layoutStructure.id && myself) {
			pageContext.namedPageObjects[layoutStructure.id] = myself;
		}
	});

	function dragStart(event: DragEvent) {
		event.stopPropagation();
		if (!layoutStructure.draggable) {
			return;
		}
		if (layoutStructure.dragData) {
			event.dataTransfer?.setData(
				"text/plain",
				macroReplace(
					layoutStructure.dragData,
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
				<span class="absolute -top-1 -right-1">
					<Icon
						onclick={() => editComponent()}
						icon="mdi:gear"
						class="text-primary bg-white bg-opacity-75 rounded-full p-1 w-6 h-6 shadow-md hover:text-accent hover:scale-110 transition-transform"
					/>
				</span>
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
