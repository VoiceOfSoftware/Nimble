<script>
	import { getContext } from "svelte";
	import { onMount, onDestroy, tick } from "svelte";
	import { macroReplace } from "./dataPillMacros.js";
	import { Grid } from "ag-grid-community";
	import {
		createColumnsFromFirstRow,
		createColumnsFromSchema,
	} from "$lib/components/AGGridHelpers";

	let {
		layoutStructure,
		dataValues,
		rowSelected = $bindable((event) => {}),
		rowDoubleClicked = $bindable((event) => {}),
		columnChanged = $bindable((guid, columnName, newValue) => {}),
	} = $props();

	const pageContext = getContext("pageContext");

	let gridContainer;
	let gridApi;
	let columnApi;
	let gridInstance;

	// Initialize the grid
	async function initializeGrid() {
		const mergedGridOptions = {
			columnDefs: schema
				? createColumnsFromSchema(schema)
				: createColumnsFromFirstRow(rowData),
			rowData,
			enableSorting,
			pagination,
			domLayout,
			// Add row selection configuration
			rowSelection: "multiple", // or 'multiple' for multi-row selection
			onGridReady: (params) => {
				gridApi = params.api;
				columnApi = params.columnApi;

				// Call user-provided onGridReady if it exists
				if (gridOptions.onGridReady) {
					gridOptions.onGridReady(params);
				}
				repaintGrid();
			},
			onRowDoubleClicked: (event) => {
				rowDoubleClicked(event.data);
			},
			// Add row selection event handler
			onRowSelected: (event) => {
				if (event.node.isSelected()) {
					const selectedRow = event.data;
					rowSelected(selectedRow);
				}
			},
			onCellValueChanged: (event) => {
				const changedColumn = event.column;
				columnChanged(
					event.data[uniqueColumn],
					changedColumn.getId(),
					event.data[changedColumn.getId()],
				);
			},
			...gridOptions,
		};

		await tick();
		gridInstance = new Grid(gridContainer, mergedGridOptions);
		return gridInstance;
	}

	function repaintGrid() {
		gridApi.setGridOption(
			"columnDefs",
			schema
				? createColumnsFromSchema(schema)
				: createColumnsFromFirstRow(rowData),
		);
		gridApi.setGridOption("rowData", rowData);
		autoSizeAll(false);
	}
	// Handle updates to rowData
	$effect(() => {
		if ((rowData || schema) && gridApi) {
			repaintGrid();
		}
	});

	function autoSizeAll(skipHeader) {
		const allColumnIds = [];
		gridApi.getColumns().forEach((column) => {
			allColumnIds.push(column.getId());
		});

		gridApi.autoSizeColumns(allColumnIds, skipHeader);
	}

	// Component lifecycle
	onMount(async () => {
		await initializeGrid();
	});

	onDestroy(() => {
		if (gridInstance) {
			gridInstance.destroy();
		}
	});

	const theClass = $derived(
		macroReplace(layoutStructure.props?.class, pageContext, dataValues, false) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	let rowData = $derived(pageContext.data[layoutStructure.props?.dataSource]);

	let schema = null;
	let enableSorting = undefined;
	let pagination = false;
	let domLayout = undefined;
	let gridOptions = {};
</script>

<div
	bind:this={gridContainer}
	class='ag-theme-quartz'
	style="width: 100%; height: 500px;"
></div>

<style>
	div {
		display: block;
	}
</style>
