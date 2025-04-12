<script>
	import { getContext } from "svelte";
	import {
		Pane,
		Folder,
		Text,
		Textarea,
		Checkbox,
	} from "svelte-tweakpane-ui";

	const pageContext = getContext("pageContext");
</script>

<Pane title={pageContext.selectedLayout?.type}>
	<Folder title="Common Properties">
		{(pageContext.selectedLayout.id = pageContext.selectedLayout.id || "")}
		{#if pageContext.selectedLayout.id != undefined}
			<Text bind:value={pageContext.selectedLayout.id} label="id" />
		{/if}
		{(pageContext.selectedLayout.class =
			pageContext.selectedLayout.class || "")}
		{#if pageContext.selectedLayout.class != undefined}
			<Textarea
				bind:value={pageContext.selectedLayout.class}
				label="Class"
				placeholder="Tailwind or DaisyUI classes"
			/>
		{/if}
		{(pageContext.selectedLayout.background =
			pageContext.selectedLayout.background || "")}
		{#if pageContext.selectedLayout.background != undefined}
			<Textarea
				bind:value={pageContext.selectedLayout.background}
				label="Background Image"
				placeholder="URL to image"
			/>
		{/if}
		{(pageContext.selectedLayout.draggable =
			pageContext.selectedLayout.draggable || false)}
		{#if pageContext.selectedLayout.draggable != undefined}
			<Checkbox
				bind:value={pageContext.selectedLayout.draggable}
				label="Draggable"
			/>
		{/if}
		{#if pageContext.selectedLayout.dataSource != undefined}
			<Text
				bind:value={pageContext.selectedLayout.dataSource}
				label="Data Source"
			/>
		{/if}
		{(pageContext.selectedLayout.tooltip =
			pageContext.selectedLayout.tooltip || "")}
		{#if pageContext.selectedLayout.tooltip != undefined}
			<Text
				bind:value={pageContext.selectedLayout.tooltip}
				label="Tooltip"
			/>
		{/if}
		{#if pageContext.selectedLayout.onchange != undefined}
			<Folder title="OnChange Action">
				<Text
					bind:value={pageContext.selectedLayout.onchange.action}
					label="Action"
				/>
				<Text
					bind:value={pageContext.selectedLayout.onchange.target}
					label="Target"
				/>
				<Text
					bind:value={
						pageContext.selectedLayout.onchange.options.scale
					}
					label="Target's Scale Property"
				/>
			</Folder>
		{/if}
	</Folder>
	<Folder title="Custom Properties">
		{#if pageContext.selectedLayout.props}
			{#each Object.keys(pageContext.selectedLayout.props) as key (key)}
				{#if pageContext.selectedLayout.props[key].length > 30}
					<Textarea
						bind:value={pageContext.selectedLayout.props[key]}
						label={key}
					/>
				{:else}
					<Text
						bind:value={pageContext.selectedLayout.props[key]}
						label={key}
					/>
				{/if}
			{/each}
		{/if}
	</Folder>
</Pane>
