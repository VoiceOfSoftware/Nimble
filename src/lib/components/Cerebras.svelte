<script>
	import { onMount } from "svelte";
	import { getContext } from "svelte";
	import { createEventHandlers } from "./eventHandlers.js";
	import { macroReplace } from "./dataPillMacros.js";
	import { tooltip } from "./Tippy";
	import Cerebras from "@cerebras/cerebras_cloud_sdk";

	let { layoutStructure, dataValues, myself, dataSourceName } = $props();

	const pageContext = getContext("pageContext");

	export function getLayout() {
		return layoutStructure;
	}
	export function getEvents() {
		return ["oninput", "onchange"];
	}
	export function getProps() {
		return [
			{ name: "placeholder", type: "string" },
			{ name: "disabled", type: "boolean" },
			{ name: "value", type: "string" },
			{ name: "type", type: "string" },
		];
	}
	export function getDataSourceName() {
		return dataSourceName;
	}

	const theClass = $derived(
		macroReplace(
			layoutStructure.props?.class,
			pageContext,
			dataValues,
			false,
		) +
			(layoutStructure.props?.background
				? ` bg-[url(${layoutStructure.props?.background})] bg-no-repeat bg-cover bg-center`
				: ""),
	);

	let cerebrasClient;
	onMount(async () => {
		cerebrasClient = new Cerebras({
			apiKey: "csk-2yp632j3xvcwfvywc5t23ry864emv9eyj54wck2kcer8ek6m",
		});
	});
	async function callCerebras() {
		if (!cerebrasClient) {
			alert("no cerebras client");
			return;
		}
		//	llama-4-scout-17b-16e-instruct
		//	qwen-3-235b-a22b
		const completionCreateResponse =
			await cerebrasClient.completions.create({
				prompt: layoutStructure.props.value,
				model: "llama-4-scout-17b-16e-instruct",
			});
		let answer = completionCreateResponse?.choices[0]?.text;
		console.log(answer);
		answer = answer.replace("```html", "");
		answer = answer.replace("```<|eot|>", "");
		console.log(answer);
		console.log(pageContext.namedPageObjects["output"].getLayout());
		pageContext.namedPageObjects["output"].getLayout()["props"]["value"] =
			answer;

		// await cerebrasClient.chat.completions.create({
		// 	messages: [
		// 		{ role: "user", content: layoutStructure.props.value },
		// 	],
		// 	model: "qwen-3-235b-a22b",
		// });

		// console.log(completionCreateResponse.choices[0].message.content);
	}
</script>

<input
	class={theClass}
	type={layoutStructure.props?.type || "input"}
	use:tooltip={{
		content: macroReplace(
			layoutStructure.props?.tooltip,
			pageContext,
			dataValues,
			false,
		),
	}}
	{...createEventHandlers(
		layoutStructure.actions,
		{ page: pageContext, data: dataValues, self: myself?.getLayout() },
		dataValues,
	)}
	draggable={layoutStructure.props?.draggable}
	disabled={layoutStructure.props?.disabled}
	placeholder={macroReplace(
		layoutStructure.props?.placeholder,
		pageContext,
		dataValues,
		false,
	)}
	bind:value={layoutStructure.props.value}
/>
<button class="btn btn-sm" onclick={() => callCerebras()}>AI</button>
