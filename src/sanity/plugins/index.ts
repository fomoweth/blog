import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";

import { apiVersion } from "@/env";
import resolve from "./presentation";
import singletonTool from "./singleton";
import structure from "./structure";

const plugins = [
	structureTool({
		structure: structure("Blog", [
			[{ id: "post" }, { id: "category" }],
			[{ id: "project" }, { id: "protocol" }],
			[{ id: "expertise" }, { id: "experience" }],
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
	dashboardTool({
		title: "Deployment",
		name: "deployment",
		widgets: [vercelWidget()],
	}),
	dashboardTool({
		title: "Info",
		name: "info",
		widgets: [projectInfoWidget(), projectUsersWidget()],
	}),
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
	unsplashImageAsset(),
];

export default plugins;
