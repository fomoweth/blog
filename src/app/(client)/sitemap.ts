import { MetadataRoute } from "next";
import { headers } from "next/headers";

import { loadPosts } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const headersList = headers();
	const domain = headersList.get("host") as string;
	const protocol = "https";

	const baseUrl = `${protocol}://${domain}`;

	const posts = await loadPosts();

	const postUrls = posts.map((post) => ({
		url: `${baseUrl}/post/${post.slug.current}`,
		lastModified: post._updatedAt,
	}));

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
