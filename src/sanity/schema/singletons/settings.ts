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
			title: "Paths",
			name: "paths",
			type: "array",
			of: [
				defineArrayMember({
					title: "Path",
					name: "path",
					type: "object",
					fields: [
						defineField({
							title: "Label",
							name: "label",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							title: "Link",
							name: "href",
							type: "string",
							validation: (rule) => rule.required(),
						}),
					],
				}),
			],
			group: "editorial",
		}),
		defineField({
			title: "Introduction",
			name: "introduction",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
				}),
			],
			group: "editorial",
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
			title: "Number of Featured Projects",
			name: "numberOfProjects",
			type: "number",
			group: "editorial",
			initialValue: 6,
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Number of Posts",
			name: "numberOfPosts",
			type: "number",
			group: "editorial",
			initialValue: 4,
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Contacts",
			name: "contacts",
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
									"Email",
									"Github",
									"LinkedIn",
									"Telegram",
									"X",
								],
							},
							initialValue: "Email",
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
											label === "Email"
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
