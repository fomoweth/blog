import { clsx, type ClassValue } from "clsx";
import type { ImageUrlBuilder } from "sanity";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";

export function cn(...values: ClassValue[]): string {
	return twMerge(clsx(values));
}

export function capitalize(value: string): string {
	return value
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function sluggify(value: string): string {
	return value
		.replace(/[\s\W]+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "")
		.toLowerCase();
}

export function truncate(value: string, length: number = 10): string {
	if (value.length <= length) return value;

	return value.slice(0, length) + "...";
}

export function parseYears(value: string): number {
	const parsed = new Date().getFullYear() - new Date(value).getFullYear();

	return parsed > 0 ? parsed : 0;
}

export function isExternal(url: string | UrlObject = "#"): boolean {
	if (typeof url === "string") {
		if (!URL.canParse(url)) return false;
		url = new URL(url);
	}

	return url.protocol === "https:" || url.protocol === "mailto:";
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const SIZES = [
	120, 240, 360, 480, 640, 720, 800, 880, 960, 1024, 1280, 1440, 1600, 1800,
	2000,
];

export function generateSrcset(
	builder: ImageUrlBuilder,
	source: Sanity.Image,
	{
		width,
		sizes = SIZES,
	}: {
		width?: number;
		sizes?: Array<number>;
	},
) {
	const filtered = sizes.filter((size) => !width || size <= width);

	return {
		srcSet:
			filtered
				.map(
					(size) =>
						`${builder.image(source).width(size).auto("format").url()} ${size}w`,
				)
				.join(", ") || undefined,
		sizes:
			filtered
				.map(
					(size, idx) =>
						`${idx < filtered.length - 1 ? `(max-width: ${size + 1}px) ` : ""}${size}px`,
				)
				.join(", ") || undefined,
	};
}
