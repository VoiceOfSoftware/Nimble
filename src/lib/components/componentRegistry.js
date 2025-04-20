const componentRegistry = new Map();

export function registerComponent(type, component) {
	if (componentRegistry.has(type)) {
		// throw new Error(`Component type '${type}' is already registered`);
		return;
	}
	componentRegistry.set(type, { component })
}

export function getComponent(type) {
	return componentRegistry.get(type);
}

export const commonProperties = [
	{ name: "class", type: "string", placeholder: "" },
	{ name: "draggable", type: "boolean" },
	{
		name: "dragData",
		type: "string",
		placeholder: "Text to be sent when you drop this item",
	},
	{
		name: "tooltip",
		type: "string",
		placeholder: "Show text when user hovers",
	},
	{
		name: "background",
		type: "string",
		placeholder: "URL of background image",
	},
];
