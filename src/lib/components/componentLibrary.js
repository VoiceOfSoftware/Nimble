//
//	Simulate a database that holds a library of component definitions
//

export const componentLibraryLayout = {
	type: "container",
	props: {
		class: "bg-neutral-content rounded-xl pt-1 pb-1",
	},
	children: [
		{
			type: "repeater",
			props: {
				dataSource: "componentLibrary",
			},
			children: [
				{
					type: "container",
					props:
					{
						class: "flex flex-row p-2 mt-1 ml-2 mr-2 mb-1 bg-white rounded-md items-center cursor-move",
						draggable: true,
						dragData: "{data.DefinitionAsString}",
					},
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
							props: {
								class: "text-base-content ml-1 text-sm",
								value: "{data.Name}"
							},
						}
					],
				}
			],
		},
	],
}

export const listOfComponents = [
	{
		Name: 'Remote',
		IconifyIcon: 'mdi:gear',
		Definition: {
			type: "remote",
			props: {
				class: 'flex'
			},
		},
	},
	{
		Name: '3D Object',
		IconifyIcon: 'gis:cube-3d',
		Definition: {
			type: "3D",
			props: {
				assetURL: "https:\/\/corsproxy.io\/?url=https:\/\/www.hulbertfamily.com\/gltf\/MaterialsVariantsShoe.glb",
				scale: 30
			},
		},
	},
	{
		Name: 'Alternates',
		IconifyIcon: 'mdi:arrow-decision',
		Definition: {
			type: "alternates",
			alternates: {
				editable: '{"type": "button","props": {"class": "btn btn-xs btn-accent","label": "Button"}}',
				readOnly: '{"type": "image","props": {"class": "w-32","src":"https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/mclaren.png"}}'
			},
			props: {
				choiceProperty: 'type'
			}
		},
	},
	{
		Name: 'Button',
		IconifyIcon: 'teenyicons:button-outline',
		Definition: {
			type: "button",
			props: {
				class: "btn btn-sm btn-primary",
				tooltip: "Show this when user hovers",
				label: "Button",
			},
			actions: {
				onclick: {
					"type": "clientScript",
					"script": "alert('button clicked')"
				}
			},
		},
	},
	{
		Name: 'Calendar',
		IconifyIcon: 'lucide:calendar-days',
		Definition: {
			type: "calendar",
			props: {
				startTimeField: "startDateTime",
				endTimeField: "endDateTime",
				titleField: "Title",
				idField: "UniqueID",
				toolbarStart: "today prev,next",
				toolbarCenter: "title",
				toolbarEnd: "timeGridDay,timeGridWeek,dayGridMonth",
			}
		}
	},
	{
		Name: 'Chart',
		IconifyIcon: 'lucide:chart-no-axes-combined',
		Definition: {
			type: "chart",
			props: {
				dataSource: "chartData",
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
			type: 'choice',
			props: {
				optionValueField: 'name',
				optionTitleField: 'name',
				value: 'Mary Ann',
				class: 'border border-gray-300 rounded',
				dataSource: "names",
			},
			actions: {
				onchange: {
					type: 'clientScript',
					script: 'alert("choice changed: "+self.props.value})'
				}
			},
		}
	},
	{
		Name: 'Container - Horizontal',
		IconifyIcon: 'clarity:container-line',
		Definition: {
			type: "container",
			props: {
				class: "flex flex-wrap",
			},
			children: [
			],
		}
	},
	{
		Name: 'Container - Vertical',
		IconifyIcon: 'carbon:container-image',
		Definition: {
			type: "container",
			props: {
				class: ''
			},
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
		},
	},
	{
		Name: 'iFrame',
		IconifyIcon: 'tdesign:component-layout',
		Definition: {
			type: 'iframe',
			props: {
				class: 'w-full',
				url: 'https://nc-photo.org'
			},
		},
	},
	{
		Name: 'Image',
		IconifyIcon: 'lucide:image',
		Definition: {
			type: "image",
			props: {
				src: "https:\/\/fastly.picsum.photos\/id\/456\/200\/200.jpg?hmac=Nu8ETZuaEwOyl13MjrpOo92an166yAu4I2emrU09uxg",
			}
		},
	},
	{
		Name: 'Input',
		IconifyIcon: 'mdi:form-textbox',
		Definition: {
			type: "input",
			props: {
				class: "input input-bordered mb-2",
				value: "Sample plain text",
				placeholder: ""
			},
		}
	},
	{
		Name: 'Kanban',
		IconifyIcon: 'material-symbols:view-kanban-outline',
		Definition: {
			type: "kanban",
			props: {
				dataSource: "Calendar_offline",
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
			props: {
				class: 'aspect-video',
				dataSource: 'mapMarkers',
				zoom: 2,
				rasterLayer: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
				tileLayer: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: "[-117.165975, 33.088782]",
				markerIcon: 'mdi:location',
				markerColor: 'blue',
				popup: "{\"componentType\":\"text\",\"type\":\"component\",\"id\":\"\",\"props\":{\"content\":\"{lngLat}: {label}\"},\"class\":\"text-base-content\"}",
				baseMap: 'https:\/\/basemaps.cartocdn.com\/gl\/positron-gl-style\/style.json'
			},
		}
	},
	{
		Name: 'Phone',
		IconifyIcon: 'material-symbols:smartphone',
		Definition: {
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
					type: 'container',
					props: {
						class: 'display w-[440px] h-[844px] bg-white',
					},
					children: [
						{
							type: 'text',
							props: {
								class: 'pt-2 pl-3 text-gray-100',
								value: 'safe area'
							}
						},
						{
							type: 'container',
							props: {
								class: 'flex flex-wrap',
							},
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
			props: {
				class: "flex flex-wrap",
				dataSource: "names",
			},
			children: [
				{
					type: "text",
					props: {
						value: "Sample <b>rich<\/b> text"
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
				value: ""
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
			props: {
				class: "range",
				min: 1,
				max: 100,
				value: 50,
				step: 1
			}
		}
	},
	{
		Name: 'Tabs',
		IconifyIcon: 'iconoir:window-tabs',
		Definition: {
			type: 'tabs',
			props: {
				selectedTab: 'tab1'
			},
			children: [
				{
					type: 'container',
					id: 'tab1',
					props: {
						class: 'flex flex-wrap',
					},
					children: [
						{
							type: 'text',
							props: {
								class: 'text-base-content',
								value: 'Contents of tab #1'
							},
						},
					]
				},
				{
					type: 'container',
					id: 'tab2',
					props: {
						class: 'flex flex-wrap',
					},
					children: [
						{
							type: 'text',
							props: {
								class: 'text-base-content',
								value: 'Contents of tab #2'
							},
						},
					]
				},
				{
					type: 'container',
					id: 'tab three',
					props: {
						class: 'flex flex-wrap',
					},
					children: [
						{
							type: 'text',
							props: {
								class: 'text-base-content',
								value: 'Contents of tab <b>three</b>'
							},
						},
					]
				},
			]
		}
	},
	{
		Name: 'Table',
		IconifyIcon: 'lucide:table',
		Definition: {
			type: "table",
			props: {
				dataSource: "calendarEvents",
				editable: true
			},
		}
	},
	{
		Name: 'Text',
		IconifyIcon: 'lucide:type',
		Definition: {
			type: 'text',
			props: {
				class: 'text-base-content',
				value: 'Sample <b>rich<\/b> text'
			},
		}
	},
	{
		Name: 'Timeline',
		IconifyIcon: 'mingcute:timeline-fill',
		Definition: {
			type: "timeline",
			props: {
				dataSource: "calendarEvents",
				class: 'timeline timeline-snap-icon timeline-vertical max-md:timeline-compact h-96 overflow-y-auto',
				nodeWidth: 64,
				itemLayout: '{"type":"button","class":"btn btn-xs","props":{"label":"{data.shortdescription:hideEmpty}"}}',
				icon: "mdi:{data.icon}",
				iconColor: "blue"
			},
		}
	},
	{
		Name: 'Upload Image',
		IconifyIcon: 'material-symbols:cloud-upload',
		Definition: {
			type: 'imageupload',
			props: {
				class: 'btn btn-sm btn-primary',
				label: 'Upload to Cloudinary',
				cloudinaryFolder: 'test',
				cloudinaryPreset: 'Bleth_preset'
			}
		}
	}
]

//	To simulate how a database retrieves Definitions, convert native JSON to stringified text.
//	This helps when we drag components from the library
listOfComponents.forEach((item) => {
	item.DefinitionAsString = JSON.stringify(item.Definition)
})