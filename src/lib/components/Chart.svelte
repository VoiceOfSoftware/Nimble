<script>
	import { onMount } from "svelte";
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");
	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return [];
	}
	export function getProps() {
		return [
			{ name: "dataSource", type: "dataSource" },
			{ name: "type", type: "choice", choices: ["area", "bar", "bubble", "candlestick", "donut", "heatmap", "line", "pie", "scatter", "treemap"] },
			{ name: "title", type: "string" },
			{ name: "color", type: "color" },
			{ name: "xColumn", type: "string" },
			{ name: "yColumn", type: "string" },
		];
	}

	export let layoutStructure;

	let chart;
	function apexChart(element) {
		const chartOptions = {
			chart: {
				type: layoutStructure.props?.type,
				toolbar: {
					show: false,
				},
			},
			title: {
				text: layoutStructure.props?.title,
				align: "left",
			},
			colors: [layoutStructure.props?.color],
			series: [
				{
					data: pageContext.data[
						layoutStructure.props?.dataSource
					].map((item) => ({
						x: item[layoutStructure.props?.xColumn],
						y: item[layoutStructure.props?.yColumn],
					})),
				},
			],
		};
		chart = new ApexCharts(element, chartOptions);
		chart.render();
	}

	let ApexCharts;

	onMount(async () => {
		ApexCharts = (await import("apexcharts")).default;
	});

	$: if (chart && layoutStructure.props?.title) {
		chart.updateOptions({
			chart: {
				type: layoutStructure.props?.type,
			},
			title: {
				text: layoutStructure.props?.title,
			},
			colors: [layoutStructure.props?.color],
			series: [
				{
					data: pageContext.data[
						layoutStructure.props?.dataSource
					].map((item) => ({
						x: item[layoutStructure.props?.xColumn],
						y: item[layoutStructure.props?.yColumn],
					})),
				},
			],
		});
	}
</script>

{#if ApexCharts}
	<div use:apexChart class={layoutStructure?.props?.class} />
{/if}
