<script lang="ts">
	import Icon from "@iconify/svelte";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";

	let { layoutStructure, dataValues, dataSourceName } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onclick"];
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

<span
	class={theClass}
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			pageContext,
			dataValues,
			false,
		),
	}}
>
	<Icon
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
</span>
