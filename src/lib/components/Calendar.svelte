<script>
	import Calendar from "@event-calendar/core";
	import TimeGrid from "@event-calendar/time-grid";
	import DayGrid from "@event-calendar/day-grid";
	import { getContext } from "svelte";

	let { layoutStructure } = $props();

	const pageContext = getContext("pageContext");

	function eventClicked(info) {
		alert(info.event.title + "\n\n" + info.event.titleHTML);
	}

	export function getOptions() {
		return options;
	}

	let plugins = [TimeGrid, DayGrid];
	let options = $state({
		view: "dayGridMonth",
		height: "50vh",
		headerToolbar: {
			start: "today prev,next",
			center: "title",
			end: "timeGridDay,timeGridWeek,dayGridMonth",
		},
		scrollTime: "09:00:00",
		eventClick: eventClicked,
		views: {
			timeGridWeek: { pointer: true },
			resourceTimeGridWeek: { pointer: true },
		},
		dayMaxEvents: true,
		nowIndicator: true,
		selectable: true,
		editable: true,
		events: transformEvents(pageContext.data[layoutStructure.dataSource]),
	});

	// Convert UTC datetime string to local timezone
	function convertUTCtoLocal(utcDateString) {
		// Return null if input is null/undefined
		if (!utcDateString) {
			return null;
		}

		try {
			// Parse the UTC date string
			const date = new Date(utcDateString.replace(" ", "T") + "Z");

			// Check if date is valid
			if (isNaN(date.getTime())) {
				return null;
			}

			// Format to YYYY-MM-DD HH:MM:SS in local timezone
			return date
				.toLocaleString("sv", {
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				})
				.replace(",", "");
		} catch (error) {
			console.error("Error converting date:", error);
			return null;
		}
	}

	function transformEvents(events) {
		if (!Array.isArray(events)) {
			console.error("Invalid events data: expected an array");
			return [];
		}

		const calendarEvents = events
			.map((element) => {
				// Skip invalid events
				if (!element) {
					console.warn("Skipping null/undefined event element");
					return null;
				}

				// Safely access nested properties
				const idField = layoutStructure?.props?.idField;
				const startTimeField = layoutStructure?.props?.startTimeField;
				const endTimeField = layoutStructure?.props?.endTimeField;
				const titleField = layoutStructure?.props?.titleField;

				// Validate required fields
				if (
					!startTimeField ||
					!element[startTimeField] ||
					!endTimeField ||
					!element[endTimeField]
				) {
					console.warn(
						"Missing required start or end time for event:",
						element,
					);
					return null;
				}

				return {
					id: element[idField] ?? crypto.randomUUID(), // Fallback to random ID if none provided
					start: convertUTCtoLocal(element[startTimeField]),
					end: convertUTCtoLocal(element[endTimeField]), // Will return null if not present
					title:
						element[titleField] ??
						`<< titleField '${titleField}' not found in data>>`, // Fallback title if none provided
				};
			})
			.filter((event) => event !== null); // Remove any invalid events

		return calendarEvents;
	}

	$effect(() => {
		options.events = transformEvents(
			pageContext.data[layoutStructure.dataSource],
		);
		$inspect(options.events);
	});
</script>

<div class={layoutStructure.class}>
	<Calendar {plugins} {options} />
</div>
