import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
	icon: UserIcon,
	title: "Author",
	name: "author",
	type: "document",
	fields: [
		defineField({
			title: "Name",
			name: "name",
			type: "string",
			initialValue: "Ryan Kim",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Position",
			name: "position",
			type: "object",
			fields: [
				defineField({
					title: "Title",
					name: "title",
					type: "string",
					initialValue: "Smart Contract Engineer",
					validation: (rule) => rule.required(),
				}),
				defineField({
					title: "Start Date",
					name: "startDate",
					type: "date",
					options: {
						dateFormat: "YYYY-MM-DD",
					},
					initialValue: "2021-06-01",
					validation: (rule) => rule.required(),
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Location",
			name: "location",
			type: "string",
			initialValue: "California",
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
		}),
		defineField({
			title: "Resume",
			name: "resume",
			type: "file",
			options: {
				accept: "application/pdf",
			},
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			name: "name",
		},
		prepare: ({ name }) => ({
			media: UserIcon,
			title: "Author",
			subtitle: name,
		}),
	},
});
