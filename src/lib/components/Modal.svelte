<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ign{self.layout}ore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	class="modal"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="modal-box">
		{@render header?.()}
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
		width: 90vw;
		max-width: 90% !important;
		max-height: 90vh;
		margin: auto;
		position: fixed;
		inset: 0; /* This centers it both horizontally and vertically */
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
	}

	.modal-box {
		padding: 1em;
		width: 100%;
		max-width: none !important;
		box-sizing: border-box;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.75);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
