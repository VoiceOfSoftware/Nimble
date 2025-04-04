<script>
	import { onMount } from "svelte";
	import { Editor } from "@tiptap/core";
	import StarterKit from "@tiptap/starter-kit";
	import Image from "@tiptap/extension-image";
	import { CounterExtension } from "./counterExtension.js";
	import { InputExtension } from "./inputExtension.js";
	import { LayoutExtension } from "./layoutExtension.js";

	let { content = $bindable(""), editing = false } = $props();

	let editor = null;
	// Reactive state for the various editor statuses
	let isBoldActive = $state(false);
	let isStrikeActive = $state(false);
	let isH1Active = $state(false);
	let isH2Active = $state(false);
	let isParagraphActive = $state(false);
	let isImageActive = $state(false);
	let element;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				CounterExtension,
				InputExtension,
				LayoutExtension,
				Image.configure({
					inline: true, // Configure inline images here
				}),
			],
			content: content,
			onTransaction: () => {
				// Update the reactive states whenever a transaction occurs
				isBoldActive = editor.isActive("bold");
				isStrikeActive = editor.isActive("strike");
				isH1Active = editor.isActive("heading", { level: 1 });
				isH2Active = editor.isActive("heading", { level: 2 });
				isParagraphActive = editor.isActive("paragraph");
				isImageActive = editor.isActive("image");
			},
		});

		editor.on("update", ({ editor }) => {
			content = editor.getHTML();
		});

		return () => {
			if (editor) {
				editor.destroy();
				editor = null;
			}
		};
	});
</script>

{#if editing}
	<!-- Toolbar -->
	<button
		onclick={() => editor?.chain().focus().toggleBold().run()}
		class:active={isBoldActive}
	>
		Bold
	</button>

	<button
		onclick={() => editor?.chain().focus().toggleStrike().run()}
		class:active={isStrikeActive}
	>
		Strike
	</button>

	<button
		onclick={() =>
			editor?.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={isH1Active}
	>
		H1
	</button>
	<button
		onclick={() =>
			editor?.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={isH2Active}
	>
		H2
	</button>
	<button
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={isParagraphActive}
	>
		P
	</button>
	<button
		onclick={() =>
			editor
				?.chain()
				.focus()
				.setImage({
					src: "https://media.formula1.com/image/upload/f_auto,c_limit,w_112,q_auto/nwp-navigation/f1-tv-logo",
				})
				.run()}
		class:active={isImageActive}
	>
		Image
	</button>
{/if}

<div bind:this={element} />

<style>
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

	button.active {
		background: black;
		color: white;
	}
</style>
