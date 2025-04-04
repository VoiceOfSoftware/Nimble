<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	let { layoutStructure, dataValues } = $props();
	let content = $state(layoutStructure.props.content); // Local reactive variable

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	// Sync changes between content and layoutStructure.props.content
	$effect(() => {
		layoutStructure.props.content = content; // Update the prop when content changes
		return () => {
			// Optional cleanup (if needed)
		};
	});

	// Update local content when the prop changes externally
	$effect(() => {
		content = layoutStructure.props.content; // Update local content when prop changes
	});
	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);
</script>

<input
	class={theClass}
	draggable={layoutStructure.draggable}
	disabled={layoutStructure.disabled}
	type="text"
	placeholder={macroReplace(
		layoutStructure.props?.placeholder,
		pageContext,
		dataValues,
		false,
	)}
	bind:value={content}
/>
