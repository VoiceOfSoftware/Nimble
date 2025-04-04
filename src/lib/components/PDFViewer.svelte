<!-- src/lib/PdfViewer.svelte -->
<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { loadAdobe, getUniqueId } from "./adobeLoader.js";

	let {
		layoutStructure,
		fileName = "Document.pdf",
		width = "100%",
		height = "500px",
	} = $props();

	let divId = getUniqueId();
	let viewer = null;
	let isViewerReady = $state(false);

	async function initializeViewer() {
		if (!browser) return;

		if (viewer && typeof viewer.destroy === "function") {
			viewer.destroy();
			console.log("Existing viewer destroyed");
		}

		const div = document.getElementById(divId);
		if (div) div.innerHTML = "";

		try {
			await loadAdobe();
			if (typeof window.AdobeDC === "undefined") {
				console.error("AdobeDC is undefined");
				return;
			}

			viewer = new window.AdobeDC.View({
				clientId: "485df48fec2440939b889168b1dbbfad", // Replace with your actual Adobe client ID
				divId: divId,
			});
			console.log("AdobeDC Viewer initialized:", viewer);
			isViewerReady = true;
			console.log("Viewer marked as ready");
		} catch (error) {
			console.error("Error initializing viewer:", error.message);
		}
	}

	onMount(async () => {
		await initializeViewer();
	});

	// Reinitialize viewer when url changes
	$effect(() => {
		if (!browser) return;

		console.log("Effect running with URL:", layoutStructure.props?.url);

		if (layoutStructure.props?.url) {
			// Reinitialize viewer on URL change
			initializeViewer().then(() => {
				if (isViewerReady && viewer && layoutStructure.props?.url) {
					try {
						viewer.previewFile({
							content: { location: { url: layoutStructure.props?.url } },
							metaData: { fileName: fileName },
						});
						console.log("Previewed PDF:", layoutStructure.props?.url);
					} catch (error) {
						console.error("Error previewing PDF:", error.message);
					}
				}
			});
		}
	});

	onDestroy(() => {
		if (!browser) return;

		if (viewer && typeof viewer.destroy === "function") {
			try {
				viewer.destroy();
				console.log("Viewer destroyed successfully");
			} catch (error) {
				console.error("Error destroying viewer:", error.message);
			}
		}
		viewer = null;
		isViewerReady = false;
		const div = document.getElementById(divId);
		if (div) div.innerHTML = "";
	});
</script>

<div
	id={divId}
	style="width: {width}; height: {height}; border: 1px solid #ccc;"
></div>
