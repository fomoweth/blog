import { defineArrayMember, defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

import { parseDate } from "@/sanity/lib/utils";

export default defineType({
	icon: CaseIcon,
	title: "Experience",
	name: "experience",
	type: "document",
	fields: [
		defineField({
			title: "Logo Image",
			name: "logo",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Title",
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Description",
			name: "description",
			type: "text",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Link",
			name: "link",
			type: "url",
			validation: (rule) => rule.uri({ scheme: ["https"] }),
		}),
		defineField({
			title: "Position",
			name: "position",
			type: "string",
			initialValue: "Smart Contract Engineer",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Duration",
			name: "duration",
			type: "duration",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Roles",
			name: "roles",
			type: "array",
			of: [
				defineArrayMember({
					name: "role",
					type: "string",
				}),
			],
			validation: (rule) => rule.required().min(2),
		}),
	],
	preview: {
		select: {
			media: "logo.asset",
			title: "title",
			start: "duration.start",
			end: "duration.end",
		},
		prepare: ({ media, title, start, end }) => ({
			media,
			title,
			subtitle: parseDate(start) + " - " + parseDate(end),
		}),
	},
	orderings: [
		{
			title: "Date (Ascending)",
			name: "dateAsc",
			by: [{ field: "duration.start", direction: "asc" }],
		},
		{
			title: "Date (Descending)",
			name: "dateDesc",
			by: [{ field: "duration.start", direction: "desc" }],
		},
		{
			title: "Title (A-Z)",
			name: "titleAsc",
			by: [{ field: "title", direction: "asc" }],
		},
		{
			title: "Title (Z-A)",
			name: "titleDesc",
			by: [{ field: "title", direction: "desc" }],
		},
	],
});
