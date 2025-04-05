import tippy from "tippy.js"
import "tippy.js/dist/tippy.css"

export function tooltip(element, options) {
	let tooltipInstance = null;

	function createTooltip(options) {
		if (!options.content) {
			if (tooltipInstance) {
				tooltipInstance.destroy();
				tooltipInstance = null;
			}
			return;
		}

		// Destroy existing tooltip before creating a new one
		if (tooltipInstance) {
			tooltipInstance.destroy();
		}

		tooltipInstance = tippy(element, {
			content: options.content,
			allowHTML: true
		});
	}

	createTooltip(options);

	return {
		update(newOptions) {
			createTooltip(newOptions);
		},
		destroy() {
			if (tooltipInstance) {
				tooltipInstance.destroy();
			}
		}
	}
}