<script>
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
	import { VRButton } from "@threlte/xr";

	let { layoutStructure, dataSourceName } = $props();

	export function getLayout() {
		return layoutStructure;
	}
	// export function getEvents() {
	// 	return ["onchange","oninput"];
	// }
	export function getProps() {
		return [
			{ name: "assetURL", type: "string" },
			{ name: "rotation", type: "string" },
			{ name: "scale", type: "string" },
		];
	}
	export function getDataSourceName() {
		return dataSourceName;
	}
</script>

<div class={layoutStructure?.props?.class}>
	<Canvas>
		<Scene
			gltfURL={layoutStructure.props?.assetURL}
			scale={layoutStructure.props?.scale}
			rotation={layoutStructure.props?.rotation}
		/>
	</Canvas>
</div>
