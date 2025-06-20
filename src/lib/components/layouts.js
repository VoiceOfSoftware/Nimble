export const headerLayout =
{
	type: 'container',
	props: {
		class: 'sticky top-0 left-0 w-full bg-white text-white shadow-lg z-50 flex items-center',
	},
	children: [
		{
			type: 'icon',
			props: { color: 'green', icon: 'mdi:gear', size: '32' }
		},
		{
			type: 'button',
			props: {
				class: 'btn btn-xs ml-auto',
				label: '{page.exampleButton.label}'
			}
		},
		{
			type: 'icon',
			props: {
				class: 'ml-auto',
				color: 'red', icon: 'mdi:gear', size: '32'
			}
		},
	]
}

export const oneOfEachPageData = {
	type: 'container',
	props: {},
	children: [
		{ type: "repeater", props: { class: "grid grid-cols-3 gap-2", "dataSource": "NCPS galleries" }, "children": [{ "type": "container", "props": { "class": "mb-5", "disabled": false }, "children": [{ "type": "text", "props": { "class": "text-base-content text-xl text-center", "value": "{data.galleryName}" } }, { "type": "image", "props": { "src": "https://nc-photo.org/gallery/{data.firstName}%20{data.lastName}/{data.galleryName}/slides/{data.fileName}", "class": "rounded-xl shadow aspect-video object-cover" } }, { "type": "text", "props": { "class": "text-base-content", "value": "{data.galleryDesc:hideEmpty}" } }] }] },
		{
			type: "container",
			props:
				{ class: "flex flex-wrap gap-2" },
			children: [
				{
					type: "imageupload",
					props: {
						class: "btn btn-sm btn-primary",
						label: "Upload to Cloudinary",
						cloudinaryFolder: "samples",
						cloudinaryPreset: "Bleth_preset",
					}
				},
				{
					type: "button",
					props: {
						class: "btn btn-sm btn-primary",
						tooltip: "Show this when user hovers",
						label: "Query Cloudinary",
						disabled: false
					},
					actions: {
						onclick: {
							type: "clientScript",
							script: "// Construct the API URL\n const apiUrl = 'https://voiceofsoftware.com/hello.php';\n  \n  fetch(apiUrl, {\n    method: 'GET',\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  })\n    .then(response => {\n      if (!response.ok) {\n        throw new Error(`HTTP error! status: ${response.status}`);\n      }\n      return response.json();\n    })\n    .then(data => {\n      console.log(data);\n      data.resources.forEach((item)=>{item.url=('https://res.cloudinary.com/dzoumeu1e/image/upload/'+'q_auto,w_200/'+item.secure_url.split('https://res.cloudinary.com/dzoumeu1e/image/upload/')[1])});\n      page.data.cloudinary = data.resources;\n      return data;\n    })\n    .catch(error => {\n      console.error('Error fetching Cloudinary images:', error);\n      throw error;\n    });"
						}
					}
				}
			]
		},
		{
			type: "repeater",
			props: {
				class: "flex flex-wrap",
				dataSource: "cloudinary",
				draggable: false
			},
			children: [{
				type: "image",
				props: { "src": "{data.url}", "class": "w-32" }
			}]
		},
		{
			type: 'container',
			props: {
				class: 'mockup-phone scale-90',
			},
			children: [
				{
					type: 'container',
					props: {
						class: 'camera',
					}
				},
				{
					type: "container",
					props: {
						class: "display w-[440px] h-[844px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500",
					},
					children: [{
						type: "text",
						props: {
							class: "pt-2 pl-3 text-gray-100",
							value: "safe area"
						}
					},
					{
						type: "container",
						props: {
							class: "flex flex-wrap place-content-center gap-2",
						},
						children: [
							{
								type: "button",
								actions: {
									onclick: {
										"type": "clientScript",
										"script": "fetch(\"https://dummyjson.com/recipes\")\n  .then(response => response.json())\n  .then(j => {\n    page.data.recipes = j.recipes;\n  });"
									}
								},
								props: {
									class: "btn btn-sm btn-primary",
									tooltip: "Fetch recipes from API",
									label: "Get Recipes",
									draggable: false
								},
							},
							{
								type: "button",
								actions: {
									"onclick": { "type": "clientScript", "script": "page.data.recipes=[];" }
								},
								props: {
									class: "btn btn-sm btn-error",
									tooltip: "Clear recipe data",
									label: "Clear Recipes",
									draggable: false
								},
							}
						]
					},
					{
						type: "repeater",
						props: {
							class: "grid grid-cols-2 p-3 gap-3 overflow-y-auto h-screen",
							dataSource: "recipes",
						},
						children: [{
							type: "container",
							props: {
							},
							children: [
								{
									type: "text",
									props: {
										class: "text-base-content text-center",
										value: "{data.name}"
									}
								},
								{
									type: "image",
									props: {
										class: "rounded-full",
										src: "{data.image}",
									},
								}
							]
						}
						]
					}
					]
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
			props: {
				class: 'btn btn-sm btn-info',
				label: '🌙 Dark Mode'
			},
			actions: {
				onclick: {
					"type": "clientScript",
					"script": "document.documentElement.setAttribute('data-theme','dark')"
				}
			},
		},
		{
			type: 'button',
			props: {
				class: 'btn btn-sm btn-info',
				label: '☀️ Light Mode'
			},
			actions: {
				onclick: {
					type: "clientScript",
					script: "document.documentElement.setAttribute('data-theme','light')"
				}
			},
		},
		{
			type: 'calendar',
			props: {
				dataSource: 'calendarEvents',
				startTimeField: "start",
				endTimeField: "end",
				titleField: "shortdescription",
				idField: "id",
				toolbarStart: "today prev,next",
				toolbarCenter: "title",
				toolbarEnd: "timeGridDay,timeGridWeek,dayGridMonth",
			}
		},
		{
			type: 'chart',
			props: {
				dataSource: 'chartData',
				title: 'Chart Title',
				xColumn: 'x',
				yColumn: 'y',
				color: '#009999',
				type: 'treemap',
			}
		},
		{
			type: 'choice',
			props: {
				class: 'border border-gray-300 rounded',
				dataSource: 'names',
				optionValueField: 'name',
				optionTitleField: 'name',
				value: 'Mary Ann'
			},
			actions: {
				onchange: {
					type: 'clientScript',
					script: 'alert("onchange "+self.props.value)'
				},
			}
		},
		{
			type: 'container',
			props: {
				class: 'flex gap-2',
			},
			children: [{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow-xl',
					value: 'left'
				},
			},
			{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow-xl',
					value: 'middle'
				},
			},
			{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow-xl',
					value: 'right'
				},
			},
			]
		},
		{
			type: 'container',
			props: {
				class: 'flex flex-col gap-2',
			},
			children: [{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow',
					value: 'top'
				},
			},
			{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow',
					value: 'center'
				},
			},
			{
				type: 'text',
				props: {
					class: 'border p-1 m-1 shadow',
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
			props: {
				class: 'w-full',
				url: 'https://nc-photo.org',
			}
		},
		{
			type: 'image',
			props: {
				class: 'w-96',
				background: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/united-kingdom-flag.png',
				src: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/mclaren.png'
			}
		},
		{
			type: 'imageupload',
			props: {
				class: 'btn btn-sm btn-primary',
				label: 'Upload to Cloudinary',
				cloudinaryFolder: 'test',
				cloudinaryPreset: 'Bleth_preset'
			}
		},
		{
			type: 'input',
			props: {
				class: 'input input-sm input-bordered w-64',
				placeholder: '{page.exampleInput.placeholder}', value: ''
			},
		},
		// {
		// 	type: 'pdf',
		// 	props: {
		// 		url: 'https://pdfobject.com/pdf/sample.pdf'
		// 	}
		// },
		{
			type: 'map',
			props: {
				class: 'relative aspect-[9/16] max-h-[70vh] w-full sm:aspect-video sm:max-h-full',
				dataSource: 'mapMarkers',
				zoom: 2,
				rasterLayer: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
				tileLayer: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: "[-117.165975, 33.088782]",
				markerIcon: 'mdi:location',
				markerColor: 'blue',
				markerSize: 36
			}
		},
		{
			type: 'repeater',
			props: {
				class: 'flex gap-2',
				dataSource: 'names',
			},
			children: [{
				type: 'text',
				props: {
					class: 'bg-accent text-xl p-1',
					value: '{data.name}'
				}
			},
			]
		},
		{
			type: 'richtext',
			props: {
				class: 'w-1/3',
				value: 'This is <b>rich</b> editable text'
			}
		},
		{
			type: 'script',
			props: {
				class: 'border w-full',
				script: "// This is a syntax-aware Javascript editor\n\nlet a='hello';"
			}
		},
		{
			type: 'container',
			props: {
				class: 'flex w-full',
			},
			children: [{
				type: 'slider',
				props: {
					class: 'w-96 range range-info',
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
				props: {
					class: 'ml-2',
					value: 'Move the slider!'
				}
			}
			]
		},
		{
			type: 'repeater',
			props: {
				dataSource: 'switchExample',
				class: 'flex gap-2',
			},
			children: [
				{
					type: 'alternates',
					alternates: {
						editable: '{"type": "button","props": {"class": "btn btn-xs btn-accent","label": "Button"}}',
						readOnly: '{"type": "image","props": {"class": "w-32","src":"https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/mclaren.png"}}'
					},
					props: {
						choiceProperty: 'type'
					}
				}
			]
		},
		{
			type: 'table',
			props: {
				class: 'w-full',
				dataSource: 'calendarEvents',
			}
		},
		{
			type: 'text',
			props: {
				class: 'text-3xl font-thin font-sans',
				value: 'This is <i>some</i> text, {page.f1Driver1}'
			}
		},
		{
			type: 'timeline',
			props: {
				class: 'timeline timeline-snap-icon timeline-vertical max-md:timeline-compact h-96 overflow-y-auto',
				dataSource: 'calendarEvents',
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
	props: {
		class: 'flex gap-2',
		dataSource: 'examples',
	},
	children: [
		{
			type: 'container',
			props: {
				class: 'border w-16',
			},
			children: []
		},
		{
			type: 'icon',
			props: { color: '{data.iconColor}', icon: '{data.iconShape}', size: '{data.iconSize}' }
		},
		{
			type: 'button',
			props: {
				class: 'btn btn-sm',
				label: '{data.buttonLabel}'
			}
		},
		{
			type: 'image',
			props: {
				class: 'w-16',
				src: '{data.exampleImage}'
			}
		},
		{
			type: 'input',
			props: {
				class: 'input input-sm input-bordered w-16',
				placeholder: '{data.hint}'
			}
		},
		{
			type: 'text',
			props: {
				class: 'w-10',
				value: '<b>{data.text}</b>'
			}
		},
		{
			type: 'slider',
			props: {
				class: 'w-16 range range-info',
				min: 0, max: 10, value: 7
			}
		},
	]
};

export const horizontalIcons = {
	type: 'container',
	props: {
		class: 'flex border shadow-2xl m-5 p-5',
		draggable: false,
	},
	children: [
		{
			type: 'icon',
			props: {
				draggable: true,
				icon: 'lucide:image', size: '1.5em', color: 'blue'
			},
		},
		{
			type: 'icon',
			props: { icon: 'lucide:image', size: '1.5em', color: 'green' },
		},
		{
			type: 'container',
			props: {
				class: 'flex flex-col',
			},
			children: [
				{
					type: 'text',
					props: {
						class: 'text-base-content text-xl font-bold font-serif',
						value: '{page.f1Driver1}',
						draggable: true,
					},
				},
				{
					type: 'text',
					props: {
						class: 'text-base-content text-xl font-thin italic',
						value: 'Team Ferrari Driver 1',
						draggable: true,
					},
				},
				{
					type: 'text',
					props: {
						class: 'text-base-content text-xl font-black',
						value: 'Team Ferrari Driver 1',
						draggable: true,
					},
				},
				{
					type: "slider",
					props: {
						class: "range range-info",
						value: 50, "max": 100, "min": 0
					},
				},
			]
		},
		{
			type: 'richtext',
			props: { value: '<p>Hi {page.f1Driver1} <layout-component></layout-component> <input-component></input-component> <counter-component></counter-component></p>' },
		},
		{
			type: 'button',
			props: {
				class: 'ml-auto btn btn-sm btn-accent',
				label: 'Button Title',
				draggable: true,
			},
		},
	]
};

export const repeater = {
	type: 'repeater',
	props: {
		dataSource: 'names',
		class: 'flex gap-2',
		draggable: true,
	},
	children: [
		{
			type: 'button',
			props: {
				class: 'btn btn-sm {data.color}',
				label: 'Button{data.name:formatSuffix}'
			},
			actions: {
				onclick: {
					"type": "navigate",
					"URL": "{data.navigate}",
					"newTab": true
				},
				onclick2: {
					"type": "clientScript",
					"value": "alert(self.props.content); page.namedPageObjects['theButton'].getLayout()['class']='btn btn-accent'; alert(JSON.stringify(page.namedPageObjects['theButton'].getLayout()['class']));"
				},
			},
		},
	]
};

export const named = {
	type: 'repeater',
	props: {
		class: 'grid sm:grid-cols-2 gap-5',
		dataSource: 'names',
	},
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
	props: {
		class: 'flex flex-col',
	},
	children: [
		{
			type: 'image',
			props: {
				class: 'w-64 mx-auto bg-accent rounded-full',
				src: '{page.exampleNestedJSON.photo.inner}',
				background: 'https://hulbertfamily.com/gltf/grid.png',
				draggable: true,
			},
		},
		{
			type: 'text',
			props: {
				class: 'text-base-content text-xl mx-auto',
				value: 'Team Ferrari {data.name}',
				draggable: true,
			},
		},
		{
			type: 'input',
			props: {
				class: 'input input-bordered mx-auto',
				value: 'Ivanka/ivy',
				placeholder: "Ivanka's Friend's Name",
				disabled: false,
				draggable: true,
			},
		},
		{
			type: 'button',
			props: {
				class: 'btn btn-sm btn-error mx-auto',
				label: 'Save Team Ferrari'
			},
		},
	],
};

export const namedComponents = { oneOfEachPageData: oneOfEachPageData, oneOfEachRepeaterData: oneOfEachRepeaterData, horizontalIcons: horizontalIcons, named: named, f1: f1, repeater: repeater };
