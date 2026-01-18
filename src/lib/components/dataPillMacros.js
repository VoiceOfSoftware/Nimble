// Example Actions
// GENERIC:
//   "action": {
//     "type": "string", // Defines the action type (e.g., "navigate", "show", "clientScript")
//     "target": "string", // Optional: Specifies the target of the action (e.g., URL, element ID)
//     "value": "string", // Optional: Additional data (e.g., JS code, text to copy)
//     "options": { // Optional: Extra settings specific to the action
//       "key": "value"
//     }
// NAVIGATE TO PAGE
// "action": {
//   "type": "navigate",
//   "target": "/home",
//     "newTab": false
// }
// SHOW/HIDE element
// "action": {
// 	"type": "toggleVisibility",
// 	"target": "sidebar_001",
// 	"options": {
// 		"initialState": "hidden"
// 	}
// }
// SUBMIT A FORM
// "action": {
// 	"type": "submitForm",
// 	"target": "form_001",
// 	"options": {
// 		"endpoint": "/api/submit"
// 	}
// }
// RUN JAVASCRIPT
// "action": {
// 	"type": "clientScript",
// 	"value": "alert('Button clicked!');"
// }
// OPEN A MODAL
// "action": {
// 	"type": "openModal",
// 	"target": "modal_001"
// }
// SET PROPERTY
// "action": {
// 	"type": "setProperty",
// 	"target": "named_slider_id",
// 	"options": {
// 		"max": 100
// 	}
// }
// TOGGLE STATE
// "action": {
// 	"type": "toggleState",
// 	"target": "theme",
// 	"options": {
// 		"states": ["light", "dark"]
// 	}
// }
// COPY TO CLIPBOARD
// "action": {
// 	"type": "copyToClipboard",
// 	"value": "https://example.com"
// }
export function evalWithContext(code, context) {
	const fn = new Function(...Object.keys(context), `${code}`);
	return fn(...Object.values(context));
}

export function performAction(actionDefinition, context, dataValues) {
	switch (actionDefinition?.type) {
		case 'navigate':
			if (typeof window !== 'undefined') {
				window.open(macroReplace(actionDefinition.URL, context, dataValues, false), actionDefinition.newTab ? '_blank' : '_self');
			}
			break;
		case 'clientScript':
			evalWithContext(actionDefinition.script, context)
			break;
		case 'setProperty':
			context.page.namedPageObjects[actionDefinition.objectName].getLayout()['props'][actionDefinition.property] = macroReplace(actionDefinition.value, context, dataValues, false);
			break;
		case 'setGlobal':
			context.page.data[actionDefinition.variableName] = macroReplace(actionDefinition.value, context, dataValues, false);
			break;
		case 'showDialog':
			context.page.modalDialog.layout = JSON.parse(actionDefinition.layout);
			context.page.modalDialog.class = actionDefinition.class;
			context.page.modalDialog.context = context;
			context.page.modalDialog.show = true;
			break;
	}
}

export function macroReplace(stringToExpand, context, dataValues, showStructure) {
	if (showStructure && stringToExpand) {
		return renderStringWithMacroBadges(stringToExpand);
	}

	if (stringToExpand) {
		const macroRegex = /{(.+?)(?::(\w+))?}/g;

		return stringToExpand.replace(
			macroRegex,
			(match, macroName, transformName) => {
				// TODO: these checks need to be refactored to handle null dataValues, which cause a fallback to context
				// if (!dataValues || typeof dataValues !== "object") {
				// if (typeof dataValues !== "object") {
				// 	return match;
				// }

				let theDataValue;
				// {data.<Path>.<To>.<fieldName>} refers to a Repeater that passes in row data
				// {page.<Path>.<To>.<fieldName>} refers to top-level Page context
				switch (macroName.substring(0, 5)) {
					case 'data.':
						theDataValue = getNestedValue(dataValues, macroName.substring(5));
						break;
					case 'page.':
						theDataValue = getNestedValue(context?.data, macroName.substring(5));
						break;
					case 'self.':
						theDataValue = getNestedValue(context.self, macroName.substring(5));
						break;
				}

				if (transformName && transformName in transformations) {
					return transformations[transformName](theDataValue)
					// return macroName.substring(5) in dataValues
					// 	? transformations[transformName](theDataValue)
					// 	: match;
				}

				return theDataValue ? theDataValue : match;
			}
		);
	}

	return stringToExpand; // Return the original string if it's falsy
}

function getNestedValue(data, path) {
	const keys = path.split('.');

	// Dot-walk a string like "data.props.color" to retrieve the final ".color" value
	return keys.reduce((current, key) => {
		return current && current[key] !== undefined ? current[key] : undefined;
	}, data);
}

export function getTransformations() {
	let t = Object.keys(transformations)
	return Object.keys(transformations)
}

const transformations = {
	longDate: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	},
	time: (value) => {
		return new Date(value).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
			timeZoneName: "short",
		});
	},
	dayNumber: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			day: "2-digit",
		});
	},
	monthNumber: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			month: "2-digit",
		});
	},
	monthName: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			month: "long",
		});
	},
	monthNameShort: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			month: "short",
		});
	},
	year: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			year: "numeric",
		});
	},
	dayOfWeek: (value) => {
		return new Date(value).toLocaleDateString("en-US", {
			weekday: "long",
		});
	},
	currency: (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(value);
	},
	thousands: (value) => {
		return new Intl.NumberFormat("en-US", {}).format(value);
	},
	removeSpaces: (value) => value.replace(/\s/g, ""),
	uppercase: (value) => value.toUpperCase(),
	lowercase: (value) => value.toLowerCase(),
	formatSuffix: (value) => {
		return value ? `, ${value}` : "";
	},
	hideEmpty: (value) => {
		return value ? value : ''
	}
};

function renderStringWithMacroBadges(inputString) {
	if (!inputString) {
		return
	}
	const macroRegex = /\{([^}]+)\}/g;

	const replacedString = inputString.replace(
		macroRegex,
		(match, macroName) => {
			return `<span class="macro-badge">${macroName}</span>`;
		},
	);
	return replacedString;
}
