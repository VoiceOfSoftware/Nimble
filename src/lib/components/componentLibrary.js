//
//	Simulate a database that holds a library of component definitions
//

export const componentLibraryLayout = {
	type: "container",
	class: "bg-neutral-content rounded-xl pt-1 pb-1",
	children: [
		{
			type: "repeater",
			dataSource: "componentLibrary",
			children: [
				{
					type: "container",
					class: "flex flex-row p-2 mt-1 ml-2 mr-2 mb-1 bg-white rounded-md items-center cursor-move",
					children: [
						{
							type: "icon",
							props: {
								icon: "{data.IconifyIcon}",
								size: "1.5em",
							},
						},
						{
							type: "text",
							class: "text-base-content ml-1 text-sm",
							props: {
								content: "{data.Name}"
							},
						}
					],
					dragData: "{data.Definition}",
					draggable: true,
				}
			],
		},
	],
}

export const listOfComponents = [
	{
		Name: '3D Object',
		IconifyIcon: 'gis:cube-3d',
		Definition: {
			type: "3D",
			props: {
				assetURL: "https:\/\/corsproxy.io\/?url=https:\/\/www.hulbertfamily.com\/gltf\/MaterialsVariantsShoe.glb",
				scale: 30
			},
		}
	},
	{
		Name: 'Button',
		IconifyIcon: 'teenyicons:button-outline',
		Definition: {
			type: "button",
			class: "btn btn-sm btn-primary",
			tooltip: "Show this when user hovers",
			actions: {
				onclick: {
					"type": "clientScript",
					"value": "alert('button clicked')"
				}
			},
			props: {
				label: "Button",
			}
		}
	},
	{
		Name: 'Calendar',
		IconifyIcon: 'lucide:calendar-days',
		Definition: {
			type: "calendar",
			class: '',
			props: {
				startTimeField: "startDateTime",
				endTimeField: "endDateTime",
				titleField: "Title",
				idField: "UniqueID"
			}
		}
	},
	{
		Name: 'Chart',
		IconifyIcon: 'lucide:chart-no-axes-combined',
		Definition: {
			type: "chart",
			dataSource: "chartData",
			props: {
				title: "This is an ApexChart",
				color: "#009999",
				yColumn: "y",
				type: "treemap",
				xColumn: "x"
			},
		}
	},
	{
		Name: 'Choice',
		IconifyIcon: 'lucide:list',
		Definition: {
			type: "choice",
			props: {
				optionValueField: "name",
				optionTitleField: "name"
			},
			class: "border border-gray-300 rounded",
			dataSource: "names",
			actions: {
				onchange: {
					"type": "clientScript",
					"script": "alert('choice changed {self.value}')"
				}
			},
		}
	},
	{
		Name: 'Container - Horizontal',
		IconifyIcon: 'clarity:container-line',
		Definition: {
			type: "container",
			class: "flex flex-wrap",
			children: [
			],
		}
	},
	{
		Name: 'Container - Vertical',
		IconifyIcon: 'carbon:container-image',
		Definition: {
			type: "container",
			class: "",
			children: [
			],
		}
	},
	{
		Name: 'Icon',
		IconifyIcon: 'lucide:image',
		Definition: {
			type: "icon",
			props: {
				size: "1.5em",
				color: "black",
				icon: "lucide:image"
			}
		}
	},
	{
		Name: 'iFrame',
		IconifyIcon: 'tdesign:component-layout',
		Definition: {
			type: 'iframe',
			class: 'w-full',
			props: {
				url: 'https://nc-photo.org'
			},
		}
	},
	{
		Name: 'Image',
		IconifyIcon: 'lucide:image',
		Definition: {
			type: "image",
			props: {
				src: "https:\/\/fastly.picsum.photos\/id\/456\/200\/200.jpg?hmac=Nu8ETZuaEwOyl13MjrpOo92an166yAu4I2emrU09uxg",
				alt: "{SpeakerFullName}"
			}
		}
	},
	{
		Name: 'Input',
		IconifyIcon: 'mdi:form-textbox',
		Definition: {
			type: "input",
			class: "input input-bordered mb-2",
			props: {
				content: "Sample plain text",
				placeholder: ""
			},
		}
	},
	{
		Name: 'Kanban',
		IconifyIcon: 'material-symbols:view-kanban-outline',
		Definition: {
			type: "kanban",
			dataSource: "Calendar_offline",
			props: {
				idField: "",
				titleField: "",
				columnField: "Type",
				priorityField: "",
				descriptionField: ""
			},
		}
	},
	{
		Name: 'Map',
		IconifyIcon: 'uiw:map',
		Definition: {
			type: "map",
			dataSource: "mapMarkers",
			props: {
				zoom: 2,
				rasterLayer: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
				tileLayer: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: [-117.165975, 33.088782],
				markerIcon: "mdi:location",
				popup: "{\"componentType\":\"text\",\"type\":\"component\",\"id\":\"\",\"props\":{\"content\":\"{lngLat}: {label}\"},\"class\":\"text-base-content\"}",
				baseMap: "https:\/\/basemaps.cartocdn.com\/gl\/positron-gl-style\/style.json"
			},
		}
	},
	{
		Name: 'Phone',
		IconifyIcon: 'material-symbols:smartphone',
		Definition: {
			type: 'container',
			class: 'mockup-phone scale-90',
			children: [
				{
					type: 'container',
					class: 'camera',
				},
				{
					type: 'container',
					class: 'display w-[440px] h-[844px] bg-white',
					children: [
						{
							type: 'text',
							class: 'pt-2 pl-3 text-gray-100',
							props: {
								content: 'safe area'
							}
						},
						{
							type: 'container',
							class: 'flex flex-wrap',
							children: []
						}
					]
				}

			]
		}
	},
	{
		Name: 'Repeater',
		IconifyIcon: 'lucide:repeat',
		Definition: {
			type: "repeater",
			class: "flex flex-wrap",
			dataSource: "names",
			children: [
				{
					type: "text",
					props: {
						content: "Sample <b>rich<\/b> text"
					},
				}
			],
		}
	},
	{
		Name: 'Rich Text',
		IconifyIcon: 'f7:doc-richtext',
		Definition: {
			type: "richtext",
			props: {
				content: ""
			}
		}
	},
	{
		Name: 'Script',
		IconifyIcon: 'fluent:script-32-regular',
		Definition: {
			type: "script",
			props: {
				script: "// This is a syntax-aware Javascript editor"
			}
		}
	},
	{
		Name: 'Slider',
		IconifyIcon: 'radix-icons:slider',
		Definition: {
			type: "slider",
			class: "range",
			onchange: {
				"action": "setProperty",
				"objectName": "3d",
				"options": {
					"scale": "{self.props.value}"
				}
			},
			props: {
				min: 1,
				max: 100,
				value: 50
			}
		}
	},
	{
		Name: 'Table',
		IconifyIcon: 'lucide:table',
		Definition: {
			type: "table",
			dataSource: "calendarEvents",
			props: {
				editable: true
			},
		}
	},
	{
		Name: 'Text',
		IconifyIcon: 'lucide:type',
		Definition: {
			type: "text",
			class: "text-base-content",
			props: {
				content: "Sample <b>rich<\/b> text"
			},
		}
	},
	{
		Name: 'Timeline',
		IconifyIcon: 'mingcute:timeline-fill',
		Definition: {
			type: "timeline",
			dataSource: "calendarEvents",
			class: 'timeline timeline-snap-icon timeline-vertical max-md:timeline-compact h-96 overflow-y-auto',
			props: {
				nodeWidth: 64,
				itemLayout: '{"type":"button","class":"btn btn-xs","props":{"label":"{data.shortdescription:hideEmpty}"}}',
				icon: "mdi:{data.icon}"
			},
		}
	}
]

//	To simulate how a database retrieves Definitions, convert native JSON to stringified text.
//	This helps when we drag components from the library
listOfComponents.forEach((item) => {
	item.Definition = JSON.stringify(item.Definition)
})