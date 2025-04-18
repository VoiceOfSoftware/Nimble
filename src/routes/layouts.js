export const headerLayout =
{
	type: 'container',
	class: 'sticky top-0 left-0 w-full bg-white text-white shadow-lg z-50 flex items-center',
	children: [
		{
			type: 'icon',
			props: { color: 'green', icon: 'mdi:gear', size: '32' }
		},
		{
			type: 'button',
			class: 'btn btn-xs ml-auto',
			props: { label: '{page.exampleButton.label}' }
		},
		{
			type: 'icon',
			class: 'ml-auto',
			props: { color: 'red', icon: 'mdi:gear', size: '32' }
		},
	]
}

export const oneOfEachPageData = {
	type: 'container',
	class: '',
	draggable: false,
	children: [
		{
			type: 'container',
			class: 'mockup-phone scale-90',
			children: [
				{
					type: 'container',
					class: 'camera',
				},
				{
					"type": "container",
					"class": "display w-[440px] h-[844px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500",
					"children": [
						{ "type": "text", "class": "pt-2 pl-3 text-gray-100", "props": { "value": "safe area" } },
						{
							"type": "container", "class": "flex flex-wrap place-content-center gap-2",
							"children": [
								{
									"type": "button", "class": "btn btn-sm btn-primary",
									"tooltip": "Fetch recipes from API",
									"actions": { "onclick": { "type": "clientScript", "script": "fetch(\"https://dummyjson.com/recipes\")\n  .then(response => response.json())\n  .then(j => {\n    page.data.recipes = j.recipes;\n  });" } }, "props": { "label": "Get Recipes" }, "draggable": false
								}, {
									"type": "button", "class": "btn btn-sm btn-error",
									"tooltip": "Clear recipe data", "actions": { "onclick": { "type": "clientScript", "script": "page.data.recipes=[];" } },
									"props": { "label": "Clear Recipes" }, "draggable": false
								}]
						},
						{
							"type": "repeater", "class": "grid grid-cols-3 p-3", "dataSource": "recipes",
							"children": [
								{ "type": "text", "props": { "value": "" } },
								{
									"type": "container", "class": "",
									"children": [
										{ "type": "text", "class": "text-base-content text-center", "props": { "value": "{data.name}" } }, { "type": "image", "props": { "src": "{data.image}", "alt": "" }, "class": "rounded-full" }]
								}]
						}]
				}

			]
		},
		// {
		// 	type: '3D',
		// 	props: {
		// 		assetURL: 'https://corsproxy.io/?url=https://www.hulbertfamily.com/gltf/MaterialsVariantsShoe.glb',
		// 		scale: 30
		// 	}
		// },
		{
			type: 'button',
			class: 'btn btn-sm btn-info',
			actions: {
				onclick: {
					"type": "clientScript",
					"script": "document.documentElement.setAttribute('data-theme','dark')"
				}
			},
			props: { label: '🌙 Dark Mode' }
		},
		{
			type: 'button',
			class: 'btn btn-sm btn-info',
			actions: {
				onclick: {
					type: "clientScript",
					script: "document.documentElement.setAttribute('data-theme','light')"
				}
			},
			props: { label: '☀️ Light Mode' }
		},
		{
			type: 'calendar',
			class: '',
			dataSource: 'calendarEvents',
			props: {
				startTimeField: "start",
				endTimeField: "end",
				titleField: "shortdescription",
				idField: "id"
			}
		},
		{
			type: 'chart',
			dataSource: 'chartData',
			props: {
				title: 'Chart Title',
				xColumn: 'x',
				yColumn: 'y',
				color: '#009999',
				type: 'treemap',
			}
		},
		{
			type: 'choice',
			class: 'border border-gray-300 rounded',
			dataSource: 'names',
			props: {
				optionValueField: 'name',
				optionTitleField: 'name',
				value: 'Mary Ann'
			},
			actions: {
				onchange: {
					type: 'clientScript',
					script: 'alert("onchange "+self.props.value)'
				},
				oninput: {
					type: 'clientScript',
					script: 'alert("oninput "+self.props.value)'
				}
			}
		},
		{
			type: 'container',
			class: 'flex gap-2',
			children: [
				{
					type: 'text',
					class: 'border p-1 m-1 shadow-xl',
					props: {
						value: 'left'
					},
				},
				{
					type: 'text',
					class: 'border p-1 m-1 shadow-xl',
					props: {
						value: 'middle'
					},
				},
				{
					type: 'text',
					class: 'border p-1 m-1 shadow-xl',
					props: {
						value: 'right'
					},
				},
			]
		},
		{
			type: 'container',
			class: 'flex flex-col gap-2',
			children: [
				{
					type: 'text',
					class: 'border p-1 m-1 shadow',
					props: {
						value: 'top'
					},
				},
				{
					type: 'text',
					class: 'border p-1 m-1 shadow',
					props: {
						value: 'center'
					},
				},
				{
					type: 'text',
					class: 'border p-1 m-1 shadow',
					props: {
						value: 'bottom'
					},
				},
			]
		},
		{
			type: 'icon',
			props: { color: '{page.exampleIcon.color}', icon: 'game-icons:abstract-005', size: '{page.exampleIcon.size}' }
		},
		{
			type: 'iframe',
			class: 'w-full',
			props: {
				url: 'https://nc-photo.org',
			}
		},
		{
			type: 'image',
			class: 'w-96',
			background: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/united-kingdom-flag.png',
			props: {
				src: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/mclaren.png'
			}
		},
		{
			type: 'input',
			class: 'input input-sm input-bordered w-64',
			props: { placeholder: '{page.exampleInput.placeholder}', value: '' },
			actions: {
				onchange: {
					type: 'clientScript',
					script: 'alert("onchange "+self.value)'
				},
				oninput: {
					type: 'clientScript',
					script: 'alert("oninput "+self.value)'
				},
			}
		},
		// {
		// 	type: 'pdf',
		// 	props: {
		// 		url: 'https://pdfobject.com/pdf/sample.pdf'
		// 	}
		// },
		{
			type: 'map',
			dataSource: 'mapMarkers',
			props: {
				zoom: 2,
				rasterLayer: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
				tileLayer: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: [-117.165975, 33.088782],
				markerIcon: 'mdi:location',
				markerColor: 'blue',
				markerSize: 36
			}
		},
		{
			type: 'repeater',
			class: 'flex gap-2',
			dataSource: 'names',
			children: [
				{
					type: 'text',
					class: 'bg-accent text-xl p-1',
					props: {
						value: '{data.name}'
					}
				},
			]
		},
		{
			type: 'richtext',
			class: 'w-1/3',
			props: {
				value: 'This is <b>rich</b> editable text'
			}
		},
		{
			type: 'script',
			class: 'border w-full',
			props: {
				script: "// This is a syntax-aware Javascript editor\n\nlet a='hello';"
			}
		},
		{
			type: 'container',
			class: 'flex w-full',
			children: [
				{
					type: 'slider',
					class: 'w-96 range range-info',
					props: {
						min: '{page.exampleSlider.min}',
						max: '{page.exampleSlider.max}',
						value: 7
					},
					actions: {
						oninput: {
							type: "setProperty",
							objectName: "sliderValue",
							property: 'value',
							value: "{self.props.value}"
						}
					}
					,
				},
				{
					type: 'text',
					id: 'sliderValue',
					class: 'ml-2',
					props: {
						value: 'Move the slider!'
					}
				}
			]
		},
		{
			type: 'table',
			class: 'w-full',
			dataSource: 'calendarEvents',
			props: {}
		},
		{
			type: 'text',
			class: 'text-3xl font-thin font-sans',
			props: {
				value: 'This is <i>some</i> text, {page.f1Driver1}'
			}
		},
		{
			type: 'timeline',
			class: 'timeline timeline-snap-icon timeline-vertical max-md:timeline-compact h-96 overflow-y-auto',
			dataSource: 'calendarEvents',
			props: {
				icon: 'mdi:{data.icon}',
				iconColor: 'blue',
				nodeWidth: "64",
				timeField: 'start',
				itemLayout: '{"type":"button","class":"btn btn-xs","props":{"label":"hello {page.f1Driver1}"}}',
			}
		}
	]
};

