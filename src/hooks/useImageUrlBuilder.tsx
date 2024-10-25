import { useMemo } from "react";

import type { ImageUrlBuilder } from "sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityProjectDetails } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "@/env";

export default function useImageUrlBuilder(
	options: SanityProjectDetails = { dataset, projectId },
): ImageUrlBuilder {
	const builder = useMemo(() => createImageUrlBuilder(options), [options]);

	return builder;
}
