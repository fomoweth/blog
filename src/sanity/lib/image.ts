import createImageUrlBuilder from "@sanity/image-url";
import type {
	ImageUrlBuilderOptions,
	SanityImageSource,
} from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "@/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function useImageBuilder(
	source: SanityImageSource,
	options: ImageUrlBuilderOptions = {},
) {
	return builder.image(source).withOptions(options);
}
