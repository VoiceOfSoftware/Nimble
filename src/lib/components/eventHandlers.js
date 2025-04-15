import { performAction } from "./dataPillMacros";

export function createEventHandlers(actions = {}, context, dataValues) {
	const handlers = {};

	Object.keys(actions).forEach((event) => {
		const action = actions[event];
		if (action) {
			const eventName = event;
			handlers[event] = () => {
				performAction(action, context, dataValues);
			};
		}
	});

	return handlers;
}