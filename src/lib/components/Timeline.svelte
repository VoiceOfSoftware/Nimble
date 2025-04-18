<script>
	import { getContext } from "svelte";
	import Icon from "@iconify/svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import Layout from "./Layout.svelte";

	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return ["icon", "iconColor", "nodeWidth", "timeField", "itemLayout"];
	}

	let nodeWidth = $derived(layoutStructure.props?.nodeWidth || 64);
	let widthClass = $derived(nodeWidth ? "w-" + nodeWidth : "");
	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	let rowData = $derived(pageContext.data[layoutStructure.dataSource]);
</script>

<ul class={theClass}>
	{#each rowData as row, index (row)}
		<li>
			<div class="timeline-middle">
				<Icon
					color={layoutStructure.props?.iconColor || "blue"}
					icon={macroReplace(
						layoutStructure.props?.icon,
						pageContext,
						row,
						false,
					) || "mdi:location"}
					width={layoutStructure.props?.iconSize || 36}
				/>
			</div>
			<div
				class={index % 2 === 0
					? widthClass + " timeline-start mb-10 md:text-end"
					: widthClass + " timeline-end mb-10 md:text-start"}
			>
				<Layout
					layoutStructure={JSON.parse(
						layoutStructure.props?.itemLayout,
					)}
					dataValues={row}
				/>
			</div>
			<hr />
		</li>
	{/each}
</ul>
