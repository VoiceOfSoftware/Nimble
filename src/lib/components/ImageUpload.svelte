<script>
	import { CldUploadButton } from "svelte-cloudinary";
	import { getContext } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import { performAction } from "./dataPillMacros";

	let { layoutStructure, dataValues, myself, dataSourceName } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ['onupload'];
	}
	export function getProps() {
		return [
			{ name: "label", type: "string" },
			{ name: "cloudinaryPreset", type: "string" },
			{ name: "cloudinaryFolder", type: "string" },
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
	const label = $derived(
		macroReplace(
			layoutStructure.props?.label,
			pageContext,
			dataValues,
			false,
		),
	);
</script>

<CldUploadButton
	class={theClass}
	draggable={layoutStructure.props?.draggable}
	uploadPreset={macroReplace(
		layoutStructure.props?.cloudinaryPreset,
		pageContext,
		dataValues,
		false,
	)}
	options={{
		folder: macroReplace(
			layoutStructure.props?.cloudinaryFolder,
			pageContext,
			dataValues,
			false,
		),
		sources: ["local"],
		multiple: true,
	}}
	onSuccess={(result) => performAction(layoutStructure.actions['onupload'], pageContext, dataValues)}
>
	{label}
</CldUploadButton>