export const oneOfEachRepeaterData = {
	type: 'repeater',
	class: 'flex gap-2',
	dataSource: 'examples',
	children: [
		{
			type: 'container',
			class: 'border w-16',
			childred: []
		},
		{
			type: 'icon',
			props: { color: '{data.iconColor}', icon: '{data.iconShape}', size: '{data.iconSize}' }
		},
		{
			type: 'button',
			class: 'btn btn-sm',
			props: { label: '{data.buttonLabel}' }
		},
		{
			type: 'image',
			class: 'w-16',
			props: { src: '{data.exampleImage}' }
		},
		{
			type: 'input',
			class: 'input input-sm input-bordered w-16',
			props: { placeholder: '{data.hint}' }
		},
		{
			type: 'text',
			class: 'w-10',
			props: { value: '<b>{data.text}</b>' }
		},
		{
			type: 'slider',
			class: 'w-16 range range-info',
			props: { min: 0, max: 10, value: 7 }
		},
	]
};

export const horizontalIcons = {
	type: 'container',
	class: 'flex border shadow-2xl m-5 p-5',
	draggable: false,
	children: [
		{
			type: 'icon',
			draggable: true,
			props: { icon: 'lucide:image', size: '1.5em', color: 'blue' },
		},
		{
			type: 'icon',
			props: { icon: 'lucide:image', size: '1.5em', color: 'green' },
		},
		{
			type: 'container',
			class: 'flex flex-col',
			children: [
				{
					type: 'text',
					class: 'text-base-content text-xl font-bold font-serif',
					props: { value: '{page.f1Driver1}' },
					draggable: true,
				},
				{
					type: 'text',
					class: 'text-base-content text-xl font-thin italic',
					props: { value: 'Team Ferrari Driver 1' },
					draggable: true,
				},
				{
					type: 'text',
					class: 'text-base-content text-xl font-black',
					props: { value: 'Team Ferrari Driver 1' },
					draggable: true,
				},
				{
					"type": "slider",
					"class": "range range-info",
					"props": { "value": 50, "max": 100, "min": 0 },
				},
			]
		},
		{
			type: 'richtext',
			class: '',
			props: { value: '<p>Hi {page.f1Driver1} <layout-component></layout-component> <input-component></input-component> <counter-component></counter-component></p>' },
		},
		{
			type: 'button',
			class: 'ml-auto btn btn-sm btn-accent',
			props: { label: 'Button Title' },
			draggable: true,
		},
	]
};

