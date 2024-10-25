import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

import { parseDate } from "@/sanity/lib/utils";

export default defineType({
	icon: DocumentTextIcon,
	title: "Post",
	name: "post",
	type: "document",
	groups: [
		{
			title: "SEO",
			name: "seo",
		},
		{
			title: "Editorial",
			name: "editorial",
		},
		{
			title: "Options",
			name: "options",
		},
	],
	fields: [
		defineField({
			title: "Cover Image",
			name: "coverImage",
			type: "image",
			group: "seo",
			options: { hotspot: true },
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Title",
			name: "title",
			type: "string",
			group: "seo",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Slug",
			name: "slug",
			type: "slug",
			group: "seo",
			options: {
				source: "title",
				isUnique: (value, ctx) => ctx.defaultIsUnique(value, ctx),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Excerpt",
			name: "excerpt",
			type: "text",
			group: "seo",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Tags",
			name: "tags",
			type: "array",
			of: [
				defineArrayMember({
					type: "string",
				}),
			],
			group: "seo",
			validation: (rule) => rule.required().max(3),
		}),
		defineField({
			title: "Category",
			name: "category",
			type: "reference",
			to: { type: "category" },
			group: "editorial",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Date",
			name: "date",
			type: "date",
			options: {
				dateFormat: "YYYY-MM-DD",
			},
			group: "editorial",
			initialValue: new Date().toISOString().split("T")[0],
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Source Code",
			name: "sourceCode",
			type: "url",
			group: "editorial",
			validation: (rule) => rule.uri({ scheme: ["https"] }),
		}),
		defineField({
			title: "Content",
			name: "content",
			type: "content",
			group: "editorial",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Related Posts",
			name: "relatedPosts",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: { type: "post" },
				}),
			],
			group: "editorial",
		}),
		defineField({
			title: "Navigation",
			name: "navigation",
			type: "object",
			group: "options",
			fields: [
				defineField({
					title: "Enabled",
					name: "enabled",
					type: "boolean",
					initialValue: true,
				}),
				defineField({
					title: "Position",
					name: "position",
					type: "string",
					options: {
						layout: "radio",
						list: [
							{ title: "Left", value: "left" },
							{ title: "Right", value: "right" },
						],
					},
					initialValue: "right",
					hidden: ({ parent }) => !parent?.enabled,
				}),
			],
		}),
		defineField({
			title: "Featured",
			name: "featured",
			type: "boolean",
			group: "options",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			media: "coverImage.asset",
			title: "title",
			category: "category.title",
			date: "date",
		},
		prepare: ({ media, title, category, date }) => ({
			media,
			title,
			subtitle: `${category} / ${parseDate(date)}`,
		}),
	},
	orderings: [
		{
			title: "Date (Ascending)",
			name: "dateAsc",
			by: [{ field: "date", direction: "asc" }],
		},
		{
			title: "Date (Descending)",
			name: "dateDesc",
			by: [{ field: "date", direction: "desc" }],
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
