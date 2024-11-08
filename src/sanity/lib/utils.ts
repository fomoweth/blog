import type { Image, ImageUrlBuilder } from "sanity";
import type { PortableTextBlock } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/env";

export { default as pluralize } from "pluralize";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: Image): ImageUrlBuilder {
	return builder.image(source).auto("format").fit("max");
}

export function capitalize(value: string): string {
	return value
		.split(/(?=[A-Z])/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
		.trim();
}

export function parseBlocks(value?: Array<PortableTextBlock>): string {
	const resolve = ({ children }: PortableTextBlock) =>
		(children?.flatMap(({ text }) => text).join("") || "").concat("\u000A");

	return (
		value?.reduce((acc, block) => acc.concat(resolve(block)), "").trim() ||
		""
	);
}

export function parseDate(value?: string): string {
	return value
		? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			})
		: "Present";
}
