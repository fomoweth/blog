import { defineField, defineType } from "sanity";
import { TagIcon, TagsIcon } from "@sanity/icons";

export default defineType({
	icon: TagsIcon,
	title: "Category",
	name: "category",
	type: "document",
	fields: [
		defineField({
			title: "Identifier",
			name: "id",
			type: "number",
			validation: (rule) => rule.required().min(0),
		}),
		defineField({
			title: "Title",
			name: "title",
			type: "string",
			validation: (rule) => rule.required().max(20),
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
	],
	preview: {
		select: {
			title: "title",
		},
		prepare: ({ title }) => ({
			media: TagIcon,
			title,
		}),
	},
	orderings: [
		{
			title: "Identifier (Ascending)",
			name: "idAsc",
			by: [{ field: "id", direction: "asc" }],
		},
		{
			title: "Identifier (Descending)",
			name: "idDesc",
			by: [{ field: "id", direction: "desc" }],
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
