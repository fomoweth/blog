import { defineField, defineType } from "sanity";
import { SiHiveBlockchain } from "react-icons/si";

export default defineType({
	icon: SiHiveBlockchain,
	title: "Chain",
	name: "chain",
	type: "document",
	fields: [
		defineField({
			title: "Chain ID",
			name: "chainId",
			type: "number",
			validation: (rule) => rule.required(),
		}),
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
			title: "Etherscan",
			name: "etherscan",
			type: "url",
			validation: (rule) => rule.required().uri({ scheme: ["https"] }),
		}),
		defineField({
			title: "Is Testnet",
			name: "isTestnet",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			title: "Icon Image",
			name: "icon",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Logo Image",
			name: "logo",
			type: "logo",
		}),
	],
	preview: {
		select: {
			chainId: "chainId",
			icon: "icon.asset",
			label: "label",
		},
		prepare: ({ chainId, icon, label }) => ({
			media: icon,
			title: label,
			subtitle: chainId,
		}),
	},
	orderings: [
		{
			title: "ChainId (Ascending)",
			name: "chainIdAsc",
			by: [{ field: "chainId", direction: "asc" }],
		},
		{
			title: "ChainId (Descending)",
			name: "chainIdDesc",
			by: [{ field: "chainId", direction: "desc" }],
		},
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
