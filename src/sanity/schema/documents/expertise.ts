import { defineArrayMember, defineField, defineType } from "sanity";
import { AiOutlineBlock, AiOutlineCode } from "react-icons/ai";
import { GoBrowser, GoDatabase, GoServer } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { IoCodeSlash } from "react-icons/io5";

import { pluralize } from "@/sanity/lib/utils";

export default defineType({
	icon: AiOutlineCode,
	title: "Expertise",
	name: "expertise",
	type: "document",
	fields: [
		defineField({
			title: "Identifier",
			name: "id",
			type: "number",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Domain",
			name: "domain",
			type: "string",
			options: {
				layout: "radio",
				list: [
					{
						title: "Programming Languages",
						value: "programming-languages",
					},
					{ title: "Web3", value: "web3" },
					{ title: "Front-End", value: "front-end" },
					{ title: "Back-End", value: "back-end" },
					{ title: "Database", value: "database" },
					{ title: "Spoken Languages", value: "spoken-languages" },
				],
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Skills",
			name: "skills",
			type: "array",
			of: [
				defineArrayMember({
					title: "Skill",
					name: "skill",
					type: "object",
					fields: [
						defineField({
							title: "Label",
							name: "label",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							title: "Logo Image",
							name: "logo",
							type: "image",
						}),
						defineField({
							title: "Link",
							name: "link",
							type: "url",
							validation: (rule) => rule.uri({ scheme: "https" }),
						}),
					],
				}),
			],
			validation: (rule) => rule.required().min(2),
		}),
	],
	preview: {
		select: {
			domain: "domain",
			skills: "skills",
		},
		prepare: ({ domain, skills }) => ({
			media:
				(domain === "programming-languages" && IoCodeSlash) ||
				(domain === "web3" && AiOutlineBlock) ||
				(domain === "front-end" && GoBrowser) ||
				(domain === "back-end" && GoServer) ||
				(domain === "database" && GoDatabase) ||
				(domain === "spoken-languages" && GrLanguage),
			title: (domain as string)
				.split("-")
				.map((value) => value.charAt(0).toUpperCase() + value.slice(1))
				.join(" ")
				.trim(),
			subtitle: pluralize("skill", skills.length || 0, true),
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
	],
});
