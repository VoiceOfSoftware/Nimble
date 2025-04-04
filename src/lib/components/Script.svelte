<script>
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import CodeMirror from "svelte-codemirror-editor";
	import { javascript } from '@codemirror/lang-javascript';

	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");
	const content = $derived(
		macroReplace(
			layoutStructure.props?.content,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<CodeMirror
	value={layoutStructure.props?.script}
	lang={javascript()}
/>
