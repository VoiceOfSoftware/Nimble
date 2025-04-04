<script>
	import { onMount } from "svelte";
	import { getContext } from "svelte";

	const pageContext = getContext("pageContext");

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
					data: pageContext.data[layoutStructure.dataSource].map(
						(item) => ({
							x: item[layoutStructure.props?.xColumn],
							y: item[layoutStructure.props?.yColumn],
						}),
					),
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
					data: pageContext.data[layoutStructure.dataSource].map(
						(item) => ({
							x: item[layoutStructure.props?.xColumn],
							y: item[layoutStructure.props?.yColumn],
						}),
					),
				},
			],
		});
	}
</script>

{#if ApexCharts}
	<div use:apexChart class={layoutStructure?.class} />
{/if}
