import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";

import { apiVersion } from "@/env";
import resolve from "./presentation";
import singletonTool from "./singleton";
import structure from "./structure";

const plugins = [
	structureTool({
		structure: structure("Blog", [
			[{ id: "post" }, { id: "category" }],
			[{ id: "project" }, { id: "chain" }, { id: "protocol" }],
			[
				{ id: "author", flag: true },
				{ id: "expertise" },
				{ id: "experience" },
			],
			[{ id: "settings", flag: true }],
		]),
	}),
	singletonTool(["settings"]),
	presentationTool({
		resolve,
		previewUrl: {
			previewMode: {
				enable: "/api/draft/enable",
			},
		},
	}),
	visionTool({ defaultApiVersion: apiVersion }),
	codeInput({
		codeModes: [
			{
				name: "solidity",
				loader: () =>
					import("@replit/codemirror-lang-solidity").then(
						({ solidity }) => solidity,
					),
			},
		],
	}),
	colorInput(),
	table(),
	unsplashImageAsset(),
];

export default plugins;
