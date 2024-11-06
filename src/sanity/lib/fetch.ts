"only server";

import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { stegaClean } from "@sanity/client/stega";

import client from "./client";
import { token } from "./token";

export default async function fetch<T>({
	query,
	params = {},
	revalidate = 60,
	tags = [],
}: {
	query: string;
	params?: QueryParams;
	revalidate?: number | false;
	tags?: string[];
}): Promise<T> {
	const response = await client.fetch<T>(
		query,
		params,
		draftMode().isEnabled
			? {
					perspective: "previewDrafts",
					stega: true,
					useCdn: false,
					token,
					next: {
						revalidate: 0,
						tags,
					},
				}
			: {
					perspective: "published",
					useCdn: true,
					next: {
						revalidate: !!tags.length && revalidate,
						tags,
					},
				},
	);

	return stegaClean(response);
}
