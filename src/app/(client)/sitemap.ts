import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { groq } from "next-sanity";

import fetch from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const headersList = headers();
	const domain = headersList.get("host") as string;
	const protocol = "https";

	const baseUrl = `${protocol}://${domain}`;

	const postUrls = await fetch<Array<{ url: string; lastModified: string }>>({
		query: groq`
			*[_type == "post" && defined(slug.current)] {
				"url": $baseUrl + slug.current,
				"lastModified": _updatedAt
			}
		`,
		params: { type: "post", baseUrl: `${baseUrl}/blog/` },
		tags: ["post"],
	});

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
		},
		...postUrls,
	];
}
