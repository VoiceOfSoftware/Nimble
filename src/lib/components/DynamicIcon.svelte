<script lang="ts">
	import Icon from "@iconify/svelte";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";

	let { layoutStructure, dataValues, dataSourceName } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		["onclick"];
	}
	export function getProps() {
		return [
			{ name: "icon", type: "string" },
			{ name: "color", type: "color" },
			{ name: "size", type: "string" },
		];
	}
	export function getDataSourceName() {
		return dataSourceName;
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
	const content = $derived(
		macroReplace(
			layoutStructure.props?.icon,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<Icon
	class={theClass}
	color={macroReplace(
		layoutStructure.props?.color,
		pageContext,
		dataValues,
		false,
	)}
	icon={content}
	width={macroReplace(
		layoutStructure.props?.size + "",
		pageContext,
		dataValues,
		false,
	)}
	height={macroReplace(
		layoutStructure.props?.size + "",
		pageContext,
		dataValues,
		false,
	)}
/>
