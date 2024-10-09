import { defineField, defineType } from "sanity";
import { IoLogoBuffer } from "react-icons/io5";

export default defineType({
	icon: IoLogoBuffer,
	title: "Protocol",
	name: "protocol",
	type: "document",
	fields: [
		defineField({
			title: "Label",
			name: "label",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: "label",
				isUnique: (value, ctx) => ctx.defaultIsUnique(value, ctx),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Ticker",
			name: "ticker",
			type: "string",
		}),
		defineField({
			title: "Link",
			name: "link",
			type: "url",
			validation: (rule) => rule.required().uri({ scheme: ["https"] }),
		}),
		defineField({
			title: "Logo Image",
			name: "logo",
			type: "object",
			fields: [
				defineField({
					title: "Default",
					name: "default",
					type: "image",
					options: { hotspot: true },
				}),
				defineField({
					title: "Light",
					name: "light",
					type: "image",
					options: { hotspot: true },
				}),
				defineField({
					title: "Dark",
					name: "dark",
					type: "image",
					options: { hotspot: true },
				}),
			],
		}),
		defineField({
			title: "Icon Image",
			name: "icon",
			type: "image",
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			icon: "icon.asset",
			label: "label",
			ticker: "ticker",
		},
		prepare: ({ icon, label, ticker }) => ({
			media: icon,
			title: label,
			subtitle: ticker || "",
		}),
	},
	orderings: [
		{
			title: "Label (A-Z)",
			name: "labelAsc",
			by: [{ field: "label", direction: "asc" }],
		},
		{
			title: "Label (Z-A)",
			name: "labelDesc",
			by: [{ field: "label", direction: "desc" }],
		},
	],
});
