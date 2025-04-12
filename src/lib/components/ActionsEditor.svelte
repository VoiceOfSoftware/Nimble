<script>
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");

	function handleTypeChange(event, action) {
		if (event.target.value == "disabled") {
			delete pageContext.selectedLayout.actions[action];
			return;
		}
		let newAction = { type: event.target.value };
		switch (event.target.value) {
			case "clientScript":
				newAction.script = "";
				break;
			case "navigate":
				newAction.URL = "";
				newAction.newTab = false;
				break;
			case "setProperty":
				newAction.objectName = "";
				newAction.property = "";
				newAction.value = "";
				break;
		}
		pageContext.selectedLayout.actions[action] = newAction;
	}
</script>

{#each ["onclick", "oncontextmenu", "ondblclick", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onkeydown", "onkeyup"] as event}
	{#if pageContext.selectedLayout.actions?.[event]}
		<div class="flex flex-row items-baseline">
			{event}:
			<select
				bind:value={pageContext.selectedLayout.actions[event].type}
				onchange={(domEvent) => handleTypeChange(domEvent, event)}
			>
				<option value="disabled">Disabled</option>
				<option value="clientScript">Script</option>
				<option value="navigate">Navigate</option>
				<option value="setProperty">Set Property</option>
			</select>
		</div>
		<div class="ml-3">
			{#if pageContext.selectedLayout.actions[event].type === "clientScript"}
				<input
					class="mb-1 border w-full"
					bind:value={
						pageContext.selectedLayout.actions[event].script
					}
				/>
			{/if}
			{#if pageContext.selectedLayout.actions[event].type === "navigate"}
				<div class="text-xs">URL</div>
				<input
					class="mb-1 border w-full"
					bind:value={pageContext.selectedLayout.actions[event].URL}
				/>
				<label>
					<input
						type="checkbox"
						bind:checked={
							pageContext.selectedLayout.actions[event].newTab
						}
					/>
					<span class="text-xs">New Tab</span>
				</label>
			{/if}
			{#if pageContext.selectedLayout.actions[event].type === "setProperty"}
				<div class="text-xs">named object</div>
				<input
					class="mb-1 border w-full"
					bind:value={
						pageContext.selectedLayout.actions[event].objectName
					}
				/>
				<div class="text-xs">property</div>
				<input
					class="mb-1 border w-full"
					bind:value={
						pageContext.selectedLayout.actions[event].property
					}
				/>
				<div class="text-xs">value</div>
				<input
					class="mb-1 border w-full"
					bind:value={pageContext.selectedLayout.actions[event].value}
				/>
			{/if}
		</div>
	{:else}
		<div class="flex flex-row items-baseline">
			{event}:
			<select onchange={(domEvent) => handleTypeChange(domEvent, event)}>
				<option value="disabled">Disabled</option>
				<option value="clientScript">Script</option>
				<option value="navigate">Navigate</option>
				<option value="setProperty">Set Property</option>
			</select>
		</div>
	{/if}
{/each}

<hr />
{pageContext.selectedLayout.id}:<br />
{JSON.stringify(pageContext.selectedLayout.actions)}
