import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import Layout_TipTap from './Layout_TipTap.svelte';

export const LayoutExtension = Node.create({
	name: 'layoutComponent',
	group: 'inline', // Changed from 'block' to 'inline'
	atom: true,
	draggable: true, // Still draggable, like an image
	inline: true, // Explicitly mark as inline

	addAttributes() {
		return {};
	},

	parseHTML() {
		return [{ tag: 'layout-component', },];
	},

	renderHTML({ HTMLAttributes }) {
		return ['layout-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(Layout_TipTap);
	},
});