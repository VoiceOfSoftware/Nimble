<script>
	import { getContext } from "svelte";
	import { performAction } from "./dataPillMacros";
	import AgGrid from "./AGGrid.svelte";

	let { layoutStructure, dataValues, myself } = $props();

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

	let rowData = $derived(pageContext.data[layoutStructure.props?.dataSource]);

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
