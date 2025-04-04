import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import CounterComponent from './Counter.svelte';

export const CounterExtension = Node.create({
	name: 'counterComponent',
	group: 'inline', // Changed from 'block' to 'inline'
	atom: true,
	draggable: true, // Still draggable, like an image
	inline: true, // Explicitly mark as inline

	addAttributes() {
		return {
			count: {
				default: 0,
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'counter-component',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['counter-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(CounterComponent);
	},
});