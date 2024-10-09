"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { LaunchIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId, studioUrl } from "@/env";
import { schema } from "./schema";
import { structure } from "./structure";

export default defineConfig({
	icon: LaunchIcon,
	title: "Studio",
	name: "studio",
	basePath: studioUrl,
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
	tasks: { enabled: false },
	scheduledPublishing: { enabled: false },
});
