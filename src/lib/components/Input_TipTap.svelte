<script lang="ts">
	import { NodeViewWrapper } from "svelte-tiptap";
	import Input from "./Input.svelte";
</script>

<NodeViewWrapper class="input" as="span">
	<Input
		layoutStructure={{
			class: "input input-sm input-bordered w-16",
			props: {},
		}}
	/>
</NodeViewWrapper>
