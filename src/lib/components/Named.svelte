<script>
	import { getContext } from "svelte";
	//	TODO: this is horrible; we need some better way of getting at sample data from layouts.js, perhaps passed down or else global store
	import { namedComponents } from "/src/routes/layouts.js";
	import Layout from "./Layout.svelte";
	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
</script>

<Layout
	layoutStructure={namedComponents[layoutStructure.props.name]}
	{dataValues}
/>
