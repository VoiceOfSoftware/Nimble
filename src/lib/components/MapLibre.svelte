<script lang="ts">
	import { getContext } from "svelte";
	import MapLibre from "svelte-maplibre/MapLibre.svelte";
	import Marker from "svelte-maplibre/Marker.svelte";
	import Popup from "svelte-maplibre/Popup.svelte";
	import Layout from "./Layout.svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import {
		RasterTileSource,
		RasterLayer,
		GeoJSON,
		FillExtrusionLayer,
	} from "svelte-maplibre";
	import DynamicIcon from "./DynamicIcon.svelte";

	let { layoutStructure, dataValues } = $props();

	const pageContext = getContext("pageContext");

	const theClass = $derived(
		macroReplace(layoutStructure.class, pageContext, dataValues, false) +
			(layoutStructure.background
				? ` bg-[url(${layoutStructure.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	const markers = pageContext.data[layoutStructure.dataSource];
</script>

<div class={theClass}>
	<MapLibre
		style={layoutStructure.props?.tileLayer}
		class="relative aspect-[9/16] max-h-[70vh] w-full sm:aspect-video sm:max-h-full"
		standardControls
		zoom={layoutStructure.props?.zoom}
		center={layoutStructure.props?.center}
	>
		{#if layoutStructure.props?.rasterLayer}
			<RasterTileSource
				tiles={[layoutStructure.props?.rasterLayer]}
				tileSize={256}
			>
				<RasterLayer paint={{}} />
			</RasterTileSource>
		{/if}

		{#each markers as marker (marker.label)}
			<Marker lngLat={marker.lngLat}>
				<DynamicIcon
					layoutStructure={{
						props: {
							color: layoutStructure.props?.markerColor
								? layoutStructure.props?.markerColor
								: "blue",
							icon: layoutStructure.props?.markerIcon
								? layoutStructure.props?.markerIcon
								: "mdi:location",
							size:  layoutStructure.props?.markerSize
								? layoutStructure.props?.markerSize
								: 36,
						},
					}}
				/>
				{#if layoutStructure.props?.popup}
					<Popup openOn="hover" offset={[0, -10]}>
						<div class="text-lg font-bold">{marker.name}</div>
						<div class="w-64">
							<Layout
								layoutStructure={JSON.parse(
									layoutStructure.props?.popup,
								)}
								dataValues={marker}
								dataSources={[]}
							/>
						</div>
					</Popup>
				{/if}
			</Marker>
		{/each}
	</MapLibre>
</div>
