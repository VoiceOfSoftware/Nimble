<script>
	import "../style.css";
	import { setContext } from "svelte";
	import { registerComponent } from "$lib/components/componentRegistry.js";
	import Icon from "@iconify/svelte";
	import { PaneGroup, Pane, PaneResizer } from "paneforge";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import TweakPanel from "$lib/components/TweakPanel.svelte";
	import {
		listOfComponents,
		componentLibraryLayout,
	} from "$lib/components/componentLibrary";

	import Layout from "$lib/components/Layout.svelte";
	import Button from "$lib/components/Button.svelte";
	import AGGrid from "$lib/components/AGGrid.svelte";
	import AGGrid2 from "$lib/components/AGGrid2.svelte";
	import Calendar from "$lib/components/Calendar.svelte";
	import Chart from "$lib/components/Chart.svelte";
	import Choice from "$lib/components/Choice.svelte";
	import IFrame from "$lib/components/IFrame.svelte";
	import MapLibre from "$lib/components/MapLibre.svelte";
	import Container from "$lib/components/Container.svelte";
	import DynamicIcon from "$lib/components/DynamicIcon.svelte";
	import Image from "$lib/components/Image.svelte";
	import Input from "$lib/components/Input.svelte";
	import PDFViewer from "$lib/components/PDFViewer.svelte";
	import Script from "$lib/components/Script.svelte";
	import Text from "$lib/components/Text.svelte";
	import Timeline from "$lib/components/Timeline.svelte";
	import Named from "$lib/components/Named.svelte";
	import Repeater from "$lib/components/Repeater.svelte";
	import Slider from "$lib/components/Slider.svelte";
	import NimbleTipTap from "$lib/components/NimbleTipTap.svelte";
	import ThrelteCanvas from "$lib/components/Threlte/ThrelteCanvas.svelte";

	import {
		headerLayout,
		oneOfEachPageData,
		oneOfEachRepeaterData,
		horizontalIcons,
		f1,
		named,
		repeater,
	} from "./layouts.js";
	import EditorRegion from "$lib/components/EditorRegion.svelte";

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
	registerComponent("input", Input);
	registerComponent("map", MapLibre);
	registerComponent("pdf", PDFViewer);
	registerComponent("repeater", Repeater);
	registerComponent("richtext", NimbleTipTap);
	registerComponent("script", Script);
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
			endpoint1: "/blog",
			endpoint2: "/tutorial/svelte/welcome-to-svelte",
			exampleIcon: {
				color: "red",
				shape: "mdi:gear",
				size: 32,
			},
			exampleButton: {
				label: "B-label",
				color: "btn-warning",
			},
			exampleImage: {
				src: "https://media.formula1.com/image/upload/f_auto,c_limit,w_112,q_auto/nwp-navigation/f1-tv-logo",
			},
			exampleInput: {
				placeholder: "type here",
			},
			exampleText: {
				content: "text",
			},
			exampleSlider: {
				min: 0,
				max: 10,
			},
			exampleNestedJSON: {
				photo: {
					inner: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/ferrari.png",
				},
			},
			f1Driver1: 'Eugene\'s "F1"',
			chartData: [
				{ x: "hello", y: 12 },
				{ x: "there", y: 34 },
			],
			recipes: [],
			calendarEvents: [
				{
					start: "2025-04-20 19:00:00",
					end: "2025-04-20 20:00:00",
					shortdescription:
						"NCPS Peregrine Falcon Photography Workshop",
					description:
						"Zoom meeting for the NCPS Peregrine Falcon Photography Workshop with Sandy Zelasko and Dave Clark. You must be a current member and must register to receive the Zoom link. Register by emailing workshops@nc-photo.org. Join the meeting to learn about our local peregrine falcon population, how to photograph them and where and when to go. Find more information in the April Lens Paper.",
					speaker: "Sandy Zelasko",
					type: "clubactivity",
					location:
						"Register at workshops@nc-photo.org to receive the Zoom meeting link",
					id: 421,
					icon: "bike",
				},
				{
					start: "2025-04-23 18:30:00",
					end: "2025-04-23 21:00:00",
					shortdescription: "Lake Hodges",
					description:
						"For over 30 years I've been a resident of Del Dios on the banks of Lake Hodge and have been involved in the Lake since my arrival, first as the concessionaire and now as a photography guide with my company Lake Hodges Photo Tours.\u00a0My presentation will highlight the Grebe population situation, the new dam construction, Kayaking for the Birds program, the water levels and the future, and how this relates to photography.",
					speaker: "Brian Caldwell",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 284,
					icon: "car",
				},
				{
					start: "2025-05-28 18:30:00",
					end: "2025-05-28 21:00:00",
					shortdescription: "A Day at the Beach",
					description: "",
					speaker: "Mark Drawbridge",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 283,
					icon: "bus",
				},
				{
					start: "2025-06-25 00:00:00",
					end: "2025-06-25 21:00:00",
					shortdescription: "",
					description: "",
					speaker: "William Bay",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 281,
					icon: "train",
				},
				{
					start: "2025-07-23 18:30:00",
					end: "2025-07-23 21:00:00",
					shortdescription: "",
					description: "",
					speaker: "",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 285,
				},
				{
					start: "2025-08-27 00:00:00",
					end: "2025-08-27 21:00:00",
					shortdescription: "Birds",
					description: "",
					speaker: "Barbara Swanson",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 282,
				},
				{
					start: "2025-09-24 18:30:00",
					end: "2025-09-24 21:00:00",
					shortdescription: "",
					description: "",
					speaker: "",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 286,
				},
				{
					start: "2025-10-22 18:30:00",
					end: "2025-10-22 21:00:00",
					shortdescription: "",
					description: "",
					speaker: "",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 287,
				},
				{
					start: "2025-11-19 18:30:00",
					end: "2025-11-19 21:00:00",
					shortdescription: "",
					description: "",
					speaker: "",
					location:
						"Carlsbad Senior Center at 799 Pine Ave, Carlsbad, CA 92008",
					type: "monthlymeeting",
					id: 288,
				},
			],
			componentLibrary: listOfComponents,
			mapMarkers: [
				{
					lngLat: [-122.2993, 47.446399999999997],
					name: "Seattle",
					label: "SEA",
				},
				{
					lngLat: [-159.34379999999999, 21.9788],
					name: "Lihue",
					label: "LIH",
				},
				{
					lngLat: [2.5478999999999998, 49.009700000000002],
					name: "Paris Charles de Gaulle",
					label: "CDG",
				},
				{
					lngLat: [-58.534799999999997, -34.82],
					name: "Ministro Pistarini",
					label: "EZE",
				},
				{
					lngLat: [18.6021, -33.971499999999999],
					name: "Cape Town",
					label: "CPT",
				},
				{
					lngLat: [121.01649999999999, 14.5123],
					name: "Ninoy Aquino",
					label: "MNL",
				},
			],
			names: [
				{ name: "Gilligan", color: "btn-error" },
				{ name: "Professor", color: "btn-error", navigate: "/blog" },
				{
					name: "Maryanne",
					color: "btn-accent",
					navigate: "/tutorial/svelte/welcome-to-svelte",
				},
				{ name: "Ginger", color: "btn-warning" },
			],
			addresses: [
				{ name: "221B Baker Street" },
				{ name: "124 Conch Street" },
			],
			ncpsEvents: [],
			examples: [
				{
					iconColor: "red",
					iconShape: "mdi:gear",
					iconSize: 32,
					buttonLabel: "B-label",
					exampleImage:
						"https://media.formula1.com/image/upload/f_auto,c_limit,w_112,q_auto/nwp-navigation/f1-tv-logo",
					hint: "type here",
					text: "text",
				},
			],
		},
	});
	setContext("pageContext", pageContext);

	//	Check for option key pressed, so we don't have to manually click the [x] Show Structure checkbox
	let isAltPressed = false;
	//	This extra logic prevents triggering when the user presses altKey in compbination with any other key
	//	...this solves the problem of accidental triggering when combos are pressed (e.g. Hammerspoon on MacOS that uses cmd+option+ctrl to move windows)
	function handleKeyDown(event) {
		// If it's the Alt key, only set the flag if NO other modifier is pressed
		if (event.key === "Alt") {
			isAltPressed = !(event.metaKey || event.ctrlKey || event.shiftKey);
			event.preventDefault();
		} else {
			// If any other key is pressed while Alt is down, clear the flag
			isAltPressed = false;
		}
	}

	function handleKeyUp(event) {
		//	Only allow admins to press the "edit design" keyboard button
		// if (localData.user?.roles?.includes("~admin~")) {
		if (event.key === "Alt" && isAltPressed) {
			// Only toggle if Alt was pressed alone (double-check no other modifiers)
			if (!(event.metaKey || event.ctrlKey || event.shiftKey)) {
				pageContext.editMode = !pageContext.editMode;
			}
		}
		// Reset the flag when Alt is released
		if (event.key === "Alt") {
			isAltPressed = false;
		}
		// }
	}

	let reactiveHorizontalIcons = $state(horizontalIcons);
	let reactiveNamed = $state(named);
	let reactiveF1 = $state(f1);
	let reactiveRepeater = $state(repeater);
	let reactiveOneOfEachPageData = $state(oneOfEachPageData);
	let reactiveOneOfEachRepeaterData = $state(oneOfEachRepeaterData);

	async function sampleFetch() {
		const r = await fetch("https://dummyjson.com/recipes");
		const j = await r.json();
		console.log(j);
		pageContext.data.recipes = j.recipes;
	}

	async function sampleClear() {
		pageContext.data.ncpsEvents = [];
	}
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<div>
	{#if pageContext.floatingPanel}
		<TweakPanel />
	{/if}
	<label>
		<input type="checkbox" bind:checked={pageContext.editMode} />
		Edit Mode
	</label>
	<label class="ml-2">
		<input type="checkbox" bind:checked={pageContext.floatingPanel} />
		Floating Property Panel
	</label>
	<button class="btn btn-sm ml-2" onclick={() => sampleFetch()}
		>Fetch Example Data</button
	>
	<button class="btn btn-sm" onclick={() => sampleClear()}
		>Clear Example Data</button
	>

	<hr />

	<PaneGroup direction="horizontal" class="w-full" autoSaveId="mainLayout">
		<Pane defaultSize={10} class="mt-2 ml-2">
			<div class="h-screen overflow-y-auto">
				<EditorRegion editMode={false}>
					<Layout layoutStructure={componentLibraryLayout} />
				</EditorRegion>
			</div>
		</Pane>
		<PaneResizer
			class="bg-background relative flex w-2 items-center justify-center"
		>
			<div
				class="bg-brand z-10 flex h-7 w-3 items-center justify-center rounded-sm border"
			>
				<Icon icon="mdi-light:dots-vertical" width={30} height={30} />
			</div>
		</PaneResizer>
		<Pane defaultSize={50}>
			<div class="h-screen overflow-y-auto">
				One of each component type:<Layout
					layoutStructure={reactiveOneOfEachPageData}
				/>
			</div>
		</Pane>
		<PaneResizer
			class="bg-background relative flex w-2 items-center justify-center"
		>
			<div
				class="bg-brand z-10 flex h-7 w-3 items-center justify-center rounded-sm border"
			>
				<Icon icon="mdi-light:dots-vertical" height="30" />
			</div>
		</PaneResizer>
		<Pane defaultSize={10}>
			<div class="h-screen overflow-y-auto">
				<Sidebar />
			</div>
		</Pane>
	</PaneGroup>

	<!-- One of each (repeater data):<Layout
		layoutStructure={reactiveOneOfEachRepeaterData}
	/>
	<Layout layoutStructure={reactiveHorizontalIcons} />
	Repeater:<Layout layoutStructure={reactiveRepeater} />
	Named:<Layout layoutStructure={reactiveNamed} /> -->
</div>
