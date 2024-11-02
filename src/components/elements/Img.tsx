import { getImageDimensions } from "@sanity/asset-utils";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn, generateSrcset } from "@/lib/utils";

interface Props extends Omit<React.ComponentProps<"img">, "src"> {
	source: Sanity.Image;
	height?: number;
	width?: number;
}

export default function Img({
	alt,
	className,
	height,
	source,
	width,
	...props
}: Props) {
	if (!source.asset) return null;

	const builder = useImageUrlBuilder();

	if (!height || !width) {
		({ height, width } = getImageDimensions(source.asset));
	}

	const src = builder.image(source).width(width).height(height).url();

	const { srcSet, sizes } = generateSrcset(builder, source, { width });

	return (
		<img
			className={cn("aspect-auto object-cover", className)}
			src={src}
			srcSet={srcSet || src}
			sizes={sizes}
			alt={alt || source.alt}
			height={height}
			width={width}
			decoding="async"
			{...props}
		/>
	);
}
