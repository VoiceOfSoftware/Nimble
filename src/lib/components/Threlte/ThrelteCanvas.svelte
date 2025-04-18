<script>
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
	import { VRButton } from "@threlte/xr";

	let { layoutStructure } = $props();

	export function getLayout() {
		return layoutStructure;
	}
	// export function getEvents() {
	// 	return ["onchange","oninput"];
	// }
	export function getProps() {
		return ["assetURL","rotation","scale"];
	}

	export function setDefaultProp(value) {
		layoutStructure.props.scale = value;
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
