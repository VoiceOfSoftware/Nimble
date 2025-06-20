<script>
	let { showModal = $bindable(), header, children, dialogClass } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	class="modal modal-open"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div
		class={dialogClass ||
			"modal-box p-4 w-[90vw] max-w-[90%] max-h-[90vh] mx-auto fixed inset-0 rounded-md border-none animate-zoom"}
	>
		{@render header?.()}
		{@render children?.()}
	</div>
	<div class="modal-backdrop bg-black/40 animate-fade"></div>
</dialog>

<style>
	@keyframes zoom {
		from {
			transform: scale(0.75);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-zoom {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.animate-fade {
		animation: fade 0.2s ease-out;
	}
</style>
