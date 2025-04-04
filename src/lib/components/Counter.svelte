<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import { NodeViewWrapper } from 'svelte-tiptap';

  let {
    node,
    updateAttributes,
  }: NodeViewProps = $props();

  const handleClick = () => {
    updateAttributes({
      count: node.attrs.count + 1,
    });
  };
</script>

<NodeViewWrapper class="counter-component" as="span">
  <button class="btn btn-xs btn-info" on:click={handleClick} type="button">
    Count: {node.attrs.count}
  </button>
</NodeViewWrapper>
