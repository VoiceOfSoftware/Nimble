<script>
	let { items = [], activeTabValue=1 } = $props();

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
	{#each items as item}
		<li class={activeTabValue === item.value ? "active" : ""}>
			<span on:click={handleClick(item.value)}>{item.label}</span>
		</li>
	{/each}
</ul>

{#each items as item}
	{#if activeTabValue == item.value}
		<div class="box">
			<svelte:component this={item.component} />
		</div>
	{/if}
{/each}

<style>
	.box {
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #dee2e6;
		border-radius: 0 0 0.5rem 0.5rem;
		border-top: 0;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;
	}
	li {
		margin-bottom: -1px;
	}

	span {
		font-size: 10px;
		border: 1px solid transparent;
		border-top-left-radius: 0.75rem;
		border-top-right-radius: 0.75rem;
		display: block;
		padding: 0.1rem 1rem;
		cursor: pointer;
	}

	span:hover {
		border-color: #e9ecef #e9ecef #dee2e6;
	}

	li.active > span {
		color: #495057;
		background-color: #fff;
		border-color: #dee2e6 #dee2e6 #fff;
	}
</style>
