"use client";

import { defineConfig } from "sanity";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";
import { LaunchIcon } from "@sanity/icons";

import { dataset, projectId } from "@/env";
import plugins from "./plugins";
import schema from "./schema";

export default defineConfig({
	icon: LaunchIcon,
	title: "Studio",
	name: "studio",
	basePath: "/studio",
	projectId,
	dataset,
	schema,
	plugins,
	form: {
		image: {
			assetSources: (previousAssetSources, { schema }) => {
				if (schema.name === "movie-image") {
					return previousAssetSources.filter(
						(assetSource) => assetSource !== unsplashAssetSource,
					);
				}

				return previousAssetSources;
			},
		},
	},
	tasks: { enabled: false },
	scheduledPublishing: { enabled: false },
});
