<script>
	import { getContext } from "svelte";
	import PropsEditor from "./PropsEditor.svelte";
	import Tabs from "./Tabs.svelte";
	import ActionsEditor from "./ActionsEditor.svelte";

	const pageContext = getContext("pageContext");

	let tabs = [
		{ label: "Properties", value: 1, component: PropsEditor },
		{ label: "Actions", value: 2, component: ActionsEditor },
	];
</script>

<svelte:boundary>
	<div class="h-screen bg-content-neutral">
		<ul class="menu w-full p-2">
			{#if pageContext.selectedLayout}
				<div class="text-xs underline text-center">
					{pageContext.selectedLayout.type}
				</div>
				<Tabs items={tabs} />
			{:else}
				Please select a component
			{/if}
		</ul>
	</div>
</svelte:boundary>
