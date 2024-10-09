import type { PortableTextBlock } from "next-sanity";

export { default as pluralize } from "pluralize";

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
		? new Date(value).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			})
		: "Present";
}
