<script lang="ts">
	import { getContext } from "svelte";
	import Modal from "./Modal.svelte";
	import AgGrid from "./AGGrid.svelte";
	import {
		analyzeJSON,
		translateAnalyzedSchemaToNimbleSchema,
	} from "./JSONAnalyzer.js";

	let { index, notifyDropped } = $props();

	let editorElement: HTMLElement;

	let dragEntered = $state(false);
	function dropped(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		dragEntered = false;

		if (!event.dataTransfer) return;

		const availableTypes = event.dataTransfer.types;
		console.log("Available data types:", availableTypes);

		availableTypes.forEach((dragType) => {
			// alert(dragType+': '+event.dataTransfer.getData(dragType));
		});
		let urlList = event.dataTransfer.getData("text/uri-list");
		let plainText = event.dataTransfer.getData("text/plain");
		if (urlList) {
			// alert("You dropped a URL; let's see what's in it. " + urlList);
			getUrlContentType(urlList).then((result) => {
				// alert(JSON.stringify(result));
				if (result.type == "image") {
					alert("It's an image! " + urlList);
					notifyDropped(index, {
						type: "image",
						props: {
							class: "w-64",
							src: urlList,
						},
					});
				}
				if (result.type == "json") {
					// alert("It's a JSON data source! " + urlList);
					previewRESTDataProvider(urlList);
				}
			});
		} else if (plainText) {
			//	Determine if the text that was dropped is valid JSON
			try {
				JSON.parse(plainText);
				// alert('You dropped JSON!');
			} catch (e) {
				alert(plainText);
				let isValidURL = false;
				try {
					let testURL = new URL(plainText);
					isValidURL = true;
				} catch (e) {
					alert(e);
				}
				if (isValidURL) {
					alert(
						"You dropped a URL. I'll built an image component for you.",
					);
					notifyDropped(index, {
						type: "image",
						props: {
							src: plainText,
						},
					});
				} else {
					alert(
						"You dropped plaintext. I'll built a text component for you.",
					);
					notifyDropped(index, {
						type: "text",
						props: {
							value: plainText,
						},
					});
				}
			}
		}

		try {
			notifyDropped(
				index,
				JSON.parse(event.dataTransfer.getData("text/plain")),
			);
		} catch (err) {
			// alert(err);
		}
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
		dragEntered = true;
	}

	function dragLeave(event: DragEvent) {
		dragEntered = false;
	}

	async function getUrlContentType(url) {
		try {
			// First try a HEAD request to get content type without downloading full response
			const headResponse = await fetch(url, { method: "HEAD" });
			const contentType = headResponse.headers.get("content-type");

			console.log("contentType: " + contentType);
			// If HEAD request doesn't work, fall back to GET
			if (!contentType) {
				const getResponse = await fetch(url);
				const contentType = getResponse.headers.get("content-type");

				// For JSON and XML, try to validate and get more specific info
				if (contentType.includes("application/json")) {
					const data = await getResponse.json();
					return {
						type: "json",
						contentType,
						structure: getJsonStructure(data),
					};
				} else if (contentType.includes("xml")) {
					const text = await getResponse.text();
					return {
						type: "xml",
						contentType,
						rootElement: getRootElement(text),
					};
				}

				return {
					type: getGeneralType(contentType),
					contentType,
					size: getResponse.headers.get("content-length"),
				};
			}

			return {
				type: getGeneralType(contentType),
				contentType,
				size: headResponse.headers.get("content-length"),
			};
		} catch (error) {
			return {
				error: error.message,
				type: "unknown",
			};
		}
	}

	// Helper function to get general type from content-type header
	function getGeneralType(contentType) {
		if (contentType.includes("image/")) return "image";
		if (contentType.includes("application/json")) return "json";
		if (contentType.includes("text/html")) return "html";
		if (
			contentType.includes("text/xml") ||
			contentType.includes("application/xml")
		)
			return "xml";
		if (contentType.includes("text/")) return "text";
		if (contentType.includes("audio/")) return "audio";
		if (contentType.includes("video/")) return "video";
		if (contentType.includes("application/pdf")) return "pdf";
		return "other";
	}

	// Helper function to analyze JSON structure
	function getJsonStructure(data) {
		if (Array.isArray(data)) {
			return {
				type: "array",
				length: data.length,
				sampleKeys: data.length > 0 ? Object.keys(data[0]) : [],
			};
		}
		return {
			type: "object",
			keys: Object.keys(data),
		};
	}

	// Helper function to get XML root element
	function getRootElement(xmlText) {
		const match = xmlText.match(/<([^\s>]+)/);
		return match ? match[1] : "unknown";
	}

	const editLayout = getContext("editLayout");
	const pageContext = getContext("pageContext"); //	so we can save data to globals

	let dataProviderDefinition = $state();
	let dataProviderName = $state("");
	let dataProviderSchema = $state();
	let mappedPath = $state();
	function previewRESTDataProvider(dataProviderURL) {
		dataProviderDefinition = dataProviderURL;
		try {
			fetch(dataProviderURL, {})
				.then((r) => r.json())
				.then((results) => {
					let analysis = analyzeJSON(results);
					dataProviderSchema = translateAnalyzedSchemaToNimbleSchema(
						analysis?.meaningfulArray?.schema,
					);
					console.log(dataProviderSchema);

					let dataRows;
					if (analysis.meaningfulArray?.path) {
						dataRows = results[analysis.meaningfulArray?.path];
					} else {
						dataRows = results;
					}
					mappedPath = analysis.meaningfulArray?.path;

					columnDefs = createColumnsFromFirstRow(dataRows);
					agGridRowData = dataRows;
					showRESTDataProviderModal = true;
				});
		} catch (err) {
			alert(err);
		}
	}

	let showRESTDataProviderModal = $state(false);
	let agGridRowData = $state([]);
	let columnDefs = [];
	function createColumnsFromFirstRow(rows) {
		if (!rows) {
			return [];
		}
		columnDefs = [];
		Object.keys(rows[0]).forEach((element) => {
			columnDefs.push({
				field: element,
				sortable: true,
				resizable: true,
			});
		});
		return columnDefs;
	}

	function saveData() {
		pageContext.data[dataProviderName] = agGridRowData;
		showRESTDataProviderModal = false;
		notifyDropped(index, {
			type: "table",
			props: {
				dataSource: dataProviderName,
				editable: true,
			},
		});
	}
