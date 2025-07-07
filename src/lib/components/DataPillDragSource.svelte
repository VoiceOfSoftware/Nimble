<script>
	let { fields = $bindable([]) } = $props();

	function handleDragStart(event, field) {
		event.dataTransfer.setData('text/plain', `{data.${field}}`);
	}
</script>

<div class="h-32 border p-1 mt-1 overflow-auto">
	{#each fields as field, key}
		<div
			class="badge badge-ghost mb-1 mr-1"
			draggable="true"
			on:dragstart={(e) => handleDragStart(e, field)}
			role="button"
			tabindex={key}
		>
			{field}
		</div>
	{/each}
</div>

<style>
</style>
