<script lang="ts">
	import { NodeViewWrapper } from "svelte-tiptap";
	import Layout from "./Layout.svelte";
</script>

<NodeViewWrapper class="input" as="span">
	<Layout
		layoutStructure={{
			type: "icon",
			props: { color: "green", icon: "mdi:gear", size: "20" },
		}}
		dataValues={{}}
	/>
</NodeViewWrapper>
