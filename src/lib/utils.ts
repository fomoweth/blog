import type { Metadata } from "next";
import type { ImageUrlBuilder } from "sanity";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";

import siteConfig from "@/config";

const {
	author,
	description: siteDescription,
	keywords,
	title: siteName,
	twitter,
	url,
} = siteConfig;

export function cn(...values: ClassValue[]): string {
	return twMerge(clsx(values));
}

export function capitalize(value: string): string {
	return value
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function slugify(value: string): string {
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

export function absoluteUrl(path: string): string {
	return new URL(path, url).href;
}

export function constructMetadata({
	title = siteName,
	description = siteDescription,
	image = absoluteUrl("/og"),
	tags = [],
	openGraph = {},
	...props
}: {
	title?: string;
	description?: string;
	image?: string;
	tags?: Array<string>;
	openGraph?: Metadata["openGraph"];
	[key: string]: Metadata[keyof Metadata];
}): Metadata {
	const images = [
		{
			url: image,
			alt: title,
			width: 1200,
			height: 630,
		},
	];

	return {
		metadataBase: new URL(url),
		authors: [
			{
				name: author,
				url,
			},
		],
		creator: author,
		title: {
			default: siteName,
			template: title,
		},
		applicationName: siteName,
		description,
		keywords: keywords.concat(tags),
		openGraph: Object.assign(
			{
				title,
				description,
				url,
				siteName,
				images,
				type: "website",
				locale: "en_US",
			},
			openGraph,
		),
		twitter: {
			card: "summary_large_image",
			site: twitter,
			title,
			description,
			images,
		},
		icons: "/favicon.ico",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		...props,
	};
}

export function isExternal(value: string | UrlObject = "#"): boolean {
	if (typeof value === "string") {
		if (!URL.canParse(value)) return false;
		value = new URL(value);
	}

	return value.protocol === "https:" || value.protocol === "mailto:";
}

export function parseYears(value: string): number {
	const parsed = new Date().getFullYear() - new Date(value).getFullYear();

	return parsed > 0 ? parsed : 0;
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
): { srcSet: string | undefined; sizes: string | undefined } {
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
