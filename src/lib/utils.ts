import { clsx, type ClassValue } from "clsx";
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

export function isExternal(url: string | UrlObject): boolean {
	if (typeof url === "string") {
		if (!URL.canParse(url)) return false;
		url = new URL(url);
	}

	return url.protocol === "https:" || url.protocol === "mailto:";
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
