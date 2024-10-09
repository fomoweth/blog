import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
	icon: CogIcon,
	title: "Settings",
	name: "settings",
	type: "document",
	groups: [
		{
			title: "SEO",
			name: "seo",
		},
		{
			title: "General",
			name: "general",
		},
		{
			title: "Editorial",
			name: "editorial",
		},
	],
	fields: [
		defineField({
			title: "Open Graph Image",
			name: "ogImage",
			type: "image",
			group: "seo",
			options: { hotspot: true },
		}),
		defineField({
			title: "Title",
			name: "title",
			type: "string",
			group: "seo",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Description",
			name: "description",
			type: "text",
			rows: 2,
			group: "seo",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Keywords",
			name: "keywords",
			type: "array",
			of: [
				defineArrayMember({
					title: "Keyword",
					name: "keyword",
					type: "string",
				}),
			],
			group: "seo",
			validation: (rule) => rule.required().min(3),
		}),
		defineField({
			title: "Introduction",
			name: "intro",
			type: "array",
			of: [
				{
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
				},
			],
			group: "editorial",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Copyright",
			name: "copyright",
			type: "array",
			of: [
				{
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
				},
			],
			group: "editorial",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Contact",
			name: "contact",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							title: "Label",
							name: "label",
							type: "string",
							options: {
								layout: "radio",
								list: [
									{ title: "Email", value: "email" },
									{ title: "Github", value: "github" },
									{ title: "LinkedIn", value: "linkedin" },
									{ title: "Telegram", value: "telegram" },
									{ title: "X", value: "x" },
								],
							},
							initialValue: "email",
							validation: (rule) => rule.required(),
						}),
						defineField({
							title: "URL",
							name: "href",
							type: "url",
							validation: (rule) =>
								rule
									.required()
									.uri({ scheme: ["https", "mailto"] })
									.custom((value, ctx) => {
										const { label = "" } = (ctx.parent ||
											{}) as any;

										const protocol =
											label === "email"
												? "mailto:"
												: "https:";

										if (
											value &&
											new URL(value).protocol === protocol
										) {
											return true;
										}

										return {
											message: "Invalid URL given.",
										};
									}),
						}),
						defineField({
							title: "Color",
							name: "color",
							type: "color",
							options: { disableAlpha: true },
							validation: (rule) => rule.required(),
						}),
					],
				}),
			],
			group: "general",
		}),
		defineField({
			title: "Location",
			name: "location",
			type: "string",
			group: "general",
			initialValue: "California",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Resume",
			name: "resume",
			type: "file",
			options: {
				accept: "application/pdf",
			},
			group: "general",
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		prepare: () => ({
			title: "Site Settings",
		}),
	},
});
