<script>
	import "../../../style.css";
	import { onMount, setContext } from "svelte";
	import { registerComponent } from "$lib/components/componentRegistry.js";
	import { page } from "$app/state";

	import Layout from "$lib/components/Layout.svelte";
	import Button from "$lib/components/Button.svelte";
	import AGGrid2 from "$lib/components/AGGrid2.svelte";
	import Calendar from "$lib/components/Calendar.svelte";
	import Chart from "$lib/components/Chart.svelte";
	import Choice from "$lib/components/Choice.svelte";
	import IFrame from "$lib/components/IFrame.svelte";
	import ImageUpload from "$lib/components/ImageUpload.svelte";
	import MapLibre from "$lib/components/MapLibre.svelte";
	import Container from "$lib/components/Container.svelte";
	import DynamicIcon from "$lib/components/DynamicIcon.svelte";
	import Image from "$lib/components/Image.svelte";
	import Input from "$lib/components/Input.svelte";
	import PDFViewer from "$lib/components/PDFViewer.svelte";
	import ScriptEditor from "$lib/components/ScriptEditor.svelte";
	import Text from "$lib/components/Text.svelte";
	import Timeline from "$lib/components/Timeline.svelte";
	import Named from "$lib/components/Named.svelte";
	import Repeater from "$lib/components/Repeater.svelte";
	import Slider from "$lib/components/Slider.svelte";
	import NimbleTipTap from "$lib/components/NimbleTipTap.svelte";
	import ThrelteCanvas from "$lib/components/Threlte/ThrelteCanvas.svelte";

	import { oneOfEachPageData } from "../../layouts.js";

	registerComponent("named", Named);
	registerComponent("3D", ThrelteCanvas);
	registerComponent("button", Button);
	registerComponent("calendar", Calendar);
	registerComponent("chart", Chart);
	registerComponent("choice", Choice);
	registerComponent("container", Container);
	registerComponent("icon", DynamicIcon);
	registerComponent("iframe", IFrame);
	registerComponent("image", Image);
	registerComponent("imageupload", ImageUpload);
	registerComponent("input", Input);
	registerComponent("map", MapLibre);
	registerComponent("pdf", PDFViewer);
	registerComponent("repeater", Repeater);
	registerComponent("richtext", NimbleTipTap);
	registerComponent("script", ScriptEditor);
	registerComponent("slider", Slider);
	registerComponent("table", AGGrid2);
	registerComponent("text", Text);
	registerComponent("timeline", Timeline);

	let pageContext = $state({
		editMode: false,
		floatingPanel: false,
		selectedLayout: null,
		selectedComponent: {},
		namedPageObjects: {},
		data: {
			recipes: [],
		},
	});
	setContext("pageContext", pageContext);

	let reactiveOneOfEachPageData = $state({
		type: "container",
		props: {},
		children: [
			{
				type: "button",
				props: {
					class: "btn btn-sm btn-accent",
					label: "Loading...",
					disabled: true,
				},
			},
		],
	});

	onMount(() => {
		fetch(`https://api.jsonbin.io/v3/qs/${layoutID}`)
			.then((response) => response.json())
			.then((j) => {
				reactiveOneOfEachPageData = j.record;
			});
	});

	let layoutID = $derived(page.params.id);
</script>

<div>
	<div class="h-screen overflow-y-auto">
		<Layout layoutStructure={reactiveOneOfEachPageData} />
	</div>
</div>
