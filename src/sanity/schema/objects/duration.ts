import { defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

import { DurationInput } from "../../components/DurationInput";

export default defineField({
	icon: CalendarIcon,
	title: "Duration",
	name: "duration",
	type: "object",
	fields: [
		defineField({
			title: "Start Date",
			name: "start",
			type: "date",
			options: {
				dateFormat: "YYYY-MM-DD",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "End Date",
			name: "end",
			type: "date",
			options: {
				dateFormat: "YYYY-MM-DD",
			},
			validation: (rule) => rule.min(rule.valueOfField("start")),
		}),
	],
	components: { input: DurationInput },
});
