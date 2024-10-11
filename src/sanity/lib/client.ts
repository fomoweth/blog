import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/env";

export { stegaClean } from "@sanity/client/stega";

export default createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	stega: {
		enabled: true,
		studioUrl,
	},
});