export const repeater = {
	type: 'repeater',
	dataSource: 'names',
	class: 'flex gap-2',
	draggable: true,
	children: [
		{
			type: 'button',
			class: 'btn btn-sm {data.color}',
			actions: {
				onclick: {
					"type": "navigate",
					"URL": "{data.navigate}",
					"newTab": true
				},
				onclick2: {
					"type": "clientScript",
					"value": "alert(self.getContent()); page.namedPageObjects['theButton'].getLayout()['class']='btn btn-accent'; alert(JSON.stringify(page.namedPageObjects['theButton'].getLayout()['class']));"
				},
			},
			props: { label: 'Button{data.name:formatSuffix}' },
		},
	]
};

export const named = {
	type: 'repeater',
	class: 'grid sm:grid-cols-2 gap-5',
	dataSource: 'names',
	children: [
		{
			type: 'named',
			class: '',
			props: { name: 'f1' },
		},
	]
};

export const f1 = {
	type: 'container',
	id: 'f1',
	class: 'flex flex-col',
	children: [
		{
			type: 'image',
			class: 'w-64 mx-auto bg-accent rounded-full',
			props: {
				src: '{page.exampleNestedJSON.photo.inner}'
			},
			background: 'https://hulbertfamily.com/gltf/grid.png',
			draggable: true,
		},
		{
			type: 'text',
			class: 'text-base-content text-xl mx-auto',
			props: { value: 'Team Ferrari {data.name}' },
			draggable: true,
		},
		{
			type: 'input',
			class: 'input input-bordered mx-auto',
			props: { value: 'Ivanka/ivy', placeholder: "Ivanka's Friend's Name" },
			disabled: false,
			draggable: true,
		},
		{
			type: 'button',
			class: 'btn btn-sm btn-error mx-auto',
			props: {
				label: 'Save Team Ferrari'
			},
		},
	],
};

export const namedComponents = { oneOfEachPageData: oneOfEachPageData, oneOfEachRepeaterData: oneOfEachRepeaterData, horizontalIcons: horizontalIcons, named: named, f1: f1, repeater: repeater };
