<script>
	import { getContext } from "svelte";
	import {
		Button as TPButton,
		Slider as TPSlider,
		Pane as TPPane,
		Monitor as TPMonitor,
		Folder as TPFolder,
		Text as TPText,
		Textarea as TPTextarea,
		Color as TPColor,
		Checkbox as TPCheckbox,
	} from "svelte-tweakpane-ui";

	const pageContext = getContext("pageContext");
</script>

<TPPane title={pageContext.selectedLayout.type}>
	<TPFolder title="Common Properties">
		{(pageContext.selectedLayout.id = pageContext.selectedLayout.id || "")}
		{#if pageContext.selectedLayout.id != undefined}
			<TPText bind:value={pageContext.selectedLayout.id} label="id" />
		{/if}
		{(pageContext.selectedLayout.class =
			pageContext.selectedLayout.class || "")}
		{#if pageContext.selectedLayout.class != undefined}
			<TPTextarea
				bind:value={pageContext.selectedLayout.class}
				label="Class"
				placeholder="Tailwind or DaisyUI classes"
			/>
		{/if}
		{(pageContext.selectedLayout.background =
			pageContext.selectedLayout.background || "")}
		{#if pageContext.selectedLayout.background != undefined}
			<TPTextarea
				bind:value={pageContext.selectedLayout.background}
				label="Background Image"
				placeholder="URL to image"
			/>
		{/if}
		{(pageContext.selectedLayout.draggable =
			pageContext.selectedLayout.draggable || false)}
		{#if pageContext.selectedLayout.draggable != undefined}
			<TPCheckbox
				bind:value={pageContext.selectedLayout.draggable}
				label="Draggable"
			/>
		{/if}
		{#if pageContext.selectedLayout.dataSource != undefined}
			<TPText
				bind:value={pageContext.selectedLayout.dataSource}
				label="Data Source"
			/>
		{/if}
		{(pageContext.selectedLayout.tooltip =
			pageContext.selectedLayout.tooltip || "")}
		{#if pageContext.selectedLayout.tooltip != undefined}
			<TPText
				bind:value={pageContext.selectedLayout.tooltip}
				label="Tooltip"
			/>
		{/if}
		{#if pageContext.selectedLayout.onchange != undefined}
			<TPFolder title="OnChange Action">
				<TPText
					bind:value={pageContext.selectedLayout.onchange.action}
					label="Action"
				/>
				<TPText
					bind:value={pageContext.selectedLayout.onchange.target}
					label="Target"
				/>
				<TPText
					bind:value={
						pageContext.selectedLayout.onchange.options.scale
					}
					label="Target's Scale Property"
				/>
			</TPFolder>
		{/if}
	</TPFolder>
	<TPFolder title="Custom Properties">
		{#if pageContext.selectedLayout.props}
			{#each Object.keys(pageContext.selectedLayout.props) as key (key)}
				{#if pageContext.selectedLayout.props[key].length > 30}
					<TPTextarea
						bind:value={pageContext.selectedLayout.props[key]}
						label={key}
					/>
				{:else}
					<TPText
						bind:value={pageContext.selectedLayout.props[key]}
						label={key}
					/>
				{/if}
			{/each}
		{/if}
	</TPFolder>
</TPPane>
