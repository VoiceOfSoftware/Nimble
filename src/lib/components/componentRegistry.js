const componentRegistry = new Map();

export function registerComponent(type, component, eventNames = []) {
	if (componentRegistry.has(type)) {
		// throw new Error(`Component type '${type}' is already registered`);
		return;
	}
	componentRegistry.set(type, { component, eventNames });
}

export function getComponent(type) {
	return componentRegistry.get(type);
}