<script>
	import { getContext } from "svelte";
	import { performAction } from "./dataPillMacros";
	import { macroReplace } from "./dataPillMacros.js";
	import AgGrid from "./AGGrid.svelte";

	let { layoutStructure, dataValues, myself, dataSourceName } = $props();

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["onrowselected"];
	}
	export function getProps() {
		return [
			{ name: "dataSource", type: "dataSource" },
			{ name: "value", type: "string" },
		];
	}
	export function getDataSourceName() {
		return dataSourceName;
	}

	const dataSource = $derived(
		macroReplace(
			layoutStructure.props?.dataSource,
			pageContext,
			dataValues,
			false,
		),
	);
	let rowData = pageContext.data[dataSource];

	function handleRowSelected(rowData) {
		layoutStructure.props.value = rowData;
		performAction(
			layoutStructure.actions["onrowselected"],
			{ page: pageContext, data: rowData, self: myself.getLayout() },
			dataValues,
		);
	}
</script>

<AgGrid {rowData} rowSelected={(rowData) => handleRowSelected(rowData)} />
