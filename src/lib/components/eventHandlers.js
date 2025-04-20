import { performAction } from "./dataPillMacros";

export function createEventHandlers(actions = {}, context, dataValues) {
	const handlers = {};

	Object.keys(actions).forEach((event) => {
		const action = actions[event];
		if (action) {
			handlers[event] = () => {
				performAction(action, context, dataValues);
			};
		}
	});

	return handlers;
}