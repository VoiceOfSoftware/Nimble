<script>
	import { getContext } from "svelte";
	import CodeMirror from "svelte-codemirror-editor";
	import { javascript } from "@codemirror/lang-javascript";
	import { autocompletion } from "@codemirror/autocomplete";
	import Modal from "./Modal.svelte";
	import { commonProperties } from "./componentRegistry";

	const pageContext = getContext("pageContext");

	let showModal = false;
	let currentEvent = "";
	function editScript(event) {
		currentEvent = event;
		showModal = true;
	}

	function handleTypeChange(event, action) {
		if (event.target.value == "doNothing") {
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
			case "setGlobal":
				newAction.variableName = "";
				newAction.property = "";
				newAction.value = "";
				break;
		}
		if (!pageContext.selectedLayout.actions) {
			pageContext.selectedLayout.actions = {};
		}
		pageContext.selectedLayout.actions[action] = newAction;
	}

	//
	//	CodeMirror autocomplete
	//
	function contextCompletionSource(contextVars) {
		return (context) => {
			const word = context.matchBefore(/[\w.]+/);
			if (!word) return null;

			const text = word.text;
			const parts = text.split(".");
			let current = contextVars;

			for (let i = 0; i < parts.length - 1; i++) {
				current = current[parts[i]];
				if (!current) return null;
			}

			const lastPart = parts[parts.length - 1];
			const options = Object.keys(current)
				.filter((key) => key.startsWith(lastPart))
				.map((key) => ({
					label: key,
					type:
						typeof current[key] === "function"
							? "function"
							: "variable",
					detail:
						typeof current[key] === "function"
							? "(function)"
							: `(value: ${typeof current[key]})`,
				}));

			if (options.length === 0) return null;

			return {
				from: word.from + (text.lastIndexOf(".") + 1 || 0),
				options,
				validFor: /^[\w$]*$/,
			};
		};
	}

	//	Experimental, for script auto-completion popup
	const contextVariables = {
		page: {
			endpoint1: "/blog",
			endpoint2: "/tutorial/svelte/welcome-to-svelte",
			exampleIcon: {
				color: "red",
				shape: "mdi:gear",
				size: 32,
			},
			exampleButton: {
				label: "B-label",
				color: "btn-warning",
			},
			exampleImage: {
				src: "https://media.formula1.com/image/upload/f_auto,c_limit,w_112,q_auto/nwp-navigation/f1-tv-logo",
			},
			exampleInput: {
				placeholder: "type here",
			},
			exampleText: {
				content: "text",
			},
			exampleSlider: {
				min: 0,
				max: 10,
			},
		},
		pageVar: pageContext.page,
	};

	const extensions = [
		autocompletion({
			override: [contextCompletionSource(contextVariables)],
		}),
	];
</script>

{#if pageContext.selectedComponent.getEvents}
	{#each pageContext.selectedComponent.getEvents() as event}
		{#if pageContext.selectedLayout.actions?.[event]}
			<div class="flex flex-row items-baseline">
				{event}:
				<select
					class="border border-gray-300 rounded"
					bind:value={pageContext.selectedLayout.actions[event].type}
					onchange={(domEvent) => handleTypeChange(domEvent, event)}
				>
					<option value="doNothing">Do Nothing</option>
					<option value="clientScript">Script</option>
					<option value="navigate">Navigate</option>
					<option value="setProperty">Set Property</option>
					<option value="setGlobal">Set Global</option>
				</select>
				{#if pageContext.selectedLayout.actions[event].type === "clientScript"}
					<button
						class="btn btn-xs btn-neutral-content ml-2"
						onclick={() => editScript(event)}>Edit Script</button
					>
				{/if}
			</div>
			<div class="ml-3">
				{#if pageContext.selectedLayout.actions[event].type === "navigate"}
					<div class="text-xs">URL</div>
					<input
						class="mb-1 border w-full"
						bind:value={
							pageContext.selectedLayout.actions[event].URL
						}
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
					<select
						class="border border-gray-300 rounded"
						bind:value={
							pageContext.selectedLayout.actions[event].objectName
						}
					>
						{#each Object.keys(pageContext.namedPageObjects) as objectName}
							<option
								selected={pageContext.selectedLayout.actions[
									event
								].objectName == objectName}
								value={objectName}>{objectName}</option
							>
						{/each}
					</select>
					{#if pageContext.namedPageObjects[pageContext.selectedLayout.actions[event].objectName]?.getProps}
						<div class="text-xs">property</div>
						<select
							class="border border-gray-300 rounded"
							bind:value={
								pageContext.selectedLayout.actions[event]
									.property
							}
						>
							{#each [...commonProperties, ...pageContext.namedPageObjects[pageContext.selectedLayout.actions[event].objectName].getProps()] as prop}
								<option
									selected={pageContext.selectedLayout
										.actions[event].property == prop.name}
									value={prop.name}>{prop.name}</option
								>
							{/each}
						</select>
					{/if}
					<div class="text-xs">value</div>
					<input
						class="mb-1 border w-full"
						bind:value={
							pageContext.selectedLayout.actions[event].value
						}
					/>
				{/if}
				{#if pageContext.selectedLayout.actions[event].type === "setGlobal"}
					<div class="text-xs">variable name</div>
					<select
						class="border border-gray-300 rounded"
						bind:value={
							pageContext.selectedLayout.actions[event].variableName
						}
					>
						{#each Object.keys(pageContext.data).filter((key) => typeof pageContext.data[key] !== "object") as variableName}
							<option
								selected={pageContext.selectedLayout.actions[
									event
								].variableName == variableName}
								value={variableName}>{variableName}</option
							>
						{/each}
					</select>
					<div class="text-xs">value</div>
					<input
						class="mb-1 border w-full"
						bind:value={
							pageContext.selectedLayout.actions[event].value
						}
					/>
				{/if}
			</div>
		{:else}
			<div class="flex flex-row items-baseline">
				{event}:
				<select
					class="border border-gray-300 rounded"
					onchange={(domEvent) => handleTypeChange(domEvent, event)}
				>
					<option value="doNothing">Do Nothing</option>
					<option value="clientScript">Script</option>
					<option value="navigate">Navigate</option>
					<option value="setProperty">Set Property</option>
					<option value="setGlobal">Set Global</option>
				</select>
			</div>
		{/if}
	{/each}
{/if}

{#if showModal}
	<Modal bind:showModal>
		{#snippet header()}
			Scripts have access to "page", "data", and "self" objects
		{/snippet}
		<CodeMirror
			bind:value={pageContext.selectedLayout.actions[currentEvent].script}
			lang={javascript()}
			{extensions}
		/>
		<div class="flex w-full">
			<button
				class="btn btn-sm btn-primary ml-auto"
				onclick={() => (showModal = false)}>Save</button
			>
		</div>
	</Modal>
{/if}
