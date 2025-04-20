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
		{#if pageContext.selectedLayout}
			{(pageContext.selectedLayout.id =
				pageContext.selectedLayout?.id || "")}
			{#if pageContext.selectedLayout.id != undefined}
				<Text bind:value={pageContext.selectedLayout.id} label="id" />
			{/if}
			{(pageContext.selectedLayout.props.class =
				pageContext.selectedLayout.props.class || "")}
			{#if pageContext.selectedLayout.props.class != undefined}
				<Textarea
					bind:value={pageContext.selectedLayout.props.class}
					label="Class"
					placeholder="Tailwind or DaisyUI classes"
				/>
			{/if}
			{(pageContext.selectedLayout.props.background =
				pageContext.selectedLayout.props?.background || "")}
			{#if pageContext.selectedLayout.props?.background != undefined}
				<Textarea
					bind:value={pageContext.selectedLayout.props.background}
					label="Background Image"
					placeholder="URL to image"
				/>
			{/if}
			{(pageContext.selectedLayout.props.draggable =
				pageContext.selectedLayout.props.draggable || false)}
			{#if pageContext.selectedLayout.props.draggable != undefined}
				<Checkbox
					bind:value={pageContext.selectedLayout.props.draggable}
					label="Draggable"
				/>
			{/if}
			{#if pageContext.selectedLayout.props.dataSource != undefined}
				<Text
					bind:value={pageContext.selectedLayout.props.dataSource}
					label="Data Source"
				/>
			{/if}
			{(pageContext.selectedLayout.props.tooltip =
				pageContext.selectedLayout.props.tooltip || "")}
			{#if pageContext.selectedLayout.props.tooltip != undefined}
				<Text
					bind:value={pageContext.selectedLayout.props.tooltip}
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
						bind:value={
							pageContext.selectedLayout.onchange.objectName
						}
						label="Object Name"
					/>
					<Text
						bind:value={
							pageContext.selectedLayout.onchange.options.scale
						}
						label="Object Name's Scale Property"
					/>
				</Folder>
			{/if}
		{/if}
	</Folder>
	<Folder title="Custom Properties">
		{#if pageContext.selectedLayout?.props}
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
