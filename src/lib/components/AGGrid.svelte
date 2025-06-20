<script>
	import { onMount, onDestroy } from "svelte";
	import { createGrid } from "ag-grid-community";
	import { createColumnsFromFirstRow } from "./AGGridHelpers";
	import "ag-grid-community/styles/ag-grid.css"; // Core CSS
	import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme CSS

	let { rowData, rowSelected = $bindable((event) => {}) } = $props();

	let gridApi;
	let domNode;

	function setTableData() {
		gridApi.setGridOption("columnDefs", createColumnsFromFirstRow(rowData));
		gridApi.setGridOption("rowSelection", "singleRow");
		gridApi.setGridOption("rowData", rowData);
		gridApi.setGridOption("onRowClicked", (event) => {
			rowSelected(event.node.data);
		});
		gridApi.setGridOption("onRowDoubleClicked", (event) => {
			rowSelected(event.node.data);
		});
		gridApi.setGridOption("onCellKeyDown", (event) => {
			rowSelected(event.node.data);
		});

		gridApi.setGridOption("onCellFocused", (event) => {
			if (event.rowIndex !== null) {
				const rowNode = event.api.getRowNode(event.rowIndex);
				if (rowNode) {
					rowNode.setSelected(true); // Select the row
				}
			}
		});
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
