<script>
	import { getContext, setContext } from "svelte";

	let { children, editMode } = $props();

	const originalContext = getContext("pageContext");
	const modifiedContext = { ...originalContext, editMode: editMode };
	setContext("pageContext", modifiedContext);
</script>

{@render children()}
