import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";

interface Props {
	value: Sanity.Image;
}

export default function ({ value }: Props) {
	const { asset, alt, caption } = value;

	const builder = useImageUrlBuilder();

	const { height, width } = getImageDimensions(asset);

	const source = builder.image(asset).width(width).height(height).url();

	return (
		<figure>
			<Image
				className="mx-auto max-h-svh w-auto bg-neutral-100 text-[0px]"
				src={source}
				alt={alt || ""}
				sizes="(max-width: 800px) 100vw, 800px"
				height={height}
				width={width}
			/>

			{caption && (
				<figcaption className="mt-2 text-pretty text-center text-sm italic text-gray-500">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
