import { defineArrayMember, defineField, defineType } from "sanity";
import { FaProjectDiagram } from "react-icons/fa";

export default defineType({
	icon: FaProjectDiagram,
	title: "Deployment",
	name: "deployment",
	type: "object",
	fields: [
		defineField({
			title: "Label",
			name: "label",
			type: "string",
		}),
		defineField({
			title: "Address",
			name: "address",
			type: "string",
		}),
		defineField({
			title: "Addresses",
			name: "addresses",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							title: "Chain",
							name: "chain",
							type: "reference",
							to: { type: "chain" },
						}),
						defineField({
							title: "Address",
							name: "address",
							type: "string",
						}),
					],
					preview: {
						select: {
							title: "chain.label",
							address: "address",
						},
						prepare: ({ title, address }) => ({
							title,
							subtitle: address,
						}),
					},
				}),
			],
		}),
	],
});
