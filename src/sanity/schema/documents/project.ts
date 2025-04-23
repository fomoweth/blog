import { defineArrayMember, defineField, defineType } from "sanity";
import { GoProjectSymlink } from "react-icons/go";

import { parseDate } from "@/sanity/lib/utils";

export default defineType({
	icon: GoProjectSymlink,
	title: "Project",
	name: "project",
	type: "document",
	fields: [
		defineField({
			title: "Title",
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: "title",
				isUnique: (value, ctx) => ctx.defaultIsUnique(value, ctx),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Description",
			name: "description",
			type: "text",
			rows: 2,
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Category",
			name: "category",
			type: "string",
			options: {
				layout: "radio",
				list: [
					{ title: "Personal", value: "personal" },
					{ title: "Work", value: "work" },
				],
			},
			initialValue: "personal",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Duration",
			name: "duration",
			type: "duration",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Deployments",
			name: "deployments",
			type: "array",
			of: [
				defineArrayMember({
					title: "Deployment",
					name: "deployment",
					type: "deployment",
				}),
			],
		}),
		defineField({
			title: "Source Code",
			name: "sourceCode",
			type: "url",
			validation: (rule) => rule.uri({ scheme: ["https"] }),
		}),
		defineField({
			title: "Stacks",
			name: "stacks",
			type: "array",
			of: [
				defineArrayMember({
					type: "string",
				}),
			],
		}),
		defineField({
			title: "Protocols",
			name: "protocols",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: { type: "protocol" },
				}),
			],
		}),
		defineField({
			title: "Bullet Points",
			name: "bulletPoints",
			type: "array",
			of: [
				defineArrayMember({
					type: "string",
				}),
			],
			validation: (rule) => rule.required().min(2),
		}),
		defineField({
			title: "Featured",
			name: "featured",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "title",
			start: "duration.start",
			end: "duration.end",
		},
		prepare: ({ title, start, end }) => ({
			title,
			subtitle: parseDate(start) + " - " + parseDate(end),
		}),
	},
	orderings: [
		{
			title: "Date (Ascending)",
			name: "dateAsc",
			by: [{ field: "duration.end", direction: "asc" }],
		},
		{
			title: "Date (Descending)",
			name: "dateDesc",
			by: [{ field: "duration.end", direction: "desc" }],
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
		{
			title: "Category (A-Z)",
			name: "categoryAsc",
			by: [{ field: "category", direction: "asc" }],
		},
		{
			title: "Category (Z-A)",
			name: "categoryDesc",
			by: [{ field: "category", direction: "desc" }],
		},
	],
});
