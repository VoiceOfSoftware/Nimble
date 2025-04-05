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
					class: "flex flex-row p-2 mt-1 ml-2 mr-2 mb-1 bg-white rounded-md items-center",
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
			onclick: {
				"action": "clientScript",
				"value": "alert('button clicked')"
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
			class: 'w-1/2',
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
			dataSource: "Publication breakdown",
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
				optionValueField: "Name",
				optionTitleField: "Name"
			},
			dataSource: "Component Library",
			onChange: "alert('selected '+selectedOption);"
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
			class: "flex flex-wrap",
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
			type: "iframe",
			class: "w-full",
			props: {
				url: "https:\/\/www.hulbertfamily.com"
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
			dataSource: "Map Markers",
			props: {
				rasterLayer: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
				zoom: "15",
				center: "[-117.165975, 33.088782]",
				markerIcon: "",
				popup: "{\"componentType\":\"text\",\"type\":\"component\",\"id\":\"\",\"props\":{\"content\":\"{lngLat}: {label}\"},\"class\":\"text-base-content\"}",
				baseMap: "https:\/\/basemaps.cartocdn.com\/gl\/positron-gl-style\/style.json"
			},
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
				"target": "3d",
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
			dataSource: "Dummy JSON",
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
			dataSource: "Calendar",
			props: {
				nodeWidth: 64,
				itemLayout: "{\"type\":\"namedComponent\",\"componentType\":\"Paneurhythmy\"}",
				orientation: "vertical",
				icon: "material-symbols:check-circle-outline"
			},
		}
	}
]

//	To simulate how a database retrieves Definitions, convert native JSON to stringified text.
//	This helps when we drag components from the library
listOfComponents.forEach((item) => {
	item.Definition = JSON.stringify(item.Definition)
})