<script lang="ts">
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";
	import { onMount } from "svelte";

	let { layoutStructure, dataValues, myself } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [];
	}

	const theClass = $derived(
		macroReplace(
			layoutStructure.props?.class,
			pageContext,
			dataValues,
			false,
		) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	let container = $state<HTMLDivElement>();
	let error = $state<string | null>(null);

	onMount(async () => {
		const loadRemote = async (retries = 3, delay = 1000): Promise<void> => {
			try {
				//@ts-ignore
				const app = await import("remote/remote-app2");
				new app.default({ target: container });
			} catch (e) {
				if (retries > 0) {
					await new Promise((resolve) => setTimeout(resolve, delay));
					return loadRemote(retries - 1, delay);
				}
				error = `Failed to load remote module: ${e.message}`;
				console.error(e);
			}
		};

		await loadRemote();

		return () => {
			container.innerHTML = "";
		};
	});
</script>

{#if error}
	<div class="error">{error}</div>
{:else}
	<div
		use:tooltip={{
			content: macroReplace(
				layoutStructure.props?.tooltip,
				pageContext,
				dataValues,
				false,
			),
		}}
		{...createEventHandlers(
			layoutStructure.actions,
			{ page: pageContext, data: dataValues, self: myself?.getLayout() },
			dataValues,
		)}
		class={theClass}
		bind:this={container}
	/>
{/if}
