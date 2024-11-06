import { Metadata } from "next";
import type { ImageUrlBuilder } from "sanity";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";

import siteConfig from "@/config";

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

export function absoluteUrl(path: string): string {
	return new URL(path, siteConfig.url).href;
}

export function constructMetadata({
	title = siteConfig.title,
	description = siteConfig.description,
	image = absoluteUrl("/og"),
	...props
}: {
	title?: string;
	description?: string;
	image?: string;
	[key: string]: Metadata[keyof Metadata];
}): Metadata {
	return {
		metadataBase: new URL(siteConfig.url),
		authors: [
			{
				name: siteConfig.author,
				url: siteConfig.url,
			},
		],
		creator: siteConfig.author,
		title: {
			template: title,
			default: siteConfig.title,
		},
		applicationName: siteConfig.title,
		description,
		keywords: siteConfig.keywords,
		openGraph: {
			title,
			description,
			url: siteConfig.url,
			siteName: siteConfig.title,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			type: "website",
			locale: "en_US",
		},
		twitter: {
			card: "summary_large_image",
			creator: siteConfig.twitter,
			site: siteConfig.url,
			title: siteConfig.title,
			description: siteConfig.description,
			images: [image],
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

export function isExternal(url: string | UrlObject = "#"): boolean {
	if (typeof url === "string") {
		if (!URL.canParse(url)) return false;
		url = new URL(url);
	}

	return url.protocol === "https:" || url.protocol === "mailto:";
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
