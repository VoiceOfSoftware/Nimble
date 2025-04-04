import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import InputComponent from './Input_TipTap.svelte';

export const InputExtension = Node.create({
	name: 'inputComponent',
	group: 'inline', // Changed from 'block' to 'inline'
	atom: true,
	draggable: true, // Still draggable, like an image
	inline: true, // Explicitly mark as inline

	addAttributes() {
		return {};
	},

	parseHTML() {
		return [{ tag: 'input-component', },];
	},

	renderHTML({ HTMLAttributes }) {
		return ['input-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(InputComponent);
	},
});