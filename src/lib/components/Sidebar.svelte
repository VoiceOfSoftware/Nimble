<script>
	import { getContext } from "svelte";
	import PropsEditor from "./PropsEditor.svelte";
	import Tabs from "./Tabs.svelte";
	import ActionsEditor from "./ActionsEditor.svelte";
	import DataEditor from "./DataEditor.svelte";
	import { tooltip } from "./Tippy";

	const pageContext = getContext("pageContext");

	let tabs = [
		{ label: "Properties", value: 1, component: PropsEditor },
		{ label: "Actions", value: 2, component: ActionsEditor },
		{ label: "Data", value: 3, component: DataEditor },
	];

	function copyObjectToClipboard() {
		navigator.clipboard.writeText(
			JSON.stringify(pageContext.selectedLayout),
		);
		alert(`Design has been copied to clipboard`);
	}

	function copyObjectAsURIToClipboard() {
		navigator.clipboard.writeText(
			encodeURI(JSON.stringify(pageContext.selectedLayout)),
		);
		alert(`Design has been copied to clipboard as a URI-encoded string`);
	}
</script>

<svelte:boundary>
	<div class="h-screen bg-content-neutral">
		<ul class="menu w-full p-2">
			{#if pageContext.selectedLayout}
				<div class="text-xs underline text-center">
					{pageContext.selectedLayout.type}/
					{pageContext.isEditingNestedComponent}/
				</div>
				<Tabs items={tabs} />

				<div class="flex gap-2">
					<button
						class="btn btn-primary btn-xs"
						onclick={() => copyObjectToClipboard()}>Copy 📋</button
					>
					<button
						class="btn btn-primary btn-xs"
						onclick={() => copyObjectAsURIToClipboard()}
						>Copy URI📋</button
					>
				</div>
			{:else}
				<div class="bordered shadow p-2 text-center text-xl font-bold">
					Properties Panel
				</div>
				To configure a component, please {#if !pageContext.editMode}switch
					to Edit Mode, then
				{/if} click a component's ⛭ gear icon
				<label
					use:tooltip={{
						content: "Press Option or Alt key to toggle",
					}}
				>
					<input
						type="checkbox"
						bind:checked={pageContext.editMode}
					/>
					Edit Mode
				</label>
			{/if}
		</ul>
	</div>
</svelte:boundary>
