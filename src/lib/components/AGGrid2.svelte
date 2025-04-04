<script>
	import { getContext } from "svelte";
	import { onMount, onDestroy } from "svelte";
	import { createGrid } from "ag-grid-community";
	import {
		createColumnsFromFirstRow,
		createColumnsFromSchema,
	} from "$lib/components/AGGridHelpers";
	import "ag-grid-community/styles/ag-grid.css"; // Core CSS
	import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme CSS

	let { layoutStructure, gridOptions } = $props();

	const pageContext = getContext("pageContext");

	let gridApi;
	let domNode;

	function setTableData() {
		gridApi.setGridOption("columnDefs", createColumnsFromFirstRow(rowData));
		gridApi.setGridOption("rowData", rowData);
		autoSizeAll(false);
	}

	onMount(() => {
		gridApi = createGrid(domNode, {});
		setTableData();
	});

	$effect(() => {
		if (gridApi && rowData) {
			setTableData();
		}
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});

	let rowData = $derived(pageContext.data[layoutStructure.dataSource]);

	function autoSizeAll(skipHeader) {
		const allColumnIds = [];
		gridApi.getColumns().forEach((column) => {
			allColumnIds.push(column.getId());
		});

		gridApi.autoSizeColumns(allColumnIds, skipHeader);
	}
</script>

<div
	bind:this={domNode}
	class="ag-theme-alpine"
	style="height: 500px; width: 100%;"
></div>
