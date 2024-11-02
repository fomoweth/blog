import { getImageDimensions } from "@sanity/asset-utils";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { generateSrcset } from "@/lib/utils";

interface Props {
	source: Sanity.Image;
	height?: number;
	media?: string;
	width?: number;
}

export default function Source({
	source,
	height,
	media = "(max-width: 768px)",
	width,
}: Props) {
	if (!source.asset) return null;

	if (!height || !width)
		({ height, width } = getImageDimensions(source.asset));

	const builder = useImageUrlBuilder();

	const { srcSet, sizes } = generateSrcset(builder, source, { width });

	return (
		<source
			srcSet={srcSet}
			sizes={sizes}
			height={height}
			width={width}
			media={media}
		/>
	);
}
