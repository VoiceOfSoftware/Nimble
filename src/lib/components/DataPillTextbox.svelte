<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor, Node, mergeAttributes } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import DataPillComponent from '$lib/DataPillComponent.svelte';
	import { SvelteNodeViewRenderer } from 'svelte-tiptap';

	let element;
	let editor;

	let { rawHTML = $bindable() } = $props();
	// let rawEditorMarkup, editorJSON;

	let editorJSON = $derived(editor.getJSON());
	let	rawEditorMarkup = $derived(editor.getHTML());

	function handleDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		const field = event.dataTransfer.getData('text');
		insertDataPill(field);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function convertDataPillsToText(html) {
		return html.replace(/<span[^>]*data-type="data-pill"[^>]*>([^<]*)<\/span>/g, '{$1}');
	}

	function preprocessContent(content) {
		// Replace {MacroName:FilterName} with HTML markup
		return content.replace(/{(.+?)}/g, (match, macroName) => {
			return `<span value=${macroName} data-type="data-pill" class="data-pill">${macroName}</span>`;
		});
	}

	// Custom node for data pills
	const DataPill = Node.create({
		name: 'dataPill',
		group: 'inline',
		inline: true,
		atom: true,

		addAttributes() {
			return {
				value: {
					default: ''
				}
			};
		},

		parseHTML() {
			return [
				{
					tag: 'span[data-type="data-pill"]'
				}
			];
		},

		renderHTML({ node, HTMLAttributes }) {
			return [
				'span',
				mergeAttributes(HTMLAttributes, {
					'data-type': 'data-pill',
					class: 'data-pill'
				}),
				node.attrs.value
			];
		},

		addNodeView() {
			return SvelteNodeViewRenderer(DataPillComponent);
		}
	});

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, DataPill],
			content: preprocessContent(rawHTML),
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose-base focus:outline-none'
				}
			}
		});
		// editorJSON = editor.getJSON();
		// rawEditorMarkup = editor.getHTML();

		editor.on('update', ({ editor }) => {
			// editorJSON = editor.getJSON();
			rawHTML = convertDataPillsToText(editor.getHTML());
			// rawEditorMarkup = editor.getHTML();
		});
	});

	function insertDataPill(fieldName) {
		editor
			.chain()
			.focus()
			.insertContent({
				type: 'dataPill',
				attrs: {
					value: fieldName
				}
			})
			.run();
	}

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div
	class="editor-wrapper w-full"
	on:drop={handleDrop}
	on:dragover={handleDragOver}
	role="textbox"
	tabindex="0"
>
	<div bind:this={element}></div>
</div>

<style>
	.editor-wrapper {
		margin: 0 auto;
	}

	:global(.ProseMirror p:first-child) {
		margin-top: -10px;
		margin-left: -10px;
	}

	:global(.ProseMirror) {
		padding: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		min-height: 150px;
	}

	:global(.ProseMirror:focus) {
		outline: 2px solid #4f46e5;
		outline-offset: -1px;
	}

	:global(.data-pill) {
		cursor: pointer;
		background-color: #e0f0ff;
		border-radius: 1rem;
		padding: 0.125rem 0.375rem;
		margin: 0 0.125rem;
		font-weight: 500;
		white-space: nowrap;
		border: 1px solid #b3d7ff;
	}
</style>