</script>

<div
	class={[
		dragEntered && "crasshatch min-w-5",
		"min-w-5 text-center text-xl font-bold",
	]}
	bind:this={editorElement}
	ondragleave={dragLeave}
	ondragover={dragOver}
	ondrop={dropped}
>
	+
</div>

{#if agGridRowData && showRESTDataProviderModal}
	<Modal bind:showModal={showRESTDataProviderModal}>
		{#snippet header()}
			<h3 class="text-lg font-bold">
				You dropped a URL for a data source; what would you like me to
				do?
			</h3>
		{/snippet}

		<p class="py-4">
			Here's a preview of the data you dropped. If you like, I can
			memorize it as a data provider, so you can use it as a source of
			data for your layouts.
		</p>

		<AgGrid rowData={agGridRowData} />
		<div class="modal-action w-full">
			<input type="hidden" name="type" value="REST" />
			<input
				type="hidden"
				name="definition"
				value={dataProviderDefinition}
			/>
			<input
				type="hidden"
				name="schema"
				value={JSON.stringify(dataProviderSchema)}
			/>
			<input
				type="hidden"
				name="map"
				value={JSON.stringify({
					childProps: {},
					topLevelArrayProp: mappedPath,
				})}
			/>
			Data source name:
			<input class="border" name="name" bind:value={dataProviderName} />
			<button
				disabled={dataProviderName.length == 0}
				class="btn btn-primary btn-sm"
				onclick={() => saveData()}>Save</button
			>
		</div>
	</Modal>
{/if}

<style>
	.crasshatch {
		cursor: crosshair;
		background: repeating-linear-gradient(
			45deg,
			#606dbc,
			#606dbc 10px,
			#465298 10px,
			#465298 20px
		);
	}
</style>
