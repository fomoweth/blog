import { defineArrayMember, defineField } from "sanity";
import {
	BlockContentIcon,
	CodeBlockIcon,
	ImageIcon,
	ThListIcon,
} from "@sanity/icons";
import { FaYoutube } from "react-icons/fa6";

export default defineField({
	icon: BlockContentIcon,
	title: "Content",
	name: "content",
	type: "array",
	of: [
		defineArrayMember({
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "H1", value: "h1" },
				{ title: "H2", value: "h2" },
				{ title: "H3", value: "h3" },
				{ title: "H4", value: "h4" },
				{ title: "H5", value: "h5" },
				{ title: "H6", value: "h6" },
				{ title: "Quote", value: "blockquote" },
			],
			lists: [
				{ title: "Bullet", value: "bullet" },
				{ title: "Numbered", value: "number" },
			],
			marks: {
				decorators: [
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
					{
						title: "Highlight",
						value: "highlight",
						icon: () => (
							<span style={{ fontWeight: "semibold" }}>H</span>
						),
						component: (props) => (
							<span style={{ backgroundColor: "#006FEE" }}>
								{props.children}
							</span>
						),
					},
					{ title: "Code", value: "code" },
					{ title: "Strike", value: "strike-through" },
					{ title: "Underline", value: "underline" },
				],
				annotations: [
					defineArrayMember({
						title: "External Link",
						name: "link",
						type: "object",
						fields: [
							defineField({
								title: "URL",
								name: "href",
								type: "url",
								validation: (rule) =>
									rule.uri({ scheme: ["https"] }),
							}),
						],
					}),
					defineArrayMember({
						title: "Internal Link",
						name: "internalLink",
						type: "object",
						fields: [
							defineField({
								name: "reference",
								type: "reference",
								to: [{ type: "post" }],
							}),
						],
					}),
				],
			},
			options: { spellCheck: true },
		}),
		defineArrayMember({
			icon: ImageIcon,
			title: "Image",
			name: "image",
			type: "image",
			fields: [
				defineField({
					title: "Alternative Text",
					name: "alt",
					type: "string",
				}),
				defineField({
					title: "Caption",
					name: "caption",
					type: "string",
				}),
				defineField({
					title: "Float",
					name: "float",
					type: "string",
					options: {
						layout: "radio",
						list: ["left", "right", "none"],
					},
					initialValue: "none",
				}),
			],
			options: { hotspot: true },
		}),
		defineArrayMember({
			icon: CodeBlockIcon,
			title: "Code",
			name: "code",
			type: "code",
			options: {
				languageAlternatives: [
					{ title: "Bash", value: "bash" },
					{ title: "GraphQL", value: "graphql" },
					{ title: "GROQ", value: "groq" },
					{ title: "JSON", value: "json" },
					{ title: "Shell", value: "sh" },
					{ title: "Solidity", value: "solidity" },
					{ title: "SQL", value: "sql" },
					{ title: "Text", value: "text" },
					{ title: "TypeScript", value: "typescript" },
				],
				withFilename: true,
			},
		}),
		defineArrayMember({
			icon: ThListIcon,
			title: "Table",
			name: "table",
			type: "object",
			fields: [
				defineField({
					title: "Label",
					name: "label",
					type: "string",
				}),
				defineField({
					title: "Caption",
					name: "caption",
					type: "string",
				}),
				defineField({
					title: "Schema",
					name: "schema",
					type: "table",
					validation: (rule) => rule.required(),
				}),
			],
		}),
		defineArrayMember({
			icon: FaYoutube,
			title: "Video",
			name: "video",
			type: "object",
			fields: [
				defineField({
					title: "Label",
					name: "label",
					type: "string",
					validation: (rule) => rule.required(),
				}),
				defineField({
					title: "URL",
					name: "href",
					type: "url",
					validation: (rule) =>
						rule.required().custom((value) => {
							if (
								value &&
								new URL(value).origin === "https://youtu.be"
							) {
								return true;
							}

							return {
								message: "Invalid URL given.",
							};
						}),
				}),
			],
			preview: {
				select: {
					title: "label",
					href: "href",
				},
				prepare: ({ title, href }) => ({
					media: FaYoutube,
					title,
					subtitle: new URL(href).pathname.slice(1),
				}),
			},
		}),
	],
});
